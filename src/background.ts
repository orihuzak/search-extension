import { deduplicate, treeToFlatList } from './utilities'
import Fuse = require('fuse.js')

let items
let currentTab
/** fuse option */
const option = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.35, // 0に近ければより厳しい
  maxPatternLength: 32,
  keys: [ 'title', 'url' ],
}
const log = console.log // あとで消す

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

/**
 * tabs, bookmarks, historyを取得して、localstorageに保存
 */
function getItems() {
  chrome.tabs.query({}, tabs => {
    items = tabs
    chrome.history.search({ text: '', maxResults: 20 }, history => {
      items = deduplicate(items, history)
      chrome.bookmarks.getTree(tree => {
        const bookmarks = treeToFlatList(tree[0])
        items = deduplicate(items, bookmarks)
      })
    })
  })
}

/**
 * 検索
 */
function search(text: string) {
  const fuse = new Fuse(items, option)
  return fuse.search(text)
}

/** 
 * messageを受信
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 検索して結果を返信
  if (message.searchWord) {
    const result = search(message.searchWord)
    sendResponse({searchResult: result})
  }
})

/** 実行セクション */
getItems()

