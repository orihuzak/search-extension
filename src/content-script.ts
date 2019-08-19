const log = console.log
const frame = document.createElement('iframe')
frame.id = 'orih-frame'
frame.src = chrome.extension.getURL('view.html')
// frame.scrolling = 'no'

// view以外の場所をクリックしたら、viewを消す
document.body.onclick = (click: MouseEvent) => {
  if (document.getElementById('orih-frame')) {
    const rect = frame.getBoundingClientRect()
    if (click.x < rect.left || click.x > rect.right
      || click.y < rect.top || click.y > rect.bottom) {
        document.documentElement.removeChild(frame)
    }
  }
}

// viewの表示非表示を管理する
chrome.runtime.onMessage.addListener((message, sender) => {
  if (document.getElementById('orih-frame')){
    document.documentElement.removeChild(frame)
  } else {
    document.documentElement.appendChild(frame)
  }
  if (message === 'unactive') {
    document.documentElement.removeChild(frame)
  }
})

 
/**
 * extension用のコマンドのevent listener
 */
// chrome.commands.onCommand.addListener( cmd => {
//   if(cmd === 'close-tab') {
//     view.closeTab()
//   }
// })