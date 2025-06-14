// Content script to toggle Comic Sans fonts
let comicSansEnabled = false;
let originalFonts = new Map();

// CSS for Comic Sans override
const comicSansCSS = `
  * {
    font-family: "Comic Sans MS", cursive, sans-serif !important;
  }
`;

// Create and inject/remove CSS
function toggleComicSans(enabled) {
  const styleId = 'comic-sans-override';
  let existingStyle = document.getElementById(styleId);
  
  if (enabled) {
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = comicSansCSS;
      document.head.appendChild(style);
    }
  } else {
    if (existingStyle) {
      existingStyle.remove();
    }
  }
  
  comicSansEnabled = enabled;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleComicSans') {
    toggleComicSans(request.enabled);
    sendResponse({ success: true });
  } else if (request.action === 'getStatus') {
    sendResponse({ enabled: comicSansEnabled });
  }
});

// Initialize state on page load
chrome.storage.local.get(['comicSansEnabled'], (result) => {
  const enabled = result.comicSansEnabled || false;
  toggleComicSans(enabled);
});
