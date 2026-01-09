chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkStatus") {
    chrome.storage.local.get(["refreshData"], (result) => {
      const data = result.refreshData || {};
      const tabId = sender.tab.id;
      if (data[tabId] && data[tabId].active) {
        sendResponse({ active: true, seconds: data[tabId].seconds });
      } else {
        sendResponse({ active: false });
      }
    });
    return true;
  }
});