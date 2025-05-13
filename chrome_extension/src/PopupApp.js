import Api from './api.js';
import { getGoogleProfile } from './auth.js';
import { dom } from './dom.js';
import { $, timestampNow } from './utils.js';

export default class PopupApp {
  constructor() {
    this.api = new Api();
    this.userId = null;
    this.meta = null;
    this.tabId = null;
  }

  async init() {
    try {
      const { email } = await getGoogleProfile();
      dom.renderLogin(email);
      this.userId = (await this.api.getUserIdByEmail(email)).id;
      const { services } = await this.api.getServices(email);
      dom.renderServiceSelect(services);
      await this.scrapeActiveTab();
      const saved = await this.api.isBookmarkSaved(
        this.userId,
        this.meta.title,
      );
      this.updateIcon(saved);
    } catch (err) {
      console.error('PopupApp init', err);
      alert('初期化に失敗しました。詳細はコンソールをご確認ください。');
    }
  }

  async scrapeActiveTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab || tab.url.startsWith('chrome://'))
      throw new Error('Unsupported page');
    this.tabId = tab.id;

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: this.tabId },
      func: () => {
        const trySelector = (query, attr = 'content') => {
          const el = document.querySelector(query);
          if (!el) return null;
          return attr === 'text'
            ? el.textContent.trim()
            : el.getAttribute(attr);
        };

        const dateCandidates = [
          () => trySelector("meta[property='article:published_time']"),
          () => trySelector("meta[property='og:published_time']"),
          () => trySelector("meta[itemprop='datePublished']"),
          () => trySelector("meta[name='date']"),
          () => trySelector("meta[name='pubdate']"),
          () => trySelector("meta[name='DC.date.issued']"),
          () => trySelector('time[datetime]', 'datetime'),
          () => trySelector('time.published', 'datetime'),
          () => trySelector('.post-date', 'text'),
          () => trySelector('.entry-date', 'text'),
          () => trySelector('.publish-date', 'text'),
          () => trySelector('relative-time', 'datetime'),
          () => {
            const txt = document.querySelector('.posted')?.textContent;
            return txt?.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
          },
        ];

        const raw = dateCandidates
          .map((fn) => fn())
          .find((val) => Boolean(val));
        const publish_date = raw
          ? new Date(raw).toISOString()
          : new Date().toISOString();

        const sel = (n, a = 'name') =>
          document.querySelector(`meta[${a}="${n}"]`)?.content;
        const firstIcon =
          document.querySelectorAll('link[rel*="icon"]')[0]?.href;

        return {
          title: document.title,
          description: sel('description'),
          favicon_url: firstIcon,
          twitter_image_url: sel('twitter:image'),
          publish_date,
        };
      },
    });

    this.meta = { ...result, url: tab.url };
    dom.renderMetaForm(this.meta, () => this.saveBookmark());
  }

  async saveBookmark() {
    const serviceId = $('#service-select').value;
    if (!serviceId) return alert('サービスを選択してください。');

    const bm = {
      title: $('#meta-title').value,
      description: $('#meta-description').value,
      url: $('#meta-url').value,
      favicon_url: $('#meta-favicon').value,
      twitter_image_url: $('#meta-twitter-img').value,
      publish_date:
        $('#meta-publish-date').value ||
        this.meta.publish_date ||
        timestampNow(),
      last_updated_user_id: this.userId,
      service_id: serviceId,
    };

    try {
      await this.api.insertBookmark(bm);
      alert('ブックマークを保存しました。');
      this.updateIcon(true);
      chrome.storage.local.set({ [bm.url]: true });
    } catch (err) {
      console.error('saveBookmark', err);
      alert(`保存に失敗しました: ${err.message}`);
    }
  }

  updateIcon(saved) {
    chrome.action.setIcon({
      path: saved ? 'icon-saved.png' : 'icon-default.png',
      tabId: this.tabId,
    });
  }
}
