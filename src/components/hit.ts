import { Tab, HistoryItem, BookmarkTreeNode, ChromeItem, isTab, isHistoryItem, isBookmarkTreeNode } from '../chrome-type'
import SuggestView from './suggest-view'

const log = console.log
export default class Hit extends HTMLElement {
  private shadow: ShadowRoot
  private itemID: number
  private type: string
  private wrapper: HTMLDivElement
  private url: HTMLDivElement
  private icon: HTMLImageElement
  public name: HTMLDivElement
  public focused: boolean
  // public tabIndex: number

  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'wrapper'
    this.icon = document.createElement('img')
    this.icon.width = 20
    this.icon.height = 20
    this.name = document.createElement('div')
    this.url = document.createElement('div')
    const dataWrapper = document.createElement('div')
    dataWrapper.className = 'card__data'
    dataWrapper.appendChild(this.name)
    dataWrapper.appendChild(this.url)
    // wrapperに追加
    this.wrapper.appendChild(this.icon)
    this.wrapper.appendChild(dataWrapper)
    this.wrapper.addEventListener('click', this.openPage.bind(this))
    // style
    const style = document.createElement('style')
    style.textContent = "@import url('css/hit.css');"
    // shadow domに追加
    this.shadow.appendChild(style)
    this.shadow.appendChild(this.wrapper)

    this.addEventListener('keydown', e => {
      if(e.key === 'Enter') {
        this.openPage()
      }
    })
  }

  /**
   * ヒットにタイトルとURLとアイコンURLを設定する
   * @param title website title
   * @param url website url
   * @param iconUrl website favicon url
   */
  public setContents(item: ChromeItem) {
    // itemの基本情報の設定
    // item.idがstringならnumberに変換
    this.itemID = typeof item.id === 'string' ? parseInt(item.id) : item.id
    // hitに表示するものを設定
    this.name.innerText = item.title
    this.url.innerText = decodeURI(item.url)
    if (isTab(item)) {
      this.type = 'tab'
      // set icon
      this.icon.src = item.favIconUrl
      // closeボタンを追加
      const closeButton = document.createElement('button')
      closeButton.className = 'card__close'
      closeButton.innerText = `close` // close: <shortcut>にしたい
      closeButton.addEventListener('click', this.closeTab.bind(this))
      this.wrapper.appendChild(closeButton)
    } else if (isHistoryItem(item)) {
      this.type = 'history'
      this.icon.src = './img/history.svg' // set icon
    }
    else if (isBookmarkTreeNode(item)) {
      this.type = 'bookmark'
      this.icon.src = './img/bookmark.svg' // set icon
    }
  }

  /** 
   * hitがクリックされたら発動します
   * openTabとopenPageの違いわかりづらいので名前を改善する
   **/
  public openPage() {
    if (this.type === 'tab') {
      chrome.tabs.update(this.itemID, {active: true}, tab => {
        chrome.windows.update(tab.windowId, {focused: true})
      })
    } else if (this.type === 'bookmark') {
      this.openTab()
    } else if (this.type === 'history') {
      this.openTab()
    }

  }

  /** 新しいタブで開く */
  public openTab() {
    chrome.tabs.create({url: this.url.innerText})
  }

  /**
   * タブを閉じ、リストから自身を削除する
   */
  public closeTab() {
    chrome.tabs.remove(this.itemID)
    this.parentNode.removeChild(this)
  }

  /** hitの状態を更新する */
  public update(option: {focused: boolean} = {focused: false}) {
    if(this.focused !== option.focused) {
      this.focused = option.focused
    }
    this.updateStyle()
  }

  /**
   * focusされたhitのためのstyle変更
   */
  private updateStyle(){
    if (this.focused) {
      this.wrapper.className += '-focused'
    } else {
      this.wrapper.className = 'wrapper'
    }
  }

  /**
   * フォーカスする
   */
  public focus() {
    this.update({focused: true})
    this.scrollIntoView({behavior: 'smooth', block: 'nearest'})
  }

  /**
   * フォーカスを外す
   */
  public blur() {
    this.update({focused: false})
  }
}

customElements.define('hit-view', Hit)