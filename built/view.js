// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"chrome-type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
},{}],"components/hit.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var chrome_type_1 = require("../chrome-type");

var log = console.log;
var cssName = {
  card: 'card',
  cardFocued: 'card--focused',
  icon: 'card__icon',
  data: 'card__dataWrapper',
  title: 'card__title',
  url: 'card__url',
  close: 'card__close'
};

var Hit =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Hit, _HTMLElement);

  // public tabIndex: number
  function Hit() {
    var _this;

    _classCallCheck(this, Hit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hit).call(this));
    _this.shadow = _this.attachShadow({
      mode: 'open'
    });
    _this.wrapper = document.createElement('div');
    _this.wrapper.className = cssName.card; // icon

    _this.icon = document.createElement('img');
    _this.icon.className = cssName.icon;
    _this.icon.width = 20;
    _this.icon.height = 20; // data wrapper

    var dataWrapper = document.createElement('div');
    dataWrapper.className = cssName.data; // title

    _this.name = document.createElement('div');
    _this.name.className = cssName.title; // url

    _this.url = document.createElement('div'); // data wrapperに追加

    dataWrapper.appendChild(_this.name);
    dataWrapper.appendChild(_this.url); // wrapperに追加

    _this.wrapper.appendChild(_this.icon);

    _this.wrapper.appendChild(dataWrapper);

    _this.wrapper.addEventListener('click', _this.openPage.bind(_assertThisInitialized(_this))); // style


    var style = document.createElement('style');
    style.textContent = "@import url('css/hit.css');"; // shadow domに追加

    _this.shadow.appendChild(style);

    _this.shadow.appendChild(_this.wrapper);

    _this.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        _this.openPage();
      }
    });

    return _this;
  }
  /**
   * ヒットにタイトルとURLとアイコンURLを設定する
   * @param title website title
   * @param url website url
   * @param iconUrl website favicon url
   */


  _createClass(Hit, [{
    key: "setContents",
    value: function setContents(item) {
      // itemの基本情報の設定
      // item.idがstringならnumberに変換
      this.itemID = typeof item.id === 'string' ? parseInt(item.id) : item.id; // hitに表示するものを設定

      this.name.innerText = item.title;
      this.url.innerText = decodeURI(item.url);

      if (chrome_type_1.isTab(item)) {
        this.itemType = 'tab'; // set icon

        this.icon.src = item.favIconUrl; // closeボタンを追加

        var closeButton = document.createElement('button');
        closeButton.className = cssName.close;
        closeButton.innerText = "\xD7"; // close: <shortcut>にしたい

        closeButton.addEventListener('click', this.closeTab.bind(this));
        this.wrapper.appendChild(closeButton);
      } else if (chrome_type_1.isHistoryItem(item)) {
        this.itemType = 'history';
        this.icon.src = './img/history.svg'; // set icon
      } else if (chrome_type_1.isBookmarkTreeNode(item)) {
        this.itemType = 'bookmark';
        this.icon.src = './img/bookmark.svg'; // set icon
      }
    }
    /**
     * hitがクリックされたら発動します
     * openTabとopenPageの違いわかりづらいので名前を改善する
     **/

  }, {
    key: "openPage",
    value: function openPage() {
      if (this.itemType === 'tab') {
        chrome.tabs.update(this.itemID, {
          active: true
        }, function (tab) {
          chrome.windows.update(tab.windowId, {
            focused: true
          });
        });
      } else if (this.itemType === 'bookmark') {
        this.openTab();
      } else if (this.itemType === 'history') {
        this.openTab();
      }
    }
    /** 新しいタブで開く */

  }, {
    key: "openTab",
    value: function openTab() {
      chrome.tabs.create({
        url: this.url.innerText
      });
    }
    /**
     * タブを閉じ、リストから自身を削除する
     */

  }, {
    key: "closeTab",
    value: function closeTab() {
      chrome.tabs.remove(this.itemID);
      this.parentNode.removeChild(this);
    }
    /** hitの状態を更新する */

  }, {
    key: "update",
    value: function update() {
      var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        focused: false
      };

      if (this.focused !== option.focused) {
        this.focused = option.focused;
      }

      this.updateStyle();
    }
    /**
     * focusされたhitのためのstyle変更
     */

  }, {
    key: "updateStyle",
    value: function updateStyle() {
      if (this.focused) {
        this.wrapper.className = cssName.cardFocued;
      } else {
        this.wrapper.className = cssName.card;
      }
    }
    /**
     * フォーカスする
     */

  }, {
    key: "focus",
    value: function focus() {
      this.update({
        focused: true
      });

      if (this.parentNode.firstChild === this) {
        // 自身がfirst childなら一番上までスクロールする
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        this.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
    /**
     * フォーカスを外す
     */

  }, {
    key: "blur",
    value: function blur() {
      this.update({
        focused: false
      });
    }
  }]);

  return Hit;
}(_wrapNativeSuper(HTMLElement));

