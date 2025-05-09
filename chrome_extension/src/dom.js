import { $, escapeHtml } from './utils.js';
export const dom = {
  login: $('#login-section'),
  user: $('#user-section'),
  service: $('#service-section'),

  renderLogin(email) {
    this.user.innerHTML = `<strong>ログイン:</strong> ${email}`;
    this.login.innerHTML = '';
  },

  renderServiceSelect(services) {
    this.service.innerHTML = `
      <select id="service-select" style="width:100%">
        <option value="" disabled>-- サービスを選択してください --</option>
        ${services
          .map(
            ({ id, title }, idx) =>
              `<option value="${id}" ${idx === 0 ? 'selected' : ''}>${title}</option>`,
          )
          .join('')}
      </select>`;
    this.service.style.marginTop = '10px';
  },
  renderMetaForm(meta, onSave) {
    const root = document.createElement('div');
    root.id = 'meta-form';
    root.style.marginTop = '10px';
    root.innerHTML = `${field('タイトル', 'meta-title', meta.title)}
      ${field('説明', 'meta-description', meta.description, true)}
      ${field('URL', 'meta-url', meta.url)}
      ${field('Favicon URL', 'meta-favicon', meta.favicon_url)}
      ${field('Twitter画像URL', 'meta-twitter-img', meta.twitter_image_url)}
      ${field('公開日', 'meta-publish-date', (meta.publish_date ?? '').slice(0, 10), false, 'date')}
      <button id="save-btn" style="width:100%;margin-top:10px">保存</button>`;
    document.body.appendChild(root);
    $('#save-btn').onclick = onSave;

    function field(label, id, val = '', area = false, type = 'text') {
      return area
        ? `<label>${label}</label><br><textarea id="${id}" rows="3" style="width:100%">${escapeHtml(val)}</textarea><br><br>`
        : `<label>${label}</label><br><input id="${id}" type="${type}" value="${escapeHtml(val)}" style="width:100%"><br><br>`;
    }
  },
};
