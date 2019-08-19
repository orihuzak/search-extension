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
})({"utilities.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * arrayの重複を排除する
 * @param {*} arr1 array of object
 * @param {*} arr2 array of object
 * arr1に重複を排除して追加する
 */

function deduplicate(arr1, arr2) {
  arr2.forEach(function (item2) {
    var flag = true;
    arr1.forEach(function (item1) {
      if (item1.url === item2.url) {
        flag = false;
        return;
      }
    });
    if (flag) arr1.push(item2);
  });
  return arr1;
}

exports.deduplicate = deduplicate;
/**
 * tree構造を一次元のリストにする
 */

function treeToFlatList(tree) {
  function loop(node, result) {
    if (node.url) {
      // ディレクトリはurlを持たないのでこれで判断する
      result.push(node);
    } else if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        var item = node.children[i];
        loop(item, result);
      }
    }

    return result;
  }

  return loop(tree, []);
}

exports.treeToFlatList = treeToFlatList;
},{}],"../node_modules/fuse.js/dist/fuse.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Fuse.js v3.4.5 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define("Fuse", [], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Fuse = t() : e.Fuse = t();
}(this, function () {
  return function (e) {
    var t = {};

    function n(r) {
      if (t[r]) return t[r].exports;
      var o = t[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }

    return n.m = e, n.c = t, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var o in e) {
        n.d(r, o, function (t) {
          return e[t];
        }.bind(null, o));
      }
      return r;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 1);
  }([function (e, t) {
    e.exports = function (e) {
      return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
    };
  }, function (e, t, n) {
    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var i = n(2),
        a = n(8),
        s = n(0),
        c = function () {
      function e(t, n) {
        var r = n.location,
            o = void 0 === r ? 0 : r,
            i = n.distance,
            s = void 0 === i ? 100 : i,
            c = n.threshold,
            h = void 0 === c ? .6 : c,
            l = n.maxPatternLength,
            u = void 0 === l ? 32 : l,
            f = n.caseSensitive,
            d = void 0 !== f && f,
            v = n.tokenSeparator,
            p = void 0 === v ? / +/g : v,
            g = n.findAllMatches,
            y = void 0 !== g && g,
            m = n.minMatchCharLength,
            k = void 0 === m ? 1 : m,
            S = n.id,
            x = void 0 === S ? null : S,
            b = n.keys,
            M = void 0 === b ? [] : b,
            _ = n.shouldSort,
            L = void 0 === _ || _,
            w = n.getFn,
            A = void 0 === w ? a : w,
            C = n.sortFn,
            I = void 0 === C ? function (e, t) {
          return e.score - t.score;
        } : C,
            O = n.tokenize,
            j = void 0 !== O && O,
            P = n.matchAllTokens,
            F = void 0 !== P && P,
            T = n.includeMatches,
            z = void 0 !== T && T,
            E = n.includeScore,
            K = void 0 !== E && E,
            $ = n.verbose,
            J = void 0 !== $ && $;
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.options = {
          location: o,
          distance: s,
          threshold: h,
          maxPatternLength: u,
          isCaseSensitive: d,
          tokenSeparator: p,
          findAllMatches: y,
          minMatchCharLength: k,
          id: x,
          keys: M,
          includeMatches: z,
          includeScore: K,
          shouldSort: L,
          getFn: A,
          sortFn: I,
          verbose: J,
          tokenize: j,
          matchAllTokens: F
        }, this.setCollection(t);
      }

      var t, n, c;
      return t = e, (n = [{
        key: "setCollection",
        value: function (e) {
          return this.list = e, e;
        }
      }, {
        key: "search",
        value: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            limit: !1
          };

          this._log('---------\nSearch pattern: "'.concat(e, '"'));

          var n = this._prepareSearchers(e),
              r = n.tokenSearchers,
              o = n.fullSearcher,
              i = this._search(r, o),
              a = i.weights,
              s = i.results;

          return this._computeScore(a, s), this.options.shouldSort && this._sort(s), t.limit && "number" == typeof t.limit && (s = s.slice(0, t.limit)), this._format(s);
        }
      }, {
        key: "_prepareSearchers",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              t = [];
          if (this.options.tokenize) for (var n = e.split(this.options.tokenSeparator), r = 0, o = n.length; r < o; r += 1) {
            t.push(new i(n[r], this.options));
          }
          return {
            tokenSearchers: t,
            fullSearcher: new i(e, this.options)
          };
        }
      }, {
        key: "_search",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
              t = arguments.length > 1 ? arguments[1] : void 0,
              n = this.list,
              r = {},
              o = [];

          if ("string" == typeof n[0]) {
            for (var i = 0, a = n.length; i < a; i += 1) {
              this._analyze({
                key: "",
                value: n[i],
                record: i,
                index: i
              }, {
                resultMap: r,
                results: o,
                tokenSearchers: e,
                fullSearcher: t
              });
            }

            return {
              weights: null,
              results: o
            };
          }

          for (var s = {}, c = 0, h = n.length; c < h; c += 1) {
            for (var l = n[c], u = 0, f = this.options.keys.length; u < f; u += 1) {
              var d = this.options.keys[u];

              if ("string" != typeof d) {
                if (s[d.name] = {
                  weight: 1 - d.weight || 1
                }, d.weight <= 0 || d.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");
                d = d.name;
              } else s[d] = {
                weight: 1
              };

              this._analyze({
                key: d,
                value: this.options.getFn(l, d),
                record: l,
                index: c
              }, {
                resultMap: r,
                results: o,
                tokenSearchers: e,
                fullSearcher: t
              });
            }
          }

          return {
            weights: s,
            results: o
          };
        }
      }, {
        key: "_analyze",
        value: function (e, t) {
          var n = e.key,
              r = e.arrayIndex,
              o = void 0 === r ? -1 : r,
              i = e.value,
              a = e.record,
              c = e.index,
              h = t.tokenSearchers,
              l = void 0 === h ? [] : h,
              u = t.fullSearcher,
              f = void 0 === u ? [] : u,
              d = t.resultMap,
              v = void 0 === d ? {} : d,
              p = t.results,
              g = void 0 === p ? [] : p;

          if (null != i) {
            var y = !1,
                m = -1,
                k = 0;

            if ("string" == typeof i) {
              this._log("\nKey: ".concat("" === n ? "-" : n));

              var S = f.search(i);

              if (this._log('Full text: "'.concat(i, '", score: ').concat(S.score)), this.options.tokenize) {
                for (var x = i.split(this.options.tokenSeparator), b = [], M = 0; M < l.length; M += 1) {
                  var _ = l[M];

                  this._log('\nPattern: "'.concat(_.pattern, '"'));

                  for (var L = !1, w = 0; w < x.length; w += 1) {
                    var A = x[w],
                        C = _.search(A),
                        I = {};

                    C.isMatch ? (I[A] = C.score, y = !0, L = !0, b.push(C.score)) : (I[A] = 1, this.options.matchAllTokens || b.push(1)), this._log('Token: "'.concat(A, '", score: ').concat(I[A]));
                  }

                  L && (k += 1);
                }

                m = b[0];

                for (var O = b.length, j = 1; j < O; j += 1) {
                  m += b[j];
                }

                m /= O, this._log("Token score average:", m);
              }

              var P = S.score;
              m > -1 && (P = (P + m) / 2), this._log("Score average:", P);
              var F = !this.options.tokenize || !this.options.matchAllTokens || k >= l.length;

              if (this._log("\nCheck Matches: ".concat(F)), (y || S.isMatch) && F) {
                var T = v[c];
                T ? T.output.push({
                  key: n,
                  arrayIndex: o,
                  value: i,
                  score: P,
                  matchedIndices: S.matchedIndices
                }) : (v[c] = {
                  item: a,
                  output: [{
                    key: n,
                    arrayIndex: o,
                    value: i,
                    score: P,
                    matchedIndices: S.matchedIndices
                  }]
                }, g.push(v[c]));
              }
            } else if (s(i)) for (var z = 0, E = i.length; z < E; z += 1) {
              this._analyze({
                key: n,
                arrayIndex: z,
                value: i[z],
                record: a,
                index: c
              }, {
                resultMap: v,
                results: g,
                tokenSearchers: l,
                fullSearcher: f
              });
            }
          }
        }
      }, {
        key: "_computeScore",
        value: function (e, t) {
          this._log("\n\nComputing score:\n");

          for (var n = 0, r = t.length; n < r; n += 1) {
            for (var o = t[n].output, i = o.length, a = 1, s = 1, c = 0; c < i; c += 1) {
              var h = e ? e[o[c].key].weight : 1,
                  l = (1 === h ? o[c].score : o[c].score || .001) * h;
              1 !== h ? s = Math.min(s, l) : (o[c].nScore = l, a *= l);
            }

            t[n].score = 1 === s ? a : s, this._log(t[n]);
          }
        }
      }, {
        key: "_sort",
        value: function (e) {
          this._log("\n\nSorting...."), e.sort(this.options.sortFn);
        }
      }, {
        key: "_format",
        value: function (e) {
          var t = [];

          if (this.options.verbose) {
            var n = [];
            this._log("\n\nOutput:\n\n", JSON.stringify(e, function (e, t) {
              if ("object" === r(t) && null !== t) {
                if (-1 !== n.indexOf(t)) return;
                n.push(t);
              }

              return t;
            })), n = null;
          }

          var o = [];
          this.options.includeMatches && o.push(function (e, t) {
            var n = e.output;
            t.matches = [];

            for (var r = 0, o = n.length; r < o; r += 1) {
              var i = n[r];

              if (0 !== i.matchedIndices.length) {
                var a = {
                  indices: i.matchedIndices,
                  value: i.value
                };
                i.key && (a.key = i.key), i.hasOwnProperty("arrayIndex") && i.arrayIndex > -1 && (a.arrayIndex = i.arrayIndex), t.matches.push(a);
              }
            }
          }), this.options.includeScore && o.push(function (e, t) {
            t.score = e.score;
          });

          for (var i = 0, a = e.length; i < a; i += 1) {
            var s = e[i];

            if (this.options.id && (s.item = this.options.getFn(s.item, this.options.id)[0]), o.length) {
              for (var c = {
                item: s.item
              }, h = 0, l = o.length; h < l; h += 1) {
                o[h](s, c);
              }

              t.push(c);
            } else t.push(s.item);
          }

          return t;
        }
      }, {
        key: "_log",
        value: function () {
          var e;
          this.options.verbose && (e = console).log.apply(e, arguments);
        }
      }]) && o(t.prototype, n), c && o(t, c), e;
    }();

    e.exports = c;
  }, function (e, t, n) {
    function r(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var o = n(3),
        i = n(4),
        a = n(7),
        s = function () {
      function e(t, n) {
        var r = n.location,
            o = void 0 === r ? 0 : r,
            i = n.distance,
            s = void 0 === i ? 100 : i,
            c = n.threshold,
            h = void 0 === c ? .6 : c,
            l = n.maxPatternLength,
            u = void 0 === l ? 32 : l,
            f = n.isCaseSensitive,
            d = void 0 !== f && f,
            v = n.tokenSeparator,
            p = void 0 === v ? / +/g : v,
            g = n.findAllMatches,
            y = void 0 !== g && g,
            m = n.minMatchCharLength,
            k = void 0 === m ? 1 : m;
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.options = {
          location: o,
          distance: s,
          threshold: h,
          maxPatternLength: u,
          isCaseSensitive: d,
          tokenSeparator: p,
          findAllMatches: y,
          minMatchCharLength: k
        }, this.pattern = this.options.isCaseSensitive ? t : t.toLowerCase(), this.pattern.length <= u && (this.patternAlphabet = a(this.pattern));
      }

      var t, n, s;
      return t = e, (n = [{
        key: "search",
        value: function (e) {
          if (this.options.isCaseSensitive || (e = e.toLowerCase()), this.pattern === e) return {
            isMatch: !0,
            score: 0,
            matchedIndices: [[0, e.length - 1]]
          };
          var t = this.options,
              n = t.maxPatternLength,
              r = t.tokenSeparator;
          if (this.pattern.length > n) return o(e, this.pattern, r);
          var a = this.options,
              s = a.location,
              c = a.distance,
              h = a.threshold,
              l = a.findAllMatches,
              u = a.minMatchCharLength;
          return i(e, this.pattern, this.patternAlphabet, {
            location: s,
            distance: c,
            threshold: h,
            findAllMatches: l,
            minMatchCharLength: u
          });
        }
      }]) && r(t.prototype, n), s && r(t, s), e;
    }();

    e.exports = s;
  }, function (e, t) {
    var n = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

    e.exports = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : / +/g,
          o = new RegExp(t.replace(n, "\\$&").replace(r, "|")),
          i = e.match(o),
          a = !!i,
          s = [];
      if (a) for (var c = 0, h = i.length; c < h; c += 1) {
        var l = i[c];
        s.push([e.indexOf(l), l.length - 1]);
      }
      return {
        score: a ? .5 : 1,
        isMatch: a,
        matchedIndices: s
      };
    };
  }, function (e, t, n) {
    var r = n(5),
        o = n(6);

    e.exports = function (e, t, n, i) {
      for (var a = i.location, s = void 0 === a ? 0 : a, c = i.distance, h = void 0 === c ? 100 : c, l = i.threshold, u = void 0 === l ? .6 : l, f = i.findAllMatches, d = void 0 !== f && f, v = i.minMatchCharLength, p = void 0 === v ? 1 : v, g = s, y = e.length, m = u, k = e.indexOf(t, g), S = t.length, x = [], b = 0; b < y; b += 1) {
        x[b] = 0;
      }

      if (-1 !== k) {
        var M = r(t, {
          errors: 0,
          currentLocation: k,
          expectedLocation: g,
          distance: h
        });

        if (m = Math.min(M, m), -1 !== (k = e.lastIndexOf(t, g + S))) {
          var _ = r(t, {
            errors: 0,
            currentLocation: k,
            expectedLocation: g,
            distance: h
          });

          m = Math.min(_, m);
        }
      }

      k = -1;

      for (var L = [], w = 1, A = S + y, C = 1 << S - 1, I = 0; I < S; I += 1) {
        for (var O = 0, j = A; O < j;) {
          r(t, {
            errors: I,
            currentLocation: g + j,
            expectedLocation: g,
            distance: h
          }) <= m ? O = j : A = j, j = Math.floor((A - O) / 2 + O);
        }

        A = j;
        var P = Math.max(1, g - j + 1),
            F = d ? y : Math.min(g + j, y) + S,
            T = Array(F + 2);
        T[F + 1] = (1 << I) - 1;

        for (var z = F; z >= P; z -= 1) {
          var E = z - 1,
              K = n[e.charAt(E)];

          if (K && (x[E] = 1), T[z] = (T[z + 1] << 1 | 1) & K, 0 !== I && (T[z] |= (L[z + 1] | L[z]) << 1 | 1 | L[z + 1]), T[z] & C && (w = r(t, {
            errors: I,
            currentLocation: E,
            expectedLocation: g,
            distance: h
          })) <= m) {
            if (m = w, (k = E) <= g) break;
            P = Math.max(1, 2 * g - k);
          }
        }

        if (r(t, {
          errors: I + 1,
          currentLocation: g,
          expectedLocation: g,
          distance: h
        }) > m) break;
        L = T;
      }

      return {
        isMatch: k >= 0,
        score: 0 === w ? .001 : w,
        matchedIndices: o(x, p)
      };
    };
  }, function (e, t) {
    e.exports = function (e, t) {
      var n = t.errors,
          r = void 0 === n ? 0 : n,
          o = t.currentLocation,
          i = void 0 === o ? 0 : o,
          a = t.expectedLocation,
          s = void 0 === a ? 0 : a,
          c = t.distance,
          h = void 0 === c ? 100 : c,
          l = r / e.length,
          u = Math.abs(s - i);
      return h ? l + u / h : u ? 1 : l;
    };
  }, function (e, t) {
    e.exports = function () {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = [], r = -1, o = -1, i = 0, a = e.length; i < a; i += 1) {
        var s = e[i];
        s && -1 === r ? r = i : s || -1 === r || ((o = i - 1) - r + 1 >= t && n.push([r, o]), r = -1);
      }

      return e[i - 1] && i - r >= t && n.push([r, i - 1]), n;
    };
  }, function (e, t) {
    e.exports = function (e) {
      for (var t = {}, n = e.length, r = 0; r < n; r += 1) {
        t[e.charAt(r)] = 0;
      }

      for (var o = 0; o < n; o += 1) {
        t[e.charAt(o)] |= 1 << n - o - 1;
      }

      return t;
    };
  }, function (e, t, n) {
    var r = n(0);

    e.exports = function (e, t) {
      return function e(t, n, o) {
        if (n) {
          var i = n.indexOf("."),
              a = n,
              s = null;
          -1 !== i && (a = n.slice(0, i), s = n.slice(i + 1));
          var c = t[a];
          if (null != c) if (s || "string" != typeof c && "number" != typeof c) {
            if (r(c)) for (var h = 0, l = c.length; h < l; h += 1) {
              e(c[h], s, o);
            } else s && e(c, s, o);
          } else o.push(c.toString());
        } else o.push(t);

        return o;
      }(e, t, []);
    };
  }]);
});
},{}],"background.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utilities_1 = require("./utilities");