exports.default = Hit;
customElements.define('hit-view', Hit);
},{"../chrome-type":"chrome-type.ts"}],"components/suggest-view.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
var log = console.log;

var hit_1 = __importDefault(require("./hit"));
/**
 * サジェスト用のviewクラス
 * 引数はidやclassをプロパティに持つobject
 */


var SuggestView =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SuggestView, _HTMLElement);

  function SuggestView() {
    var _this;

    _classCallCheck(this, SuggestView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SuggestView).call(this));
    _this.userInput = ''; // shadow root

    _this.root = _this.attachShadow({
      mode: 'open'
    }); // searchbox

    _this.searchbox = document.createElement('input');
    _this.searchbox.className = 'searchbox';
    _this.searchbox.autofocus = true;
    /**
     * 検索ボックスに入力されたら検索する
     */

    _this.searchbox.oninput = function (e) {
      if (_this.userInput !== _this.searchbox.value) {
        // 入力によって値が変わった場合
        _this.clear();

        if (_this.searchbox.value === '') {
          // 空ならタブを表示
          _this.showAllTabs();
        } else {
          window.clearTimeout(_this.timerID);
          _this.timerID = window.setTimeout(_this.search.bind(_assertThisInitialized(_this)), 300); // 0.3s
        }

        _this.userInput = _this.searchbox.value;
      }
    };
    /**
     * searchboxのkeyboard event
     */


    _this.searchbox.onkeydown = function (e) {
      if (!e.isComposing) {
        // tab keyを無効化
        if (e.key === 'Tab') {
          if (e.shiftKey) _this.focusUp();else _this.focusDown();
          return false;
        } else if (e.key === 'ArrowUp') {
          _this.focusUp();

          return false;
        } else if (e.key === 'ArrowDown') {
          _this.focusDown();

          return false;
        } else if (e.key === 'Enter') {
          _this.open();
        }
      }
    };

    _this.root.appendChild(_this.searchbox); // リストを表示するビュー


    _this.view = document.createElement('div');
    _this.view.className = 'view';

    _this.root.appendChild(_this.view); // cloneの元になるhit


    _this.hit = new hit_1.default(); // style

    var style = document.createElement('style');
    style.textContent = "@import url('css/hits.css');";

    _this.root.appendChild(style); // 描画時にやりたい処理


    window.onload = function () {
      _this.searchbox.focus();

      var rect = _this.searchbox.getBoundingClientRect();

      _this.view.style.paddingTop = rect.bottom + 'px';
      _this.view.style.top = rect.bottom + 'px';

      _this.showAllTabs();
    };

    return _this;
  }

  _createClass(SuggestView, [{
    key: "search",
    value: function search() {
      var _this2 = this;

      chrome.runtime.sendMessage({
        searchWord: this.searchbox.value
      }, function (res) {
        _this2.updateView(res.searchResult);
      });
    }
    /**
     * show all tabs
     */

  }, {
    key: "showAllTabs",
    value: function showAllTabs() {
      var _this3 = this;

      chrome.runtime.sendMessage({
        defaultSuggests: true
      }, function (res) {
        res.defaultSuggests.forEach(function (item, i) {
          var newHit = _this3.makeNewHit(item);

          _this3.view.appendChild(newHit);
        });
      });
    }
    /**
     * 検索結果を再描画
     * @param {*} list
     */

  }, {
    key: "updateView",
    value: function updateView(list) {
      var _this4 = this;

      list.forEach(function (item, i) {
        var newHit = _this4.makeNewHit(item.item);

        _this4.view.appendChild(newHit);
      });
    }
    /** 新しいHitをつくって返す */

  }, {
    key: "makeNewHit",
    value: function makeNewHit(item) {
      var newHit = this.hit.cloneNode(true);
      newHit.setContents(item);
      return newHit;
    }
    /**
     * ビューを初期化
     */

  }, {
    key: "clear",
    value: function clear() {
      while (this.view.firstChild) {
        this.view.removeChild(this.view.firstChild);
      }
    }
    /**
     * open an url of a focused hit
     */

  }, {
    key: "open",
    value: function open() {
      var hits = this.getHits();
      var focusCheck = true; // focusedHitがあったかどうかを判定するために使う

      hits.forEach(function (hit) {
        if (hit.focused) {
          hit.openPage();
          focusCheck = false;
        }
      });

      if (focusCheck) {
        // focused hitがなければ検索
        chrome.tabs.create({
          url: "https://www.google.com/search?q=".concat(this.searchbox.value)
        });
      }
    }
  }, {
    key: "closeTab",
    value: function closeTab() {
      var focused = this.getFocusedHit();
      if (focused) focused.closeTab();
    }
    /**
     * viewのchild elementをすべて取得する
     */

  }, {
    key: "getHits",
    value: function getHits() {
      return _toConsumableArray(this.view.children);
    }
    /**
     * focusされたhitを返す。なければfalseを返す
     */

  }, {
    key: "getFocusedHit",
    value: function getFocusedHit() {
      var hits = this.getHits();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = hits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var hit = _step.value;
          if (hit.focused) return hit;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
    /**
     * move Focus
     * @param flag if flag is true focuse up, false focus down
     */

  }, {
    key: "moveFocus",
    value: function moveFocus(flag) {
      var focused = this.getFocusedHit();

      if (focused) {
        // focused hitがあるかどうかを判定
        focused.blur(); // 次のhitがあれば次をfocus、なければ最初のhitをfocus

        var nextNode = flag ? focused.nextSibling : focused.previousSibling;

        if (nextNode) {
          var next = nextNode;
          next.focus();
          this.setPlaceHolder(next);
        } else {
          var _next = flag ? this.view.firstChild : this.view.lastChild;

          _next.focus();

          this.setPlaceHolder(_next);
        }
      } else {
        // focused hitがなければ最初のhitをfocus
        var _next2 = flag ? this.view.firstChild : this.view.lastChild;

        _next2.focus();

        this.setPlaceHolder(_next2);
      }
    }
    /**
     * focus down
     */

  }, {
    key: "focusDown",
    value: function focusDown() {
      this.moveFocus(true);
    }
    /**
     * focus up
     */

  }, {
    key: "focusUp",
    value: function focusUp() {
      this.moveFocus(false);
    }
  }, {
    key: "setPlaceHolder",
    value: function setPlaceHolder(hit) {
      this.searchbox.placeholder = hit.name.innerText;
    }
  }]);

  return SuggestView;
}(_wrapNativeSuper(HTMLElement));

exports.default = SuggestView;
customElements.define('suggest-view', SuggestView);
},{"./hit":"components/hit.ts"}],"view.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var suggest_view_1 = __importDefault(require("./components/suggest-view")); // document.body.innerText = 'view.tsからの挨拶です'


var view = new suggest_view_1.default();
document.body.appendChild(view);
},{"./components/suggest-view":"components/suggest-view.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37787" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","view.ts"], null)
//# sourceMappingURL=/view.js.map