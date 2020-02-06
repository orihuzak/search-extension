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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const suggest_view_1 = __webpack_require__(1);
const view = new suggest_view_1.default();
document.body.appendChild(view);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log = console.log;
const hit_1 = __webpack_require__(2);
class SuggestView extends HTMLElement {
    constructor() {
        super();
        this.userInput = '';
        this.root = this.attachShadow({ mode: 'open' });
        this.searchbox = document.createElement('input');
        this.searchbox.className = 'searchbox';
        this.searchbox.oninput = (e) => {
            if (this.userInput !== this.searchbox.value) {
                this.clear();
                if (this.searchbox.value === '') {
                    window.clearTimeout(this.timerID);
                    this.showAllTabs();
                }
                else {
                    window.clearTimeout(this.timerID);
                    this.timerID = window.setTimeout(this.search.bind(this), 300);
                }
                this.userInput = this.searchbox.value;
            }
        };
        this.searchbox.onkeydown = (e) => {
            if (!e.isComposing) {
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
        this.view = document.createElement('div');
        this.view.className = 'view';
        this.root.appendChild(this.view);
        this.hit = new hit_1.default();
        const style = document.createElement('style');
        style.textContent = "@import url('css/hits.css');";
        this.root.appendChild(style);
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
    showAllTabs() {
        chrome.runtime.sendMessage({ defaultSuggests: true }, res => {
            res.defaultSuggests.forEach((item, i) => {
                const newHit = this.makeNewHit(item);
                this.view.appendChild(newHit);
            });
        });
    }
    updateView(list) {
        list.forEach((item, i) => {
            const newHit = this.makeNewHit(item.item);
            this.view.appendChild(newHit);
        });
    }
    makeNewHit(item) {
        const newHit = this.hit.cloneNode(true);
        newHit.setContents(item);
        return newHit;
    }
    clear() {
        while (this.view.firstChild) {
            this.view.removeChild(this.view.firstChild);
        }
    }
    open() {
        const hits = this.getHits();
        let focusCheck = true;
        hits.forEach(hit => {
            if (hit.focused) {
                hit.openPage();
                focusCheck = false;
            }
        });
        if (focusCheck) {
            chrome.tabs.create({ url: `https://www.google.com/search?q=${this.searchbox.value}` });
        }
    }
    closeTab() {
        const focused = this.getFocusedHit();
        if (focused)
            focused.closeTab();
    }
    getHits() {
        return [...this.view.children];
    }
    getFocusedHit() {
        const hits = this.getHits();
        for (let hit of hits)
            if (hit.focused)
                return hit;
        return false;
    }
    moveFocus(flag) {
        const focused = this.getFocusedHit();
        if (focused) {
            focused.blur();
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
        else {
            const next = (flag ? this.view.firstChild : this.view.lastChild);
            next.focus();
            this.setPlaceHolder(next);
        }
    }
    focusDown() {
        this.moveFocus(true);
    }
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const chrome_type_1 = __webpack_require__(3);
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
    return (decodeURI(x) !== decodeURIComponent(x));
}
class Hit extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.wrapper = document.createElement('div');
        this.wrapper.className = cssName.card;
        this.icon = document.createElement('img');
        this.icon.className = cssName.icon;
        this.icon.width = 20;
        this.icon.height = 20;
        const dataWrapper = document.createElement('div');
        dataWrapper.className = cssName.data;
        this.name = document.createElement('div');
        this.name.className = cssName.title;
        this.url = document.createElement('div');
        dataWrapper.appendChild(this.name);
        dataWrapper.appendChild(this.url);
        this.wrapper.appendChild(this.icon);
        this.wrapper.appendChild(dataWrapper);
        this.wrapper.addEventListener('click', this.openPage.bind(this));
        const style = document.createElement('style');
        style.textContent = "@import url('css/hit.css');";
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.wrapper);
        this.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                this.openPage();
            }
        });
    }
    setContents(item) {
        this.itemID = typeof item.id === 'string' ? parseInt(item.id) : item.id;
        this.name.innerText = item.title;
        try {
            this.url.innerText = decodeURI(item.url);
        }
        catch (err) {
            this.url.innerText = item.url;
        }
        if (chrome_type_1.isTab(item)) {
            this.itemType = 'tab';
            this.icon.src = item.favIconUrl;
            const closeButton = document.createElement('button');
            closeButton.className = cssName.close;
            closeButton.innerText = `×`;
            closeButton.addEventListener('click', this.closeTab.bind(this));
            this.wrapper.appendChild(closeButton);
        }
        else if (chrome_type_1.isHistoryItem(item)) {
            this.itemType = 'history';
            this.icon.src = './img/history.svg';
        }
        else if (chrome_type_1.isBookmarkTreeNode(item)) {
            this.itemType = 'bookmark';
            this.icon.src = './img/bookmark.svg';
        }
    }
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
    openTab() {
        chrome.tabs.create({ url: this.url.innerText });
    }
    closeTab() {
        chrome.tabs.remove(this.itemID);
        this.parentNode.removeChild(this);
    }
    update(option = { focused: false }) {
        if (this.focused !== option.focused) {
            this.focused = option.focused;
        }
        this.updateStyle();
    }
    updateStyle() {
        if (this.focused) {
            this.wrapper.className = cssName.cardFocued;
        }
        else {
            this.wrapper.className = cssName.card;
        }
    }
    focus() {
        this.update({ focused: true });
        if (this.parentNode.firstChild === this) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else {
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    blur() {
        this.update({ focused: false });
    }
}
exports.default = Hit;
customElements.define('hit-view', Hit);


/***/ }),
/* 3 */
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


/***/ })
/******/ ]);