// This script is a placeholder for future enhancements.
// The main text selection logic is handled by popup.js using executeScript.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === "getSelectionForCopilot") {
      const selectedText = window.getSelection().toString().trim();
      sendResponse({ text: selectedText });
      return true;
  }
});
