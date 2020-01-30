const log = console.log
import { Tab, HistoryItem, BookmarkTreeNode, ChromeItem } from '../chrome-type'
import Hit from './hit'

/**
 * サジェスト用のviewクラス
 * 引数はidやclassをプロパティに持つobject
 */
export default class SuggestView extends HTMLElement {
  public root: ShadowRoot
  public searchbox: HTMLInputElement
  public view: HTMLDivElement
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

    /**
     * 検索ボックスに入力されたら検索する
     */
    this.searchbox.oninput = (e: InputEvent) => {
      if (this.userInput !== this.searchbox.value) { // 入力によって値が変わった場合
        this.clear()
        if (this.searchbox.value === ''){ // 空ならタブを表示
          window.clearTimeout(this.timerID)
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
    this.view = document.createElement('div')
    this.view.className = 'view'
    this.root.appendChild(this.view)
    
    // cloneの元になるhit
    this.hit = new Hit()
    
    // style
    const style = document.createElement('style')
    style.textContent = "@import url('css/hits.css');"
    this.root.appendChild(style)

    // 描画時にやりたい処理
    window.onload = () => {
      this.searchbox.focus()
      const rect = this.searchbox.getBoundingClientRect()
      this.view.style.paddingTop = rect.bottom + 'px'
      this.view.style.top = rect.bottom + 'px'
      this.showAllTabs()
    }
  }

  public search() {
    chrome.runtime.sendMessage({searchWord: this.searchbox.value},
      (res) => {
        this.updateView(res.searchResult)
    })
  }

  /**
   * show all tabs
   */
  public showAllTabs() {
    chrome.runtime.sendMessage({defaultSuggests: true}, res => {
      res.defaultSuggests.forEach( (item, i) => {
        const newHit = this.makeNewHit(item)
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
      // fuseはこちら fuseはitem.itemにする必要がある
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
    const focused = this.getFocusedHit()
    if (focused) focused.closeTab()
  }

  /**
   * viewのchild elementをすべて取得する
   */
  public getHits(): Hit[] {
    return <Hit[]>[...this.view.children]
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
   * move Focus
   * @param flag if flag is true focuse up, false focus down 
   */
  private moveFocus(flag: boolean) {
    const focused = this.getFocusedHit()
    if (focused) { // focused hitがあるかどうかを判定
      focused.blur()
      // 次のhitがあれば次をfocus、なければ最初のhitをfocus
      const nextNode = flag ? focused.nextSibling : focused.previousSibling
      if(nextNode) {
        const next = <Hit>nextNode
        next.focus()
        this.setPlaceHolder(next)
      } else {
        const next = <Hit>(flag ? this.view.firstChild : this.view.lastChild)
        next.focus()
        this.setPlaceHolder(next)
      }
    } else { // focused hitがなければ最初のhitをfocus
      const next = <Hit>(flag ? this.view.firstChild : this.view.lastChild)
      next.focus()
      this.setPlaceHolder(next)
    }
  }

  /**
   * focus down
   */
  public focusDown() {
    this.moveFocus(true)
  }

  /**
   * focus up
   */
  public focusUp() {
    this.moveFocus(false)
  }


  public setPlaceHolder(hit: Hit) {
    this.searchbox.placeholder = hit.name.innerText
  }
}

customElements.define('suggest-view', SuggestView)