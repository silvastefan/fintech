var e, t;

function r(e) {
    return Object.keys(e).reduce(((t, r) => {
        const s = e[r];
        var n;
        return t[r] = Object.assign({}, s), o(s.value) && (n = s.value, "[object Function]" !== Object.prototype.toString.call(n)) && !Array.isArray(s.value) && (t[r].value = Object.assign({}, s.value)), Array.isArray(s.value) && (t[r].value = s.value.slice(0)), t
    }), {})
}

function s(e) {
    if (e) try {
        return JSON.parse(e)
    } catch (t) {
        return e
    }
}

function n(e, t, r) {
    if (null == r || !1 === r) return e.removeAttribute(t);
    let s = JSON.stringify(r);
    e.__updating[t] = !0, "true" === s && (s = ""), e.setAttribute(t, s), Promise.resolve().then((() => delete e.__updating[t]))
}

function o(e) {
    return null != e && ("object" == typeof e || "function" == typeof e)
}
let i;

function a(e, t) {
    const o = Object.keys(t);
    return class extends e {
        static get observedAttributes() {
            return o.map((e => t[e].attribute))
        }
        constructor() {
            super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {}
        }
        connectedCallback() {
            if (this.__initialized) return;
            this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = function(e, t) {
                const o = r(t);
                return Object.keys(t).forEach((t => {
                    const r = o[t],
                        i = e.getAttribute(r.attribute),
                        a = e[t];
                    i && (r.value = r.parse ? s(i) : i), null != a && (r.value = Array.isArray(a) ? a.slice(0) : a), r.reflect && n(e, r.attribute, r.value), Object.defineProperty(e, t, {
                        get: () => r.value,
                        set(e) {
                            const s = r.value;
                            r.value = e, r.reflect && n(this, r.attribute, r.value);
                            for (let r = 0, n = this.__propertyChangedCallbacks.length; r < n; r++) this.__propertyChangedCallbacks[r](t, e, s)
                        },
                        enumerable: !0,
                        configurable: !0
                    })
                })), o
            }(this, t);
            const e = function(e) {
                    return Object.keys(e).reduce(((t, r) => (t[r] = e[r].value, t)), {})
                }(this.props),
                o = this.Component,
                a = i;
            try {
                i = this, this.__initialized = !0, "function" == typeof(l = o) && 0 === l.toString().indexOf("class") ? new o(e, {
                    element: this
                }) : o(e, {
                    element: this
                })
            } finally {
                i = a
            }
            var l
        }
        async disconnectedCallback() {
            if (await Promise.resolve(), this.isConnected) return;
            this.__propertyChangedCallbacks.length = 0;
            let e = null;
            for (; e = this.__releaseCallbacks.pop();) e(this);
            delete this.__initialized, this.__released = !0
        }
        attributeChangedCallback(e, r, n) {
            if (this.__initialized && !this.__updating[e] && (e = this.lookupProp(e)) in t) {
                if (null == n && !this[e]) return;
                this[e] = t[e].parse ? s(n) : n
            }
        }
        lookupProp(e) {
            if (t) return o.find((r => e === r || e === t[r].attribute))
        }
        get renderRoot() {
            return this.shadowRoot || this.attachShadow({
                mode: "open"
            })
        }
        addReleaseCallback(e) {
            this.__releaseCallbacks.push(e)
        }
        addPropertyChangedCallback(e) {
            this.__propertyChangedCallbacks.push(e)
        }
    }
}

function l(e, t = {}, r = {}) {
    const {
        BaseElement: s = HTMLElement,
        extension: n
    } = r;
    return r => {
        if (!e) throw new Error("tag is required to register a Component");
        let i = customElements.get(e);
        return i ? (i.prototype.Component = r, i) : (i = a(s, function(e) {
            return e ? Object.keys(e).reduce(((t, r) => {
                const s = e[r];
                return t[r] = o(s) && "value" in s ? s : {
                    value: s
                }, t[r].attribute || (t[r].attribute = r.replace(/\.?([A-Z]+)/g, ((e, t) => "-" + t.toLowerCase())).replace("_", "-").replace(/^-/, "")), t[r].parse = "parse" in t[r] ? t[r].parse : "string" != typeof t[r].value, t
            }), {}) : {}
        }(t)), i.prototype.Component = r, i.prototype.registeredTag = e, customElements.define(e, i, n), i)
    }
}(e = self.document) && !e.getElementById("livereloadscript") && ((t = e.createElement("script")).async = 1, t.src = "//" + (self.location.host || "localhost").split(":")[0] + ":35729/livereload.js?snipver=1", t.id = "livereloadscript", e.getElementsByTagName("head")[0].appendChild(t));
const c = Symbol("solid-proxy"),
    u = Symbol("solid-track"),
    h = {
        equals: (e, t) => e === t
    };
let p = z;
const d = 1,
    g = 2,
    f = {
        owned: null,
        cleanups: null,
        context: null,
        owner: null
    };
var b = null;
let w = null,
    m = null,
    y = null,
    v = null,
    x = 0;

function k(e, t) {
    const r = m,
        s = b,
        n = 0 === e.length,
        o = n ? f : {
            owned: null,
            cleanups: null,
            context: null,
            owner: void 0 === t ? s : t
        },
        i = n ? e : () => e((() => P((() => N(o)))));
    b = o, m = null;
    try {
        return E(i, !0)
    } finally {
        m = r, b = s
    }
}

function $(e, t) {
    const r = {
        value: e,
        observers: null,
        observerSlots: null,
        comparator: (t = t ? Object.assign({}, h, t) : h).equals || void 0
    };
    return [R.bind(r), e => ("function" == typeof e && (e = e(r.value)), T(r, e))]
}

function _(e, t, r) {
    B(O(e, t, !1, d))
}

function S(e, t, r) {
    p = M;
    const s = O(e, t, !1, d);
    s.user = !0, v ? v.push(s) : B(s)
}

function C(e, t, r) {
    r = r ? Object.assign({}, h, r) : h;
    const s = O(e, t, !0, 0);
    return s.observers = null, s.observerSlots = null, s.comparator = r.equals || void 0, B(s), R.bind(s)
}

function P(e) {
    if (null === m) return e();
    const t = m;
    m = null;
    try {
        return e()
    } finally {
        m = t
    }
}

function A(e) {
    S((() => P(e)))
}

function j(e) {
    return null === b || (null === b.cleanups ? b.cleanups = [e] : b.cleanups.push(e)), e
}

function R() {
    if (this.sources && this.state)
        if (this.state === d) B(this);
        else {
            const e = y;
            y = null, E((() => I(this)), !1), y = e
        } if (m) {
        const e = this.observers ? this.observers.length : 0;
        m.sources ? (m.sources.push(this), m.sourceSlots.push(e)) : (m.sources = [this], m.sourceSlots = [e]), this.observers ? (this.observers.push(m), this.observerSlots.push(m.sources.length - 1)) : (this.observers = [m], this.observerSlots = [m.sources.length - 1])
    }
    return this.value
}

function T(e, t, r) {
    let s = e.value;
    return e.comparator && e.comparator(s, t) || (e.value = t, e.observers && e.observers.length && E((() => {
        for (let t = 0; t < e.observers.length; t += 1) {
            const r = e.observers[t],
                s = w && w.running;
            s && w.disposed.has(r), (s ? r.tState : r.state) || (r.pure ? y.push(r) : v.push(r), r.observers && G(r)), s || (r.state = d)
        }
        if (y.length > 1e6) throw y = [], new Error
    }), !1)), t
}

function B(e) {
    if (!e.fn) return;
    N(e);
    const t = b,
        r = m,
        s = x;
    m = b = e,
        function(e, t, r) {
            let s;
            try {
                s = e.fn(t)
            } catch (t) {
                return e.pure && (e.state = d, e.owned && e.owned.forEach(N), e.owned = null), e.updatedAt = r + 1, q(t)
            }(!e.updatedAt || e.updatedAt <= r) && (null != e.updatedAt && "observers" in e ? T(e, s) : e.value = s, e.updatedAt = r)
        }(e, e.value, s), m = r, b = t
}

function O(e, t, r, s = d, n) {
    const o = {
        fn: e,
        state: s,
        updatedAt: null,
        owned: null,
        sources: null,
        sourceSlots: null,
        cleanups: null,
        value: t,
        owner: b,
        context: null,
        pure: r
    };
    return null === b || b !== f && (b.owned ? b.owned.push(o) : b.owned = [o]), o
}

function L(e) {
    if (0 === e.state) return;
    if (e.state === g) return I(e);
    if (e.suspense && P(e.suspense.inFallback)) return e.suspense.effects.push(e);
    const t = [e];
    for (;
        (e = e.owner) && (!e.updatedAt || e.updatedAt < x);) e.state && t.push(e);
    for (let r = t.length - 1; r >= 0; r--)
        if ((e = t[r]).state === d) B(e);
        else if (e.state === g) {
        const r = y;
        y = null, E((() => I(e, t[0])), !1), y = r
    }
}

function E(e, t) {
    if (y) return e();
    let r = !1;
    t || (y = []), v ? r = !0 : v = [], x++;
    try {
        const t = e();
        return function(e) {
            y && (z(y), y = null);
            if (e) return;
            const t = v;
            v = null, t.length && E((() => p(t)), !1)
        }(r), t
    } catch (e) {
        r || (v = null), y = null, q(e)
    }
}

function z(e) {
    for (let t = 0; t < e.length; t++) L(e[t])
}

function M(e) {
    let t, r = 0;
    for (t = 0; t < e.length; t++) {
        const s = e[t];
        s.user ? e[r++] = s : L(s)
    }
    for (t = 0; t < r; t++) L(e[t])
}

function I(e, t) {
    e.state = 0;
    for (let r = 0; r < e.sources.length; r += 1) {
        const s = e.sources[r];
        if (s.sources) {
            const e = s.state;
            e === d ? s !== t && (!s.updatedAt || s.updatedAt < x) && L(s) : e === g && I(s, t)
        }
    }
}

