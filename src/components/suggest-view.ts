const log = console.log
import { Tab, HistoryItem, BookmarkTreeNode, ChromeItem } from '../chrome-type'
import { deduplicate, treeToFlatList } from '../utilities'
import * as Fuse from 'fuse.js'
import { FuseResult, FuseOptions } from 'fuse.js'
import Hit from './hit'

/**
 * fuzzy search option
 */
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
 * サジェスト用のviewクラス
 * 引数はidやclassをプロパティに持つobject
 */
export default class SuggestView extends HTMLElement {
  public root: ShadowRoot
  public searchbox: HTMLInputElement
  public view: HTMLUListElement
  private hit: Hit
  private userInput: string = ''
  private timerID: number

  constructor() {
    super()
    // shadow root
    this.root = this.attachShadow({mode:'open'})

    // searchbox
    this.searchbox = document.createElement('input')
    this.searchbox.className = 'searchbox'
    this.searchbox.autofocus = true
    this.searchbox.tabIndex = 1
    /**
     * 検索ボックスに入力されたら検索する
     */
    this.searchbox.oninput = (e: InputEvent) => {
      log(this.searchbox.value)
      if (this.userInput !== this.searchbox.value) { // 入力によって値が変わった場合
        this.clear()
        if (this.searchbox.value === ''){ // 空ならタブを表示
          this.showAllTabs()
        } else {
          window.clearTimeout(this.timerID)
          this.timerID = window.setTimeout(this.search.bind(this), 300) // 0.3s
        }
        this.userInput = this.searchbox.value
      }
    }
    /**
     * searchboxのkeyboard event
     */
    this.searchbox.onkeydown = (e: any) => {
      if (!e.isComposing) {
        if (e.key === 'Enter') {
          chrome.tabs.create({url: `https://www.google.com/search?q=${this.searchbox.value}`})
        }
      }
    }
    this.root.appendChild(this.searchbox)
    
    // リストを表示するビュー
    this.view = document.createElement('ul')
    this.root.appendChild(this.view)
    
    // cloneの元になるhit
    this.hit = new Hit()
    
    // style
    const style = document.createElement('style')
    style.textContent = "@import url('css/hits.css');"
    this.root.appendChild(style)
    // event
    this.onkeydown = e => {
      if (e.key === 'ArrowUp') {
        this.moveFocusUp()
      } else if(e.key === 'ArrowDown') {
        this.moveFocusDown()
      }
    }

    // 描画時にやりたい処理
    window.onload = () => {
    }
  }

  public search() {
    // tabs, history, bookmarksを取得する
    chrome.tabs.query({}, tabs => {
      let candidates: ChromeItem[] = tabs
      chrome.history.search({ text: '', maxResults: 20 }, history => {
        candidates = deduplicate(candidates, history)
        chrome.bookmarks.getTree(tree => {
          const bookmarks = treeToFlatList(tree[0])
          candidates = deduplicate(candidates, bookmarks)
          const fuse = new Fuse(candidates, option)
          const result = fuse.search(this.searchbox.value)
          this.updateView(result)
        })
      })
    })
  }

  /**
   * show all tabs
   */
  public showAllTabs() {
    chrome.tabs.query({}, tabs => {
      tabs.forEach( (tab, i) => {
        const newHit = this.makeNewHit(tab, i + 2)
        this.view.appendChild(newHit)
      })
    })
  }

  /**
   * 検索結果を再描画
   * @param {*} list 
   */
  public updateView(list: any[]) {
    list.forEach( (item, i) => {
      const newHit = this.makeNewHit(item.item, i + 2)
      this.view.appendChild(newHit)
    })
  }

  /** 新しいHitをつくって返す */
  private makeNewHit(item: Tab|BookmarkTreeNode|HistoryItem, tabIndex: number) {
    const newHit = <Hit>this.hit.cloneNode(true)
    newHit.setContents(item)
    // tabIndexがある範囲にあるかどうかをチェックする
    let i = Math.trunc(tabIndex) 
    if (-1 <= i && i < 32767) {
      newHit.tabIndex = i // hitにtabIndexを定義
    }
    
    return newHit
  }

  /**
   * ビューを初期化
   */
  public clear() {
    while(this.view.firstChild) {
      this.view.removeChild(this.view.firstChild)
    }
  } 

  /**
   * open an url of a focused hit
   */
  public open() {
    const hits = this.getHits()
    hits.forEach( hit => {
      if(hit === <Hit>this.root.activeElement) hit.openPage()
    })
  }
  
  public closeTab() {
    const hits = this.getHits()
    hits.forEach( hit => {
      if(hit === <Hit>this.root.activeElement) hit.closeTab()
    })
  }

  /**
   * viewのchild elementをすべて取得する
   */
  public getHits(): Hit[] {
    return <Hit[]>[...this.view.children]
  }


  public moveFocusUp() {
    const prev = <Hit>this.root.activeElement.previousSibling
    prev.focus()
  }
  /**
   * move focus
   */
  public moveFocusDown() {
    const next = <Hit>this.root.activeElement.nextSibling
    next.focus()
  }
}

customElements.define('suggest-view', SuggestView)