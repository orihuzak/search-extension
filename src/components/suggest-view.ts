const log = console.log
import { Tab, HistoryItem, BookmarkTreeNode } from '../chrome-type'
import { FuseResult, FuseOptions } from 'fuse.js'
import Hit from './hit'
// このファイルからchrome apiは使えない
// 使いたいときは引数でもらう
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
}

customElements.define('suggest-view', SuggestView)