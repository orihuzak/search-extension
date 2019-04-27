import { Tab, HistoryItem, BookmarkTreeNode } from '../chrome-type'
export default class Hit extends HTMLElement {
  private shadow: ShadowRoot
  private name: HTMLDivElement
  private url: HTMLDivElement
  private icon: HTMLImageElement
  private itemID: string | number
  private type: string

  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    this.icon = document.createElement('img')
    this.icon.width = 20
    this.icon.height = 20
    this.name = document.createElement('div')
    this.url = document.createElement('div')
    const dataWrapper = document.createElement('div')
    dataWrapper.appendChild(this.name)
    dataWrapper.appendChild(this.url)
    wrapper.appendChild(this.icon)
    wrapper.appendChild(dataWrapper)
    wrapper.addEventListener('click', this.clicked)
    // style
    const style = document.createElement('style')
    style.textContent = "@import url('css/hit.css');"
    // shadow domに追加
    this.shadow.appendChild(style)
    this.shadow.appendChild(wrapper)
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
    this.type = typeof item
    if('active' in item) this.type = 'tab'
    else if('lastVisitTime' in item) this.type = 'history'
    else if('dateAdded' in item) this.type = 'bookmark'
    // hitに表示するものを設定
    this.name.innerText = item.title
    this.url.innerText = decodeURI(item.url)
    // iconの設定
    if(this.type === 'tab') this.icon.src = item.favIconUrl
    else if (this.type === 'bookmark') this.icon.src = './bookmark.png'
    else if (this.type === 'history') this.icon.src = './history.png'
  }

  private clicked() {

  }
}

customElements.define('hit-view', Hit)