const log = console.log
let commands
chrome.commands.getAll( cmds => {
  commands = cmds
})
/**
 * popup.htmlの表示位置を定義する
 */
chrome.browserAction.onClicked.addListener( () => {
  const w = 440
  const h = 220
  const left = (screen.width/2)-(w/2)
  const top = (screen.height/2)-(h/2) 

  chrome.windows.create({
    'url': './popup.html',
    'type': 'popup',
    'width': w,
    'height': h,
    'left': left,
    'top': top
  })
})

/**
 * extensionが有効になったときに発火
 */
chrome.management.onEnabled.addListener(info => {
  log(info)
})