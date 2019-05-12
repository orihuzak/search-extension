export type Tab = chrome.tabs.Tab
export type HistoryItem = chrome.history.HistoryItem
export type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode
export type ChromeItem = Tab | HistoryItem | BookmarkTreeNode

export function isTab(item: ChromeItem): item is Tab {
  return (<Tab>item).active !== undefined
}

export function isHistoryItem(item: ChromeItem): item is HistoryItem {
  return (<HistoryItem>item).visitCount !== undefined
}

export function isBookmarkTreeNode(item: ChromeItem): item is BookmarkTreeNode {
  return (<BookmarkTreeNode>item).dateAdded !== undefined
}
