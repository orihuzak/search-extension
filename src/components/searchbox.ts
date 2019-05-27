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

export default class SearchBox extends HTMLInputElement {
  private userInput: string
  constructor() {
    super()
    this.className = 'searchbox'
    this.autofocus = true
    /**
     * 検索ボックスに入力されたら検索する
     */
    this.oninput = (e: InputEvent) => {
      if (this.userInput !== this.value) { // 入力によって値が変わった場合
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
  }
}

customElements.define('search-box', SearchBox, { extends: 'input' })