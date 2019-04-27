import * as Fuse from 'fuse.js'
import { FuseResult, FuseOptions } from 'fuse.js'
import SuggestView from './components/suggest-view'
import { Tab, HistoryItem, BookmarkTreeNode, Item } from './chrome-type'
const log = console.log
const searchbox: HTMLInputElement = <HTMLInputElement>document.getElementById('searchbox')
const view = new SuggestView()
document.body.appendChild(view)
let userInput = ''
let timerID: number

/**
 * fuzzy search option
 * sortは必要なのかなー
 */
const option = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.6, // 0に近ければより厳しい
  maxPatternLength: 32,
  keys: [ 'title', 'url' ],
}

/**
 * tree構造を一次元のリストをつくる
 */
function treeToFlatList (tree: BookmarkTreeNode): BookmarkTreeNode[] {
  function loop(node: BookmarkTreeNode, 
    result: BookmarkTreeNode[]) {
    if (node.url) { // ディレクトリはurlを持たないのでこれで判断する
      result.push(node)
    } else if (node.children) {
      for(let i = 0; i < node.children.length; i++) {
        const item = node.children[i]
        loop(item, result)
      }
    }
    return result
  }
  return loop(tree, [])
}

/**
 * すべてのタブを表示
 */
function showAllTabs() {
  return chrome.tabs.query({}, results => view.update(results))
}

function search(text: string) {
  // tabs, history, bookmarksを取得する
  chrome.tabs.query({}, tabs => {
    let candidates: Item[] = tabs
    chrome.history.search({ text: '', maxResults: 20 }, history => {
      candidates = deduplicate(candidates, history)
      chrome.bookmarks.getTree(tree => {
        const bookmarks = treeToFlatList(tree[0])
        candidates = deduplicate(candidates, bookmarks)
        const fuse = new Fuse(candidates, option)
        const result = fuse.search(text)
        view.updateResult(result) // わからない
      })
    })
  })
}

/**
 * arrayの重複を排除する
 * @param {*} arr1 array of object
 * @param {*} arr2 array of object
 * arr1に重複を排除して追加する
 */
function deduplicate (arr1: Item[], arr2: Item[]) {
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

/**
 * スコアの高い順に並べ替える
 */
function sort(){}

/**
 * popupが表示されたら実行される処理
 */
window.onload = () => {
  searchbox.focus()
  // タブを描画
  showAllTabs()
}

/**
 * 検索ボックスに入力されたら検索する
 */
searchbox.oninput = (e) => {
  if (userInput !== searchbox.value) { // 入力によって値が変わった場合
    if (searchbox.value === ''){ // 空ならタブを表示
      view.clear()
      showAllTabs()
    } else {
      view.clear()
      window.clearTimeout(timerID)
      timerID = window.setTimeout(search, 300, searchbox.value) // 0.3s
    }
    userInput = searchbox.value
  }
}