function G(e) {
    for (let t = 0; t < e.observers.length; t += 1) {
        const r = e.observers[t];
        r.state || (r.state = g, r.pure ? y.push(r) : v.push(r), r.observers && G(r))
    }
}

function N(e) {
    let t;
    if (e.sources)
        for (; e.sources.length;) {
            const t = e.sources.pop(),
                r = e.sourceSlots.pop(),
                s = t.observers;
            if (s && s.length) {
                const e = s.pop(),
                    n = t.observerSlots.pop();
                r < s.length && (e.sourceSlots[n] = r, s[r] = e, t.observerSlots[r] = n)
            }
        }
    if (e.owned) {
        for (t = e.owned.length - 1; t >= 0; t--) N(e.owned[t]);
        e.owned = null
    }
    if (e.cleanups) {
        for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
        e.cleanups = null
    }
    e.state = 0, e.context = null
}

function q(e) {
    throw e
}
const F = Symbol("fallback");

function H(e) {
    for (let t = 0; t < e.length; t++) e[t]()
}

function D(e, t) {
    return P((() => e(t || {})))
}

function X() {
    return !0
}
const Y = {
    get: (e, t, r) => t === c ? r : e.get(t),
    has: (e, t) => t === c || e.has(t),
    set: X,
    deleteProperty: X,
    getOwnPropertyDescriptor: (e, t) => ({
        configurable: !0,
        enumerable: !0,
        get: () => e.get(t),
        set: X,
        deleteProperty: X
    }),
    ownKeys: e => e.keys()
};

function U(e) {
    return (e = "function" == typeof e ? e() : e) ? e : {}
}

function W(...e) {
    let t = !1;
    for (let r = 0; r < e.length; r++) {
        const s = e[r];
        t = t || !!s && c in s, e[r] = "function" == typeof s ? (t = !0, C(s)) : s
    }
    if (t) return new Proxy({
        get(t) {
            for (let r = e.length - 1; r >= 0; r--) {
                const s = U(e[r])[t];
                if (void 0 !== s) return s
            }
        },
        has(t) {
            for (let r = e.length - 1; r >= 0; r--)
                if (t in U(e[r])) return !0;
            return !1
        },
        keys() {
            const t = [];
            for (let r = 0; r < e.length; r++) t.push(...Object.keys(U(e[r])));
            return [...new Set(t)]
        }
    }, Y);
    const r = {};
    for (let t = e.length - 1; t >= 0; t--)
        if (e[t]) {
            const s = Object.getOwnPropertyDescriptors(e[t]);
            for (const t in s) t in r || Object.defineProperty(r, t, {
                enumerable: !0,
                get() {
                    for (let r = e.length - 1; r >= 0; r--) {
                        const s = (e[r] || {})[t];
                        if (void 0 !== s) return s
                    }
                }
            })
        } return r
}

function V(e, ...t) {
    const r = new Set(t.flat());
    if (c in e) {
        const s = t.map((t => new Proxy({
            get: r => t.includes(r) ? e[r] : void 0,
            has: r => t.includes(r) && r in e,
            keys: () => t.filter((t => t in e))
        }, Y)));
        return s.push(new Proxy({
            get: t => r.has(t) ? void 0 : e[t],
            has: t => !r.has(t) && t in e,
            keys: () => Object.keys(e).filter((e => !r.has(e)))
        }, Y)), s
    }
    const s = Object.getOwnPropertyDescriptors(e);
    return t.push(Object.keys(s).filter((e => !r.has(e)))), t.map((t => {
        const r = {};
        for (let n = 0; n < t.length; n++) {
            const o = t[n];
            o in e && Object.defineProperty(r, o, s[o] ? s[o] : {
                get: () => e[o],
                set: () => !0,
                enumerable: !0
            })
        }
        return r
    }))
}

function J(e) {
    const t = "fallback" in e && {
        fallback: () => e.fallback
    };
    return C(function(e, t, r = {}) {
        let s = [],
            n = [],
            o = [],
            i = 0,
            a = t.length > 1 ? [] : null;
        return j((() => H(o))), () => {
            let l, c, h = e() || [];
            return h[u], P((() => {
                let e, t, u, d, g, f, b, w, m, y = h.length;
                if (0 === y) 0 !== i && (H(o), o = [], s = [], n = [], i = 0, a && (a = [])), r.fallback && (s = [F], n[0] = k((e => (o[0] = e, r.fallback()))), i = 1);
                else if (0 === i) {
                    for (n = new Array(y), c = 0; c < y; c++) s[c] = h[c], n[c] = k(p);
                    i = y
                } else {
                    for (u = new Array(y), d = new Array(y), a && (g = new Array(y)), f = 0, b = Math.min(i, y); f < b && s[f] === h[f]; f++);
                    for (b = i - 1, w = y - 1; b >= f && w >= f && s[b] === h[w]; b--, w--) u[w] = n[b], d[w] = o[b], a && (g[w] = a[b]);
                    for (e = new Map, t = new Array(w + 1), c = w; c >= f; c--) m = h[c], l = e.get(m), t[c] = void 0 === l ? -1 : l, e.set(m, c);
                    for (l = f; l <= b; l++) m = s[l], c = e.get(m), void 0 !== c && -1 !== c ? (u[c] = n[l], d[c] = o[l], a && (g[c] = a[l]), c = t[c], e.set(m, c)) : o[l]();
                    for (c = f; c < y; c++) c in u ? (n[c] = u[c], o[c] = d[c], a && (a[c] = g[c], a[c](c))) : n[c] = k(p);
                    n = n.slice(0, i = y), s = h.slice(0)
                }
                return n
            }));

            function p(e) {
                if (o[c] = e, a) {
                    const [e, r] = $(c);
                    return a[c] = r, t(h[c], e)
                }
                return t(h[c])
            }
        }
    }((() => e.each), e.children, t || void 0))
}

function Z(e) {
    const t = e.keyed,
        r = C((() => e.when), void 0, {
            equals: (e, r) => t ? e === r : !e == !r
        });
    return C((() => {
        const s = r();
        if (s) {
            const n = e.children;
            return "function" == typeof n && n.length > 0 ? P((() => n(t ? s : () => {
                if (!P(r)) throw `Stale read from <${"Show"}>.`;
                return e.when
            }))) : n
        }
        return e.fallback
    }), void 0, void 0)
}
const K = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]),
    Q = new Set(["innerHTML", "textContent", "innerText", "children"]),
    ee = Object.assign(Object.create(null), {
        className: "class",
        htmlFor: "for"
    }),
    te = Object.assign(Object.create(null), {
        class: "className",
        formnovalidate: {
            $: "formNoValidate",
            BUTTON: 1,
            INPUT: 1
        },
        ismap: {
            $: "isMap",
            IMG: 1
        },
        nomodule: {
            $: "noModule",
            SCRIPT: 1
        },
        playsinline: {
            $: "playsInline",
            VIDEO: 1
        },
        readonly: {
            $: "readOnly",
            INPUT: 1,
            TEXTAREA: 1
        }
    });
const re = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
    se = {
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace"
    };
const ne = "_$DX_DELEGATE";

function oe(e, t, r) {
    let s;
    const n = () => {
            const t = document.createElement("template");
            return t.innerHTML = e, r ? t.content.firstChild.firstChild : t.content.firstChild
        },
        o = t ? () => (s || (s = n())).cloneNode(!0) : () => P((() => document.importNode(s || (s = n()), !0)));
    return o.cloneNode = o, o
}

function ie(e, t = window.document) {
    const r = t[ne] || (t[ne] = new Set);
    for (let s = 0, n = e.length; s < n; s++) {
        const n = e[s];
        r.has(n) || (r.add(n), t.addEventListener(n, ge))
    }
}

function ae(e, t, r) {
    null == r ? e.removeAttribute(t) : e.setAttribute(t, r)
}

function le(e, t) {
    null == t ? e.removeAttribute("class") : e.className = t
}

function ce(e, t = {}, r, s) {
    const n = {};
    return s || _((() => n.children = fe(e, t.children, n.children))), _((() => t.ref && t.ref(e))), _((() => function(e, t, r, s, n = {}, o = !1) {
        t || (t = {});
        for (const s in n)
            if (!(s in t)) {
                if ("children" === s) continue;
                n[s] = de(e, s, null, n[s], r, o)
            } for (const i in t) {
            if ("children" === i) {
                s || fe(e, t.children);
                continue
            }
            const a = t[i];
            n[i] = de(e, i, a, n[i], r, o)
        }
    }(e, t, r, !0, n, !0))), n
}

function ue(e, t, r) {
    return P((() => e(t, r)))
}

function he(e, t, r, s) {
    if (void 0 === r || s || (s = []), "function" != typeof t) return fe(e, t, s, r);
    _((s => fe(e, t(), s, r)), s)
}

function pe(e, t, r) {
    const s = t.trim().split(/\s+/);
    for (let t = 0, n = s.length; t < n; t++) e.classList.toggle(s[t], r)
}

