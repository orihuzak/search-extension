import { treeToFlatList } from './utilities'
import Fuse = require('fuse.js')

const log = console.log // あとで消す
let items
  , currentTab
  , tabs
  , history
  , bookmarks

function getTabs() {
  chrome.tabs.query({}, t => {
    tabs = t
  })
}

function getHistory() {
  chrome.history.search({ text: '', maxResults: 20 }, h => {
    history = h
  })
}
function getBookmarks() {
  chrome.bookmarks.getTree(tree => {
    bookmarks = treeToFlatList(tree[0])
  })
}

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

/**
 * arrayの重複を排除する
 * @param {*} arr1 array of object
 * @param {*} arr2 array of object
 * arr1に重複を排除して追加する
 */
export function deduplicate (arr1, arr2) {
  arr2.forEach( item2 => {
    let flag = true
    arr1.forEach( item1 => {
      if (item1.url === item2.url) {
        flag = false
        return
      }
    })
    if (flag) arr1.push(item2)
  })
  return arr1
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
})

// tabがアップデートされたらtabsを取得し直す
chrome.tabs.onUpdated.addListener(() => {
  getTabs()
})

// tabが切り替わったらextensionを非表示
chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.sendMessage(currentTab.id, 'unactive')
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

// historyが変更されたら更新
chrome.history.onVisited.addListener(() => {
  getHistory()
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

/** backgroundで管理するbookmarkを使ったsearch処理 */
function search2(text: string){
  let items = deduplicate(tabs, history)
  items = deduplicate(items, bookmarks)
  const fuse = new Fuse(items, option)
  return fuse.search(text)
}

/** 
 * messageを受信
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // tabsを返信
  if (message.tabs) {
    sendResponse({tabs: tabs})
  }
  // 検索して結果を返信
  if (message.searchWord) {
    const result = search2(message.searchWord)
    sendResponse({searchResult: result})
  }
})

/** 実行セクション */
getItems()
getTabs()
getHistory()
getBookmarks()

