import { copyToClipboard } from '../copy-to-clipboard';

export function useWebShare() {
  async function share(shareData: ShareData) {
    return new Promise((resolve, reject) => {
      try {
        if (!navigator.share && shareData.url) {
          copyToClipboard(shareData.url);
          resolve(true);

          return;
        }

        navigator.share(shareData).then(() => {
          resolve(true);
        });
      } catch (error: unknown) {
        reject();
      }
    });
  }

  return {
    share,
  };
}
