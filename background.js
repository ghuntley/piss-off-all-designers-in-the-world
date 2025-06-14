// Background service worker
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with default value
  chrome.storage.local.set({ comicSansEnabled: false });
});

// Handle extension icon click if needed
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup by default due to manifest configuration
});
