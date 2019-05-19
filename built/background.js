
let currentTab

// extensionボタンが押されたらcontent scriptsにメッセージ
chrome.browserAction.onClicked.addListener( tab => {
  currentTab = tab
  chrome.tabs.sendMessage(tab.id, {})
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.sendMessage(currentTab.id, 'unactive')
})
