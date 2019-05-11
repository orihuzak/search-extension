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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/popup.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fuse.js/dist/fuse.js":
/*!*******************************************!*\
  !*** ./node_modules/fuse.js/dist/fuse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.4.4 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=n(2),a=n(8),s=n(0),c=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,h=void 0===c?.6:c,l=n.maxPatternLength,u=void 0===l?32:l,f=n.caseSensitive,d=void 0!==f&&f,v=n.tokenSeparator,p=void 0===v?/ +/g:v,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m,S=n.id,x=void 0===S?null:S,b=n.keys,M=void 0===b?[]:b,_=n.shouldSort,L=void 0===_||_,w=n.getFn,A=void 0===w?a:w,C=n.sortFn,I=void 0===C?function(e,t){return e.score-t.score}:C,O=n.tokenize,j=void 0!==O&&O,P=n.matchAllTokens,F=void 0!==P&&P,T=n.includeMatches,z=void 0!==T&&T,E=n.includeScore,K=void 0!==E&&E,$=n.verbose,J=void 0!==$&&$;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k,id:x,keys:M,includeMatches:z,includeScore:K,shouldSort:L,getFn:A,sortFn:I,verbose:J,tokenize:j,matchAllTokens:F},this.setCollection(t)}var t,n,c;return t=e,(n=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var n=this._prepareSearchers(e),r=n.tokenSearchers,o=n.fullSearcher,i=this._search(r,o),a=i.weights,s=i.results;return this._computeScore(a,s),this.options.shouldSort&&this._sort(s),t.limit&&"number"==typeof t.limit&&(s=s.slice(0,t.limit)),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var n=e.split(this.options.tokenSeparator),r=0,o=n.length;r<o;r+=1)t.push(new i(n[r],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=this.list,r={},o=[];if("string"==typeof n[0]){for(var i=0,a=n.length;i<a;i+=1)this._analyze({key:"",value:n[i],record:i,index:i},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var s={},c=0,h=n.length;c<h;c+=1)for(var l=n[c],u=0,f=this.options.keys.length;u<f;u+=1){var d=this.options.keys[u];if("string"!=typeof d){if(s[d.name]={weight:1-d.weight||1},d.weight<=0||d.weight>1)throw new Error("Key weight has to be > 0 and <= 1");d=d.name}else s[d]={weight:1};this._analyze({key:d,value:this.options.getFn(l,d),record:l,index:c},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:s,results:o}}},{key:"_analyze",value:function(e,t){var n=e.key,r=e.arrayIndex,o=void 0===r?-1:r,i=e.value,a=e.record,c=e.index,h=t.tokenSearchers,l=void 0===h?[]:h,u=t.fullSearcher,f=void 0===u?[]:u,d=t.resultMap,v=void 0===d?{}:d,p=t.results,g=void 0===p?[]:p;if(null!=i){var y=!1,m=-1,k=0;if("string"==typeof i){this._log("\nKey: ".concat(""===n?"-":n));var S=f.search(i);if(this._log('Full text: "'.concat(i,'", score: ').concat(S.score)),this.options.tokenize){for(var x=i.split(this.options.tokenSeparator),b=[],M=0;M<l.length;M+=1){var _=l[M];this._log('\nPattern: "'.concat(_.pattern,'"'));for(var L=!1,w=0;w<x.length;w+=1){var A=x[w],C=_.search(A),I={};C.isMatch?(I[A]=C.score,y=!0,L=!0,b.push(C.score)):(I[A]=1,this.options.matchAllTokens||b.push(1)),this._log('Token: "'.concat(A,'", score: ').concat(I[A]))}L&&(k+=1)}m=b[0];for(var O=b.length,j=1;j<O;j+=1)m+=b[j];m/=O,this._log("Token score average:",m)}var P=S.score;m>-1&&(P=(P+m)/2),this._log("Score average:",P);var F=!this.options.tokenize||!this.options.matchAllTokens||k>=l.length;if(this._log("\nCheck Matches: ".concat(F)),(y||S.isMatch)&&F){var T=v[c];T?T.output.push({key:n,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}):(v[c]={item:a,output:[{key:n,arrayIndex:o,value:i,score:P,matchedIndices:S.matchedIndices}]},g.push(v[c]))}}else if(s(i))for(var z=0,E=i.length;z<E;z+=1)this._analyze({key:n,arrayIndex:z,value:i[z],record:a,index:c},{resultMap:v,results:g,tokenSearchers:l,fullSearcher:f})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var n=0,r=t.length;n<r;n+=1){for(var o=t[n].output,i=o.length,a=1,s=1,c=0;c<i;c+=1){var h=e?e[o[c].key].weight:1,l=(1===h?o[c].score:o[c].score||.001)*h;1!==h?s=Math.min(s,l):(o[c].nScore=l,a*=l)}t[n].score=1===s?a:s,this._log(t[n])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var n=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===r(t)&&null!==t){if(-1!==n.indexOf(t))return;n.push(t)}return t})),n=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var n=e.output;t.matches=[];for(var r=0,o=n.length;r<o;r+=1){var i=n[r];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,n),c&&o(t,c),e}();e.exports=c},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=n(3),i=n(4),a=n(7),s=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,h=void 0===c?.6:c,l=n.maxPatternLength,u=void 0===l?32:l,f=n.isCaseSensitive,d=void 0!==f&&f,v=n.tokenSeparator,p=void 0===v?/ +/g:v,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:d,tokenSeparator:p,findAllMatches:y,minMatchCharLength:k},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern))}var t,n,s;return t=e,(n=[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,n=t.maxPatternLength,r=t.tokenSeparator;if(this.pattern.length>n)return o(e,this.pattern,r);var a=this.options,s=a.location,c=a.distance,h=a.threshold,l=a.findAllMatches,u=a.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:s,distance:c,threshold:h,findAllMatches:l,minMatchCharLength:u})}}])&&r(t.prototype,n),s&&r(t,s),e}();e.exports=s},function(e,t){var n=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(n,"\\$&").replace(r,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,n){var r=n(5),o=n(6);e.exports=function(e,t,n,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,d=void 0!==f&&f,v=i.minMatchCharLength,p=void 0===v?1:v,g=s,y=e.length,m=u,k=e.indexOf(t,g),S=t.length,x=[],b=0;b<y;b+=1)x[b]=0;if(-1!==k){var M=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});if(m=Math.min(M,m),-1!==(k=e.lastIndexOf(t,g+S))){var _=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:h});m=Math.min(_,m)}}k=-1;for(var L=[],w=1,A=S+y,C=1<<S-1,I=0;I<S;I+=1){for(var O=0,j=A;O<j;){r(t,{errors:I,currentLocation:g+j,expectedLocation:g,distance:h})<=m?O=j:A=j,j=Math.floor((A-O)/2+O)}A=j;var P=Math.max(1,g-j+1),F=d?y:Math.min(g+j,y)+S,T=Array(F+2);T[F+1]=(1<<I)-1;for(var z=F;z>=P;z-=1){var E=z-1,K=n[e.charAt(E)];if(K&&(x[E]=1),T[z]=(T[z+1]<<1|1)&K,0!==I&&(T[z]|=(L[z+1]|L[z])<<1|1|L[z+1]),T[z]&C&&(w=r(t,{errors:I,currentLocation:E,expectedLocation:g,distance:h}))<=m){if(m=w,(k=E)<=g)break;P=Math.max(1,2*g-k)}}if(r(t,{errors:I+1,currentLocation:g,expectedLocation:g,distance:h})>m)break;L=T}return{isMatch:k>=0,score:0===w?.001:w,matchedIndices:o(x,p)}}},function(e,t){e.exports=function(e,t){var n=t.errors,r=void 0===n?0:n,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=r/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===r?r=i:s||-1===r||((o=i-1)-r+1>=t&&n.push([r,o]),r=-1)}return e[i-1]&&i-r>=t&&n.push([r,i-1]),n}},function(e,t){e.exports=function(e){for(var t={},n=e.length,r=0;r<n;r+=1)t[e.charAt(r)]=0;for(var o=0;o<n;o+=1)t[e.charAt(o)]|=1<<n-o-1;return t}},function(e,t,n){var r=n(0);e.exports=function(e,t){return function e(t,n,o){if(n){var i=n.indexOf("."),a=n,s=null;-1!==i&&(a=n.slice(0,i),s=n.slice(i+1));var c=t[a];if(null!=c)if(s||"string"!=typeof c&&"number"!=typeof c)if(r(c))for(var h=0,l=c.length;h<l;h+=1)e(c[h],s,o);else s&&e(c,s,o);else o.push(c.toString())}else o.push(t);return o}(e,t,[])}}])});

/***/ }),

