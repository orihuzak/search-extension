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
        // tab keyを無効化
        if (e.key === 'Tab') {
          if (e.shiftKey) this.focusUp()
          else this.focusDown()
          return false
        } else if (e.key === 'ArrowUp') {
          this.focusUp()
          return false
        } else if (e.key === 'ArrowDown'){
          this.focusDown()
          return false
        } else if (e.key === 'Enter') {
          this.open()
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
        const newHit = this.makeNewHit(tab)
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
      const newHit = this.makeNewHit(item.item)
      this.view.appendChild(newHit)
    })
  }

  /** 新しいHitをつくって返す */
  private makeNewHit(item: Tab|BookmarkTreeNode|HistoryItem) {
    const newHit = <Hit>this.hit.cloneNode(true)
    newHit.setContents(item)
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
    let focusCheck: boolean = true // focusedHitがあったかどうかを判定するために使う
    hits.forEach( hit => {
      if(hit.focused) {
        hit.openPage()
        focusCheck = false
      }
    })
    if(focusCheck) { // focused hitがなければ検索
      chrome.tabs.create({url: `https://www.google.com/search?q=${this.searchbox.value}`})
    }
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

  /**
   * move focus
   * 不必要に複雑な感じがある・・・
   * @param direction if true move down, false move up
   */
  private switchFocus(direction: boolean = true) {
    const hits = this.getHits()
    let focusedIndex: number = null
    for(let i = 0; i < hits.length; i++) {
      if(hits[i].focused) {
        focusedIndex = i
        break
      }
    }
    // フォーカスがない場合は、最初の要素にフォーカス
    if (focusedIndex === null) {
      hits[direction ? 0 : hits.length-1].update({focused: true})
    } else if (focusedIndex === 0) {
      // down 最初にフォーカスが当たっている場合、次の要素
      // up 最後の要素
      hits[0].update({focused: false})
      hits[direction ? focusedIndex + 1 : hits.length-1].update({focused:true})
    // フォーカスが0 < x < lastに当たっているなら次の要素にフォーカス
    } else if(0 < focusedIndex && focusedIndex < hits.length - 1 ) {
      hits[focusedIndex].update({focused: false})
      hits[direction ? focusedIndex + 1 : focusedIndex - 1].update({focused: true})
    // down: 最後の要素にフォーカスが当たっていれば、最初の要素にフォーカス
    // up: 最後から2番目の要素にフォーカス
    } else if (focusedIndex === hits.length - 1) {
      hits[focusedIndex].update({focused: false})
      hits[direction ? 0 : focusedIndex - 1].update({focused: true}) 
    }
  }

  /**
   * focusされたhitを返す。なければfalseを返す
   */
  private getFocusedHit(): Hit|false {
    const hits = this.getHits()
    for (let hit of hits) if (hit.focused) return hit
    return false
  }

  /**
   * focus down
   */
  public focusDown() {
    // this.switchFocus(true)
    const focused = this.getFocusedHit()
    if (focused) { // Hitが帰ったらかどうかを判断
      // 次のhitがあれば次をfocus、なければ最初のhitをfocus
      if(focused.nextSibling) {
        focused.blur();
        (<Hit>focused.nextSibling).focus()
      } else {
        focused.blur();
        (<Hit>this.view.firstChild).focus()
      }
    } else (<Hit>this.view.firstChild).focus()  // 返ってなければ最初のhitをfocus
  }

  /**
   * focus up
   */
  public focusUp() {
    // this.switchFocus(false)
    const focused = this.getFocusedHit()
    log(focused)
    if (focused) { // Hitが帰ったらかどうかを判断
      // 次のhitがあれば次をfocus、なければ最初のhitをfocus
      if(focused.previousSibling) {
        focused.blur();
        (<Hit>focused.previousSibling).focus()
      } else {
        focused.blur();
        (<Hit>this.view.lastChild).focus()
      }
    } else (<Hit>this.view.lastChild).focus() // 返ってなければ最後のhitをfocus
  }
}

customElements.define('suggest-view', SuggestView)