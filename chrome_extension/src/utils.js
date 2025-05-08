export const pad = (n) => n.toString().padStart(2, '0');
export const timestampNow = () => {
  const d = new Date();
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    ` ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
};
export const $ = (selector, root = document) => root.querySelector(selector);
export const escapeHtml = (str = '') => str.replaceAll('"', '&quot;');
