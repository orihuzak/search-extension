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
  constructor() {
    super()
  }
}

customElements.define('search-box', SearchBox, { extends: 'input' })