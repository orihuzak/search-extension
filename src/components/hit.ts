import { Tab, HistoryItem, BookmarkTreeNode } from '../chrome-type'
import SuggestView from './suggest-view'

const log = console.log
export default class Hit extends HTMLElement {
  private shadow: ShadowRoot
  private itemID: number
  private type: string
  private wrapper: HTMLDivElement
  private name: HTMLDivElement
  private url: HTMLDivElement
  private icon: HTMLImageElement
  public focused: boolean  // フォーカスが当たっているかどうか

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
  }

  /**
   * ヒットにタイトルとURLとアイコンURLを設定する
   * @param title website title
   * @param url website url
   * @param iconUrl website favicon url
   */
  public setContents(item: any) {
    // itemの基本情報の設定
    this.itemID = item.id
    if('active' in item) {
      this.type = 'tab'
      // closeボタンを追加
      const closeButton = document.createElement('button')
      closeButton.className = 'card__close'
      closeButton.innerText = `close` // close: <shortcut>にしたい
      closeButton.addEventListener('click', this.closeTab.bind(this))
      this.wrapper.appendChild(closeButton)
    } else if ('lastVisitTime' in item) this.type = 'history'
    else if ('dateAdded' in item) this.type = 'bookmark'
    // hitに表示するものを設定
    this.name.innerText = item.title
    this.url.innerText = decodeURI(item.url)
    // iconの設定
    if(this.type === 'tab') this.icon.src = item.favIconUrl
    else if (this.type === 'bookmark') this.icon.src = './img/bookmark.png'
    else if (this.type === 'history') this.icon.src = './img/history.png'
  }

  /** hitがクリックされたら発動します */
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

  private updateStyle(){
    if (this.focused) {
      this.wrapper.className += '-focused'
    } else {
      this.wrapper.className = 'wrapper'
    }
  }
}

customElements.define('hit-view', Hit)