function de(e, t, r, s, n, o) {
    let i, a, l, c, u;
    if ("style" === t) return function(e, t, r) {
        if (!t) return r ? ae(e, "style") : t;
        const s = e.style;
        if ("string" == typeof t) return s.cssText = t;
        let n, o;
        for (o in "string" == typeof r && (s.cssText = r = void 0), r || (r = {}), t || (t = {}), r) null == t[o] && s.removeProperty(o), delete r[o];
        for (o in t) n = t[o], n !== r[o] && (s.setProperty(o, n), r[o] = n);
        return r
    }(e, r, s);
    if ("classList" === t) return function(e, t, r = {}) {
        const s = Object.keys(t || {}),
            n = Object.keys(r);
        let o, i;
        for (o = 0, i = n.length; o < i; o++) {
            const s = n[o];
            s && "undefined" !== s && !t[s] && (pe(e, s, !1), delete r[s])
        }
        for (o = 0, i = s.length; o < i; o++) {
            const n = s[o],
                i = !!t[n];
            n && "undefined" !== n && r[n] !== i && i && (pe(e, n, !0), r[n] = i)
        }
        return r
    }(e, r, s);
    if (r === s) return s;
    if ("ref" === t) o || r(e);
    else if ("on:" === t.slice(0, 3)) {
        const n = t.slice(3);
        s && e.removeEventListener(n, s), r && e.addEventListener(n, r)
    } else if ("oncapture:" === t.slice(0, 10)) {
        const n = t.slice(10);
        s && e.removeEventListener(n, s, !0), r && e.addEventListener(n, r, !0)
    } else if ("on" === t.slice(0, 2)) {
        const n = t.slice(2).toLowerCase(),
            o = re.has(n);
        if (!o && s) {
            const t = Array.isArray(s) ? s[0] : s;
            e.removeEventListener(n, t)
        }(o || r) && (! function(e, t, r, s) {
            if (s) Array.isArray(r) ? (e[`$$${t}`] = r[0], e[`$$${t}Data`] = r[1]) : e[`$$${t}`] = r;
            else if (Array.isArray(r)) {
                const s = r[0];
                e.addEventListener(t, r[0] = t => s.call(e, r[1], t))
            } else e.addEventListener(t, r)
        }(e, n, r, o), o && ie([n]))
    } else if ("attr:" === t.slice(0, 5)) ae(e, t.slice(5), r);
    else if ((u = "prop:" === t.slice(0, 5)) || (l = Q.has(t)) || !n && ((c = function(e, t) {
            const r = te[e];
            return "object" == typeof r ? r[t] ? r.$ : void 0 : r
        }(t, e.tagName)) || (a = K.has(t))) || (i = e.nodeName.includes("-"))) u && (t = t.slice(5), a = !0), "class" === t || "className" === t ? le(e, r) : !i || a || l ? e[c || t] = r : e[(h = t, h.toLowerCase().replace(/-([a-z])/g, ((e, t) => t.toUpperCase())))] = r;
    else {
        const s = n && t.indexOf(":") > -1 && se[t.split(":")[0]];
        s ? function(e, t, r, s) {
            null == s ? e.removeAttributeNS(t, r) : e.setAttributeNS(t, r, s)
        }(e, s, t, r) : ae(e, ee[t] || t, r)
    }
    var h;
    return r
}

function ge(e) {
    const t = `$$${e.type}`;
    let r = e.composedPath && e.composedPath()[0] || e.target;
    for (e.target !== r && Object.defineProperty(e, "target", {
            configurable: !0,
            value: r
        }), Object.defineProperty(e, "currentTarget", {
            configurable: !0,
            get: () => r || document
        }); r;) {
        const s = r[t];
        if (s && !r.disabled) {
            const n = r[`${t}Data`];
            if (void 0 !== n ? s.call(r, n, e) : s.call(r, e), e.cancelBubble) return
        }
        r = r._$host || r.parentNode || r.host
    }
}

function fe(e, t, r, s, n) {
    for (;
        "function" == typeof r;) r = r();
    if (t === r) return r;
    const o = typeof t,
        i = void 0 !== s;
    if (e = i && r[0] && r[0].parentNode || e, "string" === o || "number" === o)
        if ("number" === o && (t = t.toString()), i) {
            let n = r[0];
            n && 3 === n.nodeType ? n.data = t : n = document.createTextNode(t), r = me(e, r, s, n)
        } else r = "" !== r && "string" == typeof r ? e.firstChild.data = t : e.textContent = t;
    else if (null == t || "boolean" === o) r = me(e, r, s);
    else {
        if ("function" === o) return _((() => {
            let n = t();
            for (;
                "function" == typeof n;) n = n();
            r = fe(e, n, r, s)
        })), () => r;
        if (Array.isArray(t)) {
            const o = [],
                a = r && Array.isArray(r);
            if (be(o, t, r, n)) return _((() => r = fe(e, o, r, s, !0))), () => r;
            if (0 === o.length) {
                if (r = me(e, r, s), i) return r
            } else a ? 0 === r.length ? we(e, o, s) : function(e, t, r) {
                let s = r.length,
                    n = t.length,
                    o = s,
                    i = 0,
                    a = 0,
                    l = t[n - 1].nextSibling,
                    c = null;
                for (; i < n || a < o;)
                    if (t[i] !== r[a]) {
                        for (; t[n - 1] === r[o - 1];) n--, o--;
                        if (n === i) {
                            const t = o < s ? a ? r[a - 1].nextSibling : r[o - a] : l;
                            for (; a < o;) e.insertBefore(r[a++], t)
                        } else if (o === a)
                            for (; i < n;) c && c.has(t[i]) || t[i].remove(), i++;
                        else if (t[i] === r[o - 1] && r[a] === t[n - 1]) {
                            const s = t[--n].nextSibling;
                            e.insertBefore(r[a++], t[i++].nextSibling), e.insertBefore(r[--o], s), t[n] = r[o]
                        } else {
                            if (!c) {
                                c = new Map;
                                let e = a;
                                for (; e < o;) c.set(r[e], e++)
                            }
                            const s = c.get(t[i]);
                            if (null != s)
                                if (a < s && s < o) {
                                    let l, u = i,
                                        h = 1;
                                    for (; ++u < n && u < o && null != (l = c.get(t[u])) && l === s + h;) h++;
                                    if (h > s - a) {
                                        const n = t[i];
                                        for (; a < s;) e.insertBefore(r[a++], n)
                                    } else e.replaceChild(r[a++], t[i++])
                                } else i++;
                            else t[i++].remove()
                        }
                    } else i++, a++
            }(e, r, o) : (r && me(e), we(e, o));
            r = o
        } else if (t instanceof Node) {
            if (Array.isArray(r)) {
                if (i) return r = me(e, r, s, t);
                me(e, r, null, t)
            } else null != r && "" !== r && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
            r = t
        } else console.warn("Unrecognized value. Skipped inserting", t)
    }
    return r
}

function be(e, t, r, s) {
    let n = !1;
    for (let o = 0, i = t.length; o < i; o++) {
        let i = t[o],
            a = r && r[o];
        if (i instanceof Node) e.push(i);
        else if (null == i || !0 === i || !1 === i);
        else if (Array.isArray(i)) n = be(e, i, a) || n;
        else if ("function" == typeof i)
            if (s) {
                for (;
                    "function" == typeof i;) i = i();
                n = be(e, Array.isArray(i) ? i : [i], Array.isArray(a) ? a : [a]) || n
            } else e.push(i), n = !0;
        else {
            const t = String(i);
            a && 3 === a.nodeType ? (a.data = t, e.push(a)) : e.push(document.createTextNode(t))
        }
    }
    return n
}

function we(e, t, r = null) {
    for (let s = 0, n = t.length; s < n; s++) e.insertBefore(t[s], r)
}

function me(e, t, r, s) {
    if (void 0 === r) return e.textContent = "";
    const n = s || document.createTextNode("");
    if (t.length) {
        let s = !1;
        for (let o = t.length - 1; o >= 0; o--) {
            const i = t[o];
            if (n !== i) {
                const t = i.parentNode === e;
                s || o ? t && i.remove() : t ? e.replaceChild(n, i) : e.insertBefore(n, r)
            } else s = !0
        }
    } else e.insertBefore(n, r);
    return [n]
}

