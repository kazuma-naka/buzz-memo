export const getGoogleProfile = () =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'getUserProfile' }, (resp) => {
      if (resp?.profile) resolve(resp.profile);
      else reject(new Error(resp?.error || 'Failed to get profile'));
    });
  });
