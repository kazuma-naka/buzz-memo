const API_BASE = 'https://buzz-memo.vercel.app/';
export default class Api {
  constructor(base = API_BASE) {
    this.base = base;
  }
  async _fetch(path, opts = {}) {
    const res = await fetch(`${this.base}${path}`, { mode: 'cors', ...opts });
    if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
    return res.json();
  }
  getUserIdByEmail(email) {
    return this._fetch(`/api/getUserId?email=${encodeURIComponent(email)}`);
  }
  getServices(email) {
    return this._fetch(`/api/getServices?email=${encodeURIComponent(email)}`);
  }
  async isBookmarkSaved(userId, title) {
    try {
      const j = await this._fetch('/api/isBookmarkSaved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title }),
      });
      return j.saved === true;
    } catch {
      return false;
    }
  }
  insertBookmark(data) {
    return this._fetch('/api/insertBookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}
