let currentTab
const log = console.log
// extensionボタンが押されたらcontent scriptsにメッセージ
chrome.browserAction.onClicked.addListener( tab => {
  currentTab = tab
  if (tab.url === 'chrome://newtab/') { // 現在のタブがnew tabならリダイレクトする
    chrome.tabs.create({
      url: chrome.extension.getURL('view.html')
    })
  } else {
    chrome.tabs.sendMessage(tab.id, {})
  }
})

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.sendMessage(currentTab.id, 'unactive')
})
