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
 * Fuse.js v3.4.4 - Lightweight fuzzy-search (http://fusejs.io)
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
},{}],"chrome-type.ts":[function(require,module,exports) {
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

var cssName = {
  card: 'card',
  cardFocued: 'card--focused',
  title: 'card__title',
  url: 'card__url'
};
var log = console.log;

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
    _this.icon.width = 20;
    _this.icon.height = 20; // title

    _this.name = document.createElement('div');
    _this.name.className = cssName.title; // url

    _this.url = document.createElement('div');
    var dataWrapper = document.createElement('div');
    dataWrapper.className = 'card__data';
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
        this.type = 'tab'; // set icon

        this.icon.src = item.favIconUrl; // closeボタンを追加

        var closeButton = document.createElement('button');
        closeButton.className = 'card__close';
        closeButton.innerText = "close"; // close: <shortcut>にしたい

        closeButton.addEventListener('click', this.closeTab.bind(this));
        this.wrapper.appendChild(closeButton);
      } else if (chrome_type_1.isHistoryItem(item)) {
        this.type = 'history';
        this.icon.src = './img/history.svg'; // set icon
      } else if (chrome_type_1.isBookmarkTreeNode(item)) {
        this.type = 'bookmark';
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
      if (this.type === 'tab') {
        chrome.tabs.update(this.itemID, {
          active: true
        }, function (tab) {
          chrome.windows.update(tab.windowId, {
            focused: true
          });
        });
      } else if (this.type === 'bookmark') {
        this.openTab();
      } else if (this.type === 'history') {
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
      this.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
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

var utilities_1 = require("../utilities");

var Fuse = require("fuse.js");

var hit_1 = __importDefault(require("./hit"));
/**
 * fuzzy search option
 */


var option = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.35,
  maxPatternLength: 32,
  keys: ['title', 'url']
};
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
    _this.searchbox.tabIndex = 1;
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


    _this.view = document.createElement('ul');

    _this.root.appendChild(_this.view); // cloneの元になるhit


    _this.hit = new hit_1.default(); // style

    var style = document.createElement('style');
    style.textContent = "@import url('css/hits.css');";

    _this.root.appendChild(style); // 描画時にやりたい処理


    window.onload = function () {
      _this.showAllTabs();
    };

    return _this;
  }

  _createClass(SuggestView, [{
    key: "search",
    value: function search() {
      var _this2 = this;

      // tabs, history, bookmarksを取得する
      chrome.tabs.query({}, function (tabs) {
        var candidates = tabs;
        chrome.history.search({
          text: '',
          maxResults: 20
        }, function (history) {
          candidates = utilities_1.deduplicate(candidates, history);
          chrome.bookmarks.getTree(function (tree) {
            var bookmarks = utilities_1.treeToFlatList(tree[0]);
            candidates = utilities_1.deduplicate(candidates, bookmarks);
            var fuse = new Fuse(candidates, option);
            var result = fuse.search(_this2.searchbox.value);

            _this2.updateView(result);
          });
        });
      });
    }
    /**
     * show all tabs
     */

  }, {
    key: "showAllTabs",
    value: function showAllTabs() {
      var _this3 = this;

      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab, i) {
          var newHit = _this3.makeNewHit(tab);

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
     * focus down
     */

  }, {
    key: "focusDown",
    value: function focusDown() {
      // this.switchFocus(true)
      var focused = this.getFocusedHit();

      if (focused) {
        // Hitが帰ったらかどうかを判断
        // 次のhitがあれば次をfocus、なければ最初のhitをfocus
        if (focused.nextSibling) {
          focused.blur();
          var next = focused.nextSibling;
          next.focus();
          this.setPlaceHolder(next);
        } else {
          focused.blur();
          var _next = this.view.firstChild;

          _next.focus();

          this.setPlaceHolder(_next);
        }
      } else {
        // 返ってなければ最初のhitをfocus
        var _next2 = this.view.firstChild;

        _next2.focus();

        this.setPlaceHolder(_next2);
      }
    }
    /**
     * focus up
     */

  }, {
    key: "focusUp",
    value: function focusUp() {
      // this.switchFocus(false)
      var focused = this.getFocusedHit();

      if (focused) {
        // Hitが帰ったらかどうかを判断
        // 次のhitがあれば次をfocus、なければ最初のhitをfocus
        if (focused.previousSibling) {
          focused.blur();
          var next = focused.previousSibling;
          next.focus();
          this.setPlaceHolder(next);
        } else {
          focused.blur();
          var _next3 = this.view.lastChild;

          _next3.focus();

          this.setPlaceHolder(_next3);
        }
      } else {
        var _next4 = this.view.lastChild;

        _next4.focus(); // 返ってなければ最後のhitをfocus


        this.setPlaceHolder(_next4);
      }
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
},{"../utilities":"utilities.ts","fuse.js":"../node_modules/fuse.js/dist/fuse.js","./hit":"components/hit.ts"}],"view.ts":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34323" + '/');

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