chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const currentTabIndex = tabs.findIndex((t) => t.id === tab.id);
    const tabsToMove = tabs.slice(currentTabIndex);

    chrome.windows.create({ tabId: tabsToMove[0].id }, (newWindow) => {
      const tabIds = tabsToMove.slice(1).map((t) => t.id);
      chrome.tabs.move(tabIds, { windowId: newWindow.id, index: -1 });
    });
  });
});
