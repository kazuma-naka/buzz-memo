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
        const sel = (n, a = 'name') =>
          document.querySelector(`meta[${a}="${n}"]`)?.content;
        const firstIcon = [...document.querySelectorAll('link[rel*="icon"]')][0]
          ?.href;
        const published =
          sel('article:published_time', 'property') ||
          sel('og:published_time', 'property') ||
          document.querySelector('time[datetime]')?.dateTime ||
          new Date().toISOString();
        return {
          title: document.title,
          description: sel('description'),
          favicon_url: firstIcon,
          twitter_image_url: sel('twitter:image'),
          publish_date: published,
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