function ye(e) {
    return (t, r) => {
        const {
            element: s
        } = r;
        return k((n => {
            const o = function(e) {
                const t = Object.keys(e),
                    r = {};
                for (let s = 0; s < t.length; s++) {
                    const [n, o] = $(e[t[s]]);
                    Object.defineProperty(r, t[s], {
                        get: n,
                        set(e) {
                            o((() => e))
                        }
                    })
                }
                return r
            }(t);
            s.addPropertyChangedCallback(((e, t) => o[e] = t)), s.addReleaseCallback((() => {
                s.renderRoot.textContent = "", n()
            }));
            const i = e(o, r);
            return he(s.renderRoot, i)
        }), function(e) {
            if (e.assignedSlot && e.assignedSlot._$owner) return e.assignedSlot._$owner;
            let t = e.parentNode;
            for (; t && !t._$owner && (!t.assignedSlot || !t.assignedSlot._$owner);) t = t.parentNode;
            return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner
        }(s))
    }
}
const ve = {
    chatflowid: "",
    apiHost: void 0,
    theme: void 0
};
const xe = e => null != e,
    ke = oe('<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'),
    $e = oe('<img alt="Bubble button icon">'),
    _e = oe('<button part="button"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'),
    Se = e => (() => {
        const t = _e(),
            r = t.firstChild;
        return t.$$click = () => e.toggleBot(), t.style.setProperty("z-index", "42424242"), he(t, D(Z, {
            get when() {
                return null == e.customIconSrc
            },
            keyed: !0,
            get children() {
                const t = ke();
                return _((r => {
                    const s = e.iconColor ?? "white",
                        n = "stroke-2 fill-transparent absolute duration-200 transition " + (e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === e.size ? " w-9" : " w-7");
                    return s !== r._v$ && (null != (r._v$ = s) ? t.style.setProperty("stroke", s) : t.style.removeProperty("stroke")), n !== r._v$2 && ae(t, "class", r._v$2 = n), r
                }), {
                    _v$: void 0,
                    _v$2: void 0
                }), t
            }
        }), r), he(t, D(Z, {
            get when() {
                return e.customIconSrc
            },
            get children() {
                const t = $e();
                return _((r => {
                    const s = e.customIconSrc,
                        n = "rounded-full object-cover" + (e.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === e.size ? " w-9 h-9" : " w-7 h-7");
                    return s !== r._v$3 && ae(t, "src", r._v$3 = s), n !== r._v$4 && le(t, r._v$4 = n), r
                }), {
                    _v$3: void 0,
                    _v$4: void 0
                }), t
            }
        }), r), _((s => {
            const n = "fixed shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in" + ("large" === e.size ? " w-16 h-16" : " w-12 h-12"),
                o = e.backgroundColor ?? "#3B81F6",
                i = e.right ? `${e.right.toString()}px` : "20px",
                a = e.bottom ? `${e.bottom.toString()}px` : "20px",
                l = e.iconColor ?? "white",
                c = "absolute duration-200 transition " + (e.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0") + ("large" === e.size ? " w-9" : " w-7");
            return n !== s._v$5 && le(t, s._v$5 = n), o !== s._v$6 && (null != (s._v$6 = o) ? t.style.setProperty("background-color", o) : t.style.removeProperty("background-color")), i !== s._v$7 && (null != (s._v$7 = i) ? t.style.setProperty("right", i) : t.style.removeProperty("right")), a !== s._v$8 && (null != (s._v$8 = a) ? t.style.setProperty("bottom", a) : t.style.removeProperty("bottom")), l !== s._v$9 && (null != (s._v$9 = l) ? r.style.setProperty("fill", l) : r.style.removeProperty("fill")), c !== s._v$10 && ae(r, "class", s._v$10 = c), s
        }), {
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0,
            _v$8: void 0,
            _v$9: void 0,
            _v$10: void 0
        }), t
    })();
ie(["click"]);
const Ce = ({
        chatflowid: e,
        apiHost: t = "http://localhost:3000",
        body: r
    }) => (async e => {
        try {
            const t = "string" == typeof e ? e : e.url,
                r = await fetch(t, {
                    method: "string" == typeof e ? "GET" : e.method,
                    mode: "cors",
                    headers: "string" != typeof e && xe(e.body) ? {
                        "Content-Type": "application/json"
                    } : void 0,
                    body: "string" != typeof e && xe(e.body) ? JSON.stringify(e.body) : void 0
                }),
                s = await r.json();
            if (!r.ok) throw "error" in s ? s.error : s;
            return {
                data: s
            }
        } catch (e) {
            return console.error(e), {
                error: e
            }
        }
    })({
        method: "POST",
        url: `${t}/api/v1/prediction/${e}`,
        body: r
    }),
    Pe = oe('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'),
    Ae = e => {
        const [t, r] = V(e, ["ref", "onInput"]);
        return (() => {
            const s = Pe();
            s.$$input = e => t.onInput(e.currentTarget.value);
            const n = e.ref;
            return "function" == typeof n ? ue(n, s) : e.ref = s, s.style.setProperty("font-size", "16px"), ce(s, r, !1, !1), s
        })()
    };
ie(["input"]);
const je = oe('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'),
    Re = e => (() => {
        const t = je();
        return ce(t, W({
            get style() {
                return {
                    fill: e.color ?? "#3B81F6"
                }
            }
        }, e), !0, !0), t
    })(),
    Te = oe('<button type="submit">'),
    Be = oe('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'),
    Oe = e => (() => {
        const t = Te();
        return ce(t, W({
            get disabled() {
                return e.isDisabled || e.isLoading
            }
        }, e, {
            get class() {
                return "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " + e.class
            },
            style: {
                background: "transparent",
                border: "none"
            }
        }), !1, !0), he(t, D(Z, {
            get when() {
                return !e.isLoading
            },
            get fallback() {
                return D(Le, {
                    class: "text-white"
                })
            },
            get children() {
                return D(Re, {
                    get color() {
                        return e.sendButtonColor
                    },
                    get class() {
                        return "send-icon flex " + (e.disableIcon ? "hidden" : "")
                    }
                })
            }
        })), t
    })(),
    Le = e => (() => {
        const t = Be();
        return ce(t, W(e, {
            get class() {
                return "animate-spin -ml-1 mr-3 h-5 w-5 " + e.class
            },
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "data-testid": "loading-spinner"
        }), !0, !0), t
    })(),
    [Ee, ze] = $(),
    Me = oe("<span>Send"),
    Ie = oe('<div class="flex items-end justify-between pr-2 chatbot-input w-full" data-testid="input">'),
    Ge = e => {
        const [t, r] = $(e.defaultValue ?? "");
        let s;
        const n = e => r(e),
            o = () => {
                "" !== t() && s?.reportValidity() && e.onSubmit(t()), r("")
            },
            i = e => {
                "Enter" === e.key && o()
            };
        return A((() => {
            !Ee() && s && s.focus()
        })), (() => {
            const r = Ie();
            return r.$$keydown = i, r.style.setProperty("border-top", "1px solid #eeeeee"), r.style.setProperty("width", "90%"), r.style.setProperty("position", "absolute"), r.style.setProperty("bottom", "40px"), r.style.setProperty("margin", "auto"), he(r, D(Ae, {
                ref(e) {
                    "function" == typeof s ? s(e) : s = e
                },
                onInput: n,
                get value() {
                    return t()
                },
                get placeholder() {
                    return e.placeholder ?? "Type your question"
                }
            }), null), he(r, D(Oe, {
                get sendButtonColor() {
                    return e.sendButtonColor
                },
                type: "button",
                get isDisabled() {
                    return "" === t()
                },
                class: "my-2 ml-2",
                "on:click": o,
                get children() {
                    const e = Me();
                    return e.style.setProperty("font-family", "Poppins, sans-serif"), e
                }
            }), null), _((t => {
                const s = e.backgroundColor ?? "#ffffff",
                    n = e.textColor ?? "#303235";
                return s !== t._v$ && (null != (t._v$ = s) ? r.style.setProperty("background-color", s) : r.style.removeProperty("background-color")), n !== t._v$2 && (null != (t._v$2 = n) ? r.style.setProperty("color", n) : r.style.removeProperty("color")), t
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        })()
    };
ie(["keydown"]);
const Ne = oe('<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">'),
    qe = () => (() => {
        const e = Ne(),
            t = e.firstChild;
        return _((r => {
            const s = "flex justify-center items-center rounded-full text-white relative " + (Ee() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                n = "absolute top-0 left-0 " + (Ee() ? " w-6 h-6 text-sm" : "w-full h-full text-xl");
            return s !== r._v$ && le(e, r._v$ = s), n !== r._v$2 && ae(t, "class", r._v$2 = n), r
        }), {
            _v$: void 0,
            _v$2: void 0
        }), e
    })(),
    Fe = oe('<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full">'),
    He = e => {
        const [t, r] = $(e.initialAvatarSrc);
        return S((() => {
            t()?.startsWith("{{") && e.initialAvatarSrc?.startsWith("http") && r(e.initialAvatarSrc)
        })), D(Z, {
            get when() {
                return null != (e = t()) && "" !== e;
                var e
            },
            keyed: !0,
            get fallback() {
                return D(qe, {})
            },
            get children() {
                const e = Fe(),
                    r = e.firstChild;
                return _((s => {
                    const n = "flex justify-center items-center rounded-full text-white relative animate-fade-in flex-shrink-0 " + (Ee() ? "w-6 h-6 text-sm" : "w-10 h-10 text-xl"),
                        o = t();
                    return n !== s._v$ && le(e, s._v$ = n), o !== s._v$2 && ae(r, "src", s._v$2 = o), s
                }), {
                    _v$: void 0,
                    _v$2: void 0
                }), e
            }
        })
    };
class De {
    constructor(e, t = "") {
        this.source = e.source, this.flags = t
    }
    setGroup(e, t) {
        let r = "string" == typeof t ? t : t.source;
        return r = r.replace(/(^|[^\[])\^/g, "$1"), this.source = this.source.replace(e, r), this
    }
    getRegexp() {
        return new RegExp(this.source, this.flags)
    }
}
const Xe = /[&<>"']/,
    Ye = /[&<>"']/g,
    Ue = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    We = /[<>"']|&(?!#?\w+;)/,
    Ve = /[<>"']|&(?!#?\w+;)/g;

function Je(e, t) {
    if (t) {
        if (Xe.test(e)) return e.replace(Ye, (e => Ue[e]))
    } else if (We.test(e)) return e.replace(Ve, (e => Ue[e]));
    return e
}

function Ze(e) {
    return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, (function(e, t) {
        return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""
    }))
}
var Ke;
! function(e) {
    e[e.space = 1] = "space", e[e.text = 2] = "text", e[e.paragraph = 3] = "paragraph", e[e.heading = 4] = "heading", e[e.listStart = 5] = "listStart", e[e.listEnd = 6] = "listEnd", e[e.looseItemStart = 7] = "looseItemStart", e[e.looseItemEnd = 8] = "looseItemEnd", e[e.listItemStart = 9] = "listItemStart", e[e.listItemEnd = 10] = "listItemEnd", e[e.blockquoteStart = 11] = "blockquoteStart", e[e.blockquoteEnd = 12] = "blockquoteEnd", e[e.code = 13] = "code", e[e.table = 14] = "table", e[e.html = 15] = "html", e[e.hr = 16] = "hr"
}(Ke || (Ke = {}));
class Qe {
    constructor(e) {
        this.options = e || rt.options
    }
    code(e, t, r, s) {
        if (this.options.highlight) {
            const s = this.options.highlight(e, t);
            null != s && s !== e && (r = !0, e = s)
        }
        const n = r ? e : this.options.escape(e, !0);
        if (!t) return `\n<pre><code>${n}\n</code></pre>\n`;
        return `\n<pre><code class="${this.options.langPrefix+this.options.escape(t,!0)}">${n}\n</code></pre>\n`
    }
    blockquote(e) {
        return `<blockquote>\n${e}</blockquote>\n`
    }
    html(e) {
        return e
    }
    heading(e, t, r) {
        return `<h${t} id="${this.options.headerPrefix+r.toLowerCase().replace(/[^\w]+/g,"-")}">${e}</h${t}>\n`
    }
    hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
    }
    list(e, t) {
        const r = t ? "ol" : "ul";
        return `\n<${r}>\n${e}</${r}>\n`
    }
    listitem(e) {
        return "<li>" + e + "</li>\n"
    }
    paragraph(e) {
        return "<p>" + e + "</p>\n"
    }
    table(e, t) {
        return `\n<table>\n<thead>\n${e}</thead>\n<tbody>\n${t}</tbody>\n</table>\n`
    }
    tablerow(e) {
        return "<tr>\n" + e + "</tr>\n"
    }
    tablecell(e, t) {
        const r = t.header ? "th" : "td";
        return (t.align ? "<" + r + ' style="text-align:' + t.align + '">' : "<" + r + ">") + e + "</" + r + ">\n"
    }
    strong(e) {
        return "<strong>" + e + "</strong>"
    }
    em(e) {
        return "<em>" + e + "</em>"
    }
    codespan(e) {
        return "<code>" + e + "</code>"
    }
    br() {
        return this.options.xhtml ? "<br/>" : "<br>"
    }
    del(e) {
        return "<del>" + e + "</del>"
    }
    link(e, t, r) {
        if (this.options.sanitize) {
            let t;
            try {
                t = decodeURIComponent(this.options.unescape(e)).replace(/[^\w:]/g, "").toLowerCase()
            } catch (e) {
                return r
            }
            if (0 === t.indexOf("javascript:") || 0 === t.indexOf("vbscript:") || 0 === t.indexOf("data:")) return r
        }
        let s = '<a href="' + e + '"';
        return t && (s += ' title="' + t + '"'), s += ">" + r + "</a>", s
    }
    image(e, t, r) {
        let s = '<img src="' + e + '" alt="' + r + '"';
        return t && (s += ' title="' + t + '"'), s += this.options.xhtml ? "/>" : ">", s
    }
    text(e) {
        return e
    }
}
class et {
    constructor(e, t, r = rt.options, s) {
        if (this.staticThis = e, this.links = t, this.options = r, this.renderer = s || this.options.renderer || new Qe(this.options), !this.links) throw new Error("InlineLexer requires 'links' parameter.");
        this.setRules()
    }
    static output(e, t, r) {
        return new this(this, t, r).output(e)
    }
    static getRulesBase() {
        if (this.rulesBase) return this.rulesBase;
        const e = {
            escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
            autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
            tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
            link: /^!?\[(inside)\]\(href\)/,
            reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
            nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
            strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
            em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
            code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
            br: /^ {2,}\n(?!\s*$)/,
            text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
            _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
            _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/
        };
        return e.link = new De(e.link).setGroup("inside", e._inside).setGroup("href", e._href).getRegexp(), e.reflink = new De(e.reflink).setGroup("inside", e._inside).getRegexp(), this.rulesBase = e
    }
    static getRulesPedantic() {
        return this.rulesPedantic ? this.rulesPedantic : this.rulesPedantic = Object.assign(Object.assign({}, this.getRulesBase()), {
            strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
        })
    }
    static getRulesGfm() {
        if (this.rulesGfm) return this.rulesGfm;
        const e = this.getRulesBase(),
            t = new De(e.escape).setGroup("])", "~|])").getRegexp(),
            r = new De(e.text).setGroup("]|", "~]|").setGroup("|", "|https?://|").getRegexp();
        return this.rulesGfm = Object.assign(Object.assign({}, e), {
            escape: t,
            url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
            del: /^~~(?=\S)([\s\S]*?\S)~~/,
            text: r
        })
    }
    static getRulesBreaks() {
        if (this.rulesBreaks) return this.rulesBreaks;
        const e = this.getRulesGfm(),
            t = this.getRulesGfm();
        return this.rulesBreaks = Object.assign(Object.assign({}, t), {
            br: new De(e.br).setGroup("{2,}", "*").getRegexp(),
            text: new De(t.text).setGroup("{2,}", "*").getRegexp()
        })
    }
    setRules() {
        this.options.gfm ? this.options.breaks ? this.rules = this.staticThis.getRulesBreaks() : this.rules = this.staticThis.getRulesGfm() : this.options.pedantic ? this.rules = this.staticThis.getRulesPedantic() : this.rules = this.staticThis.getRulesBase(), this.hasRulesGfm = void 0 !== this.rules.url
    }
    output(e) {
        let t, r = "";
        for (; e;)
            if (t = this.rules.escape.exec(e)) e = e.substring(t[0].length), r += t[1];
            else if (t = this.rules.autolink.exec(e)) {
            let s, n;
            e = e.substring(t[0].length), "@" === t[2] ? (s = this.options.escape(":" === t[1].charAt(6) ? this.mangle(t[1].substring(7)) : this.mangle(t[1])), n = this.mangle("mailto:") + s) : (s = this.options.escape(t[1]), n = s), r += this.renderer.link(n, null, s)
        } else if (!this.inLink && this.hasRulesGfm && (t = this.rules.url.exec(e))) {
            let s, n;
            e = e.substring(t[0].length), s = this.options.escape(t[1]), n = s, r += this.renderer.link(n, null, s)
        } else if (t = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(t[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(t[0]) && (this.inLink = !1), e = e.substring(t[0].length), r += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(t[0]) : this.options.escape(t[0]) : t[0];
        else if (t = this.rules.link.exec(e)) e = e.substring(t[0].length), this.inLink = !0, r += this.outputLink(t, {
            href: t[2],
            title: t[3]
        }), this.inLink = !1;
        else if ((t = this.rules.reflink.exec(e)) || (t = this.rules.nolink.exec(e))) {
            e = e.substring(t[0].length);
            const s = (t[2] || t[1]).replace(/\s+/g, " "),
                n = this.links[s.toLowerCase()];
            if (!n || !n.href) {
                r += t[0].charAt(0), e = t[0].substring(1) + e;
                continue
            }
            this.inLink = !0, r += this.outputLink(t, n), this.inLink = !1
        } else if (t = this.rules.strong.exec(e)) e = e.substring(t[0].length), r += this.renderer.strong(this.output(t[2] || t[1]));
        else if (t = this.rules.em.exec(e)) e = e.substring(t[0].length), r += this.renderer.em(this.output(t[2] || t[1]));
        else if (t = this.rules.code.exec(e)) e = e.substring(t[0].length), r += this.renderer.codespan(this.options.escape(t[2].trim(), !0));
        else if (t = this.rules.br.exec(e)) e = e.substring(t[0].length), r += this.renderer.br();
        else if (this.hasRulesGfm && (t = this.rules.del.exec(e))) e = e.substring(t[0].length), r += this.renderer.del(this.output(t[1]));
        else if (t = this.rules.text.exec(e)) e = e.substring(t[0].length), r += this.renderer.text(this.options.escape(this.smartypants(t[0])));
        else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
        return r
    }
    outputLink(e, t) {
        const r = this.options.escape(t.href),
            s = t.title ? this.options.escape(t.title) : null;
        return "!" !== e[0].charAt(0) ? this.renderer.link(r, s, this.output(e[1])) : this.renderer.image(r, s, this.options.escape(e[1]))
    }
    smartypants(e) {
        return this.options.smartypants ? e.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
    }
    mangle(e) {
        if (!this.options.mangle) return e;
        let t = "";
        const r = e.length;
        for (let s = 0; s < r; s++) {
            let r;
            Math.random() > .5 && (r = "x" + e.charCodeAt(s).toString(16)), t += "&#" + r + ";"
        }
        return t
    }
}
et.rulesBase = null, et.rulesPedantic = null, et.rulesGfm = null, et.rulesBreaks = null;
class tt {
    constructor(e) {
        this.simpleRenderers = [], this.line = 0, this.tokens = [], this.token = null, this.options = e || rt.options, this.renderer = this.options.renderer || new Qe(this.options)
    }
    static parse(e, t, r) {
        return new this(r).parse(t, e)
    }
    parse(e, t) {
        this.inlineLexer = new et(et, e, this.options, this.renderer), this.tokens = t.reverse();
        let r = "";
        for (; this.next();) r += this.tok();
        return r
    }
    debug(e, t) {
        this.inlineLexer = new et(et, e, this.options, this.renderer), this.tokens = t.reverse();
        let r = "";
        for (; this.next();) {
            const e = this.tok();
            this.token.line = this.line += e.split("\n").length - 1, r += e
        }
        return r
    }
    next() {
        return this.token = this.tokens.pop()
    }
    getNextElement() {
        return this.tokens[this.tokens.length - 1]
    }
    parseText() {
        let e, t = this.token.text;
        for (;
            (e = this.getNextElement()) && e.type == Ke.text;) t += "\n" + this.next().text;
        return this.inlineLexer.output(t)
    }
    tok() {
        switch (this.token.type) {
            case Ke.space:
                return "";
            case Ke.paragraph:
                return this.renderer.paragraph(this.inlineLexer.output(this.token.text));
            case Ke.text:
                return this.options.isNoP ? this.parseText() : this.renderer.paragraph(this.parseText());
            case Ke.heading:
                return this.renderer.heading(this.inlineLexer.output(this.token.text), this.token.depth, this.token.text);
            case Ke.listStart: {
                let e = "";
                const t = this.token.ordered;
                for (; this.next().type != Ke.listEnd;) e += this.tok();
                return this.renderer.list(e, t)
            }
            case Ke.listItemStart: {
                let e = "";
                for (; this.next().type != Ke.listItemEnd;) e += this.token.type == Ke.text ? this.parseText() : this.tok();
                return this.renderer.listitem(e)
            }
            case Ke.looseItemStart: {
                let e = "";
                for (; this.next().type != Ke.listItemEnd;) e += this.tok();
                return this.renderer.listitem(e)
            }
            case Ke.code:
                return this.renderer.code(this.token.text, this.token.lang, this.token.escaped, this.token.meta);
            case Ke.table: {
                let e, t = "",
                    r = "";
                e = "";
                for (let t = 0; t < this.token.header.length; t++) {
                    const r = {
                            header: !0,
                            align: this.token.align[t]
                        },
                        s = this.inlineLexer.output(this.token.header[t]);
                    e += this.renderer.tablecell(s, r)
                }
                t += this.renderer.tablerow(e);
                for (const t of this.token.cells) {
                    e = "";
                    for (let r = 0; r < t.length; r++) e += this.renderer.tablecell(this.inlineLexer.output(t[r]), {
                        header: !1,
                        align: this.token.align[r]
                    });
                    r += this.renderer.tablerow(e)
                }
                return this.renderer.table(t, r)
            }
            case Ke.blockquoteStart: {
                let e = "";
                for (; this.next().type != Ke.blockquoteEnd;) e += this.tok();
                return this.renderer.blockquote(e)
            }
            case Ke.hr:
                return this.renderer.hr();
            case Ke.html: {
                const e = this.token.pre || this.options.pedantic ? this.token.text : this.inlineLexer.output(this.token.text);
                return this.renderer.html(e)
            }
            default: {
                if (this.simpleRenderers.length)
                    for (let e = 0; e < this.simpleRenderers.length; e++)
                        if (this.token.type == "simpleRule" + (e + 1)) return this.simpleRenderers[e].call(this.renderer, this.token.execArr);
                const e = `Token with "${this.token.type}" type was not found.`;
                if (!this.options.silent) throw new Error(e);
                console.log(e)
            }
        }
    }
}
class rt {
    static setOptions(e) {
        return Object.assign(this.options, e), this
    }
    static setBlockRule(e, t = (() => "")) {
        return st.simpleRules.push(e), this.simpleRenderers.push(t), this
    }
    static parse(e, t = this.options) {
        try {
            const {
                tokens: r,
                links: s
            } = this.callBlockLexer(e, t);
            return this.callParser(r, s, t)
        } catch (e) {
            return this.callMe(e)
        }
    }
    static debug(e, t = this.options) {
        const {
            tokens: r,
            links: s
        } = this.callBlockLexer(e, t);
        let n = r.slice();
        const o = new tt(t);
        o.simpleRenderers = this.simpleRenderers;
        const i = o.debug(s, r);
        return n = n.map((e => {
            e.type = Ke[e.type] || e.type;
            const t = e.line;
            return delete e.line, t ? Object.assign({
                line: t
            }, e) : e
        })), {
            tokens: n,
            links: s,
            result: i
        }
    }
    static callBlockLexer(e = "", t) {
        if ("string" != typeof e) throw new Error(`Expected that the 'src' parameter would have a 'string' type, got '${typeof e}'`);
        return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n").replace(/^ +$/gm, ""), st.lex(e, t, !0)
    }
    static callParser(e, t, r) {
        if (this.simpleRenderers.length) {
            const s = new tt(r);
            return s.simpleRenderers = this.simpleRenderers, s.parse(t, e)
        }
        return tt.parse(e, t, r)
    }
    static callMe(e) {
        if (e.message += "\nPlease report this to https://github.com/ts-stack/markdown", this.options.silent) return "<p>An error occured:</p><pre>" + this.options.escape(e.message + "", !0) + "</pre>";
        throw e
    }
}
rt.options = new class {
    constructor() {
        this.gfm = !0, this.tables = !0, this.breaks = !1, this.pedantic = !1, this.sanitize = !1, this.mangle = !0, this.smartLists = !1, this.silent = !1, this.langPrefix = "lang-", this.smartypants = !1, this.headerPrefix = "", this.xhtml = !1, this.escape = Je, this.unescape = Ze
    }
}, rt.simpleRenderers = [];
class st {
    constructor(e, t) {
        this.staticThis = e, this.links = {}, this.tokens = [], this.options = t || rt.options, this.setRules()
    }
    static lex(e, t, r, s) {
        return new this(this, t).getTokens(e, r, s)
    }
    static getRulesBase() {
        if (this.rulesBase) return this.rulesBase;
        const e = {
            newline: /^\n+/,
            code: /^( {4}[^\n]+\n*)+/,
            hr: /^( *[-*_]){3,} *(?:\n+|$)/,
            heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
            lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
            blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
            list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
            html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
            paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
            text: /^[^\n]+/,
            bullet: /(?:[*+-]|\d+\.)/,
            item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
        };
        e.item = new De(e.item, "gm").setGroup(/bull/g, e.bullet).getRegexp(), e.list = new De(e.list).setGroup(/bull/g, e.bullet).setGroup("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))").setGroup("def", "\\n+(?=" + e.def.source + ")").getRegexp();
        const t = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";
        return e.html = new De(e.html).setGroup("comment", /<!--[\s\S]*?-->/).setGroup("closed", /<(tag)[\s\S]+?<\/\1>/).setGroup("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/).setGroup(/tag/g, t).getRegexp(), e.paragraph = new De(e.paragraph).setGroup("hr", e.hr).setGroup("heading", e.heading).setGroup("lheading", e.lheading).setGroup("blockquote", e.blockquote).setGroup("tag", "<" + t).setGroup("def", e.def).getRegexp(), this.rulesBase = e
    }
    static getRulesGfm() {
        if (this.rulesGfm) return this.rulesGfm;
        const e = this.getRulesBase(),
            t = Object.assign(Object.assign({}, e), {
                fences: /^ *(`{3,}|~{3,})[ \.]*((\S+)? *[^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
                paragraph: /^/,
                heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
            }),
            r = t.fences.source.replace("\\1", "\\2"),
            s = e.list.source.replace("\\1", "\\3");
        return t.paragraph = new De(e.paragraph).setGroup("(?!", `(?!${r}|${s}|`).getRegexp(), this.rulesGfm = t
    }
    static getRulesTable() {
        return this.rulesTables ? this.rulesTables : this.rulesTables = Object.assign(Object.assign({}, this.getRulesGfm()), {
            nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
            table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
        })
    }
    setRules() {
        this.options.gfm ? this.options.tables ? this.rules = this.staticThis.getRulesTable() : this.rules = this.staticThis.getRulesGfm() : this.rules = this.staticThis.getRulesBase(), this.hasRulesGfm = void 0 !== this.rules.fences, this.hasRulesTables = void 0 !== this.rules.table
    }
    getTokens(e, t, r) {
        let s, n = e;
        e: for (; n;)
            if ((s = this.rules.newline.exec(n)) && (n = n.substring(s[0].length), s[0].length > 1 && this.tokens.push({
                    type: Ke.space
                })), s = this.rules.code.exec(n)) {
                n = n.substring(s[0].length);
                const e = s[0].replace(/^ {4}/gm, "");
                this.tokens.push({
                    type: Ke.code,
                    text: this.options.pedantic ? e : e.replace(/\n+$/, "")
                })
            } else if (this.hasRulesGfm && (s = this.rules.fences.exec(n))) n = n.substring(s[0].length), this.tokens.push({
            type: Ke.code,
            meta: s[2],
            lang: s[3],
            text: s[4] || ""
        });
        else if (s = this.rules.heading.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ke.heading,
            depth: s[1].length,
            text: s[2]
        });
        else if (t && this.hasRulesTables && (s = this.rules.nptable.exec(n))) {
            n = n.substring(s[0].length);
            const e = {
                type: Ke.table,
                header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: []
            };
            for (let t = 0; t < e.align.length; t++) /^ *-+: *$/.test(e.align[t]) ? e.align[t] = "right" : /^ *:-+: *$/.test(e.align[t]) ? e.align[t] = "center" : /^ *:-+ *$/.test(e.align[t]) ? e.align[t] = "left" : e.align[t] = null;
            const t = s[3].replace(/\n$/, "").split("\n");
            for (let r = 0; r < t.length; r++) e.cells[r] = t[r].split(/ *\| */);
            this.tokens.push(e)
        } else if (s = this.rules.lheading.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ke.heading,
            depth: "=" === s[2] ? 1 : 2,
            text: s[1]
        });
        else if (s = this.rules.hr.exec(n)) n = n.substring(s[0].length), this.tokens.push({
            type: Ke.hr
        });
        else if (s = this.rules.blockquote.exec(n)) {
            n = n.substring(s[0].length), this.tokens.push({
                type: Ke.blockquoteStart
            });
            const e = s[0].replace(/^ *> ?/gm, "");
            this.getTokens(e), this.tokens.push({
                type: Ke.blockquoteEnd
            })
        } else if (s = this.rules.list.exec(n)) {
            n = n.substring(s[0].length);
            const e = s[2];
            this.tokens.push({
                type: Ke.listStart,
                ordered: e.length > 1
            });
            const t = s[0].match(this.rules.item),
                o = t.length;
            let i, a, l, c = !1;
            for (let s = 0; s < o; s++) {
                let u = t[s];
                i = u.length, u = u.replace(/^ *([*+-]|\d+\.) +/, ""), -1 !== u.indexOf("\n ") && (i -= u.length, u = this.options.pedantic ? u.replace(/^ {1,4}/gm, "") : u.replace(new RegExp("^ {1," + i + "}", "gm"), "")), this.options.smartLists && s !== o - 1 && (a = this.staticThis.getRulesBase().bullet.exec(t[s + 1])[0], e === a || e.length > 1 && a.length > 1 || (n = t.slice(s + 1).join("\n") + n, s = o - 1)), l = c || /\n\n(?!\s*$)/.test(u), s !== o - 1 && (c = "\n" === u.charAt(u.length - 1), l || (l = c)), this.tokens.push({
                    type: l ? Ke.looseItemStart : Ke.listItemStart
                }), this.getTokens(u, !1, r), this.tokens.push({
                    type: Ke.listItemEnd
                })
            }
            this.tokens.push({
                type: Ke.listEnd
            })
        } else if (s = this.rules.html.exec(n)) {
            n = n.substring(s[0].length);
            const e = s[1],
                t = "pre" === e || "script" === e || "style" === e;
            this.tokens.push({
                type: this.options.sanitize ? Ke.paragraph : Ke.html,
                pre: !this.options.sanitizer && t,
                text: s[0]
            })
        } else if (t && (s = this.rules.def.exec(n))) n = n.substring(s[0].length), this.links[s[1].toLowerCase()] = {
            href: s[2],
            title: s[3]
        };
        else if (t && this.hasRulesTables && (s = this.rules.table.exec(n))) {
            n = n.substring(s[0].length);
            const e = {
                type: Ke.table,
                header: s[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
                align: s[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                cells: []
            };
            for (let t = 0; t < e.align.length; t++) /^ *-+: *$/.test(e.align[t]) ? e.align[t] = "right" : /^ *:-+: *$/.test(e.align[t]) ? e.align[t] = "center" : /^ *:-+ *$/.test(e.align[t]) ? e.align[t] = "left" : e.align[t] = null;
            const t = s[3].replace(/(?: *\| *)?\n$/, "").split("\n");
            for (let r = 0; r < t.length; r++) e.cells[r] = t[r].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
            this.tokens.push(e)
        } else {
            if (this.staticThis.simpleRules.length) {
                const e = this.staticThis.simpleRules;
                for (let t = 0; t < e.length; t++)
                    if (s = e[t].exec(n)) {
                        n = n.substring(s[0].length);
                        const e = "simpleRule" + (t + 1);
                        this.tokens.push({
                            type: e,
                            execArr: s
                        });
                        continue e
                    }
            }
            if (t && (s = this.rules.paragraph.exec(n))) n = n.substring(s[0].length), "\n" === s[1].slice(-1) ? this.tokens.push({
                type: Ke.paragraph,
                text: s[1].slice(0, -1)
            }) : this.tokens.push({
                type: this.tokens.length > 0 ? Ke.paragraph : Ke.text,
                text: s[1]
            });
            else if (s = this.rules.text.exec(n)) n = n.substring(s[0].length), this.tokens.push({
                type: Ke.text,
                text: s[0]
            });
            else if (n) throw new Error("Infinite loop on byte: " + n.charCodeAt(0) + `, near text '${n.slice(0,30)}...'`)
        }
        return {
            tokens: this.tokens,
            links: this.links
        }
    }
}
st.simpleRules = [], st.rulesBase = null, st.rulesGfm = null, st.rulesTables = null;
const nt = oe('<div class="flex justify-end mb-2 items-end animate-fade-in guest-container"><span class="px-4 py-2 mr-2 whitespace-pre-wrap max-w-full chatbot-guest-bubble" data-testid="guest-bubble">');
rt.setOptions({
    isNoP: !0
});
const ot = e => {
        let t;
        return A((() => {
            t && (t.innerHTML = rt.parse(e.message))
        })), (() => {
            const r = nt(),
                s = r.firstChild;
            r.style.setProperty("margin-left", "50px");
            return "function" == typeof t ? ue(t, s) : t = s, s.style.setProperty("border-radius", "6px"), he(r, D(Z, {
                get when() {
                    return e.showAvatar
                },
                get children() {
                    return D(He, {
                        get initialAvatarSrc() {
                            return e.avatarSrc
                        }
                    })
                }
            }), null), _((t => {
                const r = e.backgroundColor ?? "#3B81F6",
                    n = e.textColor ?? "#ffffff";
                return r !== t._v$ && (null != (t._v$ = r) ? s.style.setProperty("background-color", r) : s.style.removeProperty("background-color")), n !== t._v$2 && (null != (t._v$2 = n) ? s.style.setProperty("color", n) : s.style.removeProperty("color")), t
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        })()
    },
    it = oe('<div class="flex justify-start mb-2 items-start animate-fade-in host-container"><span class="px-4 py-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">');
rt.setOptions({
    isNoP: !0
});
const at = e => {
        let t;
        return A((() => {
            t && (console.log(rt.parse(e.message)), t.innerHTML = rt.parse(e.message))
        })), (() => {
            const r = it(),
                s = r.firstChild;
            r.style.setProperty("margin-right", "50px"), he(r, D(Z, {
                get when() {
                    return e.showAvatar
                },
                get children() {
                    return D(He, {
                        get initialAvatarSrc() {
                            return e.avatarSrc
                        }
                    })
                }
            }), s);
            return "function" == typeof t ? ue(t, s) : t = s, s.style.setProperty("border-radius", "6px"), _((t => {
                const r = e.backgroundColor ?? "#f7f8ff",
                    n = e.textColor ?? "#303235";
                return r !== t._v$ && (null != (t._v$ = r) ? s.style.setProperty("background-color", r) : s.style.removeProperty("background-color")), n !== t._v$2 && (null != (t._v$2 = n) ? s.style.setProperty("color", n) : s.style.removeProperty("color")), t
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        })()
    },
    lt = oe('<div class="flex items-center"><div class="w-2 h-2 mr-1 rounded-full bubble1"></div><div class="w-2 h-2 mr-1 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'),
    ct = () => lt(),
    ut = oe('<div class="flex justify-start mb-2 items-start animate-fade-in host-container"><span class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'),
    ht = () => (() => {
        const e = ut();
        return he(e.firstChild, D(ct, {})), e
    })(),
    pt = oe('<span>Powered by<a href="https://ayvo.app" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span> Ayvo'),
    dt = "#303235",
    gt = e => {
        let t, r;
        const s = r => {
            r.forEach((r => {
                r.removedNodes.forEach((r => {
                    "id" in r && t && "lite-badge" == r.id && (console.log("Sorry, you can't remove the brand 😅"), e.botContainer?.append(t))
                }))
            }))
        };
        return A((() => {
            document && e.botContainer && (r = new MutationObserver(s), r.observe(e.botContainer, {
                subtree: !1,
                childList: !0
            }))
        })), j((() => {
            r && r.disconnect()
        })), (() => {
            const r = pt(),
                s = r.firstChild.nextSibling;
            r.style.setProperty("font-size", "13px"), r.style.setProperty("position", "absolute"), r.style.setProperty("bottom", "10px"), r.style.setProperty("margin", "auto");
            return "function" == typeof t ? ue(t, s) : t = s, s.style.setProperty("font-weight", "bold"), _((t => {
                const n = e.poweredByTextColor ?? dt,
                    o = e.poweredByTextColor ?? dt;
                return n !== t._v$ && (null != (t._v$ = n) ? r.style.setProperty("color", n) : r.style.removeProperty("color")), o !== t._v$2 && (null != (t._v$2 = o) ? s.style.setProperty("color", o) : s.style.removeProperty("color")), t
            }), {
                _v$: void 0,
                _v$2: void 0
            }), r
        })()
    },
    ft = oe('<div><div class="flex w-full h-full justify-center"><div class="overflow-y-scroll w-full min-h-full px-3 pt-10 pb-20 relative scrollable-container chatbot-chat-view scroll-smooth">'),
    bt = oe('<div class="w-full h-32">'),
    wt = "Hi there! How can I help?",
    mt = e => {
        let t, r, s;
        const [n, o] = $(""), [i, a] = $(!1), [l, c] = $([{
            message: e.welcomeMessage ?? wt,
            type: "apiMessage"
        }]);
        A((() => {
            r && setTimeout((() => {
                t?.scrollTo(0, t.scrollHeight)
            }), 50)
        }));
        const u = () => {
                setTimeout((() => {
                    t?.scrollTo(0, t.scrollHeight)
                }), 50)
            },
            h = async t => {
                if (o(t), "" === t.trim()) return;
                a(!0), c((e => [...e, {
                    message: t,
                    type: "userMessage"
                }])), u();
                const {
                    data: r,
                    error: s
                } = await Ce({
                    chatflowid: e.chatflowid,
                    apiHost: e.apiHost,
                    body: {
                        question: t,
                        history: l().filter((t => t.message !== e.welcomeMessage ?? wt))
                    }
                });
                if (r && (c((e => [...e, {
                        message: r,
                        type: "apiMessage"
                    }])), a(!1), o(""), u()), s) {
                    console.error(s);
                    const e = s;
                    ((e = "Oops! There seems to be an error. Please try again.") => {
                        c((t => [...t, {
                            message: e,
                            type: "apiMessage"
                        }])), a(!1), o(""), u()
                    })(e.response.data || `${e.response.status}: ${e.response.statusText}`)
                } else;
            };
        return S((() => {
            u()
        })), S((() => () => {
            o(""), a(!1), c([{
                message: e.welcomeMessage ?? wt,
                type: "apiMessage"
            }])
        })), (() => {
            const o = ft(),
                a = o.firstChild,
                c = a.firstChild;
            "function" == typeof s ? ue(s, o) : s = o;
            return "function" == typeof t ? ue(t, c) : t = c, he(c, D(J, {
                get each() {
                    return [...l()]
                },
                children: (t, r) => [C((() => {
                    const r = C((() => "userMessage" === t.type));
                    return () => r() && D(ot, {
                        get message() {
                            return t.message
                        },
                        get backgroundColor() {
                            return e.userMessage?.backgroundColor
                        },
                        get textColor() {
                            return e.userMessage?.textColor
                        },
                        get showAvatar() {
                            return e.userMessage?.showAvatar
                        },
                        get avatarSrc() {
                            return e.userMessage?.avatarSrc
                        }
                    })
                })()), C((() => {
                    const r = C((() => "apiMessage" === t.type));
                    return () => r() && D(at, {
                        get message() {
                            return t.message
                        },
                        get backgroundColor() {
                            return e.botMessage?.backgroundColor
                        },
                        get textColor() {
                            return e.botMessage?.textColor
                        },
                        get showAvatar() {
                            return e.botMessage?.showAvatar
                        },
                        get avatarSrc() {
                            return e.botMessage?.avatarSrc
                        }
                    })
                })()), C((() => {
                    const e = C((() => !("userMessage" !== t.type || !i() || r() !== l().length - 1)));
                    return () => e() && D(ht, {})
                })())]
            })), he(a, D(Ge, {
                get backgroundColor() {
                    return e.textInput?.backgroundColor
                },
                get textColor() {
                    return e.textInput?.textColor
                },
                get placeholder() {
                    return e.textInput?.placeholder
                },
                get sendButtonColor() {
                    return e.textInput?.sendButtonColor
                },
                get defaultValue() {
                    return n()
                },
                onSubmit: h
            }), null), he(o, D(gt, {
                get poweredByTextColor() {
                    return e.poweredByTextColor
                },
                botContainer: s
            }), null), he(o, D(yt, {
                ref(e) {
                    "function" == typeof r ? r(e) : r = e
                }
            }), null), _((() => le(o, "relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center chatbot-container " + e.class))), o
        })()
    },
    yt = e => (() => {
        const t = bt(),
            r = e.ref;
        return "function" == typeof r ? ue(r, t) : e.ref = t, t
    })(),
    vt = oe("<style>"),
    xt = oe('<div part="bot">'),
    kt = e => {
        const t = document.createElement("flowise-chatbot");
        Object.assign(t, e), document.body.appendChild(t)
    };
"undefined" != typeof window && function(e, t, r) {
    2 === arguments.length && (r = t, t = {}), l(e, t)(ye(r))
}("flowise-chatbot", ve, (e => {
    const [t] = V(e, ["theme"]), [r, s] = $(!1), [n, o] = $(!1), [i, a] = $("700"), [l, c] = $("400");
    A((() => {
        t.theme?.chatWindow?.height && a(t.theme?.chatWindow?.height?.toString()), t.theme?.chatWindow?.width && c(t.theme?.chatWindow?.width?.toString())
    }));
    return [(() => {
        const e = vt();
        return he(e, '/*! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.left-0{left:0}.top-0{top:0}.my-2{margin-bottom:8px;margin-top:8px}.-ml-1{margin-left:-4px}.mb-2{margin-bottom:8px}.ml-2{margin-left:8px}.mr-1{margin-right:4px}.mr-2{margin-right:8px}.mr-3{margin-right:12px}.flex{display:flex}.hidden{display:none}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-32{height:128px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-9{height:36px}.h-full{height:100%}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-9{width:36px}.w-full{width:100%}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.overflow-hidden{overflow:hidden}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.border{border-width:1px}.bg-transparent{background-color:transparent}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.pb-20{padding-bottom:80px}.pr-2{padding-right:8px}.pt-10{padding-top:40px}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-semibold{font-weight:600}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--chatbot-container-bg-image:none;--chatbot-container-bg-color:transparent;--chatbot-container-font-family:"Open Sans";--chatbot-button-bg-color:#0042da;--chatbot-button-color:#fff;--chatbot-host-bubble-bg-color:#f7f8ff;--chatbot-host-bubble-color:#303235;--chatbot-guest-bubble-bg-color:#3b81f6;--chatbot-guest-bubble-color:#fff;--chatbot-input-bg-color:#fff;--chatbot-input-color:#303235;--chatbot-input-placeholder-color:#9095a0;--chatbot-header-bg-color:#fff;--chatbot-header-color:#303235;--chatbot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}a{color:#16bed7;font-weight:500}a:hover{text-decoration:underline}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--chatbot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(0)}50%{transform:translateY(-5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:#9095a0!important;opacity:1!important}.text-input::placeholder{color:#9095a0!important;opacity:1!important}.chatbot-container{background-color:var(--chatbot-container-bg-color);background-image:var(--chatbot-container-bg-image);font-family:Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.chatbot-button{background-color:#0042da;border:1px solid #0042da;border-radius:var(--chatbot-border-radius);color:var(--chatbot-button-color)}.chatbot-button.selectable{border:1px solid #0042da}.chatbot-button.selectable,.chatbot-host-bubble{background-color:#f7f8ff;color:var(--chatbot-host-bubble-color)}.chatbot-host-bubble>.bubble-typing{background-color:#f7f8ff;border:var(--chatbot-host-bubble-border);border-radius:6px}.chatbot-host-bubble iframe,.chatbot-host-bubble img,.chatbot-host-bubble video{border-radius:var(--chatbot-border-radius)}.chatbot-guest-bubble{background-color:#3b81f6;border-radius:6px;color:var(--chatbot-guest-bubble-color)}.chatbot-input{background-color:#fff;border-radius:var(--chatbot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1);color:#303235}.chatbot-input-error-message{color:#303235}.chatbot-button>.send-icon{fill:var(--chatbot-button-color)}.chatbot-chat-view{max-width:800px}.ping span{background-color:#0042da}.rating-icon-container svg{stroke:#0042da;fill:#f7f8ff;height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:#0042da}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{background-color:#0042da;border-radius:var(--chatbot-border-radius)}.total-files-indicator{background-color:#0042da;color:var(--chatbot-button-color);font-size:10px}.chatbot-upload-input{transition:border-color .1s ease-out}.chatbot-upload-input.dragging-over{border-color:#0042da}.secondary-button{background-color:#f7f8ff;border-radius:var(--chatbot-border-radius);color:var(--chatbot-host-bubble-color)}.chatbot-country-select{color:#303235}.chatbot-country-select,.chatbot-date-input{background-color:#fff;border-radius:var(--chatbot-border-radius)}.chatbot-date-input{color:#303235;color-scheme:light}.chatbot-popup-blocked-toast{border-radius:var(--chatbot-border-radius)}.messagelist{border-radius:.5rem;height:100%;overflow-y:scroll;width:100%}.messagelistloading{display:flex;justify-content:center;margin-top:1rem;width:100%}.usermessage{padding:1rem 1.5rem}.usermessagewaiting-light{background:linear-gradient(270deg,#ede7f6,#e3f2fd,#ede7f6);background-position:-100% 0;background-size:200% 200%}.usermessagewaiting-dark,.usermessagewaiting-light{animation:loading-gradient 2s ease-in-out infinite;animation-direction:alternate;animation-name:loading-gradient;padding:1rem 1.5rem}.usermessagewaiting-dark{background:linear-gradient(270deg,#2e2352,#1d3d60,#2e2352);background-position:-100% 0;background-size:200% 200%;color:#ececf1}@keyframes loading-gradient{0%{background-position:-100% 0}to{background-position:100% 0}}.apimessage{animation:fadein .5s;padding:1rem 1.5rem}@keyframes fadein{0%{opacity:0}to{opacity:1}}.apimessage,.usermessage,.usermessagewaiting{display:flex}.markdownanswer{line-height:1.75}.markdownanswer a:hover{opacity:.8}.markdownanswer a{color:#16bed7;font-weight:500}.markdownanswer code{color:#15cb19;font-weight:500;white-space:pre-wrap!important}.markdownanswer ol,.markdownanswer ul{margin:1rem}.boticon,.usericon{border-radius:1rem;margin-right:1rem}.markdownanswer h1,.markdownanswer h2,.markdownanswer h3{font-size:inherit}.center{flex-direction:column;padding:10px;position:relative}.center,.cloud{align-items:center;display:flex;justify-content:center}.cloud{border-radius:.5rem;height:calc(100% - 50px);width:400px}input{background-color:transparent;border:none;font-family:Poppins,sans-serif;padding:10px}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}}'), e
    })(), D(Se, W((() => t.theme?.button), {
        toggleBot: () => {
            r() ? s(!1) : (n() || o(!0), s(!0))
        },
        get isBotOpened() {
            return r()
        }
    })), (() => {
        const s = xt();
        return s.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"), s.style.setProperty("transform-origin", "bottom right"), s.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"), s.style.setProperty("z-index", "42424242"), he(s, D(Z, {
            get when() {
                return n()
            },
            get children() {
                return D(mt, {
                    get welcomeMessage() {
                        return t.theme?.chatWindow?.welcomeMessage
                    },
                    get poweredByTextColor() {
                        return t.theme?.chatWindow?.poweredByTextColor
                    },
                    get textInput() {
                        return t.theme?.chatWindow?.textInput
                    },
                    get botMessage() {
                        return t.theme?.chatWindow?.botMessage
                    },
                    get userMessage() {
                        return t.theme?.chatWindow?.userMessage
                    },
                    get chatflowid() {
                        return e.chatflowid
                    },
                    get apiHost() {
                        return e.apiHost
                    }
                })
            }
        })), _((n => {
            const o = `${i()}px`,
                a = `${l()}px`,
                c = r() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
                u = t.theme?.chatWindow?.backgroundColor || "#ffffff",
                h = `fixed sm:right-5 rounded-lg w-full sm:w-[${l()}px] max-h-[${i()}px]` + (r() ? " opacity-1" : " opacity-0 pointer-events-none") + ("large" === e.theme?.button?.size ? " bottom-24" : " bottom-20");
            return o !== n._v$ && (null != (n._v$ = o) ? s.style.setProperty("height", o) : s.style.removeProperty("height")), a !== n._v$2 && (null != (n._v$2 = a) ? s.style.setProperty("width", a) : s.style.removeProperty("width")), c !== n._v$3 && (null != (n._v$3 = c) ? s.style.setProperty("transform", c) : s.style.removeProperty("transform")), u !== n._v$4 && (null != (n._v$4 = u) ? s.style.setProperty("background-color", u) : s.style.removeProperty("background-color")), h !== n._v$5 && le(s, n._v$5 = h), n
        }), {
            _v$: void 0,
            _v$2: void 0,
            _v$3: void 0,
            _v$4: void 0,
            _v$5: void 0
        }), s
    })()]
}));
const $t = {
    init: kt
};
var _t;
_t = $t, "undefined" != typeof window && (window.Chatbot = {
    ..._t
});
export {
    $t as
    default
};
