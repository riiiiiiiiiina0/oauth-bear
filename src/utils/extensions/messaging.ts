export const sendMessageToExtension = (extensionId: string, message: any) => {
  // Check if the window is available
  if (typeof window === 'undefined') {
    throw new Error(
      'Window is not available. This function must be called in a browser context.',
    );
  }

  // Check if the chrome runtime is available
  if (!('chrome' in window) || !chrome.runtime || !chrome.runtime.sendMessage) {
    throw new Error(
      'Chrome runtime is not available on this page. Please enable externally_connectable in the extension manifest.json.',
    );
  }

  chrome.runtime.sendMessage(extensionId, message, (response) => {
    if (chrome.runtime.lastError) {
      throw new Error(
        `Error sending message: ${chrome.runtime.lastError.message}`,
      );
    } else {
      return response;
    }
  });
};
