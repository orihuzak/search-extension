import { Tab, HistoryItem, BookmarkTreeNode, ChromeItem, isTab, isHistoryItem, isBookmarkTreeNode } from '../chrome-type'
const log = console.log

const cssName = {
  card: 'card',
  cardFocued: 'card--focused',
  icon: 'card__icon',
  data: 'card__dataWrapper',
  title: 'card__title',
  url: 'card__url',
  close: 'card__close'
}

export default class Hit extends HTMLElement {
  private shadow: ShadowRoot
  private itemID: number
  private itemType: string
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
    this.wrapper.className = cssName.card
    // icon
    this.icon = document.createElement('img')
    this.icon.className = cssName.icon
    this.icon.width = 20
    this.icon.height = 20

    // data wrapper
    const dataWrapper = document.createElement('div')
    dataWrapper.className = cssName.data
    // title
    this.name = document.createElement('div')
    this.name.className = cssName.title
    // url
    this.url = document.createElement('div')
    // data wrapperに追加
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
      this.itemType = 'tab'
      // set icon
      this.icon.src = item.favIconUrl
      // closeボタンを追加
      const closeButton = document.createElement('button')
      closeButton.className = cssName.close
      closeButton.innerText = `×` // close: <shortcut>にしたい
      closeButton.addEventListener('click', this.closeTab.bind(this))
      this.wrapper.appendChild(closeButton)
    } else if (isHistoryItem(item)) {
      this.itemType = 'history'
      this.icon.src = './img/history.svg' // set icon
    }
    else if (isBookmarkTreeNode(item)) {
      this.itemType = 'bookmark'
      this.icon.src = './img/bookmark.svg' // set icon
    }
  }

  /** 
   * hitがクリックされたら発動します
   * openTabとopenPageの違いわかりづらいので名前を改善する
   **/
  public openPage() {
    if (this.itemType === 'tab') {
      chrome.tabs.update(this.itemID, {active: true}, tab => {
        chrome.windows.update(tab.windowId, {focused: true})
      })
    } else if (this.itemType === 'bookmark') {
      this.openTab()
    } else if (this.itemType === 'history') {
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
      this.wrapper.className = cssName.cardFocued
    } else {
      this.wrapper.className = cssName.card
    }
  }

  /**
   * フォーカスする
   */
  public focus() {
    this.update({focused: true})
    if (this.parentNode.firstChild === this) {
      // 自身がfirst childなら一番上までスクロールする
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      this.scrollIntoView({behavior: 'smooth', block: 'nearest'})
    }
  }

  /**
   * フォーカスを外す
   */
  public blur() {
    this.update({focused: false})
  }
}

customElements.define('hit-view', Hit)