const log = console.log
import { Tab, HistoryItem, BookmarkTreeNode } from '../chrome-type'
import { FuseResult, FuseOptions } from 'fuse.js'
import Hit from './hit'
/**
 * サジェスト用のviewクラス
 * 引数はidやclassをプロパティに持つobject
 */
export default class SuggestView extends HTMLElement {
  public root: ShadowRoot
  public view: HTMLUListElement
  private hit: Hit

  constructor() {
    super()
    this.root = this.attachShadow({mode:'open'})
    // リストを表示するビュー
    this.view = document.createElement('ul')
    this.hit = new Hit()
    this.root.appendChild(this.view)
    
    // style
    const style = document.createElement('style')
    style.textContent = "@import url('css/hits.css');"
    this.root.appendChild(style)

    window.onload = () => {
    }
  }

  /**
   * ビューを再描画
   * @param {*} list array of object
   */
  public update(list: Tab[]){
    list.forEach( item => {
      const newHit = <Hit>this.hit.cloneNode()
      newHit.setContents(item)
      this.view.appendChild(newHit)
    })
  }

  /**
   * 検索結果を再描画
   * @param {*} list 
   */
  public updateResult(list: any[]) {
    list.forEach( item => {
      log(item.item.constructor.name)
      const newHit = <Hit>this.hit.cloneNode(true)
      newHit.setContents(item.item)
      this.view.appendChild(newHit)
    })
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
   * move focus
   * 不必要に複雑な感じがある・・・
   * @param direction if true move down, false move up
   */
  private switchFocus(direction: boolean = true) {
    const hits = <Hit[]>[...this.view.children]
    let focusedIndex: number = null
    for(let i = 0; i < hits.length; i++) {
      if(hits[i].focused) focusedIndex = i
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

  public focusDown() {
    this.switchFocus(true)
  }

  public focusUp() {
    this.switchFocus(false)
  }

  public open(){
    const hits = <Hit[]>[...this.view.children]
    hits.forEach( hit => {
      if(hit.focused) hit.openPage()
    })
  }
  
  public closeTab() {
    const hits = <Hit[]>[...this.view.children]
    hits.forEach( hit => {
      if(hit.focused) hit.closeTab()
    })
  }
}

customElements.define('suggest-view', SuggestView)