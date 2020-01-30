/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/view.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chrome-type.ts":
/*!****************************!*\
  !*** ./src/chrome-type.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isTab(item) {
    return item.active !== undefined;
}
exports.isTab = isTab;
function isHistoryItem(item) {
    return item.visitCount !== undefined;
}
exports.isHistoryItem = isHistoryItem;
function isBookmarkTreeNode(item) {
    return item.dateAdded !== undefined;
}
exports.isBookmarkTreeNode = isBookmarkTreeNode;


/***/ }),

/***/ "./src/components/hit.ts":
/*!*******************************!*\
  !*** ./src/components/hit.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chrome_type_1 = __webpack_require__(/*! ../chrome-type */ "./src/chrome-type.ts");
const log = console.log;
const cssName = {
    card: 'card',
    cardFocued: 'card--focused',
    icon: 'card__icon',
    data: 'card__dataWrapper',
    title: 'card__title',
    url: 'card__url',
    close: 'card__close'
};
function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return (decodeURI(x) !== decodeURIComponent(x));
}
class Hit extends HTMLElement {
    // public tabIndex: number
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.wrapper = document.createElement('div');
        this.wrapper.className = cssName.card;
        // icon
        this.icon = document.createElement('img');
        this.icon.className = cssName.icon;
        this.icon.width = 20;
        this.icon.height = 20;
        // data wrapper
        const dataWrapper = document.createElement('div');
        dataWrapper.className = cssName.data;
        // title
        this.name = document.createElement('div');
        this.name.className = cssName.title;
        // url
        this.url = document.createElement('div');
        // data wrapperに追加
        dataWrapper.appendChild(this.name);
        dataWrapper.appendChild(this.url);
        // wrapperに追加
        this.wrapper.appendChild(this.icon);
        this.wrapper.appendChild(dataWrapper);
        this.wrapper.addEventListener('click', this.openPage.bind(this));
        // style
        const style = document.createElement('style');
        style.textContent = "@import url('css/hit.css');";
        // shadow domに追加
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.wrapper);
        this.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                this.openPage();
            }
        });
    }
    /**
     * ヒットにタイトルとURLとアイコンURLを設定する
     * @param title website title
     * @param url website url
     * @param iconUrl website favicon url
     */
    setContents(item) {
        // itemの基本情報の設定
        // item.idがstringならnumberに変換
        this.itemID = typeof item.id === 'string' ? parseInt(item.id) : item.id;
        // hitに表示するものを設定
        this.name.innerText = item.title;
        try {
            this.url.innerText = decodeURI(item.url);
        }
        catch (err) {
            this.url.innerText = item.url;
        }
        if (chrome_type_1.isTab(item)) {
            this.itemType = 'tab';
            // set icon
            this.icon.src = item.favIconUrl;
            // closeボタンを追加
            const closeButton = document.createElement('button');
            closeButton.className = cssName.close;
            closeButton.innerText = `×`; // close: <shortcut>にしたい
            closeButton.addEventListener('click', this.closeTab.bind(this));
            this.wrapper.appendChild(closeButton);
        }
        else if (chrome_type_1.isHistoryItem(item)) {
            this.itemType = 'history';
            this.icon.src = './img/history.svg'; // set icon
        }
        else if (chrome_type_1.isBookmarkTreeNode(item)) {
            this.itemType = 'bookmark';
            this.icon.src = './img/bookmark.svg'; // set icon
        }
    }
    /**
     * hitがクリックされたら発動します
     * openTabとopenPageの違いわかりづらいので名前を改善する
     **/
    openPage() {
        if (this.itemType === 'tab') {
            chrome.tabs.update(this.itemID, { active: true }, tab => {
                chrome.windows.update(tab.windowId, { focused: true });
            });
        }
        else if (this.itemType === 'bookmark') {
            this.openTab();
        }
        else if (this.itemType === 'history') {
            this.openTab();
        }
    }
    /** 新しいタブで開く */
    openTab() {
        chrome.tabs.create({ url: this.url.innerText });
    }
    /**
     * タブを閉じ、リストから自身を削除する
     */
    closeTab() {
        chrome.tabs.remove(this.itemID);
        this.parentNode.removeChild(this);
    }
    /** hitの状態を更新する */
    update(option = { focused: false }) {
        if (this.focused !== option.focused) {
            this.focused = option.focused;
        }
        this.updateStyle();
    }
    /**
     * focusされたhitのためのstyle変更
     */
    updateStyle() {
        if (this.focused) {
            this.wrapper.className = cssName.cardFocued;
        }
        else {
            this.wrapper.className = cssName.card;
        }
    }
    /**
     * フォーカスする
     */
    focus() {
        this.update({ focused: true });
        if (this.parentNode.firstChild === this) {
            // 自身がfirst childなら一番上までスクロールする
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else {
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    /**
     * フォーカスを外す
     */
    blur() {
        this.update({ focused: false });
    }
}
exports.default = Hit;
customElements.define('hit-view', Hit);


/***/ }),

/***/ "./src/components/suggest-view.ts":
/*!****************************************!*\
  !*** ./src/components/suggest-view.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log = console.log;
const hit_1 = __webpack_require__(/*! ./hit */ "./src/components/hit.ts");
/**
 * サジェスト用のviewクラス
 * 引数はidやclassをプロパティに持つobject
 */