/***/ "./src/components/hit.ts":
/*!*******************************!*\
  !*** ./src/components/hit.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log = console.log;
class Hit extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'wrapper';
        this.icon = document.createElement('img');
        this.icon.width = 20;
        this.icon.height = 20;
        this.name = document.createElement('div');
        this.url = document.createElement('div');
        const dataWrapper = document.createElement('div');
        dataWrapper.className = 'card__data';
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
    }
    /**
     * ヒットにタイトルとURLとアイコンURLを設定する
     * @param title website title
     * @param url website url
     * @param iconUrl website favicon url
     */
    setContents(item) {
        // itemの基本情報の設定
        this.itemID = item.id;
        if ('active' in item) {
            this.type = 'tab';
            // closeボタンを追加
            const closeButton = document.createElement('button');
            closeButton.className = 'card__close';
            closeButton.innerText = `close`; // close: <shortcut>にしたい
            closeButton.addEventListener('click', this.closeTab.bind(this));
            this.wrapper.appendChild(closeButton);
        }
        else if ('lastVisitTime' in item)
            this.type = 'history';
        else if ('dateAdded' in item)
            this.type = 'bookmark';
        // hitに表示するものを設定
        this.name.innerText = item.title;
        this.url.innerText = decodeURI(item.url);
        // iconの設定
        if (this.type === 'tab')
            this.icon.src = item.favIconUrl;
        else if (this.type === 'bookmark')
            this.icon.src = './img/bookmark.png';
        else if (this.type === 'history')
            this.icon.src = './img/history.png';
    }
    /** hitがクリックされたら発動します */
    openPage() {
        if (this.type === 'tab') {
            chrome.tabs.update(this.itemID, { active: true }, tab => {
                chrome.windows.update(tab.windowId, { focused: true });
            });
        }
        else if (this.type === 'bookmark') {
            this.openTab();
        }
        else if (this.type === 'history') {
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
    /**
     * hitの状態を更新する
     */
    update(option = { focused: false }) {
        if (this.focused !== option.focused) {
            this.focused = option.focused;
            // focusされたらscrollする
            if (this.focused) {
                this.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }
        }
        this.updateStyle();
    }
    updateStyle() {
        if (this.focused) {
            this.wrapper.className += '-focused';
        }
        else {
            this.wrapper.className = 'wrapper';
        }
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
        // shadow root
        this.root = this.attachShadow({ mode: 'open' });
        // リストを表示するビュー
        this.view = document.createElement('ul');
        this.root.appendChild(this.view);
        // cloneの元になるhit
        this.hit = new hit_1.default();
        // style
        const style = document.createElement('style');
        style.textContent = "@import url('css/hits.css');";
        this.root.appendChild(style);
        window.onload = () => {
        };
    }
    /**
     * show all tabs
     */
    showAllTabs() {
        chrome.tabs.query({}, tabs => {
            tabs.forEach((tab, i) => {
                const newHit = this.makeNewHit(tab, i + 1);
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
            const newHit = this.makeNewHit(item.item, i + 1);
            this.view.appendChild(newHit);
        });
    }
    /** 新しいHitをつくって返す */
    makeNewHit(item, tabIndex) {
        const newHit = this.hit.cloneNode(true);
        newHit.setContents(item);
        // tabIndexがある範囲にあるかどうかをチェックする
        let i = Math.trunc(tabIndex);
        if (-1 <= i && i < 32767) {
            newHit.tabIndex = i; // hitにtabIndexを定義
        }
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
     * move focus
     * 不必要に複雑な感じがある・・・
     * @param direction if true move down, false move up
     */
    switchFocus(direction = true) {
        const hits = this.getHits();
        let focusedIndex = null;
        for (let i = 0; i < hits.length; i++) {
            if (hits[i].focused)
                focusedIndex = i;
        }
        // フォーカスがない場合は、最初の要素にフォーカス
        if (focusedIndex === null) {
            hits[direction ? 0 : hits.length - 1].update({ focused: true });
        }
        else if (focusedIndex === 0) {
            // down 最初にフォーカスが当たっている場合、次の要素
            // up 最後の要素
            hits[0].update({ focused: false });
            hits[direction ? focusedIndex + 1 : hits.length - 1].update({ focused: true });
            // フォーカスが0 < x < lastに当たっているなら次の要素にフォーカス
        }
        else if (0 < focusedIndex && focusedIndex < hits.length - 1) {
            hits[focusedIndex].update({ focused: false });
            hits[direction ? focusedIndex + 1 : focusedIndex - 1].update({ focused: true });
            // down: 最後の要素にフォーカスが当たっていれば、最初の要素にフォーカス
            // up: 最後から2番目の要素にフォーカス
        }
        else if (focusedIndex === hits.length - 1) {
            hits[focusedIndex].update({ focused: false });
            hits[direction ? 0 : focusedIndex - 1].update({ focused: true });
        }
    }
    focusDown() {
        this.switchFocus(true);
    }
    focusUp() {
        this.switchFocus(false);
    }
    /**
     * open an url of a focused hit
     */
    open() {
        const hits = this.getHits();
        hits.forEach(hit => {
            if (hit.focused) {
                hit.openPage();
            }
        });
    }
    closeTab() {
        const hits = this.getHits();
        hits.forEach(hit => {
            if (hit.focused)
                hit.closeTab();
        });
    }
    /**
     * viewのchild elementをすべて取得する
     */
    getHits() {
        return [...this.view.children];
    }
}
exports.default = SuggestView;
customElements.define('suggest-view', SuggestView);


/***/ }),

/***/ "./src/popup.ts":
/*!**********************!*\
  !*** ./src/popup.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Fuse = __webpack_require__(/*! fuse.js */ "./node_modules/fuse.js/dist/fuse.js");
const suggest_view_1 = __webpack_require__(/*! ./components/suggest-view */ "./src/components/suggest-view.ts");
// searchbox
const searchbox = document.getElementById('searchbox');
searchbox.className = 'searchbox';
searchbox.autofocus = true;
/**
 * 検索ボックスに入力されたら検索する
 */
searchbox.oninput = (e) => {
    if (userInput !== searchbox.value) { // 入力によって値が変わった場合
        if (searchbox.value === '') { // 空ならタブを表示
            view.clear();
            view.showAllTabs();
        }
        else {
            view.clear();
            window.clearTimeout(timerID);
            timerID = window.setTimeout(search, 300, searchbox.value); // 0.3s
        }
        userInput = searchbox.value;
    }
};
/**
 * searchboxのkeyboard event
 */
searchbox.onkeydown = (e) => {
    if (!e.isComposing) {
        if (e.key === 'Enter') {
            chrome.tabs.create({ url: `https://www.google.com/search?q=${searchbox.value}` });
        }
    }
};
// 検索結果の表示view
const view = new suggest_view_1.default();
document.body.appendChild(view);
let userInput = '';
let timerID;
const log = console.log;
/**
 * fuzzy search option
 */
const option = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.35,
    maxPatternLength: 32,
    keys: ['title', 'url'],
};
/**
 * tree構造を一次元のリストにする
 */