var Fuse = require("fuse.js");

var log = console.log; // あとで消す

var items, currentTab, tabs, history, bookmarks, tabsAndHistory, fuse;
/** fuse option */

var option = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.35,
  maxPatternLength: 32,
  keys: ['title', 'url']
};

function getTabs() {
  chrome.tabs.query({}, function (t) {
    tabs = t;
  });
}

function getHistory() {
  chrome.history.search({
    text: '',
    maxResults: 30
  }, function (h) {
    history = h;
  });
}

function getBookmarks() {
  chrome.bookmarks.getTree(function (tree) {
    bookmarks = utilities_1.treeToFlatList(tree[0]);
  });
}

function getTabsAndHistory() {
  tabsAndHistory = deduplicate(tabs, history);
}

function getItems() {
  items = deduplicate(tabsAndHistory, bookmarks);
}
/**
 * array x, yの重複を排除した新しいarrayを返す
 */


function deduplicate(x, y) {
  var result = _toConsumableArray(x);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = y[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var yi = _step.value;
      var flag = true;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = x[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var xi = _step2.value;

          if (xi.url === yi.url) {
            flag = false;
            continue;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (flag) result.push(yi);
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

  return result;
} // extensionボタンが押されたらcontent scriptsにメッセージ


chrome.browserAction.onClicked.addListener(function (tab) {
  currentTab = tab;

  if (tab.url === 'chrome://newtab/') {
    // 現在のタブがnew tabならリダイレクトする
    chrome.tabs.create({
      url: chrome.extension.getURL('view.html')
    });
  } else {
    chrome.tabs.sendMessage(tab.id, {});
  }

  getTabsAndHistory();
  getItems();
  fuse = new Fuse(items, option);
}); // tabがアップデートされたらtabsを取得し直す

chrome.tabs.onUpdated.addListener(function () {
  getTabs();
});
chrome.tabs.onRemoved.addListener(function () {
  getTabs();
}); // tabが切り替わったらextensionを非表示

chrome.tabs.onActivated.addListener(function () {
  chrome.tabs.sendMessage(currentTab.id, 'unactive');
}); // historyが変更されたら更新

chrome.history.onVisited.addListener(function () {
  getHistory();
}); // bookmarkがupdateされたら更新する

chrome.bookmarks.onCreated.addListener(function () {
  getBookmarks();
});
chrome.bookmarks.onRemoved.addListener(function () {
  getBookmarks();
});
chrome.bookmarks.onChanged.addListener(function () {
  getBookmarks();
});
chrome.bookmarks.onImportEnded.addListener(function () {
  getBookmarks();
});
/**
 * 検索
 */

function search(text) {
  return fuse.search(text);
}
/**
 * messageを受信
 */


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // tabsを返信
  if (message.defaultSuggests) {
    sendResponse({
      defaultSuggests: tabsAndHistory
    });
  } // 検索して結果を返信


  if (message.searchWord) {
    var result = search(message.searchWord);
    sendResponse({
      searchResult: result
    });
  }
});
/** 実行セクション */

getTabs();
getHistory();
getBookmarks();
},{"./utilities":"utilities.ts","fuse.js":"../node_modules/fuse.js/dist/fuse.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37645" + '/');

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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","background.ts"], null)
//# sourceMappingURL=/background.js.map