// Popup script for toggling Comic Sans
document.addEventListener('DOMContentLoaded', async () => {
  const toggleButton = document.getElementById('toggleButton');
  const statusDiv = document.getElementById('status');
  
  // Get current state
  const result = await chrome.storage.local.get(['comicSansEnabled']);
  let isEnabled = result.comicSansEnabled || false;
  
  // Update UI based on current state
  function updateUI(enabled) {
    if (enabled) {
      toggleButton.textContent = 'Disable Comic Sans';
      toggleButton.classList.add('disabled');
      statusDiv.textContent = 'Comic Sans is ON - Designers are crying 😭';
    } else {
      toggleButton.textContent = 'Enable Comic Sans';
      toggleButton.classList.remove('disabled');
      statusDiv.textContent = 'Comic Sans is OFF - Designers are safe 😌';
    }
  }
  
  // Initialize UI
  updateUI(isEnabled);
  
  // Handle toggle button click
  toggleButton.addEventListener('click', async () => {
    isEnabled = !isEnabled;
    
    // Save state
    await chrome.storage.local.set({ comicSansEnabled: isEnabled });
    
    // Update UI
    updateUI(isEnabled);
    
    // Send message to active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    try {
      await chrome.tabs.sendMessage(tab.id, {
        action: 'toggleComicSans',
        enabled: isEnabled
      });
    } catch (error) {
      console.log('Could not inject into this page:', error);
    }
  });
});