function treeToFlatList(tree) {
    function loop(node, result) {
        if (node.url) { // ディレクトリはurlを持たないのでこれで判断する
            result.push(node);
        }
        else if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                const item = node.children[i];
                loop(item, result);
            }
        }
        return result;
    }
    return loop(tree, []);
}
function search(text) {
    // tabs, history, bookmarksを取得する
    chrome.tabs.query({}, tabs => {
        let candidates = tabs;
        chrome.history.search({ text: '', maxResults: 20 }, history => {
            candidates = deduplicate(candidates, history);
            chrome.bookmarks.getTree(tree => {
                const bookmarks = treeToFlatList(tree[0]);
                candidates = deduplicate(candidates, bookmarks);
                const fuse = new Fuse(candidates, option);
                const result = fuse.search(text);
                view.updateView(result); // わからない
            });
        });
    });
}
/**
 * arrayの重複を排除する
 * @param {*} arr1 array of object
 * @param {*} arr2 array of object
 * arr1に重複を排除して追加する
 */
function deduplicate(arr1, arr2) {
    arr2.forEach(item2 => {
        let flag = true;
        arr1.forEach(item1 => {
            if (item1.url === item2.url) {
                flag = false;
                return;
            }
        });
        if (flag)
            arr1.push(item2);
    });
    return arr1;
}
// window events
/**
 * popupが表示されたら実行される処理
 */
window.onload = () => {
    view.showAllTabs();
};
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (searchbox === document.activeElement)
            searchbox.blur();
        view.focusDown();
    }
    else if (e.key === 'Enter') {
        view.open();
    }
    else if (e.key === 'ArrowDown') {
        if (searchbox === document.activeElement)
            searchbox.blur();
        view.focusDown();
    }
    else if (e.key === 'ArrowUp') {
        if (searchbox === document.activeElement)
            searchbox.blur();
        view.focusUp();
    }
});
/**
 * extension用のコマンドのevent listener
 */
chrome.commands.onCommand.addListener(cmd => {
    if (cmd === 'close-tab')
        view.closeTab();
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map