class SuggestView extends HTMLElement {
    constructor() {
        super();
        this.userInput = '';
        // shadow root
        this.root = this.attachShadow({ mode: 'open' });
        // searchbox
        this.searchbox = document.createElement('input');
        this.searchbox.className = 'searchbox';
        /**
         * 検索ボックスに入力されたら検索する
         */
        this.searchbox.oninput = (e) => {
            if (this.userInput !== this.searchbox.value) { // 入力によって値が変わった場合
                this.clear();
                if (this.searchbox.value === '') { // 空ならタブを表示
                    this.showAllTabs();
                }
                else {
                    window.clearTimeout(this.timerID);
                    this.timerID = window.setTimeout(this.search.bind(this), 300); // 0.3s
                }
                this.userInput = this.searchbox.value;
            }
        };
        /**
         * searchboxのkeyboard event
         */
        this.searchbox.onkeydown = (e) => {
            if (!e.isComposing) {
                // tab keyを無効化
                if (e.key === 'Tab') {
                    if (e.shiftKey)
                        this.focusUp();
                    else
                        this.focusDown();
                    return false;
                }
                else if (e.key === 'ArrowUp') {
                    this.focusUp();
                    return false;
                }
                else if (e.key === 'ArrowDown') {
                    this.focusDown();
                    return false;
                }
                else if (e.key === 'Enter') {
                    this.open();
                }
            }
        };
        this.root.appendChild(this.searchbox);
        // リストを表示するビュー
        this.view = document.createElement('div');
        this.view.className = 'view';
        this.root.appendChild(this.view);
        // cloneの元になるhit
        this.hit = new hit_1.default();
        // style
        const style = document.createElement('style');
        style.textContent = "@import url('css/hits.css');";
        this.root.appendChild(style);
        // 描画時にやりたい処理
        window.onload = () => {
            this.searchbox.focus();
            const rect = this.searchbox.getBoundingClientRect();
            this.view.style.paddingTop = rect.bottom + 'px';
            this.view.style.top = rect.bottom + 'px';
            this.showAllTabs();
        };
    }
    search() {
        chrome.runtime.sendMessage({ searchWord: this.searchbox.value }, (res) => {
            this.updateView(res.searchResult);
        });
    }
    /**
     * show all tabs
     */
    showAllTabs() {
        chrome.runtime.sendMessage({ defaultSuggests: true }, res => {
            res.defaultSuggests.forEach((item, i) => {
                const newHit = this.makeNewHit(item);
                this.view.appendChild(newHit);
            });
        });
    }
    /**
     * 検索結果を再描画
     * @param {*} list
     */
    updateView(list) {
        list.forEach((item, i) => {
            // fuseはこちら fuseはitem.itemにする必要がある
            const newHit = this.makeNewHit(item.item);
            this.view.appendChild(newHit);
        });
    }
    /** 新しいHitをつくって返す */
    makeNewHit(item) {
        const newHit = this.hit.cloneNode(true);
        newHit.setContents(item);
        return newHit;
    }
    /**
     * ビューを初期化
     */
    clear() {
        while (this.view.firstChild) {
            this.view.removeChild(this.view.firstChild);
        }
    }
    /**
     * open an url of a focused hit
     */
    open() {
        const hits = this.getHits();
        let focusCheck = true; // focusedHitがあったかどうかを判定するために使う
        hits.forEach(hit => {
            if (hit.focused) {
                hit.openPage();
                focusCheck = false;
            }
        });
        if (focusCheck) { // focused hitがなければ検索
            chrome.tabs.create({ url: `https://www.google.com/search?q=${this.searchbox.value}` });
        }
    }
    closeTab() {
        const focused = this.getFocusedHit();
        if (focused)
            focused.closeTab();
    }
    /**
     * viewのchild elementをすべて取得する
     */
    getHits() {
        return [...this.view.children];
    }
    /**
     * focusされたhitを返す。なければfalseを返す
     */
    getFocusedHit() {
        const hits = this.getHits();
        for (let hit of hits)
            if (hit.focused)
                return hit;
        return false;
    }
    /**
     * move Focus
     * @param flag if flag is true focuse up, false focus down
     */
    moveFocus(flag) {
        const focused = this.getFocusedHit();
        if (focused) { // focused hitがあるかどうかを判定
            focused.blur();
            // 次のhitがあれば次をfocus、なければ最初のhitをfocus
            const nextNode = flag ? focused.nextSibling : focused.previousSibling;
            if (nextNode) {
                const next = nextNode;
                next.focus();
                this.setPlaceHolder(next);
            }
            else {
                const next = (flag ? this.view.firstChild : this.view.lastChild);
                next.focus();
                this.setPlaceHolder(next);
            }
        }
        else { // focused hitがなければ最初のhitをfocus
            const next = (flag ? this.view.firstChild : this.view.lastChild);
            next.focus();
            this.setPlaceHolder(next);
        }
    }
    /**
     * focus down
     */
    focusDown() {
        this.moveFocus(true);
    }
    /**
     * focus up
     */
    focusUp() {
        this.moveFocus(false);
    }
    setPlaceHolder(hit) {
        this.searchbox.placeholder = hit.name.innerText;
    }
}
exports.default = SuggestView;
customElements.define('suggest-view', SuggestView);


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const suggest_view_1 = __webpack_require__(/*! ./components/suggest-view */ "./src/components/suggest-view.ts");
// document.body.innerText = 'view.tsからの挨拶です'
const view = new suggest_view_1.default();
document.body.appendChild(view);


/***/ })

/******/ });
//# sourceMappingURL=view.js.map