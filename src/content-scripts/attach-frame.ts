const frame = document.createElement('iframe')
frame.id = 'orih-frame'
frame.src = chrome.extension.getURL('view.html')

chrome.runtime.onMessage.addListener((message, sender) => {
  if (document.getElementById('orih-frame')){
    document.documentElement.removeChild(frame)
  } else {
    document.documentElement.appendChild(frame)
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