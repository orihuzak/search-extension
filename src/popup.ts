import SuggestView from './components/suggest-view'

const log = console.log
// 検索結果の表示view
const view = new SuggestView()
document.body.appendChild(view)

// window events
/**
 * popupが表示されたら実行される処理
 */
window.onload = () => {
  view.showAllTabs()
}

/**
 * extension用のコマンドのevent listener
 */
chrome.commands.onCommand.addListener( cmd => {
  if(cmd === 'close-tab') {
    view.closeTab()
  }
})
