var D,
  a,
  J,
  C,
  j,
  K,
  $,
  E = {},
  X = [],
  oe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  F = Array.isArray;
function b(e, _) {
  for (var t in _) e[t] = _[t];
  return e;
}
function Y(e) {
  var _ = e.parentNode;
  _ && _.removeChild(e);
}
function S(e, _, t, i, o) {
  var r = {
    type: e,
    props: _,
    key: t,
    ref: i,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: o ?? ++J,
    __i: -1,
    __u: 0,
  };
  return o == null && a.vnode != null && a.vnode(r), r;
}
function H(e) {
  return e.children;
}
function W(e, _) {
  this.props = e, this.context = _;
}
function P(e, _) {
  if (_ == null) return e.__ ? P(e.__, e.__i + 1) : null;
  for (var t; _ < e.__k.length; _++) {
    if ((t = e.__k[_]) != null && t.__e != null) return t.__e;
  }
  return typeof e.type == "function" ? P(e) : null;
}
function Z(e) {
  var _, t;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, _ = 0; _ < e.__k.length; _++) {
      if ((t = e.__k[_]) != null && t.__e != null) {
        e.__e = e.__c.base = t.__e;
        break;
      }
    }
    return Z(e);
  }
}
function I(e) {
  (!e.__d && (e.__d = !0) && C.push(e) && !A.__r++ ||
    j !== a.debounceRendering) && ((j = a.debounceRendering) || K)(A);
}
function A() {
  var e, _, t, i, o, r, l, s, c;
  for (C.sort($); e = C.shift();) {
    e.__d &&
      (_ = C.length,
        i = void 0,
        r = (o = (t = e).__v).__e,
        s = [],
        c = [],
        (l = t.__P) &&
        ((i = b({}, o)).__v = o.__v + 1,
          a.vnode && a.vnode(i),
          B(
            l,
            i,
            o,
            t.__n,
            l.ownerSVGElement !== void 0,
            32 & o.__u ? [r] : null,
            s,
            r ?? P(o),
            !!(32 & o.__u),
            c,
          ),
          i.__.__k[i.__i] = i,
          te(s, i, c),
          i.__e != r && Z(i)),
        C.length > _ && C.sort($));
  }
  A.__r = 0;
}
function ee(e, _, t, i, o, r, l, s, c, u, p) {
  var n, m, f, h, k, v = i && i.__k || X, d = _.length;
  for (t.__d = c, ie(t, _, v), c = t.__d, n = 0; n < d; n++) {
    (f = t.__k[n]) != null && typeof f != "boolean" && typeof f != "function" &&
      (m = f.__i === -1 ? E : v[f.__i] || E,
        f.__i = n,
        B(e, f, m, o, r, l, s, c, u, p),
        h = f.__e,
        f.ref && m.ref != f.ref &&
        (m.ref && O(m.ref, null, f), p.push(f.ref, f.__c || h, f)),
        k == null && h != null && (k = h),
        65536 & f.__u || m.__k === f.__k
          ? c = _e(f, c, e)
          : typeof f.type == "function" && f.__d !== void 0
          ? c = f.__d
          : h && (c = h.nextSibling),
        f.__d = void 0,
        f.__u &= -196609);
  }
  t.__d = c, t.__e = k;
}
function ie(e, _, t) {
  var i, o, r, l, s, c = _.length, u = t.length, p = u, n = 0;
  for (e.__k = [], i = 0; i < c; i++) {
    (o =
        e.__k[i] =
          (o = _[i]) == null || typeof o == "boolean" || typeof o == "function"
            ? null
            : typeof o == "string" || typeof o == "number" ||
                typeof o == "bigint" || o.constructor == String
            ? S(null, o, null, null, o)
            : F(o)
            ? S(H, { children: o }, null, null, null)
            : o.__b > 0
            ? S(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v)
            : o) != null
      ? (o.__ = e,
        o.__b = e.__b + 1,
        s = se(o, t, l = i + n, p),
        o.__i = s,
        r = null,
        s !== -1 && (p--, (r = t[s]) && (r.__u |= 131072)),
        r == null || r.__v === null
          ? (s == -1 && n--, typeof o.type != "function" && (o.__u |= 65536))
          : s !== l && (s === l + 1
            ? n++
            : s > l
            ? p > c - l ? n += s - l : n--
            : n = s < l && s == l - 1 ? s - l : 0,
            s !== i + n && (o.__u |= 65536)))
      : (r = t[i]) && r.key == null && r.__e &&
        (r.__e == e.__d && (e.__d = P(r)), R(r, r, !1), t[i] = null, p--);
  }
  if (p) {
    for (i = 0; i < u; i++) {
      (r = t[i]) != null && !(131072 & r.__u) &&
        (r.__e == e.__d && (e.__d = P(r)), R(r, r));
    }
  }
}
function _e(e, _, t) {
  var i, o;
  if (typeof e.type == "function") {
    for (i = e.__k, o = 0; i && o < i.length; o++) {
      i[o] && (i[o].__ = e, _ = _e(i[o], _, t));
    }
    return _;
  }
  return e.__e != _ && (t.insertBefore(e.__e, _ || null), _ = e.__e),
    _ && _.nextSibling;
}
function se(e, _, t, i) {
  var o = e.key, r = e.type, l = t - 1, s = t + 1, c = _[t];
  if (c === null || c && o == c.key && r === c.type) return t;
  if (i > (c != null && !(131072 & c.__u) ? 1 : 0)) {
    for (; l >= 0 || s < _.length;) {
      if (l >= 0) {
        if ((c = _[l]) && !(131072 & c.__u) && o == c.key && r === c.type) {
          return l;
        }
        l--;
      }
      if (s < _.length) {
        if ((c = _[s]) && !(131072 & c.__u) && o == c.key && r === c.type) {
          return s;
        }
        s++;
      }
    }
  }
  return -1;
}
function z(e, _, t) {
  _[0] === "-"
    ? e.setProperty(_, t ?? "")
    : e[_] = t == null ? "" : typeof t != "number" || oe.test(_) ? t : t + "px";
}
function M(e, _, t, i, o) {
  var r;
  e: if (_ === "style") {
    if (typeof t == "string") e.style.cssText = t;
    else {
      if (typeof i == "string" && (e.style.cssText = i = ""), i) {
        for (_ in i) t && _ in t || z(e.style, _, "");
      }
      if (t) for (_ in t) i && t[_] === i[_] || z(e.style, _, t[_]);
    }
  } else if (_[0] === "o" && _[1] === "n") {
    r = _ !== (_ = _.replace(/(PointerCapture)$|Capture$/, "$1")),
      _ = _.toLowerCase() in e ? _.toLowerCase().slice(2) : _.slice(2),
      e.l || (e.l = {}),
      e.l[_ + r] = t,
      t
        ? i
          ? t.u = i.u
          : (t.u = Date.now(), e.addEventListener(_, r ? q : G, r))
        : e.removeEventListener(_, r ? q : G, r);
  } else {
    if (o) _ = _.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (
      _ !== "width" && _ !== "height" && _ !== "href" && _ !== "list" &&
      _ !== "form" && _ !== "tabIndex" && _ !== "download" && _ !== "rowSpan" &&
      _ !== "colSpan" && _ !== "role" && _ in e
    ) {
      try {
        e[_] = t ?? "";
        break e;
      } catch {}
    }
    typeof t == "function" ||
      (t == null || t === !1 && _[4] !== "-"
        ? e.removeAttribute(_)
        : e.setAttribute(_, t));
  }
}
function G(e) {
  var _ = this.l[e.type + !1];
  if (e.t) {
    if (e.t <= _.u) return;
    else e.t = Date.now();
  }
  return _(a.event ? a.event(e) : e);
}
function q(e) {
  return this.l[e.type + !0](a.event ? a.event(e) : e);
}
function B(e, _, t, i, o, r, l, s, c, u) {
  var p, n, m, f, h, k, v, d, y, x, T, w, V, U, N, g = _.type;
  if (_.constructor !== void 0) return null;
  128 & t.__u && (c = !!(32 & t.__u), r = [s = _.__e = t.__e]),
    (p = a.__b) && p(_);
  e: if (typeof g == "function") {
    try {
      if (
        d = _.props,
          y = (p = g.contextType) && i[p.__c],
          x = p ? y ? y.props.value : p.__ : i,
          t.__c
            ? v = (n = _.__c = t.__c).__ = n.__E
            : ("prototype" in g && g.prototype.render
              ? _.__c = n = new g(d, x)
              : (_.__c = n = new W(d, x), n.constructor = g, n.render = fe),
              y && y.sub(n),
              n.props = d,
              n.state || (n.state = {}),
              n.context = x,
              n.__n = i,
              m = n.__d = !0,
              n.__h = [],
              n._sb = []),
          n.__s == null && (n.__s = n.state),
          g.getDerivedStateFromProps != null &&
          (n.__s == n.state && (n.__s = b({}, n.__s)),
            b(n.__s, g.getDerivedStateFromProps(d, n.__s))),
          f = n.props,
          h = n.state,
          n.__v = _,
          m
      ) {
        g.getDerivedStateFromProps == null && n.componentWillMount != null &&
        n.componentWillMount(),
          n.componentDidMount != null && n.__h.push(n.componentDidMount);
      } else {
        if (
          g.getDerivedStateFromProps == null && d !== f &&
          n.componentWillReceiveProps != null &&
          n.componentWillReceiveProps(d, x),
            !n.__e &&
            (n.shouldComponentUpdate != null &&
                n.shouldComponentUpdate(d, n.__s, x) === !1 || _.__v === t.__v)
        ) {
          for (
            _.__v !== t.__v && (n.props = d, n.state = n.__s, n.__d = !1),
              _.__e = t.__e,
              _.__k = t.__k,
              _.__k.forEach(function (L) {
                L && (L.__ = _);
              }),
              T = 0;
            T < n._sb.length;
            T++
          ) n.__h.push(n._sb[T]);
          n._sb = [], n.__h.length && l.push(n);
          break e;
        }
        n.componentWillUpdate != null && n.componentWillUpdate(d, n.__s, x),
          n.componentDidUpdate != null && n.__h.push(function () {
            n.componentDidUpdate(f, h, k);
          });
      }
      if (
        n.context = x,
          n.props = d,
          n.__P = e,
          n.__e = !1,
          w = a.__r,
          V = 0,
          "prototype" in g && g.prototype.render
      ) {
        for (
          n.state = n.__s,
            n.__d = !1,
            w && w(_),
            p = n.render(n.props, n.state, n.context),
            U = 0;
          U < n._sb.length;
          U++
        ) n.__h.push(n._sb[U]);
        n._sb = [];
      } else {do n.__d = !1,
          w && w(_),
          p = n.render(n.props, n.state, n.context),
          n.state = n.__s; while (n.__d && ++V < 25);}
      n.state = n.__s,
        n.getChildContext != null && (i = b(b({}, i), n.getChildContext())),
        m || n.getSnapshotBeforeUpdate == null ||
        (k = n.getSnapshotBeforeUpdate(f, h)),
        ee(
          e,
          F(
              N = p != null && p.type === H && p.key == null
                ? p.props.children
                : p,
            )
            ? N
            : [N],
          _,
          t,
          i,
          o,
          r,
          l,
          s,
          c,
          u,
        ),
        n.base = _.__e,
        _.__u &= -161,
        n.__h.length && l.push(n),
        v && (n.__E = n.__ = null);
    } catch (L) {
      _.__v = null,
        c || r != null
          ? (_.__e = s, _.__u |= c ? 160 : 32, r[r.indexOf(s)] = null)
          : (_.__e = t.__e, _.__k = t.__k),
        a.__e(L, _, t);
    }
  } else {r == null && _.__v === t.__v
      ? (_.__k = t.__k, _.__e = t.__e)
      : _.__e = ue(t.__e, _, t, i, o, r, l, c, u);}
  (p = a.diffed) && p(_);
}
function te(e, _, t) {
  _.__d = void 0;
  for (var i = 0; i < t.length; i++) O(t[i], t[++i], t[++i]);
  a.__c && a.__c(_, e),
    e.some(function (o) {
      try {
        e = o.__h,
          o.__h = [],
          e.some(function (r) {
            r.call(o);
          });
      } catch (r) {
        a.__e(r, o.__v);
      }
    });
}
function ue(e, _, t, i, o, r, l, s, c) {
  var u, p, n, m, f, h, k, v = t.props, d = _.props, y = _.type;
  if (y === "svg" && (o = !0), r != null) {
    for (u = 0; u < r.length; u++) {
      if (
        (f = r[u]) && "setAttribute" in f == !!y &&
        (y ? f.localName === y : f.nodeType === 3)
      ) {
        e = f, r[u] = null;
        break;
      }
    }
  }
  if (e == null) {
    if (y === null) return document.createTextNode(d);
    e = o
      ? document.createElementNS("http://www.w3.org/2000/svg", y)
      : document.createElement(y, d.is && d),
      r = null,
      s = !1;
  }
  if (y === null) v === d || s && e.data === d || (e.data = d);
  else {
    if (r = r && D.call(e.childNodes), v = t.props || E, !s && r != null) {
      for (v = {}, u = 0; u < e.attributes.length; u++) {
        v[(f = e.attributes[u]).name] = f.value;
      }
    }
    for (u in v) {
      f = v[u],
        u == "children" ||
        (u == "dangerouslySetInnerHTML"
          ? n = f
          : u === "key" || u in d || M(e, u, null, f, o));
    }
    for (u in d) {
      f = d[u],
        u == "children"
          ? m = f
          : u == "dangerouslySetInnerHTML"
          ? p = f
          : u == "value"
          ? h = f
          : u == "checked"
          ? k = f
          : u === "key" || s && typeof f != "function" || v[u] === f ||
            M(e, u, f, v[u], o);
    }
    if (p) {
      s || n && (p.__html === n.__html || p.__html === e.innerHTML) ||
      (e.innerHTML = p.__html), _.__k = [];
    } else if (
      n && (e.innerHTML = ""),
        ee(
          e,
          F(m) ? m : [m],
          _,
          t,
          i,
          o && y !== "foreignObject",
          r,
          l,
          r ? r[0] : t.__k && P(t, 0),
          s,
          c,
        ),
        r != null
    ) for (u = r.length; u--;) r[u] != null && Y(r[u]);
    s ||
      (u = "value",
        h !== void 0 &&
        (h !== e[u] || y === "progress" && !h ||
          y === "option" && h !== v[u]) &&
        M(e, u, h, v[u], !1),
        u = "checked",
        k !== void 0 && k !== e[u] && M(e, u, k, v[u], !1));
  }
  return e;
}
function O(e, _, t) {
  try {
    typeof e == "function" ? e(_) : e.current = _;
  } catch (i) {
    a.__e(i, t);
  }
}
function R(e, _, t) {
  var i, o;
  if (
    a.unmount && a.unmount(e),
      (i = e.ref) && (i.current && i.current !== e.__e || O(i, null, _)),
      (i = e.__c) != null
  ) {
    if (i.componentWillUnmount) {
      try {
        i.componentWillUnmount();
      } catch (r) {
        a.__e(r, _);
      }
    }
    i.base = i.__P = null, e.__c = void 0;
  }
  if (i = e.__k) {
    for (o = 0; o < i.length; o++) {
      i[o] && R(i[o], _, t || typeof e.type != "function");
    }
  }
  t || e.__e == null || Y(e.__e), e.__ = e.__e = e.__d = void 0;
}
function fe(e, _, t) {
  return this.constructor(e, t);
}
D = X.slice,
  a = {
    __e: function (e, _, t, i) {
      for (var o, r, l; _ = _.__;) {
        if ((o = _.__c) && !o.__) {
          try {
            if (
              (r = o.constructor) && r.getDerivedStateFromError != null &&
              (o.setState(r.getDerivedStateFromError(e)), l = o.__d),
                o.componentDidCatch != null &&
                (o.componentDidCatch(e, i || {}), l = o.__d),
                l
            ) return o.__E = o;
          } catch (s) {
            e = s;
          }
        }
      }
      throw e;
    },
  },
  J = 0,
  W.prototype.setState = function (e, _) {
    var t;
    t = this.__s != null && this.__s !== this.state
      ? this.__s
      : this.__s = b({}, this.state),
      typeof e == "function" && (e = e(b({}, t), this.props)),
      e && b(t, e),
      e != null && this.__v && (_ && this._sb.push(_), I(this));
  },
  W.prototype.forceUpdate = function (e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), I(this));
  },
  W.prototype.render = H,
  C = [],
  K = typeof Promise == "function"
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout,
  $ = function (e, _) {
    return e.__v.__b - _.__v.__b;
  },
  A.__r = 0,
  0;
function qt(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ut(e) {
  let t = e.length, r = -1, n, s = "", o = e.charCodeAt(0);
  for (; ++r < t;) {
    if (n = e.charCodeAt(r), n === 0) {
      s += "�";
      continue;
    }
    if (n === 37) {
      s += "\\%";
      continue;
    }
    if (n === 44) {
      s += "\\,";
      continue;
    }
    if (
      n >= 1 && n <= 31 || n === 127 || r === 0 && n >= 48 && n <= 57 ||
      r === 1 && n >= 48 && n <= 57 && o === 45
    ) {
      s += `\\${n.toString(16)} `;
      continue;
    }
    if (r === 0 && t === 1 && n === 45) {
      s += `\\${e.charAt(r)}`;
      continue;
    }
    if (
      n >= 128 || n === 45 || n === 95 || n >= 48 && n <= 57 ||
      n >= 65 && n <= 90 || n >= 97 && n <= 122
    ) {
      s += e.charAt(r);
      continue;
    }
    s += `\\${e.charAt(r)}`;
  }
  return s;
}
var H1 = ut;
function b1(e = []) {
  return Array.isArray(e) ? e : [e];
}
function v(e) {
  return typeof e == "string";
}
function dt(e) {
  return e.filter(([t, r], n) => {
    if (t.startsWith("$$")) return !1;
    for (let s = n - 1; s >= 0; s--) {
      if (e[s][0] === t && e[s][1] === r) return !1;
    }
    return !0;
  });
}
function z1(e) {
  return e == null
    ? ""
    : dt(e).map(([t, r]) => r != null ? `${t}:${r};` : void 0).filter(Boolean)
      .join("");
}
function T(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function K1(e, t, r = !1) {
  let n = e, s = t;
  if (Array.isArray(s)) return r && Array.isArray(s) ? [...n, ...s] : [...s];
  let o = { ...n };
  return T(n) && T(s) && Object.keys(s).forEach((c) => {
    T(n[c]) && T(s[c]) || Array.isArray(n[c]) && Array.isArray(s[c])
      ? o[c] = K1(n[c], s[c], r)
      : Object.assign(o, { [c]: s[c] });
  }),
    o;
}
var St = /[\w\u00A0-\uFFFF-_:%-?]/;
function Kt(e = "") {
  return St.test(e);
}
var $t = Object.defineProperty,
  et = class extends Map {
    map(t) {
      let r = [];
      return this.forEach((n, s) => {
        r.push(t(n, s));
      }),
        r;
    }
  },
  At = Object.defineProperty,
  Mt = (e, t, r) =>
    t in e
      ? At(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : e[t] = r,
  bt = (e, t, r) => (Mt(e, typeof t != "symbol" ? t + "" : t, r), r),
  I1 = class extends Set {
    constructor(t) {
      super(t), bt(this, "_map"), this._map ?? (this._map = new Map());
    }
    add(t) {
      return this._map ?? (this._map = new Map()),
        this._map.set(t, (this._map.get(t) ?? 0) + 1),
        super.add(t);
    }
    delete(t) {
      return this._map.delete(t), super.delete(t);
    }
    clear() {
      this._map.clear(), super.clear();
    }
    getCount(t) {
      return this._map.get(t) ?? 0;
    }
    setCount(t, r) {
      return this._map.set(t, r), super.add(t);
    }
  };
var rt = new Set();
function Rt(e) {
  rt.has(e) || (console.warn("[unocss]", e), rt.add(e));
}
var Pt = /[\\:]?[\s'"`;{}]+/g;
function ee1(e) {
  return e;
}
Object.defineProperty;
var ot = /^\[(.+?)(~?=)"(.*)"\]$/;
function Wt(e) {
  return ot.test(e)
    ? e.replace(ot, (t, r, n, s) => `[${H1(r)}${n}"${H1(s)}"]`)
    : `.${H1(e)}`;
}
const osType = (() => {
  const { Deno: Deno1 } = globalThis;
  if (typeof Deno1?.build?.os === "string") return Deno1.build.os;
  const { navigator } = globalThis;
  if (navigator?.appVersion?.includes?.("Win")) return "windows";
  return "linux";
})();
const isWindows = osType === "windows";
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError(
      `Path must be a string. Received ${JSON.stringify(path)}`,
    );
  }
}
function stripSuffix(name, suffix) {
  if (suffix.length >= name.length) return name;
  const lenDiff = name.length - suffix.length;
  for (let i = suffix.length - 1; i >= 0; --i) {
    if (name.charCodeAt(lenDiff + i) !== suffix.charCodeAt(i)) return name;
  }
  return name.slice(0, -suffix.length);
}
function lastPathSegment(path, isSep, start = 0) {
  let matchedNonSeparator = false;
  let end = path.length;
  for (let i = path.length - 1; i >= start; --i) {
    if (isSep(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        start = i + 1;
        break;
      }
    } else if (!matchedNonSeparator) {
      matchedNonSeparator = true;
      end = i + 1;
    }
  }
  return path.slice(start, end);
}
function assertArgs(path, suffix) {
  assertPath(path);
  if (path.length === 0) return path;
  if (typeof suffix !== "string") {
    throw new TypeError(
      `Suffix must be a string. Received ${JSON.stringify(suffix)}`,
    );
  }
}
const CHAR_FORWARD_SLASH = 47;
function stripTrailingSeparators(segment, isSep) {
  if (segment.length <= 1) return segment;
  let end = segment.length;
  for (let i = segment.length - 1; i > 0; i--) {
    if (isSep(segment.charCodeAt(i))) end = i;
    else break;
  }
  return segment.slice(0, end);
}
function isPosixPathSeparator(code) {
  return code === 47;
}
function isPathSeparator(code) {
  return code === 47 || code === 92;
}
function isWindowsDeviceRoot(code) {
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function basename(path, suffix = "") {
  assertArgs(path, suffix);
  let start = 0;
  if (path.length >= 2) {
    const drive = path.charCodeAt(0);
    if (isWindowsDeviceRoot(drive)) if (path.charCodeAt(1) === 58) start = 2;
  }
  const lastSegment = lastPathSegment(path, isPathSeparator, start);
  const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function assertArg(path) {
  assertPath(path);
  if (path.length === 0) return ".";
}
function dirname(path) {
  assertArg(path);
  const len = path.length;
  let rootEnd = -1;
  let end = -1;
  let matchedSlash = true;
  let offset = 0;
  const code = path.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      rootEnd = offset = 1;
      if (isPathSeparator(path.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
        if (j < len && j !== last) {
          last = j;
          for (; j < len; ++j) if (!isPathSeparator(path.charCodeAt(j))) break;
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
            if (j === len) return path;
            if (j !== last) rootEnd = offset = j + 1;
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path.charCodeAt(1) === 58) {
        rootEnd = offset = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) rootEnd = offset = 3;
        }
      }
    }
  } else if (isPathSeparator(code)) return path;
  for (let i = len - 1; i >= offset; --i) {
    if (isPathSeparator(path.charCodeAt(i))) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else matchedSlash = false;
  }
  if (end === -1) {
    if (rootEnd === -1) return ".";
    else end = rootEnd;
  }
  return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator);
}
function extname(path) {
  assertPath(path);
  let start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  if (
    path.length >= 2 && path.charCodeAt(1) === 58 &&
    isWindowsDeviceRoot(path.charCodeAt(0))
  ) start = startPart = 2;
  for (let i = path.length - 1; i >= start; --i) {
    const code = path.charCodeAt(i);
    if (isPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) preDotState = -1;
  }
  if (
    startDot === -1 || end === -1 || preDotState === 0 ||
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
  ) return "";
  return path.slice(startDot, end);
}
function _format(sep, pathObject) {
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base ||
    (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) return base;
  if (base === sep) return dir;
  if (dir === pathObject.root) return dir + base;
  return dir + sep + base;
}
function assertArg1(pathObject) {
  if (pathObject === null || typeof pathObject !== "object") {
    throw new TypeError(
      `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`,
    );
  }
}
function format(pathObject) {
  assertArg1(pathObject);
  return _format("\\", pathObject);
}
function assertArg2(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol !== "file:") throw new TypeError("Must be a file URL.");
  return url;
}
function fromFileUrl(url) {
  url = assertArg2(url);
  let path = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname !== "") path = `\\\\${url.hostname}${path}`;
  return path;
}
function isAbsolute(path) {
  assertPath(path);
  const len = path.length;
  if (len === 0) return false;
  const code = path.charCodeAt(0);
  if (isPathSeparator(code)) return true;
  else if (isWindowsDeviceRoot(code)) {
    if (len > 2 && path.charCodeAt(1) === 58) {
      if (isPathSeparator(path.charCodeAt(2))) {
        return true;
      }
    }
  }
  return false;
}
class AssertionError extends Error {
  name = "AssertionError";
  constructor(message) {
    super(message);
  }
}
function assert(expr, msg = "") {
  if (!expr) throw new AssertionError(msg);
}
function assertArg3(path) {
  assertPath(path);
  if (path.length === 0) return ".";
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i = 0, len = path.length; i <= len; ++i) {
    if (i < len) code = path.charCodeAt(i);
    else if (isPathSeparator(code)) break;
    else code = CHAR_FORWARD_SLASH;
    if (isPathSeparator(code)) {
      if (lastSlash === i - 1 || dots === 1) {}
      else if (lastSlash !== i - 1 && dots === 2) {
        if (
          res.length < 2 || lastSegmentLength !== 2 ||
          res.charCodeAt(res.length - 1) !== 46 ||
          res.charCodeAt(res.length - 2) !== 46
        ) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf(separator);
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0) res += `${separator}..`;
          else res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) res += separator + path.slice(lastSlash + 1, i);
        else res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) ++dots;
    else dots = -1;
  }
  return res;
}
function normalize(path) {
  assertArg3(path);
  const len = path.length;
  let rootEnd = 0;
  let device;
  let isAbsolute = false;
  const code = path.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      isAbsolute = true;
      if (isPathSeparator(path.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
        if (j < len && j !== last) {
          const firstPart = path.slice(last, j);
          last = j;
          for (; j < len; ++j) if (!isPathSeparator(path.charCodeAt(j))) break;
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
            if (j === len) return `\\\\${firstPart}\\${path.slice(last)}\\`;
            else if (j !== last) {
              device = `\\\\${firstPart}\\${path.slice(last, j)}`;
              rootEnd = j;
            }
          }
        }
      } else rootEnd = 1;
    } else if (isWindowsDeviceRoot(code)) {
      if (path.charCodeAt(1) === 58) {
        device = path.slice(0, 2);
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            isAbsolute = true;
            rootEnd = 3;
          }
        }
      }
    }
  } else if (isPathSeparator(code)) return "\\";
  let tail;
  if (rootEnd < len) {
    tail = normalizeString(
      path.slice(rootEnd),
      !isAbsolute,
      "\\",
      isPathSeparator,
    );
  } else tail = "";
  if (tail.length === 0 && !isAbsolute) tail = ".";
  if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
    tail += "\\";
  }
  if (device === undefined) {
    if (isAbsolute) {
      if (tail.length > 0) return `\\${tail}`;
      else return "\\";
    } else if (tail.length > 0) return tail;
    else return "";
  } else if (isAbsolute) {
    if (tail.length > 0) return `${device}\\${tail}`;
    else return `${device}\\`;
  } else if (tail.length > 0) return device + tail;
  else return device;
}
function join(...paths) {
  if (paths.length === 0) return ".";
  let joined;
  let firstPart = null;
  for (let i = 0; i < paths.length; ++i) {
    const path = paths[i];
    assertPath(path);
    if (path.length > 0) {
      if (joined === undefined) joined = firstPart = path;
      else joined += `\\${path}`;
    }
  }
  if (joined === undefined) return ".";
  let needsReplace = true;
  let slashCount = 0;
  assert(firstPart !== null);
  if (isPathSeparator(firstPart.charCodeAt(0))) {
    ++slashCount;
    const firstLen = firstPart.length;
    if (firstLen > 1) {
      if (isPathSeparator(firstPart.charCodeAt(1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
          else needsReplace = false;
        }
      }
    }
  }
  if (needsReplace) {
    for (; slashCount < joined.length; ++slashCount) {
      if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
    }
    if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
  }
  return normalize(joined);
}
function parse(path) {
  assertPath(path);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  const len = path.length;
  if (len === 0) return ret;
  let rootEnd = 0;
  let code = path.charCodeAt(0);
  if (len > 1) {
    if (isPathSeparator(code)) {
      rootEnd = 1;
      if (isPathSeparator(path.charCodeAt(1))) {
        let j = 2;
        let last = j;
        for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
        if (j < len && j !== last) {
          last = j;
          for (; j < len; ++j) if (!isPathSeparator(path.charCodeAt(j))) break;
          if (j < len && j !== last) {
            last = j;
            for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
            if (j === len) rootEnd = j;
            else if (j !== last) rootEnd = j + 1;
          }
        }
      }
    } else if (isWindowsDeviceRoot(code)) {
      if (path.charCodeAt(1) === 58) {
        rootEnd = 2;
        if (len > 2) {
          if (isPathSeparator(path.charCodeAt(2))) {
            if (len === 3) {
              ret.root = ret.dir = path;
              ret.base = "\\";
              return ret;
            }
            rootEnd = 3;
          }
        } else {
          ret.root = ret.dir = path;
          return ret;
        }
      }
    }
  } else if (isPathSeparator(code)) {
    ret.root = ret.dir = path;
    ret.base = "\\";
    return ret;
  }
  if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
  let startDot = -1;
  let startPart = rootEnd;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;
  let preDotState = 0;
  for (; i >= rootEnd; --i) {
    code = path.charCodeAt(i);
    if (isPathSeparator(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) preDotState = -1;
  }
  if (
    startDot === -1 || end === -1 || preDotState === 0 ||
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
  ) {
    if (end !== -1) ret.base = ret.name = path.slice(startPart, end);
    else {
      ret.name = path.slice(startPart, startDot);
      ret.base = path.slice(startPart, end);
      ret.ext = path.slice(startDot, end);
    }
  }
  ret.base = ret.base || "\\";
  if (startPart > 0 && startPart !== rootEnd) {
    ret.dir = path.slice(0, startPart - 1);
  } else ret.dir = ret.root;
  return ret;
}
function resolve(...pathSegments) {
  let resolvedDevice = "";
  let resolvedTail = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1; i--) {
    let path;
    const { Deno: Deno1 } = globalThis;
    if (i >= 0) path = pathSegments[i];
    else if (!resolvedDevice) {
      if (typeof Deno1?.cwd !== "function") {
        throw new TypeError("Resolved a drive-letter-less path without a CWD.");
      }
      path = Deno1.cwd();
    } else {
      if (
        typeof Deno1?.env?.get !== "function" ||
        typeof Deno1?.cwd !== "function"
      ) throw new TypeError("Resolved a relative path without a CWD.");
      path = Deno1.cwd();
      if (
        path === undefined ||
        path.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`
      ) path = `${resolvedDevice}\\`;
    }
    assertPath(path);
    const len = path.length;
    if (len === 0) continue;
    let rootEnd = 0;
    let device = "";
    let isAbsolute = false;
    const code = path.charCodeAt(0);
    if (len > 1) {
      if (isPathSeparator(code)) {
        isAbsolute = true;
        if (isPathSeparator(path.charCodeAt(1))) {
          let j = 2;
          let last = j;
          for (; j < len; ++j) if (isPathSeparator(path.charCodeAt(j))) break;
          if (j < len && j !== last) {
            const firstPart = path.slice(last, j);
            last = j;
            for (; j < len; ++j) {
              if (!isPathSeparator(path.charCodeAt(j))) break;
            }
            if (j < len && j !== last) {
              last = j;
              for (; j < len; ++j) {
                if (isPathSeparator(path.charCodeAt(j))) break;
              }
              if (j === len) {
                device = `\\\\${firstPart}\\${path.slice(last)}`;
                rootEnd = j;
              } else if (j !== last) {
                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else rootEnd = 1;
      } else if (isWindowsDeviceRoot(code)) {
        if (path.charCodeAt(1) === 58) {
          device = path.slice(0, 2);
          rootEnd = 2;
          if (len > 2) {
            if (isPathSeparator(path.charCodeAt(2))) {
              isAbsolute = true;
              rootEnd = 3;
            }
          }
        }
      }
    } else if (isPathSeparator(code)) {
      rootEnd = 1;
      isAbsolute = true;
    }
    if (
      device.length > 0 && resolvedDevice.length > 0 &&
      device.toLowerCase() !== resolvedDevice.toLowerCase()
    ) continue;
    if (resolvedDevice.length === 0 && device.length > 0) {
      resolvedDevice = device;
    }
    if (!resolvedAbsolute) {
      resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
      resolvedAbsolute = isAbsolute;
    }
    if (resolvedAbsolute && resolvedDevice.length > 0) break;
  }
  resolvedTail = normalizeString(
    resolvedTail,
    !resolvedAbsolute,
    "\\",
    isPathSeparator,
  );
  return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function assertArgs1(from, to) {
  assertPath(from);
  assertPath(to);
  if (from === to) return "";
}
function relative(from, to) {
  assertArgs1(from, to);
  const fromOrig = resolve(from);
  const toOrig = resolve(to);
  if (fromOrig === toOrig) return "";
  from = fromOrig.toLowerCase();
  to = toOrig.toLowerCase();
  if (from === to) return "";
  let fromStart = 0;
  let fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (from.charCodeAt(fromStart) !== 92) break;
  }
  for (; fromEnd - 1 > fromStart; --fromEnd) {
    if (from.charCodeAt(fromEnd - 1) !== 92) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 0;
  let toEnd = to.length;
  for (; toStart < toEnd; ++toStart) if (to.charCodeAt(toStart) !== 92) break;
  for (; toEnd - 1 > toStart; --toEnd) {
    if (to.charCodeAt(toEnd - 1) !== 92) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === 92) {
          return toOrig.slice(toStart + i + 1);
        } else if (i === 2) return toOrig.slice(toStart + i);
      }
      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === 92) lastCommonSep = i;
        else if (i === 2) lastCommonSep = 3;
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;
    else if (fromCode === 92) lastCommonSep = i;
  }
  if (i !== length && lastCommonSep === -1) return toOrig;
  let out = "";
  if (lastCommonSep === -1) lastCommonSep = 0;
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from.charCodeAt(i) === 92) {
      if (out.length === 0) out += "..";
      else out += "\\..";
    }
  }
  if (out.length > 0) return out + toOrig.slice(toStart + lastCommonSep, toEnd);
  else {
    toStart += lastCommonSep;
    if (toOrig.charCodeAt(toStart) === 92) ++toStart;
    return toOrig.slice(toStart, toEnd);
  }
}
const WHITESPACE_ENCODINGS = {
  "	": "%09",
  "\n": "%0A",
  "\v": "%0B",
  "\f": "%0C",
  "\r": "%0D",
  " ": "%20",
};
function encodeWhitespace(string) {
  return string.replaceAll(/[\s]/g, (c) => {
    return WHITESPACE_ENCODINGS[c] ?? c;
  });
}
function toFileUrl(path) {
  if (!isAbsolute(path)) throw new TypeError("Must be an absolute path.");
  const [, hostname, pathname] = path.match(
    /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/,
  );
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
  if (hostname !== undefined && hostname !== "localhost") {
    url.hostname = hostname;
    if (!url.hostname) throw new TypeError("Invalid hostname.");
  }
  return url;
}
function toNamespacedPath(path) {
  if (typeof path !== "string") return path;
  if (path.length === 0) return "";
  const resolvedPath = resolve(path);
  if (resolvedPath.length >= 3) {
    if (resolvedPath.charCodeAt(0) === 92) {
      if (resolvedPath.charCodeAt(1) === 92) {
        const code = resolvedPath.charCodeAt(2);
        if (code !== 63 && code !== 46) {
          return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
      if (
        resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92
      ) return `\\\\?\\${resolvedPath}`;
    }
  }
  return path;
}
function _common(paths, sep) {
  const [first = "", ...remaining] = paths;
  if (first === "" || remaining.length === 0) {
    return first.substring(0, first.lastIndexOf(sep) + 1);
  }
  const parts = first.split(sep);
  let endOfPrefix = parts.length;
  for (const path of remaining) {
    const compare = path.split(sep);
    for (let i = 0; i < endOfPrefix; i++) {
      if (compare[i] !== parts[i]) endOfPrefix = i;
    }
    if (endOfPrefix === 0) return "";
  }
  const prefix = parts.slice(0, endOfPrefix).join(sep);
  return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
}
const SEP = "\\";
const SEP_PATTERN = /[\\/]+/;
function common(paths, sep = SEP) {
  return _common(paths, sep);
}
const regExpEscapeChars = [
  "!",
  "$",
  "(",
  ")",
  "*",
  "+",
  ".",
  "=",
  "?",
  "[",
  "\\",
  "^",
  "{",
  "|",
];
const rangeEscapeChars = ["-", "\\", "]"];
function _globToRegExp(
  c,
  glob,
  {
    extended = true,
    globstar: globstarOption = true,
    caseInsensitive = false,
  } = {},
) {
  if (glob === "") return /(?!)/;
  let newLength = glob.length;
  for (; newLength > 1 && c.seps.includes(glob[newLength - 1]); newLength--);
  glob = glob.slice(0, newLength);
  let regExpString = "";
  for (let j = 0; j < glob.length;) {
    let segment = "";
    const groupStack = [];
    let inRange = false;
    let inEscape = false;
    let endsWithSep = false;
    let i = j;
    for (; i < glob.length && !c.seps.includes(glob[i]); i++) {
      if (inEscape) {
        inEscape = false;
        const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
        segment += escapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
        continue;
      }
      if (glob[i] === c.escapePrefix) {
        inEscape = true;
        continue;
      }
      if (glob[i] === "[") {
        if (!inRange) {
          inRange = true;
          segment += "[";
          if (glob[i + 1] === "!") {
            i++;
            segment += "^";
          } else if (glob[i + 1] === "^") {
            i++;
            segment += "\\^";
          }
          continue;
        } else if (glob[i + 1] === ":") {
          let k = i + 1;
          let value = "";
          while (glob[k + 1] !== undefined && glob[k + 1] !== ":") {
            value += glob[k + 1];
            k++;
          }
          if (glob[k + 1] === ":" && glob[k + 2] === "]") {
            i = k + 2;
            if (value === "alnum") segment += "\\dA-Za-z";
            else if (value === "alpha") segment += "A-Za-z";
            else if (value === "ascii") segment += "\x00-";
            else if (value === "blank") segment += "	 ";
            else if (value === "cntrl") segment += "\x00-\x1f";
            else if (value === "digit") segment += "\\d";
            else if (value === "graph") segment += "!-~";
            else if (value === "lower") segment += "a-z";
            else if (value === "print") segment += " -~";
            else if (value === "punct") {
              segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
            } else if (value === "space") {
              segment += "\\s\v";
            } else if (value === "upper") segment += "A-Z";
            else if (value === "word") segment += "\\w";
            else if (value === "xdigit") segment += "\\dA-Fa-f";
            continue;
          }
        }
      }
      if (glob[i] === "]" && inRange) {
        inRange = false;
        segment += "]";
        continue;
      }
      if (inRange) {
        if (glob[i] === "\\") segment += `\\\\`;
        else segment += glob[i];
        continue;
      }
      if (
        glob[i] === ")" && groupStack.length > 0 &&
        groupStack[groupStack.length - 1] !== "BRACE"
      ) {
        segment += ")";
        const type = groupStack.pop();
        if (type === "!") segment += c.wildcard;
        else if (type !== "@") segment += type;
        continue;
      }
      if (
        glob[i] === "|" && groupStack.length > 0 &&
        groupStack[groupStack.length - 1] !== "BRACE"
      ) {
        segment += "|";
        continue;
      }
      if (glob[i] === "+" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("+");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "@" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("@");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "?") {
        if (extended && glob[i + 1] === "(") {
          i++;
          groupStack.push("?");
          segment += "(?:";
        } else segment += ".";
        continue;
      }
      if (glob[i] === "!" && extended && glob[i + 1] === "(") {
        i++;
        groupStack.push("!");
        segment += "(?!";
        continue;
      }
      if (glob[i] === "{") {
        groupStack.push("BRACE");
        segment += "(?:";
        continue;
      }
      if (glob[i] === "}" && groupStack[groupStack.length - 1] === "BRACE") {
        groupStack.pop();
        segment += ")";
        continue;
      }
      if (glob[i] === "," && groupStack[groupStack.length - 1] === "BRACE") {
        segment += "|";
        continue;
      }
      if (glob[i] === "*") {
        if (extended && glob[i + 1] === "(") {
          i++;
          groupStack.push("*");
          segment += "(?:";
        } else {
          const prevChar = glob[i - 1];
          let numStars = 1;
          while (glob[i + 1] === "*") {
            i++;
            numStars++;
          }
          const nextChar = glob[i + 1];
          if (
            globstarOption && numStars === 2 &&
            [...c.seps, undefined].includes(prevChar) &&
            [...c.seps, undefined].includes(nextChar)
          ) {
            segment += c.globstar;
            endsWithSep = true;
          } else segment += c.wildcard;
        }
        continue;
      }
      segment += regExpEscapeChars.includes(glob[i]) ? `\\${glob[i]}` : glob[i];
    }
    if (groupStack.length > 0 || inRange || inEscape) {
      segment = "";
      for (const c of glob.slice(j, i)) {
        segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
        endsWithSep = false;
      }
    }
    regExpString += segment;
    if (!endsWithSep) {
      regExpString += i < glob.length ? c.sep : c.sepMaybe;
      endsWithSep = true;
    }
    while (c.seps.includes(glob[i])) i++;
    if (!(i > j)) {
      throw new Error("Assertion failure: i > j (potential infinite loop)");
    }
    j = i;
  }
  regExpString = `^${regExpString}$`;
  return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
const constants = {
  sep: "(?:\\\\|/)+",
  sepMaybe: "(?:\\\\|/)*",
  seps: ["\\", "/"],
  globstar: "(?:[^\\\\/]*(?:\\\\|/|$)+)*",
  wildcard: "[^\\\\/]*",
  escapePrefix: "`",
};
function globToRegExp(glob, options = {}) {
  return _globToRegExp(constants, glob, options);
}
function isGlob(str) {
  const chars = { "{": "}", "(": ")", "[": "]" };
  const regex =
    /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
  if (str === "") return false;
  let match;
  while (match = regex.exec(str)) {
    if (match[2]) return true;
    let idx = match.index + match[0].length;
    const open = match[1];
    const close = open ? chars[open] : null;
    if (open && close) {
      const n = str.indexOf(close, idx);
      if (n !== -1) idx = n + 1;
    }
    str = str.slice(idx);
  }
  return false;
}
function normalizeGlob(glob, { globstar = false } = {}) {
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) return normalize(glob);
  const s = SEP_PATTERN.source;
  const badParentPattern = new RegExp(
    `(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`,
    "g",
  );
  return normalize(glob.replace(badParentPattern, "\x00")).replace(/\0/g, "..");
}
function joinGlobs(globs, { extended = true, globstar = false } = {}) {
  if (!globstar || globs.length === 0) return join(...globs);
  if (globs.length === 0) return ".";
  let joined;
  for (const glob of globs) {
    const path = glob;
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `${SEP}${path}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob(joined, { extended, globstar });
}
const sep = "\\";
const delimiter = ";";
const mod = {
  sep: sep,
  delimiter: delimiter,
  basename,
  dirname,
  extname,
  format,
  fromFileUrl,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  toFileUrl,
  toNamespacedPath,
  common,
  SEP,
  SEP_PATTERN,
  globToRegExp,
  isGlob,
  joinGlobs,
  normalizeGlob,
};
function isPosixPathSeparator1(code) {
  return code === 47;
}
function basename1(path, suffix = "") {
  assertArgs(path, suffix);
  const lastSegment = lastPathSegment(path, isPosixPathSeparator1);
  const strippedSegment = stripTrailingSeparators(
    lastSegment,
    isPosixPathSeparator1,
  );
  return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function dirname1(path) {
  assertArg(path);
  let end = -1;
  let matchedNonSeparator = false;
  for (let i = path.length - 1; i >= 1; --i) {
    if (isPosixPathSeparator1(path.charCodeAt(i))) {
      if (matchedNonSeparator) {
        end = i;
        break;
      }
    } else matchedNonSeparator = true;
  }
  if (end === -1) return isPosixPathSeparator1(path.charCodeAt(0)) ? "/" : ".";
  return stripTrailingSeparators(path.slice(0, end), isPosixPathSeparator1);
}
function extname1(path) {
  assertPath(path);
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let preDotState = 0;
  for (let i = path.length - 1; i >= 0; --i) {
    const code = path.charCodeAt(i);
    if (isPosixPathSeparator1(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) preDotState = -1;
  }
  if (
    startDot === -1 || end === -1 || preDotState === 0 ||
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
  ) return "";
  return path.slice(startDot, end);
}
function format1(pathObject) {
  assertArg1(pathObject);
  return _format("/", pathObject);
}
function fromFileUrl1(url) {
  url = assertArg2(url);
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
  );
}
function isAbsolute1(path) {
  assertPath(path);
  return path.length > 0 && isPosixPathSeparator1(path.charCodeAt(0));
}
function normalize1(path) {
  assertArg3(path);
  const isAbsolute = isPosixPathSeparator1(path.charCodeAt(0));
  const trailingSeparator = isPosixPathSeparator1(
    path.charCodeAt(path.length - 1),
  );
  path = normalizeString(path, !isAbsolute, "/", isPosixPathSeparator1);
  if (path.length === 0 && !isAbsolute) path = ".";
  if (path.length > 0 && trailingSeparator) path += "/";
  if (isAbsolute) return `/${path}`;
  return path;
}
function join1(...paths) {
  if (paths.length === 0) return ".";
  let joined;
  for (let i = 0, len = paths.length; i < len; ++i) {
    const path = paths[i];
    assertPath(path);
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `/${path}`;
    }
  }
  if (!joined) return ".";
  return normalize1(joined);
}
function parse1(path) {
  assertPath(path);
  const ret = { root: "", dir: "", base: "", ext: "", name: "" };
  if (path.length === 0) return ret;
  const isAbsolute = isPosixPathSeparator1(path.charCodeAt(0));
  let start;
  if (isAbsolute) {
    ret.root = "/";
    start = 1;
  } else start = 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;
  let preDotState = 0;
  for (; i >= start; --i) {
    const code = path.charCodeAt(i);
    if (isPosixPathSeparator1(code)) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) preDotState = -1;
  }
  if (
    startDot === -1 || end === -1 || preDotState === 0 ||
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1
  ) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute) {
        ret.base = ret.name = path.slice(1, end);
      } else ret.base = ret.name = path.slice(startPart, end);
    }
    ret.base = ret.base || "/";
  } else {
    if (startPart === 0 && isAbsolute) {
      ret.name = path.slice(1, startDot);
      ret.base = path.slice(1, end);
    } else {
      ret.name = path.slice(startPart, startDot);
      ret.base = path.slice(startPart, end);
    }
    ret.ext = path.slice(startDot, end);
  }
  if (startPart > 0) {
    ret.dir = stripTrailingSeparators(
      path.slice(0, startPart - 1),
      isPosixPathSeparator1,
    );
  } else if (isAbsolute) ret.dir = "/";
  return ret;
}
function resolve1(...pathSegments) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path;
    if (i >= 0) path = pathSegments[i];
    else {
      const { Deno: Deno1 } = globalThis;
      if (typeof Deno1?.cwd !== "function") {
        throw new TypeError("Resolved a relative path without a CWD.");
      }
      path = Deno1.cwd();
    }
    assertPath(path);
    if (path.length === 0) continue;
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isPosixPathSeparator1(path.charCodeAt(0));
  }
  resolvedPath = normalizeString(
    resolvedPath,
    !resolvedAbsolute,
    "/",
    isPosixPathSeparator1,
  );
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0) return `/${resolvedPath}`;
    else return "/";
  } else if (resolvedPath.length > 0) return resolvedPath;
  else return ".";
}
function relative1(from, to) {
  assertArgs1(from, to);
  from = resolve1(from);
  to = resolve1(to);
  if (from === to) return "";
  let fromStart = 1;
  const fromEnd = from.length;
  for (; fromStart < fromEnd; ++fromStart) {
    if (!isPosixPathSeparator1(from.charCodeAt(fromStart))) break;
  }
  const fromLen = fromEnd - fromStart;
  let toStart = 1;
  const toEnd = to.length;
  for (; toStart < toEnd; ++toStart) {
    if (!isPosixPathSeparator1(to.charCodeAt(toStart))) break;
  }
  const toLen = toEnd - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i <= length; ++i) {
    if (i === length) {
      if (toLen > length) {
        if (isPosixPathSeparator1(to.charCodeAt(toStart + i))) {
          return to.slice(toStart + i + 1);
        } else if (i === 0) return to.slice(toStart + i);
      } else if (fromLen > length) {
        if (isPosixPathSeparator1(from.charCodeAt(fromStart + i))) {
          lastCommonSep = i;
        } else if (i === 0) lastCommonSep = 0;
      }
      break;
    }
    const fromCode = from.charCodeAt(fromStart + i);
    const toCode = to.charCodeAt(toStart + i);
    if (fromCode !== toCode) break;
    else if (isPosixPathSeparator1(fromCode)) lastCommonSep = i;
  }
  let out = "";
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || isPosixPathSeparator1(from.charCodeAt(i))) {
      if (out.length === 0) out += "..";
      else out += "/..";
    }
  }
  if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
  else {
    toStart += lastCommonSep;
    if (isPosixPathSeparator1(to.charCodeAt(toStart))) ++toStart;
    return to.slice(toStart);
  }
}
function toFileUrl1(path) {
  if (!isAbsolute1(path)) throw new TypeError("Must be an absolute path.");
  const url = new URL("file:///");
  url.pathname = encodeWhitespace(
    path.replace(/%/g, "%25").replace(/\\/g, "%5C"),
  );
  return url;
}
function toNamespacedPath1(path) {
  return path;
}
const SEP1 = "/";
const SEP_PATTERN1 = /\/+/;
function common1(paths, sep = SEP1) {
  return _common(paths, sep);
}
const constants1 = {
  sep: "/+",
  sepMaybe: "/*",
  seps: ["/"],
  globstar: "(?:[^/]*(?:/|$)+)*",
  wildcard: "[^/]*",
  escapePrefix: "\\",
};
function globToRegExp1(glob, options = {}) {
  return _globToRegExp(constants1, glob, options);
}
function normalizeGlob1(glob, { globstar = false } = {}) {
  if (glob.match(/\0/g)) {
    throw new Error(`Glob contains invalid characters: "${glob}"`);
  }
  if (!globstar) return normalize1(glob);
  const s = SEP_PATTERN1.source;
  const badParentPattern = new RegExp(
    `(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`,
    "g",
  );
  return normalize1(glob.replace(badParentPattern, "\x00")).replace(
    /\0/g,
    "..",
  );
}
function joinGlobs1(globs, { extended = true, globstar = false } = {}) {
  if (!globstar || globs.length === 0) return join1(...globs);
  if (globs.length === 0) return ".";
  let joined;
  for (const glob of globs) {
    const path = glob;
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `${SEP1}${path}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob1(joined, { extended, globstar });
}
const sep1 = "/";
const delimiter1 = ":";
const mod1 = {
  sep: sep1,
  delimiter: delimiter1,
  basename: basename1,
  dirname: dirname1,
  extname: extname1,
  format: format1,
  fromFileUrl: fromFileUrl1,
  isAbsolute: isAbsolute1,
  join: join1,
  normalize: normalize1,
  parse: parse1,
  relative: relative1,
  resolve: resolve1,
  toFileUrl: toFileUrl1,
  toNamespacedPath: toNamespacedPath1,
  common: common1,
  SEP: SEP1,
  SEP_PATTERN: SEP_PATTERN1,
  globToRegExp: globToRegExp1,
  isGlob,
  joinGlobs: joinGlobs1,
  normalizeGlob: normalizeGlob1,
};
function dirname2(path) {
  return isWindows ? dirname(path) : dirname1(path);
}
function fromFileUrl2(url) {
  return isWindows ? fromFileUrl(url) : fromFileUrl1(url);
}
function parse2(path) {
  return isWindows ? parse(path) : parse1(path);
}
function resolve2(...pathSegments) {
  return isWindows ? resolve(...pathSegments) : resolve1(...pathSegments);
}
function toFileUrl2(path) {
  return isWindows ? toFileUrl(path) : toFileUrl1(path);
}
isWindows ? mod.sep : mod1.sep;
isWindows ? mod.delimiter : mod1.delimiter;
function getFileInfoType(fileInfo) {
  return fileInfo.isFile
    ? "file"
    : fileInfo.isDirectory
    ? "dir"
    : fileInfo.isSymlink
    ? "symlink"
    : undefined;
}
function toPathString(pathUrl) {
  return pathUrl instanceof URL ? fromFileUrl2(pathUrl) : pathUrl;
}
const { Deno: Deno1 } = globalThis;
const noColor = typeof Deno1?.noColor === "boolean" ? Deno1.noColor : false;
let enabled = !noColor;
function code(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run(str, code) {
  return enabled
    ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
    : str;
}
function bold(str) {
  return run(str, code([1], 22));
}
function red(str) {
  return run(str, code([31], 39));
}
function green(str) {
  return run(str, code([32], 39));
}
new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))",
  ].join("|"),
  "g",
);
function delay(ms, options = {}) {
  const { signal, persistent } = options;
  if (signal?.aborted) return Promise.reject(signal.reason);
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(i);
      reject(signal?.reason);
    };
    const done = () => {
      signal?.removeEventListener("abort", abort);
      resolve();
    };
    const i = setTimeout(done, ms);
    signal?.addEventListener("abort", abort, { once: true });
    if (persistent === false) {
      try {
        Deno.unrefTimer(i);
      } catch (error) {
        if (!(error instanceof ReferenceError)) throw error;
        console.error("`persistent` option is only available in Deno");
      }
    }
  });
}
const ERROR_SERVER_CLOSED = "Server closed";
const INITIAL_ACCEPT_BACKOFF_DELAY = 5;
const MAX_ACCEPT_BACKOFF_DELAY = 1e3;
class Server {
  #port;
  #host;
  #handler;
  #closed = false;
  #listeners = new Set();
  #acceptBackoffDelayAbortController = new AbortController();
  #httpConnections = new Set();
  #onError;
  constructor(serverInit) {
    this.#port = serverInit.port;
    this.#host = serverInit.hostname;
    this.#handler = serverInit.handler;
    this.#onError = serverInit.onError ?? function (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    };
  }
  async serve(listener) {
    if (this.#closed) throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
    this.#trackListener(listener);
    try {
      return await this.#accept(listener);
    } finally {
      this.#untrackListener(listener);
      try {
        listener.close();
      } catch {}
    }
  }
  async listenAndServe() {
    if (this.#closed) throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
    const listener = Deno.listen({
      port: this.#port ?? 80,
      hostname: this.#host ?? "0.0.0.0",
      transport: "tcp",
    });
    return await this.serve(listener);
  }
  async listenAndServeTls(certFile, keyFile) {
    if (this.#closed) throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
    const listener = Deno.listenTls({
      port: this.#port ?? 443,
      hostname: this.#host ?? "0.0.0.0",
      certFile,
      keyFile,
      transport: "tcp",
    });
    return await this.serve(listener);
  }
  close() {
    if (this.#closed) throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
    this.#closed = true;
    for (const listener of this.#listeners) {
      try {
        listener.close();
      } catch {}
    }
    this.#listeners.clear();
    this.#acceptBackoffDelayAbortController.abort();
    for (const httpConn of this.#httpConnections) this.#closeHttpConn(httpConn);
    this.#httpConnections.clear();
  }
  get closed() {
    return this.#closed;
  }
  get addrs() {
    return Array.from(this.#listeners).map((listener) => listener.addr);
  }
  async #respond(requestEvent, connInfo) {
    let response;
    try {
      response = await this.#handler(requestEvent.request, connInfo);
      if (response.bodyUsed && response.body !== null) {
        throw new TypeError("Response body already consumed.");
      }
    } catch (error) {
      response = await this.#onError(error);
    }
    try {
      await requestEvent.respondWith(response);
    } catch {}
  }
  async #serveHttp(httpConn, connInfo) {
    while (!this.#closed) {
      let requestEvent;
      try {
        requestEvent = await httpConn.nextRequest();
      } catch {
        break;
      }
      if (requestEvent === null) break;
      this.#respond(requestEvent, connInfo);
    }
    this.#closeHttpConn(httpConn);
  }
  async #accept(listener) {
    let acceptBackoffDelay;
    while (!this.#closed) {
      let conn;
      try {
        conn = await listener.accept();
      } catch (error) {
        if (
          error instanceof Deno.errors.BadResource ||
          error instanceof Deno.errors.InvalidData ||
          error instanceof Deno.errors.UnexpectedEof ||
          error instanceof Deno.errors.ConnectionReset ||
          error instanceof Deno.errors.NotConnected
        ) {
          if (!acceptBackoffDelay) {
            acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
          } else acceptBackoffDelay *= 2;
          if (acceptBackoffDelay >= 1e3) {
            acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
          }
          try {
            await delay(acceptBackoffDelay, {
              signal: this.#acceptBackoffDelayAbortController.signal,
            });
          } catch (err) {
            if (!(err instanceof DOMException && err.name === "AbortError")) {
              throw err;
            }
          }
          continue;
        }
        throw error;
      }
      acceptBackoffDelay = undefined;
      let httpConn;
      try {
        httpConn = Deno.serveHttp(conn);
      } catch {
        continue;
      }
      this.#trackHttpConnection(httpConn);
      const connInfo = {
        localAddr: conn.localAddr,
        remoteAddr: conn.remoteAddr,
      };
      this.#serveHttp(httpConn, connInfo);
    }
  }
  #closeHttpConn(httpConn) {
    this.#untrackHttpConnection(httpConn);
    try {
      httpConn.close();
    } catch {}
  }
  #trackListener(listener) {
    this.#listeners.add(listener);
  }
  #untrackListener(listener) {
    this.#listeners.delete(listener);
  }
  #trackHttpConnection(httpConn) {
    this.#httpConnections.add(httpConn);
  }
  #untrackHttpConnection(httpConn) {
    this.#httpConnections.delete(httpConn);
  }
}
var Status;
(function (Status) {
  Status[Status["Continue"] = 100] = "Continue";
  Status[Status["SwitchingProtocols"] = 101] = "SwitchingProtocols";
  Status[Status["Processing"] = 102] = "Processing";
  Status[Status["EarlyHints"] = 103] = "EarlyHints";
  Status[Status["OK"] = 200] = "OK";
  Status[Status["Created"] = 201] = "Created";
  Status[Status["Accepted"] = 202] = "Accepted";
  Status[Status["NonAuthoritativeInfo"] = 203] = "NonAuthoritativeInfo";
  Status[Status["NoContent"] = 204] = "NoContent";
  Status[Status["ResetContent"] = 205] = "ResetContent";
  Status[Status["PartialContent"] = 206] = "PartialContent";
  Status[Status["MultiStatus"] = 207] = "MultiStatus";
  Status[Status["AlreadyReported"] = 208] = "AlreadyReported";
  Status[Status["IMUsed"] = 226] = "IMUsed";
  Status[Status["MultipleChoices"] = 300] = "MultipleChoices";
  Status[Status["MovedPermanently"] = 301] = "MovedPermanently";
  Status[Status["Found"] = 302] = "Found";
  Status[Status["SeeOther"] = 303] = "SeeOther";
  Status[Status["NotModified"] = 304] = "NotModified";
  Status[Status["UseProxy"] = 305] = "UseProxy";
  Status[Status["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  Status[Status["PermanentRedirect"] = 308] = "PermanentRedirect";
  Status[Status["BadRequest"] = 400] = "BadRequest";
  Status[Status["Unauthorized"] = 401] = "Unauthorized";
  Status[Status["PaymentRequired"] = 402] = "PaymentRequired";
  Status[Status["Forbidden"] = 403] = "Forbidden";
  Status[Status["NotFound"] = 404] = "NotFound";
  Status[Status["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  Status[Status["NotAcceptable"] = 406] = "NotAcceptable";
  Status[Status["ProxyAuthRequired"] = 407] = "ProxyAuthRequired";
  Status[Status["RequestTimeout"] = 408] = "RequestTimeout";
  Status[Status["Conflict"] = 409] = "Conflict";
  Status[Status["Gone"] = 410] = "Gone";
  Status[Status["LengthRequired"] = 411] = "LengthRequired";
  Status[Status["PreconditionFailed"] = 412] = "PreconditionFailed";
  Status[Status["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
  Status[Status["RequestURITooLong"] = 414] = "RequestURITooLong";
  Status[Status["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  Status[Status["RequestedRangeNotSatisfiable"] = 416] =
    "RequestedRangeNotSatisfiable";
  Status[Status["ExpectationFailed"] = 417] = "ExpectationFailed";
  Status[Status["Teapot"] = 418] = "Teapot";
  Status[Status["MisdirectedRequest"] = 421] = "MisdirectedRequest";
  Status[Status["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  Status[Status["Locked"] = 423] = "Locked";
  Status[Status["FailedDependency"] = 424] = "FailedDependency";
  Status[Status["TooEarly"] = 425] = "TooEarly";
  Status[Status["UpgradeRequired"] = 426] = "UpgradeRequired";
  Status[Status["PreconditionRequired"] = 428] = "PreconditionRequired";
  Status[Status["TooManyRequests"] = 429] = "TooManyRequests";
  Status[Status["RequestHeaderFieldsTooLarge"] = 431] =
    "RequestHeaderFieldsTooLarge";
  Status[Status["UnavailableForLegalReasons"] = 451] =
    "UnavailableForLegalReasons";
  Status[Status["InternalServerError"] = 500] = "InternalServerError";
  Status[Status["NotImplemented"] = 501] = "NotImplemented";
  Status[Status["BadGateway"] = 502] = "BadGateway";
  Status[Status["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  Status[Status["GatewayTimeout"] = 504] = "GatewayTimeout";
  Status[Status["HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
  Status[Status["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
  Status[Status["InsufficientStorage"] = 507] = "InsufficientStorage";
  Status[Status["LoopDetected"] = 508] = "LoopDetected";
  Status[Status["NotExtended"] = 510] = "NotExtended";
  Status[Status["NetworkAuthenticationRequired"] = 511] =
    "NetworkAuthenticationRequired";
})(Status || (Status = {}));
const STATUS_CODE = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInfo: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  IMUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  ContentTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  Teapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
({
  [STATUS_CODE.Accepted]: "Accepted",
  [STATUS_CODE.AlreadyReported]: "Already Reported",
  [STATUS_CODE.BadGateway]: "Bad Gateway",
  [STATUS_CODE.BadRequest]: "Bad Request",
  [STATUS_CODE.Conflict]: "Conflict",
  [STATUS_CODE.Continue]: "Continue",
  [STATUS_CODE.Created]: "Created",
  [STATUS_CODE.EarlyHints]: "Early Hints",
  [STATUS_CODE.ExpectationFailed]: "Expectation Failed",
  [STATUS_CODE.FailedDependency]: "Failed Dependency",
  [STATUS_CODE.Forbidden]: "Forbidden",
  [STATUS_CODE.Found]: "Found",
  [STATUS_CODE.GatewayTimeout]: "Gateway Timeout",
  [STATUS_CODE.Gone]: "Gone",
  [STATUS_CODE.HTTPVersionNotSupported]: "HTTP Version Not Supported",
  [STATUS_CODE.IMUsed]: "IM Used",
  [STATUS_CODE.InsufficientStorage]: "Insufficient Storage",
  [STATUS_CODE.InternalServerError]: "Internal Server Error",
  [STATUS_CODE.LengthRequired]: "Length Required",
  [STATUS_CODE.Locked]: "Locked",
  [STATUS_CODE.LoopDetected]: "Loop Detected",
  [STATUS_CODE.MethodNotAllowed]: "Method Not Allowed",
  [STATUS_CODE.MisdirectedRequest]: "Misdirected Request",
  [STATUS_CODE.MovedPermanently]: "Moved Permanently",
  [STATUS_CODE.MultiStatus]: "Multi Status",
  [STATUS_CODE.MultipleChoices]: "Multiple Choices",
  [STATUS_CODE.NetworkAuthenticationRequired]:
    "Network Authentication Required",
  [STATUS_CODE.NoContent]: "No Content",
  [STATUS_CODE.NonAuthoritativeInfo]: "Non Authoritative Info",
  [STATUS_CODE.NotAcceptable]: "Not Acceptable",
  [STATUS_CODE.NotExtended]: "Not Extended",
  [STATUS_CODE.NotFound]: "Not Found",
  [STATUS_CODE.NotImplemented]: "Not Implemented",
  [STATUS_CODE.NotModified]: "Not Modified",
  [STATUS_CODE.OK]: "OK",
  [STATUS_CODE.PartialContent]: "Partial Content",
  [STATUS_CODE.PaymentRequired]: "Payment Required",
  [STATUS_CODE.PermanentRedirect]: "Permanent Redirect",
  [STATUS_CODE.PreconditionFailed]: "Precondition Failed",
  [STATUS_CODE.PreconditionRequired]: "Precondition Required",
  [STATUS_CODE.Processing]: "Processing",
  [STATUS_CODE.ProxyAuthRequired]: "Proxy Auth Required",
  [STATUS_CODE.ContentTooLarge]: "Content Too Large",
  [STATUS_CODE.RequestHeaderFieldsTooLarge]: "Request Header Fields Too Large",
  [STATUS_CODE.RequestTimeout]: "Request Timeout",
  [STATUS_CODE.URITooLong]: "URI Too Long",
  [STATUS_CODE.RangeNotSatisfiable]: "Range Not Satisfiable",
  [STATUS_CODE.ResetContent]: "Reset Content",
  [STATUS_CODE.SeeOther]: "See Other",
  [STATUS_CODE.ServiceUnavailable]: "Service Unavailable",
  [STATUS_CODE.SwitchingProtocols]: "Switching Protocols",
  [STATUS_CODE.Teapot]: "I'm a teapot",
  [STATUS_CODE.TemporaryRedirect]: "Temporary Redirect",
  [STATUS_CODE.TooEarly]: "Too Early",
  [STATUS_CODE.TooManyRequests]: "Too Many Requests",
  [STATUS_CODE.Unauthorized]: "Unauthorized",
  [STATUS_CODE.UnavailableForLegalReasons]: "Unavailable For Legal Reasons",
  [STATUS_CODE.UnprocessableEntity]: "Unprocessable Entity",
  [STATUS_CODE.UnsupportedMediaType]: "Unsupported Media Type",
  [STATUS_CODE.UpgradeRequired]: "Upgrade Required",
  [STATUS_CODE.UseProxy]: "Use Proxy",
  [STATUS_CODE.VariantAlsoNegotiates]: "Variant Also Negotiates",
});
const extensions = new Map();
const __default = {
  "application/1d-interleaved-parityfec": { "source": "iana" },
  "application/3gpdash-qoe-report+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/3gpp-ims+xml": { "source": "iana", "compressible": true },
  "application/3gpphal+json": { "source": "iana", "compressible": true },
  "application/3gpphalforms+json": { "source": "iana", "compressible": true },
  "application/a2l": { "source": "iana" },
  "application/ace+cbor": { "source": "iana" },
  "application/activemessage": { "source": "iana" },
  "application/activity+json": { "source": "iana", "compressible": true },
  "application/alto-costmap+json": { "source": "iana", "compressible": true },
  "application/alto-costmapfilter+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-directory+json": { "source": "iana", "compressible": true },
  "application/alto-endpointcost+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-endpointcostparams+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-endpointprop+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-endpointpropparams+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-error+json": { "source": "iana", "compressible": true },
  "application/alto-networkmap+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-networkmapfilter+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-updatestreamcontrol+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/alto-updatestreamparams+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/aml": { "source": "iana" },
  "application/andrew-inset": { "source": "iana", "extensions": ["ez"] },
  "application/applefile": { "source": "iana" },
  "application/applixware": { "source": "apache", "extensions": ["aw"] },
  "application/at+jwt": { "source": "iana" },
  "application/atf": { "source": "iana" },
  "application/atfx": { "source": "iana" },
  "application/atom+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atom"],
  },
  "application/atomcat+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atomcat"],
  },
  "application/atomdeleted+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atomdeleted"],
  },
  "application/atomicmail": { "source": "iana" },
  "application/atomsvc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["atomsvc"],
  },
  "application/atsc-dwd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dwd"],
  },
  "application/atsc-dynamic-event-message": { "source": "iana" },
  "application/atsc-held+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["held"],
  },
  "application/atsc-rdt+json": { "source": "iana", "compressible": true },
  "application/atsc-rsat+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rsat"],
  },
  "application/atxml": { "source": "iana" },
  "application/auth-policy+xml": { "source": "iana", "compressible": true },
  "application/bacnet-xdd+zip": { "source": "iana", "compressible": false },
  "application/batch-smtp": { "source": "iana" },
  "application/bdoc": { "compressible": false, "extensions": ["bdoc"] },
  "application/beep+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/calendar+json": { "source": "iana", "compressible": true },
  "application/calendar+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xcs"],
  },
  "application/call-completion": { "source": "iana" },
  "application/cals-1840": { "source": "iana" },
  "application/captive+json": { "source": "iana", "compressible": true },
  "application/cbor": { "source": "iana" },
  "application/cbor-seq": { "source": "iana" },
  "application/cccex": { "source": "iana" },
  "application/ccmp+xml": { "source": "iana", "compressible": true },
  "application/ccxml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ccxml"],
  },
  "application/cdfx+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["cdfx"],
  },
  "application/cdmi-capability": { "source": "iana", "extensions": ["cdmia"] },
  "application/cdmi-container": { "source": "iana", "extensions": ["cdmic"] },
  "application/cdmi-domain": { "source": "iana", "extensions": ["cdmid"] },
  "application/cdmi-object": { "source": "iana", "extensions": ["cdmio"] },
  "application/cdmi-queue": { "source": "iana", "extensions": ["cdmiq"] },
  "application/cdni": { "source": "iana" },
  "application/cea": { "source": "iana" },
  "application/cea-2018+xml": { "source": "iana", "compressible": true },
  "application/cellml+xml": { "source": "iana", "compressible": true },
  "application/cfw": { "source": "iana" },
  "application/city+json": { "source": "iana", "compressible": true },
  "application/clr": { "source": "iana" },
  "application/clue+xml": { "source": "iana", "compressible": true },
  "application/clue_info+xml": { "source": "iana", "compressible": true },
  "application/cms": { "source": "iana" },
  "application/cnrp+xml": { "source": "iana", "compressible": true },
  "application/coap-group+json": { "source": "iana", "compressible": true },
  "application/coap-payload": { "source": "iana" },
  "application/commonground": { "source": "iana" },
  "application/conference-info+xml": { "source": "iana", "compressible": true },
  "application/cose": { "source": "iana" },
  "application/cose-key": { "source": "iana" },
  "application/cose-key-set": { "source": "iana" },
  "application/cpl+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["cpl"],
  },
  "application/csrattrs": { "source": "iana" },
  "application/csta+xml": { "source": "iana", "compressible": true },
  "application/cstadata+xml": { "source": "iana", "compressible": true },
  "application/csvm+json": { "source": "iana", "compressible": true },
  "application/cu-seeme": { "source": "apache", "extensions": ["cu"] },
  "application/cwt": { "source": "iana" },
  "application/cybercash": { "source": "iana" },
  "application/dart": { "compressible": true },
  "application/dash+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpd"],
  },
  "application/dash-patch+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpp"],
  },
  "application/dashdelta": { "source": "iana" },
  "application/davmount+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["davmount"],
  },
  "application/dca-rft": { "source": "iana" },
  "application/dcd": { "source": "iana" },
  "application/dec-dx": { "source": "iana" },
  "application/dialog-info+xml": { "source": "iana", "compressible": true },
  "application/dicom": { "source": "iana" },
  "application/dicom+json": { "source": "iana", "compressible": true },
  "application/dicom+xml": { "source": "iana", "compressible": true },
  "application/dii": { "source": "iana" },
  "application/dit": { "source": "iana" },
  "application/dns": { "source": "iana" },
  "application/dns+json": { "source": "iana", "compressible": true },
  "application/dns-message": { "source": "iana" },
  "application/docbook+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["dbk"],
  },
  "application/dots+cbor": { "source": "iana" },
  "application/dskpp+xml": { "source": "iana", "compressible": true },
  "application/dssc+der": { "source": "iana", "extensions": ["dssc"] },
  "application/dssc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xdssc"],
  },
  "application/dvcs": { "source": "iana" },
  "application/ecmascript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["es", "ecma"],
  },
  "application/edi-consent": { "source": "iana" },
  "application/edi-x12": { "source": "iana", "compressible": false },
  "application/edifact": { "source": "iana", "compressible": false },
  "application/efi": { "source": "iana" },
  "application/elm+json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/elm+xml": { "source": "iana", "compressible": true },
  "application/emergencycalldata.cap+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/emergencycalldata.comment+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emergencycalldata.control+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emergencycalldata.deviceinfo+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emergencycalldata.ecall.msd": { "source": "iana" },
  "application/emergencycalldata.providerinfo+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emergencycalldata.serviceinfo+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emergencycalldata.veds+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/emma+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["emma"],
  },
  "application/emotionml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["emotionml"],
  },
  "application/encaprtp": { "source": "iana" },
  "application/epp+xml": { "source": "iana", "compressible": true },
  "application/epub+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["epub"],
  },
  "application/eshop": { "source": "iana" },
  "application/exi": { "source": "iana", "extensions": ["exi"] },
  "application/expect-ct-report+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/express": { "source": "iana", "extensions": ["exp"] },
  "application/fastinfoset": { "source": "iana" },
  "application/fastsoap": { "source": "iana" },
  "application/fdt+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["fdt"],
  },
  "application/fhir+json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/fhir+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/fido.trusted-apps+json": { "compressible": true },
  "application/fits": { "source": "iana" },
  "application/flexfec": { "source": "iana" },
  "application/font-sfnt": { "source": "iana" },
  "application/font-tdpfr": { "source": "iana", "extensions": ["pfr"] },
  "application/font-woff": { "source": "iana", "compressible": false },
  "application/framework-attributes+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/geo+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["geojson"],
  },
  "application/geo+json-seq": { "source": "iana" },
  "application/geopackage+sqlite3": { "source": "iana" },
  "application/geoxacml+xml": { "source": "iana", "compressible": true },
  "application/gltf-buffer": { "source": "iana" },
  "application/gml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["gml"],
  },
  "application/gpx+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["gpx"],
  },
  "application/gxf": { "source": "apache", "extensions": ["gxf"] },
  "application/gzip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gz"],
  },
  "application/h224": { "source": "iana" },
  "application/held+xml": { "source": "iana", "compressible": true },
  "application/hjson": { "extensions": ["hjson"] },
  "application/http": { "source": "iana" },
  "application/hyperstudio": { "source": "iana", "extensions": ["stk"] },
  "application/ibe-key-request+xml": { "source": "iana", "compressible": true },
  "application/ibe-pkg-reply+xml": { "source": "iana", "compressible": true },
  "application/ibe-pp-data": { "source": "iana" },
  "application/iges": { "source": "iana" },
  "application/im-iscomposing+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/index": { "source": "iana" },
  "application/index.cmd": { "source": "iana" },
  "application/index.obj": { "source": "iana" },
  "application/index.response": { "source": "iana" },
  "application/index.vnd": { "source": "iana" },
  "application/inkml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ink", "inkml"],
  },
  "application/iotp": { "source": "iana" },
  "application/ipfix": { "source": "iana", "extensions": ["ipfix"] },
  "application/ipp": { "source": "iana" },
  "application/isup": { "source": "iana" },
  "application/its+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["its"],
  },
  "application/java-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jar", "war", "ear"],
  },
  "application/java-serialized-object": {
    "source": "apache",
    "compressible": false,
    "extensions": ["ser"],
  },
  "application/java-vm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["class"],
  },
  "application/javascript": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["js", "mjs"],
  },
  "application/jf2feed+json": { "source": "iana", "compressible": true },
  "application/jose": { "source": "iana" },
  "application/jose+json": { "source": "iana", "compressible": true },
  "application/jrd+json": { "source": "iana", "compressible": true },
  "application/jscalendar+json": { "source": "iana", "compressible": true },
  "application/json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["json", "map"],
  },
  "application/json-patch+json": { "source": "iana", "compressible": true },
  "application/json-seq": { "source": "iana" },
  "application/json5": { "extensions": ["json5"] },
  "application/jsonml+json": {
    "source": "apache",
    "compressible": true,
    "extensions": ["jsonml"],
  },
  "application/jwk+json": { "source": "iana", "compressible": true },
  "application/jwk-set+json": { "source": "iana", "compressible": true },
  "application/jwt": { "source": "iana" },
  "application/kpml-request+xml": { "source": "iana", "compressible": true },
  "application/kpml-response+xml": { "source": "iana", "compressible": true },
  "application/ld+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["jsonld"],
  },
  "application/lgr+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lgr"],
  },
  "application/link-format": { "source": "iana" },
  "application/load-control+xml": { "source": "iana", "compressible": true },
  "application/lost+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lostxml"],
  },
  "application/lostsync+xml": { "source": "iana", "compressible": true },
  "application/lpf+zip": { "source": "iana", "compressible": false },
  "application/lxf": { "source": "iana" },
  "application/mac-binhex40": { "source": "iana", "extensions": ["hqx"] },
  "application/mac-compactpro": { "source": "apache", "extensions": ["cpt"] },
  "application/macwriteii": { "source": "iana" },
  "application/mads+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mads"],
  },
  "application/manifest+json": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["webmanifest"],
  },
  "application/marc": { "source": "iana", "extensions": ["mrc"] },
  "application/marcxml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mrcx"],
  },
  "application/mathematica": {
    "source": "iana",
    "extensions": ["ma", "nb", "mb"],
  },
  "application/mathml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mathml"],
  },
  "application/mathml-content+xml": { "source": "iana", "compressible": true },
  "application/mathml-presentation+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbms-associated-procedure-description+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbms-deregister+xml": { "source": "iana", "compressible": true },
  "application/mbms-envelope+xml": { "source": "iana", "compressible": true },
  "application/mbms-msk+xml": { "source": "iana", "compressible": true },
  "application/mbms-msk-response+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbms-protection-description+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbms-reception-report+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbms-register+xml": { "source": "iana", "compressible": true },
  "application/mbms-register-response+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbms-schedule+xml": { "source": "iana", "compressible": true },
  "application/mbms-user-service-description+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/mbox": { "source": "iana", "extensions": ["mbox"] },
  "application/media-policy-dataset+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpf"],
  },
  "application/media_control+xml": { "source": "iana", "compressible": true },
  "application/mediaservercontrol+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mscml"],
  },
  "application/merge-patch+json": { "source": "iana", "compressible": true },
  "application/metalink+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["metalink"],
  },
  "application/metalink4+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["meta4"],
  },
  "application/mets+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mets"],
  },
  "application/mf4": { "source": "iana" },
  "application/mikey": { "source": "iana" },
  "application/mipc": { "source": "iana" },
  "application/missing-blocks+cbor-seq": { "source": "iana" },
  "application/mmt-aei+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["maei"],
  },
  "application/mmt-usd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["musd"],
  },
  "application/mods+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mods"],
  },
  "application/moss-keys": { "source": "iana" },
  "application/moss-signature": { "source": "iana" },
  "application/mosskey-data": { "source": "iana" },
  "application/mosskey-request": { "source": "iana" },
  "application/mp21": { "source": "iana", "extensions": ["m21", "mp21"] },
  "application/mp4": { "source": "iana", "extensions": ["mp4s", "m4p"] },
  "application/mpeg4-generic": { "source": "iana" },
  "application/mpeg4-iod": { "source": "iana" },
  "application/mpeg4-iod-xmt": { "source": "iana" },
  "application/mrb-consumer+xml": { "source": "iana", "compressible": true },
  "application/mrb-publish+xml": { "source": "iana", "compressible": true },
  "application/msc-ivr+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/msc-mixer+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/msword": {
    "source": "iana",
    "compressible": false,
    "extensions": ["doc", "dot"],
  },
  "application/mud+json": { "source": "iana", "compressible": true },
  "application/multipart-core": { "source": "iana" },
  "application/mxf": { "source": "iana", "extensions": ["mxf"] },
  "application/n-quads": { "source": "iana", "extensions": ["nq"] },
  "application/n-triples": { "source": "iana", "extensions": ["nt"] },
  "application/nasdata": { "source": "iana" },
  "application/news-checkgroups": { "source": "iana", "charset": "US-ASCII" },
  "application/news-groupinfo": { "source": "iana", "charset": "US-ASCII" },
  "application/news-transmission": { "source": "iana" },
  "application/nlsml+xml": { "source": "iana", "compressible": true },
  "application/node": { "source": "iana", "extensions": ["cjs"] },
  "application/nss": { "source": "iana" },
  "application/oauth-authz-req+jwt": { "source": "iana" },
  "application/oblivious-dns-message": { "source": "iana" },
  "application/ocsp-request": { "source": "iana" },
  "application/ocsp-response": { "source": "iana" },
  "application/octet-stream": {
    "source": "iana",
    "compressible": false,
    "extensions": [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer",
    ],
  },
  "application/oda": { "source": "iana", "extensions": ["oda"] },
  "application/odm+xml": { "source": "iana", "compressible": true },
  "application/odx": { "source": "iana" },
  "application/oebps-package+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["opf"],
  },
  "application/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogx"],
  },
  "application/omdoc+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["omdoc"],
  },
  "application/onenote": {
    "source": "apache",
    "extensions": ["onetoc", "onetoc2", "onetmp", "onepkg"],
  },
  "application/opc-nodeset+xml": { "source": "iana", "compressible": true },
  "application/oscore": { "source": "iana" },
  "application/oxps": { "source": "iana", "extensions": ["oxps"] },
  "application/p21": { "source": "iana" },
  "application/p21+zip": { "source": "iana", "compressible": false },
  "application/p2p-overlay+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["relo"],
  },
  "application/parityfec": { "source": "iana" },
  "application/passport": { "source": "iana" },
  "application/patch-ops-error+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xer"],
  },
  "application/pdf": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pdf"],
  },
  "application/pdx": { "source": "iana" },
  "application/pem-certificate-chain": { "source": "iana" },
  "application/pgp-encrypted": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pgp"],
  },
  "application/pgp-keys": { "source": "iana", "extensions": ["asc"] },
  "application/pgp-signature": {
    "source": "iana",
    "extensions": ["asc", "sig"],
  },
  "application/pics-rules": { "source": "apache", "extensions": ["prf"] },
  "application/pidf+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/pidf-diff+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/pkcs10": { "source": "iana", "extensions": ["p10"] },
  "application/pkcs12": { "source": "iana" },
  "application/pkcs7-mime": { "source": "iana", "extensions": ["p7m", "p7c"] },
  "application/pkcs7-signature": { "source": "iana", "extensions": ["p7s"] },
  "application/pkcs8": { "source": "iana", "extensions": ["p8"] },
  "application/pkcs8-encrypted": { "source": "iana" },
  "application/pkix-attr-cert": { "source": "iana", "extensions": ["ac"] },
  "application/pkix-cert": { "source": "iana", "extensions": ["cer"] },
  "application/pkix-crl": { "source": "iana", "extensions": ["crl"] },
  "application/pkix-pkipath": { "source": "iana", "extensions": ["pkipath"] },
  "application/pkixcmp": { "source": "iana", "extensions": ["pki"] },
  "application/pls+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["pls"],
  },
  "application/poc-settings+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/postscript": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ai", "eps", "ps"],
  },
  "application/ppsp-tracker+json": { "source": "iana", "compressible": true },
  "application/problem+json": { "source": "iana", "compressible": true },
  "application/problem+xml": { "source": "iana", "compressible": true },
  "application/provenance+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["provx"],
  },
  "application/prs.alvestrand.titrax-sheet": { "source": "iana" },
  "application/prs.cww": { "source": "iana", "extensions": ["cww"] },
  "application/prs.cyn": { "source": "iana", "charset": "7-BIT" },
  "application/prs.hpub+zip": { "source": "iana", "compressible": false },
  "application/prs.nprend": { "source": "iana" },
  "application/prs.plucker": { "source": "iana" },
  "application/prs.rdf-xml-crypt": { "source": "iana" },
  "application/prs.xsf+xml": { "source": "iana", "compressible": true },
  "application/pskc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["pskcxml"],
  },
  "application/pvd+json": { "source": "iana", "compressible": true },
  "application/qsig": { "source": "iana" },
  "application/raml+yaml": { "compressible": true, "extensions": ["raml"] },
  "application/raptorfec": { "source": "iana" },
  "application/rdap+json": { "source": "iana", "compressible": true },
  "application/rdf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rdf", "owl"],
  },
  "application/reginfo+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rif"],
  },
  "application/relax-ng-compact-syntax": {
    "source": "iana",
    "extensions": ["rnc"],
  },
  "application/remote-printing": { "source": "iana" },
  "application/reputon+json": { "source": "iana", "compressible": true },
  "application/resource-lists+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rl"],
  },
  "application/resource-lists-diff+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rld"],
  },
  "application/rfc+xml": { "source": "iana", "compressible": true },
  "application/riscos": { "source": "iana" },
  "application/rlmi+xml": { "source": "iana", "compressible": true },
  "application/rls-services+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rs"],
  },
  "application/route-apd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rapd"],
  },
  "application/route-s-tsid+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sls"],
  },
  "application/route-usd+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rusd"],
  },
  "application/rpki-ghostbusters": { "source": "iana", "extensions": ["gbr"] },
  "application/rpki-manifest": { "source": "iana", "extensions": ["mft"] },
  "application/rpki-publication": { "source": "iana" },
  "application/rpki-roa": { "source": "iana", "extensions": ["roa"] },
  "application/rpki-updown": { "source": "iana" },
  "application/rsd+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rsd"],
  },
  "application/rss+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["rss"],
  },
  "application/rtf": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtf"],
  },
  "application/rtploopback": { "source": "iana" },
  "application/rtx": { "source": "iana" },
  "application/samlassertion+xml": { "source": "iana", "compressible": true },
  "application/samlmetadata+xml": { "source": "iana", "compressible": true },
  "application/sarif+json": { "source": "iana", "compressible": true },
  "application/sarif-external-properties+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/sbe": { "source": "iana" },
  "application/sbml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sbml"],
  },
  "application/scaip+xml": { "source": "iana", "compressible": true },
  "application/scim+json": { "source": "iana", "compressible": true },
  "application/scvp-cv-request": { "source": "iana", "extensions": ["scq"] },
  "application/scvp-cv-response": { "source": "iana", "extensions": ["scs"] },
  "application/scvp-vp-request": { "source": "iana", "extensions": ["spq"] },
  "application/scvp-vp-response": { "source": "iana", "extensions": ["spp"] },
  "application/sdp": { "source": "iana", "extensions": ["sdp"] },
  "application/secevent+jwt": { "source": "iana" },
  "application/senml+cbor": { "source": "iana" },
  "application/senml+json": { "source": "iana", "compressible": true },
  "application/senml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["senmlx"],
  },
  "application/senml-etch+cbor": { "source": "iana" },
  "application/senml-etch+json": { "source": "iana", "compressible": true },
  "application/senml-exi": { "source": "iana" },
  "application/sensml+cbor": { "source": "iana" },
  "application/sensml+json": { "source": "iana", "compressible": true },
  "application/sensml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sensmlx"],
  },
  "application/sensml-exi": { "source": "iana" },
  "application/sep+xml": { "source": "iana", "compressible": true },
  "application/sep-exi": { "source": "iana" },
  "application/session-info": { "source": "iana" },
  "application/set-payment": { "source": "iana" },
  "application/set-payment-initiation": {
    "source": "iana",
    "extensions": ["setpay"],
  },
  "application/set-registration": { "source": "iana" },
  "application/set-registration-initiation": {
    "source": "iana",
    "extensions": ["setreg"],
  },
  "application/sgml": { "source": "iana" },
  "application/sgml-open-catalog": { "source": "iana" },
  "application/shf+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["shf"],
  },
  "application/sieve": { "source": "iana", "extensions": ["siv", "sieve"] },
  "application/simple-filter+xml": { "source": "iana", "compressible": true },
  "application/simple-message-summary": { "source": "iana" },
  "application/simplesymbolcontainer": { "source": "iana" },
  "application/sipc": { "source": "iana" },
  "application/slate": { "source": "iana" },
  "application/smil": { "source": "iana" },
  "application/smil+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["smi", "smil"],
  },
  "application/smpte336m": { "source": "iana" },
  "application/soap+fastinfoset": { "source": "iana" },
  "application/soap+xml": { "source": "iana", "compressible": true },
  "application/sparql-query": { "source": "iana", "extensions": ["rq"] },
  "application/sparql-results+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["srx"],
  },
  "application/spdx+json": { "source": "iana", "compressible": true },
  "application/spirits-event+xml": { "source": "iana", "compressible": true },
  "application/sql": { "source": "iana" },
  "application/srgs": { "source": "iana", "extensions": ["gram"] },
  "application/srgs+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["grxml"],
  },
  "application/sru+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sru"],
  },
  "application/ssdl+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ssdl"],
  },
  "application/ssml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ssml"],
  },
  "application/stix+json": { "source": "iana", "compressible": true },
  "application/swid+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["swidtag"],
  },
  "application/tamp-apex-update": { "source": "iana" },
  "application/tamp-apex-update-confirm": { "source": "iana" },
  "application/tamp-community-update": { "source": "iana" },
  "application/tamp-community-update-confirm": { "source": "iana" },
  "application/tamp-error": { "source": "iana" },
  "application/tamp-sequence-adjust": { "source": "iana" },
  "application/tamp-sequence-adjust-confirm": { "source": "iana" },
  "application/tamp-status-query": { "source": "iana" },
  "application/tamp-status-response": { "source": "iana" },
  "application/tamp-update": { "source": "iana" },
  "application/tamp-update-confirm": { "source": "iana" },
  "application/tar": { "compressible": true },
  "application/taxii+json": { "source": "iana", "compressible": true },
  "application/td+json": { "source": "iana", "compressible": true },
  "application/tei+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tei", "teicorpus"],
  },
  "application/tetra_isi": { "source": "iana" },
  "application/thraud+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tfi"],
  },
  "application/timestamp-query": { "source": "iana" },
  "application/timestamp-reply": { "source": "iana" },
  "application/timestamped-data": { "source": "iana", "extensions": ["tsd"] },
  "application/tlsrpt+gzip": { "source": "iana" },
  "application/tlsrpt+json": { "source": "iana", "compressible": true },
  "application/tnauthlist": { "source": "iana" },
  "application/token-introspection+jwt": { "source": "iana" },
  "application/toml": { "compressible": true, "extensions": ["toml"] },
  "application/trickle-ice-sdpfrag": { "source": "iana" },
  "application/trig": { "source": "iana", "extensions": ["trig"] },
  "application/ttml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ttml"],
  },
  "application/tve-trigger": { "source": "iana" },
  "application/tzif": { "source": "iana" },
  "application/tzif-leap": { "source": "iana" },
  "application/ubjson": { "compressible": false, "extensions": ["ubj"] },
  "application/ulpfec": { "source": "iana" },
  "application/urc-grpsheet+xml": { "source": "iana", "compressible": true },
  "application/urc-ressheet+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rsheet"],
  },
  "application/urc-targetdesc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["td"],
  },
  "application/urc-uisocketdesc+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vcard+json": { "source": "iana", "compressible": true },
  "application/vcard+xml": { "source": "iana", "compressible": true },
  "application/vemmi": { "source": "iana" },
  "application/vividence.scriptfile": { "source": "apache" },
  "application/vnd.1000minds.decision-model+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["1km"],
  },
  "application/vnd.3gpp-prose+xml": { "source": "iana", "compressible": true },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp-v2x-local-service-information": { "source": "iana" },
  "application/vnd.3gpp.5gnas": { "source": "iana" },
  "application/vnd.3gpp.access-transfer-events+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.bsf+xml": { "source": "iana", "compressible": true },
  "application/vnd.3gpp.gmop+xml": { "source": "iana", "compressible": true },
  "application/vnd.3gpp.gtpc": { "source": "iana" },
  "application/vnd.3gpp.interworking-data": { "source": "iana" },
  "application/vnd.3gpp.lpp": { "source": "iana" },
  "application/vnd.3gpp.mc-signalling-ear": { "source": "iana" },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcdata-payload": { "source": "iana" },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcdata-signalling": { "source": "iana" },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.mid-call+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.ngap": { "source": "iana" },
  "application/vnd.3gpp.pfcp": { "source": "iana" },
  "application/vnd.3gpp.pic-bw-large": {
    "source": "iana",
    "extensions": ["plb"],
  },
  "application/vnd.3gpp.pic-bw-small": {
    "source": "iana",
    "extensions": ["psb"],
  },
  "application/vnd.3gpp.pic-bw-var": {
    "source": "iana",
    "extensions": ["pvb"],
  },
  "application/vnd.3gpp.s1ap": { "source": "iana" },
  "application/vnd.3gpp.sms": { "source": "iana" },
  "application/vnd.3gpp.sms+xml": { "source": "iana", "compressible": true },
  "application/vnd.3gpp.srvcc-ext+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp.ussd+xml": { "source": "iana", "compressible": true },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.3gpp2.sms": { "source": "iana" },
  "application/vnd.3gpp2.tcap": { "source": "iana", "extensions": ["tcap"] },
  "application/vnd.3lightssoftware.imagescal": { "source": "iana" },
  "application/vnd.3m.post-it-notes": {
    "source": "iana",
    "extensions": ["pwn"],
  },
  "application/vnd.accpac.simply.aso": {
    "source": "iana",
    "extensions": ["aso"],
  },
  "application/vnd.accpac.simply.imp": {
    "source": "iana",
    "extensions": ["imp"],
  },
  "application/vnd.acucobol": { "source": "iana", "extensions": ["acu"] },
  "application/vnd.acucorp": {
    "source": "iana",
    "extensions": ["atc", "acutc"],
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["air"],
  },
  "application/vnd.adobe.flash.movie": { "source": "iana" },
  "application/vnd.adobe.formscentral.fcdt": {
    "source": "iana",
    "extensions": ["fcdt"],
  },
  "application/vnd.adobe.fxp": {
    "source": "iana",
    "extensions": ["fxp", "fxpl"],
  },
  "application/vnd.adobe.partial-upload": { "source": "iana" },
  "application/vnd.adobe.xdp+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xdp"],
  },
  "application/vnd.adobe.xfdf": { "source": "iana", "extensions": ["xfdf"] },
  "application/vnd.aether.imp": { "source": "iana" },
  "application/vnd.afpc.afplinedata": { "source": "iana" },
  "application/vnd.afpc.afplinedata-pagedef": { "source": "iana" },
  "application/vnd.afpc.cmoca-cmresource": { "source": "iana" },
  "application/vnd.afpc.foca-charset": { "source": "iana" },
  "application/vnd.afpc.foca-codedfont": { "source": "iana" },
  "application/vnd.afpc.foca-codepage": { "source": "iana" },
  "application/vnd.afpc.modca": { "source": "iana" },
  "application/vnd.afpc.modca-cmtable": { "source": "iana" },
  "application/vnd.afpc.modca-formdef": { "source": "iana" },
  "application/vnd.afpc.modca-mediummap": { "source": "iana" },
  "application/vnd.afpc.modca-objectcontainer": { "source": "iana" },
  "application/vnd.afpc.modca-overlay": { "source": "iana" },
  "application/vnd.afpc.modca-pagesegment": { "source": "iana" },
  "application/vnd.age": { "source": "iana", "extensions": ["age"] },
  "application/vnd.ah-barcode": { "source": "iana" },
  "application/vnd.ahead.space": { "source": "iana", "extensions": ["ahead"] },
  "application/vnd.airzip.filesecure.azf": {
    "source": "iana",
    "extensions": ["azf"],
  },
  "application/vnd.airzip.filesecure.azs": {
    "source": "iana",
    "extensions": ["azs"],
  },
  "application/vnd.amadeus+json": { "source": "iana", "compressible": true },
  "application/vnd.amazon.ebook": { "source": "apache", "extensions": ["azw"] },
  "application/vnd.amazon.mobi8-ebook": { "source": "iana" },
  "application/vnd.americandynamics.acc": {
    "source": "iana",
    "extensions": ["acc"],
  },
  "application/vnd.amiga.ami": { "source": "iana", "extensions": ["ami"] },
  "application/vnd.amundsen.maze+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.android.ota": { "source": "iana" },
  "application/vnd.android.package-archive": {
    "source": "apache",
    "compressible": false,
    "extensions": ["apk"],
  },
  "application/vnd.anki": { "source": "iana" },
  "application/vnd.anser-web-certificate-issue-initiation": {
    "source": "iana",
    "extensions": ["cii"],
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    "source": "apache",
    "extensions": ["fti"],
  },
  "application/vnd.antix.game-component": {
    "source": "iana",
    "extensions": ["atx"],
  },
  "application/vnd.apache.arrow.file": { "source": "iana" },
  "application/vnd.apache.arrow.stream": { "source": "iana" },
  "application/vnd.apache.thrift.binary": { "source": "iana" },
  "application/vnd.apache.thrift.compact": { "source": "iana" },
  "application/vnd.apache.thrift.json": { "source": "iana" },
  "application/vnd.api+json": { "source": "iana", "compressible": true },
  "application/vnd.aplextor.warrp+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.apothekende.reservation+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.apple.installer+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mpkg"],
  },
  "application/vnd.apple.keynote": { "source": "iana", "extensions": ["key"] },
  "application/vnd.apple.mpegurl": { "source": "iana", "extensions": ["m3u8"] },
  "application/vnd.apple.numbers": {
    "source": "iana",
    "extensions": ["numbers"],
  },
  "application/vnd.apple.pages": { "source": "iana", "extensions": ["pages"] },
  "application/vnd.apple.pkpass": {
    "compressible": false,
    "extensions": ["pkpass"],
  },
  "application/vnd.arastra.swi": { "source": "iana" },
  "application/vnd.aristanetworks.swi": {
    "source": "iana",
    "extensions": ["swi"],
  },
  "application/vnd.artisan+json": { "source": "iana", "compressible": true },
  "application/vnd.artsquare": { "source": "iana" },
  "application/vnd.astraea-software.iota": {
    "source": "iana",
    "extensions": ["iota"],
  },
  "application/vnd.audiograph": { "source": "iana", "extensions": ["aep"] },
  "application/vnd.autopackage": { "source": "iana" },
  "application/vnd.avalon+json": { "source": "iana", "compressible": true },
  "application/vnd.avistar+xml": { "source": "iana", "compressible": true },
  "application/vnd.balsamiq.bmml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["bmml"],
  },
  "application/vnd.balsamiq.bmpr": { "source": "iana" },
  "application/vnd.banana-accounting": { "source": "iana" },
  "application/vnd.bbf.usp.error": { "source": "iana" },
  "application/vnd.bbf.usp.msg": { "source": "iana" },
  "application/vnd.bbf.usp.msg+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.bekitzur-stech+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.bint.med-content": { "source": "iana" },
  "application/vnd.biopax.rdf+xml": { "source": "iana", "compressible": true },
  "application/vnd.blink-idb-value-wrapper": { "source": "iana" },
  "application/vnd.blueice.multipass": {
    "source": "iana",
    "extensions": ["mpm"],
  },
  "application/vnd.bluetooth.ep.oob": { "source": "iana" },
  "application/vnd.bluetooth.le.oob": { "source": "iana" },
  "application/vnd.bmi": { "source": "iana", "extensions": ["bmi"] },
  "application/vnd.bpf": { "source": "iana" },
  "application/vnd.bpf3": { "source": "iana" },
  "application/vnd.businessobjects": {
    "source": "iana",
    "extensions": ["rep"],
  },
  "application/vnd.byu.uapi+json": { "source": "iana", "compressible": true },
  "application/vnd.cab-jscript": { "source": "iana" },
  "application/vnd.canon-cpdl": { "source": "iana" },
  "application/vnd.canon-lips": { "source": "iana" },
  "application/vnd.capasystems-pg+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.cendio.thinlinc.clientconf": { "source": "iana" },
  "application/vnd.century-systems.tcp_stream": { "source": "iana" },
  "application/vnd.chemdraw+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["cdxml"],
  },
  "application/vnd.chess-pgn": { "source": "iana" },
  "application/vnd.chipnuts.karaoke-mmd": {
    "source": "iana",
    "extensions": ["mmd"],
  },
  "application/vnd.ciedi": { "source": "iana" },
  "application/vnd.cinderella": { "source": "iana", "extensions": ["cdy"] },
  "application/vnd.cirpack.isdn-ext": { "source": "iana" },
  "application/vnd.citationstyles.style+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["csl"],
  },
  "application/vnd.claymore": { "source": "iana", "extensions": ["cla"] },
  "application/vnd.cloanto.rp9": { "source": "iana", "extensions": ["rp9"] },
  "application/vnd.clonk.c4group": {
    "source": "iana",
    "extensions": ["c4g", "c4d", "c4f", "c4p", "c4u"],
  },
  "application/vnd.cluetrust.cartomobile-config": {
    "source": "iana",
    "extensions": ["c11amc"],
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    "source": "iana",
    "extensions": ["c11amz"],
  },
  "application/vnd.coffeescript": { "source": "iana" },
  "application/vnd.collabio.xodocuments.document": { "source": "iana" },
  "application/vnd.collabio.xodocuments.document-template": {
    "source": "iana",
  },
  "application/vnd.collabio.xodocuments.presentation": { "source": "iana" },
  "application/vnd.collabio.xodocuments.presentation-template": {
    "source": "iana",
  },
  "application/vnd.collabio.xodocuments.spreadsheet": { "source": "iana" },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    "source": "iana",
  },
  "application/vnd.collection+json": { "source": "iana", "compressible": true },
  "application/vnd.collection.doc+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.collection.next+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.comicbook+zip": { "source": "iana", "compressible": false },
  "application/vnd.comicbook-rar": { "source": "iana" },
  "application/vnd.commerce-battelle": { "source": "iana" },
  "application/vnd.commonspace": { "source": "iana", "extensions": ["csp"] },
  "application/vnd.contact.cmsg": {
    "source": "iana",
    "extensions": ["cdbcmsg"],
  },
  "application/vnd.coreos.ignition+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.cosmocaller": { "source": "iana", "extensions": ["cmc"] },
  "application/vnd.crick.clicker": { "source": "iana", "extensions": ["clkx"] },
  "application/vnd.crick.clicker.keyboard": {
    "source": "iana",
    "extensions": ["clkk"],
  },
  "application/vnd.crick.clicker.palette": {
    "source": "iana",
    "extensions": ["clkp"],
  },
  "application/vnd.crick.clicker.template": {
    "source": "iana",
    "extensions": ["clkt"],
  },
  "application/vnd.crick.clicker.wordbank": {
    "source": "iana",
    "extensions": ["clkw"],
  },
  "application/vnd.criticaltools.wbs+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wbs"],
  },
  "application/vnd.cryptii.pipe+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.crypto-shade-file": { "source": "iana" },
  "application/vnd.cryptomator.encrypted": { "source": "iana" },
  "application/vnd.cryptomator.vault": { "source": "iana" },
  "application/vnd.ctc-posml": { "source": "iana", "extensions": ["pml"] },
  "application/vnd.ctct.ws+xml": { "source": "iana", "compressible": true },
  "application/vnd.cups-pdf": { "source": "iana" },
  "application/vnd.cups-postscript": { "source": "iana" },
  "application/vnd.cups-ppd": { "source": "iana", "extensions": ["ppd"] },
  "application/vnd.cups-raster": { "source": "iana" },
  "application/vnd.cups-raw": { "source": "iana" },
  "application/vnd.curl": { "source": "iana" },
  "application/vnd.curl.car": { "source": "apache", "extensions": ["car"] },
  "application/vnd.curl.pcurl": { "source": "apache", "extensions": ["pcurl"] },
  "application/vnd.cyan.dean.root+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.cybank": { "source": "iana" },
  "application/vnd.cyclonedx+json": { "source": "iana", "compressible": true },
  "application/vnd.cyclonedx+xml": { "source": "iana", "compressible": true },
  "application/vnd.d2l.coursepackage1p0+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.d3m-dataset": { "source": "iana" },
  "application/vnd.d3m-problem": { "source": "iana" },
  "application/vnd.dart": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dart"],
  },
  "application/vnd.data-vision.rdz": {
    "source": "iana",
    "extensions": ["rdz"],
  },
  "application/vnd.datapackage+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dataresource+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dbf": { "source": "iana", "extensions": ["dbf"] },
  "application/vnd.debian.binary-package": { "source": "iana" },
  "application/vnd.dece.data": {
    "source": "iana",
    "extensions": ["uvf", "uvvf", "uvd", "uvvd"],
  },
  "application/vnd.dece.ttml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uvt", "uvvt"],
  },
  "application/vnd.dece.unspecified": {
    "source": "iana",
    "extensions": ["uvx", "uvvx"],
  },
  "application/vnd.dece.zip": {
    "source": "iana",
    "extensions": ["uvz", "uvvz"],
  },
  "application/vnd.denovo.fcselayout-link": {
    "source": "iana",
    "extensions": ["fe_launch"],
  },
  "application/vnd.desmume.movie": { "source": "iana" },
  "application/vnd.dir-bi.plate-dl-nosuffix": { "source": "iana" },
  "application/vnd.dm.delegation+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dna": { "source": "iana", "extensions": ["dna"] },
  "application/vnd.document+json": { "source": "iana", "compressible": true },
  "application/vnd.dolby.mlp": { "source": "apache", "extensions": ["mlp"] },
  "application/vnd.dolby.mobile.1": { "source": "iana" },
  "application/vnd.dolby.mobile.2": { "source": "iana" },
  "application/vnd.doremir.scorecloud-binary-document": { "source": "iana" },
  "application/vnd.dpgraph": { "source": "iana", "extensions": ["dpg"] },
  "application/vnd.dreamfactory": { "source": "iana", "extensions": ["dfac"] },
  "application/vnd.drive+json": { "source": "iana", "compressible": true },
  "application/vnd.ds-keypoint": { "source": "apache", "extensions": ["kpxx"] },
  "application/vnd.dtg.local": { "source": "iana" },
  "application/vnd.dtg.local.flash": { "source": "iana" },
  "application/vnd.dtg.local.html": { "source": "iana" },
  "application/vnd.dvb.ait": { "source": "iana", "extensions": ["ait"] },
  "application/vnd.dvb.dvbisl+xml": { "source": "iana", "compressible": true },
  "application/vnd.dvb.dvbj": { "source": "iana" },
  "application/vnd.dvb.esgcontainer": { "source": "iana" },
  "application/vnd.dvb.ipdcdftnotifaccess": { "source": "iana" },
  "application/vnd.dvb.ipdcesgaccess": { "source": "iana" },
  "application/vnd.dvb.ipdcesgaccess2": { "source": "iana" },
  "application/vnd.dvb.ipdcesgpdd": { "source": "iana" },
  "application/vnd.dvb.ipdcroaming": { "source": "iana" },
  "application/vnd.dvb.iptv.alfec-base": { "source": "iana" },
  "application/vnd.dvb.iptv.alfec-enhancement": { "source": "iana" },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.notif-container+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.notif-generic+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.notif-init+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.dvb.pfr": { "source": "iana" },
  "application/vnd.dvb.service": { "source": "iana", "extensions": ["svc"] },
  "application/vnd.dxr": { "source": "iana" },
  "application/vnd.dynageo": { "source": "iana", "extensions": ["geo"] },
  "application/vnd.dzr": { "source": "iana" },
  "application/vnd.easykaraoke.cdgdownload": { "source": "iana" },
  "application/vnd.ecdis-update": { "source": "iana" },
  "application/vnd.ecip.rlp": { "source": "iana" },
  "application/vnd.eclipse.ditto+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ecowin.chart": { "source": "iana", "extensions": ["mag"] },
  "application/vnd.ecowin.filerequest": { "source": "iana" },
  "application/vnd.ecowin.fileupdate": { "source": "iana" },
  "application/vnd.ecowin.series": { "source": "iana" },
  "application/vnd.ecowin.seriesrequest": { "source": "iana" },
  "application/vnd.ecowin.seriesupdate": { "source": "iana" },
  "application/vnd.efi.img": { "source": "iana" },
  "application/vnd.efi.iso": { "source": "iana" },
  "application/vnd.emclient.accessrequest+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.enliven": { "source": "iana", "extensions": ["nml"] },
  "application/vnd.enphase.envoy": { "source": "iana" },
  "application/vnd.eprints.data+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.epson.esf": { "source": "iana", "extensions": ["esf"] },
  "application/vnd.epson.msf": { "source": "iana", "extensions": ["msf"] },
  "application/vnd.epson.quickanime": {
    "source": "iana",
    "extensions": ["qam"],
  },
  "application/vnd.epson.salt": { "source": "iana", "extensions": ["slt"] },
  "application/vnd.epson.ssf": { "source": "iana", "extensions": ["ssf"] },
  "application/vnd.ericsson.quickcall": { "source": "iana" },
  "application/vnd.espass-espass+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.eszigno3+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["es3", "et3"],
  },
  "application/vnd.etsi.aoc+xml": { "source": "iana", "compressible": true },
  "application/vnd.etsi.asic-e+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.etsi.asic-s+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.etsi.cug+xml": { "source": "iana", "compressible": true },
  "application/vnd.etsi.iptvcommand+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvprofile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvservice+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvsync+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.mcid+xml": { "source": "iana", "compressible": true },
  "application/vnd.etsi.mheg5": { "source": "iana" },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.pstn+xml": { "source": "iana", "compressible": true },
  "application/vnd.etsi.sci+xml": { "source": "iana", "compressible": true },
  "application/vnd.etsi.simservs+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.etsi.timestamp-token": { "source": "iana" },
  "application/vnd.etsi.tsl+xml": { "source": "iana", "compressible": true },
  "application/vnd.etsi.tsl.der": { "source": "iana" },
  "application/vnd.eu.kasparian.car+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.eudora.data": { "source": "iana" },
  "application/vnd.evolv.ecig.profile": { "source": "iana" },
  "application/vnd.evolv.ecig.settings": { "source": "iana" },
  "application/vnd.evolv.ecig.theme": { "source": "iana" },
  "application/vnd.exstream-empower+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.exstream-package": { "source": "iana" },
  "application/vnd.ezpix-album": { "source": "iana", "extensions": ["ez2"] },
  "application/vnd.ezpix-package": { "source": "iana", "extensions": ["ez3"] },
  "application/vnd.f-secure.mobile": { "source": "iana" },
  "application/vnd.familysearch.gedcom+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.fastcopy-disk-image": { "source": "iana" },
  "application/vnd.fdf": { "source": "iana", "extensions": ["fdf"] },
  "application/vnd.fdsn.mseed": { "source": "iana", "extensions": ["mseed"] },
  "application/vnd.fdsn.seed": {
    "source": "iana",
    "extensions": ["seed", "dataless"],
  },
  "application/vnd.ffsns": { "source": "iana" },
  "application/vnd.ficlab.flb+zip": { "source": "iana", "compressible": false },
  "application/vnd.filmit.zfc": { "source": "iana" },
  "application/vnd.fints": { "source": "iana" },
  "application/vnd.firemonkeys.cloudcell": { "source": "iana" },
  "application/vnd.flographit": { "source": "iana", "extensions": ["gph"] },
  "application/vnd.fluxtime.clip": { "source": "iana", "extensions": ["ftc"] },
  "application/vnd.font-fontforge-sfd": { "source": "iana" },
  "application/vnd.framemaker": {
    "source": "iana",
    "extensions": ["fm", "frame", "maker", "book"],
  },
  "application/vnd.frogans.fnc": { "source": "iana", "extensions": ["fnc"] },
  "application/vnd.frogans.ltf": { "source": "iana", "extensions": ["ltf"] },
  "application/vnd.fsc.weblaunch": { "source": "iana", "extensions": ["fsc"] },
  "application/vnd.fujifilm.fb.docuworks": { "source": "iana" },
  "application/vnd.fujifilm.fb.docuworks.binder": { "source": "iana" },
  "application/vnd.fujifilm.fb.docuworks.container": { "source": "iana" },
  "application/vnd.fujifilm.fb.jfi+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.fujitsu.oasys": { "source": "iana", "extensions": ["oas"] },
  "application/vnd.fujitsu.oasys2": { "source": "iana", "extensions": ["oa2"] },
  "application/vnd.fujitsu.oasys3": { "source": "iana", "extensions": ["oa3"] },
  "application/vnd.fujitsu.oasysgp": {
    "source": "iana",
    "extensions": ["fg5"],
  },
  "application/vnd.fujitsu.oasysprs": {
    "source": "iana",
    "extensions": ["bh2"],
  },
  "application/vnd.fujixerox.art-ex": { "source": "iana" },
  "application/vnd.fujixerox.art4": { "source": "iana" },
  "application/vnd.fujixerox.ddd": { "source": "iana", "extensions": ["ddd"] },
  "application/vnd.fujixerox.docuworks": {
    "source": "iana",
    "extensions": ["xdw"],
  },
  "application/vnd.fujixerox.docuworks.binder": {
    "source": "iana",
    "extensions": ["xbd"],
  },
  "application/vnd.fujixerox.docuworks.container": { "source": "iana" },
  "application/vnd.fujixerox.hbpl": { "source": "iana" },
  "application/vnd.fut-misnet": { "source": "iana" },
  "application/vnd.futoin+cbor": { "source": "iana" },
  "application/vnd.futoin+json": { "source": "iana", "compressible": true },
  "application/vnd.fuzzysheet": { "source": "iana", "extensions": ["fzs"] },
  "application/vnd.genomatix.tuxedo": {
    "source": "iana",
    "extensions": ["txd"],
  },
  "application/vnd.gentics.grd+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.geo+json": { "source": "iana", "compressible": true },
  "application/vnd.geocube+xml": { "source": "iana", "compressible": true },
  "application/vnd.geogebra.file": { "source": "iana", "extensions": ["ggb"] },
  "application/vnd.geogebra.slides": { "source": "iana" },
  "application/vnd.geogebra.tool": { "source": "iana", "extensions": ["ggt"] },
  "application/vnd.geometry-explorer": {
    "source": "iana",
    "extensions": ["gex", "gre"],
  },
  "application/vnd.geonext": { "source": "iana", "extensions": ["gxt"] },
  "application/vnd.geoplan": { "source": "iana", "extensions": ["g2w"] },
  "application/vnd.geospace": { "source": "iana", "extensions": ["g3w"] },
  "application/vnd.gerber": { "source": "iana" },
  "application/vnd.globalplatform.card-content-mgt": { "source": "iana" },
  "application/vnd.globalplatform.card-content-mgt-response": {
    "source": "iana",
  },
  "application/vnd.gmx": { "source": "iana", "extensions": ["gmx"] },
  "application/vnd.google-apps.document": {
    "compressible": false,
    "extensions": ["gdoc"],
  },
  "application/vnd.google-apps.presentation": {
    "compressible": false,
    "extensions": ["gslides"],
  },
  "application/vnd.google-apps.spreadsheet": {
    "compressible": false,
    "extensions": ["gsheet"],
  },
  "application/vnd.google-earth.kml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["kml"],
  },
  "application/vnd.google-earth.kmz": {
    "source": "iana",
    "compressible": false,
    "extensions": ["kmz"],
  },
  "application/vnd.gov.sk.e-form+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.gov.sk.e-form+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.grafeq": { "source": "iana", "extensions": ["gqf", "gqs"] },
  "application/vnd.gridmp": { "source": "iana" },
  "application/vnd.groove-account": { "source": "iana", "extensions": ["gac"] },
  "application/vnd.groove-help": { "source": "iana", "extensions": ["ghf"] },
  "application/vnd.groove-identity-message": {
    "source": "iana",
    "extensions": ["gim"],
  },
  "application/vnd.groove-injector": {
    "source": "iana",
    "extensions": ["grv"],
  },
  "application/vnd.groove-tool-message": {
    "source": "iana",
    "extensions": ["gtm"],
  },
  "application/vnd.groove-tool-template": {
    "source": "iana",
    "extensions": ["tpl"],
  },
  "application/vnd.groove-vcard": { "source": "iana", "extensions": ["vcg"] },
  "application/vnd.hal+json": { "source": "iana", "compressible": true },
  "application/vnd.hal+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["hal"],
  },
  "application/vnd.handheld-entertainment+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["zmm"],
  },
  "application/vnd.hbci": { "source": "iana", "extensions": ["hbci"] },
  "application/vnd.hc+json": { "source": "iana", "compressible": true },
  "application/vnd.hcl-bireports": { "source": "iana" },
  "application/vnd.hdt": { "source": "iana" },
  "application/vnd.heroku+json": { "source": "iana", "compressible": true },
  "application/vnd.hhe.lesson-player": {
    "source": "iana",
    "extensions": ["les"],
  },
  "application/vnd.hl7cda+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/vnd.hl7v2+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/vnd.hp-hpgl": { "source": "iana", "extensions": ["hpgl"] },
  "application/vnd.hp-hpid": { "source": "iana", "extensions": ["hpid"] },
  "application/vnd.hp-hps": { "source": "iana", "extensions": ["hps"] },
  "application/vnd.hp-jlyt": { "source": "iana", "extensions": ["jlt"] },
  "application/vnd.hp-pcl": { "source": "iana", "extensions": ["pcl"] },
  "application/vnd.hp-pclxl": { "source": "iana", "extensions": ["pclxl"] },
  "application/vnd.httphone": { "source": "iana" },
  "application/vnd.hydrostatix.sof-data": {
    "source": "iana",
    "extensions": ["sfd-hdstx"],
  },
  "application/vnd.hyper+json": { "source": "iana", "compressible": true },
  "application/vnd.hyper-item+json": { "source": "iana", "compressible": true },
  "application/vnd.hyperdrive+json": { "source": "iana", "compressible": true },
  "application/vnd.hzn-3d-crossword": { "source": "iana" },
  "application/vnd.ibm.afplinedata": { "source": "iana" },
  "application/vnd.ibm.electronic-media": { "source": "iana" },
  "application/vnd.ibm.minipay": { "source": "iana", "extensions": ["mpy"] },
  "application/vnd.ibm.modcap": {
    "source": "iana",
    "extensions": ["afp", "listafp", "list3820"],
  },
  "application/vnd.ibm.rights-management": {
    "source": "iana",
    "extensions": ["irm"],
  },
  "application/vnd.ibm.secure-container": {
    "source": "iana",
    "extensions": ["sc"],
  },
  "application/vnd.iccprofile": {
    "source": "iana",
    "extensions": ["icc", "icm"],
  },
  "application/vnd.ieee.1905": { "source": "iana" },
  "application/vnd.igloader": { "source": "iana", "extensions": ["igl"] },
  "application/vnd.imagemeter.folder+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.imagemeter.image+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.immervision-ivp": {
    "source": "iana",
    "extensions": ["ivp"],
  },
  "application/vnd.immervision-ivu": {
    "source": "iana",
    "extensions": ["ivu"],
  },
  "application/vnd.ims.imsccv1p1": { "source": "iana" },
  "application/vnd.ims.imsccv1p2": { "source": "iana" },
  "application/vnd.ims.imsccv1p3": { "source": "iana" },
  "application/vnd.ims.lis.v2.result+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.informedcontrol.rms+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.informix-visionary": { "source": "iana" },
  "application/vnd.infotech.project": { "source": "iana" },
  "application/vnd.infotech.project+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.innopath.wamp.notification": { "source": "iana" },
  "application/vnd.insors.igm": { "source": "iana", "extensions": ["igm"] },
  "application/vnd.intercon.formnet": {
    "source": "iana",
    "extensions": ["xpw", "xpx"],
  },
  "application/vnd.intergeo": { "source": "iana", "extensions": ["i2g"] },
  "application/vnd.intertrust.digibox": { "source": "iana" },
  "application/vnd.intertrust.nncp": { "source": "iana" },
  "application/vnd.intu.qbo": { "source": "iana", "extensions": ["qbo"] },
  "application/vnd.intu.qfx": { "source": "iana", "extensions": ["qfx"] },
  "application/vnd.iptc.g2.catalogitem+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ipunplugged.rcprofile": {
    "source": "iana",
    "extensions": ["rcprofile"],
  },
  "application/vnd.irepository.package+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["irp"],
  },
  "application/vnd.is-xpr": { "source": "iana", "extensions": ["xpr"] },
  "application/vnd.isac.fcs": { "source": "iana", "extensions": ["fcs"] },
  "application/vnd.iso11783-10+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.jam": { "source": "iana", "extensions": ["jam"] },
  "application/vnd.japannet-directory-service": { "source": "iana" },
  "application/vnd.japannet-jpnstore-wakeup": { "source": "iana" },
  "application/vnd.japannet-payment-wakeup": { "source": "iana" },
  "application/vnd.japannet-registration": { "source": "iana" },
  "application/vnd.japannet-registration-wakeup": { "source": "iana" },
  "application/vnd.japannet-setstore-wakeup": { "source": "iana" },
  "application/vnd.japannet-verification": { "source": "iana" },
  "application/vnd.japannet-verification-wakeup": { "source": "iana" },
  "application/vnd.jcp.javame.midlet-rms": {
    "source": "iana",
    "extensions": ["rms"],
  },
  "application/vnd.jisp": { "source": "iana", "extensions": ["jisp"] },
  "application/vnd.joost.joda-archive": {
    "source": "iana",
    "extensions": ["joda"],
  },
  "application/vnd.jsk.isdn-ngn": { "source": "iana" },
  "application/vnd.kahootz": { "source": "iana", "extensions": ["ktz", "ktr"] },
  "application/vnd.kde.karbon": { "source": "iana", "extensions": ["karbon"] },
  "application/vnd.kde.kchart": { "source": "iana", "extensions": ["chrt"] },
  "application/vnd.kde.kformula": { "source": "iana", "extensions": ["kfo"] },
  "application/vnd.kde.kivio": { "source": "iana", "extensions": ["flw"] },
  "application/vnd.kde.kontour": { "source": "iana", "extensions": ["kon"] },
  "application/vnd.kde.kpresenter": {
    "source": "iana",
    "extensions": ["kpr", "kpt"],
  },
  "application/vnd.kde.kspread": { "source": "iana", "extensions": ["ksp"] },
  "application/vnd.kde.kword": {
    "source": "iana",
    "extensions": ["kwd", "kwt"],
  },
  "application/vnd.kenameaapp": { "source": "iana", "extensions": ["htke"] },
  "application/vnd.kidspiration": { "source": "iana", "extensions": ["kia"] },
  "application/vnd.kinar": { "source": "iana", "extensions": ["kne", "knp"] },
  "application/vnd.koan": {
    "source": "iana",
    "extensions": ["skp", "skd", "skt", "skm"],
  },
  "application/vnd.kodak-descriptor": {
    "source": "iana",
    "extensions": ["sse"],
  },
  "application/vnd.las": { "source": "iana" },
  "application/vnd.las.las+json": { "source": "iana", "compressible": true },
  "application/vnd.las.las+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lasxml"],
  },
  "application/vnd.laszip": { "source": "iana" },
  "application/vnd.leap+json": { "source": "iana", "compressible": true },
  "application/vnd.liberty-request+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    "source": "iana",
    "extensions": ["lbd"],
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["lbe"],
  },
  "application/vnd.logipipe.circuit+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.loom": { "source": "iana" },
  "application/vnd.lotus-1-2-3": { "source": "iana", "extensions": ["123"] },
  "application/vnd.lotus-approach": { "source": "iana", "extensions": ["apr"] },
  "application/vnd.lotus-freelance": {
    "source": "iana",
    "extensions": ["pre"],
  },
  "application/vnd.lotus-notes": { "source": "iana", "extensions": ["nsf"] },
  "application/vnd.lotus-organizer": {
    "source": "iana",
    "extensions": ["org"],
  },
  "application/vnd.lotus-screencam": {
    "source": "iana",
    "extensions": ["scm"],
  },
  "application/vnd.lotus-wordpro": { "source": "iana", "extensions": ["lwp"] },
  "application/vnd.macports.portpkg": {
    "source": "iana",
    "extensions": ["portpkg"],
  },
  "application/vnd.mapbox-vector-tile": {
    "source": "iana",
    "extensions": ["mvt"],
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.marlin.drm.license+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.marlin.drm.mdcf": { "source": "iana" },
  "application/vnd.mason+json": { "source": "iana", "compressible": true },
  "application/vnd.maxar.archive.3tz+zip": {
    "source": "iana",
    "compressible": false,
  },
  "application/vnd.maxmind.maxmind-db": { "source": "iana" },
  "application/vnd.mcd": { "source": "iana", "extensions": ["mcd"] },
  "application/vnd.medcalcdata": { "source": "iana", "extensions": ["mc1"] },
  "application/vnd.mediastation.cdkey": {
    "source": "iana",
    "extensions": ["cdkey"],
  },
  "application/vnd.meridian-slingshot": { "source": "iana" },
  "application/vnd.mfer": { "source": "iana", "extensions": ["mwf"] },
  "application/vnd.mfmp": { "source": "iana", "extensions": ["mfm"] },
  "application/vnd.micro+json": { "source": "iana", "compressible": true },
  "application/vnd.micrografx.flo": { "source": "iana", "extensions": ["flo"] },
  "application/vnd.micrografx.igx": { "source": "iana", "extensions": ["igx"] },
  "application/vnd.microsoft.portable-executable": { "source": "iana" },
  "application/vnd.microsoft.windows.thumbnail-cache": { "source": "iana" },
  "application/vnd.miele+json": { "source": "iana", "compressible": true },
  "application/vnd.mif": { "source": "iana", "extensions": ["mif"] },
  "application/vnd.minisoft-hp3000-save": { "source": "iana" },
  "application/vnd.mitsubishi.misty-guard.trustweb": { "source": "iana" },
  "application/vnd.mobius.daf": { "source": "iana", "extensions": ["daf"] },
  "application/vnd.mobius.dis": { "source": "iana", "extensions": ["dis"] },
  "application/vnd.mobius.mbk": { "source": "iana", "extensions": ["mbk"] },
  "application/vnd.mobius.mqy": { "source": "iana", "extensions": ["mqy"] },
  "application/vnd.mobius.msl": { "source": "iana", "extensions": ["msl"] },
  "application/vnd.mobius.plc": { "source": "iana", "extensions": ["plc"] },
  "application/vnd.mobius.txf": { "source": "iana", "extensions": ["txf"] },
  "application/vnd.mophun.application": {
    "source": "iana",
    "extensions": ["mpn"],
  },
  "application/vnd.mophun.certificate": {
    "source": "iana",
    "extensions": ["mpc"],
  },
  "application/vnd.motorola.flexsuite": { "source": "iana" },
  "application/vnd.motorola.flexsuite.adsi": { "source": "iana" },
  "application/vnd.motorola.flexsuite.fis": { "source": "iana" },
  "application/vnd.motorola.flexsuite.gotap": { "source": "iana" },
  "application/vnd.motorola.flexsuite.kmr": { "source": "iana" },
  "application/vnd.motorola.flexsuite.ttc": { "source": "iana" },
  "application/vnd.motorola.flexsuite.wem": { "source": "iana" },
  "application/vnd.motorola.iprm": { "source": "iana" },
  "application/vnd.mozilla.xul+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xul"],
  },
  "application/vnd.ms-3mfdocument": { "source": "iana" },
  "application/vnd.ms-artgalry": { "source": "iana", "extensions": ["cil"] },
  "application/vnd.ms-asf": { "source": "iana" },
  "application/vnd.ms-cab-compressed": {
    "source": "iana",
    "extensions": ["cab"],
  },
  "application/vnd.ms-color.iccprofile": { "source": "apache" },
  "application/vnd.ms-excel": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlam"],
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsb"],
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    "source": "iana",
    "extensions": ["xlsm"],
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["xltm"],
  },
  "application/vnd.ms-fontobject": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eot"],
  },
  "application/vnd.ms-htmlhelp": { "source": "iana", "extensions": ["chm"] },
  "application/vnd.ms-ims": { "source": "iana", "extensions": ["ims"] },
  "application/vnd.ms-lrm": { "source": "iana", "extensions": ["lrm"] },
  "application/vnd.ms-office.activex+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ms-officetheme": {
    "source": "iana",
    "extensions": ["thmx"],
  },
  "application/vnd.ms-opentype": { "source": "apache", "compressible": true },
  "application/vnd.ms-outlook": {
    "compressible": false,
    "extensions": ["msg"],
  },
  "application/vnd.ms-package.obfuscated-opentype": { "source": "apache" },
  "application/vnd.ms-pki.seccat": {
    "source": "apache",
    "extensions": ["cat"],
  },
  "application/vnd.ms-pki.stl": { "source": "apache", "extensions": ["stl"] },
  "application/vnd.ms-playready.initiator+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ms-powerpoint": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ppt", "pps", "pot"],
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppam"],
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    "source": "iana",
    "extensions": ["pptm"],
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    "source": "iana",
    "extensions": ["sldm"],
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    "source": "iana",
    "extensions": ["ppsm"],
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["potm"],
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ms-printing.printticket+xml": {
    "source": "apache",
    "compressible": true,
  },
  "application/vnd.ms-printschematicket+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ms-project": {
    "source": "iana",
    "extensions": ["mpp", "mpt"],
  },
  "application/vnd.ms-tnef": { "source": "iana" },
  "application/vnd.ms-windows.devicepairing": { "source": "iana" },
  "application/vnd.ms-windows.nwprinting.oob": { "source": "iana" },
  "application/vnd.ms-windows.printerpairing": { "source": "iana" },
  "application/vnd.ms-windows.wsd.oob": { "source": "iana" },
  "application/vnd.ms-wmdrm.lic-chlg-req": { "source": "iana" },
  "application/vnd.ms-wmdrm.lic-resp": { "source": "iana" },
  "application/vnd.ms-wmdrm.meter-chlg-req": { "source": "iana" },
  "application/vnd.ms-wmdrm.meter-resp": { "source": "iana" },
  "application/vnd.ms-word.document.macroenabled.12": {
    "source": "iana",
    "extensions": ["docm"],
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    "source": "iana",
    "extensions": ["dotm"],
  },
  "application/vnd.ms-works": {
    "source": "iana",
    "extensions": ["wps", "wks", "wcm", "wdb"],
  },
  "application/vnd.ms-wpl": { "source": "iana", "extensions": ["wpl"] },
  "application/vnd.ms-xpsdocument": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xps"],
  },
  "application/vnd.msa-disk-image": { "source": "iana" },
  "application/vnd.mseq": { "source": "iana", "extensions": ["mseq"] },
  "application/vnd.msign": { "source": "iana" },
  "application/vnd.multiad.creator": { "source": "iana" },
  "application/vnd.multiad.creator.cif": { "source": "iana" },
  "application/vnd.music-niff": { "source": "iana" },
  "application/vnd.musician": { "source": "iana", "extensions": ["mus"] },
  "application/vnd.muvee.style": { "source": "iana", "extensions": ["msty"] },
  "application/vnd.mynfc": { "source": "iana", "extensions": ["taglet"] },
  "application/vnd.nacamar.ybrid+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.ncd.control": { "source": "iana" },
  "application/vnd.ncd.reference": { "source": "iana" },
  "application/vnd.nearst.inv+json": { "source": "iana", "compressible": true },
  "application/vnd.nebumind.line": { "source": "iana" },
  "application/vnd.nervana": { "source": "iana" },
  "application/vnd.netfpx": { "source": "iana" },
  "application/vnd.neurolanguage.nlu": {
    "source": "iana",
    "extensions": ["nlu"],
  },
  "application/vnd.nimn": { "source": "iana" },
  "application/vnd.nintendo.nitro.rom": { "source": "iana" },
  "application/vnd.nintendo.snes.rom": { "source": "iana" },
  "application/vnd.nitf": { "source": "iana", "extensions": ["ntf", "nitf"] },
  "application/vnd.noblenet-directory": {
    "source": "iana",
    "extensions": ["nnd"],
  },
  "application/vnd.noblenet-sealer": {
    "source": "iana",
    "extensions": ["nns"],
  },
  "application/vnd.noblenet-web": { "source": "iana", "extensions": ["nnw"] },
  "application/vnd.nokia.catalogs": { "source": "iana" },
  "application/vnd.nokia.conml+wbxml": { "source": "iana" },
  "application/vnd.nokia.conml+xml": { "source": "iana", "compressible": true },
  "application/vnd.nokia.iptv.config+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.nokia.isds-radio-presets": { "source": "iana" },
  "application/vnd.nokia.landmark+wbxml": { "source": "iana" },
  "application/vnd.nokia.landmark+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ac"],
  },
  "application/vnd.nokia.n-gage.data": {
    "source": "iana",
    "extensions": ["ngdat"],
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    "source": "iana",
    "extensions": ["n-gage"],
  },
  "application/vnd.nokia.ncd": { "source": "iana" },
  "application/vnd.nokia.pcd+wbxml": { "source": "iana" },
  "application/vnd.nokia.pcd+xml": { "source": "iana", "compressible": true },
  "application/vnd.nokia.radio-preset": {
    "source": "iana",
    "extensions": ["rpst"],
  },
  "application/vnd.nokia.radio-presets": {
    "source": "iana",
    "extensions": ["rpss"],
  },
  "application/vnd.novadigm.edm": { "source": "iana", "extensions": ["edm"] },
  "application/vnd.novadigm.edx": { "source": "iana", "extensions": ["edx"] },
  "application/vnd.novadigm.ext": { "source": "iana", "extensions": ["ext"] },
  "application/vnd.ntt-local.content-share": { "source": "iana" },
  "application/vnd.ntt-local.file-transfer": { "source": "iana" },
  "application/vnd.ntt-local.ogw_remote-access": { "source": "iana" },
  "application/vnd.ntt-local.sip-ta_remote": { "source": "iana" },
  "application/vnd.ntt-local.sip-ta_tcp_stream": { "source": "iana" },
  "application/vnd.oasis.opendocument.chart": {
    "source": "iana",
    "extensions": ["odc"],
  },
  "application/vnd.oasis.opendocument.chart-template": {
    "source": "iana",
    "extensions": ["otc"],
  },
  "application/vnd.oasis.opendocument.database": {
    "source": "iana",
    "extensions": ["odb"],
  },
  "application/vnd.oasis.opendocument.formula": {
    "source": "iana",
    "extensions": ["odf"],
  },
  "application/vnd.oasis.opendocument.formula-template": {
    "source": "iana",
    "extensions": ["odft"],
  },
  "application/vnd.oasis.opendocument.graphics": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odg"],
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    "source": "iana",
    "extensions": ["otg"],
  },
  "application/vnd.oasis.opendocument.image": {
    "source": "iana",
    "extensions": ["odi"],
  },
  "application/vnd.oasis.opendocument.image-template": {
    "source": "iana",
    "extensions": ["oti"],
  },
  "application/vnd.oasis.opendocument.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odp"],
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    "source": "iana",
    "extensions": ["otp"],
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ods"],
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    "source": "iana",
    "extensions": ["ots"],
  },
  "application/vnd.oasis.opendocument.text": {
    "source": "iana",
    "compressible": false,
    "extensions": ["odt"],
  },
  "application/vnd.oasis.opendocument.text-master": {
    "source": "iana",
    "extensions": ["odm"],
  },
  "application/vnd.oasis.opendocument.text-template": {
    "source": "iana",
    "extensions": ["ott"],
  },
  "application/vnd.oasis.opendocument.text-web": {
    "source": "iana",
    "extensions": ["oth"],
  },
  "application/vnd.obn": { "source": "iana" },
  "application/vnd.ocf+cbor": { "source": "iana" },
  "application/vnd.oci.image.manifest.v1+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oftn.l10n+json": { "source": "iana", "compressible": true },
  "application/vnd.oipf.contentaccessdownload+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.cspg-hexbinary": { "source": "iana" },
  "application/vnd.oipf.dae.svg+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.pae.gem": { "source": "iana" },
  "application/vnd.oipf.spdiscovery+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.spdlist+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.ueprofile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oipf.userprofile+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.olpc-sugar": { "source": "iana", "extensions": ["xo"] },
  "application/vnd.oma-scws-config": { "source": "iana" },
  "application/vnd.oma-scws-http-request": { "source": "iana" },
  "application/vnd.oma-scws-http-response": { "source": "iana" },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.imd+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.ltkm": { "source": "iana" },
  "application/vnd.oma.bcast.notification+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.provisioningtrigger": { "source": "iana" },
  "application/vnd.oma.bcast.sgboot": { "source": "iana" },
  "application/vnd.oma.bcast.sgdd+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.sgdu": { "source": "iana" },
  "application/vnd.oma.bcast.simple-symbol-container": { "source": "iana" },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.sprov+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.bcast.stkm": { "source": "iana" },
  "application/vnd.oma.cab-address-book+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.cab-pcc+xml": { "source": "iana", "compressible": true },
  "application/vnd.oma.cab-subs-invite+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.dcd": { "source": "iana" },
  "application/vnd.oma.dcdc": { "source": "iana" },
  "application/vnd.oma.dd2+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dd2"],
  },
  "application/vnd.oma.drm.risd+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.group-usage-list+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.lwm2m+cbor": { "source": "iana" },
  "application/vnd.oma.lwm2m+json": { "source": "iana", "compressible": true },
  "application/vnd.oma.lwm2m+tlv": { "source": "iana" },
  "application/vnd.oma.pal+xml": { "source": "iana", "compressible": true },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.poc.final-report+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.poc.groups+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.push": { "source": "iana" },
  "application/vnd.oma.scidm.messages+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oma.xcap-directory+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.omads-email+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/vnd.omads-file+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/vnd.omads-folder+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/vnd.omaloc-supl-init": { "source": "iana" },
  "application/vnd.onepager": { "source": "iana" },
  "application/vnd.onepagertamp": { "source": "iana" },
  "application/vnd.onepagertamx": { "source": "iana" },
  "application/vnd.onepagertat": { "source": "iana" },
  "application/vnd.onepagertatp": { "source": "iana" },
  "application/vnd.onepagertatx": { "source": "iana" },
  "application/vnd.openblox.game+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["obgx"],
  },
  "application/vnd.openblox.game-binary": { "source": "iana" },
  "application/vnd.openeye.oeb": { "source": "iana" },
  "application/vnd.openofficeorg.extension": {
    "source": "apache",
    "extensions": ["oxt"],
  },
  "application/vnd.openstreetmap.data+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["osm"],
  },
  "application/vnd.opentimestamps.ots": { "source": "iana" },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    "source": "iana",
    "compressible": false,
    "extensions": ["pptx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    "source": "iana",
    "extensions": ["sldx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    "source": "iana",
    "extensions": ["ppsx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    "source": "iana",
    "extensions": ["potx"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    "source": "iana",
    "compressible": false,
    "extensions": ["xlsx"],
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    "source": "iana",
    "extensions": ["xltx"],
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    "source": "iana",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    "source": "iana",
    "compressible": false,
    "extensions": ["docx"],
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    "source": "iana",
    "extensions": ["dotx"],
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":
    { "source": "iana", "compressible": true },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.oracle.resource+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.orange.indata": { "source": "iana" },
  "application/vnd.osa.netdeploy": { "source": "iana" },
  "application/vnd.osgeo.mapguide.package": {
    "source": "iana",
    "extensions": ["mgp"],
  },
  "application/vnd.osgi.bundle": { "source": "iana" },
  "application/vnd.osgi.dp": { "source": "iana", "extensions": ["dp"] },
  "application/vnd.osgi.subsystem": { "source": "iana", "extensions": ["esa"] },
  "application/vnd.otps.ct-kip+xml": { "source": "iana", "compressible": true },
  "application/vnd.oxli.countgraph": { "source": "iana" },
  "application/vnd.pagerduty+json": { "source": "iana", "compressible": true },
  "application/vnd.palm": {
    "source": "iana",
    "extensions": ["pdb", "pqa", "oprc"],
  },
  "application/vnd.panoply": { "source": "iana" },
  "application/vnd.paos.xml": { "source": "iana" },
  "application/vnd.patentdive": { "source": "iana" },
  "application/vnd.patientecommsdoc": { "source": "iana" },
  "application/vnd.pawaafile": { "source": "iana", "extensions": ["paw"] },
  "application/vnd.pcos": { "source": "iana" },
  "application/vnd.pg.format": { "source": "iana", "extensions": ["str"] },
  "application/vnd.pg.osasli": { "source": "iana", "extensions": ["ei6"] },
  "application/vnd.piaccess.application-licence": { "source": "iana" },
  "application/vnd.picsel": { "source": "iana", "extensions": ["efif"] },
  "application/vnd.pmi.widget": { "source": "iana", "extensions": ["wg"] },
  "application/vnd.poc.group-advertisement+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.pocketlearn": { "source": "iana", "extensions": ["plf"] },
  "application/vnd.powerbuilder6": { "source": "iana", "extensions": ["pbd"] },
  "application/vnd.powerbuilder6-s": { "source": "iana" },
  "application/vnd.powerbuilder7": { "source": "iana" },
  "application/vnd.powerbuilder7-s": { "source": "iana" },
  "application/vnd.powerbuilder75": { "source": "iana" },
  "application/vnd.powerbuilder75-s": { "source": "iana" },
  "application/vnd.preminet": { "source": "iana" },
  "application/vnd.previewsystems.box": {
    "source": "iana",
    "extensions": ["box"],
  },
  "application/vnd.proteus.magazine": {
    "source": "iana",
    "extensions": ["mgz"],
  },
  "application/vnd.psfs": { "source": "iana" },
  "application/vnd.publishare-delta-tree": {
    "source": "iana",
    "extensions": ["qps"],
  },
  "application/vnd.pvi.ptid1": { "source": "iana", "extensions": ["ptid"] },
  "application/vnd.pwg-multiplexed": { "source": "iana" },
  "application/vnd.pwg-xhtml-print+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.qualcomm.brew-app-res": { "source": "iana" },
  "application/vnd.quarantainenet": { "source": "iana" },
  "application/vnd.quark.quarkxpress": {
    "source": "iana",
    "extensions": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
  },
  "application/vnd.quobject-quoxdocument": { "source": "iana" },
  "application/vnd.radisys.moml+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-audit+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-conf+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.rainstor.data": { "source": "iana" },
  "application/vnd.rapid": { "source": "iana" },
  "application/vnd.rar": { "source": "iana", "extensions": ["rar"] },
  "application/vnd.realvnc.bed": { "source": "iana", "extensions": ["bed"] },
  "application/vnd.recordare.musicxml": {
    "source": "iana",
    "extensions": ["mxl"],
  },
  "application/vnd.recordare.musicxml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["musicxml"],
  },
  "application/vnd.renlearn.rlprint": { "source": "iana" },
  "application/vnd.resilient.logic": { "source": "iana" },
  "application/vnd.restful+json": { "source": "iana", "compressible": true },
  "application/vnd.rig.cryptonote": {
    "source": "iana",
    "extensions": ["cryptonote"],
  },
  "application/vnd.rim.cod": { "source": "apache", "extensions": ["cod"] },
  "application/vnd.rn-realmedia": { "source": "apache", "extensions": ["rm"] },
  "application/vnd.rn-realmedia-vbr": {
    "source": "apache",
    "extensions": ["rmvb"],
  },
  "application/vnd.route66.link66+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["link66"],
  },
  "application/vnd.rs-274x": { "source": "iana" },
  "application/vnd.ruckus.download": { "source": "iana" },
  "application/vnd.s3sms": { "source": "iana" },
  "application/vnd.sailingtracker.track": {
    "source": "iana",
    "extensions": ["st"],
  },
  "application/vnd.sar": { "source": "iana" },
  "application/vnd.sbm.cid": { "source": "iana" },
  "application/vnd.sbm.mid2": { "source": "iana" },
  "application/vnd.scribus": { "source": "iana" },
  "application/vnd.sealed.3df": { "source": "iana" },
  "application/vnd.sealed.csf": { "source": "iana" },
  "application/vnd.sealed.doc": { "source": "iana" },
  "application/vnd.sealed.eml": { "source": "iana" },
  "application/vnd.sealed.mht": { "source": "iana" },
  "application/vnd.sealed.net": { "source": "iana" },
  "application/vnd.sealed.ppt": { "source": "iana" },
  "application/vnd.sealed.tiff": { "source": "iana" },
  "application/vnd.sealed.xls": { "source": "iana" },
  "application/vnd.sealedmedia.softseal.html": { "source": "iana" },
  "application/vnd.sealedmedia.softseal.pdf": { "source": "iana" },
  "application/vnd.seemail": { "source": "iana", "extensions": ["see"] },
  "application/vnd.seis+json": { "source": "iana", "compressible": true },
  "application/vnd.sema": { "source": "iana", "extensions": ["sema"] },
  "application/vnd.semd": { "source": "iana", "extensions": ["semd"] },
  "application/vnd.semf": { "source": "iana", "extensions": ["semf"] },
  "application/vnd.shade-save-file": { "source": "iana" },
  "application/vnd.shana.informed.formdata": {
    "source": "iana",
    "extensions": ["ifm"],
  },
  "application/vnd.shana.informed.formtemplate": {
    "source": "iana",
    "extensions": ["itp"],
  },
  "application/vnd.shana.informed.interchange": {
    "source": "iana",
    "extensions": ["iif"],
  },
  "application/vnd.shana.informed.package": {
    "source": "iana",
    "extensions": ["ipk"],
  },
  "application/vnd.shootproof+json": { "source": "iana", "compressible": true },
  "application/vnd.shopkick+json": { "source": "iana", "compressible": true },
  "application/vnd.shp": { "source": "iana" },
  "application/vnd.shx": { "source": "iana" },
  "application/vnd.sigrok.session": { "source": "iana" },
  "application/vnd.simtech-mindmapper": {
    "source": "iana",
    "extensions": ["twd", "twds"],
  },
  "application/vnd.siren+json": { "source": "iana", "compressible": true },
  "application/vnd.smaf": { "source": "iana", "extensions": ["mmf"] },
  "application/vnd.smart.notebook": { "source": "iana" },
  "application/vnd.smart.teacher": {
    "source": "iana",
    "extensions": ["teacher"],
  },
  "application/vnd.snesdev-page-table": { "source": "iana" },
  "application/vnd.software602.filler.form+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["fo"],
  },
  "application/vnd.software602.filler.form-xml-zip": { "source": "iana" },
  "application/vnd.solent.sdkm+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["sdkm", "sdkd"],
  },
  "application/vnd.spotfire.dxp": { "source": "iana", "extensions": ["dxp"] },
  "application/vnd.spotfire.sfs": { "source": "iana", "extensions": ["sfs"] },
  "application/vnd.sqlite3": { "source": "iana" },
  "application/vnd.sss-cod": { "source": "iana" },
  "application/vnd.sss-dtf": { "source": "iana" },
  "application/vnd.sss-ntf": { "source": "iana" },
  "application/vnd.stardivision.calc": {
    "source": "apache",
    "extensions": ["sdc"],
  },
  "application/vnd.stardivision.draw": {
    "source": "apache",
    "extensions": ["sda"],
  },
  "application/vnd.stardivision.impress": {
    "source": "apache",
    "extensions": ["sdd"],
  },
  "application/vnd.stardivision.math": {
    "source": "apache",
    "extensions": ["smf"],
  },
  "application/vnd.stardivision.writer": {
    "source": "apache",
    "extensions": ["sdw", "vor"],
  },
  "application/vnd.stardivision.writer-global": {
    "source": "apache",
    "extensions": ["sgl"],
  },
  "application/vnd.stepmania.package": {
    "source": "iana",
    "extensions": ["smzip"],
  },
  "application/vnd.stepmania.stepchart": {
    "source": "iana",
    "extensions": ["sm"],
  },
  "application/vnd.street-stream": { "source": "iana" },
  "application/vnd.sun.wadl+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wadl"],
  },
  "application/vnd.sun.xml.calc": { "source": "apache", "extensions": ["sxc"] },
  "application/vnd.sun.xml.calc.template": {
    "source": "apache",
    "extensions": ["stc"],
  },
  "application/vnd.sun.xml.draw": { "source": "apache", "extensions": ["sxd"] },
  "application/vnd.sun.xml.draw.template": {
    "source": "apache",
    "extensions": ["std"],
  },
  "application/vnd.sun.xml.impress": {
    "source": "apache",
    "extensions": ["sxi"],
  },
  "application/vnd.sun.xml.impress.template": {
    "source": "apache",
    "extensions": ["sti"],
  },
  "application/vnd.sun.xml.math": { "source": "apache", "extensions": ["sxm"] },
  "application/vnd.sun.xml.writer": {
    "source": "apache",
    "extensions": ["sxw"],
  },
  "application/vnd.sun.xml.writer.global": {
    "source": "apache",
    "extensions": ["sxg"],
  },
  "application/vnd.sun.xml.writer.template": {
    "source": "apache",
    "extensions": ["stw"],
  },
  "application/vnd.sus-calendar": {
    "source": "iana",
    "extensions": ["sus", "susp"],
  },
  "application/vnd.svd": { "source": "iana", "extensions": ["svd"] },
  "application/vnd.swiftview-ics": { "source": "iana" },
  "application/vnd.sycle+xml": { "source": "iana", "compressible": true },
  "application/vnd.syft+json": { "source": "iana", "compressible": true },
  "application/vnd.symbian.install": {
    "source": "apache",
    "extensions": ["sis", "sisx"],
  },
  "application/vnd.syncml+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["xsm"],
  },
  "application/vnd.syncml.dm+wbxml": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["bdm"],
  },
  "application/vnd.syncml.dm+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["xdm"],
  },
  "application/vnd.syncml.dm.notification": { "source": "iana" },
  "application/vnd.syncml.dmddf+wbxml": { "source": "iana" },
  "application/vnd.syncml.dmddf+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["ddf"],
  },
  "application/vnd.syncml.dmtnds+wbxml": { "source": "iana" },
  "application/vnd.syncml.dmtnds+xml": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
  },
  "application/vnd.syncml.ds.notification": { "source": "iana" },
  "application/vnd.tableschema+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.tao.intent-module-archive": {
    "source": "iana",
    "extensions": ["tao"],
  },
  "application/vnd.tcpdump.pcap": {
    "source": "iana",
    "extensions": ["pcap", "cap", "dmp"],
  },
  "application/vnd.think-cell.ppttc+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.tml": { "source": "iana" },
  "application/vnd.tmobile-livetv": { "source": "iana", "extensions": ["tmo"] },
  "application/vnd.tri.onesource": { "source": "iana" },
  "application/vnd.trid.tpt": { "source": "iana", "extensions": ["tpt"] },
  "application/vnd.triscape.mxs": { "source": "iana", "extensions": ["mxs"] },
  "application/vnd.trueapp": { "source": "iana", "extensions": ["tra"] },
  "application/vnd.truedoc": { "source": "iana" },
  "application/vnd.ubisoft.webplayer": { "source": "iana" },
  "application/vnd.ufdl": { "source": "iana", "extensions": ["ufd", "ufdl"] },
  "application/vnd.uiq.theme": { "source": "iana", "extensions": ["utz"] },
  "application/vnd.umajin": { "source": "iana", "extensions": ["umj"] },
  "application/vnd.unity": { "source": "iana", "extensions": ["unityweb"] },
  "application/vnd.uoml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uoml"],
  },
  "application/vnd.uplanet.alert": { "source": "iana" },
  "application/vnd.uplanet.alert-wbxml": { "source": "iana" },
  "application/vnd.uplanet.bearer-choice": { "source": "iana" },
  "application/vnd.uplanet.bearer-choice-wbxml": { "source": "iana" },
  "application/vnd.uplanet.cacheop": { "source": "iana" },
  "application/vnd.uplanet.cacheop-wbxml": { "source": "iana" },
  "application/vnd.uplanet.channel": { "source": "iana" },
  "application/vnd.uplanet.channel-wbxml": { "source": "iana" },
  "application/vnd.uplanet.list": { "source": "iana" },
  "application/vnd.uplanet.list-wbxml": { "source": "iana" },
  "application/vnd.uplanet.listcmd": { "source": "iana" },
  "application/vnd.uplanet.listcmd-wbxml": { "source": "iana" },
  "application/vnd.uplanet.signal": { "source": "iana" },
  "application/vnd.uri-map": { "source": "iana" },
  "application/vnd.valve.source.material": { "source": "iana" },
  "application/vnd.vcx": { "source": "iana", "extensions": ["vcx"] },
  "application/vnd.vd-study": { "source": "iana" },
  "application/vnd.vectorworks": { "source": "iana" },
  "application/vnd.vel+json": { "source": "iana", "compressible": true },
  "application/vnd.verimatrix.vcas": { "source": "iana" },
  "application/vnd.veritone.aion+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/vnd.veryant.thin": { "source": "iana" },
  "application/vnd.ves.encrypted": { "source": "iana" },
  "application/vnd.vidsoft.vidconference": { "source": "iana" },
  "application/vnd.visio": {
    "source": "iana",
    "extensions": ["vsd", "vst", "vss", "vsw"],
  },
  "application/vnd.visionary": { "source": "iana", "extensions": ["vis"] },
  "application/vnd.vividence.scriptfile": { "source": "iana" },
  "application/vnd.vsf": { "source": "iana", "extensions": ["vsf"] },
  "application/vnd.wap.sic": { "source": "iana" },
  "application/vnd.wap.slc": { "source": "iana" },
  "application/vnd.wap.wbxml": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["wbxml"],
  },
  "application/vnd.wap.wmlc": { "source": "iana", "extensions": ["wmlc"] },
  "application/vnd.wap.wmlscriptc": {
    "source": "iana",
    "extensions": ["wmlsc"],
  },
  "application/vnd.webturbo": { "source": "iana", "extensions": ["wtb"] },
  "application/vnd.wfa.dpp": { "source": "iana" },
  "application/vnd.wfa.p2p": { "source": "iana" },
  "application/vnd.wfa.wsc": { "source": "iana" },
  "application/vnd.windows.devicepairing": { "source": "iana" },
  "application/vnd.wmc": { "source": "iana" },
  "application/vnd.wmf.bootstrap": { "source": "iana" },
  "application/vnd.wolfram.mathematica": { "source": "iana" },
  "application/vnd.wolfram.mathematica.package": { "source": "iana" },
  "application/vnd.wolfram.player": { "source": "iana", "extensions": ["nbp"] },
  "application/vnd.wordperfect": { "source": "iana", "extensions": ["wpd"] },
  "application/vnd.wqd": { "source": "iana", "extensions": ["wqd"] },
  "application/vnd.wrq-hp3000-labelled": { "source": "iana" },
  "application/vnd.wt.stf": { "source": "iana", "extensions": ["stf"] },
  "application/vnd.wv.csp+wbxml": { "source": "iana" },
  "application/vnd.wv.csp+xml": { "source": "iana", "compressible": true },
  "application/vnd.wv.ssp+xml": { "source": "iana", "compressible": true },
  "application/vnd.xacml+json": { "source": "iana", "compressible": true },
  "application/vnd.xara": { "source": "iana", "extensions": ["xar"] },
  "application/vnd.xfdl": { "source": "iana", "extensions": ["xfdl"] },
  "application/vnd.xfdl.webform": { "source": "iana" },
  "application/vnd.xmi+xml": { "source": "iana", "compressible": true },
  "application/vnd.xmpie.cpkg": { "source": "iana" },
  "application/vnd.xmpie.dpkg": { "source": "iana" },
  "application/vnd.xmpie.plan": { "source": "iana" },
  "application/vnd.xmpie.ppkg": { "source": "iana" },
  "application/vnd.xmpie.xlim": { "source": "iana" },
  "application/vnd.yamaha.hv-dic": { "source": "iana", "extensions": ["hvd"] },
  "application/vnd.yamaha.hv-script": {
    "source": "iana",
    "extensions": ["hvs"],
  },
  "application/vnd.yamaha.hv-voice": {
    "source": "iana",
    "extensions": ["hvp"],
  },
  "application/vnd.yamaha.openscoreformat": {
    "source": "iana",
    "extensions": ["osf"],
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["osfpvg"],
  },
  "application/vnd.yamaha.remote-setup": { "source": "iana" },
  "application/vnd.yamaha.smaf-audio": {
    "source": "iana",
    "extensions": ["saf"],
  },
  "application/vnd.yamaha.smaf-phrase": {
    "source": "iana",
    "extensions": ["spf"],
  },
  "application/vnd.yamaha.through-ngn": { "source": "iana" },
  "application/vnd.yamaha.tunnel-udpencap": { "source": "iana" },
  "application/vnd.yaoweme": { "source": "iana" },
  "application/vnd.yellowriver-custom-menu": {
    "source": "iana",
    "extensions": ["cmp"],
  },
  "application/vnd.youtube.yt": { "source": "iana" },
  "application/vnd.zul": { "source": "iana", "extensions": ["zir", "zirz"] },
  "application/vnd.zzazz.deck+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["zaz"],
  },
  "application/voicexml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vxml"],
  },
  "application/voucher-cms+json": { "source": "iana", "compressible": true },
  "application/vq-rtcpxr": { "source": "iana" },
  "application/wasm": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wasm"],
  },
  "application/watcherinfo+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wif"],
  },
  "application/webpush-options+json": {
    "source": "iana",
    "compressible": true,
  },
  "application/whoispp-query": { "source": "iana" },
  "application/whoispp-response": { "source": "iana" },
  "application/widget": { "source": "iana", "extensions": ["wgt"] },
  "application/winhlp": { "source": "apache", "extensions": ["hlp"] },
  "application/wita": { "source": "iana" },
  "application/wordperfect5.1": { "source": "iana" },
  "application/wsdl+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wsdl"],
  },
  "application/wspolicy+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["wspolicy"],
  },
  "application/x-7z-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["7z"],
  },
  "application/x-abiword": { "source": "apache", "extensions": ["abw"] },
  "application/x-ace-compressed": { "source": "apache", "extensions": ["ace"] },
  "application/x-amf": { "source": "apache" },
  "application/x-apple-diskimage": {
    "source": "apache",
    "extensions": ["dmg"],
  },
  "application/x-arj": { "compressible": false, "extensions": ["arj"] },
  "application/x-authorware-bin": {
    "source": "apache",
    "extensions": ["aab", "x32", "u32", "vox"],
  },
  "application/x-authorware-map": { "source": "apache", "extensions": ["aam"] },
  "application/x-authorware-seg": { "source": "apache", "extensions": ["aas"] },
  "application/x-bcpio": { "source": "apache", "extensions": ["bcpio"] },
  "application/x-bdoc": { "compressible": false, "extensions": ["bdoc"] },
  "application/x-bittorrent": { "source": "apache", "extensions": ["torrent"] },
  "application/x-blorb": { "source": "apache", "extensions": ["blb", "blorb"] },
  "application/x-bzip": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz"],
  },
  "application/x-bzip2": {
    "source": "apache",
    "compressible": false,
    "extensions": ["bz2", "boz"],
  },
  "application/x-cbr": {
    "source": "apache",
    "extensions": ["cbr", "cba", "cbt", "cbz", "cb7"],
  },
  "application/x-cdlink": { "source": "apache", "extensions": ["vcd"] },
  "application/x-cfs-compressed": { "source": "apache", "extensions": ["cfs"] },
  "application/x-chat": { "source": "apache", "extensions": ["chat"] },
  "application/x-chess-pgn": { "source": "apache", "extensions": ["pgn"] },
  "application/x-chrome-extension": { "extensions": ["crx"] },
  "application/x-cocoa": { "source": "nginx", "extensions": ["cco"] },
  "application/x-compress": { "source": "apache" },
  "application/x-conference": { "source": "apache", "extensions": ["nsc"] },
  "application/x-cpio": { "source": "apache", "extensions": ["cpio"] },
  "application/x-csh": { "source": "apache", "extensions": ["csh"] },
  "application/x-deb": { "compressible": false },
  "application/x-debian-package": {
    "source": "apache",
    "extensions": ["deb", "udeb"],
  },
  "application/x-dgc-compressed": { "source": "apache", "extensions": ["dgc"] },
  "application/x-director": {
    "source": "apache",
    "extensions": [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa",
    ],
  },
  "application/x-doom": { "source": "apache", "extensions": ["wad"] },
  "application/x-dtbncx+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ncx"],
  },
  "application/x-dtbook+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["dtb"],
  },
  "application/x-dtbresource+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["res"],
  },
  "application/x-dvi": {
    "source": "apache",
    "compressible": false,
    "extensions": ["dvi"],
  },
  "application/x-envoy": { "source": "apache", "extensions": ["evy"] },
  "application/x-eva": { "source": "apache", "extensions": ["eva"] },
  "application/x-font-bdf": { "source": "apache", "extensions": ["bdf"] },
  "application/x-font-dos": { "source": "apache" },
  "application/x-font-framemaker": { "source": "apache" },
  "application/x-font-ghostscript": {
    "source": "apache",
    "extensions": ["gsf"],
  },
  "application/x-font-libgrx": { "source": "apache" },
  "application/x-font-linux-psf": { "source": "apache", "extensions": ["psf"] },
  "application/x-font-pcf": { "source": "apache", "extensions": ["pcf"] },
  "application/x-font-snf": { "source": "apache", "extensions": ["snf"] },
  "application/x-font-speedo": { "source": "apache" },
  "application/x-font-sunos-news": { "source": "apache" },
  "application/x-font-type1": {
    "source": "apache",
    "extensions": ["pfa", "pfb", "pfm", "afm"],
  },
  "application/x-font-vfont": { "source": "apache" },
  "application/x-freearc": { "source": "apache", "extensions": ["arc"] },
  "application/x-futuresplash": { "source": "apache", "extensions": ["spl"] },
  "application/x-gca-compressed": { "source": "apache", "extensions": ["gca"] },
  "application/x-glulx": { "source": "apache", "extensions": ["ulx"] },
  "application/x-gnumeric": { "source": "apache", "extensions": ["gnumeric"] },
  "application/x-gramps-xml": { "source": "apache", "extensions": ["gramps"] },
  "application/x-gtar": { "source": "apache", "extensions": ["gtar"] },
  "application/x-gzip": { "source": "apache" },
  "application/x-hdf": { "source": "apache", "extensions": ["hdf"] },
  "application/x-httpd-php": { "compressible": true, "extensions": ["php"] },
  "application/x-install-instructions": {
    "source": "apache",
    "extensions": ["install"],
  },
  "application/x-iso9660-image": { "source": "apache", "extensions": ["iso"] },
  "application/x-iwork-keynote-sffkey": { "extensions": ["key"] },
  "application/x-iwork-numbers-sffnumbers": { "extensions": ["numbers"] },
  "application/x-iwork-pages-sffpages": { "extensions": ["pages"] },
  "application/x-java-archive-diff": {
    "source": "nginx",
    "extensions": ["jardiff"],
  },
  "application/x-java-jnlp-file": {
    "source": "apache",
    "compressible": false,
    "extensions": ["jnlp"],
  },
  "application/x-javascript": { "compressible": true },
  "application/x-keepass2": { "extensions": ["kdbx"] },
  "application/x-latex": {
    "source": "apache",
    "compressible": false,
    "extensions": ["latex"],
  },
  "application/x-lua-bytecode": { "extensions": ["luac"] },
  "application/x-lzh-compressed": {
    "source": "apache",
    "extensions": ["lzh", "lha"],
  },
  "application/x-makeself": { "source": "nginx", "extensions": ["run"] },
  "application/x-mie": { "source": "apache", "extensions": ["mie"] },
  "application/x-mobipocket-ebook": {
    "source": "apache",
    "extensions": ["prc", "mobi"],
  },
  "application/x-mpegurl": { "compressible": false },
  "application/x-ms-application": {
    "source": "apache",
    "extensions": ["application"],
  },
  "application/x-ms-shortcut": { "source": "apache", "extensions": ["lnk"] },
  "application/x-ms-wmd": { "source": "apache", "extensions": ["wmd"] },
  "application/x-ms-wmz": { "source": "apache", "extensions": ["wmz"] },
  "application/x-ms-xbap": { "source": "apache", "extensions": ["xbap"] },
  "application/x-msaccess": { "source": "apache", "extensions": ["mdb"] },
  "application/x-msbinder": { "source": "apache", "extensions": ["obd"] },
  "application/x-mscardfile": { "source": "apache", "extensions": ["crd"] },
  "application/x-msclip": { "source": "apache", "extensions": ["clp"] },
  "application/x-msdos-program": { "extensions": ["exe"] },
  "application/x-msdownload": {
    "source": "apache",
    "extensions": ["exe", "dll", "com", "bat", "msi"],
  },
  "application/x-msmediaview": {
    "source": "apache",
    "extensions": ["mvb", "m13", "m14"],
  },
  "application/x-msmetafile": {
    "source": "apache",
    "extensions": ["wmf", "wmz", "emf", "emz"],
  },
  "application/x-msmoney": { "source": "apache", "extensions": ["mny"] },
  "application/x-mspublisher": { "source": "apache", "extensions": ["pub"] },
  "application/x-msschedule": { "source": "apache", "extensions": ["scd"] },
  "application/x-msterminal": { "source": "apache", "extensions": ["trm"] },
  "application/x-mswrite": { "source": "apache", "extensions": ["wri"] },
  "application/x-netcdf": { "source": "apache", "extensions": ["nc", "cdf"] },
  "application/x-ns-proxy-autoconfig": {
    "compressible": true,
    "extensions": ["pac"],
  },
  "application/x-nzb": { "source": "apache", "extensions": ["nzb"] },
  "application/x-perl": { "source": "nginx", "extensions": ["pl", "pm"] },
  "application/x-pilot": { "source": "nginx", "extensions": ["prc", "pdb"] },
  "application/x-pkcs12": {
    "source": "apache",
    "compressible": false,
    "extensions": ["p12", "pfx"],
  },
  "application/x-pkcs7-certificates": {
    "source": "apache",
    "extensions": ["p7b", "spc"],
  },
  "application/x-pkcs7-certreqresp": {
    "source": "apache",
    "extensions": ["p7r"],
  },
  "application/x-pki-message": { "source": "iana" },
  "application/x-rar-compressed": {
    "source": "apache",
    "compressible": false,
    "extensions": ["rar"],
  },
  "application/x-redhat-package-manager": {
    "source": "nginx",
    "extensions": ["rpm"],
  },
  "application/x-research-info-systems": {
    "source": "apache",
    "extensions": ["ris"],
  },
  "application/x-sea": { "source": "nginx", "extensions": ["sea"] },
  "application/x-sh": {
    "source": "apache",
    "compressible": true,
    "extensions": ["sh"],
  },
  "application/x-shar": { "source": "apache", "extensions": ["shar"] },
  "application/x-shockwave-flash": {
    "source": "apache",
    "compressible": false,
    "extensions": ["swf"],
  },
  "application/x-silverlight-app": {
    "source": "apache",
    "extensions": ["xap"],
  },
  "application/x-sql": { "source": "apache", "extensions": ["sql"] },
  "application/x-stuffit": {
    "source": "apache",
    "compressible": false,
    "extensions": ["sit"],
  },
  "application/x-stuffitx": { "source": "apache", "extensions": ["sitx"] },
  "application/x-subrip": { "source": "apache", "extensions": ["srt"] },
  "application/x-sv4cpio": { "source": "apache", "extensions": ["sv4cpio"] },
  "application/x-sv4crc": { "source": "apache", "extensions": ["sv4crc"] },
  "application/x-t3vm-image": { "source": "apache", "extensions": ["t3"] },
  "application/x-tads": { "source": "apache", "extensions": ["gam"] },
  "application/x-tar": {
    "source": "apache",
    "compressible": true,
    "extensions": ["tar"],
  },
  "application/x-tcl": { "source": "apache", "extensions": ["tcl", "tk"] },
  "application/x-tex": { "source": "apache", "extensions": ["tex"] },
  "application/x-tex-tfm": { "source": "apache", "extensions": ["tfm"] },
  "application/x-texinfo": {
    "source": "apache",
    "extensions": ["texinfo", "texi"],
  },
  "application/x-tgif": { "source": "apache", "extensions": ["obj"] },
  "application/x-ustar": { "source": "apache", "extensions": ["ustar"] },
  "application/x-virtualbox-hdd": {
    "compressible": true,
    "extensions": ["hdd"],
  },
  "application/x-virtualbox-ova": {
    "compressible": true,
    "extensions": ["ova"],
  },
  "application/x-virtualbox-ovf": {
    "compressible": true,
    "extensions": ["ovf"],
  },
  "application/x-virtualbox-vbox": {
    "compressible": true,
    "extensions": ["vbox"],
  },
  "application/x-virtualbox-vbox-extpack": {
    "compressible": false,
    "extensions": ["vbox-extpack"],
  },
  "application/x-virtualbox-vdi": {
    "compressible": true,
    "extensions": ["vdi"],
  },
  "application/x-virtualbox-vhd": {
    "compressible": true,
    "extensions": ["vhd"],
  },
  "application/x-virtualbox-vmdk": {
    "compressible": true,
    "extensions": ["vmdk"],
  },
  "application/x-wais-source": { "source": "apache", "extensions": ["src"] },
  "application/x-web-app-manifest+json": {
    "compressible": true,
    "extensions": ["webapp"],
  },
  "application/x-www-form-urlencoded": {
    "source": "iana",
    "compressible": true,
  },
  "application/x-x509-ca-cert": {
    "source": "iana",
    "extensions": ["der", "crt", "pem"],
  },
  "application/x-x509-ca-ra-cert": { "source": "iana" },
  "application/x-x509-next-ca-cert": { "source": "iana" },
  "application/x-xfig": { "source": "apache", "extensions": ["fig"] },
  "application/x-xliff+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xlf"],
  },
  "application/x-xpinstall": {
    "source": "apache",
    "compressible": false,
    "extensions": ["xpi"],
  },
  "application/x-xz": { "source": "apache", "extensions": ["xz"] },
  "application/x-zmachine": {
    "source": "apache",
    "extensions": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  },
  "application/x400-bp": { "source": "iana" },
  "application/xacml+xml": { "source": "iana", "compressible": true },
  "application/xaml+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xaml"],
  },
  "application/xcap-att+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xav"],
  },
  "application/xcap-caps+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xca"],
  },
  "application/xcap-diff+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xdf"],
  },
  "application/xcap-el+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xel"],
  },
  "application/xcap-error+xml": { "source": "iana", "compressible": true },
  "application/xcap-ns+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xns"],
  },
  "application/xcon-conference-info+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/xcon-conference-info-diff+xml": {
    "source": "iana",
    "compressible": true,
  },
  "application/xenc+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xenc"],
  },
  "application/xhtml+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xhtml", "xht"],
  },
  "application/xhtml-voice+xml": { "source": "apache", "compressible": true },
  "application/xliff+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xlf"],
  },
  "application/xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xml", "xsl", "xsd", "rng"],
  },
  "application/xml-dtd": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dtd"],
  },
  "application/xml-external-parsed-entity": { "source": "iana" },
  "application/xml-patch+xml": { "source": "iana", "compressible": true },
  "application/xmpp+xml": { "source": "iana", "compressible": true },
  "application/xop+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xop"],
  },
  "application/xproc+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xpl"],
  },
  "application/xslt+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["xsl", "xslt"],
  },
  "application/xspf+xml": {
    "source": "apache",
    "compressible": true,
    "extensions": ["xspf"],
  },
  "application/xv+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["mxml", "xhvml", "xvml", "xvm"],
  },
  "application/yang": { "source": "iana", "extensions": ["yang"] },
  "application/yang-data+json": { "source": "iana", "compressible": true },
  "application/yang-data+xml": { "source": "iana", "compressible": true },
  "application/yang-patch+json": { "source": "iana", "compressible": true },
  "application/yang-patch+xml": { "source": "iana", "compressible": true },
  "application/yin+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["yin"],
  },
  "application/zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["zip"],
  },
  "application/zlib": { "source": "iana" },
  "application/zstd": { "source": "iana" },
  "audio/1d-interleaved-parityfec": { "source": "iana" },
  "audio/32kadpcm": { "source": "iana" },
  "audio/3gpp": {
    "source": "iana",
    "compressible": false,
    "extensions": ["3gpp"],
  },
  "audio/3gpp2": { "source": "iana" },
  "audio/aac": { "source": "iana" },
  "audio/ac3": { "source": "iana" },
  "audio/adpcm": { "source": "apache", "extensions": ["adp"] },
  "audio/amr": { "source": "iana", "extensions": ["amr"] },
  "audio/amr-wb": { "source": "iana" },
  "audio/amr-wb+": { "source": "iana" },
  "audio/aptx": { "source": "iana" },
  "audio/asc": { "source": "iana" },
  "audio/atrac-advanced-lossless": { "source": "iana" },
  "audio/atrac-x": { "source": "iana" },
  "audio/atrac3": { "source": "iana" },
  "audio/basic": {
    "source": "iana",
    "compressible": false,
    "extensions": ["au", "snd"],
  },
  "audio/bv16": { "source": "iana" },
  "audio/bv32": { "source": "iana" },
  "audio/clearmode": { "source": "iana" },
  "audio/cn": { "source": "iana" },
  "audio/dat12": { "source": "iana" },
  "audio/dls": { "source": "iana" },
  "audio/dsr-es201108": { "source": "iana" },
  "audio/dsr-es202050": { "source": "iana" },
  "audio/dsr-es202211": { "source": "iana" },
  "audio/dsr-es202212": { "source": "iana" },
  "audio/dv": { "source": "iana" },
  "audio/dvi4": { "source": "iana" },
  "audio/eac3": { "source": "iana" },
  "audio/encaprtp": { "source": "iana" },
  "audio/evrc": { "source": "iana" },
  "audio/evrc-qcp": { "source": "iana" },
  "audio/evrc0": { "source": "iana" },
  "audio/evrc1": { "source": "iana" },
  "audio/evrcb": { "source": "iana" },
  "audio/evrcb0": { "source": "iana" },
  "audio/evrcb1": { "source": "iana" },
  "audio/evrcnw": { "source": "iana" },
  "audio/evrcnw0": { "source": "iana" },
  "audio/evrcnw1": { "source": "iana" },
  "audio/evrcwb": { "source": "iana" },
  "audio/evrcwb0": { "source": "iana" },
  "audio/evrcwb1": { "source": "iana" },
  "audio/evs": { "source": "iana" },
  "audio/flexfec": { "source": "iana" },
  "audio/fwdred": { "source": "iana" },
  "audio/g711-0": { "source": "iana" },
  "audio/g719": { "source": "iana" },
  "audio/g722": { "source": "iana" },
  "audio/g7221": { "source": "iana" },
  "audio/g723": { "source": "iana" },
  "audio/g726-16": { "source": "iana" },
  "audio/g726-24": { "source": "iana" },
  "audio/g726-32": { "source": "iana" },
  "audio/g726-40": { "source": "iana" },
  "audio/g728": { "source": "iana" },
  "audio/g729": { "source": "iana" },
  "audio/g7291": { "source": "iana" },
  "audio/g729d": { "source": "iana" },
  "audio/g729e": { "source": "iana" },
  "audio/gsm": { "source": "iana" },
  "audio/gsm-efr": { "source": "iana" },
  "audio/gsm-hr-08": { "source": "iana" },
  "audio/ilbc": { "source": "iana" },
  "audio/ip-mr_v2.5": { "source": "iana" },
  "audio/isac": { "source": "apache" },
  "audio/l16": { "source": "iana" },
  "audio/l20": { "source": "iana" },
  "audio/l24": { "source": "iana", "compressible": false },
  "audio/l8": { "source": "iana" },
  "audio/lpc": { "source": "iana" },
  "audio/melp": { "source": "iana" },
  "audio/melp1200": { "source": "iana" },
  "audio/melp2400": { "source": "iana" },
  "audio/melp600": { "source": "iana" },
  "audio/mhas": { "source": "iana" },
  "audio/midi": {
    "source": "apache",
    "extensions": ["mid", "midi", "kar", "rmi"],
  },
  "audio/mobile-xmf": { "source": "iana", "extensions": ["mxmf"] },
  "audio/mp3": { "compressible": false, "extensions": ["mp3"] },
  "audio/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["m4a", "mp4a"],
  },
  "audio/mp4a-latm": { "source": "iana" },
  "audio/mpa": { "source": "iana" },
  "audio/mpa-robust": { "source": "iana" },
  "audio/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  },
  "audio/mpeg4-generic": { "source": "iana" },
  "audio/musepack": { "source": "apache" },
  "audio/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["oga", "ogg", "spx", "opus"],
  },
  "audio/opus": { "source": "iana" },
  "audio/parityfec": { "source": "iana" },
  "audio/pcma": { "source": "iana" },
  "audio/pcma-wb": { "source": "iana" },
  "audio/pcmu": { "source": "iana" },
  "audio/pcmu-wb": { "source": "iana" },
  "audio/prs.sid": { "source": "iana" },
  "audio/qcelp": { "source": "iana" },
  "audio/raptorfec": { "source": "iana" },
  "audio/red": { "source": "iana" },
  "audio/rtp-enc-aescm128": { "source": "iana" },
  "audio/rtp-midi": { "source": "iana" },
  "audio/rtploopback": { "source": "iana" },
  "audio/rtx": { "source": "iana" },
  "audio/s3m": { "source": "apache", "extensions": ["s3m"] },
  "audio/scip": { "source": "iana" },
  "audio/silk": { "source": "apache", "extensions": ["sil"] },
  "audio/smv": { "source": "iana" },
  "audio/smv-qcp": { "source": "iana" },
  "audio/smv0": { "source": "iana" },
  "audio/sofa": { "source": "iana" },
  "audio/sp-midi": { "source": "iana" },
  "audio/speex": { "source": "iana" },
  "audio/t140c": { "source": "iana" },
  "audio/t38": { "source": "iana" },
  "audio/telephone-event": { "source": "iana" },
  "audio/tetra_acelp": { "source": "iana" },
  "audio/tetra_acelp_bb": { "source": "iana" },
  "audio/tone": { "source": "iana" },
  "audio/tsvcis": { "source": "iana" },
  "audio/uemclip": { "source": "iana" },
  "audio/ulpfec": { "source": "iana" },
  "audio/usac": { "source": "iana" },
  "audio/vdvi": { "source": "iana" },
  "audio/vmr-wb": { "source": "iana" },
  "audio/vnd.3gpp.iufp": { "source": "iana" },
  "audio/vnd.4sb": { "source": "iana" },
  "audio/vnd.audiokoz": { "source": "iana" },
  "audio/vnd.celp": { "source": "iana" },
  "audio/vnd.cisco.nse": { "source": "iana" },
  "audio/vnd.cmles.radio-events": { "source": "iana" },
  "audio/vnd.cns.anp1": { "source": "iana" },
  "audio/vnd.cns.inf1": { "source": "iana" },
  "audio/vnd.dece.audio": { "source": "iana", "extensions": ["uva", "uvva"] },
  "audio/vnd.digital-winds": { "source": "iana", "extensions": ["eol"] },
  "audio/vnd.dlna.adts": { "source": "iana" },
  "audio/vnd.dolby.heaac.1": { "source": "iana" },
  "audio/vnd.dolby.heaac.2": { "source": "iana" },
  "audio/vnd.dolby.mlp": { "source": "iana" },
  "audio/vnd.dolby.mps": { "source": "iana" },
  "audio/vnd.dolby.pl2": { "source": "iana" },
  "audio/vnd.dolby.pl2x": { "source": "iana" },
  "audio/vnd.dolby.pl2z": { "source": "iana" },
  "audio/vnd.dolby.pulse.1": { "source": "iana" },
  "audio/vnd.dra": { "source": "iana", "extensions": ["dra"] },
  "audio/vnd.dts": { "source": "iana", "extensions": ["dts"] },
  "audio/vnd.dts.hd": { "source": "iana", "extensions": ["dtshd"] },
  "audio/vnd.dts.uhd": { "source": "iana" },
  "audio/vnd.dvb.file": { "source": "iana" },
  "audio/vnd.everad.plj": { "source": "iana" },
  "audio/vnd.hns.audio": { "source": "iana" },
  "audio/vnd.lucent.voice": { "source": "iana", "extensions": ["lvp"] },
  "audio/vnd.ms-playready.media.pya": {
    "source": "iana",
    "extensions": ["pya"],
  },
  "audio/vnd.nokia.mobile-xmf": { "source": "iana" },
  "audio/vnd.nortel.vbk": { "source": "iana" },
  "audio/vnd.nuera.ecelp4800": {
    "source": "iana",
    "extensions": ["ecelp4800"],
  },
  "audio/vnd.nuera.ecelp7470": {
    "source": "iana",
    "extensions": ["ecelp7470"],
  },
  "audio/vnd.nuera.ecelp9600": {
    "source": "iana",
    "extensions": ["ecelp9600"],
  },
  "audio/vnd.octel.sbc": { "source": "iana" },
  "audio/vnd.presonus.multitrack": { "source": "iana" },
  "audio/vnd.qcelp": { "source": "iana" },
  "audio/vnd.rhetorex.32kadpcm": { "source": "iana" },
  "audio/vnd.rip": { "source": "iana", "extensions": ["rip"] },
  "audio/vnd.rn-realaudio": { "compressible": false },
  "audio/vnd.sealedmedia.softseal.mpeg": { "source": "iana" },
  "audio/vnd.vmx.cvsd": { "source": "iana" },
  "audio/vnd.wave": { "compressible": false },
  "audio/vorbis": { "source": "iana", "compressible": false },
  "audio/vorbis-config": { "source": "iana" },
  "audio/wav": { "compressible": false, "extensions": ["wav"] },
  "audio/wave": { "compressible": false, "extensions": ["wav"] },
  "audio/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["weba"],
  },
  "audio/x-aac": {
    "source": "apache",
    "compressible": false,
    "extensions": ["aac"],
  },
  "audio/x-aiff": { "source": "apache", "extensions": ["aif", "aiff", "aifc"] },
  "audio/x-caf": {
    "source": "apache",
    "compressible": false,
    "extensions": ["caf"],
  },
  "audio/x-flac": { "source": "apache", "extensions": ["flac"] },
  "audio/x-m4a": { "source": "nginx", "extensions": ["m4a"] },
  "audio/x-matroska": { "source": "apache", "extensions": ["mka"] },
  "audio/x-mpegurl": { "source": "apache", "extensions": ["m3u"] },
  "audio/x-ms-wax": { "source": "apache", "extensions": ["wax"] },
  "audio/x-ms-wma": { "source": "apache", "extensions": ["wma"] },
  "audio/x-pn-realaudio": { "source": "apache", "extensions": ["ram", "ra"] },
  "audio/x-pn-realaudio-plugin": { "source": "apache", "extensions": ["rmp"] },
  "audio/x-realaudio": { "source": "nginx", "extensions": ["ra"] },
  "audio/x-tta": { "source": "apache" },
  "audio/x-wav": { "source": "apache", "extensions": ["wav"] },
  "audio/xm": { "source": "apache", "extensions": ["xm"] },
  "chemical/x-cdx": { "source": "apache", "extensions": ["cdx"] },
  "chemical/x-cif": { "source": "apache", "extensions": ["cif"] },
  "chemical/x-cmdf": { "source": "apache", "extensions": ["cmdf"] },
  "chemical/x-cml": { "source": "apache", "extensions": ["cml"] },
  "chemical/x-csml": { "source": "apache", "extensions": ["csml"] },
  "chemical/x-pdb": { "source": "apache" },
  "chemical/x-xyz": { "source": "apache", "extensions": ["xyz"] },
  "font/collection": { "source": "iana", "extensions": ["ttc"] },
  "font/otf": { "source": "iana", "compressible": true, "extensions": ["otf"] },
  "font/sfnt": { "source": "iana" },
  "font/ttf": { "source": "iana", "compressible": true, "extensions": ["ttf"] },
  "font/woff": { "source": "iana", "extensions": ["woff"] },
  "font/woff2": { "source": "iana", "extensions": ["woff2"] },
  "image/aces": { "source": "iana", "extensions": ["exr"] },
  "image/apng": { "compressible": false, "extensions": ["apng"] },
  "image/avci": { "source": "iana", "extensions": ["avci"] },
  "image/avcs": { "source": "iana", "extensions": ["avcs"] },
  "image/avif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["avif"],
  },
  "image/bmp": {
    "source": "iana",
    "compressible": true,
    "extensions": ["bmp"],
  },
  "image/cgm": { "source": "iana", "extensions": ["cgm"] },
  "image/dicom-rle": { "source": "iana", "extensions": ["drle"] },
  "image/emf": { "source": "iana", "extensions": ["emf"] },
  "image/fits": { "source": "iana", "extensions": ["fits"] },
  "image/g3fax": { "source": "iana", "extensions": ["g3"] },
  "image/gif": {
    "source": "iana",
    "compressible": false,
    "extensions": ["gif"],
  },
  "image/heic": { "source": "iana", "extensions": ["heic"] },
  "image/heic-sequence": { "source": "iana", "extensions": ["heics"] },
  "image/heif": { "source": "iana", "extensions": ["heif"] },
  "image/heif-sequence": { "source": "iana", "extensions": ["heifs"] },
  "image/hej2k": { "source": "iana", "extensions": ["hej2"] },
  "image/hsj2": { "source": "iana", "extensions": ["hsj2"] },
  "image/ief": { "source": "iana", "extensions": ["ief"] },
  "image/jls": { "source": "iana", "extensions": ["jls"] },
  "image/jp2": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jp2", "jpg2"],
  },
  "image/jpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpeg", "jpg", "jpe"],
  },
  "image/jph": { "source": "iana", "extensions": ["jph"] },
  "image/jphc": { "source": "iana", "extensions": ["jhc"] },
  "image/jpm": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpm"],
  },
  "image/jpx": {
    "source": "iana",
    "compressible": false,
    "extensions": ["jpx", "jpf"],
  },
  "image/jxr": { "source": "iana", "extensions": ["jxr"] },
  "image/jxra": { "source": "iana", "extensions": ["jxra"] },
  "image/jxrs": { "source": "iana", "extensions": ["jxrs"] },
  "image/jxs": { "source": "iana", "extensions": ["jxs"] },
  "image/jxsc": { "source": "iana", "extensions": ["jxsc"] },
  "image/jxsi": { "source": "iana", "extensions": ["jxsi"] },
  "image/jxss": { "source": "iana", "extensions": ["jxss"] },
  "image/ktx": { "source": "iana", "extensions": ["ktx"] },
  "image/ktx2": { "source": "iana", "extensions": ["ktx2"] },
  "image/naplps": { "source": "iana" },
  "image/pjpeg": { "compressible": false },
  "image/png": {
    "source": "iana",
    "compressible": false,
    "extensions": ["png"],
  },
  "image/prs.btif": { "source": "iana", "extensions": ["btif"] },
  "image/prs.pti": { "source": "iana", "extensions": ["pti"] },
  "image/pwg-raster": { "source": "iana" },
  "image/sgi": { "source": "apache", "extensions": ["sgi"] },
  "image/svg+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["svg", "svgz"],
  },
  "image/t38": { "source": "iana", "extensions": ["t38"] },
  "image/tiff": {
    "source": "iana",
    "compressible": false,
    "extensions": ["tif", "tiff"],
  },
  "image/tiff-fx": { "source": "iana", "extensions": ["tfx"] },
  "image/vnd.adobe.photoshop": {
    "source": "iana",
    "compressible": true,
    "extensions": ["psd"],
  },
  "image/vnd.airzip.accelerator.azv": {
    "source": "iana",
    "extensions": ["azv"],
  },
  "image/vnd.cns.inf2": { "source": "iana" },
  "image/vnd.dece.graphic": {
    "source": "iana",
    "extensions": ["uvi", "uvvi", "uvg", "uvvg"],
  },
  "image/vnd.djvu": { "source": "iana", "extensions": ["djvu", "djv"] },
  "image/vnd.dvb.subtitle": { "source": "iana", "extensions": ["sub"] },
  "image/vnd.dwg": { "source": "iana", "extensions": ["dwg"] },
  "image/vnd.dxf": { "source": "iana", "extensions": ["dxf"] },
  "image/vnd.fastbidsheet": { "source": "iana", "extensions": ["fbs"] },
  "image/vnd.fpx": { "source": "iana", "extensions": ["fpx"] },
  "image/vnd.fst": { "source": "iana", "extensions": ["fst"] },
  "image/vnd.fujixerox.edmics-mmr": { "source": "iana", "extensions": ["mmr"] },
  "image/vnd.fujixerox.edmics-rlc": { "source": "iana", "extensions": ["rlc"] },
  "image/vnd.globalgraphics.pgb": { "source": "iana" },
  "image/vnd.microsoft.icon": {
    "source": "iana",
    "compressible": true,
    "extensions": ["ico"],
  },
  "image/vnd.mix": { "source": "iana" },
  "image/vnd.mozilla.apng": { "source": "iana" },
  "image/vnd.ms-dds": { "compressible": true, "extensions": ["dds"] },
  "image/vnd.ms-modi": { "source": "iana", "extensions": ["mdi"] },
  "image/vnd.ms-photo": { "source": "apache", "extensions": ["wdp"] },
  "image/vnd.net-fpx": { "source": "iana", "extensions": ["npx"] },
  "image/vnd.pco.b16": { "source": "iana", "extensions": ["b16"] },
  "image/vnd.radiance": { "source": "iana" },
  "image/vnd.sealed.png": { "source": "iana" },
  "image/vnd.sealedmedia.softseal.gif": { "source": "iana" },
  "image/vnd.sealedmedia.softseal.jpg": { "source": "iana" },
  "image/vnd.svf": { "source": "iana" },
  "image/vnd.tencent.tap": { "source": "iana", "extensions": ["tap"] },
  "image/vnd.valve.source.texture": { "source": "iana", "extensions": ["vtf"] },
  "image/vnd.wap.wbmp": { "source": "iana", "extensions": ["wbmp"] },
  "image/vnd.xiff": { "source": "iana", "extensions": ["xif"] },
  "image/vnd.zbrush.pcx": { "source": "iana", "extensions": ["pcx"] },
  "image/webp": { "source": "apache", "extensions": ["webp"] },
  "image/wmf": { "source": "iana", "extensions": ["wmf"] },
  "image/x-3ds": { "source": "apache", "extensions": ["3ds"] },
  "image/x-cmu-raster": { "source": "apache", "extensions": ["ras"] },
  "image/x-cmx": { "source": "apache", "extensions": ["cmx"] },
  "image/x-freehand": {
    "source": "apache",
    "extensions": ["fh", "fhc", "fh4", "fh5", "fh7"],
  },
  "image/x-icon": {
    "source": "apache",
    "compressible": true,
    "extensions": ["ico"],
  },
  "image/x-jng": { "source": "nginx", "extensions": ["jng"] },
  "image/x-mrsid-image": { "source": "apache", "extensions": ["sid"] },
  "image/x-ms-bmp": {
    "source": "nginx",
    "compressible": true,
    "extensions": ["bmp"],
  },
  "image/x-pcx": { "source": "apache", "extensions": ["pcx"] },
  "image/x-pict": { "source": "apache", "extensions": ["pic", "pct"] },
  "image/x-portable-anymap": { "source": "apache", "extensions": ["pnm"] },
  "image/x-portable-bitmap": { "source": "apache", "extensions": ["pbm"] },
  "image/x-portable-graymap": { "source": "apache", "extensions": ["pgm"] },
  "image/x-portable-pixmap": { "source": "apache", "extensions": ["ppm"] },
  "image/x-rgb": { "source": "apache", "extensions": ["rgb"] },
  "image/x-tga": { "source": "apache", "extensions": ["tga"] },
  "image/x-xbitmap": { "source": "apache", "extensions": ["xbm"] },
  "image/x-xcf": { "compressible": false },
  "image/x-xpixmap": { "source": "apache", "extensions": ["xpm"] },
  "image/x-xwindowdump": { "source": "apache", "extensions": ["xwd"] },
  "message/cpim": { "source": "iana" },
  "message/delivery-status": { "source": "iana" },
  "message/disposition-notification": {
    "source": "iana",
    "extensions": ["disposition-notification"],
  },
  "message/external-body": { "source": "iana" },
  "message/feedback-report": { "source": "iana" },
  "message/global": { "source": "iana", "extensions": ["u8msg"] },
  "message/global-delivery-status": {
    "source": "iana",
    "extensions": ["u8dsn"],
  },
  "message/global-disposition-notification": {
    "source": "iana",
    "extensions": ["u8mdn"],
  },
  "message/global-headers": { "source": "iana", "extensions": ["u8hdr"] },
  "message/http": { "source": "iana", "compressible": false },
  "message/imdn+xml": { "source": "iana", "compressible": true },
  "message/news": { "source": "iana" },
  "message/partial": { "source": "iana", "compressible": false },
  "message/rfc822": {
    "source": "iana",
    "compressible": true,
    "extensions": ["eml", "mime"],
  },
  "message/s-http": { "source": "iana" },
  "message/sip": { "source": "iana" },
  "message/sipfrag": { "source": "iana" },
  "message/tracking-status": { "source": "iana" },
  "message/vnd.si.simp": { "source": "iana" },
  "message/vnd.wfa.wsc": { "source": "iana", "extensions": ["wsc"] },
  "model/3mf": { "source": "iana", "extensions": ["3mf"] },
  "model/e57": { "source": "iana" },
  "model/gltf+json": {
    "source": "iana",
    "compressible": true,
    "extensions": ["gltf"],
  },
  "model/gltf-binary": {
    "source": "iana",
    "compressible": true,
    "extensions": ["glb"],
  },
  "model/iges": {
    "source": "iana",
    "compressible": false,
    "extensions": ["igs", "iges"],
  },
  "model/mesh": {
    "source": "iana",
    "compressible": false,
    "extensions": ["msh", "mesh", "silo"],
  },
  "model/mtl": { "source": "iana", "extensions": ["mtl"] },
  "model/obj": { "source": "iana", "extensions": ["obj"] },
  "model/step": { "source": "iana" },
  "model/step+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["stpx"],
  },
  "model/step+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["stpz"],
  },
  "model/step-xml+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["stpxz"],
  },
  "model/stl": { "source": "iana", "extensions": ["stl"] },
  "model/vnd.collada+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["dae"],
  },
  "model/vnd.dwf": { "source": "iana", "extensions": ["dwf"] },
  "model/vnd.flatland.3dml": { "source": "iana" },
  "model/vnd.gdl": { "source": "iana", "extensions": ["gdl"] },
  "model/vnd.gs-gdl": { "source": "apache" },
  "model/vnd.gs.gdl": { "source": "iana" },
  "model/vnd.gtw": { "source": "iana", "extensions": ["gtw"] },
  "model/vnd.moml+xml": { "source": "iana", "compressible": true },
  "model/vnd.mts": { "source": "iana", "extensions": ["mts"] },
  "model/vnd.opengex": { "source": "iana", "extensions": ["ogex"] },
  "model/vnd.parasolid.transmit.binary": {
    "source": "iana",
    "extensions": ["x_b"],
  },
  "model/vnd.parasolid.transmit.text": {
    "source": "iana",
    "extensions": ["x_t"],
  },
  "model/vnd.pytha.pyox": { "source": "iana" },
  "model/vnd.rosette.annotated-data-model": { "source": "iana" },
  "model/vnd.sap.vds": { "source": "iana", "extensions": ["vds"] },
  "model/vnd.usdz+zip": {
    "source": "iana",
    "compressible": false,
    "extensions": ["usdz"],
  },
  "model/vnd.valve.source.compiled-map": {
    "source": "iana",
    "extensions": ["bsp"],
  },
  "model/vnd.vtu": { "source": "iana", "extensions": ["vtu"] },
  "model/vrml": {
    "source": "iana",
    "compressible": false,
    "extensions": ["wrl", "vrml"],
  },
  "model/x3d+binary": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3db", "x3dbz"],
  },
  "model/x3d+fastinfoset": { "source": "iana", "extensions": ["x3db"] },
  "model/x3d+vrml": {
    "source": "apache",
    "compressible": false,
    "extensions": ["x3dv", "x3dvz"],
  },
  "model/x3d+xml": {
    "source": "iana",
    "compressible": true,
    "extensions": ["x3d", "x3dz"],
  },
  "model/x3d-vrml": { "source": "iana", "extensions": ["x3dv"] },
  "multipart/alternative": { "source": "iana", "compressible": false },
  "multipart/appledouble": { "source": "iana" },
  "multipart/byteranges": { "source": "iana" },
  "multipart/digest": { "source": "iana" },
  "multipart/encrypted": { "source": "iana", "compressible": false },
  "multipart/form-data": { "source": "iana", "compressible": false },
  "multipart/header-set": { "source": "iana" },
  "multipart/mixed": { "source": "iana" },
  "multipart/multilingual": { "source": "iana" },
  "multipart/parallel": { "source": "iana" },
  "multipart/related": { "source": "iana", "compressible": false },
  "multipart/report": { "source": "iana" },
  "multipart/signed": { "source": "iana", "compressible": false },
  "multipart/vnd.bint.med-plus": { "source": "iana" },
  "multipart/voice-message": { "source": "iana" },
  "multipart/x-mixed-replace": { "source": "iana" },
  "text/1d-interleaved-parityfec": { "source": "iana" },
  "text/cache-manifest": {
    "source": "iana",
    "compressible": true,
    "extensions": ["appcache", "manifest"],
  },
  "text/calendar": { "source": "iana", "extensions": ["ics", "ifb"] },
  "text/calender": { "compressible": true },
  "text/cmd": { "compressible": true },
  "text/coffeescript": { "extensions": ["coffee", "litcoffee"] },
  "text/cql": { "source": "iana" },
  "text/cql-expression": { "source": "iana" },
  "text/cql-identifier": { "source": "iana" },
  "text/css": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["css"],
  },
  "text/csv": { "source": "iana", "compressible": true, "extensions": ["csv"] },
  "text/csv-schema": { "source": "iana" },
  "text/directory": { "source": "iana" },
  "text/dns": { "source": "iana" },
  "text/ecmascript": { "source": "iana" },
  "text/encaprtp": { "source": "iana" },
  "text/enriched": { "source": "iana" },
  "text/fhirpath": { "source": "iana" },
  "text/flexfec": { "source": "iana" },
  "text/fwdred": { "source": "iana" },
  "text/gff3": { "source": "iana" },
  "text/grammar-ref-list": { "source": "iana" },
  "text/html": {
    "source": "iana",
    "compressible": true,
    "extensions": ["html", "htm", "shtml"],
  },
  "text/jade": { "extensions": ["jade"] },
  "text/javascript": { "source": "iana", "compressible": true },
  "text/jcr-cnd": { "source": "iana" },
  "text/jsx": { "compressible": true, "extensions": ["jsx"] },
  "text/less": { "compressible": true, "extensions": ["less"] },
  "text/markdown": {
    "source": "iana",
    "compressible": true,
    "extensions": ["markdown", "md"],
  },
  "text/mathml": { "source": "nginx", "extensions": ["mml"] },
  "text/mdx": { "compressible": true, "extensions": ["mdx"] },
  "text/mizar": { "source": "iana" },
  "text/n3": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["n3"],
  },
  "text/parameters": { "source": "iana", "charset": "UTF-8" },
  "text/parityfec": { "source": "iana" },
  "text/plain": {
    "source": "iana",
    "compressible": true,
    "extensions": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  },
  "text/provenance-notation": { "source": "iana", "charset": "UTF-8" },
  "text/prs.fallenstein.rst": { "source": "iana" },
  "text/prs.lines.tag": { "source": "iana", "extensions": ["dsc"] },
  "text/prs.prop.logic": { "source": "iana" },
  "text/raptorfec": { "source": "iana" },
  "text/red": { "source": "iana" },
  "text/rfc822-headers": { "source": "iana" },
  "text/richtext": {
    "source": "iana",
    "compressible": true,
    "extensions": ["rtx"],
  },
  "text/rtf": { "source": "iana", "compressible": true, "extensions": ["rtf"] },
  "text/rtp-enc-aescm128": { "source": "iana" },
  "text/rtploopback": { "source": "iana" },
  "text/rtx": { "source": "iana" },
  "text/sgml": { "source": "iana", "extensions": ["sgml", "sgm"] },
  "text/shaclc": { "source": "iana" },
  "text/shex": { "source": "iana", "extensions": ["shex"] },
  "text/slim": { "extensions": ["slim", "slm"] },
  "text/spdx": { "source": "iana", "extensions": ["spdx"] },
  "text/strings": { "source": "iana" },
  "text/stylus": { "extensions": ["stylus", "styl"] },
  "text/t140": { "source": "iana" },
  "text/tab-separated-values": {
    "source": "iana",
    "compressible": true,
    "extensions": ["tsv"],
  },
  "text/troff": {
    "source": "iana",
    "extensions": ["t", "tr", "roff", "man", "me", "ms"],
  },
  "text/turtle": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["ttl"],
  },
  "text/ulpfec": { "source": "iana" },
  "text/uri-list": {
    "source": "iana",
    "compressible": true,
    "extensions": ["uri", "uris", "urls"],
  },
  "text/vcard": {
    "source": "iana",
    "compressible": true,
    "extensions": ["vcard"],
  },
  "text/vnd.a": { "source": "iana" },
  "text/vnd.abc": { "source": "iana" },
  "text/vnd.ascii-art": { "source": "iana" },
  "text/vnd.curl": { "source": "iana", "extensions": ["curl"] },
  "text/vnd.curl.dcurl": { "source": "apache", "extensions": ["dcurl"] },
  "text/vnd.curl.mcurl": { "source": "apache", "extensions": ["mcurl"] },
  "text/vnd.curl.scurl": { "source": "apache", "extensions": ["scurl"] },
  "text/vnd.debian.copyright": { "source": "iana", "charset": "UTF-8" },
  "text/vnd.dmclientscript": { "source": "iana" },
  "text/vnd.dvb.subtitle": { "source": "iana", "extensions": ["sub"] },
  "text/vnd.esmertec.theme-descriptor": {
    "source": "iana",
    "charset": "UTF-8",
  },
  "text/vnd.familysearch.gedcom": { "source": "iana", "extensions": ["ged"] },
  "text/vnd.ficlab.flt": { "source": "iana" },
  "text/vnd.fly": { "source": "iana", "extensions": ["fly"] },
  "text/vnd.fmi.flexstor": { "source": "iana", "extensions": ["flx"] },
  "text/vnd.gml": { "source": "iana" },
  "text/vnd.graphviz": { "source": "iana", "extensions": ["gv"] },
  "text/vnd.hans": { "source": "iana" },
  "text/vnd.hgl": { "source": "iana" },
  "text/vnd.in3d.3dml": { "source": "iana", "extensions": ["3dml"] },
  "text/vnd.in3d.spot": { "source": "iana", "extensions": ["spot"] },
  "text/vnd.iptc.newsml": { "source": "iana" },
  "text/vnd.iptc.nitf": { "source": "iana" },
  "text/vnd.latex-z": { "source": "iana" },
  "text/vnd.motorola.reflex": { "source": "iana" },
  "text/vnd.ms-mediapackage": { "source": "iana" },
  "text/vnd.net2phone.commcenter.command": { "source": "iana" },
  "text/vnd.radisys.msml-basic-layout": { "source": "iana" },
  "text/vnd.senx.warpscript": { "source": "iana" },
  "text/vnd.si.uricatalogue": { "source": "iana" },
  "text/vnd.sosi": { "source": "iana" },
  "text/vnd.sun.j2me.app-descriptor": {
    "source": "iana",
    "charset": "UTF-8",
    "extensions": ["jad"],
  },
  "text/vnd.trolltech.linguist": { "source": "iana", "charset": "UTF-8" },
  "text/vnd.wap.si": { "source": "iana" },
  "text/vnd.wap.sl": { "source": "iana" },
  "text/vnd.wap.wml": { "source": "iana", "extensions": ["wml"] },
  "text/vnd.wap.wmlscript": { "source": "iana", "extensions": ["wmls"] },
  "text/vtt": {
    "source": "iana",
    "charset": "UTF-8",
    "compressible": true,
    "extensions": ["vtt"],
  },
  "text/x-asm": { "source": "apache", "extensions": ["s", "asm"] },
  "text/x-c": {
    "source": "apache",
    "extensions": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  },
  "text/x-component": { "source": "nginx", "extensions": ["htc"] },
  "text/x-fortran": {
    "source": "apache",
    "extensions": ["f", "for", "f77", "f90"],
  },
  "text/x-gwt-rpc": { "compressible": true },
  "text/x-handlebars-template": { "extensions": ["hbs"] },
  "text/x-java-source": { "source": "apache", "extensions": ["java"] },
  "text/x-jquery-tmpl": { "compressible": true },
  "text/x-lua": { "extensions": ["lua"] },
  "text/x-markdown": { "compressible": true, "extensions": ["mkd"] },
  "text/x-nfo": { "source": "apache", "extensions": ["nfo"] },
  "text/x-opml": { "source": "apache", "extensions": ["opml"] },
  "text/x-org": { "compressible": true, "extensions": ["org"] },
  "text/x-pascal": { "source": "apache", "extensions": ["p", "pas"] },
  "text/x-processing": { "compressible": true, "extensions": ["pde"] },
  "text/x-sass": { "extensions": ["sass"] },
  "text/x-scss": { "extensions": ["scss"] },
  "text/x-setext": { "source": "apache", "extensions": ["etx"] },
  "text/x-sfv": { "source": "apache", "extensions": ["sfv"] },
  "text/x-suse-ymp": { "compressible": true, "extensions": ["ymp"] },
  "text/x-uuencode": { "source": "apache", "extensions": ["uu"] },
  "text/x-vcalendar": { "source": "apache", "extensions": ["vcs"] },
  "text/x-vcard": { "source": "apache", "extensions": ["vcf"] },
  "text/xml": { "source": "iana", "compressible": true, "extensions": ["xml"] },
  "text/xml-external-parsed-entity": { "source": "iana" },
  "text/yaml": { "compressible": true, "extensions": ["yaml", "yml"] },
  "video/1d-interleaved-parityfec": { "source": "iana" },
  "video/3gpp": { "source": "iana", "extensions": ["3gp", "3gpp"] },
  "video/3gpp-tt": { "source": "iana" },
  "video/3gpp2": { "source": "iana", "extensions": ["3g2"] },
  "video/av1": { "source": "iana" },
  "video/bmpeg": { "source": "iana" },
  "video/bt656": { "source": "iana" },
  "video/celb": { "source": "iana" },
  "video/dv": { "source": "iana" },
  "video/encaprtp": { "source": "iana" },
  "video/ffv1": { "source": "iana" },
  "video/flexfec": { "source": "iana" },
  "video/h261": { "source": "iana", "extensions": ["h261"] },
  "video/h263": { "source": "iana", "extensions": ["h263"] },
  "video/h263-1998": { "source": "iana" },
  "video/h263-2000": { "source": "iana" },
  "video/h264": { "source": "iana", "extensions": ["h264"] },
  "video/h264-rcdo": { "source": "iana" },
  "video/h264-svc": { "source": "iana" },
  "video/h265": { "source": "iana" },
  "video/iso.segment": { "source": "iana", "extensions": ["m4s"] },
  "video/jpeg": { "source": "iana", "extensions": ["jpgv"] },
  "video/jpeg2000": { "source": "iana" },
  "video/jpm": { "source": "apache", "extensions": ["jpm", "jpgm"] },
  "video/jxsv": { "source": "iana" },
  "video/mj2": { "source": "iana", "extensions": ["mj2", "mjp2"] },
  "video/mp1s": { "source": "iana" },
  "video/mp2p": { "source": "iana" },
  "video/mp2t": { "source": "iana", "extensions": ["ts"] },
  "video/mp4": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mp4", "mp4v", "mpg4"],
  },
  "video/mp4v-es": { "source": "iana" },
  "video/mpeg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  },
  "video/mpeg4-generic": { "source": "iana" },
  "video/mpv": { "source": "iana" },
  "video/nv": { "source": "iana" },
  "video/ogg": {
    "source": "iana",
    "compressible": false,
    "extensions": ["ogv"],
  },
  "video/parityfec": { "source": "iana" },
  "video/pointer": { "source": "iana" },
  "video/quicktime": {
    "source": "iana",
    "compressible": false,
    "extensions": ["qt", "mov"],
  },
  "video/raptorfec": { "source": "iana" },
  "video/raw": { "source": "iana" },
  "video/rtp-enc-aescm128": { "source": "iana" },
  "video/rtploopback": { "source": "iana" },
  "video/rtx": { "source": "iana" },
  "video/scip": { "source": "iana" },
  "video/smpte291": { "source": "iana" },
  "video/smpte292m": { "source": "iana" },
  "video/ulpfec": { "source": "iana" },
  "video/vc1": { "source": "iana" },
  "video/vc2": { "source": "iana" },
  "video/vnd.cctv": { "source": "iana" },
  "video/vnd.dece.hd": { "source": "iana", "extensions": ["uvh", "uvvh"] },
  "video/vnd.dece.mobile": { "source": "iana", "extensions": ["uvm", "uvvm"] },
  "video/vnd.dece.mp4": { "source": "iana" },
  "video/vnd.dece.pd": { "source": "iana", "extensions": ["uvp", "uvvp"] },
  "video/vnd.dece.sd": { "source": "iana", "extensions": ["uvs", "uvvs"] },
  "video/vnd.dece.video": { "source": "iana", "extensions": ["uvv", "uvvv"] },
  "video/vnd.directv.mpeg": { "source": "iana" },
  "video/vnd.directv.mpeg-tts": { "source": "iana" },
  "video/vnd.dlna.mpeg-tts": { "source": "iana" },
  "video/vnd.dvb.file": { "source": "iana", "extensions": ["dvb"] },
  "video/vnd.fvt": { "source": "iana", "extensions": ["fvt"] },
  "video/vnd.hns.video": { "source": "iana" },
  "video/vnd.iptvforum.1dparityfec-1010": { "source": "iana" },
  "video/vnd.iptvforum.1dparityfec-2005": { "source": "iana" },
  "video/vnd.iptvforum.2dparityfec-1010": { "source": "iana" },
  "video/vnd.iptvforum.2dparityfec-2005": { "source": "iana" },
  "video/vnd.iptvforum.ttsavc": { "source": "iana" },
  "video/vnd.iptvforum.ttsmpeg2": { "source": "iana" },
  "video/vnd.motorola.video": { "source": "iana" },
  "video/vnd.motorola.videop": { "source": "iana" },
  "video/vnd.mpegurl": { "source": "iana", "extensions": ["mxu", "m4u"] },
  "video/vnd.ms-playready.media.pyv": {
    "source": "iana",
    "extensions": ["pyv"],
  },
  "video/vnd.nokia.interleaved-multimedia": { "source": "iana" },
  "video/vnd.nokia.mp4vr": { "source": "iana" },
  "video/vnd.nokia.videovoip": { "source": "iana" },
  "video/vnd.objectvideo": { "source": "iana" },
  "video/vnd.radgamettools.bink": { "source": "iana" },
  "video/vnd.radgamettools.smacker": { "source": "iana" },
  "video/vnd.sealed.mpeg1": { "source": "iana" },
  "video/vnd.sealed.mpeg4": { "source": "iana" },
  "video/vnd.sealed.swf": { "source": "iana" },
  "video/vnd.sealedmedia.softseal.mov": { "source": "iana" },
  "video/vnd.uvvu.mp4": { "source": "iana", "extensions": ["uvu", "uvvu"] },
  "video/vnd.vivo": { "source": "iana", "extensions": ["viv"] },
  "video/vnd.youtube.yt": { "source": "iana" },
  "video/vp8": { "source": "iana" },
  "video/vp9": { "source": "iana" },
  "video/webm": {
    "source": "apache",
    "compressible": false,
    "extensions": ["webm"],
  },
  "video/x-f4v": { "source": "apache", "extensions": ["f4v"] },
  "video/x-fli": { "source": "apache", "extensions": ["fli"] },
  "video/x-flv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["flv"],
  },
  "video/x-m4v": { "source": "apache", "extensions": ["m4v"] },
  "video/x-matroska": {
    "source": "apache",
    "compressible": false,
    "extensions": ["mkv", "mk3d", "mks"],
  },
  "video/x-mng": { "source": "apache", "extensions": ["mng"] },
  "video/x-ms-asf": { "source": "apache", "extensions": ["asf", "asx"] },
  "video/x-ms-vob": { "source": "apache", "extensions": ["vob"] },
  "video/x-ms-wm": { "source": "apache", "extensions": ["wm"] },
  "video/x-ms-wmv": {
    "source": "apache",
    "compressible": false,
    "extensions": ["wmv"],
  },
  "video/x-ms-wmx": { "source": "apache", "extensions": ["wmx"] },
  "video/x-ms-wvx": { "source": "apache", "extensions": ["wvx"] },
  "video/x-msvideo": { "source": "apache", "extensions": ["avi"] },
  "video/x-sgi-movie": { "source": "apache", "extensions": ["movie"] },
  "video/x-smv": { "source": "apache", "extensions": ["smv"] },
  "x-conference/x-cooltalk": { "source": "apache", "extensions": ["ice"] },
  "x-shader/x-fragment": { "compressible": true },
  "x-shader/x-vertex": { "compressible": true },
};
const types = new Map();
(function populateMaps() {
  const preference = ["nginx", "apache", undefined, "iana"];
  for (const type of Object.keys(__default)) {
    const mime = __default[type];
    const exts = mime.extensions;
    if (!exts || !exts.length) continue;
    extensions.set(type, exts);
    for (const ext of exts) {
      const current = types.get(ext);
      if (current) {
        const from = preference.indexOf(__default[current].source);
        const to = preference.indexOf(mime.source);
        if (
          current !== "application/octet-stream" &&
          (from > to || from === to && current.startsWith("application/"))
        ) continue;
      }
      types.set(ext, type);
    }
  }
})();
new TextEncoder();
new TextEncoder().encode("0123456789abcdef");
new TextEncoder();
new TextDecoder();
const reservedCharMap = {
  "&": "\\x26",
  "!": "\\x21",
  "#": "\\x23",
  "$": "\\$",
  "%": "\\x25",
  "*": "\\*",
  "+": "\\+",
  ",": "\\x2c",
  ".": "\\.",
  ":": "\\x3a",
  ";": "\\x3b",
  "<": "\\x3c",
  "=": "\\x3d",
  ">": "\\x3e",
  "?": "\\?",
  "@": "\\x40",
  "^": "\\^",
  "`": "\\x60",
  "~": "\\x7e",
  "(": "\\(",
  ")": "\\)",
  "[": "\\[",
  "]": "\\]",
  "{": "\\{",
  "}": "\\}",
  "/": "\\/",
  "-": "\\x2d",
  "\\": "\\\\",
  "|": "\\|",
};
new RegExp(`[${Object.values(reservedCharMap).join("")}]`, "gu");
const originalJSONParse = globalThis.JSON.parse;
class JSONCParser {
  #whitespace = new Set(" 	\r\n");
  #numberEndToken = new Set([..."[]{}:,/", ...this.#whitespace]);
  #text;
  #length;
  #tokenized;
  #options;
  constructor(text, options) {
    this.#text = `${text}`;
    this.#length = this.#text.length;
    this.#tokenized = this.#tokenize();
    this.#options = options;
  }
  parse() {
    const token = this.#getNext();
    const res = this.#parseJsonValue(token);
    const { done, value } = this.#tokenized.next();
    if (!done) throw new SyntaxError(buildErrorMessage(value));
    return res;
  }
  #getNext() {
    const { done, value } = this.#tokenized.next();
    if (done) throw new SyntaxError("Unexpected end of JSONC input");
    return value;
  }
  *#tokenize() {
    for (let i = 0; i < this.#length; i++) {
      if (this.#whitespace.has(this.#text[i])) continue;
      if (this.#text[i] === "/" && this.#text[i + 1] === "*") {
        i += 2;
        let hasEndOfComment = false;
        for (; i < this.#length; i++) {
          if (this.#text[i] === "*" && this.#text[i + 1] === "/") {
            hasEndOfComment = true;
            break;
          }
        }
        if (!hasEndOfComment) {
          throw new SyntaxError("Unexpected end of JSONC input");
        }
        i++;
        continue;
      }
      if (this.#text[i] === "/" && this.#text[i + 1] === "/") {
        i += 2;
        for (; i < this.#length; i++) {
          if (this.#text[i] === "\n" || this.#text[i] === "\r") break;
        }
        continue;
      }
      switch (this.#text[i]) {
        case "{":
          yield { type: "BeginObject", position: i };
          break;
        case "}":
          yield { type: "EndObject", position: i };
          break;
        case "[":
          yield { type: "BeginArray", position: i };
          break;
        case "]":
          yield { type: "EndArray", position: i };
          break;
        case ":":
          yield { type: "NameSeparator", position: i };
          break;
        case ",":
          yield { type: "ValueSeparator", position: i };
          break;
        case '"': {
          const startIndex = i;
          let shouldEscapeNext = false;
          i++;
          for (; i < this.#length; i++) {
            if (this.#text[i] === '"' && !shouldEscapeNext) break;
            shouldEscapeNext = this.#text[i] === "\\" && !shouldEscapeNext;
          }
          yield {
            type: "String",
            sourceText: this.#text.substring(startIndex, i + 1),
            position: startIndex,
          };
          break;
        }
        default: {
          const startIndex = i;
          for (; i < this.#length; i++) {
            if (this.#numberEndToken.has(this.#text[i])) break;
          }
          i--;
          yield {
            type: "NullOrTrueOrFalseOrNumber",
            sourceText: this.#text.substring(startIndex, i + 1),
            position: startIndex,
          };
        }
      }
    }
  }
  #parseJsonValue(value) {
    switch (value.type) {
      case "BeginObject":
        return this.#parseObject();
      case "BeginArray":
        return this.#parseArray();
      case "NullOrTrueOrFalseOrNumber":
        return this.#parseNullOrTrueOrFalseOrNumber(value);
      case "String":
        return this.#parseString(value);
      default:
        throw new SyntaxError(buildErrorMessage(value));
    }
  }
  #parseObject() {
    const target = {};
    for (let isFirst = true;; isFirst = false) {
      const token1 = this.#getNext();
      if (
        (isFirst || this.#options.allowTrailingComma) &&
        token1.type === "EndObject"
      ) return target;
      if (token1.type !== "String") {
        throw new SyntaxError(buildErrorMessage(token1));
      }
      const key = this.#parseString(token1);
      const token2 = this.#getNext();
      if (token2.type !== "NameSeparator") {
        throw new SyntaxError(buildErrorMessage(token2));
      }
      const token3 = this.#getNext();
      Object.defineProperty(target, key, {
        value: this.#parseJsonValue(token3),
        writable: true,
        enumerable: true,
        configurable: true,
      });
      const token4 = this.#getNext();
      if (token4.type === "EndObject") return target;
      if (token4.type !== "ValueSeparator") {
        throw new SyntaxError(buildErrorMessage(token4));
      }
    }
  }
  #parseArray() {
    const target = [];
    for (let isFirst = true;; isFirst = false) {
      const token1 = this.#getNext();
      if (
        (isFirst || this.#options.allowTrailingComma) &&
        token1.type === "EndArray"
      ) return target;
      target.push(this.#parseJsonValue(token1));
      const token2 = this.#getNext();
      if (token2.type === "EndArray") return target;
      if (token2.type !== "ValueSeparator") {
        throw new SyntaxError(buildErrorMessage(token2));
      }
    }
  }
  #parseString(value) {
    let parsed;
    try {
      parsed = originalJSONParse(value.sourceText);
    } catch {
      throw new SyntaxError(buildErrorMessage(value));
    }
    assert(typeof parsed === "string");
    return parsed;
  }
  #parseNullOrTrueOrFalseOrNumber(value) {
    if (value.sourceText === "null") return null;
    if (value.sourceText === "true") return true;
    if (value.sourceText === "false") return false;
    let parsed;
    try {
      parsed = originalJSONParse(value.sourceText);
    } catch {
      throw new SyntaxError(buildErrorMessage(value));
    }
    assert(typeof parsed === "number");
    return parsed;
  }
}
function buildErrorMessage({ type, sourceText, position }) {
  let token = "";
  switch (type) {
    case "BeginObject":
      token = "{";
      break;
    case "EndObject":
      token = "}";
      break;
    case "BeginArray":
      token = "[";
      break;
    case "EndArray":
      token = "]";
      break;
    case "NameSeparator":
      token = ":";
      break;
    case "ValueSeparator":
      token = ",";
      break;
    case "NullOrTrueOrFalseOrNumber":
    case "String":
      token = 30 < sourceText.length
        ? `${sourceText.slice(0, 30)}...`
        : sourceText;
      break;
    default:
      throw new Error("unreachable");
  }
  return `Unexpected token ${token} in JSONC at position ${position}`;
}
new Set([
  "animation-iteration-count",
  "border-image-outset",
  "border-image-slice",
  "border-image-width",
  "box-flex",
  "box-flex-group",
  "box-ordinal-group",
  "column-count",
  "fill-opacity",
  "flex",
  "flex-grow",
  "flex-negative",
  "flex-order",
  "flex-positive",
  "flex-shrink",
  "flood-opacity",
  "font-weight",
  "grid-column",
  "grid-row",
  "line-clamp",
  "line-height",
  "opacity",
  "order",
  "orphans",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "widows",
  "z-index",
  "zoom",
]);
Array.isArray, Object.assign;
new Set([
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
var DiffType;
(function (DiffType) {
  DiffType["removed"] = "removed";
  DiffType["common"] = "common";
  DiffType["added"] = "added";
})(DiffType || (DiffType = {}));
var P1 = Object.create;
var o = Object.defineProperty;
var A1 = Object.getOwnPropertyDescriptor;
var k = Object.getOwnPropertyNames;
var K2 = Object.getPrototypeOf, N = Object.prototype.hasOwnProperty;
var l = (u, e) => () => (e || u((e = { exports: {} }).exports, e), e.exports),
  M1 = (u, e) => {
    for (var a in e) o(u, a, { get: e[a], enumerable: !0 });
  },
  s = (u, e, a, f) => {
    if (e && typeof e == "object" || typeof e == "function") {
      for (let d of k(e)) {
        !N.call(u, d) && d !== a && o(u, d, {
          get: () => e[d],
          enumerable: !(f = A1(e, d)) || f.enumerable,
        });
      }
    }
    return u;
  },
  r = (u, e, a) => (s(u, e, "default"), a && s(a, e, "default")),
  I2 = (
    u,
    e,
    a,
  ) => (a = u != null ? P1(K2(u)) : {},
    s(
      e || !u || !u.__esModule
        ? o(a, "default", { value: u, enumerable: !0 })
        : a,
      u,
    ));
var g = l((i) => {
  "use strict";
  Object.defineProperty(i, "__esModule", { value: !0 });
  i.isIdentifierChar = m;
  i.isIdentifierName = z;
  i.isIdentifierStart = R;
  var v =
      "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
    h =
      "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･",
    q = new RegExp("[" + v + "]"),
    E = new RegExp("[" + v + h + "]");
  v = h = null;
  var W = [
      0,
      11,
      2,
      25,
      2,
      18,
      2,
      1,
      2,
      14,
      3,
      13,
      35,
      122,
      70,
      52,
      268,
      28,
      4,
      48,
      48,
      31,
      14,
      29,
      6,
      37,
      11,
      29,
      3,
      35,
      5,
      7,
      2,
      4,
      43,
      157,
      19,
      35,
      5,
      35,
      5,
      39,
      9,
      51,
      13,
      10,
      2,
      14,
      2,
      6,
      2,
      1,
      2,
      10,
      2,
      14,
      2,
      6,
      2,
      1,
      68,
      310,
      10,
      21,
      11,
      7,
      25,
      5,
      2,
      41,
      2,
      8,
      70,
      5,
      3,
      0,
      2,
      43,
      2,
      1,
      4,
      0,
      3,
      22,
      11,
      22,
      10,
      30,
      66,
      18,
      2,
      1,
      11,
      21,
      11,
      25,
      71,
      55,
      7,
      1,
      65,
      0,
      16,
      3,
      2,
      2,
      2,
      28,
      43,
      28,
      4,
      28,
      36,
      7,
      2,
      27,
      28,
      53,
      11,
      21,
      11,
      18,
      14,
      17,
      111,
      72,
      56,
      50,
      14,
      50,
      14,
      35,
      349,
      41,
      7,
      1,
      79,
      28,
      11,
      0,
      9,
      21,
      43,
      17,
      47,
      20,
      28,
      22,
      13,
      52,
      58,
      1,
      3,
      0,
      14,
      44,
      33,
      24,
      27,
      35,
      30,
      0,
      3,
      0,
      9,
      34,
      4,
      0,
      13,
      47,
      15,
      3,
      22,
      0,
      2,
      0,
      36,
      17,
      2,
      24,
      20,
      1,
      64,
      6,
      2,
      0,
      2,
      3,
      2,
      14,
      2,
      9,
      8,
      46,
      39,
      7,
      3,
      1,
      3,
      21,
      2,
      6,
      2,
      1,
      2,
      4,
      4,
      0,
      19,
      0,
      13,
      4,
      159,
      52,
      19,
      3,
      21,
      2,
      31,
      47,
      21,
      1,
      2,
      0,
      185,
      46,
      42,
      3,
      37,
      47,
      21,
      0,
      60,
      42,
      14,
      0,
      72,
      26,
      38,
      6,
      186,
      43,
      117,
      63,
      32,
      7,
      3,
      0,
      3,
      7,
      2,
      1,
      2,
      23,
      16,
      0,
      2,
      0,
      95,
      7,
      3,
      38,
      17,
      0,
      2,
      0,
      29,
      0,
      11,
      39,
      8,
      0,
      22,
      0,
      12,
      45,
      20,
      0,
      19,
      72,
      264,
      8,
      2,
      36,
      18,
      0,
      50,
      29,
      113,
      6,
      2,
      1,
      2,
      37,
      22,
      0,
      26,
      5,
      2,
      1,
      2,
      31,
      15,
      0,
      328,
      18,
      16,
      0,
      2,
      12,
      2,
      33,
      125,
      0,
      80,
      921,
      103,
      110,
      18,
      195,
      2637,
      96,
      16,
      1071,
      18,
      5,
      4026,
      582,
      8634,
      568,
      8,
      30,
      18,
      78,
      18,
      29,
      19,
      47,
      17,
      3,
      32,
      20,
      6,
      18,
      689,
      63,
      129,
      74,
      6,
      0,
      67,
      12,
      65,
      1,
      2,
      0,
      29,
      6135,
      9,
      1237,
      43,
      8,
      8936,
      3,
      2,
      6,
      2,
      1,
      2,
      290,
      16,
      0,
      30,
      2,
      3,
      0,
      15,
      3,
      9,
      395,
      2309,
      106,
      6,
      12,
      4,
      8,
      8,
      9,
      5991,
      84,
      2,
      70,
      2,
      1,
      3,
      0,
      3,
      1,
      3,
      3,
      2,
      11,
      2,
      0,
      2,
      6,
      2,
      64,
      2,
      3,
      3,
      7,
      2,
      6,
      2,
      27,
      2,
      3,
      2,
      4,
      2,
      0,
      4,
      6,
      2,
      339,
      3,
      24,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      30,
      2,
      24,
      2,
      7,
      1845,
      30,
      7,
      5,
      262,
      61,
      147,
      44,
      11,
      6,
      17,
      0,
      322,
      29,
      19,
      43,
      485,
      27,
      757,
      6,
      2,
      3,
      2,
      1,
      2,
      14,
      2,
      196,
      60,
      67,
      8,
      0,
      1205,
      3,
      2,
      26,
      2,
      1,
      2,
      0,
      3,
      0,
      2,
      9,
      2,
      3,
      2,
      0,
      2,
      0,
      7,
      0,
      5,
      0,
      2,
      0,
      2,
      0,
      2,
      2,
      2,
      1,
      2,
      0,
      3,
      0,
      2,
      0,
      2,
      0,
      2,
      0,
      2,
      0,
      2,
      1,
      2,
      0,
      3,
      3,
      2,
      6,
      2,
      3,
      2,
      3,
      2,
      0,
      2,
      9,
      2,
      16,
      6,
      2,
      2,
      4,
      2,
      16,
      4421,
      42719,
      33,
      4153,
      7,
      221,
      3,
      5761,
      15,
      7472,
      16,
      621,
      2467,
      541,
      1507,
      4938,
      6,
      4191,
    ],
    F = [
      509,
      0,
      227,
      0,
      150,
      4,
      294,
      9,
      1368,
      2,
      2,
      1,
      6,
      3,
      41,
      2,
      5,
      0,
      166,
      1,
      574,
      3,
      9,
      9,
      370,
      1,
      81,
      2,
      71,
      10,
      50,
      3,
      123,
      2,
      54,
      14,
      32,
      10,
      3,
      1,
      11,
      3,
      46,
      10,
      8,
      0,
      46,
      9,
      7,
      2,
      37,
      13,
      2,
      9,
      6,
      1,
      45,
      0,
      13,
      2,
      49,
      13,
      9,
      3,
      2,
      11,
      83,
      11,
      7,
      0,
      3,
      0,
      158,
      11,
      6,
      9,
      7,
      3,
      56,
      1,
      2,
      6,
      3,
      1,
      3,
      2,
      10,
      0,
      11,
      1,
      3,
      6,
      4,
      4,
      193,
      17,
      10,
      9,
      5,
      0,
      82,
      19,
      13,
      9,
      214,
      6,
      3,
      8,
      28,
      1,
      83,
      16,
      16,
      9,
      82,
      12,
      9,
      9,
      84,
      14,
      5,
      9,
      243,
      14,
      166,
      9,
      71,
      5,
      2,
      1,
      3,
      3,
      2,
      0,
      2,
      1,
      13,
      9,
      120,
      6,
      3,
      6,
      4,
      0,
      29,
      9,
      41,
      6,
      2,
      3,
      9,
      0,
      10,
      10,
      47,
      15,
      406,
      7,
      2,
      7,
      17,
      9,
      57,
      21,
      2,
      13,
      123,
      5,
      4,
      0,
      2,
      1,
      2,
      6,
      2,
      0,
      9,
      9,
      49,
      4,
      2,
      1,
      2,
      4,
      9,
      9,
      330,
      3,
      10,
      1,
      2,
      0,
      49,
      6,
      4,
      4,
      14,
      9,
      5351,
      0,
      7,
      14,
      13835,
      9,
      87,
      9,
      39,
      4,
      60,
      6,
      26,
      9,
      1014,
      0,
      2,
      54,
      8,
      3,
      82,
      0,
      12,
      1,
      19628,
      1,
      4706,
      45,
      3,
      22,
      543,
      4,
      4,
      5,
      9,
      7,
      3,
      6,
      31,
      3,
      149,
      2,
      1418,
      49,
      513,
      54,
      5,
      49,
      9,
      0,
      15,
      0,
      23,
      4,
      2,
      14,
      1361,
      6,
      2,
      16,
      3,
      6,
      2,
      1,
      2,
      4,
      101,
      0,
      161,
      6,
      10,
      9,
      357,
      0,
      62,
      13,
      499,
      13,
      983,
      6,
      110,
      6,
      6,
      9,
      4759,
      9,
      787719,
      239,
    ];
  function S(u, e) {
    let a = 65536;
    for (let f = 0, d = e.length; f < d; f += 2) {
      if (a += e[f], a > u) return !1;
      if (a += e[f + 1], a >= u) return !0;
    }
    return !1;
  }
  function R(u) {
    return u < 65
      ? u === 36
      : u <= 90
      ? !0
      : u < 97
      ? u === 95
      : u <= 122
      ? !0
      : u <= 65535
      ? u >= 170 && q.test(String.fromCharCode(u))
      : S(u, W);
  }
  function m(u) {
    return u < 48
      ? u === 36
      : u < 58
      ? !0
      : u < 65
      ? !1
      : u <= 90
      ? !0
      : u < 97
      ? u === 95
      : u <= 122
      ? !0
      : u <= 65535
      ? u >= 170 && E.test(String.fromCharCode(u))
      : S(u, W) || S(u, F);
  }
  function z(u) {
    let e = !0;
    for (let a = 0; a < u.length; a++) {
      let f = u.charCodeAt(a);
      if ((f & 64512) === 55296 && a + 1 < u.length) {
        let d = u.charCodeAt(++a);
        (d & 64512) === 56320 && (f = 65536 + ((f & 1023) << 10) + (d & 1023));
      }
      if (e) {
        if (e = !1, !R(f)) return !1;
        else if (!m(f)) return !1;
      }
    }
    return !e;
  }
});
var _ = l((t) => {
  "use strict";
  Object.defineProperty(t, "__esModule", { value: !0 });
  t.isKeyword = L;
  t.isReservedWord = C;
  t.isStrictBindOnlyReservedWord = O;
  t.isStrictBindReservedWord = J;
  t.isStrictReservedWord = w;
  var y = {
      keyword: [
        "break",
        "case",
        "catch",
        "continue",
        "debugger",
        "default",
        "do",
        "else",
        "finally",
        "for",
        "function",
        "if",
        "return",
        "switch",
        "throw",
        "try",
        "var",
        "const",
        "while",
        "with",
        "new",
        "this",
        "super",
        "class",
        "extends",
        "export",
        "import",
        "null",
        "true",
        "false",
        "in",
        "instanceof",
        "typeof",
        "void",
        "delete",
      ],
      strict: [
        "implements",
        "interface",
        "let",
        "package",
        "private",
        "protected",
        "public",
        "static",
        "yield",
      ],
      strictBind: ["eval", "arguments"],
    },
    D = new Set(y.keyword),
    G = new Set(y.strict),
    H = new Set(y.strictBind);
  function C(u, e) {
    return e && u === "await" || u === "enum";
  }
  function w(u, e) {
    return C(u, e) || G.has(u);
  }
  function O(u) {
    return H.has(u);
  }
  function J(u, e) {
    return w(u, e) || O(u);
  }
  function L(u) {
    return D.has(u);
  }
});
var x = l((c) => {
  "use strict";
  Object.defineProperty(c, "__esModule", { value: !0 });
  Object.defineProperty(c, "isIdentifierChar", {
    enumerable: !0,
    get: function () {
      return p.isIdentifierChar;
    },
  });
  Object.defineProperty(c, "isIdentifierName", {
    enumerable: !0,
    get: function () {
      return p.isIdentifierName;
    },
  });
  Object.defineProperty(c, "isIdentifierStart", {
    enumerable: !0,
    get: function () {
      return p.isIdentifierStart;
    },
  });
  Object.defineProperty(c, "isKeyword", {
    enumerable: !0,
    get: function () {
      return n.isKeyword;
    },
  });
  Object.defineProperty(c, "isReservedWord", {
    enumerable: !0,
    get: function () {
      return n.isReservedWord;
    },
  });
  Object.defineProperty(c, "isStrictBindOnlyReservedWord", {
    enumerable: !0,
    get: function () {
      return n.isStrictBindOnlyReservedWord;
    },
  });
  Object.defineProperty(c, "isStrictBindReservedWord", {
    enumerable: !0,
    get: function () {
      return n.isStrictBindReservedWord;
    },
  });
  Object.defineProperty(c, "isStrictReservedWord", {
    enumerable: !0,
    get: function () {
      return n.isStrictReservedWord;
    },
  });
  var p = g(), n = _();
});
var b2 = {};
M1(b2, {
  __esModule: () => Q,
  default: () => au,
  isIdentifierChar: () => T1,
  isIdentifierName: () => U,
  isIdentifierStart: () => V,
  isKeyword: () => X1,
  isReservedWord: () => Y1,
  isStrictBindOnlyReservedWord: () => Z1,
  isStrictBindReservedWord: () => $1,
  isStrictReservedWord: () => uu,
});
var j1 = I2(x());
r(b2, I2(x()));
var {
    __esModule: Q,
    isIdentifierChar: T1,
    isIdentifierName: U,
    isIdentifierStart: V,
    isKeyword: X1,
    isReservedWord: Y1,
    isStrictBindOnlyReservedWord: Z1,
    isStrictBindReservedWord: $1,
    isStrictReservedWord: uu,
  } = j1,
  { default: B1, ...eu } = j1,
  au = B1 !== void 0 ? B1 : eu;
async function ensureDir(dir) {
  try {
    await Deno.mkdir(dir, { recursive: true });
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) throw err;
    const fileInfo = await Deno.lstat(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${
          getFileInfoType(fileInfo)
        }'`,
      );
    }
  }
}
function ensureDirSync(dir) {
  try {
    Deno.mkdirSync(dir, { recursive: true });
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) throw err;
    const fileInfo = Deno.lstatSync(dir);
    if (!fileInfo.isDirectory) {
      throw new Error(
        `Ensure path exists, expected 'dir', got '${
          getFileInfoType(fileInfo)
        }'`,
      );
    }
  }
}
async function ensureFile(filePath) {
  try {
    const stat = await Deno.lstat(filePath);
    if (!stat.isFile) {
      throw new Error(
        `Ensure path exists, expected 'file', got '${getFileInfoType(stat)}'`,
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      await ensureDir(dirname2(toPathString(filePath)));
      await Deno.writeFile(filePath, new Uint8Array());
      return;
    }
    throw err;
  }
}
function ensureFileSync(filePath) {
  try {
    const stat = Deno.lstatSync(filePath);
    if (!stat.isFile) {
      throw new Error(
        `Ensure path exists, expected 'file', got '${getFileInfoType(stat)}'`,
      );
    }
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      ensureDirSync(dirname2(toPathString(filePath)));
      Deno.writeFileSync(filePath, new Uint8Array());
      return;
    }
    throw err;
  }
}
const SNAPSHOT_DIR = "__snapshots__";
const SNAPSHOT_EXT = "snap";
function getErrorMessage(message, options) {
  return typeof options.msg === "string" ? options.msg : message;
}
function escapeStringForJs(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}
let _mode;
function getMode(options) {
  if (options.mode) return options.mode;
  else if (_mode) return _mode;
  else {
    _mode = Deno.args.some((arg) => arg === "--update" || arg === "-u")
      ? "update"
      : "assert";
    return _mode;
  }
}
function getIsUpdate(options) {
  return getMode(options) === "update";
}
class AssertSnapshotContext {
  static contexts = new Map();
  static fromOptions(testContext, options) {
    let path;
    const testFilePath = fromFileUrl2(testContext.origin);
    const { dir, base } = parse2(testFilePath);
    if (options.path) path = resolve2(dir, options.path);
    else if (options.dir) {
      path = resolve2(dir, options.dir, `${base}.${SNAPSHOT_EXT}`);
    } else path = resolve2(dir, SNAPSHOT_DIR, `${base}.${SNAPSHOT_EXT}`);
    let context = this.contexts.get(path);
    if (context) return context;
    context = new this(toFileUrl2(path));
    this.contexts.set(path, context);
    return context;
  }
  #teardownRegistered = false;
  #currentSnapshots;
  #updatedSnapshots = new Map();
  #snapshotCounts = new Map();
  #snapshotsUpdated = new Array();
  #snapshotFileUrl;
  snapshotUpdateQueue = new Array();
  constructor(snapshotFileUrl) {
    this.#snapshotFileUrl = snapshotFileUrl;
  }
  #getCurrentSnapshotsInitialized() {
    assert(
      this.#currentSnapshots,
      "Snapshot was not initialized. This is a bug in `assertSnapshot`.",
    );
    return this.#currentSnapshots;
  }
  #teardown = () => {
    const buf = ["export const snapshot = {};"];
    const currentSnapshots = this.#getCurrentSnapshotsInitialized();
    const currentSnapshotNames = Array.from(currentSnapshots.keys());
    const removedSnapshotNames = currentSnapshotNames.filter((name) =>
      !this.snapshotUpdateQueue.includes(name)
    );
    this.snapshotUpdateQueue.forEach((name) => {
      const updatedSnapshot = this.#updatedSnapshots.get(name);
      const currentSnapshot = currentSnapshots.get(name);
      let formattedSnapshot;
      if (typeof updatedSnapshot === "string") {
        formattedSnapshot = updatedSnapshot;
      } else if (typeof currentSnapshot === "string") {
        formattedSnapshot = currentSnapshot;
      } else return;
      formattedSnapshot = escapeStringForJs(formattedSnapshot);
      formattedSnapshot = formattedSnapshot.includes("\n")
        ? `
${formattedSnapshot}
`
        : formattedSnapshot;
      const formattedName = escapeStringForJs(name);
      buf.push(`
snapshot[\`${formattedName}\`] = \`${formattedSnapshot}\`;`);
    });
    const snapshotFilePath = fromFileUrl2(this.#snapshotFileUrl);
    ensureFileSync(snapshotFilePath);
    Deno.writeTextFileSync(snapshotFilePath, buf.join("\n") + "\n");
    const updated = this.getUpdatedCount();
    if (updated > 0) {
      console.log(green(bold(`
 > ${updated} ${updated === 1 ? "snapshot" : "snapshots"} updated.`)));
    }
    const removed = removedSnapshotNames.length;
    if (removed > 0) {
      console.log(red(bold(`
 > ${removed} ${removed === 1 ? "snapshot" : "snapshots"} removed.`)));
      for (const snapshotName of removedSnapshotNames) {
        console.log(red(bold(`   • ${snapshotName}`)));
      }
    }
  };
  async #readSnapshotFile(options) {
    if (this.#currentSnapshots) return this.#currentSnapshots;
    if (getIsUpdate(options)) {
      await ensureFile(fromFileUrl2(this.#snapshotFileUrl));
    }
    try {
      const snapshotFileUrl = this.#snapshotFileUrl.toString();
      const { snapshot } = await import(snapshotFileUrl);
      this.#currentSnapshots = typeof snapshot === "undefined"
        ? new Map()
        : new Map(
          Object.entries(snapshot).map(([name, snapshot]) => {
            if (typeof snapshot !== "string") {
              throw new AssertionError(getErrorMessage(
                `Corrupt snapshot:
	(${name})
	${snapshotFileUrl}`,
                options,
              ));
            }
            return [
              name,
              snapshot.includes("\n") ? snapshot.slice(1, -1) : snapshot,
            ];
          }),
        );
      return this.#currentSnapshots;
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.startsWith("Module not found")
      ) {
        throw new AssertionError(
          getErrorMessage("Missing snapshot file.", options),
        );
      }
      throw error;
    }
  }
  registerTeardown() {
    if (!this.#teardownRegistered) {
      globalThis.addEventListener("unload", this.#teardown);
      this.#teardownRegistered = true;
    }
  }
  getCount(snapshotName) {
    let count = this.#snapshotCounts.get(snapshotName) || 0;
    this.#snapshotCounts.set(snapshotName, ++count);
    return count;
  }
  async getSnapshot(snapshotName, options) {
    const snapshots = await this.#readSnapshotFile(options);
    return snapshots.get(snapshotName);
  }
  updateSnapshot(snapshotName, snapshot) {
    if (!this.#snapshotsUpdated.includes(snapshotName)) {
      this.#snapshotsUpdated.push(snapshotName);
    }
    const currentSnapshots = this.#getCurrentSnapshotsInitialized();
    if (!currentSnapshots.has(snapshotName)) {
      currentSnapshots.set(snapshotName, undefined);
    }
    this.#updatedSnapshots.set(snapshotName, snapshot);
  }
  getUpdatedCount() {
    return this.#snapshotsUpdated.length;
  }
  pushSnapshotToUpdateQueue(snapshotName) {
    this.snapshotUpdateQueue.push(snapshotName);
  }
  hasSnapshot(snapshotName) {
    return this.#currentSnapshots
      ? this.#currentSnapshots.has(snapshotName)
      : false;
  }
}
const SKIP_START_COMMENT = "@unocss-skip-start";
const SKIP_END_COMMENT = "@unocss-skip-end";
new RegExp(
  `(//\\s*?${SKIP_START_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_START_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_START_COMMENT}\\s*?-->)[\\s\\S]*?(//\\s*?${SKIP_END_COMMENT}\\s*?|\\/\\*\\s*?${SKIP_END_COMMENT}\\s*?\\*\\/|<!--\\s*?${SKIP_END_COMMENT}\\s*?-->)`,
  "g",
);
`/* reset */
a,hr{color:inherit}progress,sub,sup{vertical-align:baseline}blockquote,body,dd,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,menu,ol,p,pre,ul{margin:0}fieldset,legend,menu,ol,ul{padding:0}*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}html{line-height:1.5;-webkit-text-size-adjust:100%;text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}body{line-height:inherit}hr{height:0;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}menu,ol,ul{list-style:none}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}
`;
function defineConfig(config) {
  return config;
}
var o1 =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  s1 =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  u = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function i(r, t) {
  if (
    r === "__proto__" ||
    r === "constructor" && t && typeof t == "object" && "prototype" in t
  ) {
    f(r);
    return;
  }
  return t;
}
function f(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function c(r, t = {}) {
  if (typeof r != "string") return r;
  let e = r.trim();
  if (r[0] === '"' && r.at(-1) === '"' && !r.includes("\\")) {
    return e.slice(1, -1);
  }
  if (e.length <= 9) {
    let n = e.toLowerCase();
    if (n === "true") return !0;
    if (n === "false") return !1;
    if (n === "undefined") return;
    if (n === "null") return null;
    if (n === "nan") return Number.NaN;
    if (n === "infinity") return Number.POSITIVE_INFINITY;
    if (n === "-infinity") return Number.NEGATIVE_INFINITY;
  }
  if (!u.test(r)) {
    if (t.strict) throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (o1.test(r) || s1.test(r)) {
      if (t.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, i);
    }
    return JSON.parse(r);
  } catch (n) {
    if (t.strict) throw n;
    return r;
  }
}
String.fromCharCode;
var q1 = /#/g,
  G1 = /&/g,
  ot1 = /=/g,
  A2 = /\+/g,
  M2 = /%5e/gi,
  st = /%60/gi,
  it = /%7c/gi,
  at = /%20/gi;
function U1(t) {
  return encodeURI("" + t).replace(it, "|");
}
function P2(t) {
  return U1(typeof t == "string" ? t : JSON.stringify(t)).replace(A2, "%2B")
    .replace(at, "+").replace(q1, "%23").replace(G1, "%26").replace(st, "`")
    .replace(M2, "^");
}
function L(t) {
  return P2(t).replace(ot1, "%3D");
}
function a1(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function gt(t) {
  return a1(t.replace(A2, " "));
}
function mt(t) {
  return a1(t.replace(A2, " "));
}
function b3(t = "") {
  let e = {};
  t[0] === "?" && (t = t.slice(1));
  for (let r of t.split("&")) {
    let o = r.match(/([^=]+)=?(.*)/) || [];
    if (o.length < 2) continue;
    let n = gt(o[1]);
    if (n === "__proto__" || n === "constructor") continue;
    let s = mt(o[2] || "");
    e[n] === void 0
      ? e[n] = s
      : Array.isArray(e[n])
      ? e[n].push(s)
      : e[n] = [e[n], s];
  }
  return e;
}
function dt1(t, e) {
  return (typeof e == "number" || typeof e == "boolean") && (e = String(e)),
    e
      ? Array.isArray(e)
        ? e.map((r) => `${L(t)}=${P2(r)}`).join("&")
        : `${L(t)}=${P2(e)}`
      : L(t);
}
function X2(t) {
  return Object.keys(t).filter((e) => t[e] !== void 0).map((e) => dt1(e, t[e]))
    .filter(Boolean).join("&");
}
Object.defineProperty;
var Rt1 = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
  D1 = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
  yt = /^([/\\]\s*){2,}[^/\\]/;
function J1(t, e = {}) {
  return typeof e == "boolean" && (e = { acceptRelative: e }),
    e.strict ? Rt1.test(t) : D1.test(t) || (e.acceptRelative ? yt.test(t) : !1);
}
var At1 = /\/$|\/\?|\/#/;
function O1(t = "", e) {
  return e ? At1.test(t) : t.endsWith("/");
}
function y(t = "", e) {
  if (!e) return (O1(t) ? t.slice(0, -1) : t) || "/";
  if (!O1(t, !0)) return t || "/";
  let r = t, o = "", n = t.indexOf("#");
  n >= 0 && (r = t.slice(0, n), o = t.slice(n));
  let [s, ...c] = r.split("?");
  return (s.slice(0, -1) || "/") + (c.length > 0 ? `?${c.join("?")}` : "") + o;
}
function w(t = "", e) {
  if (!e) return t.endsWith("/") ? t : t + "/";
  if (O1(t, !0)) return t || "/";
  let r = t, o = "", n = t.indexOf("#");
  if (n >= 0 && (r = t.slice(0, n), o = t.slice(n), !r)) return o;
  let [s, ...c] = r.split("?");
  return s + "/" + (c.length > 0 ? `?${c.join("?")}` : "") + o;
}
function vt(t, e) {
  if (V1(e) || J1(t)) return t;
  let r = y(e);
  return t.startsWith(r) ? t : St1(r, t);
}
function Ft(t, e) {
  let r = R1(t), o = { ...b3(r.search), ...e };
  return r.search = X2(o), Pt1(r);
}
function V1(t) {
  return !t || t === "/";
}
function z2(t) {
  return t && t !== "/";
}
var Lt = /^\.?\//;
function St1(t, ...e) {
  let r = t || "";
  for (let o of e.filter((n) => z2(n))) {
    if (r) {
      let n = o.replace(Lt, "");
      r = w(r) + n;
    } else r = o;
  }
  return r;
}
function R1(t = "", e) {
  let r = t.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r) {
    let [, u, i = ""] = r;
    return {
      protocol: u.toLowerCase(),
      pathname: i,
      href: u + i,
      auth: "",
      host: "",
      search: "",
      hash: "",
    };
  }
  if (!J1(t, { acceptRelative: !0 })) return e ? R1(e + t) : x1(t);
  let [, o = "", n, s = ""] = t.replace(/\\/g, "/").match(
      /^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/,
    ) || [],
    [, c = "", p = ""] = s.match(/([^#/?]*)(.*)?/) || [],
    { pathname: g, search: f, hash: h } = x1(p.replace(/\/(?=[A-Za-z]:)/, ""));
  return {
    protocol: o.toLowerCase(),
    auth: n ? n.slice(0, Math.max(0, n.length - 1)) : "",
    host: c,
    pathname: g,
    search: f,
    hash: h,
  };
}
function x1(t = "") {
  let [e = "", r = "", o = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || [])
    .splice(1);
  return { pathname: e, search: r, hash: o };
}
function Pt1(t) {
  let e = t.pathname || "",
    r = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "",
    o = t.hash || "",
    n = t.auth ? t.auth + "@" : "",
    s = t.host || "";
  return (t.protocol ? t.protocol + "//" : "") + n + s + e + r + o;
}
var __global$ = globalThis || (typeof window !== "undefined" ? window : self);
var d = class extends Error {
  constructor(s, r) {
    super(s, r),
      this.name = "FetchError",
      r?.cause && !this.cause && (this.cause = r.cause);
  }
};
function w1(o) {
  let s = o.error?.message || o.error?.toString() || "",
    r = o.request?.method || o.options?.method || "GET",
    a = o.request?.url || String(o.request) || "/",
    f = `[${r}] ${JSON.stringify(a)}`,
    p = o.response
      ? `${o.response.status} ${o.response.statusText}`
      : "<no response>",
    c = `${f}: ${p}${s ? ` ${s}` : ""}`,
    t = new d(c, o.error ? { cause: o.error } : void 0);
  for (let n of ["request", "options", "response"]) {
    Object.defineProperty(t, n, {
      get() {
        return o[n];
      },
    });
  }
  for (
    let [n, u] of [
      ["data", "_data"],
      ["status", "status"],
      ["statusCode", "status"],
      ["statusText", "statusText"],
      ["statusMessage", "statusText"],
    ]
  ) {
    Object.defineProperty(t, n, {
      get() {
        return o.response && o.response[u];
      },
    });
  }
  return t;
}
var S1 = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function b4(o = "GET") {
  return S1.has(o.toUpperCase());
}
function R2(o) {
  if (o === void 0) return !1;
  let s = typeof o;
  return s === "string" || s === "number" || s === "boolean" || s === null
    ? !0
    : s !== "object"
    ? !1
    : Array.isArray(o)
    ? !0
    : o.buffer
    ? !1
    : o.constructor && o.constructor.name === "Object" ||
      typeof o.toJSON == "function";
}
var $2 = new Set([
    "image/svg",
    "application/xml",
    "application/xhtml",
    "application/html",
  ]),
  j2 = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function A3(o = "") {
  if (!o) return "json";
  let s = o.split(";").shift() || "";
  return j2.test(s)
    ? "json"
    : $2.has(s) || s.startsWith("text/")
    ? "text"
    : "blob";
}
function C1(o, s, r = globalThis.Headers) {
  let a = { ...s, ...o };
  if (
    s?.params && o?.params && (a.params = { ...s?.params, ...o?.params }),
      s?.query && o?.query && (a.query = { ...s?.query, ...o?.query }),
      s?.headers && o?.headers
  ) {
    a.headers = new r(s?.headers || {});
    for (let [f, p] of new r(o?.headers || {})) a.headers.set(f, p);
  }
  return a;
}
var F1 = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
  O2 = new Set([101, 204, 205, 304]);
function l1(o = {}) {
  let {
    fetch: s = globalThis.fetch,
    Headers: r = globalThis.Headers,
    AbortController: a = globalThis.AbortController,
  } = o;
  async function f(t) {
    let n = t.error && t.error.name === "AbortError" && !t.options.timeout ||
      !1;
    if (t.options.retry !== !1 && !n) {
      let e;
      typeof t.options.retry == "number"
        ? e = t.options.retry
        : e = b4(t.options.method) ? 0 : 1;
      let h = t.response && t.response.status || 500;
      if (
        e > 0 &&
        (Array.isArray(t.options.retryStatusCodes)
          ? t.options.retryStatusCodes.includes(h)
          : F1.has(h))
      ) {
        let i = t.options.retryDelay || 0;
        return i > 0 && await new Promise((y) => setTimeout(y, i)),
          p(t.request, {
            ...t.options,
            retry: e - 1,
            timeout: t.options.timeout,
          });
      }
    }
    let u = w1(t);
    throw Error.captureStackTrace && Error.captureStackTrace(u, p), u;
  }
  let p = async function (n, u = {}) {
      let e = {
        request: n,
        options: C1(u, o.defaults, r),
        response: void 0,
        error: void 0,
      };
      if (
        e.options.method = e.options.method?.toUpperCase(),
          e.options.onRequest && await e.options.onRequest(e),
          typeof e.request == "string" &&
          (e.options.baseURL && (e.request = vt(e.request, e.options.baseURL)),
            (e.options.query || e.options.params) &&
            (e.request = Ft(e.request, {
              ...e.options.params,
              ...e.options.query,
            }))),
          e.options.body && b4(e.options.method) &&
          (R2(e.options.body)
            ? (e.options.body = typeof e.options.body == "string"
              ? e.options.body
              : JSON.stringify(e.options.body),
              e.options.headers = new r(e.options.headers || {}),
              e.options.headers.has("content-type") ||
              e.options.headers.set("content-type", "application/json"),
              e.options.headers.has("accept") ||
              e.options.headers.set("accept", "application/json"))
            : ("pipeTo" in e.options.body &&
                typeof e.options.body.pipeTo == "function" ||
              typeof e.options.body.pipe == "function") &&
              ("duplex" in e.options || (e.options.duplex = "half"))),
          !e.options.signal && e.options.timeout
      ) {
        let i = new a();
        setTimeout(() => i.abort(), e.options.timeout),
          e.options.signal = i.signal;
      }
      try {
        e.response = await s(e.request, e.options);
      } catch (i) {
        return e.error = i,
          e.options.onRequestError && await e.options.onRequestError(e),
          await f(e);
      }
      if (
        e.response.body && !O2.has(e.response.status) &&
        e.options.method !== "HEAD"
      ) {
        let i = (e.options.parseResponse ? "json" : e.options.responseType) ||
          A3(e.response.headers.get("content-type") || "");
        switch (i) {
          case "json": {
            let y = await e.response.text(), g = e.options.parseResponse || c;
            e.response._data = g(y);
            break;
          }
          case "stream": {
            e.response._data = e.response.body;
            break;
          }
          default:
            e.response._data = await e.response[i]();
        }
      }
      return e.options.onResponse && await e.options.onResponse(e),
        !e.options.ignoreResponseError && e.response.status >= 400 &&
          e.response.status < 600
          ? (e.options.onResponseError && await e.options.onResponseError(e),
            await f(e))
          : e.response;
    },
    c1 = async function (n, u) {
      return (await p(n, u))._data;
    };
  return c1.raw = p,
    c1.native = (...t) => s(...t),
    c1.create = (t = {}) => l1({ ...o, defaults: { ...o.defaults, ...t } }),
    c1;
}
var m = function () {
    if (typeof globalThis < "u") return globalThis;
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof __global$ < "u") return __global$;
    throw new Error("unable to locate global object");
  }(),
  P3 = m.fetch ||
    (() =>
      Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
  k1 = m.Headers,
  H2 = m.AbortController,
  _1 = l1({ fetch: P3, Headers: k1, AbortController: H2 }),
  L1 = _1;
var W1 = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  k2 = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  L2 = Object.freeze({ ...W1, ...k2 }),
  _2 = Object.freeze({ ...L2, body: "", hidden: !1 }),
  H3 = Object.freeze({ width: null, height: null }),
  N1 = Object.freeze({ ...H3, ...k2 });
function X3(t, n) {
  let i = {};
  !t.hFlip != !n.hFlip && (i.hFlip = !0),
    !t.vFlip != !n.vFlip && (i.vFlip = !0);
  let o = ((t.rotate || 0) + (n.rotate || 0)) % 4;
  return o && (i.rotate = o), i;
}
function I3(t, n) {
  let i = X3(t, n);
  for (let o in _2) {
    o in k2
      ? o in t && !(o in i) && (i[o] = k2[o])
      : o in n
      ? i[o] = n[o]
      : o in t && (i[o] = t[o]);
  }
  return i;
}
function B2(t, n) {
  let i = t.icons,
    o = t.aliases || Object.create(null),
    e = Object.create(null);
  function s(c) {
    if (i[c]) return e[c] = [];
    if (!(c in e)) {
      e[c] = null;
      let a = o[c] && o[c].parent, u = a && s(a);
      u && (e[c] = [a].concat(u));
    }
    return e[c];
  }
  return (n || Object.keys(i).concat(Object.keys(o))).forEach(s), e;
}
function F2(t, n, i) {
  let o = t.icons, e = t.aliases || Object.create(null), s = {};
  function c(a) {
    s = I3(o[a] || e[a], s);
  }
  return c(n), i.forEach(c), I3(t, s);
}
function U2(t, n) {
  if (t.icons[n]) return F2(t, n, []);
  let i = B2(t, [n])[n];
  return i ? F2(t, n, i) : null;
}
var Z2 = /(-?[0-9.]*[0-9]+[0-9.]*)/g, q2 = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function P4(t, n, i) {
  if (n === 1) return t;
  if (i = i || 100, typeof t == "number") return Math.ceil(t * n * i) / i;
  if (typeof t != "string") return t;
  let o = t.split(Z2);
  if (o === null || !o.length) return t;
  let e = [], s = o.shift(), c = q2.test(s);
  for (;;) {
    if (c) {
      let a = parseFloat(s);
      isNaN(a) ? e.push(s) : e.push(Math.ceil(a * n * i) / i);
    } else e.push(s);
    if (s = o.shift(), s === void 0) return e.join("");
    c = !c;
  }
}
function K3(t) {
  let n = "", i = t.indexOf("<defs");
  for (; i >= 0;) {
    let o = t.indexOf(">", i), e = t.indexOf("</defs");
    if (o === -1 || e === -1) break;
    let s = t.indexOf(">", e);
    if (s === -1) break;
    n += t.slice(o + 1, e).trim(), t = t.slice(0, i).trim() + t.slice(s + 1);
  }
  return { defs: n, content: t };
}
function J2(t, n) {
  return t ? "<defs>" + t + "</defs>" + n : n;
}
function Q1(t, n, i) {
  let o = K3(t);
  return J2(o.defs, n + o.content + i);
}
var S2 = (t) => t === "unset" || t === "undefined" || t === "none";
function Y2(t, n) {
  let i = { ...L2, ...t },
    o = { ...N1, ...n },
    e = { left: i.left, top: i.top, width: i.width, height: i.height },
    s = i.body;
  [i, o].forEach((l) => {
    let r = [], v = l.hFlip, y = l.vFlip, h = l.rotate;
    v
      ? y ? h += 2 : (r.push(
        "translate(" + (e.width + e.left).toString() + " " +
          (0 - e.top).toString() + ")",
      ),
        r.push("scale(-1 1)"),
        e.top = e.left = 0)
      : y &&
        (r.push(
          "translate(" + (0 - e.left).toString() + " " +
            (e.height + e.top).toString() + ")",
        ),
          r.push("scale(1 -1)"),
          e.top = e.left = 0);
    let g;
    switch (h < 0 && (h -= Math.floor(h / 4) * 4), h = h % 4, h) {
      case 1:
        g = e.height / 2 + e.top,
          r.unshift("rotate(90 " + g.toString() + " " + g.toString() + ")");
        break;
      case 2:
        r.unshift(
          "rotate(180 " + (e.width / 2 + e.left).toString() + " " +
            (e.height / 2 + e.top).toString() + ")",
        );
        break;
      case 3:
        g = e.width / 2 + e.left,
          r.unshift("rotate(-90 " + g.toString() + " " + g.toString() + ")");
        break;
    }
    h % 2 === 1 &&
    (e.left !== e.top && (g = e.left, e.left = e.top, e.top = g),
      e.width !== e.height && (g = e.width, e.width = e.height, e.height = g)),
      r.length && (s = Q1(s, '<g transform="' + r.join(" ") + '">', "</g>"));
  });
  let c = o.width, a = o.height, u = e.width, d = e.height, f, w;
  c === null
    ? (w = a === null ? "1em" : a === "auto" ? d : a, f = P4(w, u / d))
    : (f = c === "auto" ? u : c,
      w = a === null ? P4(f, d / u) : a === "auto" ? d : a);
  let b = {},
    m = (l, r) => {
      S2(r) || (b[l] = r.toString());
    };
  m("width", f), m("height", w);
  let p = [e.left, e.top, u, d];
  return b.viewBox = p.join(" "), { attributes: b, viewBox: p, body: s };
}
function tt(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(
    /</g,
    "%3C",
  ).replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function et1(t) {
  let n = t.startsWith("<svg>") ? t.replace("<svg>", "<svg >") : t;
  return !n.includes(" xmlns:xlink=") && n.includes(" xlink:") &&
    (n = n.replace(
      "<svg ",
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ',
    )),
    n.includes(" xmlns=") ||
    (n = n.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')),
    tt(n);
}
function it1(t) {
  return t.replace(/(['"])\s*\n\s*([^>\\/\s])/g, "$1 $2").replace(
    /(["';{}><])\s*\n\s*/g,
    "$1",
  ).replace(/\s*\n\s*/g, " ").replace(/\s+"/g, '"').replace(/="\s+/g, '="')
    .trim();
}
var nt = /\swidth\s*=\s*["'](\w+)["']/,
  ot2 = /\sheight\s*=\s*["'](\w+)["']/,
  j3 = /<svg\s+/;
function st1(t, n, i) {
  let o = t.slice(0, t.indexOf(">")),
    e = (s, c) => {
      let a = c.exec(o), u = a != null, d = n[s];
      return !d && !S2(d) &&
        (typeof i == "number"
          ? i > 0 && (n[s] = `${i}em`)
          : a && (n[s] = a[1])),
        u;
    };
  return [e("width", nt), e("height", ot2)];
}
async function E1(t, n, i, o, e, s) {
  let { scale: c, addXmlNs: a = !1 } = o ?? {},
    { additionalProps: u = {}, iconCustomizer: d } = o?.customizations ?? {},
    f = await e?.() ?? {};
  await d?.(n, i, f),
    Object.keys(u).forEach((l) => {
      let r = u[l];
      r != null && (f[l] = r);
    }),
    s?.(f);
  let [w, b] = st1(t, f, c);
  a &&
    (!t.includes("xmlns=") && !f.xmlns &&
      (f.xmlns = "http://www.w3.org/2000/svg"),
      !t.includes("xmlns:xlink=") && t.includes("xlink:") &&
      !f["xmlns:xlink"] && (f["xmlns:xlink"] = "http://www.w3.org/1999/xlink"));
  let m = Object.keys(f).map((l) =>
    l === "width" && w || l === "height" && b ? null : `${l}="${f[l]}"`
  ).filter((l) => l != null);
  if (m.length && (t = t.replace(j3, `<svg ${m.join(" ")} `)), o) {
    let { defaultStyle: l, defaultClass: r } = o;
    r && !t.includes("class=") && (t = t.replace(j3, `<svg class="${r}" `)),
      l && !t.includes("style=") && (t = t.replace(j3, `<svg style="${l}" `));
  }
  let p = o?.usedProps;
  return p && (Object.keys(u).forEach((l) => {
    let r = f[l];
    r != null && (p[l] = r);
  }),
    typeof f.width < "u" && f.width !== null && (p.width = f.width),
    typeof f.height < "u" && f.height !== null && (p.height = f.height)),
    t;
}
async function D2(t, n, i, o) {
  let e;
  try {
    if (typeof t == "function") e = await t(i);
    else {
      let s = t[i];
      e = typeof s == "function" ? await s() : s;
    }
  } catch (s) {
    console.warn(`Failed to load custom icon "${i}" in "${n}":`, s);
    return;
  }
  if (e) {
    let s = e.indexOf("<svg");
    s > 0 && (e = e.slice(s));
    let { transform: c } = o?.customizations ?? {};
    return e = typeof c == "function" ? await c(e, n, i) : e,
      e.startsWith("<svg")
        ? await E1(
          o?.customizations?.trimCustomSvg === !0 ? it1(e) : e,
          n,
          i,
          o,
          void 0,
        )
        : (console.warn(`Custom icon "${i}" in "${n}" is not a valid SVG`), e);
  }
}
async function A4(t, n, i, o) {
  let e, { customize: s } = o?.customizations ?? {};
  for (let c of i) {
    if (e = U2(t, c), e) {
      let a = { ...N1 };
      typeof s == "function" && (a = s(a));
      let { attributes: { width: u, height: d, ...f }, body: w } = Y2(e, a),
        b = o?.scale;
      return await E1(`<svg >${w}</svg>`, n, c, o, () => ({ ...f }), (m) => {
        let p = (l, r) => {
          let v = m[l], y;
          if (!S2(v)) {
            if (v) return;
            typeof b == "number" ? b && (y = `${b}em`) : y = r;
          }
          y ? m[l] = y : delete m[l];
        };
        p("width", u), p("height", d);
      });
    }
  }
}
var C2 = async (t, n, i) => {
  let o = i?.customCollections?.[t];
  if (o) {
    if (typeof o == "function") {
      let e;
      try {
        e = await o(n);
      } catch (s) {
        console.warn(`Failed to load custom icon "${n}" in "${t}":`, s);
        return;
      }
      if (e) {
        if (typeof e == "string") return await D2(() => e, t, n, i);
        if ("icons" in e) {
          let s = [
            n,
            n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            n.replace(/([a-z])(\d+)/g, "$1-$2"),
          ];
          return await A4(e, t, s, i);
        }
      }
    } else return await D2(o, t, n, i);
  }
};
function rt1(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var ct = [
    "academicons",
    "akar-icons",
    "ant-design",
    "arcticons",
    "basil",
    "bi",
    "bpmn",
    "brandico",
    "bx",
    "bxl",
    "bxs",
    "bytesize",
    "carbon",
    "charm",
    "ci",
    "cib",
    "cif",
    "cil",
    "circle-flags",
    "circum",
    "clarity",
    "codicon",
    "covid",
    "cryptocurrency-color",
    "cryptocurrency",
    "dashicons",
    "devicon-line",
    "devicon-original",
    "devicon-plain",
    "devicon",
    "ei",
    "el",
    "emblemicons",
    "emojione-monotone",
    "emojione-v1",
    "emojione",
    "entypo-social",
    "entypo",
    "eos-icons",
    "ep",
    "et",
    "eva",
    "fa-brands",
    "fa-regular",
    "fa-solid",
    "fa",
    "fa6-brands",
    "fa6-regular",
    "fa6-solid",
    "fad",
    "fe",
    "feather",
    "file-icons",
    "flag",
    "flagpack",
    "flat-color-icons",
    "flat-ui",
    "fluent-emoji-flat",
    "fluent-emoji-high-contrast",
    "fluent-emoji",
    "fluent-mdl2",
    "fluent",
    "fontelico",
    "fontisto",
    "formkit",
    "foundation",
    "fxemoji",
    "gala",
    "game-icons",
    "geo",
    "gg",
    "gis",
    "gridicons",
    "grommet-icons",
    "guidance",
    "healthicons",
    "heroicons-outline",
    "heroicons-solid",
    "heroicons",
    "humbleicons",
    "ic",
    "icomoon-free",
    "icon-park-outline",
    "icon-park-solid",
    "icon-park-twotone",
    "icon-park",
    "iconamoon",
    "iconoir",
    "icons8",
    "il",
    "ion",
    "iwwa",
    "jam",
    "la",
    "lets-icons",
    "line-md",
    "logos",
    "ls",
    "lucide",
    "majesticons",
    "maki",
    "map",
    "material-symbols-light",
    "material-symbols",
    "mdi-light",
    "mdi",
    "medical-icon",
    "memory",
    "meteocons",
    "mi",
    "mingcute",
    "mono-icons",
    "mynaui",
    "nimbus",
    "nonicons",
    "noto-v1",
    "noto",
    "octicon",
    "oi",
    "ooui",
    "openmoji",
    "pajamas",
    "pepicons-pencil",
    "pepicons-pop",
    "pepicons-print",
    "pepicons",
    "ph",
    "pixelarticons",
    "prime",
    "ps",
    "quill",
    "radix-icons",
    "raphael",
    "ri",
    "si-glyph",
    "simple-icons",
    "simple-line-icons",
    "skill-icons",
    "solar",
    "streamline-emojis",
    "streamline",
    "subway",
    "svg-spinners",
    "system-uicons",
    "tabler",
    "tdesign",
    "teenyicons",
    "topcoat",
    "twemoji",
    "typcn",
    "uil",
    "uim",
    "uis",
    "uit",
    "uiw",
    "vaadin",
    "vs",
    "vscode-icons",
    "websymbol",
    "whh",
    "wi",
    "wpf",
    "zmdi",
    "zondicons",
  ],
  T2 = rt1(ct),
  at1 = 3;
function V2(t) {
  return ee1((n = {}) => {
    let {
        scale: i = 1,
        mode: o = "auto",
        prefix: e = "i-",
        warn: s = !1,
        collections: c,
        extraProperties: a = {},
        customizations: u = {},
        autoInstall: d = !1,
        layer: f = "icons",
        unit: w,
      } = n,
      b = {
        addXmlNs: !0,
        scale: i,
        customCollections: c,
        autoInstall: d,
        warn: void 0,
        customizations: {
          ...u,
          additionalProps: { ...a },
          trimCustomSvg: !0,
          async iconCustomizer(p, l, r) {
            await u.iconCustomizer?.(p, l, r),
              w &&
              (r.width || (r.width = `${i}${w}`),
                r.height || (r.height = `${i}${w}`));
          },
        },
      },
      m;
    return {
      name: "@unocss/preset-icons",
      enforce: "pre",
      options: n,
      layers: { icons: -30 },
      rules: [[
        /^([a-z0-9:_-]+)(?:\?(mask|bg|auto))?$/,
        async ([p, l, r = o]) => {
          let v = "", y = "", h;
          m = m || await t(n);
          let g = {};
          if (l.includes(":")) {
            [v, y] = l.split(":"), h = await m(v, y, { ...b, usedProps: g });
          } else {
            let z = l.split(/-/g);
            for (
              let x = at1;
              x >= 1 &&
              (v = z.slice(0, x).join("-"),
                y = z.slice(x).join("-"),
                h = await m(v, y, { ...b, usedProps: g }),
                !h);
              x--
            );
          }
          if (!h) {
            s && Rt(`failed to load icon "${p}"`);
            return;
          }
          let O = `url("data:image/svg+xml;utf8,${et1(h)}")`;
          return r === "auto" &&
            (r = h.includes("currentColor") ? "mask" : "bg"),
            r === "mask"
              ? {
                "--un-icon": O,
                "-webkit-mask": "var(--un-icon) no-repeat",
                mask: "var(--un-icon) no-repeat",
                "-webkit-mask-size": "100% 100%",
                "mask-size": "100% 100%",
                "background-color": "currentColor",
                color: "inherit",
                ...g,
              }
              : {
                background: `${O} no-repeat`,
                "background-size": "100% 100%",
                "background-color": "transparent",
                ...g,
              };
        },
        { layer: f, prefix: e },
      ]],
    };
  });
}
function $3(t, n) {
  let i = new Map();
  function o(e) {
    if (T2.includes(e)) {
      return i.has(e) || i.set(e, t(`${n}@iconify-json/${e}/icons.json`)),
        i.get(e);
    }
  }
  return async (e, s, c) => {
    let a = await C2(e, s, c);
    if (a) return a;
    let u = await o(e);
    if (u) {
      let d = [
        s,
        s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
        s.replace(/([a-z])(\d+)/g, "$1-$2"),
      ];
      a = await A4(u, e, d, c);
    }
    return a;
  };
}
function G2(t) {
  return $3(L1, t);
}
var vt1 = V2(async (t) => {
  let n = t?.customFetch, i = t?.cdn;
  return n && i ? $3(n, i) : i ? G2(i) : C2;
});
function y1(o) {
  return {
    "h1,h2,h3,h4,h5,h6": {
      color: "var(--un-prose-headings)",
      "font-weight": "600",
      "line-height": 1.25,
    },
    a: {
      color: "var(--un-prose-links)",
      "text-decoration": "underline",
      "font-weight": "500",
    },
    "a code": { color: "var(--un-prose-links)" },
    "p,ul,ol,pre": { margin: "1em 0", "line-height": 1.75 },
    blockquote: {
      margin: "1em 0",
      "padding-left": "1em",
      "font-style": "italic",
      "border-left": ".25em solid var(--un-prose-borders)",
    },
    h1: { margin: "1rem 0", "font-size": "2.25em" },
    h2: { margin: "1.75em 0 .5em", "font-size": "1.75em" },
    h3: { margin: "1.5em 0 .5em", "font-size": "1.375em" },
    h4: { margin: "1em 0", "font-size": "1.125em" },
    "img,video": { "max-width": "100%" },
    "figure,picture": { margin: "1em 0" },
    figcaption: { color: "var(--un-prose-captions)", "font-size": ".875em" },
    code: {
      color: "var(--un-prose-code)",
      "font-size": ".875em",
      "font-weight": 600,
      "font-family": o.fontFamily?.mono,
    },
    ":not(pre) > code::before,:not(pre) > code::after": { content: '"`"' },
    pre: {
      padding: "1.25rem 1.5rem",
      "overflow-x": "auto",
      "border-radius": ".375rem",
    },
    "pre,code": {
      "white-space": "pre",
      "word-spacing": "normal",
      "word-break": "normal",
      "word-wrap": "normal",
      "-moz-tab-size": 4,
      "-o-tab-size": 4,
      "tab-size": 4,
      "-webkit-hyphens": "none",
      "-moz-hyphens": "none",
      hyphens: "none",
      background: "transparent",
    },
    "pre code": { "font-weight": "inherit" },
    "ol,ul": { "padding-left": "1.25em" },
    ol: { "list-style-type": "decimal" },
    'ol[type="A"]': { "list-style-type": "upper-alpha" },
    'ol[type="a"]': { "list-style-type": "lower-alpha" },
    'ol[type="A" s]': { "list-style-type": "upper-alpha" },
    'ol[type="a" s]': { "list-style-type": "lower-alpha" },
    'ol[type="I"]': { "list-style-type": "upper-roman" },
    'ol[type="i"]': { "list-style-type": "lower-roman" },
    'ol[type="I" s]': { "list-style-type": "upper-roman" },
    'ol[type="i" s]': { "list-style-type": "lower-roman" },
    'ol[type="1"]': { "list-style-type": "decimal" },
    ul: { "list-style-type": "disc" },
    "ol > li::marker,ul > li::marker,summary::marker": {
      color: "var(--un-prose-lists)",
    },
    hr: { margin: "2em 0", border: "1px solid var(--un-prose-hr)" },
    table: {
      display: "block",
      margin: "1em 0",
      "border-collapse": "collapse",
      "overflow-x": "auto",
    },
    "tr:nth-child(2n)": { background: "var(--un-prose-bg-soft)" },
    "td,th": {
      border: "1px solid var(--un-prose-borders)",
      padding: ".625em 1em",
    },
    abbr: { cursor: "help" },
    kbd: {
      color: "var(--un-prose-code)",
      border: "1px solid",
      padding: ".25rem .5rem",
      "font-size": ".875em",
      "border-radius": ".25rem",
    },
    details: {
      margin: "1em 0",
      padding: "1.25rem 1.5rem",
      background: "var(--un-prose-bg-soft)",
    },
    summary: { cursor: "pointer", "font-weight": "600" },
  };
}
function g1(o) {
  let s = "",
    { escapedSelector: p, selectorName: a, preflights: u, compatibility: l } =
      o,
    n = l?.noColonNot || l?.noColonWhere;
  for (let i in u) {
    let c = u[i],
      e = `:not(:where(.not-${a},.not-${a} *))`,
      r = i.split(",").map((t) => {
        let m = t.match(/::?(?:[\(\)\:\-\d\w]+)$/g);
        if (m) {
          let d = m[0];
          return t = t.replace(d, ""),
            p.map((h) => n ? `${h} ${t}${d}` : `${h} :where(${t})${e}${d}`)
              .join(",");
        }
        return null;
      }).filter((t) => t);
    r.length
      ? s += r.join(",")
      : s += p.map((t) =>
        n
          ? i.split(",").map((m) => `${t} ${m}`).join(",")
          : `${t} :where(${i})${e}`
      ).join(","), s += "{";
    for (let t in c) {
      let m = c[t];
      s += `${t}:${m};`;
    }
    s += "}";
  }
  return s;
}
function w2(o, s) {
  let { escapedSelectors: p, selectorName: a, cssExtend: u, compatibility: l } =
      s,
    n = Array.from(p);
  return !n[n.length - 1].startsWith(".") && !l?.noColonIs &&
    (n = [`:is(${n[n.length - 1]},.${a})`]),
    g1(
      u
        ? {
          escapedSelector: n,
          selectorName: a,
          preflights: K1(y1(o.theme), u),
          compatibility: l,
        }
        : {
          escapedSelector: n,
          selectorName: a,
          preflights: y1(o.theme),
          compatibility: l,
        },
    );
}
var k3 = ee1((o) => {
  o?.className &&
    console.warn(
      '[unocss:preset-typography] "className" is deprecated. Use "selectorName" instead.',
    );
  let s = new Set(),
    p = o?.selectorName || o?.className || "prose",
    a = new RegExp(`^${p}$`),
    u = new RegExp(`^${p}-([-\\w]+)$`),
    l = new RegExp(`^${p}-invert$`),
    n = o?.compatibility;
  return {
    name: "@unocss/preset-typography",
    enforce: "post",
    layers: { typography: -20 },
    rules: [[
      a,
      (
        i,
        { rawSelector: c },
      ) => (s.add(Wt(c)),
        { color: "var(--un-prose-body)", "max-width": "65ch" }),
      { layer: "typography" },
    ], [u, ([, i], { theme: c }) => {
      let e = c.colors?.[i];
      if (e == null) return;
      let r = typeof e == "object" ? e : {};
      return {
        "--un-prose-body": r[700] ?? e,
        "--un-prose-headings": r[900] ?? e,
        "--un-prose-links": r[900] ?? e,
        "--un-prose-lists": r[400] ?? e,
        "--un-prose-hr": r[200] ?? e,
        "--un-prose-captions": r[500] ?? e,
        "--un-prose-code": r[900] ?? e,
        "--un-prose-borders": r[200] ?? e,
        "--un-prose-bg-soft": r[100] ?? e,
        "--un-prose-invert-body": r[200] ?? e,
        "--un-prose-invert-headings": r[100] ?? e,
        "--un-prose-invert-links": r[100] ?? e,
        "--un-prose-invert-lists": r[500] ?? e,
        "--un-prose-invert-hr": r[700] ?? e,
        "--un-prose-invert-captions": r[400] ?? e,
        "--un-prose-invert-code": r[100] ?? e,
        "--un-prose-invert-borders": r[700] ?? e,
        "--un-prose-invert-bg-soft": r[800] ?? e,
      };
    }, { layer: "typography" }], [l, () => ({
      "--un-prose-body": "var(--un-prose-invert-body)",
      "--un-prose-headings": "var(--un-prose-invert-headings)",
      "--un-prose-links": "var(--un-prose-invert-links)",
      "--un-prose-lists": "var(--un-prose-invert-lists)",
      "--un-prose-hr": "var(--un-prose-invert-hr)",
      "--un-prose-captions": "var(--un-prose-invert-captions)",
      "--un-prose-code": "var(--un-prose-invert-code)",
      "--un-prose-borders": "var(--un-prose-invert-borders)",
      "--un-prose-bg-soft": "var(--un-prose-invert-bg-soft)",
    }), { layer: "typography" }]],
    preflights: [{
      layer: "typography",
      getCSS: (i) => {
        if (s.size > 0) {
          let c = typeof o?.cssExtend == "function"
            ? o.cssExtend(i.theme)
            : o?.cssExtend;
          return w2(i, {
            escapedSelectors: s,
            selectorName: p,
            cssExtend: c,
            compatibility: n,
          });
        }
      },
    }],
  };
});
var n = /\/\/#\s*sourceMappingURL=.*\n?/g;
function i1(r) {
  return r.includes("sourceMappingURL=") ? r.replace(n, "") : r;
}
var o2 = /(?:[\w&:[\]-]|\[\S+=\S+\])+\[\\?['"]?\S+?['"]\]\]?[\w:-]*/g,
  u1 = /\[(\\\W|[\w-])+:[^\s:]*?("\S+?"|'\S+?'|`\S+?`|[^\s:]+?)[^\s:]*?\)?\]/g,
  c1 = /^\[(\\\W|[\w-])+:['"]?\S+?['"]?\]$/;
function p(r) {
  let a = [];
  for (let t of r.matchAll(u1)) {
    t.index !== 0 && !/^[\s'"`]/.test(r[t.index - 1] ?? "") || a.push(t[0]);
  }
  for (let t of r.matchAll(o2)) a.push(t[0]);
  return r.split(Pt).forEach((t) => {
    Kt(t) && !c1.test(t) && a.push(t);
  }),
    a;
}
var f1 = {
  name: "@unocss/extractor-arbitrary-variants",
  order: 0,
  extract({ code: r }) {
    return p(i1(r));
  },
};
var B3 = Object.create;
var l2 = Object.defineProperty;
var _3 = Object.getOwnPropertyDescriptor;
var k4 = Object.getOwnPropertyNames;
var w3 = Object.getPrototypeOf, j4 = Object.prototype.hasOwnProperty;
var H4 = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports),
  U3 = (r, e) => {
    for (var t in e) l2(r, t, { get: e[t], enumerable: !0 });
  },
  A5 = (r, e, t, a) => {
    if (e && typeof e == "object" || typeof e == "function") {
      for (let o of k4(e)) {
        !j4.call(r, o) && o !== t && l2(r, o, {
          get: () => e[o],
          enumerable: !(a = _3(e, o)) || a.enumerable,
        });
      }
    }
    return r;
  },
  u2 = (r, e, t) => (A5(r, e, "default"), t && A5(t, e, "default")),
  C3 = (
    r,
    e,
    t,
  ) => (t = r != null ? B3(w3(r)) : {},
    A5(
      e || !r || !r.__esModule
        ? l2(t, "default", { value: r, enumerable: !0 })
        : t,
      r,
    ));
var p1 = H4((y) => {
  "use strict";
  y.byteLength = I;
  y.toByteArray = T;
  y.fromByteArray = D;
  var h = [],
    d = [],
    E = typeof Uint8Array < "u" ? Uint8Array : Array,
    s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (F = 0, L = s.length; F < L; ++F) h[F] = s[F], d[s.charCodeAt(F)] = F;
  var F, L;
  d[45] = 62;
  d[95] = 63;
  function g(r) {
    var e = r.length;
    if (e % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var t = r.indexOf("=");
    t === -1 && (t = e);
    var a = t === e ? 0 : 4 - t % 4;
    return [t, a];
  }
  function I(r) {
    var e = g(r), t = e[0], a = e[1];
    return (t + a) * 3 / 4 - a;
  }
  function O(r, e, t) {
    return (e + t) * 3 / 4 - t;
  }
  function T(r) {
    var e,
      t = g(r),
      a = t[0],
      o = t[1],
      n = new E(O(r, a, o)),
      v = 0,
      x = o > 0 ? a - 4 : a,
      f;
    for (f = 0; f < x; f += 4) {
      e = d[r.charCodeAt(f)] << 18 | d[r.charCodeAt(f + 1)] << 12 |
        d[r.charCodeAt(f + 2)] << 6 | d[r.charCodeAt(f + 3)],
        n[v++] = e >> 16 & 255,
        n[v++] = e >> 8 & 255,
        n[v++] = e & 255;
    }
    return o === 2 &&
      (e = d[r.charCodeAt(f)] << 2 | d[r.charCodeAt(f + 1)] >> 4,
        n[v++] = e & 255),
      o === 1 &&
      (e = d[r.charCodeAt(f)] << 10 | d[r.charCodeAt(f + 1)] << 4 |
        d[r.charCodeAt(f + 2)] >> 2,
        n[v++] = e >> 8 & 255,
        n[v++] = e & 255),
      n;
  }
  function q(r) {
    return h[r >> 18 & 63] + h[r >> 12 & 63] + h[r >> 6 & 63] + h[r & 63];
  }
  function z(r, e, t) {
    for (var a, o = [], n = e; n < t; n += 3) {
      a = (r[n] << 16 & 16711680) + (r[n + 1] << 8 & 65280) + (r[n + 2] & 255),
        o.push(q(a));
    }
    return o.join("");
  }
  function D(r) {
    for (
      var e, t = r.length, a = t % 3, o = [], n = 16383, v = 0, x = t - a;
      v < x;
      v += n
    ) o.push(z(r, v, v + n > x ? x : v + n));
    return a === 1
      ? (e = r[t - 1], o.push(h[e >> 2] + h[e << 4 & 63] + "=="))
      : a === 2 &&
        (e = (r[t - 2] << 8) + r[t - 1],
          o.push(h[e >> 10] + h[e >> 4 & 63] + h[e << 2 & 63] + "=")),
      o.join("");
  }
});
var c2 = {};
U3(c2, {
  byteLength: () => G3,
  default: () => N2,
  fromByteArray: () => K4,
  toByteArray: () => J3,
});
var i2 = C3(p1());
u2(c2, C3(p1()));
var { byteLength: G3, toByteArray: J3, fromByteArray: K4 } = i2,
  { default: m1, ...M3 } = i2,
  N2 = m1 !== void 0 ? m1 : M3;
const mod2 = {
  byteLength: G3,
  default: N2,
  fromByteArray: K4,
  toByteArray: J3,
};
var y2 = Object.create;
var v1 = Object.defineProperty;
var z3 = Object.getOwnPropertyDescriptor;
var A6 = Object.getOwnPropertyNames;
var C4 = Object.getPrototypeOf, D3 = Object.prototype.hasOwnProperty;
var F3 = (a, r) => () => (r || a((r = { exports: {} }).exports, r), r.exports),
  G4 = (a, r) => {
    for (var i in r) v1(a, i, { get: r[i], enumerable: !0 });
  },
  e = (a, r, i, f) => {
    if (r && typeof r == "object" || typeof r == "function") {
      for (let o of A6(r)) {
        !D3.call(a, o) && o !== i && v1(a, o, {
          get: () => r[o],
          enumerable: !(f = z3(r, o)) || f.enumerable,
        });
      }
    }
    return a;
  },
  _4 = (a, r, i) => (e(a, r, "default"), i && e(i, r, "default")),
  B4 = (
    a,
    r,
    i,
  ) => (i = a != null ? y2(C4(a)) : {},
    e(
      r || !a || !a.__esModule
        ? v1(i, "default", { value: a, enumerable: !0 })
        : i,
      a,
    ));
var g2 = F3((I) => {
  I.read = function (a, r, i, f, o) {
    var h,
      t,
      w = o * 8 - f - 1,
      s = (1 << w) - 1,
      N = s >> 1,
      M = -7,
      p = i ? o - 1 : 0,
      c = i ? -1 : 1,
      d = a[r + p];
    for (
      p += c, h = d & (1 << -M) - 1, d >>= -M, M += w;
      M > 0;
      h = h * 256 + a[r + p], p += c, M -= 8
    );
    for (
      t = h & (1 << -M) - 1, h >>= -M, M += f;
      M > 0;
      t = t * 256 + a[r + p], p += c, M -= 8
    );
    if (h === 0) h = 1 - N;
    else {
      if (h === s) return t ? NaN : (d ? -1 : 1) * (1 / 0);
      t = t + Math.pow(2, f), h = h - N;
    }
    return (d ? -1 : 1) * t * Math.pow(2, h - f);
  };
  I.write = function (a, r, i, f, o, h) {
    var t,
      w,
      s,
      N = h * 8 - o - 1,
      M = (1 << N) - 1,
      p = M >> 1,
      c = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      d = f ? 0 : h - 1,
      n = f ? 1 : -1,
      q = r < 0 || r === 0 && 1 / r < 0 ? 1 : 0;
    for (
      r = Math.abs(r),
        isNaN(r) || r === 1 / 0
          ? (w = isNaN(r) ? 1 : 0, t = M)
          : (t = Math.floor(Math.log(r) / Math.LN2),
            r * (s = Math.pow(2, -t)) < 1 && (t--, s *= 2),
            t + p >= 1 ? r += c / s : r += c * Math.pow(2, 1 - p),
            r * s >= 2 && (t++, s /= 2),
            t + p >= M
              ? (w = 0, t = M)
              : t + p >= 1
              ? (w = (r * s - 1) * Math.pow(2, o), t = t + p)
              : (w = r * Math.pow(2, p - 1) * Math.pow(2, o), t = 0));
      o >= 8;
      a[i + d] = w & 255, d += n, w /= 256, o -= 8
    );
    for (
      t = t << o | w, N += o;
      N > 0;
      a[i + d] = t & 255, d += n, t /= 256, N -= 8
    );
    a[i + d - n] |= q * 128;
  };
});
var x2 = {};
G4(x2, { default: () => O3, read: () => H5, write: () => J4 });
var k5 = B4(g2());
_4(x2, B4(g2()));
var { read: H5, write: J4 } = k5,
  { default: j5, ...K5 } = k5,
  O3 = j5 !== void 0 ? j5 : K5;
const mod3 = { default: O3, read: H5, write: J4 };
var require = (n) => {
  const e = (m) => typeof m.default < "u" ? m.default : m;
  switch (n) {
    case "base64-js":
      return e(mod2);
    case "ieee754":
      return e(mod3);
    default:
      throw new Error('module "' + n + '" not found');
  }
};
var or = Object.create;
var S3 = Object.defineProperty;
var ur = Object.getOwnPropertyDescriptor;
var hr = Object.getOwnPropertyNames;
var fr = Object.getPrototypeOf, cr = Object.prototype.hasOwnProperty;
var O4 =
  ((i) =>
    typeof require < "u"
      ? require
      : typeof Proxy < "u"
      ? new Proxy(i, { get: (r, t) => (typeof require < "u" ? require : r)[t] })
      : i)(function (i) {
      if (typeof require < "u") return require.apply(this, arguments);
      throw Error('Dynamic require of "' + i + '" is not supported');
    });
var pr = (i, r) => () => (r || i((r = { exports: {} }).exports, r), r.exports),
  lr = (i, r) => {
    for (var t in r) S3(i, t, { get: r[t], enumerable: !0 });
  },
  _5 = (i, r, t, n) => {
    if (r && typeof r == "object" || typeof r == "function") {
      for (let e of hr(r)) {
        !cr.call(i, e) && e !== t && S3(i, e, {
          get: () => r[e],
          enumerable: !(n = ur(r, e)) || n.enumerable,
        });
      }
    }
    return i;
  },
  m2 = (i, r, t) => (_5(i, r, "default"), t && _5(t, r, "default")),
  G5 = (
    i,
    r,
    t,
  ) => (t = i != null ? or(fr(i)) : {},
    _5(
      r || !i || !i.__esModule
        ? S3(t, "default", { value: i, enumerable: !0 })
        : t,
      i,
    ));
var M4 = pr((U) => {
  "use strict";
  var C = O4("base64-js"),
    d = O4("ieee754"),
    Y = typeof Symbol == "function" && typeof Symbol.for == "function"
      ? Symbol.for("nodejs.util.inspect.custom")
      : null;
  U.Buffer = u;
  U.SlowBuffer = Br;
  U.INSPECT_MAX_BYTES = 50;
  var R = 2147483647;
  U.kMaxLength = R;
  u.TYPED_ARRAY_SUPPORT = sr();
  !u.TYPED_ARRAY_SUPPORT && typeof console < "u" &&
    typeof console.error == "function" &&
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
    );
  function sr() {
    try {
      let i = new Uint8Array(1),
        r = {
          foo: function () {
            return 42;
          },
        };
      return Object.setPrototypeOf(r, Uint8Array.prototype),
        Object.setPrototypeOf(i, r),
        i.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(u.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (u.isBuffer(this)) return this.buffer;
    },
  });
  Object.defineProperty(u.prototype, "offset", {
    enumerable: !0,
    get: function () {
      if (u.isBuffer(this)) return this.byteOffset;
    },
  });
  function x(i) {
    if (i > R) {
      throw new RangeError(
        'The value "' + i + '" is invalid for option "size"',
      );
    }
    let r = new Uint8Array(i);
    return Object.setPrototypeOf(r, u.prototype), r;
  }
  function u(i, r, t) {
    if (typeof i == "number") {
      if (typeof r == "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      }
      return N(i);
    }
    return V(i, r, t);
  }
  u.poolSize = 8192;
  function V(i, r, t) {
    if (typeof i == "string") return wr(i, r);
    if (ArrayBuffer.isView(i)) return ar(i);
    if (i == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof i,
      );
    }
    if (
      a(i, ArrayBuffer) || i && a(i.buffer, ArrayBuffer) ||
      typeof SharedArrayBuffer < "u" &&
        (a(i, SharedArrayBuffer) || i && a(i.buffer, SharedArrayBuffer))
    ) return L(i, r, t);
    if (typeof i == "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    }
    let n = i.valueOf && i.valueOf();
    if (n != null && n !== i) return u.from(n, r, t);
    let e = xr(i);
    if (e) return e;
    if (
      typeof Symbol < "u" && Symbol.toPrimitive != null &&
      typeof i[Symbol.toPrimitive] == "function"
    ) return u.from(i[Symbol.toPrimitive]("string"), r, t);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof i,
    );
  }
  u.from = function (i, r, t) {
    return V(i, r, t);
  };
  Object.setPrototypeOf(u.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(u, Uint8Array);
  function j(i) {
    if (typeof i != "number") {
      throw new TypeError('"size" argument must be of type number');
    }
    if (i < 0) {
      throw new RangeError(
        'The value "' + i + '" is invalid for option "size"',
      );
    }
  }
  function yr(i, r, t) {
    return j(i),
      i <= 0
        ? x(i)
        : r !== void 0
        ? typeof t == "string" ? x(i).fill(r, t) : x(i).fill(r)
        : x(i);
  }
  u.alloc = function (i, r, t) {
    return yr(i, r, t);
  };
  function N(i) {
    return j(i), x(i < 0 ? 0 : $(i) | 0);
  }
  u.allocUnsafe = function (i) {
    return N(i);
  };
  u.allocUnsafeSlow = function (i) {
    return N(i);
  };
  function wr(i, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !u.isEncoding(r)) {
      throw new TypeError("Unknown encoding: " + r);
    }
    let t = z(i, r) | 0, n = x(t), e = n.write(i, r);
    return e !== t && (n = n.slice(0, e)), n;
  }
  function b(i) {
    let r = i.length < 0 ? 0 : $(i.length) | 0, t = x(r);
    for (let n = 0; n < r; n += 1) t[n] = i[n] & 255;
    return t;
  }
  function ar(i) {
    if (a(i, Uint8Array)) {
      let r = new Uint8Array(i);
      return L(r.buffer, r.byteOffset, r.byteLength);
    }
    return b(i);
  }
  function L(i, r, t) {
    if (r < 0 || i.byteLength < r) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (i.byteLength < r + (t || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let n;
    return r === void 0 && t === void 0
      ? n = new Uint8Array(i)
      : t === void 0
      ? n = new Uint8Array(i, r)
      : n = new Uint8Array(i, r, t),
      Object.setPrototypeOf(n, u.prototype),
      n;
  }
  function xr(i) {
    if (u.isBuffer(i)) {
      let r = $(i.length) | 0, t = x(r);
      return t.length === 0 || i.copy(t, 0, 0, r), t;
    }
    if (i.length !== void 0) {
      return typeof i.length != "number" || P(i.length) ? x(0) : b(i);
    }
    if (i.type === "Buffer" && Array.isArray(i.data)) return b(i.data);
  }
  function $(i) {
    if (i >= R) {
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          R.toString(16) + " bytes",
      );
    }
    return i | 0;
  }
  function Br(i) {
    return +i != i && (i = 0), u.alloc(+i);
  }
  u.isBuffer = function (r) {
    return r != null && r._isBuffer === !0 && r !== u.prototype;
  };
  u.compare = function (r, t) {
    if (
      a(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)),
        a(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
        !u.isBuffer(r) || !u.isBuffer(t)
    ) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
      );
    }
    if (r === t) return 0;
    let n = r.length, e = t.length;
    for (let o = 0, h = Math.min(n, e); o < h; ++o) {
      if (r[o] !== t[o]) {
        n = r[o], e = t[o];
        break;
      }
    }
    return n < e ? -1 : e < n ? 1 : 0;
  };
  u.isEncoding = function (r) {
    switch (String(r).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  };
  u.concat = function (r, t) {
    if (!Array.isArray(r)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (r.length === 0) return u.alloc(0);
    let n;
    if (t === void 0) for (t = 0, n = 0; n < r.length; ++n) t += r[n].length;
    let e = u.allocUnsafe(t), o = 0;
    for (n = 0; n < r.length; ++n) {
      let h = r[n];
      if (a(h, Uint8Array)) {
        o + h.length > e.length
          ? (u.isBuffer(h) || (h = u.from(h)), h.copy(e, o))
          : Uint8Array.prototype.set.call(e, h, o);
      } else if (u.isBuffer(h)) h.copy(e, o);
      else throw new TypeError('"list" argument must be an Array of Buffers');
      o += h.length;
    }
    return e;
  };
  function z(i, r) {
    if (u.isBuffer(i)) return i.length;
    if (ArrayBuffer.isView(i) || a(i, ArrayBuffer)) return i.byteLength;
    if (typeof i != "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof i,
      );
    }
    let t = i.length, n = arguments.length > 2 && arguments[2] === !0;
    if (!n && t === 0) return 0;
    let e = !1;
    for (;;) {
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return D(i).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return ir(i).length;
        default:
          if (e) return n ? -1 : D(i).length;
          r = ("" + r).toLowerCase(), e = !0;
      }
    }
  }
  u.byteLength = z;
  function Er(i, r, t) {
    let n = !1;
    if (
      (r === void 0 || r < 0) && (r = 0),
        r > this.length ||
        ((t === void 0 || t > this.length) && (t = this.length), t <= 0) ||
        (t >>>= 0, r >>>= 0, t <= r)
    ) return "";
    for (i || (i = "utf8");;) {
      switch (i) {
        case "hex":
          return _r(this, r, t);
        case "utf8":
        case "utf-8":
          return J(this, r, t);
        case "ascii":
          return Rr(this, r, t);
        case "latin1":
        case "binary":
          return Tr(this, r, t);
        case "base64":
          return Ur(this, r, t);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Sr(this, r, t);
        default:
          if (n) throw new TypeError("Unknown encoding: " + i);
          i = (i + "").toLowerCase(), n = !0;
      }
    }
  }
  u.prototype._isBuffer = !0;
  function g(i, r, t) {
    let n = i[r];
    i[r] = i[t], i[t] = n;
  }
  u.prototype.swap16 = function () {
    let r = this.length;
    if (r % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let t = 0; t < r; t += 2) g(this, t, t + 1);
    return this;
  };
  u.prototype.swap32 = function () {
    let r = this.length;
    if (r % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let t = 0; t < r; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
    return this;
  };
  u.prototype.swap64 = function () {
    let r = this.length;
    if (r % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let t = 0; t < r; t += 8) {
      g(this, t, t + 7),
        g(this, t + 1, t + 6),
        g(this, t + 2, t + 5),
        g(this, t + 3, t + 4);
    }
    return this;
  };
  u.prototype.toString = function () {
    let r = this.length;
    return r === 0
      ? ""
      : arguments.length === 0
      ? J(this, 0, r)
      : Er.apply(this, arguments);
  };
  u.prototype.toLocaleString = u.prototype.toString;
  u.prototype.equals = function (r) {
    if (!u.isBuffer(r)) throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : u.compare(this, r) === 0;
  };
  u.prototype.inspect = function () {
    let r = "", t = U.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
      this.length > t && (r += " ... "),
      "<Buffer " + r + ">";
  };
  Y && (u.prototype[Y] = u.prototype.inspect);
  u.prototype.compare = function (r, t, n, e, o) {
    if (
      a(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)),
        !u.isBuffer(r)
    ) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
          typeof r,
      );
    }
    if (
      t === void 0 && (t = 0),
        n === void 0 && (n = r ? r.length : 0),
        e === void 0 && (e = 0),
        o === void 0 && (o = this.length),
        t < 0 || n > r.length || e < 0 || o > this.length
    ) throw new RangeError("out of range index");
    if (e >= o && t >= n) return 0;
    if (e >= o) return -1;
    if (t >= n) return 1;
    if (t >>>= 0, n >>>= 0, e >>>= 0, o >>>= 0, this === r) return 0;
    let h = o - e,
      f = n - t,
      l = Math.min(h, f),
      p = this.slice(e, o),
      s = r.slice(t, n);
    for (let c = 0; c < l; ++c) {
      if (p[c] !== s[c]) {
        h = p[c], f = s[c];
        break;
      }
    }
    return h < f ? -1 : f < h ? 1 : 0;
  };
  function H(i, r, t, n, e) {
    if (i.length === 0) return -1;
    if (
      typeof t == "string"
        ? (n = t, t = 0)
        : t > 2147483647
        ? t = 2147483647
        : t < -2147483648 && (t = -2147483648),
        t = +t,
        P(t) && (t = e ? 0 : i.length - 1),
        t < 0 && (t = i.length + t),
        t >= i.length
    ) {
      if (e) return -1;
      t = i.length - 1;
    } else if (t < 0) {
      if (e) t = 0;
      else return -1;
    }
    if (typeof r == "string" && (r = u.from(r, n)), u.isBuffer(r)) {
      return r.length === 0 ? -1 : q(i, r, t, n, e);
    }
    if (typeof r == "number") {
      return r = r & 255,
        typeof Uint8Array.prototype.indexOf == "function"
          ? e
            ? Uint8Array.prototype.indexOf.call(i, r, t)
            : Uint8Array.prototype.lastIndexOf.call(i, r, t)
          : q(i, [r], t, n, e);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function q(i, r, t, n, e) {
    let o = 1, h = i.length, f = r.length;
    if (
      n !== void 0 &&
      (n = String(n).toLowerCase(),
        n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")
    ) {
      if (i.length < 2 || r.length < 2) return -1;
      o = 2, h /= 2, f /= 2, t /= 2;
    }
    function l(s, c) {
      return o === 1 ? s[c] : s.readUInt16BE(c * o);
    }
    let p;
    if (e) {
      let s = -1;
      for (p = t; p < h; p++) {
        if (l(i, p) === l(r, s === -1 ? 0 : p - s)) {
          if (s === -1 && (s = p), p - s + 1 === f) {
            return s * o;
          }
        } else s !== -1 && (p -= p - s), s = -1;
      }
    } else {for (t + f > h && (t = h - f), p = t; p >= 0; p--) {
        let s = !0;
        for (let c = 0; c < f; c++) {
          if (l(i, p + c) !== l(r, c)) {
            s = !1;
            break;
          }
        }
        if (s) return p;
      }}
    return -1;
  }
  u.prototype.includes = function (r, t, n) {
    return this.indexOf(r, t, n) !== -1;
  };
  u.prototype.indexOf = function (r, t, n) {
    return H(this, r, t, n, !0);
  };
  u.prototype.lastIndexOf = function (r, t, n) {
    return H(this, r, t, n, !1);
  };
  function mr(i, r, t, n) {
    t = Number(t) || 0;
    let e = i.length - t;
    n ? (n = Number(n), n > e && (n = e)) : n = e;
    let o = r.length;
    n > o / 2 && (n = o / 2);
    let h;
    for (h = 0; h < n; ++h) {
      let f = parseInt(r.substr(h * 2, 2), 16);
      if (P(f)) return h;
      i[t + h] = f;
    }
    return h;
  }
  function gr(i, r, t, n) {
    return T(D(r, i.length - t), i, t, n);
  }
  function Ir(i, r, t, n) {
    return T(Dr(r), i, t, n);
  }
  function dr(i, r, t, n) {
    return T(ir(r), i, t, n);
  }
  function Fr(i, r, t, n) {
    return T(Nr(r, i.length - t), i, t, n);
  }
  u.prototype.write = function (r, t, n, e) {
    if (t === void 0) e = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string") {
      e = t, n = this.length, t = 0;
    } else if (isFinite(t)) {
      t = t >>> 0,
        isFinite(n)
          ? (n = n >>> 0, e === void 0 && (e = "utf8"))
          : (e = n, n = void 0);
    } else {throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );}
    let o = this.length - t;
    if (
      (n === void 0 || n > o) && (n = o),
        r.length > 0 && (n < 0 || t < 0) || t > this.length
    ) throw new RangeError("Attempt to write outside buffer bounds");
    e || (e = "utf8");
    let h = !1;
    for (;;) {
      switch (e) {
        case "hex":
          return mr(this, r, t, n);
        case "utf8":
        case "utf-8":
          return gr(this, r, t, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Ir(this, r, t, n);
        case "base64":
          return dr(this, r, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Fr(this, r, t, n);
        default:
          if (h) throw new TypeError("Unknown encoding: " + e);
          e = ("" + e).toLowerCase(), h = !0;
      }
    }
  };
  u.prototype.toJSON = function () {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0),
    };
  };
  function Ur(i, r, t) {
    return r === 0 && t === i.length
      ? C.fromByteArray(i)
      : C.fromByteArray(i.slice(r, t));
  }
  function J(i, r, t) {
    t = Math.min(i.length, t);
    let n = [], e = r;
    for (; e < t;) {
      let o = i[e], h = null, f = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
      if (e + f <= t) {
        let l, p, s, c;
        switch (f) {
          case 1:
            o < 128 && (h = o);
            break;
          case 2:
            l = i[e + 1],
              (l & 192) === 128 &&
              (c = (o & 31) << 6 | l & 63, c > 127 && (h = c));
            break;
          case 3:
            l = i[e + 1],
              p = i[e + 2],
              (l & 192) === 128 && (p & 192) === 128 &&
              (c = (o & 15) << 12 | (l & 63) << 6 | p & 63,
                c > 2047 && (c < 55296 || c > 57343) && (h = c));
            break;
          case 4:
            l = i[e + 1],
              p = i[e + 2],
              s = i[e + 3],
              (l & 192) === 128 && (p & 192) === 128 && (s & 192) === 128 &&
              (c = (o & 15) << 18 | (l & 63) << 12 | (p & 63) << 6 | s & 63,
                c > 65535 && c < 1114112 && (h = c));
        }
      }
      h === null ? (h = 65533, f = 1) : h > 65535 &&
        (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 | h & 1023),
        n.push(h),
        e += f;
    }
    return Ar(n);
  }
  var W = 4096;
  function Ar(i) {
    let r = i.length;
    if (r <= W) return String.fromCharCode.apply(String, i);
    let t = "", n = 0;
    for (; n < r;) t += String.fromCharCode.apply(String, i.slice(n, n += W));
    return t;
  }
  function Rr(i, r, t) {
    let n = "";
    t = Math.min(i.length, t);
    for (let e = r; e < t; ++e) n += String.fromCharCode(i[e] & 127);
    return n;
  }
  function Tr(i, r, t) {
    let n = "";
    t = Math.min(i.length, t);
    for (let e = r; e < t; ++e) n += String.fromCharCode(i[e]);
    return n;
  }
  function _r(i, r, t) {
    let n = i.length;
    (!r || r < 0) && (r = 0), (!t || t < 0 || t > n) && (t = n);
    let e = "";
    for (let o = r; o < t; ++o) e += $r[i[o]];
    return e;
  }
  function Sr(i, r, t) {
    let n = i.slice(r, t), e = "";
    for (let o = 0; o < n.length - 1; o += 2) {
      e += String.fromCharCode(n[o] + n[o + 1] * 256);
    }
    return e;
  }
  u.prototype.slice = function (r, t) {
    let n = this.length;
    r = ~~r,
      t = t === void 0 ? n : ~~t,
      r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n),
      t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n),
      t < r && (t = r);
    let e = this.subarray(r, t);
    return Object.setPrototypeOf(e, u.prototype), e;
  };
  function y(i, r, t) {
    if (i % 1 !== 0 || i < 0) throw new RangeError("offset is not uint");
    if (i + r > t) {
      throw new RangeError("Trying to access beyond buffer length");
    }
  }
  u.prototype.readUintLE = u.prototype.readUIntLE = function (r, t, n) {
    r = r >>> 0, t = t >>> 0, n || y(r, t, this.length);
    let e = this[r], o = 1, h = 0;
    for (; ++h < t && (o *= 256);) e += this[r + h] * o;
    return e;
  };
  u.prototype.readUintBE = u.prototype.readUIntBE = function (r, t, n) {
    r = r >>> 0, t = t >>> 0, n || y(r, t, this.length);
    let e = this[r + --t], o = 1;
    for (; t > 0 && (o *= 256);) e += this[r + --t] * o;
    return e;
  };
  u.prototype.readUint8 = u.prototype.readUInt8 = function (r, t) {
    return r = r >>> 0, t || y(r, 1, this.length), this[r];
  };
  u.prototype.readUint16LE = u.prototype.readUInt16LE = function (r, t) {
    return r = r >>> 0, t || y(r, 2, this.length), this[r] | this[r + 1] << 8;
  };
  u.prototype.readUint16BE = u.prototype.readUInt16BE = function (r, t) {
    return r = r >>> 0, t || y(r, 2, this.length), this[r] << 8 | this[r + 1];
  };
  u.prototype.readUint32LE = u.prototype.readUInt32LE = function (r, t) {
    return r = r >>> 0,
      t || y(r, 4, this.length),
      (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  };
  u.prototype.readUint32BE = u.prototype.readUInt32BE = function (r, t) {
    return r = r >>> 0,
      t || y(r, 4, this.length),
      this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  };
  u.prototype.readBigUInt64LE = B(function (r) {
    r = r >>> 0, F(r, "offset");
    let t = this[r], n = this[r + 7];
    (t === void 0 || n === void 0) && A(r, this.length - 8);
    let e = t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24,
      o = this[++r] + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + n * 2 ** 24;
    return BigInt(e) + (BigInt(o) << BigInt(32));
  });
  u.prototype.readBigUInt64BE = B(function (r) {
    r = r >>> 0, F(r, "offset");
    let t = this[r], n = this[r + 7];
    (t === void 0 || n === void 0) && A(r, this.length - 8);
    let e = t * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r],
      o = this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n;
    return (BigInt(e) << BigInt(32)) + BigInt(o);
  });
  u.prototype.readIntLE = function (r, t, n) {
    r = r >>> 0, t = t >>> 0, n || y(r, t, this.length);
    let e = this[r], o = 1, h = 0;
    for (; ++h < t && (o *= 256);) e += this[r + h] * o;
    return o *= 128, e >= o && (e -= Math.pow(2, 8 * t)), e;
  };
  u.prototype.readIntBE = function (r, t, n) {
    r = r >>> 0, t = t >>> 0, n || y(r, t, this.length);
    let e = t, o = 1, h = this[r + --e];
    for (; e > 0 && (o *= 256);) h += this[r + --e] * o;
    return o *= 128, h >= o && (h -= Math.pow(2, 8 * t)), h;
  };
  u.prototype.readInt8 = function (r, t) {
    return r = r >>> 0,
      t || y(r, 1, this.length),
      this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  };
  u.prototype.readInt16LE = function (r, t) {
    r = r >>> 0, t || y(r, 2, this.length);
    let n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  u.prototype.readInt16BE = function (r, t) {
    r = r >>> 0, t || y(r, 2, this.length);
    let n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  u.prototype.readInt32LE = function (r, t) {
    return r = r >>> 0,
      t || y(r, 4, this.length),
      this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  };
  u.prototype.readInt32BE = function (r, t) {
    return r = r >>> 0,
      t || y(r, 4, this.length),
      this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  };
  u.prototype.readBigInt64LE = B(function (r) {
    r = r >>> 0, F(r, "offset");
    let t = this[r], n = this[r + 7];
    (t === void 0 || n === void 0) && A(r, this.length - 8);
    let e = this[r + 4] + this[r + 5] * 2 ** 8 + this[r + 6] * 2 ** 16 +
      (n << 24);
    return (BigInt(e) << BigInt(32)) +
      BigInt(
        t + this[++r] * 2 ** 8 + this[++r] * 2 ** 16 + this[++r] * 2 ** 24,
      );
  });
  u.prototype.readBigInt64BE = B(function (r) {
    r = r >>> 0, F(r, "offset");
    let t = this[r], n = this[r + 7];
    (t === void 0 || n === void 0) && A(r, this.length - 8);
    let e = (t << 24) + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + this[++r];
    return (BigInt(e) << BigInt(32)) +
      BigInt(
        this[++r] * 2 ** 24 + this[++r] * 2 ** 16 + this[++r] * 2 ** 8 + n,
      );
  });
  u.prototype.readFloatLE = function (r, t) {
    return r = r >>> 0, t || y(r, 4, this.length), d.read(this, r, !0, 23, 4);
  };
  u.prototype.readFloatBE = function (r, t) {
    return r = r >>> 0, t || y(r, 4, this.length), d.read(this, r, !1, 23, 4);
  };
  u.prototype.readDoubleLE = function (r, t) {
    return r = r >>> 0, t || y(r, 8, this.length), d.read(this, r, !0, 52, 8);
  };
  u.prototype.readDoubleBE = function (r, t) {
    return r = r >>> 0, t || y(r, 8, this.length), d.read(this, r, !1, 52, 8);
  };
  function w(i, r, t, n, e, o) {
    if (!u.isBuffer(i)) {
      throw new TypeError('"buffer" argument must be a Buffer instance');
    }
    if (r > e || r < o) {
      throw new RangeError('"value" argument is out of bounds');
    }
    if (t + n > i.length) throw new RangeError("Index out of range");
  }
  u.prototype.writeUintLE = u.prototype.writeUIntLE = function (r, t, n, e) {
    if (r = +r, t = t >>> 0, n = n >>> 0, !e) {
      let f = Math.pow(2, 8 * n) - 1;
      w(this, r, t, n, f, 0);
    }
    let o = 1, h = 0;
    for (this[t] = r & 255; ++h < n && (o *= 256);) this[t + h] = r / o & 255;
    return t + n;
  };
  u.prototype.writeUintBE = u.prototype.writeUIntBE = function (r, t, n, e) {
    if (r = +r, t = t >>> 0, n = n >>> 0, !e) {
      let f = Math.pow(2, 8 * n) - 1;
      w(this, r, t, n, f, 0);
    }
    let o = n - 1, h = 1;
    for (this[t + o] = r & 255; --o >= 0 && (h *= 256);) {
      this[t + o] = r / h & 255;
    }
    return t + n;
  };
  u.prototype.writeUint8 = u.prototype.writeUInt8 = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 1, 255, 0),
      this[t] = r & 255,
      t + 1;
  };
  u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 2, 65535, 0),
      this[t] = r & 255,
      this[t + 1] = r >>> 8,
      t + 2;
  };
  u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 2, 65535, 0),
      this[t] = r >>> 8,
      this[t + 1] = r & 255,
      t + 2;
  };
  u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 4, 4294967295, 0),
      this[t + 3] = r >>> 24,
      this[t + 2] = r >>> 16,
      this[t + 1] = r >>> 8,
      this[t] = r & 255,
      t + 4;
  };
  u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 4, 4294967295, 0),
      this[t] = r >>> 24,
      this[t + 1] = r >>> 16,
      this[t + 2] = r >>> 8,
      this[t + 3] = r & 255,
      t + 4;
  };
  function K(i, r, t, n, e) {
    tr(r, n, e, i, t, 7);
    let o = Number(r & BigInt(4294967295));
    i[t++] = o,
      o = o >> 8,
      i[t++] = o,
      o = o >> 8,
      i[t++] = o,
      o = o >> 8,
      i[t++] = o;
    let h = Number(r >> BigInt(32) & BigInt(4294967295));
    return i[t++] = h,
      h = h >> 8,
      i[t++] = h,
      h = h >> 8,
      i[t++] = h,
      h = h >> 8,
      i[t++] = h,
      t;
  }
  function Z(i, r, t, n, e) {
    tr(r, n, e, i, t, 7);
    let o = Number(r & BigInt(4294967295));
    i[t + 7] = o,
      o = o >> 8,
      i[t + 6] = o,
      o = o >> 8,
      i[t + 5] = o,
      o = o >> 8,
      i[t + 4] = o;
    let h = Number(r >> BigInt(32) & BigInt(4294967295));
    return i[t + 3] = h,
      h = h >> 8,
      i[t + 2] = h,
      h = h >> 8,
      i[t + 1] = h,
      h = h >> 8,
      i[t] = h,
      t + 8;
  }
  u.prototype.writeBigUInt64LE = B(function (r, t = 0) {
    return K(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  u.prototype.writeBigUInt64BE = B(function (r, t = 0) {
    return Z(this, r, t, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  u.prototype.writeIntLE = function (r, t, n, e) {
    if (r = +r, t = t >>> 0, !e) {
      let l = Math.pow(2, 8 * n - 1);
      w(this, r, t, n, l - 1, -l);
    }
    let o = 0, h = 1, f = 0;
    for (this[t] = r & 255; ++o < n && (h *= 256);) {
      r < 0 && f === 0 && this[t + o - 1] !== 0 && (f = 1),
        this[t + o] = (r / h >> 0) - f & 255;
    }
    return t + n;
  };
  u.prototype.writeIntBE = function (r, t, n, e) {
    if (r = +r, t = t >>> 0, !e) {
      let l = Math.pow(2, 8 * n - 1);
      w(this, r, t, n, l - 1, -l);
    }
    let o = n - 1, h = 1, f = 0;
    for (this[t + o] = r & 255; --o >= 0 && (h *= 256);) {
      r < 0 && f === 0 && this[t + o + 1] !== 0 && (f = 1),
        this[t + o] = (r / h >> 0) - f & 255;
    }
    return t + n;
  };
  u.prototype.writeInt8 = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 1, 127, -128),
      r < 0 && (r = 255 + r + 1),
      this[t] = r & 255,
      t + 1;
  };
  u.prototype.writeInt16LE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 2, 32767, -32768),
      this[t] = r & 255,
      this[t + 1] = r >>> 8,
      t + 2;
  };
  u.prototype.writeInt16BE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 2, 32767, -32768),
      this[t] = r >>> 8,
      this[t + 1] = r & 255,
      t + 2;
  };
  u.prototype.writeInt32LE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 4, 2147483647, -2147483648),
      this[t] = r & 255,
      this[t + 1] = r >>> 8,
      this[t + 2] = r >>> 16,
      this[t + 3] = r >>> 24,
      t + 4;
  };
  u.prototype.writeInt32BE = function (r, t, n) {
    return r = +r,
      t = t >>> 0,
      n || w(this, r, t, 4, 2147483647, -2147483648),
      r < 0 && (r = 4294967295 + r + 1),
      this[t] = r >>> 24,
      this[t + 1] = r >>> 16,
      this[t + 2] = r >>> 8,
      this[t + 3] = r & 255,
      t + 4;
  };
  u.prototype.writeBigInt64LE = B(function (r, t = 0) {
    return K(
      this,
      r,
      t,
      -BigInt("0x8000000000000000"),
      BigInt("0x7fffffffffffffff"),
    );
  });
  u.prototype.writeBigInt64BE = B(function (r, t = 0) {
    return Z(
      this,
      r,
      t,
      -BigInt("0x8000000000000000"),
      BigInt("0x7fffffffffffffff"),
    );
  });
  function Q(i, r, t, n, e, o) {
    if (t + n > i.length) throw new RangeError("Index out of range");
    if (t < 0) throw new RangeError("Index out of range");
  }
  function v(i, r, t, n, e) {
    return r = +r,
      t = t >>> 0,
      e || Q(i, r, t, 4, 34028234663852886e22, -34028234663852886e22),
      d.write(i, r, t, n, 23, 4),
      t + 4;
  }
  u.prototype.writeFloatLE = function (r, t, n) {
    return v(this, r, t, !0, n);
  };
  u.prototype.writeFloatBE = function (r, t, n) {
    return v(this, r, t, !1, n);
  };
  function rr(i, r, t, n, e) {
    return r = +r,
      t = t >>> 0,
      e || Q(i, r, t, 8, 17976931348623157e292, -17976931348623157e292),
      d.write(i, r, t, n, 52, 8),
      t + 8;
  }
  u.prototype.writeDoubleLE = function (r, t, n) {
    return rr(this, r, t, !0, n);
  };
  u.prototype.writeDoubleBE = function (r, t, n) {
    return rr(this, r, t, !1, n);
  };
  u.prototype.copy = function (r, t, n, e) {
    if (!u.isBuffer(r)) throw new TypeError("argument should be a Buffer");
    if (
      n || (n = 0),
        !e && e !== 0 && (e = this.length),
        t >= r.length && (t = r.length),
        t || (t = 0),
        e > 0 && e < n && (e = n),
        e === n || r.length === 0 || this.length === 0
    ) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
    if (e < 0) throw new RangeError("sourceEnd out of bounds");
    e > this.length && (e = this.length),
      r.length - t < e - n && (e = r.length - t + n);
    let o = e - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function"
      ? this.copyWithin(t, n, e)
      : Uint8Array.prototype.set.call(r, this.subarray(n, e), t),
      o;
  };
  u.prototype.fill = function (r, t, n, e) {
    if (typeof r == "string") {
      if (
        typeof t == "string"
          ? (e = t, t = 0, n = this.length)
          : typeof n == "string" && (e = n, n = this.length),
          e !== void 0 && typeof e != "string"
      ) throw new TypeError("encoding must be a string");
      if (typeof e == "string" && !u.isEncoding(e)) {
        throw new TypeError("Unknown encoding: " + e);
      }
      if (r.length === 1) {
        let h = r.charCodeAt(0);
        (e === "utf8" && h < 128 || e === "latin1") && (r = h);
      }
    } else {typeof r == "number"
        ? r = r & 255
        : typeof r == "boolean" && (r = Number(r));}
    if (t < 0 || this.length < t || this.length < n) {
      throw new RangeError("Out of range index");
    }
    if (n <= t) return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, r || (r = 0);
    let o;
    if (typeof r == "number") for (o = t; o < n; ++o) this[o] = r;
    else {
      let h = u.isBuffer(r) ? r : u.from(r, e), f = h.length;
      if (f === 0) {
        throw new TypeError(
          'The value "' + r + '" is invalid for argument "value"',
        );
      }
      for (o = 0; o < n - t; ++o) this[o + t] = h[o % f];
    }
    return this;
  };
  var I = {};
  function k(i, r, t) {
    I[i] = class extends t {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: r.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          this.name = `${this.name} [${i}]`,
          this.stack,
          delete this.name;
      }
      get code() {
        return i;
      }
      set code(e) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: e,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${i}]: ${this.message}`;
      }
    };
  }
  k("ERR_BUFFER_OUT_OF_BOUNDS", function (i) {
    return i
      ? `${i} is outside of buffer bounds`
      : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  k("ERR_INVALID_ARG_TYPE", function (i, r) {
    return `The "${i}" argument must be of type number. Received type ${typeof r}`;
  }, TypeError);
  k("ERR_OUT_OF_RANGE", function (i, r, t) {
    let n = `The value of "${i}" is out of range.`, e = t;
    return Number.isInteger(t) && Math.abs(t) > 2 ** 32
      ? e = X(String(t))
      : typeof t == "bigint" &&
        (e = String(t),
          (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) &&
          (e = X(e)),
          e += "n"),
      n += ` It must be ${r}. Received ${e}`,
      n;
  }, RangeError);
  function X(i) {
    let r = "", t = i.length, n = i[0] === "-" ? 1 : 0;
    for (; t >= n + 4; t -= 3) r = `_${i.slice(t - 3, t)}${r}`;
    return `${i.slice(0, t)}${r}`;
  }
  function Cr(i, r, t) {
    F(r, "offset"),
      (i[r] === void 0 || i[r + t] === void 0) && A(r, i.length - (t + 1));
  }
  function tr(i, r, t, n, e, o) {
    if (i > t || i < r) {
      let h = typeof r == "bigint" ? "n" : "", f;
      throw o > 3
        ? r === 0 || r === BigInt(0)
          ? f = `>= 0${h} and < 2${h} ** ${(o + 1) * 8}${h}`
          : f = `>= -(2${h} ** ${(o + 1) * 8 - 1}${h}) and < 2 ** ${
            (o + 1) * 8 - 1
          }${h}`
        : f = `>= ${r}${h} and <= ${t}${h}`,
        new I.ERR_OUT_OF_RANGE("value", f, i);
    }
    Cr(n, e, o);
  }
  function F(i, r) {
    if (typeof i != "number") throw new I.ERR_INVALID_ARG_TYPE(r, "number", i);
  }
  function A(i, r, t) {
    throw Math.floor(i) !== i
      ? (F(i, t), new I.ERR_OUT_OF_RANGE(t || "offset", "an integer", i))
      : r < 0
      ? new I.ERR_BUFFER_OUT_OF_BOUNDS()
      : new I.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${r}`, i);
  }
  var br = /[^+/0-9A-Za-z-_]/g;
  function Lr(i) {
    if (i = i.split("=")[0], i = i.trim().replace(br, ""), i.length < 2) {
      return "";
    }
    for (; i.length % 4 !== 0;) i = i + "=";
    return i;
  }
  function D(i, r) {
    r = r || 1 / 0;
    let t, n = i.length, e = null, o = [];
    for (let h = 0; h < n; ++h) {
      if (t = i.charCodeAt(h), t > 55295 && t < 57344) {
        if (!e) {
          if (t > 56319) {
            (r -= 3) > -1 && o.push(239, 191, 189);
            continue;
          } else if (h + 1 === n) {
            (r -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          e = t;
          continue;
        }
        if (t < 56320) {
          (r -= 3) > -1 && o.push(239, 191, 189), e = t;
          continue;
        }
        t = (e - 55296 << 10 | t - 56320) + 65536;
      } else e && (r -= 3) > -1 && o.push(239, 191, 189);
      if (e = null, t < 128) {
        if ((r -= 1) < 0) break;
        o.push(t);
      } else if (t < 2048) {
        if ((r -= 2) < 0) break;
        o.push(t >> 6 | 192, t & 63 | 128);
      } else if (t < 65536) {
        if ((r -= 3) < 0) break;
        o.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
      } else if (t < 1114112) {
        if ((r -= 4) < 0) break;
        o.push(
          t >> 18 | 240,
          t >> 12 & 63 | 128,
          t >> 6 & 63 | 128,
          t & 63 | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return o;
  }
  function Dr(i) {
    let r = [];
    for (let t = 0; t < i.length; ++t) r.push(i.charCodeAt(t) & 255);
    return r;
  }
  function Nr(i, r) {
    let t, n, e, o = [];
    for (let h = 0; h < i.length && !((r -= 2) < 0); ++h) {
      t = i.charCodeAt(h), n = t >> 8, e = t % 256, o.push(e), o.push(n);
    }
    return o;
  }
  function ir(i) {
    return C.toByteArray(Lr(i));
  }
  function T(i, r, t, n) {
    let e;
    for (e = 0; e < n && !(e + t >= r.length || e >= i.length); ++e) {
      r[e + t] = i[e];
    }
    return e;
  }
  function a(i, r) {
    return i instanceof r ||
      i != null && i.constructor != null && i.constructor.name != null &&
        i.constructor.name === r.name;
  }
  function P(i) {
    return i !== i;
  }
  var $r = function () {
    let i = "0123456789abcdef", r = new Array(256);
    for (let t = 0; t < 16; ++t) {
      let n = t * 16;
      for (let e = 0; e < 16; ++e) r[n + e] = i[t] + i[e];
    }
    return r;
  }();
  function B(i) {
    return typeof BigInt > "u" ? kr : i;
  }
  function kr() {
    throw new Error("BigInt not supported");
  }
});
var E2 = {};
lr(E2, {
  Buffer: () => Pr,
  INSPECT_MAX_BYTES: () => Or,
  SlowBuffer: () => Mr,
  default: () => qr,
  kMaxLength: () => Gr,
});
var er = G5(M4());
m2(E2, G5(M4()));
var { Buffer: Pr, SlowBuffer: Mr, INSPECT_MAX_BYTES: Or, kMaxLength: Gr } = er,
  { default: nr, ...Yr } = er,
  qr = nr !== void 0 ? nr : Yr;
var g3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  C5 = new Uint8Array(64),
  w4 = new Uint8Array(128);
for (let t = 0; t < g3.length; t++) {
  let e = g3.charCodeAt(t);
  C5[t] = e, w4[e] = t;
}
var y3 = typeof TextDecoder < "u" ? new TextDecoder() : typeof Pr < "u"
  ? {
    decode(t) {
      return Pr.from(t.buffer, t.byteOffset, t.byteLength).toString();
    },
  }
  : {
    decode(t) {
      let e = "";
      for (let c = 0; c < t.length; c++) e += String.fromCharCode(t[c]);
      return e;
    },
  };
function T3(t) {
  let e = new Int32Array(5),
    c = 1024 * 16,
    f = c - 36,
    o = new Uint8Array(c),
    l = o.subarray(0, f),
    n = 0,
    i = "";
  for (let r = 0; r < t.length; r++) {
    let d = t[r];
    if (
      r > 0 && (n === c && (i += y3.decode(o), n = 0), o[n++] = 59),
        d.length !== 0
    ) {
      e[0] = 0;
      for (let s = 0; s < d.length; s++) {
        let u = d[s];
        n > f && (i += y3.decode(l), o.copyWithin(0, f, n), n -= f),
          s > 0 && (o[n++] = 44),
          n = a2(o, n, e, u, 0),
          u.length !== 1 &&
          (n = a2(o, n, e, u, 1),
            n = a2(o, n, e, u, 2),
            n = a2(o, n, e, u, 3),
            u.length !== 4 && (n = a2(o, n, e, u, 4)));
      }
    }
  }
  return i + y3.decode(o.subarray(0, n));
}
function a2(t, e, c, f, o) {
  let l = f[o], n = l - c[o];
  c[o] = l, n = n < 0 ? -n << 1 | 1 : n << 1;
  do {
    let i = n & 31;
    n >>>= 5, n > 0 && (i |= 32), t[e++] = C5[i];
  } while (n > 0);
  return e;
}
var g4 = class a {
    constructor(t) {
      this.bits = t instanceof a ? t.bits.slice() : [];
    }
    add(t) {
      this.bits[t >> 5] |= 1 << (t & 31);
    }
    has(t) {
      return !!(this.bits[t >> 5] & 1 << (t & 31));
    }
  },
  p2 = class a {
    constructor(t, e, n) {
      this.start = t,
        this.end = e,
        this.original = n,
        this.intro = "",
        this.outro = "",
        this.content = n,
        this.storeName = !1,
        this.edited = !1,
        this.previous = null,
        this.next = null;
    }
    appendLeft(t) {
      this.outro += t;
    }
    appendRight(t) {
      this.intro = this.intro + t;
    }
    clone() {
      let t = new a(this.start, this.end, this.original);
      return t.intro = this.intro,
        t.outro = this.outro,
        t.content = this.content,
        t.storeName = this.storeName,
        t.edited = this.edited,
        t;
    }
    contains(t) {
      return this.start < t && t < this.end;
    }
    eachNext(t) {
      let e = this;
      for (; e;) t(e), e = e.next;
    }
    eachPrevious(t) {
      let e = this;
      for (; e;) t(e), e = e.previous;
    }
    edit(t, e, n) {
      return this.content = t,
        n || (this.intro = "", this.outro = ""),
        this.storeName = e,
        this.edited = !0,
        this;
    }
    prependLeft(t) {
      this.outro = t + this.outro;
    }
    prependRight(t) {
      this.intro = t + this.intro;
    }
    split(t) {
      let e = t - this.start,
        n = this.original.slice(0, e),
        i = this.original.slice(e);
      this.original = n;
      let r = new a(t, this.end, i);
      return r.outro = this.outro,
        this.outro = "",
        this.end = t,
        this.edited ? (r.edit("", !1), this.content = "") : this.content = n,
        r.next = this.next,
        r.next && (r.next.previous = r),
        r.previous = this,
        this.next = r,
        r;
    }
    toString() {
      return this.intro + this.content + this.outro;
    }
    trimEnd(t) {
      if (this.outro = this.outro.replace(t, ""), this.outro.length) return !0;
      let e = this.content.replace(t, "");
      if (e.length) {
        return e !== this.content &&
          (this.split(this.start + e.length).edit("", void 0, !0),
            this.edited && this.edit(e, this.storeName, !0)),
          !0;
      }
      if (
        this.edit("", void 0, !0),
          this.intro = this.intro.replace(t, ""),
          this.intro.length
      ) return !0;
    }
    trimStart(t) {
      if (this.intro = this.intro.replace(t, ""), this.intro.length) return !0;
      let e = this.content.replace(t, "");
      if (e.length) {
        if (e !== this.content) {
          let n = this.split(this.end - e.length);
          this.edited && n.edit(e, this.storeName, !0),
            this.edit("", void 0, !0);
        }
        return !0;
      } else if (
        this.edit("", void 0, !0),
          this.outro = this.outro.replace(t, ""),
          this.outro.length
      ) return !0;
    }
  };
function L3() {
  return typeof window < "u" && typeof window.btoa == "function"
    ? (a) => window.btoa(unescape(encodeURIComponent(a)))
    : typeof Pr == "function"
    ? (a) => Pr.from(a, "utf-8").toString("base64")
    : () => {
      throw new Error(
        "Unsupported environment: `window.btoa` or `Buffer` should be supported.",
      );
    };
}
var k6 = L3(),
  m3 = class {
    constructor(t) {
      this.version = 3,
        this.file = t.file,
        this.sources = t.sources,
        this.sourcesContent = t.sourcesContent,
        this.names = t.names,
        this.mappings = T3(t.mappings),
        typeof t.x_google_ignoreList < "u" &&
        (this.x_google_ignoreList = t.x_google_ignoreList);
    }
    toString() {
      return JSON.stringify(this);
    }
    toUrl() {
      return "data:application/json;charset=utf-8;base64," +
        k6(this.toString());
    }
  };
function R3(a) {
  let t = a.split(`
`),
    e = t.filter((r) => /^\t+/.test(r)),
    n = t.filter((r) => /^ {2,}/.test(r));
  if (e.length === 0 && n.length === 0) return null;
  if (e.length >= n.length) return "	";
  let i = n.reduce((r, o) => {
    let h = /^ +/.exec(o)[0].length;
    return Math.min(h, r);
  }, 1 / 0);
  return new Array(i + 1).join(" ");
}
function E3(a, t) {
  let e = a.split(/[/\\]/), n = t.split(/[/\\]/);
  for (e.pop(); e[0] === n[0];) e.shift(), n.shift();
  if (e.length) {
    let i = e.length;
    for (; i--;) e[i] = "..";
  }
  return e.concat(n).join("/");
}
var _6 = Object.prototype.toString;
function y4(a) {
  return _6.call(a) === "[object Object]";
}
function C6(a) {
  let t = a.split(`
`),
    e = [];
  for (let n = 0, i = 0; n < t.length; n++) e.push(i), i += t[n].length + 1;
  return function (i) {
    let r = 0, o = e.length;
    for (; r < o;) {
      let l = r + o >> 1;
      i < e[l] ? o = l : r = l + 1;
    }
    let h = r - 1, s = i - e[h];
    return { line: h, column: s };
  };
}
var O5 = /\w/,
  w5 = class {
    constructor(t) {
      this.hires = t,
        this.generatedCodeLine = 0,
        this.generatedCodeColumn = 0,
        this.raw = [],
        this.rawSegments = this.raw[this.generatedCodeLine] = [],
        this.pending = null;
    }
    addEdit(t, e, n, i) {
      if (e.length) {
        let r = e.indexOf(
            `
`,
            0,
          ),
          o = -1;
        for (; r >= 0;) {
          let s = [this.generatedCodeColumn, t, n.line, n.column];
          i >= 0 && s.push(i),
            this.rawSegments.push(s),
            this.generatedCodeLine += 1,
            this.raw[this.generatedCodeLine] = this.rawSegments = [],
            this.generatedCodeColumn = 0,
            o = r,
            r = e.indexOf(
              `
`,
              r + 1,
            );
        }
        let h = [this.generatedCodeColumn, t, n.line, n.column];
        i >= 0 && h.push(i),
          this.rawSegments.push(h),
          this.advance(e.slice(o + 1));
      } else {this.pending &&
          (this.rawSegments.push(this.pending), this.advance(e));}
      this.pending = null;
    }
    addUneditedChunk(t, e, n, i, r) {
      let o = e.start, h = !0, s = !1;
      for (; o < e.end;) {
        if (this.hires || h || r.has(o)) {
          let l = [this.generatedCodeColumn, t, i.line, i.column];
          this.hires === "boundary"
            ? O5.test(n[o])
              ? s || (this.rawSegments.push(l), s = !0)
              : (this.rawSegments.push(l), s = !1)
            : this.rawSegments.push(l);
        }
        n[o] === `
`
          ? (i.line += 1,
            i.column = 0,
            this.generatedCodeLine += 1,
            this.raw[this.generatedCodeLine] = this.rawSegments = [],
            this.generatedCodeColumn = 0,
            h = !0)
          : (i.column += 1, this.generatedCodeColumn += 1, h = !1), o += 1;
      }
      this.pending = null;
    }
    advance(t) {
      if (!t) return;
      let e = t.split(`
`);
      if (e.length > 1) {
        for (let n = 0; n < e.length - 1; n++) {
          this.generatedCodeLine++,
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
        }
        this.generatedCodeColumn = 0;
      }
      this.generatedCodeColumn += e[e.length - 1].length;
    }
  },
  f2 = `
`,
  c3 = { insertLeft: !1, insertRight: !1, storeName: !1 },
  b5 = class a {
    constructor(t, e = {}) {
      let n = new p2(0, t.length, t);
      Object.defineProperties(this, {
        original: { writable: !0, value: t },
        outro: { writable: !0, value: "" },
        intro: { writable: !0, value: "" },
        firstChunk: { writable: !0, value: n },
        lastChunk: { writable: !0, value: n },
        lastSearchedChunk: { writable: !0, value: n },
        byStart: { writable: !0, value: {} },
        byEnd: { writable: !0, value: {} },
        filename: { writable: !0, value: e.filename },
        indentExclusionRanges: { writable: !0, value: e.indentExclusionRanges },
        sourcemapLocations: { writable: !0, value: new g4() },
        storedNames: { writable: !0, value: {} },
        indentStr: { writable: !0, value: void 0 },
        ignoreList: { writable: !0, value: e.ignoreList },
      }),
        this.byStart[0] = n,
        this.byEnd[t.length] = n;
    }
    addSourcemapLocation(t) {
      this.sourcemapLocations.add(t);
    }
    append(t) {
      if (typeof t != "string") {
        throw new TypeError("outro content must be a string");
      }
      return this.outro += t, this;
    }
    appendLeft(t, e) {
      if (typeof e != "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(t);
      let n = this.byEnd[t];
      return n ? n.appendLeft(e) : this.intro += e, this;
    }
    appendRight(t, e) {
      if (typeof e != "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(t);
      let n = this.byStart[t];
      return n ? n.appendRight(e) : this.outro += e, this;
    }
    clone() {
      let t = new a(this.original, { filename: this.filename }),
        e = this.firstChunk,
        n = t.firstChunk = t.lastSearchedChunk = e.clone();
      for (; e;) {
        t.byStart[n.start] = n, t.byEnd[n.end] = n;
        let i = e.next, r = i && i.clone();
        r && (n.next = r, r.previous = n, n = r), e = i;
      }
      return t.lastChunk = n,
        this.indentExclusionRanges &&
        (t.indentExclusionRanges = this.indentExclusionRanges.slice()),
        t.sourcemapLocations = new g4(this.sourcemapLocations),
        t.intro = this.intro,
        t.outro = this.outro,
        t;
    }
    generateDecodedMap(t) {
      t = t || {};
      let e = 0,
        n = Object.keys(this.storedNames),
        i = new w5(t.hires),
        r = C6(this.original);
      return this.intro && i.advance(this.intro),
        this.firstChunk.eachNext((o) => {
          let h = r(o.start);
          o.intro.length && i.advance(o.intro),
            o.edited
              ? i.addEdit(
                e,
                o.content,
                h,
                o.storeName ? n.indexOf(o.original) : -1,
              )
              : i.addUneditedChunk(
                e,
                o,
                this.original,
                h,
                this.sourcemapLocations,
              ),
            o.outro.length && i.advance(o.outro);
        }),
        {
          file: t.file ? t.file.split(/[/\\]/).pop() : void 0,
          sources: [t.source ? E3(t.file || "", t.source) : t.file || ""],
          sourcesContent: t.includeContent ? [this.original] : void 0,
          names: n,
          mappings: i.raw,
          x_google_ignoreList: this.ignoreList ? [e] : void 0,
        };
    }
    generateMap(t) {
      return new m3(this.generateDecodedMap(t));
    }
    _ensureindentStr() {
      this.indentStr === void 0 && (this.indentStr = R3(this.original));
    }
    _getRawIndentString() {
      return this._ensureindentStr(), this.indentStr;
    }
    getIndentString() {
      return this._ensureindentStr(),
        this.indentStr === null ? "	" : this.indentStr;
    }
    indent(t, e) {
      let n = /^[^\r\n]/gm;
      if (
        y4(t) && (e = t, t = void 0),
          t === void 0 && (this._ensureindentStr(), t = this.indentStr || "	"),
          t === ""
      ) return this;
      e = e || {};
      let i = {};
      e.exclude &&
        (typeof e.exclude[0] == "number" ? [e.exclude] : e.exclude).forEach(
          (u) => {
            for (let d = u[0]; d < u[1]; d += 1) i[d] = !0;
          },
        );
      let r = e.indentStart !== !1, o = (l) => r ? `${t}${l}` : (r = !0, l);
      this.intro = this.intro.replace(n, o);
      let h = 0, s = this.firstChunk;
      for (; s;) {
        let l = s.end;
        if (s.edited) {
          i[h] ||
            (s.content = s.content.replace(n, o),
              s.content.length && (r = s.content[s.content.length - 1] === `
`));
        } else {for (h = s.start; h < l;) {
            if (!i[h]) {
              let u = this.original[h];
              u === `
`
                ? r = !0
                : u !== "\r" && r &&
                  (r = !1,
                    h === s.start || (this._splitChunk(s, h), s = s.next),
                    s.prependRight(t));
            }
            h += 1;
          }}
        h = s.end, s = s.next;
      }
      return this.outro = this.outro.replace(n, o), this;
    }
    insert() {
      throw new Error(
        "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)",
      );
    }
    insertLeft(t, e) {
      return c3.insertLeft ||
        (console.warn(
          "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead",
        ),
          c3.insertLeft = !0),
        this.appendLeft(t, e);
    }
    insertRight(t, e) {
      return c3.insertRight ||
        (console.warn(
          "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead",
        ),
          c3.insertRight = !0),
        this.prependRight(t, e);
    }
    move(t, e, n) {
      if (n >= t && n <= e) {
        throw new Error("Cannot move a selection inside itself");
      }
      this._split(t), this._split(e), this._split(n);
      let i = this.byStart[t],
        r = this.byEnd[e],
        o = i.previous,
        h = r.next,
        s = this.byStart[n];
      if (!s && r === this.lastChunk) return this;
      let l = s ? s.previous : this.lastChunk;
      return o && (o.next = h),
        h && (h.previous = o),
        l && (l.next = i),
        s && (s.previous = r),
        i.previous || (this.firstChunk = r.next),
        r.next || (this.lastChunk = i.previous, this.lastChunk.next = null),
        i.previous = l,
        r.next = s || null,
        l || (this.firstChunk = i),
        s || (this.lastChunk = r),
        this;
    }
    overwrite(t, e, n, i) {
      return i = i || {},
        this.update(t, e, n, { ...i, overwrite: !i.contentOnly });
    }
    update(t, e, n, i) {
      if (typeof n != "string") {
        throw new TypeError("replacement content must be a string");
      }
      for (; t < 0;) t += this.original.length;
      for (; e < 0;) e += this.original.length;
      if (e > this.original.length) throw new Error("end is out of bounds");
      if (t === e) {
        throw new Error(
          "Cannot overwrite a zero-length range – use appendLeft or prependRight instead",
        );
      }
      this._split(t),
        this._split(e),
        i === !0 &&
        (c3.storeName ||
          (console.warn(
            "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string",
          ),
            c3.storeName = !0),
          i = { storeName: !0 });
      let r = i !== void 0 ? i.storeName : !1,
        o = i !== void 0 ? i.overwrite : !1;
      if (r) {
        let l = this.original.slice(t, e);
        Object.defineProperty(this.storedNames, l, {
          writable: !0,
          value: !0,
          enumerable: !0,
        });
      }
      let h = this.byStart[t], s = this.byEnd[e];
      if (h) {
        let l = h;
        for (; l !== s;) {
          if (l.next !== this.byStart[l.end]) {
            throw new Error("Cannot overwrite across a split point");
          }
          l = l.next, l.edit("", !1);
        }
        h.edit(n, r, !o);
      } else {
        let l = new p2(t, e, "").edit(n, r);
        s.next = l, l.previous = s;
      }
      return this;
    }
    prepend(t) {
      if (typeof t != "string") {
        throw new TypeError("outro content must be a string");
      }
      return this.intro = t + this.intro, this;
    }
    prependLeft(t, e) {
      if (typeof e != "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(t);
      let n = this.byEnd[t];
      return n ? n.prependLeft(e) : this.intro = e + this.intro, this;
    }
    prependRight(t, e) {
      if (typeof e != "string") {
        throw new TypeError("inserted content must be a string");
      }
      this._split(t);
      let n = this.byStart[t];
      return n ? n.prependRight(e) : this.outro = e + this.outro, this;
    }
    remove(t, e) {
      for (; t < 0;) t += this.original.length;
      for (; e < 0;) e += this.original.length;
      if (t === e) return this;
      if (t < 0 || e > this.original.length) {
        throw new Error("Character is out of bounds");
      }
      if (t > e) throw new Error("end must be greater than start");
      this._split(t), this._split(e);
      let n = this.byStart[t];
      for (; n;) {
        n.intro = "",
          n.outro = "",
          n.edit(""),
          n = e > n.end ? this.byStart[n.end] : null;
      }
      return this;
    }
    lastChar() {
      if (this.outro.length) return this.outro[this.outro.length - 1];
      let t = this.lastChunk;
      do {
        if (t.outro.length) return t.outro[t.outro.length - 1];
        if (t.content.length) return t.content[t.content.length - 1];
        if (t.intro.length) return t.intro[t.intro.length - 1];
      } while (t = t.previous);
      return this.intro.length ? this.intro[this.intro.length - 1] : "";
    }
    lastLine() {
      let t = this.outro.lastIndexOf(f2);
      if (t !== -1) return this.outro.substr(t + 1);
      let e = this.outro, n = this.lastChunk;
      do {
        if (n.outro.length > 0) {
          if (t = n.outro.lastIndexOf(f2), t !== -1) {
            return n.outro.substr(t + 1) + e;
          }
          e = n.outro + e;
        }
        if (n.content.length > 0) {
          if (t = n.content.lastIndexOf(f2), t !== -1) {
            return n.content.substr(t + 1) + e;
          }
          e = n.content + e;
        }
        if (n.intro.length > 0) {
          if (t = n.intro.lastIndexOf(f2), t !== -1) {
            return n.intro.substr(t + 1) + e;
          }
          e = n.intro + e;
        }
      } while (n = n.previous);
      return t = this.intro.lastIndexOf(f2),
        t !== -1 ? this.intro.substr(t + 1) + e : this.intro + e;
    }
    slice(t = 0, e = this.original.length) {
      for (; t < 0;) t += this.original.length;
      for (; e < 0;) e += this.original.length;
      let n = "", i = this.firstChunk;
      for (; i && (i.start > t || i.end <= t);) {
        if (i.start < e && i.end >= e) return n;
        i = i.next;
      }
      if (i && i.edited && i.start !== t) {
        throw new Error(
          `Cannot use replaced character ${t} as slice start anchor.`,
        );
      }
      let r = i;
      for (; i;) {
        i.intro && (r !== i || i.start === t) && (n += i.intro);
        let o = i.start < e && i.end >= e;
        if (o && i.edited && i.end !== e) {
          throw new Error(
            `Cannot use replaced character ${e} as slice end anchor.`,
          );
        }
        let h = r === i ? t - i.start : 0,
          s = o ? i.content.length + e - i.end : i.content.length;
        if (
          n += i.content.slice(h, s),
            i.outro && (!o || i.end === e) && (n += i.outro),
            o
        ) break;
        i = i.next;
      }
      return n;
    }
    snip(t, e) {
      let n = this.clone();
      return n.remove(0, t), n.remove(e, n.original.length), n;
    }
    _split(t) {
      if (this.byStart[t] || this.byEnd[t]) return;
      let e = this.lastSearchedChunk, n = t > e.end;
      for (; e;) {
        if (e.contains(t)) return this._splitChunk(e, t);
        e = n ? this.byStart[e.end] : this.byEnd[e.start];
      }
    }
    _splitChunk(t, e) {
      if (t.edited && t.content.length) {
        let i = C6(this.original)(e);
        throw new Error(
          `Cannot split a chunk that has already been edited (${i.line}:${i.column} \u2013 "${t.original}")`,
        );
      }
      let n = t.split(e);
      return this.byEnd[e] = t,
        this.byStart[e] = n,
        this.byEnd[n.end] = n,
        t === this.lastChunk && (this.lastChunk = n),
        this.lastSearchedChunk = t,
        !0;
    }
    toString() {
      let t = this.intro, e = this.firstChunk;
      for (; e;) t += e.toString(), e = e.next;
      return t + this.outro;
    }
    isEmpty() {
      let t = this.firstChunk;
      do if (
        t.intro.length && t.intro.trim() ||
        t.content.length && t.content.trim() || t.outro.length && t.outro.trim()
      ) return !1; while (t = t.next);
      return !0;
    }
    length() {
      let t = this.firstChunk, e = 0;
      do e += t.intro.length + t.content.length + t.outro.length; while (
        t = t.next
      );
      return e;
    }
    trimLines() {
      return this.trim("[\\r\\n]");
    }
    trim(t) {
      return this.trimStart(t).trimEnd(t);
    }
    trimEndAborted(t) {
      let e = new RegExp((t || "\\s") + "+$");
      if (this.outro = this.outro.replace(e, ""), this.outro.length) return !0;
      let n = this.lastChunk;
      do {
        let i = n.end, r = n.trimEnd(e);
        if (
          n.end !== i &&
          (this.lastChunk === n && (this.lastChunk = n.next),
            this.byEnd[n.end] = n,
            this.byStart[n.next.start] = n.next,
            this.byEnd[n.next.end] = n.next), r
        ) return !0;
        n = n.previous;
      } while (n);
      return !1;
    }
    trimEnd(t) {
      return this.trimEndAborted(t), this;
    }
    trimStartAborted(t) {
      let e = new RegExp("^" + (t || "\\s") + "+");
      if (this.intro = this.intro.replace(e, ""), this.intro.length) return !0;
      let n = this.firstChunk;
      do {
        let i = n.end, r = n.trimStart(e);
        if (
          n.end !== i &&
          (n === this.lastChunk && (this.lastChunk = n.next),
            this.byEnd[n.end] = n,
            this.byStart[n.next.start] = n.next,
            this.byEnd[n.next.end] = n.next), r
        ) return !0;
        n = n.next;
      } while (n);
      return !1;
    }
    trimStart(t) {
      return this.trimStartAborted(t), this;
    }
    hasChanged() {
      return this.original !== this.toString();
    }
    _replaceRegexp(t, e) {
      function n(r, o) {
        return typeof e == "string"
          ? e.replace(
            /\$(\$|&|\d+)/g,
            (h, s) =>
              s === "$"
                ? "$"
                : s === "&"
                ? r[0]
                : +s < r.length
                ? r[+s]
                : `$${s}`,
          )
          : e(...r, r.index, o, r.groups);
      }
      function i(r, o) {
        let h, s = [];
        for (; h = r.exec(o);) s.push(h);
        return s;
      }
      if (t.global) {
        i(t, this.original).forEach((o) => {
          o.index != null &&
            this.overwrite(o.index, o.index + o[0].length, n(o, this.original));
        });
      } else {
        let r = this.original.match(t);
        r && r.index != null &&
          this.overwrite(r.index, r.index + r[0].length, n(r, this.original));
      }
      return this;
    }
    _replaceString(t, e) {
      let { original: n } = this, i = n.indexOf(t);
      return i !== -1 && this.overwrite(i, i + t.length, e), this;
    }
    replace(t, e) {
      return typeof t == "string"
        ? this._replaceString(t, e)
        : this._replaceRegexp(t, e);
    }
    _replaceAllString(t, e) {
      let { original: n } = this, i = t.length;
      for (let r = n.indexOf(t); r !== -1; r = n.indexOf(t, r + i)) {
        this.overwrite(r, r + i, e);
      }
      return this;
    }
    replaceAll(t, e) {
      if (typeof t == "string") return this._replaceAllString(t, e);
      if (!t.global) {
        throw new TypeError(
          "MagicString.prototype.replaceAll called with a non-global RegExp argument",
        );
      }
      return this._replaceRegexp(t, e);
    }
  },
  S4 = Object.prototype.hasOwnProperty;
function w6(e, n, r) {
  if (e === "") return;
  let t = e.length, o = 0, c = !1, s = 0;
  for (let i = 0; i < t; i++) {
    switch (e[i]) {
      case n:
        c || (c = !0, s = i), o++;
        break;
      case r:
        if (--o, o < 0) return;
        if (o === 0) return [e.slice(s, i + 1), e.slice(i + 1), e.slice(0, s)];
        break;
    }
  }
}
function C7(e, n, r, t) {
  if (e === "" || (v(t) && (t = [t]), t.length === 0)) return;
  let o = e.length, c = 0;
  for (let s = 0; s < o; s++) {
    switch (e[s]) {
      case n:
        c++;
        break;
      case r:
        if (--c < 0) return;
        break;
      default:
        for (let i of t) {
          let l = i.length;
          if (l && i === e.slice(s, s + l) && c === 0) {
            return s === 0 || s === o - l
              ? void 0
              : [e.slice(0, s), e.slice(s + l)];
          }
        }
    }
  }
  return [e, ""];
}
function f3(e, n, r) {
  r = r ?? 10;
  let t = [], o = 0;
  for (; e !== "";) {
    if (++o > r) return;
    let c = C7(e, "(", ")", n);
    if (!c) return;
    let [s, i] = c;
    t.push(s), e = i;
  }
  if (t.length > 0) return t;
}
var h = ["hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "rgb", "rgba"],
  g5 = ["%alpha", "<alpha-value>"],
  S5 = new RegExp(g5.map((e) => qt(e)).join("|"));
function j6(e = "") {
  let n = v2(e);
  if (n == null || n === !1) return;
  let { type: r, components: t, alpha: o } = n, c = r.toLowerCase();
  if (t.length !== 0 && !(h.includes(c) && ![1, 3].includes(t.length))) {
    return {
      type: c,
      components: t.map((s) => typeof s == "string" ? s.trim() : s),
      alpha: typeof o == "string" ? o.trim() : o,
    };
  }
}
function L4(e) {
  let n = e.alpha ?? 1;
  return typeof n == "string" && g5.includes(n) ? 1 : n;
}
function k7(e, n) {
  if (typeof e == "string") return e.replace(S5, `${n ?? 1}`);
  let { components: r } = e, { alpha: t, type: o } = e;
  return t = n ?? t,
    o = o.toLowerCase(),
    ["hsla", "rgba"].includes(o)
      ? `${o}(${r.join(", ")}${t == null ? "" : `, ${t}`})`
      : (t = t == null ? "" : ` / ${t}`,
        h.includes(o)
          ? `${o}(${r.join(" ")}${t})`
          : `color(${o} ${r.join(" ")}${t})`);
}
function v2(e) {
  if (!e) return;
  let n = m4(e);
  if (
    n != null || (n = _7(e), n != null) || (n = x3(e), n != null) ||
    (n = F4(e), n != null) || (n = P5(e), n != null)
  ) return n;
}
function m4(e) {
  let [, n] = e.match(/^#([\da-f]+)$/i) || [];
  if (n) {
    switch (n.length) {
      case 3:
      case 4:
        let r = Array.from(n, (o) => Number.parseInt(o, 16)).map((o) =>
          o << 4 | o
        );
        return {
          type: "rgb",
          components: r.slice(0, 3),
          alpha: n.length === 3 ? void 0 : Math.round(r[3] / 255 * 100) / 100,
        };
      case 6:
      case 8:
        let t = Number.parseInt(n, 16);
        return {
          type: "rgb",
          components: n.length === 6
            ? [t >> 16 & 255, t >> 8 & 255, t & 255]
            : [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255],
          alpha: n.length === 6
            ? void 0
            : Math.round((t & 255) / 255 * 100) / 100,
        };
    }
  }
}
function _7(e) {
  let n = { rebeccapurple: [102, 51, 153, 1] }[e];
  if (n != null) return { type: "rgb", components: n.slice(0, 3), alpha: n[3] };
}
function x3(e) {
  let n = e.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
  if (!n) return;
  let [, r, t] = n, o = f3(t, ",", 5);
  if (o) {
    if ([3, 4].includes(o.length)) {
      return { type: r, components: o.slice(0, 3), alpha: o[3] };
    }
    if (o.length !== 1) return !1;
  }
}
var E4 = new RegExp(`^(${h.join("|")})\\((.+)\\)$`, "i");
function F4(e) {
  let n = e.match(E4);
  if (!n) return;
  let [, r, t] = n, o = d1(`${r} ${t}`);
  if (o) {
    let { alpha: c, components: [s, ...i] } = o;
    return { type: s, components: i, alpha: c };
  }
}
function P5(e) {
  let n = e.match(/^color\((.+)\)$/);
  if (!n) return;
  let r = d1(n[1]);
  if (r) {
    let { alpha: t, components: [o, ...c] } = r;
    return { type: o, components: c, alpha: t };
  }
}
function d1(e) {
  let n = f3(e, " ");
  if (!n) return;
  let r = n.length;
  if (n[r - 2] === "/") {
    return { components: n.slice(0, r - 2), alpha: n[r - 1] };
  }
  if (
    n[r - 2] != null && (n[r - 2].endsWith("/") || n[r - 1].startsWith("/"))
  ) {
    let c = n.splice(r - 2);
    n.push(c.join(" ")), --r;
  }
  let t = f3(n[r - 1], "/", 2);
  if (!t) return;
  if (t.length === 1 || t[t.length - 1] === "") return { components: n };
  let o = t.pop();
  return n[r - 1] = t.join("/"), { components: n, alpha: o };
}
function B5(e) {
  let n = function (t) {
    let o = this.__options?.sequence || [];
    this.__options.sequence = [];
    for (let c of o) {
      let s = e[c](t);
      if (s != null) return s;
    }
  };
  function r(t, o) {
    return t.__options || (t.__options = { sequence: [] }),
      t.__options.sequence.push(o),
      t;
  }
  for (let t of Object.keys(e)) {
    Object.defineProperty(n, t, {
      enumerable: !0,
      get() {
        return r(this, t);
      },
    });
  }
  return n;
}
function G6(e, n) {
  let r;
  return {
    name: e,
    match(t, o) {
      r ||
        (r = new RegExp(
          `^${qt(e)}(?:${o.generator.config.separators.join("|")})`,
        ));
      let c = t.match(r);
      if (c) {
        return {
          matcher: t.slice(c[0].length),
          handle: (s, i) => i({ ...s, ...n(s) }),
        };
      }
    },
    autocomplete: `${e}:`,
  };
}
function H6(e, n) {
  let r;
  return {
    name: e,
    match(t, o) {
      r ||
        (r = new RegExp(
          `^${qt(e)}(?:${o.generator.config.separators.join("|")})`,
        ));
      let c = t.match(r);
      if (c) {
        return {
          matcher: t.slice(c[0].length),
          handle: (s, i) =>
            i({ ...s, parent: `${s.parent ? `${s.parent} $$ ` : ""}${n}` }),
        };
      }
    },
    autocomplete: `${e}:`,
  };
}
function R4(e, n, r) {
  if (n.startsWith(`${e}[`)) {
    let [t, o] = w6(n.slice(e.length), "[", "]") ?? [];
    if (t && o) {
      for (let c of r) if (o.startsWith(c)) return [t, o.slice(c.length), c];
      return [t, o, ""];
    }
  }
}
function A7(e, n, r) {
  if (n.startsWith(e)) {
    let t = R4(e, n, r);
    if (t) {
      let [o = "", c = t[1]] = A7("/", t[1], r) ?? [];
      return [t[0], c, o];
    }
    for (let o of r.filter((c) => c !== "/")) {
      let c = n.indexOf(o, e.length);
      if (c !== -1) {
        let s = n.indexOf("/", e.length), i = s === -1 || c <= s;
        return [
          n.slice(e.length, i ? c : s),
          n.slice(c + o.length),
          i ? "" : n.slice(s + 1, c),
        ];
      }
    }
  }
}
var M5 = /theme\(\s*['"]?(.*?)['"]?\s*\)/g;
function I4(e) {
  return e.includes("theme(") && e.includes(")");
}
function K6(e, n, r = !0) {
  let t = Array.from(e.toString().matchAll(M5));
  if (!t.length) return e;
  let o = new b5(e);
  for (let c of t) {
    let s = c[1];
    if (!s) throw new Error("theme() expect exact one argument, but got 0");
    let [i, l] = s.split("/"),
      a = i.trim().split(".").reduce((u, $) => u?.[$], n);
    if (typeof a == "string") {
      if (l) {
        let u = j6(a);
        u && (a = k7(u, l));
      }
      o.overwrite(c.index, c.index + c[0].length, a);
    } else if (r) throw new Error(`theme of "${s}" did not found`);
  }
  return o.toString();
}
var C8 = {
    l: ["-left"],
    r: ["-right"],
    t: ["-top"],
    b: ["-bottom"],
    s: ["-inline-start"],
    e: ["-inline-end"],
    x: ["-left", "-right"],
    y: ["-top", "-bottom"],
    "": [""],
    bs: ["-block-start"],
    be: ["-block-end"],
    is: ["-inline-start"],
    ie: ["-inline-end"],
    block: ["-block-start", "-block-end"],
    inline: ["-inline-start", "-inline-end"],
  },
  ct1 = {
    ...C8,
    s: ["-inset-inline-start"],
    start: ["-inset-inline-start"],
    e: ["-inset-inline-end"],
    end: ["-inset-inline-end"],
    bs: ["-inset-block-start"],
    be: ["-inset-block-end"],
    is: ["-inset-inline-start"],
    ie: ["-inset-inline-end"],
    block: ["-inset-block-start", "-inset-block-end"],
    inline: ["-inset-inline-start", "-inset-inline-end"],
  },
  st2 = {
    l: ["-top-left", "-bottom-left"],
    r: ["-top-right", "-bottom-right"],
    t: ["-top-left", "-top-right"],
    b: ["-bottom-left", "-bottom-right"],
    tl: ["-top-left"],
    lt: ["-top-left"],
    tr: ["-top-right"],
    rt: ["-top-right"],
    bl: ["-bottom-left"],
    lb: ["-bottom-left"],
    br: ["-bottom-right"],
    rb: ["-bottom-right"],
    "": [""],
    bs: ["-start-start", "-start-end"],
    be: ["-end-start", "-end-end"],
    s: ["-end-start", "-start-start"],
    is: ["-end-start", "-start-start"],
    e: ["-start-end", "-end-end"],
    ie: ["-start-end", "-end-end"],
    ss: ["-start-start"],
    "bs-is": ["-start-start"],
    "is-bs": ["-start-start"],
    se: ["-start-end"],
    "bs-ie": ["-start-end"],
    "ie-bs": ["-start-end"],
    es: ["-end-start"],
    "be-is": ["-end-start"],
    "is-be": ["-end-start"],
    ee: ["-end-end"],
    "be-ie": ["-end-end"],
    "ie-be": ["-end-end"],
  },
  at2 = { x: ["-x"], y: ["-y"], z: ["-z"], "": ["-x", "-y"] },
  x4 = [
    "top",
    "top center",
    "top left",
    "top right",
    "bottom",
    "bottom center",
    "bottom left",
    "bottom right",
    "left",
    "left center",
    "left top",
    "left bottom",
    "right",
    "right center",
    "right top",
    "right bottom",
    "center",
    "center top",
    "center bottom",
    "center left",
    "center right",
    "center center",
  ],
  lt = Object.assign(
    {},
    ...x4.map((t) => ({ [t.replace(/ /, "-")]: t })),
    ...x4.map((t) => ({ [t.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: t })),
  ),
  _8 = ["inherit", "initial", "revert", "revert-layer", "unset"],
  y5 = /^(calc|clamp|min|max)\s*\((.+)\)(.*)/,
  $4 =
    /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i,
  F5 = /^(-?\d*(?:\.\d+)?)$/i,
  O6 = /^(px)$/i,
  z4 = /^\[(color|length|position|quoted|string):/i,
  U4 = [
    "color",
    "border-color",
    "background-color",
    "flex-grow",
    "flex",
    "flex-shrink",
    "caret-color",
    "font",
    "gap",
    "opacity",
    "visibility",
    "z-index",
    "font-weight",
    "zoom",
    "text-shadow",
    "transform",
    "box-shadow",
    "background-position",
    "left",
    "right",
    "top",
    "bottom",
    "object-position",
    "max-height",
    "min-height",
    "max-width",
    "min-width",
    "height",
    "width",
    "border-width",
    "margin",
    "padding",
    "outline-width",
    "outline-offset",
    "font-size",
    "line-height",
    "text-indent",
    "vertical-align",
    "border-spacing",
    "letter-spacing",
    "word-spacing",
    "stroke",
    "filter",
    "backdrop-filter",
    "fill",
    "mask",
    "mask-size",
    "mask-border",
    "clip-path",
    "clip",
    "border-radius",
  ];
function f4(t) {
  return t.toFixed(10).replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1");
}
function j7(t) {
  let e = t.match($4);
  if (!e) return;
  let [, r, i] = e, n = Number.parseFloat(r);
  if (i && !Number.isNaN(n)) return `${f4(n)}${i}`;
}
function A8(t) {
  if (t === "auto" || t === "a") return "auto";
}
function D4(t) {
  if (O6.test(t)) return `1${t}`;
  let e = t.match($4);
  if (!e) return;
  let [, r, i] = e, n = Number.parseFloat(r);
  if (!Number.isNaN(n)) {
    return n === 0 ? "0" : i ? `${f4(n)}${i}` : `${f4(n / 4)}rem`;
  }
}
function I5(t) {
  if (O6.test(t)) return `1${t}`;
  let e = t.match($4);
  if (!e) return;
  let [, r, i] = e, n = Number.parseFloat(r);
  if (!Number.isNaN(n)) return i ? `${f4(n)}${i}` : `${f4(n)}px`;
}
function L5(t) {
  if (!F5.test(t)) return;
  let e = Number.parseFloat(t);
  if (!Number.isNaN(e)) return f4(e);
}
function P6(t) {
  if (t.endsWith("%") && (t = t.slice(0, -1)), !F5.test(t)) return;
  let e = Number.parseFloat(t);
  if (!Number.isNaN(e)) return `${f4(e / 100)}`;
}
function V3(t) {
  if (t === "full") return "100%";
  let [e, r] = t.split("/"), i = Number.parseFloat(e) / Number.parseFloat(r);
  if (!Number.isNaN(i)) return i === 0 ? "0" : `${f4(i * 100)}%`;
}
function N3(t, e) {
  if (t && t.startsWith("[") && t.endsWith("]")) {
    let r, i, n = t.match(z4);
    if (
      n ? (e || (i = n[1]), r = t.slice(n[0].length, -1)) : r = t.slice(1, -1),
        !r || r === '=""'
    ) return;
    r.startsWith("--") && (r = `var(${r})`);
    let c = 0;
    for (let o of r) {
      if (o === "[") c += 1;
      else if (o === "]" && (c -= 1, c < 0)) return;
    }
    if (c) return;
    switch (i) {
      case "string":
        return r.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
      case "quoted":
        return r.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(
          /(["\\])/g,
          "\\$1",
        ).replace(/^(.+)$/, '"$1"');
    }
    return r.replace(/(url\(.*?\))/g, (o) => o.replace(/_/g, "\\_")).replace(
      /(^|[^\\])_/g,
      "$1 ",
    ).replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (o) => {
      let l = [];
      return o.replace(
        /var\((--.+?)[,)]/g,
        (s, p) => (l.push(p), s.replace(p, "--un-calc")),
      ).replace(
        /(-?\d*\.?\d(?!\b-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g,
        "$1 $2 ",
      ).replace(/--un-calc/g, () => l.shift());
    });
  }
}
function q3(t) {
  return N3(t);
}
function B6(t) {
  return N3(t, "color");
}
function G7(t) {
  return N3(t, "length");
}
function H7(t) {
  return N3(t, "position");
}
function K7(t) {
  if (/^\$[^\s'"`;{}]/.test(t)) return `var(--${ut(t.slice(1))})`;
}
function J5(t) {
  let e = t.match(/^(-?[0-9.]+)(s|ms)?$/i);
  if (!e) return;
  let [, r, i] = e, n = Number.parseFloat(r);
  if (!Number.isNaN(n)) {
    return n === 0 && !i ? "0s" : i ? `${f4(n)}${i}` : `${f4(n)}ms`;
  }
}
function Q2(t) {
  let e = t.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
  if (!e) return;
  let [, r, i] = e, n = Number.parseFloat(r);
  if (!Number.isNaN(n)) {
    return n === 0 ? "0" : i ? `${f4(n)}${i}` : `${f4(n)}deg`;
  }
}
function X4(t) {
  if (_8.includes(t)) return t;
}
function Y3(t) {
  if (t.split(",").every((e) => U4.includes(e))) return t;
}
function Z3(t) {
  if (["top", "left", "right", "bottom", "center"].includes(t)) return t;
}
var tt1 = {
    __proto__: null,
    auto: A8,
    bracket: q3,
    bracketOfColor: B6,
    bracketOfLength: G7,
    bracketOfPosition: H7,
    cssvar: K7,
    degree: Q2,
    fraction: V3,
    global: X4,
    number: L5,
    numberWithUnit: j7,
    percent: P6,
    position: Z3,
    properties: Y3,
    px: I5,
    rem: D4,
    time: J5,
  },
  et2 = B5(tt1),
  m5 = et2,
  ut1 = "$$mini-no-negative";
function ft(t) {
  return ([e, r, i], { theme: n }) => {
    let c = n.spacing?.[i || "DEFAULT"] ??
      m5.bracket.cssvar.global.auto.fraction.rem(i);
    if (c != null) return C8[r].map((o) => [`${t}${o}`, c]);
  };
}
function v3(t, e, r = "colors") {
  let i = t[r], n = -1;
  for (let c of e) {
    if (n += 1, i && typeof i != "string") {
      let o = e.slice(n).join("-").replace(
        /(-[a-z])/g,
        (l) => l.slice(1).toUpperCase(),
      );
      if (i[o]) return i[o];
      if (i[c]) {
        i = i[c];
        continue;
      }
    }
    return;
  }
  return i;
}
function d2(t, e, r) {
  return v3(t, e, r) || v3(t, e, "colors");
}
function nt1(t, e) {
  let [r, i] = C7(t, "[", "]", ["/", ":"]) ?? [];
  if (r != null) {
    let n = (r.match(z4) ?? [])[1];
    if (n == null || n === e) return [r, i];
  }
}
function S6(t, e, r) {
  let i = nt1(t, "color");
  if (!i) return;
  let [n, c] = i,
    o = n.replace(/([a-z])([0-9])/g, "$1-$2").split(/-/g),
    [l] = o;
  if (!l) return;
  let s, p = m5.bracketOfColor(n), u = p || n;
  if (m5.numberWithUnit(u)) return;
  if (
    /^#[\da-fA-F]+/.test(u)
      ? s = u
      : /^hex-[\da-fA-F]+/.test(u)
      ? s = `#${u.slice(4)}`
      : n.startsWith("$") && (s = m5.cssvar(n)),
      s = s || p,
      !s
  ) {
    let a = d2(e, [n], r);
    typeof a == "string" && (s = a);
  }
  let b = "DEFAULT";
  if (!s) {
    let a, [k] = o.slice(-1);
    /^\d+$/.test(k)
      ? (b = k,
        a = d2(e, o.slice(0, -1), r),
        !a || typeof a == "string" ? s = void 0 : s = a[b])
      : (a = d2(e, o, r),
        !a && o.length <= 2 && ([, b = b] = o, a = d2(e, [l], r)),
        typeof a == "string" ? s = a : b && a && (s = a[b]));
  }
  return {
    opacity: c,
    name: l,
    no: b,
    color: s,
    cssColor: j6(s),
    alpha: m5.bracket.cssvar.percent(c ?? ""),
  };
}
function pt(t, e, r, i) {
  return ([, n], { theme: c }) => {
    let o = S6(n, c, r);
    if (!o) return;
    let { alpha: l, color: s, cssColor: p } = o, u = {};
    if (
      p
        ? l != null
          ? u[t] = k7(p, l)
          : (u[`--un-${e}-opacity`] = L4(p),
            u[t] = k7(p, `var(--un-${e}-opacity)`))
        : s && (u[t] = k7(s, l)), i?.(u) !== !1
    ) return u;
  };
}
function bt1(t, e) {
  let r = [];
  t = b1(t);
  for (let i = 0; i < t.length; i++) {
    let n = f3(t[i], " ", 6);
    if (!n || n.length < 3 || j6(n.at(0))) return t;
    let c = "";
    if (j6(n.at(-1))) {
      let o = j6(n.pop());
      o && (c = `, ${k7(o)}`);
    }
    r.push(`${n.join(" ")} var(${e}${c})`);
  }
  return r;
}
function mt1(t, e, r) {
  return t != null && !!S6(t, e, r)?.color;
}
function rt2({ theme: t, generator: e }, r = "breakpoints") {
  let i;
  return e.userConfig && e.userConfig.theme && (i = e.userConfig.theme[r]),
    i || (i = t[r]),
    i
      ? Object.entries(i).sort((n, c) =>
        Number.parseInt(n[1].replace(/[a-z]+/gi, "")) -
        Number.parseInt(c[1].replace(/[a-z]+/gi, ""))
      ).map(([n, c]) => ({ point: n, size: c }))
      : void 0;
}
function gt1(t, e) {
  return _8.map((r) => [`${t}-${r}`, { [e ?? t]: r }]);
}
function ht(t) {
  return t != null && y5.test(t);
}
function $t1(t) {
  return t[0] === "[" && t.slice(-1) === "]" && (t = t.slice(1, -1)),
    y5.test(t) || $4.test(t);
}
var d3 = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },
  light: {
    50: "#fdfdfd",
    100: "#fcfcfc",
    200: "#fafafa",
    300: "#f8f9fa",
    400: "#f6f6f6",
    500: "#f2f2f2",
    600: "#f1f3f5",
    700: "#e9ecef",
    800: "#dee2e6",
    900: "#dde1e3",
    950: "#d8dcdf",
  },
  dark: {
    50: "#4a4a4a",
    100: "#3c3c3c",
    200: "#323232",
    300: "#2d2d2d",
    400: "#222222",
    500: "#1f1f1f",
    600: "#1c1c1e",
    700: "#1b1b1b",
    800: "#181818",
    900: "#0f0f0f",
    950: "#080808",
  },
  get lightblue() {
    return this.sky;
  },
  get lightBlue() {
    return this.sky;
  },
  get warmgray() {
    return this.stone;
  },
  get warmGray() {
    return this.stone;
  },
  get truegray() {
    return this.neutral;
  },
  get trueGray() {
    return this.neutral;
  },
  get coolgray() {
    return this.gray;
  },
  get coolGray() {
    return this.gray;
  },
  get bluegray() {
    return this.slate;
  },
  get blueGray() {
    return this.slate;
  },
};
Object.values(d3).forEach((f) => {
  typeof f != "string" && f !== void 0 &&
    (f.DEFAULT = f.DEFAULT || f[400],
      Object.keys(f).forEach((a) => {
        let e = +a / 100;
        e === Math.round(e) && (f[e] = f[a]);
      }));
});
var z5 = [
    "auto",
    "default",
    "none",
    "context-menu",
    "help",
    "pointer",
    "progress",
    "wait",
    "cell",
    "crosshair",
    "text",
    "vertical-text",
    "alias",
    "copy",
    "move",
    "no-drop",
    "not-allowed",
    "grab",
    "grabbing",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "zoom-in",
    "zoom-out",
  ],
  $5 = [
    "none",
    "strict",
    "content",
    "size",
    "inline-size",
    "layout",
    "style",
    "paint",
  ],
  m6 = " ",
  C9 = [
    ["inline", { display: "inline" }],
    ["block", { display: "block" }],
    ["inline-block", { display: "inline-block" }],
    ["contents", { display: "contents" }],
    ["flow-root", { display: "flow-root" }],
    ["list-item", { display: "list-item" }],
    ["hidden", { display: "none" }],
    [/^display-(.+)$/, ([, e]) => ({ display: m5.bracket.cssvar.global(e) })],
  ],
  q4 = [
    ["visible", { visibility: "visible" }],
    ["invisible", { visibility: "hidden" }],
    ["backface-visible", { "backface-visibility": "visible" }],
    ["backface-hidden", { "backface-visibility": "hidden" }],
    ...gt1("backface", "backface-visibility"),
  ],
  X5 = [
    [/^cursor-(.+)$/, ([, e]) => ({ cursor: m5.bracket.cssvar.global(e) })],
    ...z5.map((e) => [`cursor-${e}`, { cursor: e }]),
  ],
  Y4 = [[
    /^contain-(.*)$/,
    ([, e]) =>
      m5.bracket(e) != null
        ? {
          contain: m5.bracket(e).split(" ").map((t) =>
            m5.cssvar.fraction(t) ?? t
          ).join(" "),
        }
        : $5.includes(e)
        ? { contain: e }
        : void 0,
  ]],
  Z4 = [["pointer-events-auto", { "pointer-events": "auto" }], [
    "pointer-events-none",
    { "pointer-events": "none" },
  ], ...gt1("pointer-events")],
  E5 = [
    ["resize-x", { resize: "horizontal" }],
    ["resize-y", { resize: "vertical" }],
    ["resize", { resize: "both" }],
    ["resize-none", { resize: "none" }],
    ...gt1("resize"),
  ],
  O7 = [
    ["select-auto", { "-webkit-user-select": "auto", "user-select": "auto" }],
    ["select-all", { "-webkit-user-select": "all", "user-select": "all" }],
    ["select-text", { "-webkit-user-select": "text", "user-select": "text" }],
    ["select-none", { "-webkit-user-select": "none", "user-select": "none" }],
    ...gt1("select", "user-select"),
  ],
  T4 = [[
    /^(?:whitespace-|ws-)([-\w]+)$/,
    ([, e]) =>
      ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces", ..._8]
          .includes(e)
        ? { "white-space": e }
        : void 0,
    {
      autocomplete:
        "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)",
    },
  ]],
  V4 = [
    [
      /^intrinsic-size-(.+)$/,
      ([, e]) => ({
        "contain-intrinsic-size": m5.bracket.cssvar.global.fraction.rem(e),
      }),
      { autocomplete: "intrinsic-size-<num>" },
    ],
    ["content-visibility-visible", { "content-visibility": "visible" }],
    ["content-visibility-hidden", { "content-visibility": "hidden" }],
    ["content-visibility-auto", { "content-visibility": "auto" }],
    ...gt1("content-visibility"),
  ],
  B7 = [[/^content-(.+)$/, ([, e]) => ({ content: m5.bracket.cssvar(e) })], [
    "content-empty",
    { content: '""' },
  ], ["content-none", { content: "none" }]],
  F6 = [
    ["break-normal", { "overflow-wrap": "normal", "word-break": "normal" }],
    ["break-words", { "overflow-wrap": "break-word" }],
    ["break-all", { "word-break": "break-all" }],
    ["break-keep", { "word-break": "keep-all" }],
    ["break-anywhere", { "overflow-wrap": "anywhere" }],
  ],
  M6 = [
    ["text-wrap", { "text-wrap": "wrap" }],
    ["text-nowrap", { "text-wrap": "nowrap" }],
    ["text-balance", { "text-wrap": "balance" }],
    ["text-pretty", { "text-wrap": "pretty" }],
  ],
  R5 = [
    ["truncate", {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    }],
    ["text-truncate", {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    }],
    ["text-ellipsis", { "text-overflow": "ellipsis" }],
    ["text-clip", { "text-overflow": "clip" }],
  ],
  U5 = [
    ["case-upper", { "text-transform": "uppercase" }],
    ["case-lower", { "text-transform": "lowercase" }],
    ["case-capital", { "text-transform": "capitalize" }],
    ["case-normal", { "text-transform": "none" }],
    ...gt1("case", "text-transform"),
  ],
  A9 = [
    ["italic", { "font-style": "italic" }],
    ["not-italic", { "font-style": "normal" }],
    ["font-italic", { "font-style": "italic" }],
    ["font-not-italic", { "font-style": "normal" }],
    ["oblique", { "font-style": "oblique" }],
    ["not-oblique", { "font-style": "normal" }],
    ["font-oblique", { "font-style": "oblique" }],
    ["font-not-oblique", { "font-style": "normal" }],
  ],
  D5 = [["antialiased", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  }], ["subpixel-antialiased", {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
  }]],
  G8 = {
    "--un-ring-inset": m6,
    "--un-ring-offset-width": "0px",
    "--un-ring-offset-color": "#fff",
    "--un-ring-width": "0px",
    "--un-ring-color": "rgb(147 197 253 / 0.5)",
    "--un-shadow": "0 0 rgb(0 0 0 / 0)",
  },
  L6 = [
    [/^ring(?:-(.+))?$/, ([, e], { theme: t }) => {
      let r = t.ringWidth?.[e || "DEFAULT"] ?? m5.px(e || "1");
      if (r) {
        return {
          "--un-ring-width": r,
          "--un-ring-offset-shadow":
            "var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)",
          "--un-ring-shadow":
            "var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)",
          "box-shadow":
            "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)",
        };
      }
    }, { autocomplete: "ring-$ringWidth" }],
    [/^ring-(?:width-|size-)(.+)$/, h1, {
      autocomplete: "ring-(width|size)-$lineWidth",
    }],
    ["ring-offset", { "--un-ring-offset-width": "1px" }],
    [
      /^ring-offset-(?:width-|size-)?(.+)$/,
      ([, e], { theme: t }) => ({
        "--un-ring-offset-width": t.lineWidth?.[e] ?? m5.bracket.cssvar.px(e),
      }),
      { autocomplete: "ring-offset-(width|size)-$lineWidth" },
    ],
    [/^ring-(.+)$/, j8, { autocomplete: "ring-$colors" }],
    [
      /^ring-op(?:acity)?-?(.+)$/,
      ([, e]) => ({ "--un-ring-opacity": m5.bracket.percent.cssvar(e) }),
      { autocomplete: "ring-(op|opacity)-<percent>" },
    ],
    [
      /^ring-offset-(.+)$/,
      pt("--un-ring-offset-color", "ring-offset", "borderColor"),
      { autocomplete: "ring-offset-$colors" },
    ],
    [
      /^ring-offset-op(?:acity)?-?(.+)$/,
      ([, e]) => ({ "--un-ring-offset-opacity": m5.bracket.percent.cssvar(e) }),
      { autocomplete: "ring-offset-(op|opacity)-<percent>" },
    ],
    ["ring-inset", { "--un-ring-inset": "inset" }],
  ];
function h1([, e], { theme: t }) {
  return { "--un-ring-width": t.ringWidth?.[e] ?? m5.bracket.cssvar.px(e) };
}
function j8(e, t) {
  return ht(m5.bracket(e[1]))
    ? h1(e, t)
    : pt("--un-ring-color", "ring", "borderColor")(e, t);
}
var K8 = {
    "--un-ring-offset-shadow": "0 0 rgb(0 0 0 / 0)",
    "--un-ring-shadow": "0 0 rgb(0 0 0 / 0)",
    "--un-shadow-inset": m6,
    "--un-shadow": "0 0 rgb(0 0 0 / 0)",
  },
  P7 = [[/^shadow(?:-(.+))?$/, (e, t) => {
    let [, r] = e,
      { theme: o } = t,
      i = o.boxShadow?.[r || "DEFAULT"],
      u = r ? m5.bracket.cssvar(r) : void 0;
    return (i != null || u != null) && !mt1(u, o, "shadowColor")
      ? {
        "--un-shadow": bt1(i || u, "--un-shadow-color").join(","),
        "box-shadow":
          "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)",
      }
      : pt("--un-shadow-color", "shadow", "shadowColor")(e, t);
  }, { autocomplete: ["shadow-$colors", "shadow-$boxShadow"] }], [
    /^shadow-op(?:acity)?-?(.+)$/,
    ([, e]) => ({ "--un-shadow-opacity": m5.bracket.percent.cssvar(e) }),
    { autocomplete: "shadow-(op|opacity)-<percent>" },
  ], ["shadow-inset", { "--un-shadow-inset": "inset" }]],
  c4 = ["translate", "rotate", "scale"],
  s2 = [
    "translateX(var(--un-translate-x))",
    "translateY(var(--un-translate-y))",
    "translateZ(var(--un-translate-z))",
    "rotate(var(--un-rotate))",
    "rotateX(var(--un-rotate-x))",
    "rotateY(var(--un-rotate-y))",
    "rotateZ(var(--un-rotate-z))",
    "skewX(var(--un-skew-x))",
    "skewY(var(--un-skew-y))",
    "scaleX(var(--un-scale-x))",
    "scaleY(var(--un-scale-y))",
    "scaleZ(var(--un-scale-z))",
  ].join(" "),
  S7 = [
    "translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))",
    "rotate(var(--un-rotate))",
    "rotateX(var(--un-rotate-x))",
    "rotateY(var(--un-rotate-y))",
    "rotateZ(var(--un-rotate-z))",
    "skewX(var(--un-skew-x))",
    "skewY(var(--un-skew-y))",
    "scaleX(var(--un-scale-x))",
    "scaleY(var(--un-scale-y))",
    "scaleZ(var(--un-scale-z))",
  ].join(" "),
  H8 = {
    "--un-rotate": 0,
    "--un-rotate-x": 0,
    "--un-rotate-y": 0,
    "--un-rotate-z": 0,
    "--un-scale-x": 1,
    "--un-scale-y": 1,
    "--un-scale-z": 1,
    "--un-skew-x": 0,
    "--un-skew-y": 0,
    "--un-translate-x": 0,
    "--un-translate-y": 0,
    "--un-translate-z": 0,
  },
  I6 = [
    [
      /^(?:transform-)?origin-(.+)$/,
      ([, e]) => ({ "transform-origin": lt[e] ?? m5.bracket.cssvar(e) }),
      {
        autocomplete: [
          `transform-origin-(${Object.keys(lt).join("|")})`,
          `origin-(${Object.keys(lt).join("|")})`,
        ],
      },
    ],
    [/^(?:transform-)?perspect(?:ive)?-(.+)$/, ([, e]) => {
      let t = m5.bracket.cssvar.px.numberWithUnit(e);
      if (t != null) return { "-webkit-perspective": t, perspective: t };
    }],
    [/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/, ([, e]) => {
      let t = m5.bracket.cssvar(e) ?? (e.length >= 3 ? lt[e] : void 0);
      if (t != null) {
        return { "-webkit-perspective-origin": t, "perspective-origin": t };
      }
    }],
    [/^(?:transform-)?translate-()(.+)$/, w7],
    [/^(?:transform-)?translate-([xyz])-(.+)$/, w7],
    [/^(?:transform-)?rotate-()(.+)$/, d4],
    [/^(?:transform-)?rotate-([xyz])-(.+)$/, d4],
    [/^(?:transform-)?skew-()(.+)$/, b6],
    [/^(?:transform-)?skew-([xy])-(.+)$/, b6, {
      autocomplete: ["transform-skew-(x|y)-<percent>", "skew-(x|y)-<percent>"],
    }],
    [/^(?:transform-)?scale-()(.+)$/, v4],
    [/^(?:transform-)?scale-([xyz])-(.+)$/, v4, {
      autocomplete: [
        `transform-(${c4.join("|")})-<percent>`,
        `transform-(${c4.join("|")})-(x|y|z)-<percent>`,
        `(${c4.join("|")})-<percent>`,
        `(${c4.join("|")})-(x|y|z)-<percent>`,
      ],
    }],
    [
      /^(?:transform-)?preserve-3d$/,
      () => ({ "transform-style": "preserve-3d" }),
    ],
    [/^(?:transform-)?preserve-flat$/, () => ({ "transform-style": "flat" })],
    ["transform", { transform: s2 }],
    ["transform-cpu", { transform: s2 }],
    ["transform-gpu", { transform: S7 }],
    ["transform-none", { transform: "none" }],
    ...gt1("transform"),
  ];
function w7([, e, t], { theme: r }) {
  let o = r.spacing?.[t] ?? m5.bracket.cssvar.fraction.rem(t);
  if (o != null) {
    return [...at2[e].map((i) => [`--un-translate${i}`, o]), ["transform", s2]];
  }
}
function v4([, e, t]) {
  let r = m5.bracket.cssvar.fraction.percent(t);
  if (r != null) {
    return [...at2[e].map((o) => [`--un-scale${o}`, r]), ["transform", s2]];
  }
}
function d4([, e = "", t]) {
  let r = m5.bracket.cssvar.degree(t);
  if (r != null) {
    return e ? { "--un-rotate": 0, [`--un-rotate-${e}`]: r, transform: s2 } : {
      "--un-rotate-x": 0,
      "--un-rotate-y": 0,
      "--un-rotate-z": 0,
      "--un-rotate": r,
      transform: s2,
    };
  }
}
function b6([, e, t]) {
  let r = m5.bracket.cssvar.degree(t);
  if (r != null) {
    return [...at2[e].map((o) => [`--un-skew${o}`, r]), ["transform", s2]];
  }
}
var c5 = {
    sans: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      '"Noto Sans"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(","),
    serif: [
      "ui-serif",
      "Georgia",
      "Cambria",
      '"Times New Roman"',
      "Times",
      "serif",
    ].join(","),
    mono: [
      "ui-monospace",
      "SFMono-Regular",
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ].join(","),
  },
  b7 = {
    xs: ["0.75rem", "1rem"],
    sm: ["0.875rem", "1.25rem"],
    base: ["1rem", "1.5rem"],
    lg: ["1.125rem", "1.75rem"],
    xl: ["1.25rem", "1.75rem"],
    "2xl": ["1.5rem", "2rem"],
    "3xl": ["1.875rem", "2.25rem"],
    "4xl": ["2.25rem", "2.5rem"],
    "5xl": ["3rem", "1"],
    "6xl": ["3.75rem", "1"],
    "7xl": ["4.5rem", "1"],
    "8xl": ["6rem", "1"],
    "9xl": ["8rem", "1"],
  },
  d5 = {
    DEFAULT: "1.5rem",
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  h2 = { DEFAULT: "1.5rem", none: "0", sm: "thin", md: "medium", lg: "thick" },
  u3 = {
    DEFAULT: ["0 0 1px rgb(0 0 0 / 0.2)", "0 0 1px rgb(1 0 5 / 0.1)"],
    none: "0 0 rgb(0 0 0 / 0)",
    sm: "1px 1px 3px rgb(36 37 47 / 0.25)",
    md: ["0 1px 2px rgb(30 29 39 / 0.19)", "1px 2px 4px rgb(54 64 147 / 0.18)"],
    lg: ["3px 3px 6px rgb(0 0 0 / 0.26)", "0 0 5px rgb(15 3 86 / 0.22)"],
    xl: ["1px 1px 3px rgb(0 0 0 / 0.29)", "2px 4px 7px rgb(73 64 125 / 0.35)"],
  },
  w8 = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  m7 = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  S8 = {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  v5 = m7,
  s3 = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  E6 = { ...s3 },
  f5 = { DEFAULT: "1px", none: "0" },
  F7 = {
    DEFAULT: "1rem",
    none: "0",
    xs: "0.75rem",
    sm: "0.875rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  U6 = {
    DEFAULT: "150ms",
    none: "0s",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms",
  },
  A10 = {
    DEFAULT: "0.25rem",
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  T5 = {
    DEFAULT: [
      "var(--un-shadow-inset) 0 1px 3px 0 rgb(0 0 0 / 0.1)",
      "var(--un-shadow-inset) 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    ],
    none: "0 0 rgb(0 0 0 / 0)",
    sm: "var(--un-shadow-inset) 0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: [
      "var(--un-shadow-inset) 0 4px 6px -1px rgb(0 0 0 / 0.1)",
      "var(--un-shadow-inset) 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    ],
    lg: [
      "var(--un-shadow-inset) 0 10px 15px -3px rgb(0 0 0 / 0.1)",
      "var(--un-shadow-inset) 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    ],
    xl: [
      "var(--un-shadow-inset) 0 20px 25px -5px rgb(0 0 0 / 0.1)",
      "var(--un-shadow-inset) 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    ],
    "2xl": "var(--un-shadow-inset) 0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  z6 = {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  L7 = { DEFAULT: "1px", none: "0" },
  D6 = { auto: "auto" },
  k8 = { mouse: "(hover) and (pointer: fine)" },
  j9 = {
    DEFAULT: "8px",
    0: "0",
    sm: "4px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px",
  },
  B8 = {
    DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
    sm: "0 1px 1px rgb(0 0 0 / 0.05)",
    md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
    lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
    xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
    "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
    none: "0 0 rgb(0 0 0 / 0)",
  },
  e1 = {
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    prose: "65ch",
  },
  o3 = { auto: "auto", ...e1, screen: "100vw" },
  r1 = { none: "none", ...e1, screen: "100vw" },
  x5 = { auto: "auto", ...e1, screen: "100vh" },
  n1 = { none: "none", ...e1, screen: "100vh" },
  I7 = Object.fromEntries(
    Object.entries(e1).map(([i, t]) => [i, `(min-width: ${t})`]),
  ),
  W2 = { ...H8, ...K8, ...G8 },
  R6 = {
    width: o3,
    height: x5,
    maxWidth: r1,
    maxHeight: n1,
    minWidth: r1,
    minHeight: n1,
    inlineSize: o3,
    blockSize: x5,
    maxInlineSize: r1,
    maxBlockSize: n1,
    minInlineSize: r1,
    minBlockSize: n1,
    colors: d3,
    fontFamily: c5,
    fontSize: b7,
    fontWeight: S8,
    breakpoints: s3,
    verticalBreakpoints: E6,
    borderRadius: A10,
    lineHeight: w8,
    letterSpacing: m7,
    wordSpacing: v5,
    boxShadow: T5,
    textIndent: d5,
    textShadow: u3,
    textStrokeWidth: h2,
    blur: j9,
    dropShadow: B8,
    easing: z6,
    lineWidth: f5,
    spacing: F7,
    duration: U6,
    ringWidth: L7,
    preflightBase: W2,
    containers: I7,
    zIndex: D6,
    media: k8,
  };
var F8 = {
    mid: "middle",
    base: "baseline",
    btm: "bottom",
    baseline: "baseline",
    top: "top",
    start: "top",
    middle: "middle",
    bottom: "bottom",
    end: "bottom",
    "text-top": "text-top",
    "text-bottom": "text-bottom",
    sub: "sub",
    super: "super",
    ...Object.fromEntries(_8.map((e) => [e, e])),
  },
  ve = [[
    /^(?:vertical|align|v)-([-\w]+%?)$/,
    ([, e]) => ({ "vertical-align": F8[e] ?? m5.numberWithUnit(e) }),
    {
      autocomplete: [
        `(vertical|align|v)-(${Object.keys(F8).join("|")})`,
        "(vertical|align|v)-<percentage>",
      ],
    },
  ]],
  ze = ["center", "left", "right", "justify", "start", "end"].map(
    (e) => [`text-${e}`, { "text-align": e }],
  ),
  je = [
    [/^outline-(?:width-|size-)?(.+)$/, M7, {
      autocomplete: "outline-(width|size)-<num>",
    }],
    [/^outline-(?:color-)?(.+)$/, Se, { autocomplete: "outline-$colors" }],
    [
      /^outline-offset-(.+)$/,
      ([, e], { theme: t }) => ({
        "outline-offset": t.lineWidth?.[e] ?? m5.bracket.cssvar.global.px(e),
      }),
      { autocomplete: "outline-(offset)-<num>" },
    ],
    ["outline", { "outline-style": "solid" }],
    ...[
      "auto",
      "dashed",
      "dotted",
      "double",
      "hidden",
      "solid",
      "groove",
      "ridge",
      "inset",
      "outset",
      ..._8,
    ].map((e) => [`outline-${e}`, { "outline-style": e }]),
    ["outline-none", {
      outline: "2px solid transparent",
      "outline-offset": "2px",
    }],
  ];
function M7([, e], { theme: t }) {
  return {
    "outline-width": t.lineWidth?.[e] ?? m5.bracket.cssvar.global.px(e),
  };
}
function Se(e, t) {
  return ht(m5.bracket(e[1]))
    ? M7(e, t)
    : pt("outline-color", "outline-color", "borderColor")(e, t);
}
var Ce = [["appearance-none", {
  "-webkit-appearance": "none",
  appearance: "none",
}]];
function We(e) {
  return m5.properties.auto.global(e) ??
    ({ contents: "contents", scroll: "scroll-position" })[e];
}
var Te = [[/^will-change-(.+)/, ([, e]) => ({ "will-change": We(e) })]],
  k9 = [
    "solid",
    "dashed",
    "dotted",
    "double",
    "hidden",
    "none",
    "groove",
    "ridge",
    "inset",
    "outset",
    ..._8,
  ],
  Ae = [
    [/^(?:border|b)()(?:-(.+))?$/, u4, {
      autocomplete: "(border|b)-<directions>",
    }],
    [/^(?:border|b)-([xy])(?:-(.+))?$/, u4],
    [/^(?:border|b)-([rltbse])(?:-(.+))?$/, u4],
    [/^(?:border|b)-(block|inline)(?:-(.+))?$/, u4],
    [/^(?:border|b)-([bi][se])(?:-(.+))?$/, u4],
    [/^(?:border|b)-()(?:width|size)-(.+)$/, u4, {
      autocomplete: ["(border|b)-<num>", "(border|b)-<directions>-<num>"],
    }],
    [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, u4],
    [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, u4],
    [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, u4],
    [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, u4],
    [/^(?:border|b)-()(?:color-)?(.+)$/, m8, {
      autocomplete: ["(border|b)-$colors", "(border|b)-<directions>-$colors"],
    }],
    [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, m8],
    [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, m8],
    [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, m8],
    [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, m8],
    [/^(?:border|b)-()op(?:acity)?-?(.+)$/, g6, {
      autocomplete: "(border|b)-(op|opacity)-<percent>",
    }],
    [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, g6],
    [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, g6],
    [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, g6],
    [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, g6],
    [/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/, h3, {
      autocomplete: [
        "(border|b)-(rounded|rd)",
        "(border|b)-(rounded|rd)-<num>",
        "(rounded|rd)",
        "(rounded|rd)-<num>",
      ],
    }],
    [/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, h3],
    [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, h3],
    [/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, h3],
    [/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, h3],
    [/^(?:border|b)-(?:style-)?()(.+)$/, $6, {
      autocomplete: [
        "(border|b)-style",
        `(border|b)-(${k9.join("|")})`,
        "(border|b)-<directions>-style",
        `(border|b)-<directions>-(${k9.join("|")})`,
        `(border|b)-<directions>-style-(${k9.join("|")})`,
        `(border|b)-style-(${k9.join("|")})`,
      ],
    }],
    [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, $6],
    [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, $6],
    [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, $6],
    [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, $6],
  ];
function Be(e) {
  return ([, t], o) => {
    let r = S6(t, o, "borderColor");
    if (!r) return;
    let { alpha: i, color: a, cssColor: s } = r;
    if (s) {
      return i != null ? { [`border${e}-color`]: k7(s, i) } : e === ""
        ? {
          "--un-border-opacity": L4(s),
          "border-color": k7(s, "var(--un-border-opacity)"),
        }
        : {
          "--un-border-opacity": L4(s),
          [`--un-border${e}-opacity`]: "var(--un-border-opacity)",
          [`border${e}-color`]: k7(s, `var(--un-border${e}-opacity)`),
        };
    }
    if (a) return { [`border${e}-color`]: k7(a, i) };
  };
}
function u4([, e = "", t], { theme: o }) {
  let r = o.lineWidth?.[t || "DEFAULT"] ??
    m5.bracket.cssvar.global.px(t || "1");
  if (e in C8 && r != null) return C8[e].map((i) => [`border${i}-width`, r]);
}
function m8([, e = "", t], o) {
  if (e in C8) {
    if (ht(m5.bracket(t))) return u4(["", e, t], o);
    if (mt1(t, o.theme, "borderColor")) {
      return Object.assign(
        {},
        ...C8[e].map((r) => Be(r)(["", t], o.theme)),
      );
    }
  }
}
function g6([, e = "", t]) {
  let o = m5.bracket.percent.cssvar(t);
  if (e in C8 && o != null) {
    return C8[e].map((r) => [`--un-border${r}-opacity`, o]);
  }
}
function h3([, e = "", t], { theme: o }) {
  let r = o.borderRadius?.[t || "DEFAULT"] ||
    m5.bracket.cssvar.global.fraction.rem(t || "1");
  if (e in st2 && r != null) return st2[e].map((i) => [`border${i}-radius`, r]);
}
function $6([, e = "", t]) {
  if (k9.includes(t) && e in C8) {
    return C8[e].map((o) => [`border${o}-style`, t]);
  }
}
var Oe = [[
    /^op(?:acity)?-?(.+)$/,
    ([, e]) => ({ opacity: m5.bracket.percent.cssvar(e) }),
  ]],
  Ue = /^\[url\(.+\)\]$/,
  Ee = /^\[length:.+\]$/,
  Le = /^\[position:.+\]$/,
  Fe = [[/^bg-(.+)$/, (...e) => {
    let t = e[0][1];
    return Ue.test(t)
      ? { "--un-url": m5.bracket(t), "background-image": "var(--un-url)" }
      : Ee.test(t) && m5.bracketOfLength(t) != null
      ? {
        "background-size": m5.bracketOfLength(t).split(" ").map((o) =>
          m5.fraction.auto.px.cssvar(o) ?? o
        ).join(" "),
      }
      : ($t1(t) || Le.test(t)) && m5.bracketOfPosition(t) != null
      ? {
        "background-position": m5.bracketOfPosition(t).split(" ").map((o) =>
          m5.position.fraction.auto.px.cssvar(o) ?? o
        ).join(" "),
      }
      : pt("background-color", "bg", "backgroundColor")(...e);
  }], [
    /^bg-op(?:acity)?-?(.+)$/,
    ([, e]) => ({ "--un-bg-opacity": m5.bracket.percent.cssvar(e) }),
    { autocomplete: "bg-(op|opacity)-<percent>" },
  ]],
  Ie = [[/^color-scheme-(\w+)$/, ([, e]) => ({ "color-scheme": e })]],
  De = [[
    /^@container(?:\/(\w+))?(?:-(normal))?$/,
    (
      [, e, t],
    ) => (Rt(
      "The container query rule is experimental and may not follow semver.",
    ),
      { "container-type": t ?? "inline-size", "container-name": e }),
  ]],
  I8 = ["solid", "double", "dotted", "dashed", "wavy", ..._8],
  Re = [
    [
      /^(?:decoration-)?(underline|overline|line-through)$/,
      ([, e]) => ({ "text-decoration-line": e }),
      { autocomplete: "decoration-(underline|overline|line-through)" },
    ],
    [/^(?:underline|decoration)-(?:size-)?(.+)$/, _9, {
      autocomplete: "(underline|decoration)-<num>",
    }],
    [
      /^(?:underline|decoration)-(auto|from-font)$/,
      ([, e]) => ({ "text-decoration-thickness": e }),
      { autocomplete: "(underline|decoration)-(auto|from-font)" },
    ],
    [/^(?:underline|decoration)-(.+)$/, Pe, {
      autocomplete: "(underline|decoration)-$colors",
    }],
    [
      /^(?:underline|decoration)-op(?:acity)?-?(.+)$/,
      ([, e]) => ({ "--un-line-opacity": m5.bracket.percent.cssvar(e) }),
      { autocomplete: "(underline|decoration)-(op|opacity)-<percent>" },
    ],
    [
      /^(?:underline|decoration)-offset-(.+)$/,
      ([, e], { theme: t }) => ({
        "text-underline-offset": t.lineWidth?.[e] ??
          m5.auto.bracket.cssvar.global.px(e),
      }),
      { autocomplete: "(underline|decoration)-(offset)-<num>" },
    ],
    ...I8.map((e) => [`underline-${e}`, { "text-decoration-style": e }]),
    ...I8.map((e) => [`decoration-${e}`, { "text-decoration-style": e }]),
    ["no-underline", { "text-decoration": "none" }],
    ["decoration-none", { "text-decoration": "none" }],
  ];
function _9([, e], { theme: t }) {
  return {
    "text-decoration-thickness": t.lineWidth?.[e] ??
      m5.bracket.cssvar.global.px(e),
  };
}
function Pe(e, t) {
  if (ht(m5.bracket(e[1]))) return _9(e, t);
  let o = pt("text-decoration-color", "line", "borderColor")(e, t);
  if (o) {
    return {
      "-webkit-text-decoration-color": o["text-decoration-color"],
      ...o,
    };
  }
}
var S9 = {
  all: "all",
  colors: [
    "color",
    "background-color",
    "border-color",
    "outline-color",
    "text-decoration-color",
    "fill",
    "stroke",
  ].join(","),
  none: "none",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
};
function D7(e) {
  return m5.properties(e) ?? S9[e];
}
var qe = [
    [
      /^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/,
      ([, e, t], { theme: o }) => {
        let r = e != null ? D7(e) : [
          S9.colors,
          "opacity",
          "box-shadow",
          "transform",
          "filter",
          "backdrop-filter",
        ].join(",");
        if (r) {
          let i = o.duration?.[t || "DEFAULT"] ?? m5.time(t || "150");
          return {
            "transition-property": r,
            "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
            "transition-duration": i,
          };
        }
      },
      { autocomplete: `transition-(${Object.keys(S9).join("|")})` },
    ],
    [
      /^(?:transition-)?duration-(.+)$/,
      ([, e], { theme: t }) => ({
        "transition-duration": t.duration?.[e || "DEFAULT"] ??
          m5.bracket.cssvar.time(e),
      }),
      { autocomplete: ["transition-duration-$duration", "duration-$duration"] },
    ],
    [
      /^(?:transition-)?delay-(.+)$/,
      ([, e], { theme: t }) => ({
        "transition-delay": t.duration?.[e || "DEFAULT"] ??
          m5.bracket.cssvar.time(e),
      }),
      { autocomplete: ["transition-delay-$duration", "delay-$duration"] },
    ],
    [
      /^(?:transition-)?ease(?:-(.+))?$/,
      ([, e], { theme: t }) => ({
        "transition-timing-function": t.easing?.[e || "DEFAULT"] ??
          m5.bracket.cssvar(e),
      }),
      {
        autocomplete: [
          "transition-ease-(linear|in|out|in-out|DEFAULT)",
          "ease-(linear|in|out|in-out|DEFAULT)",
        ],
      },
    ],
    [
      /^(?:transition-)?property-(.+)$/,
      ([, e]) => ({ "transition-property": m5.bracket.global(e) || D7(e) }),
      {
        autocomplete: [
          `transition-property-(${[..._8, ...Object.keys(S9)].join("|")})`,
        ],
      },
    ],
    ["transition-none", { transition: "none" }],
    ...gt1("transition"),
  ],
  He = [
    ["flex", { display: "flex" }],
    ["inline-flex", { display: "inline-flex" }],
    ["flex-inline", { display: "inline-flex" }],
    [/^flex-(.*)$/, ([, e]) => ({
      flex: m5.bracket(e) != null
        ? m5.bracket(e).split(" ").map((t) => m5.cssvar.fraction(t) ?? t).join(
          " ",
        )
        : m5.cssvar.fraction(e),
    })],
    ["flex-1", { flex: "1 1 0%" }],
    ["flex-auto", { flex: "1 1 auto" }],
    ["flex-initial", { flex: "0 1 auto" }],
    ["flex-none", { flex: "none" }],
    [
      /^(?:flex-)?shrink(?:-(.*))?$/,
      ([, e = ""]) => ({ "flex-shrink": m5.bracket.cssvar.number(e) ?? 1 }),
      { autocomplete: ["flex-shrink-<num>", "shrink-<num>"] },
    ],
    [
      /^(?:flex-)?grow(?:-(.*))?$/,
      ([, e = ""]) => ({ "flex-grow": m5.bracket.cssvar.number(e) ?? 1 }),
      { autocomplete: ["flex-grow-<num>", "grow-<num>"] },
    ],
    [
      /^(?:flex-)?basis-(.+)$/,
      ([, e], { theme: t }) => ({
        "flex-basis": t.spacing?.[e] ?? m5.bracket.cssvar.auto.fraction.rem(e),
      }),
      { autocomplete: ["flex-basis-$spacing", "basis-$spacing"] },
    ],
    ["flex-row", { "flex-direction": "row" }],
    ["flex-row-reverse", { "flex-direction": "row-reverse" }],
    ["flex-col", { "flex-direction": "column" }],
    ["flex-col-reverse", { "flex-direction": "column-reverse" }],
    ["flex-wrap", { "flex-wrap": "wrap" }],
    ["flex-wrap-reverse", { "flex-wrap": "wrap-reverse" }],
    ["flex-nowrap", { "flex-wrap": "nowrap" }],
  ],
  Me = [
    [/^text-(.+)$/, Ne, { autocomplete: "text-$fontSize" }],
    [/^(?:text|font)-size-(.+)$/, V5, { autocomplete: "text-size-$fontSize" }],
    [/^text-(?:color-)?(.+)$/, Je, { autocomplete: "text-$colors" }],
    [/^(?:color|c)-(.+)$/, pt("color", "text", "textColor"), {
      autocomplete: "(color|c)-$colors",
    }],
    [
      /^(?:text|color|c)-(.+)$/,
      ([, e]) => _8.includes(e) ? { color: e } : void 0,
      {
        autocomplete: `(text|color|c)-(${_8.join("|")})`,
      },
    ],
    [
      /^(?:text|color|c)-op(?:acity)?-?(.+)$/,
      ([, e]) => ({ "--un-text-opacity": m5.bracket.percent.cssvar(e) }),
      { autocomplete: "(text|color|c)-(op|opacity)-<percent>" },
    ],
    [
      /^(?:font|fw)-?([^-]+)$/,
      ([, e], { theme: t }) => ({
        "font-weight": t.fontWeight?.[e] || m5.bracket.global.number(e),
      }),
      {
        autocomplete: [
          "(font|fw)-(100|200|300|400|500|600|700|800|900)",
          "(font|fw)-$fontWeight",
        ],
      },
    ],
    [
      /^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
      ([, e], { theme: t }) => ({ "line-height": W3(e, t, "lineHeight") }),
      { autocomplete: "(leading|lh|line-height)-$lineHeight" },
    ],
    ["font-synthesis-weight", { "font-synthesis": "weight" }],
    ["font-synthesis-style", { "font-synthesis": "style" }],
    ["font-synthesis-small-caps", { "font-synthesis": "small-caps" }],
    ["font-synthesis-none", { "font-synthesis": "none" }],
    [
      /^font-synthesis-(.+)$/,
      ([, e]) => ({ "font-synthesis": m5.bracket.cssvar.global(e) }),
    ],
    [
      /^(?:font-)?tracking-(.+)$/,
      ([, e], { theme: t }) => ({
        "letter-spacing": t.letterSpacing?.[e] ||
          m5.bracket.cssvar.global.rem(e),
      }),
      { autocomplete: "tracking-$letterSpacing" },
    ],
    [
      /^(?:font-)?word-spacing-(.+)$/,
      ([, e], { theme: t }) => ({
        "word-spacing": t.wordSpacing?.[e] || m5.bracket.cssvar.global.rem(e),
      }),
      { autocomplete: "word-spacing-$wordSpacing" },
    ],
    [
      /^font-(.+)$/,
      ([, e], { theme: t }) => ({
        "font-family": t.fontFamily?.[e] || m5.bracket.cssvar.global(e),
      }),
      { autocomplete: "font-$fontFamily" },
    ],
  ],
  _e1 = [[/^tab(?:-(.+))?$/, ([, e]) => {
    let t = m5.bracket.cssvar.global.number(e || "4");
    if (t != null) {
      return { "-moz-tab-size": t, "-o-tab-size": t, "tab-size": t };
    }
  }]],
  Ve = [[
    /^indent(?:-(.+))?$/,
    ([, e], { theme: t }) => ({
      "text-indent": t.textIndent?.[e || "DEFAULT"] ||
        m5.bracket.cssvar.global.fraction.rem(e),
    }),
    { autocomplete: "indent-$textIndent" },
  ]],
  Ge = [[
    /^text-stroke(?:-(.+))?$/,
    ([, e], { theme: t }) => ({
      "-webkit-text-stroke-width": t.textStrokeWidth?.[e || "DEFAULT"] ||
        m5.bracket.cssvar.px(e),
    }),
    { autocomplete: "text-stroke-$textStrokeWidth" },
  ], [
    /^text-stroke-(.+)$/,
    pt("-webkit-text-stroke-color", "text-stroke", "borderColor"),
    { autocomplete: "text-stroke-$colors" },
  ], [
    /^text-stroke-op(?:acity)?-?(.+)$/,
    ([, e]) => ({ "--un-text-stroke-opacity": m5.bracket.percent.cssvar(e) }),
    { autocomplete: "text-stroke-(op|opacity)-<percent>" },
  ]],
  Ke = [[/^text-shadow(?:-(.+))?$/, ([, e], { theme: t }) => {
    let o = t.textShadow?.[e || "DEFAULT"];
    return o != null
      ? {
        "--un-text-shadow": bt1(o, "--un-text-shadow-color").join(","),
        "text-shadow": "var(--un-text-shadow)",
      }
      : { "text-shadow": m5.bracket.cssvar.global(e) };
  }, { autocomplete: "text-shadow-$textShadow" }], [
    /^text-shadow-color-(.+)$/,
    pt("--un-text-shadow-color", "text-shadow", "shadowColor"),
    { autocomplete: "text-shadow-color-$colors" },
  ], [
    /^text-shadow-color-op(?:acity)?-?(.+)$/,
    ([, e]) => ({ "--un-text-shadow-opacity": m5.bracket.percent.cssvar(e) }),
    { autocomplete: "text-shadow-color-(op|opacity)-<percent>" },
  ]];
function W3(e, t, o) {
  return t[o]?.[e] || m5.bracket.cssvar.global.rem(e);
}
function V5([, e], { theme: t }) {
  let r = b1(t.fontSize?.[e])?.[0] ?? m5.bracket.cssvar.global.rem(e);
  if (r != null) return { "font-size": r };
}
function Je(e, t) {
  return ht(m5.bracket(e[1]))
    ? V5(e, t)
    : pt("color", "text", "textColor")(e, t);
}
function Ne([, e = "base"], { theme: t }) {
  let o = nt1(e, "length");
  if (!o) return;
  let [r, i] = o,
    a = b1(t.fontSize?.[r]),
    s = i ? W3(i, t, "lineHeight") : void 0;
  if (a?.[0]) {
    let [B, C, O] = a;
    return typeof C == "object" ? { "font-size": B, ...C } : {
      "font-size": B,
      "line-height": s ?? C ?? "1",
      "letter-spacing": O ? W3(O, t, "letterSpacing") : void 0,
    };
  }
  let v = m5.bracketOfLength.rem(r);
  return s && v
    ? { "font-size": v, "line-height": s }
    : { "font-size": m5.bracketOfLength.rem(e) };
}
var Qe = { "": "", x: "column-", y: "row-" };
function R7([, e = "", t], { theme: o }) {
  let r = o.spacing?.[t] ?? m5.bracket.cssvar.global.rem(t);
  if (r != null) return { [`${Qe[e]}gap`]: r };
}
var Xe = [[/^(?:flex-|grid-)?gap-?()(.+)$/, R7, {
  autocomplete: ["gap-$spacing", "gap-<num>"],
}], [/^(?:flex-|grid-)?gap-([xy])-?(.+)$/, R7, {
  autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"],
}]];
function d6(e) {
  return e.replace("col", "column");
}
function T6(e) {
  return e[0] === "r" ? "Row" : "Column";
}
function Ye(e, t, o) {
  let r = t[`gridAuto${T6(e)}`]?.[o];
  if (r != null) return r;
  switch (o) {
    case "min":
      return "min-content";
    case "max":
      return "max-content";
    case "fr":
      return "minmax(0,1fr)";
  }
  return m5.bracket.cssvar.auto.rem(o);
}
var Ze = [
    ["grid", { display: "grid" }],
    ["inline-grid", { display: "inline-grid" }],
    [
      /^(?:grid-)?(row|col)-(.+)$/,
      ([, e, t], { theme: o }) => ({
        [`grid-${d6(e)}`]: o[`grid${T6(e)}`]?.[t] ?? m5.bracket.cssvar.auto(t),
      }),
    ],
    [/^(?:grid-)?(row|col)-span-(.+)$/, ([, e, t]) => {
      if (t === "full") return { [`grid-${d6(e)}`]: "1/-1" };
      let o = m5.bracket.number(t);
      if (o != null) return { [`grid-${d6(e)}`]: `span ${o}/span ${o}` };
    }, { autocomplete: ["grid-(row|col)-span-<num>", "(row|col)-span-<num>"] }],
    [
      /^(?:grid-)?(row|col)-start-(.+)$/,
      ([, e, t]) => ({ [`grid-${d6(e)}-start`]: m5.bracket.cssvar(t) ?? t }),
    ],
    [
      /^(?:grid-)?(row|col)-end-(.+)$/,
      ([, e, t]) => ({ [`grid-${d6(e)}-end`]: m5.bracket.cssvar(t) ?? t }),
      { autocomplete: ["grid-(row|col)-(start|end)-<num>"] },
    ],
    [
      /^(?:grid-)?auto-(rows|cols)-(.+)$/,
      ([, e, t], { theme: o }) => ({ [`grid-auto-${d6(e)}`]: Ye(e, o, t) }),
      { autocomplete: ["grid-auto-(rows|cols)-<num>"] },
    ],
    [
      /^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/,
      ([, e]) => ({ "grid-auto-flow": m5.bracket.cssvar(e) }),
    ],
    [
      /^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/,
      ([, e]) => ({ "grid-auto-flow": d6(e).replace("-", " ") }),
      {
        autocomplete: [
          "(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)",
        ],
      },
    ],
    [
      /^grid-(rows|cols)-(.+)$/,
      ([, e, t], { theme: o }) => ({
        [`grid-template-${d6(e)}`]: o[`gridTemplate${T6(e)}`]?.[t] ??
          m5.bracket.cssvar(t),
      }),
    ],
    [
      /^grid-(rows|cols)-minmax-([\w.-]+)$/,
      ([, e, t]) => ({
        [`grid-template-${d6(e)}`]: `repeat(auto-fill,minmax(${t},1fr))`,
      }),
    ],
    [
      /^grid-(rows|cols)-(\d+)$/,
      ([, e, t]) => ({
        [`grid-template-${d6(e)}`]: `repeat(${t},minmax(0,1fr))`,
      }),
      { autocomplete: ["grid-(rows|cols)-<num>", "grid-(rows|cols)-none"] },
    ],
    [/^grid-area(s)?-(.+)$/, ([, e, t]) =>
      e != null
        ? {
          "grid-template-areas": m5.cssvar(t) ??
            t.split("-").map((o) => `"${m5.bracket(o)}"`).join(" "),
        }
        : { "grid-area": m5.bracket.cssvar(t) }],
    ["grid-rows-none", { "grid-template-rows": "none" }],
    ["grid-cols-none", { "grid-template-columns": "none" }],
    ["grid-rows-subgrid", { "grid-template-rows": "subgrid" }],
    ["grid-cols-subgrid", { "grid-template-columns": "subgrid" }],
  ],
  j10 = ["auto", "hidden", "clip", "visible", "scroll", "overlay", ..._8],
  et3 = [[
    /^(?:overflow|of)-(.+)$/,
    ([, e]) => j10.includes(e) ? { overflow: e } : void 0,
    {
      autocomplete: [
        `(overflow|of)-(${j10.join("|")})`,
        `(overflow|of)-(x|y)-(${j10.join("|")})`,
      ],
    },
  ], [
    /^(?:overflow|of)-([xy])-(.+)$/,
    ([, e, t]) => j10.includes(t) ? { [`overflow-${e}`]: t } : void 0,
  ]],
  tt2 = [[
    /^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/,
    ([, e]) => ({ position: e }),
    {
      autocomplete: [
        "(position|pos)-<position>",
        "(position|pos)-<globalKeyword>",
        "<position>",
      ],
    },
  ], [
    /^(?:position-|pos-)([-\w]+)$/,
    ([, e]) => _8.includes(e) ? { position: e } : void 0,
  ], [/^(?:position-|pos-)?(static)$/, ([, e]) => ({ position: e })]],
  G9 = [
    ["justify-start", { "justify-content": "flex-start" }],
    ["justify-end", { "justify-content": "flex-end" }],
    ["justify-center", { "justify-content": "center" }],
    ["justify-between", { "justify-content": "space-between" }],
    ["justify-around", { "justify-content": "space-around" }],
    ["justify-evenly", { "justify-content": "space-evenly" }],
    ["justify-stretch", { "justify-content": "stretch" }],
    ["justify-left", { "justify-content": "left" }],
    ["justify-right", { "justify-content": "right" }],
    ...gt1("justify", "justify-content"),
    ["justify-items-start", { "justify-items": "start" }],
    ["justify-items-end", { "justify-items": "end" }],
    ["justify-items-center", { "justify-items": "center" }],
    ["justify-items-stretch", { "justify-items": "stretch" }],
    ...gt1("justify-items"),
    ["justify-self-auto", { "justify-self": "auto" }],
    ["justify-self-start", { "justify-self": "start" }],
    ["justify-self-end", { "justify-self": "end" }],
    ["justify-self-center", { "justify-self": "center" }],
    ["justify-self-stretch", { "justify-self": "stretch" }],
    ...gt1("justify-self"),
  ],
  ot3 = [
    [/^order-(.+)$/, ([, e]) => ({ order: m5.bracket.cssvar.number(e) })],
    ["order-first", { order: "-9999" }],
    ["order-last", { order: "9999" }],
    ["order-none", { order: "0" }],
  ],
  K9 = [
    ["content-center", { "align-content": "center" }],
    ["content-start", { "align-content": "flex-start" }],
    ["content-end", { "align-content": "flex-end" }],
    ["content-between", { "align-content": "space-between" }],
    ["content-around", { "align-content": "space-around" }],
    ["content-evenly", { "align-content": "space-evenly" }],
    ...gt1("content", "align-content"),
    ["items-start", { "align-items": "flex-start" }],
    ["items-end", { "align-items": "flex-end" }],
    ["items-center", { "align-items": "center" }],
    ["items-baseline", { "align-items": "baseline" }],
    ["items-stretch", { "align-items": "stretch" }],
    ...gt1("items", "align-items"),
    ["self-auto", { "align-self": "auto" }],
    ["self-start", { "align-self": "flex-start" }],
    ["self-end", { "align-self": "flex-end" }],
    ["self-center", { "align-self": "center" }],
    ["self-stretch", { "align-self": "stretch" }],
    ["self-baseline", { "align-self": "baseline" }],
    ...gt1("self", "align-self"),
  ],
  nt2 = [
    ["place-content-center", { "place-content": "center" }],
    ["place-content-start", { "place-content": "start" }],
    ["place-content-end", { "place-content": "end" }],
    ["place-content-between", { "place-content": "space-between" }],
    ["place-content-around", { "place-content": "space-around" }],
    ["place-content-evenly", { "place-content": "space-evenly" }],
    ["place-content-stretch", { "place-content": "stretch" }],
    ...gt1("place-content"),
    ["place-items-start", { "place-items": "start" }],
    ["place-items-end", { "place-items": "end" }],
    ["place-items-center", { "place-items": "center" }],
    ["place-items-stretch", { "place-items": "stretch" }],
    ...gt1("place-items"),
    ["place-self-auto", { "place-self": "auto" }],
    ["place-self-start", { "place-self": "start" }],
    ["place-self-end", { "place-self": "end" }],
    ["place-self-center", { "place-self": "center" }],
    ["place-self-stretch", { "place-self": "stretch" }],
    ...gt1("place-self"),
  ],
  rt3 = [...G9, ...K9].flatMap((
    [e, t],
  ) => [[`flex-${e}`, t], [`grid-${e}`, t]]);
function A11(e, { theme: t }) {
  return t.spacing?.[e] ?? m5.bracket.cssvar.global.auto.fraction.rem(e);
}
function x6([, e, t], o) {
  let r = A11(t, o);
  if (r != null && e in ct1) return ct1[e].map((i) => [i.slice(1), r]);
}
var it2 = [
    [/^(?:position-|pos-)?inset-(.+)$/, ([, e], t) => ({ inset: A11(e, t) }), {
      autocomplete: [
        "(position|pos)-inset-<directions>-$spacing",
        "(position|pos)-inset-(block|inline)-$spacing",
        "(position|pos)-inset-(bs|be|is|ie)-$spacing",
        "(position|pos)-(top|left|right|bottom)-$spacing",
      ],
    }],
    [/^(?:position-|pos-)?(start|end)-(.+)$/, x6],
    [/^(?:position-|pos-)?inset-([xy])-(.+)$/, x6],
    [/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, x6],
    [/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, x6],
    [/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, x6],
    [
      /^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/,
      ([, e, t], o) => ({ [e]: A11(t, o) }),
    ],
  ],
  st3 = [
    ["float-left", { float: "left" }],
    ["float-right", { float: "right" }],
    ["float-none", { float: "none" }],
    ...gt1("float"),
    ["clear-left", { clear: "left" }],
    ["clear-right", { clear: "right" }],
    ["clear-both", { clear: "both" }],
    ["clear-none", { clear: "none" }],
    ...gt1("clear"),
  ],
  at3 = [[
    /^(?:position-|pos-)?z([\d.]+)$/,
    ([, e]) => ({ "z-index": m5.number(e) }),
  ], [
    /^(?:position-|pos-)?z-(.+)$/,
    ([, e], { theme: t }) => ({
      "z-index": t.zIndex?.[e] ?? m5.bracket.cssvar.global.auto.number(e),
    }),
    { autocomplete: "z-<num>" },
  ]],
  lt1 = [["box-border", { "box-sizing": "border-box" }], ["box-content", {
    "box-sizing": "content-box",
  }], ...gt1("box", "box-sizing")],
  ct2 = { h: "height", w: "width", inline: "inline-size", block: "block-size" };
function y6(e, t) {
  return `${e || ""}${ct2[t]}`;
}
function P8(e, t, o, r) {
  let i = y6(e, t).replace(/-(\w)/g, (s, v) => v.toUpperCase()), a = o[i]?.[r];
  if (a != null) return a;
  switch (r) {
    case "fit":
    case "max":
    case "min":
      return `${r}-content`;
  }
  return m5.bracket.cssvar.global.auto.fraction.rem(r);
}
var ut2 = [[
  /^(?:size-)?(min-|max-)?([wh])-?(.+)$/,
  ([, e, t, o], { theme: r }) => ({ [y6(e, t)]: P8(e, t, r, o) }),
], [
  /^(?:size-)?(min-|max-)?(block|inline)-(.+)$/,
  ([, e, t, o], { theme: r }) => ({ [y6(e, t)]: P8(e, t, r, o) }),
  {
    autocomplete: [
      "(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(max|min)-(w|h|block|inline)",
      "(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(w|h)-full",
      "(max|min)-(w|h)-full",
    ],
  },
], [
  /^(?:size-)?(min-|max-)?(h)-screen-(.+)$/,
  ([, e, t, o], r) => ({ [y6(e, t)]: q5(r, o, "verticalBreakpoints") }),
], [
  /^(?:size-)?(min-|max-)?(w)-screen-(.+)$/,
  ([, e, t, o], r) => ({ [y6(e, t)]: q5(r, o) }),
  {
    autocomplete: [
      "(w|h)-screen",
      "(min|max)-(w|h)-screen",
      "h-screen-$verticalBreakpoints",
      "(min|max)-h-screen-$verticalBreakpoints",
      "w-screen-$breakpoints",
      "(min|max)-w-screen-$breakpoints",
    ],
  },
]];
function q5(e, t, o = "breakpoints") {
  let r = rt2(e, o);
  if (r) return r.find((i) => i.point === t)?.size;
}
function dt2(e) {
  if (/^\d+\/\d+$/.test(e)) return e;
  switch (e) {
    case "square":
      return "1/1";
    case "video":
      return "16/9";
  }
  return m5.bracket.cssvar.global.auto.number(e);
}
var pt1 = [[
    /^(?:size-)?aspect-(?:ratio-)?(.+)$/,
    ([, e]) => ({ "aspect-ratio": dt2(e) }),
    {
      autocomplete: [
        "aspect-(square|video|ratio)",
        "aspect-ratio-(square|video)",
      ],
    },
  ]],
  ft1 = [
    [/^pa?()-?(-?.+)$/, ft("padding"), {
      autocomplete: ["(m|p)<num>", "(m|p)-<num>"],
    }],
    [/^p-?xy()()$/, ft("padding"), { autocomplete: "(m|p)-(xy)" }],
    [/^p-?([xy])(?:-?(-?.+))?$/, ft("padding")],
    [/^p-?([rltbse])(?:-?(-?.+))?$/, ft("padding"), {
      autocomplete: "(m|p)<directions>-<num>",
    }],
    [/^p-(block|inline)(?:-(-?.+))?$/, ft("padding"), {
      autocomplete: "(m|p)-(block|inline)-<num>",
    }],
    [/^p-?([bi][se])(?:-?(-?.+))?$/, ft("padding"), {
      autocomplete: "(m|p)-(bs|be|is|ie)-<num>",
    }],
  ],
  bt2 = [
    [/^ma?()-?(-?.+)$/, ft("margin")],
    [/^m-?xy()()$/, ft("margin")],
    [/^m-?([xy])(?:-?(-?.+))?$/, ft("margin")],
    [/^m-?([rltbse])(?:-?(-?.+))?$/, ft("margin")],
    [/^m-(block|inline)(?:-(-?.+))?$/, ft("margin")],
    [/^m-?([bi][se])(?:-?(-?.+))?$/, ft("margin")],
  ],
  mt2 = {
    backface: "backface-visibility",
    break: "word-break",
    case: "text-transform",
    content: "align-content",
    fw: "font-weight",
    items: "align-items",
    justify: "justify-content",
    select: "user-select",
    self: "align-self",
    vertical: "vertical-align",
    visible: "visibility",
    whitespace: "white-space",
    ws: "white-space",
  },
  gt2 = [[/^(.+?)-(\$.+)$/, ([, e, t]) => {
    let o = mt2[e];
    if (o) return { [o]: m5.cssvar(t) };
  }]],
  ht1 = [[/^\[(.*)\]$/, ([e, t], { theme: o }) => {
    if (!t.includes(":")) return;
    let [r, ...i] = t.split(":"), a = i.join(":");
    if (!xt(t) && /^[a-z-]+$/.test(r) && $t2(a)) {
      let s;
      if (
        I4(a) && (s = K6(a, o)),
          (!s || s === a) && (s = m5.bracket(`[${a}]`)),
          s
      ) return { [r]: s };
    }
  }]];
function $t2(e) {
  let t = 0;
  function o(r) {
    for (; t < e.length;) if (t += 1, e[t] === r) return !0;
    return !1;
  }
  for (t = 0; t < e.length; t++) {
    let r = e[t];
    if ("\"`'".includes(r)) {
      if (!o(r)) return !1;
      else if (r === "(") {
        if (!o(")")) return !1;
        else if ("[]{}:".includes(r)) return !1;
      }
    }
  }
  return !0;
}
function xt(e) {
  if (!e.includes("://")) return !1;
  try {
    return new URL(e).host !== "";
  } catch {
    return !1;
  }
}
var kt = [[/^(where|\?)$/, (e, { constructCSS: t, generator: o }) => {
    if (o.userConfig.envMode === "dev") {
      return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}}
${
        t({ animation: "__un_qm 0.5s ease-in-out alternate infinite" })
      }`;
    }
  }]],
  yt1 = [
    [/^fill-(.+)$/, pt("fill", "fill", "backgroundColor"), {
      autocomplete: "fill-$colors",
    }],
    [
      /^fill-op(?:acity)?-?(.+)$/,
      ([, e]) => ({ "--un-fill-opacity": m5.bracket.percent.cssvar(e) }),
      { autocomplete: "fill-(op|opacity)-<percent>" },
    ],
    ["fill-none", { fill: "none" }],
    [/^stroke-(?:width-|size-)?(.+)$/, J6, {
      autocomplete: ["stroke-width-$lineWidth", "stroke-size-$lineWidth"],
    }],
    [
      /^stroke-dash-(.+)$/,
      ([, e]) => ({ "stroke-dasharray": m5.bracket.cssvar.number(e) }),
      { autocomplete: "stroke-dash-<num>" },
    ],
    [
      /^stroke-offset-(.+)$/,
      ([, e], { theme: t }) => ({
        "stroke-dashoffset": t.lineWidth?.[e] ??
          m5.bracket.cssvar.px.numberWithUnit(e),
      }),
      { autocomplete: "stroke-offset-$lineWidth" },
    ],
    [/^stroke-(.+)$/, wt, { autocomplete: "stroke-$colors" }],
    [
      /^stroke-op(?:acity)?-?(.+)$/,
      ([, e]) => ({ "--un-stroke-opacity": m5.bracket.percent.cssvar(e) }),
      { autocomplete: "stroke-(op|opacity)-<percent>" },
    ],
    ["stroke-cap-square", { "stroke-linecap": "square" }],
    ["stroke-cap-round", { "stroke-linecap": "round" }],
    ["stroke-cap-auto", { "stroke-linecap": "butt" }],
    ["stroke-join-arcs", { "stroke-linejoin": "arcs" }],
    ["stroke-join-bevel", { "stroke-linejoin": "bevel" }],
    ["stroke-join-clip", { "stroke-linejoin": "miter-clip" }],
    ["stroke-join-round", { "stroke-linejoin": "round" }],
    ["stroke-join-auto", { "stroke-linejoin": "miter" }],
    ["stroke-none", { stroke: "none" }],
  ];
function J6([, e], { theme: t }) {
  return {
    "stroke-width": t.lineWidth?.[e] ?? m5.bracket.cssvar.fraction.px.number(e),
  };
}
function wt(e, t) {
  return ht(m5.bracket(e[1]))
    ? J6(e, t)
    : pt("stroke", "stroke", "borderColor")(e, t);
}
var Ct = [
  gt2,
  ht1,
  ft1,
  bt2,
  C9,
  Oe,
  Fe,
  Ie,
  yt1,
  Ae,
  V4,
  B7,
  Me,
  _e1,
  Ve,
  R5,
  Re,
  Ge,
  Ke,
  U5,
  ze,
  A9,
  D5,
  P7,
  L6,
  He,
  Ze,
  Xe,
  tt2,
  ut2,
  pt1,
  X5,
  q4,
  Z4,
  E5,
  ve,
  O7,
  T4,
  F6,
  et3,
  je,
  Ce,
  ot3,
  G9,
  K9,
  nt2,
  rt3,
  it2,
  st3,
  at3,
  lt1,
  qe,
  I6,
  Te,
  De,
  Y4,
  M6,
  kt,
].flat(1);
var Q3 = {
  name: "aria",
  match(t, r) {
    let n = A7("aria-", t, r.generator.config.separators);
    if (n) {
      let [a, s] = n, e = m5.bracket(a) ?? r.theme.aria?.[a] ?? "";
      if (e) return { matcher: s, selector: (o) => `${o}[aria-${e}]` };
    }
  },
};
function B9(t) {
  let r = t.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "", n = t.slice(r.length);
  if (n === "px") {
    let a = Number.parseFloat(r) - .1;
    return Number.isNaN(a) ? t : `${a}${n}`;
  }
  return `calc(${t} - 0.1px)`;
}
function U7() {
  let t = {};
  return {
    name: "breakpoints",
    match(r, n) {
      let a = (rt2(n) ?? []).map(({ point: s, size: e }, o) => [s, e, o]);
      for (let [s, e, o] of a) {
        t[s] ||
          (t[s] = new RegExp(
            `^((?:([al]t-|[<~]|max-))?${s}(?:${
              n.generator.config.separators.join("|")
            }))`,
          ));
        let i = r.match(t[s]);
        if (!i) continue;
        let [, c] = i, $ = r.slice(c.length);
        if ($ === "container") continue;
        let R = c.startsWith("lt-") || c.startsWith("<") ||
            c.startsWith("max-"),
          h = c.startsWith("at-") || c.startsWith("~"),
          l = 1e3;
        return R
          ? (l -= o + 1, {
            matcher: $,
            handle: (f, u) =>
              u({
                ...f,
                parent: `${
                  f.parent ? `${f.parent} $$ ` : ""
                }@media (max-width: ${B9(e)})`,
                parentOrder: l,
              }),
          })
          : (l += o + 1,
            h && o < a.length - 1
              ? {
                matcher: $,
                handle: (f, u) =>
                  u({
                    ...f,
                    parent: `${
                      f.parent ? `${f.parent} $$ ` : ""
                    }@media (min-width: ${e}) and (max-width: ${
                      B9(a[o + 1][1])
                    })`,
                    parentOrder: l,
                  }),
              }
              : {
                matcher: $,
                handle: (f, u) =>
                  u({
                    ...f,
                    parent: `${
                      f.parent ? `${f.parent} $$ ` : ""
                    }@media (min-width: ${e})`,
                    parentOrder: l,
                  }),
              });
      }
    },
    multiPass: !0,
    autocomplete: "(at-|lt-|max-|)$breakpoints:",
  };
}
function E7(t, r) {
  return {
    name: `combinator:${t}`,
    match(n, a) {
      if (!n.startsWith(t)) return;
      let s = a.generator.config.separators, e = R4(`${t}-`, n, s);
      if (!e) {
        for (let i of s) {
          if (n.startsWith(`${t}${i}`)) {
            e = ["", n.slice(t.length + i.length)];
            break;
          }
        }
        if (!e) return;
      }
      let o = m5.bracket(e[0]) ?? "";
      return o === "" && (o = "*"),
        { matcher: e[1], selector: (i) => `${i}${r}${o}` };
    },
    multiPass: !0,
  };
}
var H9 = [
    E7("all", " "),
    E7("children", ">"),
    E7("next", "+"),
    E7("sibling", "+"),
    E7("siblings", "~"),
  ],
  J7 = {
    name: "@",
    match(t, r) {
      if (t.startsWith("@container")) return;
      let n = A7("@", t, r.generator.config.separators);
      if (n) {
        let [a, s, e] = n, o = m5.bracket(a), i;
        if (o) {
          let c = m5.numberWithUnit(o);
          c && (i = `(min-width: ${c})`);
        } else i = r.theme.containers?.[a] ?? "";
        if (i) {
          return Rt(
            "The container query variant is experimental and may not follow semver.",
          ),
            {
              matcher: s,
              handle: (c, $) =>
                $({
                  ...c,
                  parent: `${c.parent ? `${c.parent} $$ ` : ""}@container${
                    e ? ` ${e} ` : " "
                  }${i}`,
                }),
            };
        }
      }
    },
    multiPass: !0,
  };
function X6(t = {}) {
  if (t?.dark === "class" || typeof t.dark == "object") {
    let { dark: r = ".dark", light: n = ".light" } = typeof t.dark == "string"
      ? {}
      : t.dark;
    return [
      G6("dark", (a) => ({ prefix: `${r} $$ ${a.prefix}` })),
      G6("light", (a) => ({ prefix: `${n} $$ ${a.prefix}` })),
    ];
  }
  return [
    H6("dark", "@media (prefers-color-scheme: dark)"),
    H6("light", "@media (prefers-color-scheme: light)"),
  ];
}
var Y5 = {
  name: "data",
  match(t, r) {
    let n = A7("data-", t, r.generator.config.separators);
    if (n) {
      let [a, s] = n, e = m5.bracket(a) ?? r.theme.data?.[a] ?? "";
      if (e) return { matcher: s, selector: (o) => `${o}[data-${e}]` };
    }
  },
};
function x7(t) {
  return {
    name: `${t}-data`,
    match(r, n) {
      let a = A7(`${t}-data-`, r, n.generator.config.separators);
      if (a) {
        let [s, e] = a, o = m5.bracket(s) ?? n.theme.data?.[s] ?? "";
        if (o) return { matcher: `${t}-[[data-${o}]]:${e}` };
      }
    },
  };
}
var Z5 = [x7("group"), x7("peer"), x7("parent"), x7("previous")],
  tt3 = [
    G6("rtl", (t) => ({ prefix: `[dir="rtl"] $$ ${t.prefix}` })),
    G6("ltr", (t) => ({ prefix: `[dir="ltr"] $$ ${t.prefix}` })),
  ],
  et4 = {
    name: "selector",
    match(t, r) {
      let n = R4("selector-", t, r.generator.config.separators);
      if (n) {
        let [a, s] = n, e = m5.bracket(a);
        if (e) return { matcher: s, selector: () => e };
      }
    },
  },
  rt4 = {
    name: "layer",
    match(t, r) {
      let n = A7("layer-", t, r.generator.config.separators);
      if (n) {
        let [a, s] = n, e = m5.bracket(a) ?? a;
        if (e) {
          return {
            matcher: s,
            handle: (o, i) =>
              i({
                ...o,
                parent: `${o.parent ? `${o.parent} $$ ` : ""}@layer ${e}`,
              }),
          };
        }
      }
    },
  },
  at4 = {
    name: "uno-layer",
    match(t, r) {
      let n = A7("uno-layer-", t, r.generator.config.separators);
      if (n) {
        let [a, s] = n, e = m5.bracket(a) ?? a;
        if (e) return { matcher: s, layer: e };
      }
    },
  },
  nt3 = {
    name: "scope",
    match(t, r) {
      let n = R4("scope-", t, r.generator.config.separators);
      if (n) {
        let [a, s] = n, e = m5.bracket(a);
        if (e) return { matcher: s, selector: (o) => `${e} $$ ${o}` };
      }
    },
  },
  st4 = {
    name: "variables",
    match(t, r) {
      if (!t.startsWith("[")) return;
      let [n, a] = w6(t, "[", "]") ?? [];
      if (!(n && a)) return;
      let s;
      for (let i of r.generator.config.separators) {
        if (a.startsWith(i)) {
          s = a.slice(i.length);
          break;
        }
      }
      if (s == null) return;
      let e = m5.bracket(n) ?? "", o = e.startsWith("@");
      if (o || e.includes("&")) {
        return {
          matcher: s,
          handle(i, c) {
            let $ = o
              ? { parent: `${i.parent ? `${i.parent} $$ ` : ""}${e}` }
              : { selector: e.replace(/&/g, i.selector) };
            return c({ ...i, ...$ });
          },
        };
      }
    },
    multiPass: !0,
  },
  I9 = /^-?[0-9.]+(?:[a-z]+|%)?$/,
  L8 = /-?[0-9.]+(?:[a-z]+|%)?/,
  ot4 = [/\b(opacity|color|flex|backdrop-filter|^filter|transform)\b/];
function it3(t) {
  let r = t.match(y5);
  if (r) {
    let [n, a] = C7(`(${r[2]})${r[3]}`, "(", ")", " ") ?? [];
    if (n) return `calc(${r[1]}${n} * -1)${a ? ` ${a}` : ""}`;
  }
}
var ct3 = /\b(hue-rotate)\s*(\(.*)/;
function lt2(t) {
  let r = t.match(ct3);
  if (r) {
    let [n, a] = C7(r[2], "(", ")", " ") ?? [];
    if (n) {
      let s = I9.test(n.slice(1, -1))
        ? n.replace(L8, (e) => e.startsWith("-") ? e.slice(1) : `-${e}`)
        : `(calc(${n} * -1))`;
      return `${r[1]}${s}${a ? ` ${a}` : ""}`;
    }
  }
}
var ft2 = {
  name: "negative",
  match(t) {
    if (t.startsWith("-")) {
      return {
        matcher: t.slice(1),
        body: (r) => {
          if (r.find((a) => a[0] === ut1)) return;
          let n = !1;
          return r.forEach((a) => {
            let s = a[1]?.toString();
            if (!s || s === "0" || ot4.some((i) => i.test(a[0]))) return;
            let e = it3(s);
            if (e) {
              a[1] = e, n = !0;
              return;
            }
            let o = lt2(s);
            if (o) {
              a[1] = o, n = !0;
              return;
            }
            I9.test(s) &&
              (a[1] = s.replace(
                L8,
                (i) => i.startsWith("-") ? i.slice(1) : `-${i}`,
              ),
                n = !0);
          }),
            n ? r : [];
        },
      };
    }
  },
};
function ht2() {
  let t;
  return {
    name: "important",
    match(r, n) {
      t ||
        (t = new RegExp(
          `^(important(?:${n.generator.config.separators.join("|")})|!)`,
        ));
      let a, s = r.match(t);
      if (
        s ? a = r.slice(s[0].length) : r.endsWith("!") && (a = r.slice(0, -1)),
          a
      ) {
        return {
          matcher: a,
          body: (e) => (e.forEach((o) => {
            o[1] && (o[1] += " !important");
          }),
            e),
        };
      }
    },
  };
}
var ut3 = H6("print", "@media print"),
  mt3 = {
    name: "media",
    match(t, r) {
      let n = A7("media-", t, r.generator.config.separators);
      if (n) {
        let [a, s] = n, e = m5.bracket(a) ?? "";
        if (e === "" && (e = r.theme.media?.[a] ?? ""), e) {
          return {
            matcher: s,
            handle: (o, i) =>
              i({
                ...o,
                parent: `${o.parent ? `${o.parent} $$ ` : ""}@media ${e}`,
              }),
          };
        }
      }
    },
    multiPass: !0,
  },
  $t3 = {
    name: "supports",
    match(t, r) {
      let n = A7("supports-", t, r.generator.config.separators);
      if (n) {
        let [a, s] = n, e = m5.bracket(a) ?? "";
        if (e === "" && (e = r.theme.supports?.[a] ?? ""), e) {
          return {
            matcher: s,
            handle: (o, i) =>
              i({
                ...o,
                parent: `${o.parent ? `${o.parent} $$ ` : ""}@supports ${e}`,
              }),
          };
        }
      }
    },
    multiPass: !0,
  },
  y7 = Object.fromEntries(
    [
      ["first-letter", "::first-letter"],
      ["first-line", "::first-line"],
      "any-link",
      "link",
      "visited",
      "target",
      ["open", "[open]"],
      "default",
      "checked",
      "indeterminate",
      "placeholder-shown",
      "autofill",
      "optional",
      "required",
      "valid",
      "invalid",
      "user-valid",
      "user-invalid",
      "in-range",
      "out-of-range",
      "read-only",
      "read-write",
      "empty",
      "focus-within",
      "hover",
      "focus",
      "focus-visible",
      "active",
      "enabled",
      "disabled",
      "root",
      "empty",
      ["even-of-type", ":nth-of-type(even)"],
      ["even", ":nth-child(even)"],
      ["odd-of-type", ":nth-of-type(odd)"],
      ["odd", ":nth-child(odd)"],
      "first-of-type",
      ["first", ":first-child"],
      "last-of-type",
      ["last", ":last-child"],
      "only-child",
      "only-of-type",
      ["backdrop-element", "::backdrop"],
      ["placeholder", "::placeholder"],
      ["before", "::before"],
      ["after", "::after"],
      ["selection", "::selection"],
      ["marker", "::marker"],
      ["file", "::file-selector-button"],
    ].map((t) => Array.isArray(t) ? t : [t, `:${t}`]),
  ),
  D8 = Object.keys(y7),
  P9 = Object.fromEntries(
    [["backdrop", "::backdrop"]].map((t) =>
      Array.isArray(t) ? t : [t, `:${t}`]
    ),
  ),
  G10 = Object.keys(P9),
  dt3 = ["not", "is", "where", "has"],
  O8 = Object.entries(y7).filter(([, t]) => !t.startsWith("::")).map(([t]) => t)
    .sort((t, r) => r.length - t.length).join("|"),
  A12 = Object.entries(P9).filter(([, t]) => !t.startsWith("::")).map(([t]) =>
    t
  ).sort((t, r) => r.length - t.length).join("|"),
  v6 = dt3.join("|");
function pt2(t, r, n) {
  let a = new RegExp(`^(${qt(r)}:)(\\S+)${qt(n)}\\1`),
    s,
    e,
    o,
    i,
    c = (h) => {
      let l = R4(`${t}-`, h, []);
      if (!l) return;
      let [f, u] = l, d = m5.bracket(f);
      if (d == null) return;
      let p = u.split(s, 1)?.[0] ?? "", g = `${r}${ut(p)}`;
      return [
        p,
        h.slice(h.length - (u.length - p.length - 1)),
        d.includes("&") ? d.replace(/&/g, g) : `${g}${d}`,
      ];
    },
    $ = (h) => {
      let l = h.match(e) || h.match(o);
      if (!l) return;
      let [f, u, d] = l, p = l[3] ?? "", g = y7[d] || P9[d] || `:${d}`;
      return u && (g = `:${u}(${g})`),
        [p, h.slice(f.length), `${r}${ut(p)}${g}`, d];
    },
    R = (h) => {
      let l = h.match(i);
      if (!l) return;
      let [f, u, d] = l, p = l[3] ?? "", g = `:${u}(${d})`;
      return [p, h.slice(f.length), `${r}${ut(p)}${g}`];
    };
  return {
    name: `pseudo:${t}`,
    match(h, l) {
      if (
        s && e && o ||
        (s = new RegExp(`(?:${l.generator.config.separators.join("|")})`),
          e = new RegExp(
            `^${t}-(?:(?:(${v6})-)?(${O8}))(?:(/\\w+))?(?:${
              l.generator.config.separators.join("|")
            })`,
          ),
          o = new RegExp(
            `^${t}-(?:(?:(${v6})-)?(${A12}))(?:(/\\w+))?(?:${
              l.generator.config.separators.filter((k) => k !== "-").join("|")
            })`,
          ),
          i = new RegExp(
            `^${t}-(?:(${v6})-)?\\[(.+)\\](?:(/\\w+))?(?:${
              l.generator.config.separators.filter((k) => k !== "-").join("|")
            })`,
          )), !h.startsWith(t)
      ) return;
      let f = c(h) || $(h) || R(h);
      if (!f) return;
      let [u, d, p, g = ""] = f;
      return u !== "" &&
        Rt("The labeled variant is experimental and may not follow semver."),
        {
          matcher: d,
          handle: (k, K) =>
            K({
              ...k,
              prefix: `${p}${n}${k.prefix}`.replace(a, "$1$2:"),
              sort: D8.indexOf(g) ?? G10.indexOf(g),
            }),
        };
    },
    multiPass: !0,
  };
}
var gt3 = [
    "::-webkit-resizer",
    "::-webkit-scrollbar",
    "::-webkit-scrollbar-button",
    "::-webkit-scrollbar-corner",
    "::-webkit-scrollbar-thumb",
    "::-webkit-scrollbar-track",
    "::-webkit-scrollbar-track-piece",
    "::file-selector-button",
  ],
  F9 = Object.entries(y7).map(([t]) => t).sort((t, r) => r.length - t.length)
    .join("|"),
  M8 = Object.entries(P9).map(([t]) => t).sort((t, r) => r.length - t.length)
    .join("|");
function bt3() {
  let t, r;
  return {
    name: "pseudo",
    match(n, a) {
      t && t ||
        (t = new RegExp(
          `^(${F9})(?:${a.generator.config.separators.join("|")})`,
        ),
          r = new RegExp(
            `^(${M8})(?:${
              a.generator.config.separators.filter((e) => e !== "-").join("|")
            })`,
          ));
      let s = n.match(t) || n.match(r);
      if (s) {
        let e = y7[s[1]] || P9[s[1]] || `:${s[1]}`, o = D8.indexOf(s[1]);
        return o === -1 && (o = G10.indexOf(s[1])), o === -1 && (o = void 0), {
          matcher: n.slice(s[0].length),
          handle: (i, c) => {
            let $ = e.startsWith("::") && !gt3.includes(e)
              ? { pseudo: `${i.pseudo}${e}` }
              : { selector: `${i.selector}${e}` };
            return c({ ...i, ...$, sort: o, noMerge: !0 });
          },
        };
      }
    },
    multiPass: !0,
    autocomplete: `(${F9}|${M8}):`,
  };
}
function vt2() {
  let t, r, n;
  return {
    match(a, s) {
      t && r ||
        (t = new RegExp(
          `^(${v6})-(${O8})(?:${s.generator.config.separators.join("|")})`,
        ),
          r = new RegExp(
            `^(${v6})-(${A12})(?:${
              s.generator.config.separators.filter((o) => o !== "-").join("|")
            })`,
          ),
          n = new RegExp(
            `^(${v6})-(\\[.+\\])(?:${
              s.generator.config.separators.filter((o) => o !== "-").join("|")
            })`,
          ));
      let e = a.match(t) || a.match(r) || a.match(n);
      if (e) {
        let o = e[1],
          c = w6(e[2], "[", "]")
            ? m5.bracket(e[2])
            : y7[e[2]] || P9[e[2]] || `:${e[2]}`;
        return {
          matcher: a.slice(e[0].length),
          selector: ($) => `${$}:${o}(${c})`,
        };
      }
    },
    multiPass: !0,
    autocomplete: `(${v6})-(${O8}|${A12}):`,
  };
}
function kt1(t = {}) {
  let r = !!t?.attributifyPseudo, n = t?.prefix ?? "";
  n = (Array.isArray(n) ? n : [n]).filter(Boolean)[0] ?? "";
  let a = (s, e) => pt2(s, r ? `[${n}${s}=""]` : `.${n}${s}`, e);
  return [
    a("group", " "),
    a("peer", "~"),
    a("parent", ">"),
    a("previous", "+"),
  ];
}
var yt2 = /(part-\[(.+)]:)(.+)/,
  Pt2 = {
    match(t) {
      let r = t.match(yt2);
      if (r) {
        let n = `part(${r[2]})`;
        return { matcher: t.slice(r[1].length), selector: (a) => `${a}::${n}` };
      }
    },
    multiPass: !0,
  };
function wt1(t) {
  return [
    Q3,
    Y5,
    rt4,
    et4,
    at4,
    ft2,
    ht2(),
    $t3,
    ut3,
    mt3,
    U7(),
    ...H9,
    bt3(),
    vt2(),
    ...kt1(t),
    Pt2,
    ...X6(t),
    ...tt3,
    nt3,
    J7,
    st4,
    ...Z5,
  ];
}
var p3 = [{
    layer: "preflights",
    getCSS(r) {
      if (r.theme.preflightBase) {
        let t = z1(Object.entries(r.theme.preflightBase));
        return b1(r.theme.preflightRoot ?? ["*,::before,::after", "::backdrop"])
          .map((a) => `${a}{${t}}`).join("");
      }
    },
  }],
  g7 = {
    position: ["relative", "absolute", "fixed", "sticky", "static"],
    globalKeyword: _8,
  },
  k10 = ee1((
    r = {},
  ) => (r.dark = r.dark ?? "class",
    r.attributifyPseudo = r.attributifyPseudo ?? !1,
    r.preflight = r.preflight ?? !0,
    r.variablePrefix = r.variablePrefix ?? "un-",
    {
      name: "@unocss/preset-mini",
      theme: R6,
      rules: Ct,
      variants: wt1(r),
      options: r,
      prefix: r.prefix,
      postprocess: h4(r.variablePrefix),
      preflights: r.preflight ? b8(p3, r.variablePrefix) : [],
      extractorDefault: r.arbitraryVariants === !1 ? void 0 : f1,
      autocomplete: { shorthands: g7 },
    })
  );
function h4(r) {
  if (r !== "un-") {
    return (t) => {
      t.entries.forEach((e) => {
        e[0] = e[0].replace(/^--un-/, `--${r}`),
          typeof e[1] == "string" &&
          (e[1] = e[1].replace(/var\(--un-/g, `var(--${r}`));
      });
    };
  }
}
function b8(r, t) {
  return t !== "un-"
    ? r.map((e) => ({
      ...e,
      getCSS: async (a) => {
        let i = await e.getCSS(a);
        if (i) return i.replace(/--un-/g, `--${t}`);
      },
    }))
    : r;
}
var Z6 = [
  [/^(?:animate-)?keyframes-(.+)$/, ([, t], { theme: r }) => {
    let a = r.animation?.keyframes?.[t];
    if (a) return [`@keyframes ${t}${a}`, { animation: t }];
  }, {
    autocomplete: [
      "animate-keyframes-$animation.keyframes",
      "keyframes-$animation.keyframes",
    ],
  }],
  [/^animate-(.+)$/, ([, t], { theme: r }) => {
    let a = r.animation?.keyframes?.[t];
    if (a) {
      let n = r.animation?.durations?.[t] ?? "1s",
        c = r.animation?.timingFns?.[t] ?? "linear",
        i = r.animation?.counts?.[t] ?? 1,
        d = r.animation?.properties?.[t];
      return [`@keyframes ${t}${a}`, {
        animation: `${t} ${n} ${c} ${i}`,
        ...d,
      }];
    }
    return { animation: m5.bracket.cssvar(t) };
  }, { autocomplete: "animate-$animation.keyframes" }],
  [
    /^animate-name-(.+)/,
    ([, t]) => ({ "animation-name": m5.bracket.cssvar(t) ?? t }),
  ],
  [
    /^animate-duration-(.+)$/,
    ([, t], { theme: r }) => ({
      "animation-duration": r.duration?.[t || "DEFAULT"] ??
        m5.bracket.cssvar.time(t),
    }),
    { autocomplete: ["animate-duration", "animate-duration-$duration"] },
  ],
  [
    /^animate-delay-(.+)$/,
    ([, t], { theme: r }) => ({
      "animation-delay": r.duration?.[t || "DEFAULT"] ??
        m5.bracket.cssvar.time(t),
    }),
    { autocomplete: ["animate-delay", "animate-delay-$duration"] },
  ],
  [
    /^animate-ease(?:-(.+))?$/,
    ([, t], { theme: r }) => ({
      "animation-timing-function": r.easing?.[t || "DEFAULT"] ??
        m5.bracket.cssvar(t),
    }),
    { autocomplete: ["animate-ease", "animate-ease-$easing"] },
  ],
  [
    /^animate-(fill-mode-|fill-|mode-)?(.+)$/,
    ([, t, r]) =>
      ["none", "forwards", "backwards", "both", t ? _8 : []].includes(r)
        ? { "animation-fill-mode": r }
        : void 0,
    {
      autocomplete: [
        "animate-(fill|mode|fill-mode)",
        "animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
        "animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
      ],
    },
  ],
  [
    /^animate-(direction-)?(.+)$/,
    ([, t, r]) =>
      ["normal", "reverse", "alternate", "alternate-reverse", t ? _8 : []]
          .includes(r)
        ? { "animation-direction": r }
        : void 0,
    {
      autocomplete: [
        "animate-direction",
        "animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
        "animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
      ],
    },
  ],
  [
    /^animate-(?:iteration-count-|iteration-|count-)(.+)$/,
    ([, t]) => ({
      "animation-iteration-count": m5.bracket.cssvar(t) ??
        t.replace(/\-/g, ","),
    }),
    {
      autocomplete: [
        "animate-(iteration|count|iteration-count)",
        "animate-(iteration|count|iteration-count)-<num>",
      ],
    },
  ],
  [
    /^animate-(play-state-|play-|state-)?(.+)$/,
    ([, t, r]) =>
      ["paused", "running", t ? _8 : []].includes(r)
        ? { "animation-play-state": r }
        : void 0,
    {
      autocomplete: [
        "animate-(play|state|play-state)",
        "animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)",
        "animate-(paused|running|inherit|initial|revert|revert-layer|unset)",
      ],
    },
  ],
  ["animate-none", { animation: "none" }],
  ...gt1("animate", "animation"),
];
function T7(t) {
  return t ? k7(t, 0) : "rgb(255 255 255 / 0)";
}
function tt4(t, r, a, n) {
  return r
    ? n != null ? k7(r, n) : k7(r, `var(--un-${t}-opacity, ${L4(r)})`)
    : k7(a, n);
}
function S10() {
  return ([, t, r], { theme: a }) => {
    let n = S6(r, a, "backgroundColor");
    if (!n) return;
    let { alpha: c, color: i, cssColor: d } = n;
    if (!i) return;
    let p = tt4(t, d, i, c);
    switch (t) {
      case "from":
        return {
          "--un-gradient-from-position": "0%",
          "--un-gradient-from": `${p} var(--un-gradient-from-position)`,
          "--un-gradient-to-position": "100%",
          "--un-gradient-to": `${T7(d)} var(--un-gradient-to-position)`,
          "--un-gradient-stops":
            "var(--un-gradient-from), var(--un-gradient-to)",
        };
      case "via":
        return {
          "--un-gradient-via-position": "50%",
          "--un-gradient-to": T7(d),
          "--un-gradient-stops":
            `var(--un-gradient-from), ${p} var(--un-gradient-via-position), var(--un-gradient-to)`,
        };
      case "to":
        return {
          "--un-gradient-to-position": "100%",
          "--un-gradient-to": `${p} var(--un-gradient-to-position)`,
        };
    }
  };
}
function et5() {
  return ([, t, r]) => ({
    [`--un-gradient-${t}-position`]: `${
      Number(m5.bracket.cssvar.percent(r)) * 100
    }%`,
  });
}
var rt5 = [
    [/^bg-gradient-(.+)$/, ([, t]) => ({ "--un-gradient": m5.bracket(t) }), {
      autocomplete: [
        "bg-gradient",
        "bg-gradient-(from|to|via)",
        "bg-gradient-(from|to|via)-$colors",
        "bg-gradient-(from|to|via)-(op|opacity)",
        "bg-gradient-(from|to|via)-(op|opacity)-<percent>",
      ],
    }],
    [
      /^(?:bg-gradient-)?stops-(\[.+\])$/,
      ([, t]) => ({ "--un-gradient-stops": m5.bracket(t) }),
    ],
    [/^(?:bg-gradient-)?(from)-(.+)$/, S10()],
    [/^(?:bg-gradient-)?(via)-(.+)$/, S10()],
    [/^(?:bg-gradient-)?(to)-(.+)$/, S10()],
    [
      /^(?:bg-gradient-)?(from|via|to)-op(?:acity)?-?(.+)$/,
      ([, t, r]) => ({ [`--un-${t}-opacity`]: m5.bracket.percent(r) }),
    ],
    [/^(from|via|to)-([\d\.]+)%$/, et5()],
    [
      /^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/,
      ([, t]) => ({
        "background-image":
          `${t}-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))`,
      }),
      {
        autocomplete: [
          "bg-gradient-repeating",
          "bg-gradient-(linear|radial|conic)",
          "bg-gradient-repeating-(linear|radial|conic)",
        ],
      },
    ],
    [/^bg-gradient-to-([rltb]{1,2})$/, ([, t]) => {
      if (t in lt) {
        return {
          "--un-gradient-shape": `to ${lt[t]}`,
          "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)",
          "background-image": "linear-gradient(var(--un-gradient))",
        };
      }
    }, {
      autocomplete: `bg-gradient-to-(${
        Object.keys(lt).filter((t) =>
          t.length <= 2 && Array.from(t).every((r) => "rltb".includes(r))
        ).join("|")
      })`,
    }],
    [/^(?:bg-gradient-)?shape-(.+)$/, ([, t]) => {
      let r = t in lt ? `to ${lt[t]}` : m5.bracket(t);
      if (r != null) {
        return {
          "--un-gradient-shape": r,
          "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)",
        };
      }
    }, {
      autocomplete: [
        "bg-gradient-shape",
        `bg-gradient-shape-(${Object.keys(lt).join("|")})`,
        `shape-(${Object.keys(lt).join("|")})`,
      ],
    }],
    ["bg-none", { "background-image": "none" }],
    ["box-decoration-slice", { "box-decoration-break": "slice" }],
    ["box-decoration-clone", { "box-decoration-break": "clone" }],
    ...gt1("box-decoration", "box-decoration-break"),
    ["bg-auto", { "background-size": "auto" }],
    ["bg-cover", { "background-size": "cover" }],
    ["bg-contain", { "background-size": "contain" }],
    ["bg-fixed", { "background-attachment": "fixed" }],
    ["bg-local", { "background-attachment": "local" }],
    ["bg-scroll", { "background-attachment": "scroll" }],
    ["bg-clip-border", {
      "-webkit-background-clip": "border-box",
      "background-clip": "border-box",
    }],
    ["bg-clip-content", {
      "-webkit-background-clip": "content-box",
      "background-clip": "content-box",
    }],
    ["bg-clip-padding", {
      "-webkit-background-clip": "padding-box",
      "background-clip": "padding-box",
    }],
    ["bg-clip-text", {
      "-webkit-background-clip": "text",
      "background-clip": "text",
    }],
    ..._8.map(
      (t) => [`bg-clip-${t}`, {
        "-webkit-background-clip": t,
        "background-clip": t,
      }],
    ),
    [/^bg-([-\w]{3,})$/, ([, t]) => ({ "background-position": lt[t] })],
    ["bg-repeat", { "background-repeat": "repeat" }],
    ["bg-no-repeat", { "background-repeat": "no-repeat" }],
    ["bg-repeat-x", { "background-repeat": "repeat-x" }],
    ["bg-repeat-y", { "background-repeat": "repeat-y" }],
    ["bg-repeat-round", { "background-repeat": "round" }],
    ["bg-repeat-space", { "background-repeat": "space" }],
    ...gt1("bg-repeat", "background-repeat"),
    ["bg-origin-border", { "background-origin": "border-box" }],
    ["bg-origin-padding", { "background-origin": "padding-box" }],
    ["bg-origin-content", { "background-origin": "content-box" }],
    ...gt1("bg-origin", "background-origin"),
  ],
  X7 = {
    disc: "disc",
    circle: "circle",
    square: "square",
    decimal: "decimal",
    "zero-decimal": "decimal-leading-zero",
    greek: "lower-greek",
    roman: "lower-roman",
    "upper-roman": "upper-roman",
    alpha: "lower-alpha",
    "upper-alpha": "upper-alpha",
    latin: "lower-latin",
    "upper-latin": "upper-latin",
  },
  at5 = [
    [/^list-(.+?)(?:-(outside|inside))?$/, ([, t, r]) => {
      let a = X7[t];
      if (a) {
        return r
          ? { "list-style-position": r, "list-style-type": a }
          : { "list-style-type": a };
      }
    }, {
      autocomplete: [
        `list-(${Object.keys(X7).join("|")})`,
        `list-(${Object.keys(X7).join("|")})-(outside|inside)`,
      ],
    }],
    ["list-outside", { "list-style-position": "outside" }],
    ["list-inside", { "list-style-position": "inside" }],
    ["list-none", { "list-style-type": "none" }],
    [/^list-image-(.+)$/, ([, t]) => {
      if (/^\[url\(.+\)\]$/.test(t)) {
        return { "list-style-image": m5.bracket(t) };
      }
    }],
    ["list-image-none", { "list-style-image": "none" }],
    ...gt1("list", "list-style-type"),
  ],
  ot5 = [[/^accent-(.+)$/, pt("accent-color", "accent", "accentColor"), {
    autocomplete: "accent-$colors",
  }], [
    /^accent-op(?:acity)?-?(.+)$/,
    ([, t]) => ({ "--un-accent-opacity": m5.bracket.percent(t) }),
    { autocomplete: ["accent-(op|opacity)", "accent-(op|opacity)-<percent>"] },
  ]],
  nt4 = [[/^caret-(.+)$/, pt("caret-color", "caret", "textColor"), {
    autocomplete: "caret-$colors",
  }], [
    /^caret-op(?:acity)?-?(.+)$/,
    ([, t]) => ({ "--un-caret-opacity": m5.bracket.percent(t) }),
    { autocomplete: ["caret-(op|opacity)", "caret-(op|opacity)-<percent>"] },
  ]],
  it4 = [["image-render-auto", { "image-rendering": "auto" }], [
    "image-render-edge",
    { "image-rendering": "crisp-edges" },
  ], ["image-render-pixel", [
    ["-ms-interpolation-mode", "nearest-neighbor"],
    ["image-rendering", "-webkit-optimize-contrast"],
    ["image-rendering", "-moz-crisp-edges"],
    ["image-rendering", "-o-pixelated"],
    ["image-rendering", "pixelated"],
  ]]],
  st5 = [
    ["overscroll-auto", { "overscroll-behavior": "auto" }],
    ["overscroll-contain", { "overscroll-behavior": "contain" }],
    ["overscroll-none", { "overscroll-behavior": "none" }],
    ...gt1("overscroll", "overscroll-behavior"),
    ["overscroll-x-auto", { "overscroll-behavior-x": "auto" }],
    ["overscroll-x-contain", { "overscroll-behavior-x": "contain" }],
    ["overscroll-x-none", { "overscroll-behavior-x": "none" }],
    ...gt1("overscroll-x", "overscroll-behavior-x"),
    ["overscroll-y-auto", { "overscroll-behavior-y": "auto" }],
    ["overscroll-y-contain", { "overscroll-behavior-y": "contain" }],
    ["overscroll-y-none", { "overscroll-behavior-y": "none" }],
    ...gt1("overscroll-y", "overscroll-behavior-y"),
  ],
  ct4 = [["scroll-auto", { "scroll-behavior": "auto" }], ["scroll-smooth", {
    "scroll-behavior": "smooth",
  }], ...gt1("scroll", "scroll-behavior")],
  lt3 = [
    [
      /^columns-(.+)$/,
      ([, t]) => ({ columns: m5.bracket.global.number.auto.numberWithUnit(t) }),
      { autocomplete: "columns-<num>" },
    ],
    ["break-before-auto", { "break-before": "auto" }],
    ["break-before-avoid", { "break-before": "avoid" }],
    ["break-before-all", { "break-before": "all" }],
    ["break-before-avoid-page", { "break-before": "avoid-page" }],
    ["break-before-page", { "break-before": "page" }],
    ["break-before-left", { "break-before": "left" }],
    ["break-before-right", { "break-before": "right" }],
    ["break-before-column", { "break-before": "column" }],
    ...gt1("break-before"),
    ["break-inside-auto", { "break-inside": "auto" }],
    ["break-inside-avoid", { "break-inside": "avoid" }],
    ["break-inside-avoid-page", { "break-inside": "avoid-page" }],
    ["break-inside-avoid-column", { "break-inside": "avoid-column" }],
    ...gt1("break-inside"),
    ["break-after-auto", { "break-after": "auto" }],
    ["break-after-avoid", { "break-after": "avoid" }],
    ["break-after-all", { "break-after": "all" }],
    ["break-after-avoid-page", { "break-after": "avoid-page" }],
    ["break-after-page", { "break-after": "page" }],
    ["break-after-left", { "break-after": "left" }],
    ["break-after-right", { "break-after": "right" }],
    ["break-after-column", { "break-after": "column" }],
    ...gt1("break-after"),
  ],
  dt4 = /@media \(min-width: (.+)\)/,
  pt3 = [[/^__container$/, (t, r) => {
    let { theme: a, variantHandlers: n } = r, c = a.container?.padding, i;
    v(c) ? i = c : i = c?.DEFAULT;
    let d = a.container?.maxWidth, p;
    for (let W of n) {
      let B = W.handle?.({}, (v) => v)?.parent;
      if (v(B)) {
        let v1 = B.match(dt4)?.[1];
        if (v1) {
          let x = (rt2(r) ?? []).find((D) => D.size === v1)?.point;
          d ? x && (p = d?.[x]) : p = v1, x && !v(c) && (i = c?.[x] ?? i);
        }
      }
    }
    let h = { "max-width": p };
    return n.length || (h.width = "100%"),
      a.container?.center &&
      (h["margin-left"] = "auto", h["margin-right"] = "auto"),
      c && (h["padding-left"] = i, h["padding-right"] = i),
      h;
  }, { internal: !0 }]],
  mt4 = [[/^(?:(\w+)[:-])?container$/, ([, t], r) => {
    let a = (rt2(r) ?? []).map((c) => c.point);
    if (t) {
      if (!a.includes(t)) return;
      a = a.slice(a.indexOf(t));
    }
    let n = a.map((c) => `${c}:__container`);
    return t || n.unshift("__container"), n;
  }]],
  ft3 = {
    "--un-blur": m6,
    "--un-brightness": m6,
    "--un-contrast": m6,
    "--un-drop-shadow": m6,
    "--un-grayscale": m6,
    "--un-hue-rotate": m6,
    "--un-invert": m6,
    "--un-saturate": m6,
    "--un-sepia": m6,
  },
  _10 =
    "var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)",
  ut4 = {
    "--un-backdrop-blur": m6,
    "--un-backdrop-brightness": m6,
    "--un-backdrop-contrast": m6,
    "--un-backdrop-grayscale": m6,
    "--un-backdrop-hue-rotate": m6,
    "--un-backdrop-invert": m6,
    "--un-backdrop-opacity": m6,
    "--un-backdrop-saturate": m6,
    "--un-backdrop-sepia": m6,
  },
  z7 =
    "var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)";
function Y6(t) {
  let r = m5.bracket.cssvar(t || "");
  if (
    r != null ||
    (r = t ? m5.percent(t) : "1", r != null && Number.parseFloat(r) <= 1)
  ) return r;
}
function u5(t, r) {
  return ([, a, n], { theme: c }) => {
    let i = r(n, c) ?? (n === "none" ? "0" : "");
    if (i !== "") {
      return a
        ? {
          [`--un-${a}${t}`]: `${t}(${i})`,
          "-webkit-backdrop-filter": z7,
          "backdrop-filter": z7,
        }
        : { [`--un-${t}`]: `${t}(${i})`, filter: _10 };
    }
  };
}
function bt4([, t], { theme: r }) {
  let a = r.dropShadow?.[t || "DEFAULT"];
  if (a != null) {
    return {
      "--un-drop-shadow": `drop-shadow(${
        bt1(a, "--un-drop-shadow-color").join(") drop-shadow(")
      })`,
      filter: _10,
    };
  }
  if (a = m5.bracket.cssvar(t), a != null) {
    return { "--un-drop-shadow": `drop-shadow(${a})`, filter: _10 };
  }
}
var gt4 = [
    [
      /^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/,
      u5("blur", (t, r) => r.blur?.[t || "DEFAULT"] || m5.bracket.cssvar.px(t)),
      {
        autocomplete: [
          "(backdrop|filter)-blur-$blur",
          "blur-$blur",
          "filter-blur",
        ],
      },
    ],
    [
      /^(?:(backdrop-)|filter-)?brightness-(.+)$/,
      u5("brightness", (t) => m5.bracket.cssvar.percent(t)),
      {
        autocomplete: [
          "(backdrop|filter)-brightness-<percent>",
          "brightness-<percent>",
        ],
      },
    ],
    [
      /^(?:(backdrop-)|filter-)?contrast-(.+)$/,
      u5("contrast", (t) => m5.bracket.cssvar.percent(t)),
      {
        autocomplete: [
          "(backdrop|filter)-contrast-<percent>",
          "contrast-<percent>",
        ],
      },
    ],
    [/^(?:filter-)?drop-shadow(?:-(.+))?$/, bt4, {
      autocomplete: [
        "filter-drop",
        "filter-drop-shadow",
        "filter-drop-shadow-color",
        "drop-shadow",
        "drop-shadow-color",
        "filter-drop-shadow-$dropShadow",
        "drop-shadow-$dropShadow",
        "filter-drop-shadow-color-$colors",
        "drop-shadow-color-$colors",
        "filter-drop-shadow-color-(op|opacity)",
        "drop-shadow-color-(op|opacity)",
        "filter-drop-shadow-color-(op|opacity)-<percent>",
        "drop-shadow-color-(op|opacity)-<percent>",
      ],
    }],
    [
      /^(?:filter-)?drop-shadow-color-(.+)$/,
      pt("--un-drop-shadow-color", "drop-shadow", "shadowColor"),
    ],
    [
      /^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/,
      ([, t]) => ({ "--un-drop-shadow-opacity": m5.bracket.percent(t) }),
    ],
    [/^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/, u5("grayscale", Y6), {
      autocomplete: [
        "(backdrop|filter)-grayscale",
        "(backdrop|filter)-grayscale-<percent>",
        "grayscale-<percent>",
      ],
    }],
    [
      /^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/,
      u5("hue-rotate", (t) => m5.bracket.cssvar.degree(t)),
    ],
    [/^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/, u5("invert", Y6), {
      autocomplete: [
        "(backdrop|filter)-invert",
        "(backdrop|filter)-invert-<percent>",
        "invert-<percent>",
      ],
    }],
    [
      /^(backdrop-)op(?:acity)-(.+)$/,
      u5("opacity", (t) => m5.bracket.cssvar.percent(t)),
      {
        autocomplete: [
          "backdrop-(op|opacity)",
          "backdrop-(op|opacity)-<percent>",
        ],
      },
    ],
    [
      /^(?:(backdrop-)|filter-)?saturate-(.+)$/,
      u5("saturate", (t) => m5.bracket.cssvar.percent(t)),
      {
        autocomplete: [
          "(backdrop|filter)-saturate",
          "(backdrop|filter)-saturate-<percent>",
          "saturate-<percent>",
        ],
      },
    ],
    [/^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/, u5("sepia", Y6), {
      autocomplete: [
        "(backdrop|filter)-sepia",
        "(backdrop|filter)-sepia-<percent>",
        "sepia-<percent>",
      ],
    }],
    ["filter", { filter: _10 }],
    ["backdrop-filter", {
      "-webkit-backdrop-filter": z7,
      "backdrop-filter": z7,
    }],
    ["filter-none", { filter: "none" }],
    ["backdrop-filter-none", {
      "-webkit-backdrop-filter": "none",
      "backdrop-filter": "none",
    }],
    ..._8.map((t) => [`filter-${t}`, { filter: t }]),
    ..._8.map(
      (t) => [`backdrop-filter-${t}`, {
        "-webkit-backdrop-filter": t,
        "backdrop-filter": t,
      }],
    ),
  ],
  yt3 = [
    [/^space-([xy])-(-?.+)$/, C10, {
      autocomplete: [
        "space-(x|y|block|inline)",
        "space-(x|y|block|inline)-reverse",
        "space-(x|y|block|inline)-$spacing",
      ],
    }],
    [/^space-([xy])-reverse$/, ([, t]) => ({ [`--un-space-${t}-reverse`]: 1 })],
    [/^space-(block|inline)-(-?.+)$/, C10],
    [
      /^space-(block|inline)-reverse$/,
      ([, t]) => ({ [`--un-space-${t}-reverse`]: 1 }),
    ],
  ];
function C10([, t, r], { theme: a }) {
  let n = a.spacing?.[r || "DEFAULT"] ??
    m5.bracket.cssvar.auto.fraction.rem(r || "1");
  if (n != null) {
    n === "0" && (n = "0px");
    let c = C8[t].map((i) => {
      let d = `margin${i}`,
        p = i.endsWith("right") || i.endsWith("bottom")
          ? `calc(${n} * var(--un-space-${t}-reverse))`
          : `calc(${n} * calc(1 - var(--un-space-${t}-reverse)))`;
      return [d, p];
    });
    if (c) return [[`--un-space-${t}-reverse`, 0], ...c];
  }
}
var ht3 = [
    ["uppercase", { "text-transform": "uppercase" }],
    ["lowercase", { "text-transform": "lowercase" }],
    ["capitalize", { "text-transform": "capitalize" }],
    ["normal-case", { "text-transform": "none" }],
  ],
  vt3 = [
    ...["manual", "auto", "none", ..._8].map(
      (t) => [`hyphens-${t}`, {
        "-webkit-hyphens": t,
        "-ms-hyphens": t,
        hyphens: t,
      }],
    ),
  ],
  kt2 = [
    ["write-vertical-right", { "writing-mode": "vertical-rl" }],
    ["write-vertical-left", { "writing-mode": "vertical-lr" }],
    ["write-normal", { "writing-mode": "horizontal-tb" }],
    ...gt1("write", "writing-mode"),
  ],
  xt1 = [
    ["write-orient-mixed", { "text-orientation": "mixed" }],
    ["write-orient-sideways", { "text-orientation": "sideways" }],
    ["write-orient-upright", { "text-orientation": "upright" }],
    ...gt1("write-orient", "text-orientation"),
  ],
  $t4 = [["sr-only", {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    "white-space": "nowrap",
    "border-width": 0,
  }], ["not-sr-only", {
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    clip: "auto",
    "white-space": "normal",
  }]],
  wt2 = [["isolate", { isolation: "isolate" }], ["isolate-auto", {
    isolation: "auto",
  }], ["isolation-auto", { isolation: "auto" }]],
  _t = [
    ["object-cover", { "object-fit": "cover" }],
    ["object-contain", { "object-fit": "contain" }],
    ["object-fill", { "object-fit": "fill" }],
    ["object-scale-down", { "object-fit": "scale-down" }],
    ["object-none", { "object-fit": "none" }],
    [/^object-(.+)$/, ([, t]) => {
      if (lt[t]) return { "object-position": lt[t] };
      if (m5.bracketOfPosition(t) != null) {
        return {
          "object-position": m5.bracketOfPosition(t).split(" ").map((r) =>
            m5.position.fraction.auto.px.cssvar(r) ?? r
          ).join(" "),
        };
      }
    }, { autocomplete: `object-(${Object.keys(lt).join("|")})` }],
  ],
  zt = [
    ["bg-blend-multiply", { "background-blend-mode": "multiply" }],
    ["bg-blend-screen", { "background-blend-mode": "screen" }],
    ["bg-blend-overlay", { "background-blend-mode": "overlay" }],
    ["bg-blend-darken", { "background-blend-mode": "darken" }],
    ["bg-blend-lighten", { "background-blend-mode": "lighten" }],
    ["bg-blend-color-dodge", { "background-blend-mode": "color-dodge" }],
    ["bg-blend-color-burn", { "background-blend-mode": "color-burn" }],
    ["bg-blend-hard-light", { "background-blend-mode": "hard-light" }],
    ["bg-blend-soft-light", { "background-blend-mode": "soft-light" }],
    ["bg-blend-difference", { "background-blend-mode": "difference" }],
    ["bg-blend-exclusion", { "background-blend-mode": "exclusion" }],
    ["bg-blend-hue", { "background-blend-mode": "hue" }],
    ["bg-blend-saturation", { "background-blend-mode": "saturation" }],
    ["bg-blend-color", { "background-blend-mode": "color" }],
    ["bg-blend-luminosity", { "background-blend-mode": "luminosity" }],
    ["bg-blend-normal", { "background-blend-mode": "normal" }],
    ...gt1("bg-blend", "background-blend"),
  ],
  jt = [
    ["mix-blend-multiply", { "mix-blend-mode": "multiply" }],
    ["mix-blend-screen", { "mix-blend-mode": "screen" }],
    ["mix-blend-overlay", { "mix-blend-mode": "overlay" }],
    ["mix-blend-darken", { "mix-blend-mode": "darken" }],
    ["mix-blend-lighten", { "mix-blend-mode": "lighten" }],
    ["mix-blend-color-dodge", { "mix-blend-mode": "color-dodge" }],
    ["mix-blend-color-burn", { "mix-blend-mode": "color-burn" }],
    ["mix-blend-hard-light", { "mix-blend-mode": "hard-light" }],
    ["mix-blend-soft-light", { "mix-blend-mode": "soft-light" }],
    ["mix-blend-difference", { "mix-blend-mode": "difference" }],
    ["mix-blend-exclusion", { "mix-blend-mode": "exclusion" }],
    ["mix-blend-hue", { "mix-blend-mode": "hue" }],
    ["mix-blend-saturation", { "mix-blend-mode": "saturation" }],
    ["mix-blend-color", { "mix-blend-mode": "color" }],
    ["mix-blend-luminosity", { "mix-blend-mode": "luminosity" }],
    ["mix-blend-plus-lighter", { "mix-blend-mode": "plus-lighter" }],
    ["mix-blend-normal", { "mix-blend-mode": "normal" }],
    ...gt1("mix-blend"),
  ],
  St2 = { "--un-border-spacing-x": 0, "--un-border-spacing-y": 0 },
  F10 = "var(--un-border-spacing-x) var(--un-border-spacing-y)",
  Xt = [
    ["inline-table", { display: "inline-table" }],
    ["table", { display: "table" }],
    ["table-caption", { display: "table-caption" }],
    ["table-cell", { display: "table-cell" }],
    ["table-column", { display: "table-column" }],
    ["table-column-group", { display: "table-column-group" }],
    ["table-footer-group", { display: "table-footer-group" }],
    ["table-header-group", { display: "table-header-group" }],
    ["table-row", { display: "table-row" }],
    ["table-row-group", { display: "table-row-group" }],
    ["border-collapse", { "border-collapse": "collapse" }],
    ["border-separate", { "border-collapse": "separate" }],
    [/^border-spacing-(.+)$/, ([, t], { theme: r }) => {
      let a = r.spacing?.[t] ?? m5.bracket.cssvar.global.auto.fraction.rem(t);
      if (a != null) {
        return {
          "--un-border-spacing-x": a,
          "--un-border-spacing-y": a,
          "border-spacing": F10,
        };
      }
    }, { autocomplete: ["border-spacing", "border-spacing-$spacing"] }],
    [/^border-spacing-([xy])-(.+)$/, ([, t, r], { theme: a }) => {
      let n = a.spacing?.[r] ?? m5.bracket.cssvar.global.auto.fraction.rem(r);
      if (n != null) {
        return { [`--un-border-spacing-${t}`]: n, "border-spacing": F10 };
      }
    }, {
      autocomplete: ["border-spacing-(x|y)", "border-spacing-(x|y)-$spacing"],
    }],
    ["caption-top", { "caption-side": "top" }],
    ["caption-bottom", { "caption-side": "bottom" }],
    ["table-auto", { "table-layout": "auto" }],
    ["table-fixed", { "table-layout": "fixed" }],
    ["table-empty-cells-visible", { "empty-cells": "show" }],
    ["table-empty-cells-hidden", { "empty-cells": "hide" }],
  ],
  Yt = {
    "bg-blend": "background-blend-mode",
    "bg-clip": "-webkit-background-clip",
    "bg-gradient": "linear-gradient",
    "bg-image": "background-image",
    "bg-origin": "background-origin",
    "bg-position": "background-position",
    "bg-repeat": "background-repeat",
    "bg-size": "background-size",
    "mix-blend": "mix-blend-mode",
    object: "object-fit",
    "object-position": "object-position",
    write: "writing-mode",
    "write-orient": "text-orientation",
  },
  At2 = [[/^(.+?)-(\$.+)$/, ([, t, r]) => {
    let a = Yt[t];
    if (a) return { [a]: m5.cssvar(r) };
  }]],
  Mt1 = [
    [/^divide-?([xy])$/, $7, {
      autocomplete: [
        "divide-(x|y|block|inline)",
        "divide-(x|y|block|inline)-reverse",
        "divide-(x|y|block|inline)-$lineWidth",
      ],
    }],
    [/^divide-?([xy])-?(-?.+)$/, $7],
    [
      /^divide-?([xy])-reverse$/,
      ([, t]) => ({ [`--un-divide-${t}-reverse`]: 1 }),
    ],
    [/^divide-(block|inline)$/, $7],
    [/^divide-(block|inline)-(-?.+)$/, $7],
    [
      /^divide-(block|inline)-reverse$/,
      ([, t]) => ({ [`--un-divide-${t}-reverse`]: 1 }),
    ],
    [/^divide-(.+)$/, pt("border-color", "divide", "borderColor"), {
      autocomplete: "divide-$colors",
    }],
    [
      /^divide-op(?:acity)?-?(.+)$/,
      ([, t]) => ({ "--un-divide-opacity": m5.bracket.percent(t) }),
      {
        autocomplete: ["divide-(op|opacity)", "divide-(op|opacity)-<percent>"],
      },
    ],
    ...k9.map((t) => [`divide-${t}`, { "border-style": t }]),
  ];
function $7([, t, r], { theme: a }) {
  let n = a.lineWidth?.[r || "DEFAULT"] ?? m5.bracket.cssvar.px(r || "1");
  if (n != null) {
    n === "0" && (n = "0px");
    let c = C8[t].map((i) => {
      let d = `border${i}-width`,
        p = i.endsWith("right") || i.endsWith("bottom")
          ? `calc(${n} * var(--un-divide-${t}-reverse))`
          : `calc(${n} * calc(1 - var(--un-divide-${t}-reverse)))`;
      return [d, p];
    });
    if (c) return [[`--un-divide-${t}-reverse`, 0], ...c];
  }
}
var Bt = [
    [
      /^line-clamp-(\d+)$/,
      ([, t]) => ({
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": t,
        "line-clamp": t,
      }),
      { autocomplete: ["line-clamp", "line-clamp-<num>"] },
    ],
    ...["none", ..._8].map(
      (t) => [`line-clamp-${t}`, {
        overflow: "visible",
        display: "block",
        "-webkit-box-orient": "horizontal",
        "-webkit-line-clamp": t,
        "line-clamp": t,
      }],
    ),
  ],
  Tt = {
    "--un-ordinal": m6,
    "--un-slashed-zero": m6,
    "--un-numeric-figure": m6,
    "--un-numeric-spacing": m6,
    "--un-numeric-fraction": m6,
  };
function b9(t) {
  return {
    ...t,
    "font-variant-numeric":
      "var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)",
  };
}
var Ct1 = [[/^ordinal$/, () => b9({ "--un-ordinal": "ordinal" }), {
    autocomplete: "ordinal",
  }], [/^slashed-zero$/, () => b9({ "--un-slashed-zero": "slashed-zero" }), {
    autocomplete: "slashed-zero",
  }], [/^lining-nums$/, () => b9({ "--un-numeric-figure": "lining-nums" }), {
    autocomplete: "lining-nums",
  }], [
    /^oldstyle-nums$/,
    () => b9({ "--un-numeric-figure": "oldstyle-nums" }),
    { autocomplete: "oldstyle-nums" },
  ], [
    /^proportional-nums$/,
    () => b9({ "--un-numeric-spacing": "proportional-nums" }),
    { autocomplete: "proportional-nums" },
  ], [/^tabular-nums$/, () => b9({ "--un-numeric-spacing": "tabular-nums" }), {
    autocomplete: "tabular-nums",
  }], [
    /^diagonal-fractions$/,
    () => b9({ "--un-numeric-fraction": "diagonal-fractions" }),
    { autocomplete: "diagonal-fractions" },
  ], [
    /^stacked-fractions$/,
    () => b9({ "--un-numeric-fraction": "stacked-fractions" }),
    { autocomplete: "stacked-fractions" },
  ], ["normal-nums", { "font-variant-numeric": "normal" }]],
  Ft1 = { "--un-pan-x": m6, "--un-pan-y": m6, "--un-pinch-zoom": m6 },
  A13 = "var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)",
  Ot = [
    [
      /^touch-pan-(x|left|right)$/,
      ([, t]) => ({ "--un-pan-x": `pan-${t}`, "touch-action": A13 }),
      { autocomplete: ["touch-pan", "touch-pan-(x|left|right|y|up|down)"] },
    ],
    [
      /^touch-pan-(y|up|down)$/,
      ([, t]) => ({ "--un-pan-y": `pan-${t}`, "touch-action": A13 }),
    ],
    ["touch-pinch-zoom", {
      "--un-pinch-zoom": "pinch-zoom",
      "touch-action": A13,
    }],
    ["touch-auto", { "touch-action": "auto" }],
    ["touch-manipulation", { "touch-action": "manipulation" }],
    ["touch-none", { "touch-action": "none" }],
    ...gt1("touch", "touch-action"),
  ],
  Pt3 = { "--un-scroll-snap-strictness": "proximity" },
  Wt1 = [
    [
      /^snap-(x|y)$/,
      ([, t]) => ({
        "scroll-snap-type": `${t} var(--un-scroll-snap-strictness)`,
      }),
      { autocomplete: "snap-(x|y|both)" },
    ],
    [
      /^snap-both$/,
      () => ({ "scroll-snap-type": "both var(--un-scroll-snap-strictness)" }),
    ],
    ["snap-mandatory", { "--un-scroll-snap-strictness": "mandatory" }],
    ["snap-proximity", { "--un-scroll-snap-strictness": "proximity" }],
    ["snap-none", { "scroll-snap-type": "none" }],
    ["snap-start", { "scroll-snap-align": "start" }],
    ["snap-end", { "scroll-snap-align": "end" }],
    ["snap-center", { "scroll-snap-align": "center" }],
    ["snap-align-none", { "scroll-snap-align": "none" }],
    ["snap-normal", { "scroll-snap-stop": "normal" }],
    ["snap-always", { "scroll-snap-stop": "always" }],
    [/^scroll-ma?()-?(-?.+)$/, ft("scroll-margin"), {
      autocomplete: [
        "scroll-(m|p|ma|pa|block|inline)",
        "scroll-(m|p|ma|pa|block|inline)-$spacing",
        "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)",
        "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing",
      ],
    }],
    [/^scroll-m-?([xy])-?(-?.+)$/, ft("scroll-margin")],
    [/^scroll-m-?([rltb])-?(-?.+)$/, ft("scroll-margin")],
    [/^scroll-m-(block|inline)-(-?.+)$/, ft("scroll-margin")],
    [/^scroll-m-?([bi][se])-?(-?.+)$/, ft("scroll-margin")],
    [/^scroll-pa?()-?(-?.+)$/, ft("scroll-padding")],
    [/^scroll-p-?([xy])-?(-?.+)$/, ft("scroll-padding")],
    [/^scroll-p-?([rltb])-?(-?.+)$/, ft("scroll-padding")],
    [/^scroll-p-(block|inline)-(-?.+)$/, ft("scroll-padding")],
    [/^scroll-p-?([bi][se])-?(-?.+)$/, ft("scroll-padding")],
  ],
  Dt = [[/^\$ placeholder-(.+)$/, pt("color", "placeholder", "accentColor"), {
    autocomplete: "placeholder-$colors",
  }], [
    /^\$ placeholder-op(?:acity)?-?(.+)$/,
    ([, t]) => ({ "--un-placeholder-opacity": m5.bracket.percent(t) }),
    {
      autocomplete: [
        "placeholder-(op|opacity)",
        "placeholder-(op|opacity)-<percent>",
      ],
    },
  ]],
  Et = [[
    /^view-transition-([\w_-]+)$/,
    ([, t]) => ({ "view-transition-name": t }),
  ]],
  Ut = [
    gt2,
    At2,
    ht1,
    pt3,
    Y4,
    $t4,
    Z4,
    q4,
    tt2,
    it2,
    Bt,
    wt2,
    at3,
    ot3,
    Ze,
    st3,
    bt2,
    lt1,
    C9,
    pt1,
    ut2,
    He,
    Xt,
    I6,
    Z6,
    X5,
    Ot,
    O7,
    E5,
    Wt1,
    at5,
    Ce,
    lt3,
    nt2,
    K9,
    G9,
    Xe,
    rt3,
    yt3,
    Mt1,
    et3,
    st5,
    ct4,
    R5,
    T4,
    F6,
    Ae,
    Fe,
    rt5,
    yt1,
    _t,
    ft1,
    ze,
    Ve,
    M6,
    ve,
    Me,
    U5,
    ht3,
    A9,
    Ct1,
    Re,
    D5,
    _e1,
    Ge,
    Ke,
    vt3,
    kt2,
    xt1,
    nt4,
    ot5,
    Oe,
    zt,
    jt,
    P7,
    je,
    L6,
    it4,
    gt4,
    qe,
    Te,
    V4,
    B7,
    Dt,
    De,
    Et,
    kt,
  ].flat(1),
  Lt1 = [...mt4],
  Rt2 = {
    ...R6,
    aria: {
      busy: 'busy="true"',
      checked: 'checked="true"',
      disabled: 'disabled="true"',
      expanded: 'expanded="true"',
      hidden: 'hidden="true"',
      pressed: 'pressed="true"',
      readonly: 'readonly="true"',
      required: 'required="true"',
      selected: 'selected="true"',
    },
    animation: {
      keyframes: {
        pulse: "{0%, 100% {opacity:1} 50% {opacity:.5}}",
        bounce:
          "{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",
        spin: "{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
        ping:
          "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
        "bounce-alt":
          "{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",
        flash: "{from,50%,to{opacity:1}25%,75%{opacity:0}}",
        "pulse-alt":
          "{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}",
        "rubber-band":
          "{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}",
        "shake-x":
          "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}",
        "shake-y":
          "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}",
        "head-shake":
          "{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",
        swing:
          "{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",
        tada:
          "{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",
        wobble:
          "{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",
        jello:
          "{from,11.1% to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}",
        "heart-beat":
          "{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",
        hinge:
          "{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}",
        "jack-in-the-box":
          "{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}",
        "light-speed-in-left":
          "{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
        "light-speed-in-right":
          "{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
        "light-speed-out-left":
          "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}",
        "light-speed-out-right":
          "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",
        flip:
          "{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}",
        "flip-in-x":
          "{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}",
        "flip-in-y":
          "{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}",
        "flip-out-x":
          "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}",
        "flip-out-y":
          "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}",
        "rotate-in":
          "{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}",
        "rotate-in-down-left":
          "{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}",
        "rotate-in-down-right":
          "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
        "rotate-in-up-left":
          "{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}",
        "rotate-in-up-right":
          "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
        "rotate-out":
          "{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}",
        "rotate-out-down-left":
          "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}",
        "rotate-out-down-right":
          "{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
        "rotate-out-up-left":
          "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
        "rotate-out-up-right":
          "{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}",
        "roll-in":
          "{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "roll-out":
          "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}",
        "zoom-in":
          "{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}",
        "zoom-in-down":
          "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
        "zoom-in-left":
          "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
        "zoom-in-right":
          "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
        "zoom-in-up":
          "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
        "zoom-out":
          "{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}",
        "zoom-out-down":
          "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
        "zoom-out-left":
          "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}",
        "zoom-out-right":
          "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}",
        "zoom-out-up":
          "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
        "bounce-in":
          "{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}",
        "bounce-in-down":
          "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}",
        "bounce-in-left":
          "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}",
        "bounce-in-right":
          "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}",
        "bounce-in-up":
          "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}",
        "bounce-out":
          "{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}",
        "bounce-out-down":
          "{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}",
        "bounce-out-left":
          "{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
        "bounce-out-right":
          "{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}",
        "bounce-out-up":
          "{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
        "slide-in-down":
          "{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
        "slide-in-left":
          "{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
        "slide-in-right":
          "{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
        "slide-in-up":
          "{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
        "slide-out-down":
          "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}",
        "slide-out-left":
          "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}",
        "slide-out-right":
          "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}",
        "slide-out-up":
          "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}",
        "fade-in": "{from{opacity:0}to{opacity:1}}",
        "fade-in-down":
          "{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-down-big":
          "{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-left":
          "{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-left-big":
          "{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-right":
          "{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-right-big":
          "{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-up":
          "{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-up-big":
          "{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-top-left":
          "{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-top-right":
          "{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-bottom-left":
          "{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-in-bottom-right":
          "{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
        "fade-out": "{from{opacity:1}to{opacity:0}}",
        "fade-out-down":
          "{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}",
        "fade-out-down-big":
          "{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}",
        "fade-out-left":
          "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}",
        "fade-out-left-big":
          "{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
        "fade-out-right":
          "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}",
        "fade-out-right-big":
          "{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}",
        "fade-out-up":
          "{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}",
        "fade-out-up-big":
          "{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
        "fade-out-top-left":
          "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}",
        "fade-out-top-right":
          "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}",
        "fade-out-bottom-left":
          "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}",
        "fade-out-bottom-right":
          "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}",
        "back-in-up":
          "{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
        "back-in-down":
          "{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
        "back-in-right":
          "{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
        "back-in-left":
          "{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
        "back-out-up":
          "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
        "back-out-down":
          "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}",
        "back-out-right":
          "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}",
        "back-out-left":
          "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
      },
      durations: {
        pulse: "2s",
        "heart-beat": "1.3s",
        "bounce-in": "0.75s",
        "bounce-out": "0.75s",
        "flip-out-x": "0.75s",
        "flip-out-y": "0.75s",
        hinge: "2s",
      },
      timingFns: {
        pulse: "cubic-bezier(0.4,0,.6,1)",
        ping: "cubic-bezier(0,0,.2,1)",
        "head-shake": "ease-in-out",
        "heart-beat": "ease-in-out",
        "pulse-alt": "ease-in-out",
        "light-speed-in-left": "ease-out",
        "light-speed-in-right": "ease-out",
        "light-speed-out-left": "ease-in",
        "light-speed-out-right": "ease-in",
      },
      properties: {
        "bounce-alt": { "transform-origin": "center bottom" },
        jello: { "transform-origin": "center" },
        swing: { "transform-origin": "top center" },
        flip: { "backface-visibility": "visible" },
        "flip-in-x": { "backface-visibility": "visible !important" },
        "flip-in-y": { "backface-visibility": "visible !important" },
        "flip-out-x": { "backface-visibility": "visible !important" },
        "flip-out-y": { "backface-visibility": "visible !important" },
        "rotate-in": { "transform-origin": "center" },
        "rotate-in-down-left": { "transform-origin": "left bottom" },
        "rotate-in-down-right": { "transform-origin": "right bottom" },
        "rotate-in-up-left": { "transform-origin": "left bottom" },
        "rotate-in-up-right": { "transform-origin": "right bottom" },
        "rotate-out": { "transform-origin": "center" },
        "rotate-out-down-left": { "transform-origin": "left bottom" },
        "rotate-out-down-right": { "transform-origin": "right bottom" },
        "rotate-out-up-left": { "transform-origin": "left bottom" },
        "rotate-out-up-right": { "transform-origin": "right bottom" },
        hinge: { "transform-origin": "top left" },
        "zoom-out-down": { "transform-origin": "center bottom" },
        "zoom-out-left": { "transform-origin": "left center" },
        "zoom-out-right": { "transform-origin": "right center" },
        "zoom-out-up": { "transform-origin": "center bottom" },
      },
      counts: {
        spin: "infinite",
        ping: "infinite",
        pulse: "infinite",
        "pulse-alt": "infinite",
        bounce: "infinite",
        "bounce-alt": "infinite",
      },
    },
    media: {
      portrait: "(orientation: portrait)",
      landscape: "(orientation: landscape)",
      os_dark: "(prefers-color-scheme: dark)",
      os_light: "(prefers-color-scheme: light)",
      motion_ok: "(prefers-reduced-motion: no-preference)",
      motion_not_ok: "(prefers-reduced-motion: reduce)",
      high_contrast: "(prefers-contrast: high)",
      low_contrast: "(prefers-contrast: low)",
      opacity_ok: "(prefers-reduced-transparency: no-preference)",
      opacity_not_ok: "(prefers-reduced-transparency: reduce)",
      use_data_ok: "(prefers-reduced-data: no-preference)",
      use_data_not_ok: "(prefers-reduced-data: reduce)",
      touch: "(hover: none) and (pointer: coarse)",
      stylus: "(hover: none) and (pointer: fine)",
      pointer: "(hover) and (pointer: coarse)",
      mouse: "(hover) and (pointer: fine)",
      hd_color: "(dynamic-range: high)",
    },
    supports: { grid: "(display: grid)" },
    preflightBase: {
      ...H8,
      ...Ft1,
      ...Pt3,
      ...Tt,
      ...St2,
      ...K8,
      ...G8,
      ...ft3,
      ...ut4,
    },
  },
  Vt = [G6("svg", (t) => ({ selector: `${t.selector} svg` }))],
  qt1 = [
    G6(".dark", (t) => ({ prefix: `.dark $$ ${t.prefix}` })),
    G6(".light", (t) => ({ prefix: `.light $$ ${t.prefix}` })),
    H6("@dark", "@media (prefers-color-scheme: dark)"),
    H6("@light", "@media (prefers-color-scheme: light)"),
  ],
  Gt = [
    H6("contrast-more", "@media (prefers-contrast: more)"),
    H6("contrast-less", "@media (prefers-contrast: less)"),
  ],
  Ht = [
    H6("motion-reduce", "@media (prefers-reduced-motion: reduce)"),
    H6("motion-safe", "@media (prefers-reduced-motion: no-preference)"),
  ],
  It = [
    H6("landscape", "@media (orientation: landscape)"),
    H6("portrait", "@media (orientation: portrait)"),
  ],
  Jt = (t) => {
    if (
      !t.startsWith("_") &&
      (/space-([xy])-(-?.+)$/.test(t) || /divide-/.test(t))
    ) {
      return {
        matcher: t,
        selector: (r) => {
          let a = ">:not([hidden])~:not([hidden])";
          return r.includes(a) ? r : `${r}${a}`;
        },
      };
    }
  },
  Kt1 = [
    G6(
      "@hover",
      (t) => ({
        parent: `${
          t.parent ? `${t.parent} $$ ` : ""
        }@media (hover: hover) and (pointer: fine)`,
        selector: `${t.selector || ""}:hover`,
      }),
    ),
  ],
  Nt = (t, { theme: r }) => {
    let a = t.match(/^(.*)\b(placeholder-)(.+)$/);
    if (a) {
      let [, n = "", c, i] = a;
      if (mt1(i, r, "accentColor") || Qt(i)) {
        return { matcher: `${n}placeholder-$ ${c}${i}` };
      }
    }
  };
function Qt(t) {
  let r = t.match(/^op(?:acity)?-?(.+)$/);
  return r && r[1] != null ? m5.bracket.percent(r[1]) != null : !1;
}
function Zt(t) {
  return [Nt, Jt, ...wt1(t), ...Gt, ...It, ...Ht, ...Vt, ...qt1, ...Kt1];
}
var ce = ee1((t = {}) => ({
  ...k10(t),
  name: "@unocss/preset-wind",
  theme: Rt2,
  rules: Ut,
  shortcuts: Lt1,
  variants: Zt(t),
}));
function a3(t, n, r) {
  return `calc(${n} + (${t} - ${n}) * ${r} / 100)`;
}
function u6(t, n, r) {
  let e = [t, n], s = [];
  for (let o = 0; o < 2; ++o) {
    let c = typeof e[o] == "string" ? j6(e[o]) : e[o];
    if (!c || !["rgb", "rgba"].includes(c.type)) return;
    s.push(c);
  }
  let i = [];
  for (let o = 0; o < 3; ++o) {
    i.push(a3(s[0].components[o], s[1].components[o], r));
  }
  return {
    type: "rgb",
    components: i,
    alpha: a3(s[0].alpha ?? 1, s[1].alpha ?? 1, r),
  };
}
function m9(t, n) {
  return u6("#fff", t, n);
}
function p4(t, n) {
  return u6("#000", t, n);
}
function x8(t, n) {
  let r = Number.parseFloat(`${n}`);
  if (!Number.isNaN(r)) return r > 0 ? p4(t, n) : m9(t, -r);
}
var g8 = { tint: m9, shade: p4, shift: x8 };
function C11() {
  let t;
  return {
    name: "mix",
    match(n, r) {
      t ||
        (t = new RegExp(
          `^mix-(tint|shade|shift)-(-?\\d{1,3})(?:${
            r.generator.config.separators.join("|")
          })`,
        ));
      let e = n.match(t);
      if (e) {
        return {
          matcher: n.slice(e[0].length),
          body: (s) => (s.forEach((i) => {
            if (i[1]) {
              let o = j6(`${i[1]}`);
              if (o) {
                let c = g8[e[1]](o, e[2]);
                c && (i[1] = k7(c));
              }
            }
          }),
            s),
        };
      }
    },
  };
}
var y8 = ee1((t = {}) => {
  let n = ce(t);
  return { ...n, name: "@unocss/preset-uno", variants: [...n.variants, C11()] };
});
const themeCSSVarKeys = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
];
const themes = [{
  name: "zinc",
  label: "Zinc",
  activeColor: { light: "240 5.9% 10%", dark: "240 5.2% 33.9%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "240 5.9% 10%",
      "primary-foreground": "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "240 5.9% 10%",
      radius: "0.5rem",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "240 10% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "0 0% 98%",
      "primary-foreground": "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "240 3.7% 15.9%",
      "muted-foreground": "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
    },
  },
}, {
  name: "slate",
  label: "Slate",
  activeColor: { light: "215.4 16.3% 46.9%", dark: "215.3 19.3% 34.5%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      popover: "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      primary: "222.2 47.4% 11.2%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "222.2 84% 4.9%",
      radius: "0.5rem",
    },
    dark: {
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      card: "222.2 84% 4.9%",
      "card-foreground": "210 40% 98%",
      popover: "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      primary: "210 40% 98%",
      "primary-foreground": "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "212.7 26.8% 83.9%",
    },
  },
}, {
  name: "stone",
  label: "Stone",
  activeColor: { light: "25 5.3% 44.7%", dark: "33.3 5.5% 32.4%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "20 14.3% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "20 14.3% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "20 14.3% 4.1%",
      primary: "24 9.8% 10%",
      "primary-foreground": "60 9.1% 97.8%",
      secondary: "60 4.8% 95.9%",
      "secondary-foreground": "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      "muted-foreground": "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      "accent-foreground": "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "20 14.3% 4.1%",
      radius: "0.95rem",
    },
    dark: {
      background: "20 14.3% 4.1%",
      foreground: "60 9.1% 97.8%",
      card: "20 14.3% 4.1%",
      "card-foreground": "60 9.1% 97.8%",
      popover: "20 14.3% 4.1%",
      "popover-foreground": "60 9.1% 97.8%",
      primary: "60 9.1% 97.8%",
      "primary-foreground": "24 9.8% 10%",
      secondary: "12 6.5% 15.1%",
      "secondary-foreground": "60 9.1% 97.8%",
      muted: "12 6.5% 15.1%",
      "muted-foreground": "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "24 5.7% 82.9%",
    },
  },
}, {
  name: "gray",
  label: "Gray",
  activeColor: { light: "220 8.9% 46.1%", dark: "215 13.8% 34.1%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "224 71.4% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "224 71.4% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "224 71.4% 4.1%",
      primary: "220.9 39.3% 11%",
      "primary-foreground": "210 20% 98%",
      secondary: "220 14.3% 95.9%",
      "secondary-foreground": "220.9 39.3% 11%",
      muted: "220 14.3% 95.9%",
      "muted-foreground": "220 8.9% 46.1%",
      accent: "220 14.3% 95.9%",
      "accent-foreground": "220.9 39.3% 11%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 20% 98%",
      border: "220 13% 91%",
      input: "220 13% 91%",
      ring: "224 71.4% 4.1%",
      radius: "0.35rem",
    },
    dark: {
      background: "224 71.4% 4.1%",
      foreground: "210 20% 98%",
      card: "224 71.4% 4.1%",
      "card-foreground": "210 20% 98%",
      popover: "224 71.4% 4.1%",
      "popover-foreground": "210 20% 98%",
      primary: "210 20% 98%",
      "primary-foreground": "220.9 39.3% 11%",
      secondary: "215 27.9% 16.9%",
      "secondary-foreground": "210 20% 98%",
      muted: "215 27.9% 16.9%",
      "muted-foreground": "217.9 10.6% 64.9%",
      accent: "215 27.9% 16.9%",
      "accent-foreground": "210 20% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 20% 98%",
      border: "215 27.9% 16.9%",
      input: "215 27.9% 16.9%",
      ring: "216 12.2% 83.9%",
    },
  },
}, {
  name: "neutral",
  label: "Neutral",
  activeColor: { light: "0 0% 45.1%", dark: "0 0% 32.2%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "0 0% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "0 0% 3.9%",
      primary: "0 0% 9%",
      "primary-foreground": "0 0% 98%",
      secondary: "0 0% 96.1%",
      "secondary-foreground": "0 0% 9%",
      muted: "0 0% 96.1%",
      "muted-foreground": "0 0% 45.1%",
      accent: "0 0% 96.1%",
      "accent-foreground": "0 0% 9%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 89.8%",
      input: "0 0% 89.8%",
      ring: "0 0% 3.9%",
    },
    dark: {
      background: "0 0% 3.9%",
      foreground: "0 0% 98%",
      card: "0 0% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "0 0% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "0 0% 98%",
      "primary-foreground": "0 0% 9%",
      secondary: "0 0% 14.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "0 0% 14.9%",
      "muted-foreground": "0 0% 63.9%",
      accent: "0 0% 14.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 14.9%",
      input: "0 0% 14.9%",
      ring: "0 0% 83.1%",
    },
  },
}, {
  name: "red",
  label: "Red",
  activeColor: { light: "0 72.2% 50.6%", dark: "0 72.2% 50.6%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "0 0% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "0 0% 3.9%",
      primary: "0 72.2% 50.6%",
      "primary-foreground": "0 85.7% 97.3%",
      secondary: "0 0% 96.1%",
      "secondary-foreground": "0 0% 9%",
      muted: "0 0% 96.1%",
      "muted-foreground": "0 0% 45.1%",
      accent: "0 0% 96.1%",
      "accent-foreground": "0 0% 9%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 89.8%",
      input: "0 0% 89.8%",
      ring: "0 72.2% 50.6%",
      radius: "0.4rem",
    },
    dark: {
      background: "0 0% 3.9%",
      foreground: "0 0% 98%",
      card: "0 0% 3.9%",
      "card-foreground": "0 0% 98%",
      popover: "0 0% 3.9%",
      "popover-foreground": "0 0% 98%",
      primary: "0 72.2% 50.6%",
      "primary-foreground": "0 85.7% 97.3%",
      secondary: "0 0% 14.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "0 0% 14.9%",
      "muted-foreground": "0 0% 63.9%",
      accent: "0 0% 14.9%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 0% 98%",
      border: "0 0% 14.9%",
      input: "0 0% 14.9%",
      ring: "0 72.2% 50.6%",
    },
  },
}, {
  name: "rose",
  label: "Rose",
  activeColor: { light: "346.8 77.2% 49.8%", dark: "346.8 77.2% 49.8%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "346.8 77.2% 49.8%",
      "primary-foreground": "355.7 100% 97.3%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "346.8 77.2% 49.8%",
      radius: "0.5rem",
    },
    dark: {
      background: "20 14.3% 4.1%",
      foreground: "0 0% 95%",
      popover: "0 0% 9%",
      "popover-foreground": "0 0% 95%",
      card: "24 9.8% 10%",
      "card-foreground": "0 0% 95%",
      primary: "346.8 77.2% 49.8%",
      "primary-foreground": "355.7 100% 97.3%",
      secondary: "240 3.7% 15.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "0 0% 15%",
      "muted-foreground": "240 5% 64.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 85.7% 97.3%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "346.8 77.2% 49.8%",
    },
  },
}, {
  name: "orange",
  label: "Orange",
  activeColor: { light: "24.6 95% 53.1%", dark: "20.5 90.2% 48.2%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "20 14.3% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "20 14.3% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "20 14.3% 4.1%",
      primary: "24.6 95% 53.1%",
      "primary-foreground": "60 9.1% 97.8%",
      secondary: "60 4.8% 95.9%",
      "secondary-foreground": "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      "muted-foreground": "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      "accent-foreground": "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "24.6 95% 53.1%",
      radius: "0.95rem",
    },
    dark: {
      background: "20 14.3% 4.1%",
      foreground: "60 9.1% 97.8%",
      card: "20 14.3% 4.1%",
      "card-foreground": "60 9.1% 97.8%",
      popover: "20 14.3% 4.1%",
      "popover-foreground": "60 9.1% 97.8%",
      primary: "20.5 90.2% 48.2%",
      "primary-foreground": "60 9.1% 97.8%",
      secondary: "12 6.5% 15.1%",
      "secondary-foreground": "60 9.1% 97.8%",
      muted: "12 6.5% 15.1%",
      "muted-foreground": "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      destructive: "0 72.2% 50.6%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "20.5 90.2% 48.2%",
    },
  },
}, {
  name: "green",
  label: "Green",
  activeColor: { light: "142.1 76.2% 36.3%", dark: "142.1 70.6% 45.3%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      "card-foreground": "240 10% 3.9%",
      popover: "0 0% 100%",
      "popover-foreground": "240 10% 3.9%",
      primary: "142.1 76.2% 36.3%",
      "primary-foreground": "355.7 100% 97.3%",
      secondary: "240 4.8% 95.9%",
      "secondary-foreground": "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      "muted-foreground": "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      "accent-foreground": "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "0 0% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "142.1 76.2% 36.3%",
    },
    dark: {
      background: "20 14.3% 4.1%",
      foreground: "0 0% 95%",
      popover: "0 0% 9%",
      "popover-foreground": "0 0% 95%",
      card: "24 9.8% 10%",
      "card-foreground": "0 0% 95%",
      primary: "142.1 70.6% 45.3%",
      "primary-foreground": "144.9 80.4% 10%",
      secondary: "240 3.7% 15.9%",
      "secondary-foreground": "0 0% 98%",
      muted: "0 0% 15%",
      "muted-foreground": "240 5% 64.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "0 0% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "0 85.7% 97.3%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "142.4 71.8% 29.2%",
    },
  },
}, {
  name: "blue",
  label: "Blue",
  activeColor: { light: "221.2 83.2% 53.3%", dark: "217.2 91.2% 59.8%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      popover: "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      primary: "221.2 83.2% 53.3%",
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: "221.2 83.2% 53.3%",
    },
    dark: {
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      card: "222.2 84% 4.9%",
      "card-foreground": "210 40% 98%",
      popover: "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      primary: "217.2 91.2% 59.8%",
      "primary-foreground": "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "224.3 76.3% 48%",
    },
  },
}, {
  name: "yellow",
  label: "Yellow",
  activeColor: { light: "47.9 95.8% 53.1%", dark: "47.9 95.8% 53.1%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "20 14.3% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "20 14.3% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "20 14.3% 4.1%",
      primary: "47.9 95.8% 53.1%",
      "primary-foreground": "26 83.3% 14.1%",
      secondary: "60 4.8% 95.9%",
      "secondary-foreground": "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      "muted-foreground": "25 5.3% 44.7%",
      accent: "60 4.8% 95.9%",
      "accent-foreground": "24 9.8% 10%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "20 5.9% 90%",
      input: "20 5.9% 90%",
      ring: "20 14.3% 4.1%",
      radius: "0.95rem",
    },
    dark: {
      background: "20 14.3% 4.1%",
      foreground: "60 9.1% 97.8%",
      card: "20 14.3% 4.1%",
      "card-foreground": "60 9.1% 97.8%",
      popover: "20 14.3% 4.1%",
      "popover-foreground": "60 9.1% 97.8%",
      primary: "47.9 95.8% 53.1%",
      "primary-foreground": "26 83.3% 14.1%",
      secondary: "12 6.5% 15.1%",
      "secondary-foreground": "60 9.1% 97.8%",
      muted: "12 6.5% 15.1%",
      "muted-foreground": "24 5.4% 63.9%",
      accent: "12 6.5% 15.1%",
      "accent-foreground": "60 9.1% 97.8%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "60 9.1% 97.8%",
      border: "12 6.5% 15.1%",
      input: "12 6.5% 15.1%",
      ring: "35.5 91.7% 32.9%",
    },
  },
}, {
  name: "violet",
  label: "Violet",
  activeColor: { light: "262.1 83.3% 57.8%", dark: "263.4 70% 50.4%" },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "224 71.4% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "224 71.4% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "224 71.4% 4.1%",
      primary: "262.1 83.3% 57.8%",
      "primary-foreground": "210 20% 98%",
      secondary: "220 14.3% 95.9%",
      "secondary-foreground": "220.9 39.3% 11%",
      muted: "220 14.3% 95.9%",
      "muted-foreground": "220 8.9% 46.1%",
      accent: "220 14.3% 95.9%",
      "accent-foreground": "220.9 39.3% 11%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 20% 98%",
      border: "220 13% 91%",
      input: "220 13% 91%",
      ring: "262.1 83.3% 57.8%",
    },
    dark: {
      background: "224 71.4% 4.1%",
      foreground: "210 20% 98%",
      card: "224 71.4% 4.1%",
      "card-foreground": "210 20% 98%",
      popover: "224 71.4% 4.1%",
      "popover-foreground": "210 20% 98%",
      primary: "263.4 70% 50.4%",
      "primary-foreground": "210 20% 98%",
      secondary: "215 27.9% 16.9%",
      "secondary-foreground": "210 20% 98%",
      muted: "215 27.9% 16.9%",
      "muted-foreground": "217.9 10.6% 64.9%",
      accent: "215 27.9% 16.9%",
      "accent-foreground": "210 20% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 20% 98%",
      border: "215 27.9% 16.9%",
      input: "215 27.9% 16.9%",
      ring: "263.4 70% 50.4%",
    },
  },
}];
function generateLightVars(theme, color, radius) {
  return [
    ...Object.entries(color).map(([key, value]) => {
      if (!themeCSSVarKeys.includes(key)) return "";
      return `  --${key}: ${value};`;
    }).filter(Boolean),
    ...theme === "light" ? [`  --radius: ${radius}rem;`] : [],
  ].join("\n");
}
function getBuiltInTheme(name) {
  const theme = themes.find((t) => t.name === name);
  if (!theme) throw new Error(`Unknown color: ${name}`);
  return theme.cssVars;
}
function getColorTheme(color) {
  let light;
  let dark;
  if (typeof color === "string") ({ light, dark } = getBuiltInTheme(color));
  else if ("base" in color) {
    ({ light, dark } = K1(getBuiltInTheme(color.base), color.color));
  } else ({ light, dark } = color);
  return { light, dark };
}
function generateCSSVars(color, radius) {
  const { light, dark } = getColorTheme(color);
  const lightVars = generateLightVars("light", light, radius);
  const darkVars = generateLightVars("dark", dark, radius);
  return `:root {
${lightVars}
}

.dark {
${darkVars}
}`;
}
const variantGroupDataAttribute = {
  name: "group-data",
  match(matcher, ctx) {
    const variant = A7("group-data-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = m5.bracket(match) ?? ctx.theme.data?.[match] ?? "";
      if (dataAttribute) {
        return { matcher: `group-[[data-${dataAttribute}]]:${rest}` };
      }
    }
  },
};
const handleMatchNumber = (v, defaultVal = "0") =>
  m5.bracket.cssvar.global.auto.fraction.number(v || defaultVal)?.replace(
    "%",
    "",
  );
const handleMatchRem = (v, defaultVal = "full") =>
  m5.bracket.cssvar.global.auto.fraction.rem(v || defaultVal);
function presetShadcn(options = {}) {
  const { color = "blue", radius = .5 } = options;
  const cssVars = generateCSSVars(color, radius);
  return {
    name: "unocss-preset-shadcn",
    preflights: [{
      getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--radix-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--radix-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-enter { from{ opacity: var(--un-enter-opacity, 1); transform: translate3d(var(--un-enter-translate-x, 0), var(--un-enter-translate-y, 0), 0) scale3d(var(--un-enter-scale, 1), var(--un-enter-scale, 1), var(--un-enter-scale, 1)) rotate(var(--un-enter-rotate, 0)) } }
          @keyframes shadcn-exit { to{ opacity: var(--un-exit-opacity, 1); transform: translate3d(var(--un-exit-translate-x, 0), var(--un-exit-translate-y, 0), 0) scale3d(var(--un-exit-scale, 1), var(--un-exit-scale, 1), var(--un-exit-scale, 1)) rotate(var(--un-exit-rotate, 0)) } }

          ${cssVars}

          * {
            border-color: hsl(var(--border));
          }

          body {
            color: hsl(var(--foreground));
            background: hsl(var(--background));
          }

          /* WORKAROUND: force inject theme CSS variables from presetShadcn
          since unocsss wont't inject them automatically for dynamic components */
          .bg-border {
            background-color: hsl(var(--border));
          }
          .text-border {
            color: hsl(var(--border-foreground));
          }
          .bg-input {
            background-color: hsl(var(--input));
          }
          .text-input {
            color: hsl(var(--input-foreground));
          }
          .bg-ring {
            background-color: hsl(var(--ring));
          }
          .text-ring {
            color: hsl(var(--ring-foreground));
          }
          .bg-background {
            background-color: hsl(var(--background));
          }
          .text-background {
            color: hsl(var(--background-foreground));
          }
          .bg-foreground {
            background-color: hsl(var(--foreground));
          }
          .text-foreground {
            color: hsl(var(--foreground-foreground));
          }
          .bg-primary {
            background-color: hsl(var(--primary));
          }
          .text-primary {
            color: hsl(var(--primary-foreground));
          }
          .bg-primary-foreground {
            background-color: hsl(var(--primary-foreground));
          }
          .text-primary-foreground {
            color: hsl(var(--primary-foreground));
          }
          .bg-secondary {
            background-color: hsl(var(--secondary));
          }
          .text-secondary {
            color: hsl(var(--secondary-foreground));
          }
          .bg-destructive {
            background-color: hsl(var(--destructive));
          }
          .text-destructive {
            color: hsl(var(--destructive-foreground));
          }
          .bg-muted {
            background-color: hsl(var(--muted));
          }
          .text-muted {
            color: hsl(var(--muted-foreground));
          }
          .bg-accent {
            background-color: hsl(var(--accent));
          }
          .text-accent {
            color: hsl(var(--accent-foreground));
          }
          .bg-popover {
            background-color: hsl(var(--popover));
          }
          .text-popover {
            color: hsl(var(--popover-foreground));
          }
          .bg-card {
            background-color: hsl(var(--card));
          }
          .text-card {
            color: hsl(var(--card-foreground));
          }

          /* WORKAROUND: set !important to --radius CSS variables since othwerwise
          the client-generated ones e.g. ".rounded-lg" will take precedence */
          .rounded-lg {
            border-radius: var(--radius) !important;
          }
          .rounded-md {
            border-radius: calc(var(--radius) - 2px) !important;
          }
          .rounded-sm {
            border-radius: calc(var(--radius) - 4px) !important;
          }
        `,
    }],
    variants: [variantGroupDataAttribute.match],
    rules: [["accordion-down", { animation: "shadcn-down 0.2s ease-out" }], [
      "accordion-up",
      { animation: "shadcn-up 0.2s ease-out" },
    ], ["animate-in", {
      "animation-name": "shadcn-enter",
      "animation-duration": "var(--un-animate-duration)",
      "--un-animate-duration": "150ms",
      "--un-enter-opacity": "initial",
      "--un-enter-scale": "initial",
      "--un-enter-rotate": "initial",
      "--un-enter-translate-x": "initial",
      "--un-enter-translate-y": "initial",
    }], ["animate-out", {
      "animation-name": "shadcn-exit",
      "animation-duration": "var(--un-animate-duration)",
      "--un-animate-duration": "150ms",
      "--un-exit-opacity": "initial",
      "--un-exit-scale": "initial",
      "--un-exit-rotate": "initial",
      "--un-exit-translate-x": "initial",
      "--un-exit-translate-y": "initial",
    }], [
      /^fade-in-?(.+)?$/,
      ([, d]) => ({
        "--un-enter-opacity": `${Number(handleMatchNumber(d) || 0) / 100}`,
      }),
    ], [
      /^fade-out-?(.+)?$/,
      ([, d]) => ({
        "--un-exit-opacity": `${Number(handleMatchNumber(d) || 0) / 100}`,
      }),
    ], [
      /^zoom-in-?(.+)?$/,
      ([, d]) => ({
        "--un-enter-scale": `${Number(handleMatchNumber(d) || 0) / 100}`,
      }),
    ], [
      /^zoom-out-?(.+)?$/,
      ([, d]) => ({
        "--un-out-scale": `${Number(handleMatchNumber(d) || 0) / 100}`,
      }),
    ], [
      /^spin-in-?(.+)?$/,
      ([, d]) => ({
        "--un-enter-rotate": `${Number(handleMatchNumber(d) || 0)}deg`,
      }),
    ], [
      /^spin-out-?(.+)?$/,
      ([, d]) => ({
        "--un-exit-rotate": `${Number(handleMatchNumber(d) || 0)}deg`,
      }),
    ], [
      /^slide-in-from-top-?(.+)?$/,
      ([, d]) => ({ "--un-enter-translate-y": `-${handleMatchRem(d)}` }),
    ], [
      /^slide-in-from-bottom-?(.+)?$/,
      ([, d]) => ({ "--un-enter-translate-y": handleMatchRem(d) }),
    ], [
      /^slide-in-from-left-?(.+)?$/,
      ([, d]) => ({ "--un-enter-translate-x": `-${handleMatchRem(d)}` }),
    ], [
      /^slide-in-from-right-?(.+)?$/,
      ([, d]) => ({ "--un-enter-translate-x": handleMatchRem(d) }),
    ], [
      /^slide-out-to-top-?(.+)?$/,
      ([, d]) => ({ "--un-exit-translate-y": `-${handleMatchRem(d)}` }),
    ], [
      /^slide-out-to-bottom-?(.+)?$/,
      ([, d]) => ({ "--un-exit-translate-y": handleMatchRem(d) }),
    ], [
      /^slide-out-to-left-?(.+)?$/,
      ([, d]) => ({ "--un-exit-translate-x": `-${handleMatchRem(d)}` }),
    ], [
      /^slide-out-to-right-?(.+)?$/,
      ([, d]) => ({ "--un-exit-translate-x": handleMatchRem(d) }),
    ]],
    theme: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  };
}
function presetNetzo(options = {}) {
  return {
    ...options,
    name: "unocss-preset-netzo",
    presets: [
      presetShadcn({ color: options?.color, radius: options?.radius }),
      y8(),
      k3(),
      vt1({
        collections: {
          mdi: () =>
            import("https://esm.sh/v135/@iconify-json/mdi/icons.json", {
              assert: { type: "json" },
            }).then((i) => i.default),
          logos: () =>
            import("https://esm.sh/v135/@iconify-json/logos/icons.json", {
              assert: { type: "json" },
            }).then((i) => i.default),
          "simple-icons": () =>
            import(
              "https://esm.sh/v135/@iconify-json/simple-icons/icons.json",
              { assert: { type: "json" } }
            ).then((i) => i.default),
        },
        prefix: ["i-", ""],
        scale: 1.2,
        extraProperties: {
          "display": "inline-block",
          "vertical-align": "middle",
        },
      }),
    ],
  };
}
const createUnoConfig = (options) => {
  const { color, radius } = options ?? {};
  return defineConfig({ presets: [presetNetzo({ color, radius })] });
};
export { createUnoConfig as createUnoConfig };
