import { treeToFlatList } from './utilities'
import Fuse = require('fuse.js')

const log = console.log // あとで消す
let items
  , currentTab
  , tabs
  , history
  , bookmarks
  , tabsAndHistory
  , fuse

/** fuse option */
const FUSE_OPTION = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.35, // 0に近ければより厳しい
  maxPatternLength: 32,
  keys: [ 'title', 'url' ],
}

function getTabs() {
  chrome.tabs.query({}, t => {
    tabs = t
  })
}

function getHistory() {
  chrome.history.search({ text: '', maxResults: 30 }, h => {
    history = h
  })
}

function getBookmarks() {
  chrome.bookmarks.getTree(tree => {
    bookmarks = treeToFlatList(tree[0])
  })
}

function getTabsAndHistory() {
  tabsAndHistory = deduplicate(tabs, history)
}

function getItems() {
  items = deduplicate(tabsAndHistory, bookmarks)
}

/**
 * array x, yの重複を排除した新しいarrayを返す
 */
function deduplicate(x, y) {
  let result = [...x]
  for(let yi of y) {
    let flag = true
    for(let xi of x) {
      if(xi.url === yi.url) {
        flag = false
        continue
      }
    }
    if (flag) result.push(yi)
  }
  return result
}

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
  getTabsAndHistory()
  getItems()
  fuse = new Fuse(items, FUSE_OPTION)
})

// tabがアップデートされたらtabsを取得し直す
chrome.tabs.onUpdated.addListener(() => {
  getTabs()
})

chrome.tabs.onRemoved.addListener(() => {
  getTabs()
})

// tabが切り替わったらextensionを非表示
chrome.tabs.onActivated.addListener(() => {
  if(currentTab) {
    chrome.tabs.sendMessage(currentTab.id, 'unactive')
  }
  // chrome.tabs.sendMessage(activeInfo.tabId, 'unactive')
})

// historyが変更されたら更新
chrome.history.onVisited.addListener(() => {
  getHistory()
})

// bookmarkがupdateされたら更新する
chrome.bookmarks.onCreated.addListener(() => {
  getBookmarks()
})

chrome.bookmarks.onRemoved.addListener(() => {
  getBookmarks()
})

chrome.bookmarks.onChanged.addListener(() => {
  getBookmarks()
})

chrome.bookmarks.onImportEnded.addListener(() => {
  getBookmarks()
})

/**
 * 検索
 */
function search(text: string){
  // fuseはこちら
  return fuse.search(text)
}

/** 
 * messageを受信
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // tabsを返信
  if (message.defaultSuggests) {
    sendResponse({defaultSuggests: tabsAndHistory})
  }
  // 検索して結果を返信
  if (message.searchWord) {
    const result = search(message.searchWord)
    sendResponse({searchResult: result})
  }
})

/** 実行セクション */
getTabs()
getHistory()
getBookmarks()
