function t(t) {
	return Object.keys(t).reduce(((e, r) => {
		const n = t[r];
		var a;
		return e[r] = Object.assign({}, n), o(n.value) && (a = n.value, "[object Function]" !== Object.prototype.toString.call(a)) && !Array.isArray(n.value) && (e[r].value = Object.assign({}, n.value)), Array.isArray(n.value) && (e[r].value = n.value.slice(0)), e
	}), {})
}

function e(t) {
	if (t) try {
		return JSON.parse(t)
	} catch (e) {
		return t
	}
}

function r(t, e, r) {
	if (null == r || !1 === r) return t.removeAttribute(e);
	let o = JSON.stringify(r);
	t.__updating[e] = !0, "true" === o && (o = ""), t.setAttribute(e, o), Promise.resolve().then((() => delete t.__updating[e]))
}

function o(t) {
	return null != t && ("object" == typeof t || "function" == typeof t)
}
let n;

function a(o, a) {
	const s = Object.keys(a);
	return class extends o {
		static get observedAttributes() {
			return s.map((t => a[t].attribute))
		}
		constructor() {
			super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {}
		}
		connectedCallback() {
			if (this.__initialized) return;
			this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = function(o, n) {
				const a = t(n);
				return Object.keys(n).forEach((t => {
					const n = a[t],
						s = o.getAttribute(n.attribute),
						i = o[t];
					s && (n.value = n.parse ? e(s) : s), null != i && (n.value = Array.isArray(i) ? i.slice(0) : i), n.reflect && r(o, n.attribute, n.value), Object.defineProperty(o, t, {
						get: () => n.value,
						set(e) {
							const o = n.value;
							n.value = e, n.reflect && r(this, n.attribute, n.value);
							for (let r = 0, n = this.__propertyChangedCallbacks.length; r < n; r++) this.__propertyChangedCallbacks[r](t, e, o)
						},
						enumerable: !0,
						configurable: !0
					})
				})), a
			}(this, a);
			const o = function(t) {
					return Object.keys(t).reduce(((e, r) => (e[r] = t[r].value, e)), {})
				}(this.props),
				s = this.Component,
				i = n;
			try {
				n = this, this.__initialized = !0, "function" == typeof(l = s) && 0 === l.toString().indexOf("class") ? new s(o, {
					element: this
				}) : s(o, {
					element: this
				})
			} finally {
				n = i
			}
			var l
		}
		async disconnectedCallback() {
			if (await Promise.resolve(), this.isConnected) return;
			this.__propertyChangedCallbacks.length = 0;
			let t = null;
			for (; t = this.__releaseCallbacks.pop();) t(this);
			delete this.__initialized, this.__released = !0
		}
		attributeChangedCallback(t, r, o) {
			if (this.__initialized && !this.__updating[t] && (t = this.lookupProp(t)) in a) {
				if (null == o && !this[t]) return;
				this[t] = a[t].parse ? e(o) : o
			}
		}
		lookupProp(t) {
			if (a) return s.find((e => t === e || t === a[e].attribute))
		}
		get renderRoot() {
			return this.shadowRoot || this.attachShadow({
				mode: "open"
			})
		}
		addReleaseCallback(t) {
			this.__releaseCallbacks.push(t)
		}
		addPropertyChangedCallback(t) {
			this.__propertyChangedCallbacks.push(t)
		}
	}
}

function s(t, e = {}, r = {}) {
	const {
		BaseElement: n = HTMLElement,
		extension: s
	} = r;
	return r => {
		if (!t) throw new Error("tag is required to register a Component");
		let i = customElements.get(t);
		return i ? (i.prototype.Component = r, i) : (i = a(n, function(t) {
			return t ? Object.keys(t).reduce(((e, r) => {
				const n = t[r];
				return e[r] = o(n) && "value" in n ? n : {
					value: n
				}, e[r].attribute || (e[r].attribute = r.replace(/\.?([A-Z]+)/g, ((t, e) => "-" + e.toLowerCase())).replace("_", "-").replace(/^-/, "")), e[r].parse = "parse" in e[r] ? e[r].parse : "string" != typeof e[r].value, e
			}), {}) : {}
		}(e)), i.prototype.Component = r, i.prototype.registeredTag = t, customElements.define(t, i, s), i)
	}
}
const i = Symbol("solid-proxy"),
	l = Symbol("solid-track"),
	c = {
		equals: (t, e) => t === e
	};
let u = N;
const d = 1,
	p = 2,
	f = {
		owned: null,
		cleanups: null,
		context: null,
		owner: null
	};
var h = null;
let b = null,
	w = null,
	g = null,
	y = null,
	m = 0;

function v(t, e) {
	const r = w,
		o = h,
		n = 0 === t.length,
		a = n ? f : {
			owned: null,
			cleanups: null,
			context: null,
			owner: void 0 === e ? o : e
		},
		s = n ? t : () => t((() => C((() => L(a)))));
	h = a, w = null;
	try {
		return O(s, !0)
	} finally {
		w = r, h = o
	}
}

function x(t, e) {
	const r = {
		value: t,
		observers: null,
		observerSlots: null,
		comparator: (e = e ? Object.assign({}, c, e) : c).equals || void 0
	};
	return [S.bind(r), t => ("function" == typeof t && (t = t(r.value)), P(r, t))]
}

function k(t, e, r) {
	A(j(t, e, !1, d))
}

function _(t, e, r) {
	u = M;
	const o = j(t, e, !1, d);
	o.user = !0, y ? y.push(o) : A(o)
}

function $(t, e, r) {
	r = r ? Object.assign({}, c, r) : c;
	const o = j(t, e, !0, 0);
	return o.observers = null, o.observerSlots = null, o.comparator = r.equals || void 0, A(o), S.bind(o)
}

function C(t) {
	if (null === w) return t();
	const e = w;
	w = null;
	try {
		return t()
	} finally {
		w = e
	}
}

function S() {
	if (this.sources && this.state)
		if (this.state === d) A(this);
		else {
			const t = g;
			g = null, O((() => T(this)), !1), g = t
		} if (w) {
		const t = this.observers ? this.observers.length : 0;
		w.sources ? (w.sources.push(this), w.sourceSlots.push(t)) : (w.sources = [this], w.sourceSlots = [t]), this.observers ? (this.observers.push(w), this.observerSlots.push(w.sources.length - 1)) : (this.observers = [w], this.observerSlots = [w.sources.length - 1])
	}
	return this.value
}

function P(t, e, r) {
	let o = t.value;
	return t.comparator && t.comparator(o, e) || (t.value = e, t.observers && t.observers.length && O((() => {
		for (let e = 0; e < t.observers.length; e += 1) {
			const r = t.observers[e],
				o = b && b.running;
			o && b.disposed.has(r), (o ? r.tState : r.state) || (r.pure ? g.push(r) : y.push(r), r.observers && E(r)), o || (r.state = d)
		}
		if (g.length > 1e6) throw g = [], new Error
	}), !1)), e
}

function A(t) {
	if (!t.fn) return;
	L(t);
	const e = h,
		r = w,
		o = m;
	w = h = t,
		function(t, e, r) {
			let o;
			try {
				o = t.fn(e)
			} catch (e) {
				return t.pure && (t.state = d, t.owned && t.owned.forEach(L), t.owned = null), t.updatedAt = r + 1, I(e)
			}(!t.updatedAt || t.updatedAt <= r) && (null != t.updatedAt && "observers" in t ? P(t, o) : t.value = o, t.updatedAt = r)
		}(t, t.value, o), w = r, h = e
}

function j(t, e, r, o = d, n) {
	const a = {
		fn: t,
		state: o,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: e,
		owner: h,
		context: null,
		pure: r
	};
	return null === h || h !== f && (h.owned ? h.owned.push(a) : h.owned = [a]), a
}

function z(t) {
	if (0 === t.state) return;
	if (t.state === p) return T(t);
	if (t.suspense && C(t.suspense.inFallback)) return t.suspense.effects.push(t);
	const e = [t];
	for (;
		(t = t.owner) && (!t.updatedAt || t.updatedAt < m);) t.state && e.push(t);
	for (let r = e.length - 1; r >= 0; r--)
		if ((t = e[r]).state === d) A(t);
		else if (t.state === p) {
		const r = g;
		g = null, O((() => T(t, e[0])), !1), g = r
	}
}

function O(t, e) {
	if (g) return t();
	let r = !1;
	e || (g = []), y ? r = !0 : y = [], m++;
	try {
		const e = t();
		return function(t) {
			g && (N(g), g = null);
			if (t) return;
			const e = y;
			y = null, e.length && O((() => u(e)), !1)
		}(r), e
	} catch (t) {
		r || (y = null), g = null, I(t)
	}
}

function N(t) {
	for (let e = 0; e < t.length; e++) z(t[e])
}

function M(t) {
	let e, r = 0;
	for (e = 0; e < t.length; e++) {
		const o = t[e];
		o.user ? t[r++] = o : z(o)
	}
	for (e = 0; e < r; e++) z(t[e])
}

function T(t, e) {
	t.state = 0;
	for (let r = 0; r < t.sources.length; r += 1) {
		const o = t.sources[r];
		if (o.sources) {
			const t = o.state;
			t === d ? o !== e && (!o.updatedAt || o.updatedAt < m) && z(o) : t === p && T(o, e)
		}
	}
}

function E(t) {
	for (let e = 0; e < t.observers.length; e += 1) {
		const r = t.observers[e];
		r.state || (r.state = p, r.pure ? g.push(r) : y.push(r), r.observers && E(r))
	}
}

function L(t) {
	let e;
	if (t.sources)
		for (; t.sources.length;) {
			const e = t.sources.pop(),
				r = t.sourceSlots.pop(),
				o = e.observers;
			if (o && o.length) {
				const t = o.pop(),
					n = e.observerSlots.pop();
				r < o.length && (t.sourceSlots[n] = r, o[r] = t, e.observerSlots[r] = n)
			}
		}
	if (t.owned) {
		for (e = t.owned.length - 1; e >= 0; e--) L(t.owned[e]);
		t.owned = null
	}
	if (t.cleanups) {
		for (e = t.cleanups.length - 1; e >= 0; e--) t.cleanups[e]();
		t.cleanups = null
	}
	t.state = 0, t.context = null
}

function I(t) {
	throw t
}
const B = Symbol("fallback");

function H(t) {
	for (let e = 0; e < t.length; e++) t[e]()
}

function X(t, e, r = {}) {
	let o = [],
		n = [],
		a = [],
		s = 0,
		i = e.length > 1 ? [] : null;
	var c;
	return c = () => H(a), null === h || (null === h.cleanups ? h.cleanups = [c] : h.cleanups.push(c)), () => {
		let c, u, d = t() || [];
		return d[l], C((() => {
			let t, e, l, f, h, b, w, g, y, m = d.length;
			if (0 === m) 0 !== s && (H(a), a = [], o = [], n = [], s = 0, i && (i = [])), r.fallback && (o = [B], n[0] = v((t => (a[0] = t, r.fallback()))), s = 1);
			else if (0 === s) {
				for (n = new Array(m), u = 0; u < m; u++) o[u] = d[u], n[u] = v(p);
				s = m
			} else {
				for (l = new Array(m), f = new Array(m), i && (h = new Array(m)), b = 0, w = Math.min(s, m); b < w && o[b] === d[b]; b++);
				for (w = s - 1, g = m - 1; w >= b && g >= b && o[w] === d[g]; w--, g--) l[g] = n[w], f[g] = a[w], i && (h[g] = i[w]);
				for (t = new Map, e = new Array(g + 1), u = g; u >= b; u--) y = d[u], c = t.get(y), e[u] = void 0 === c ? -1 : c, t.set(y, u);
				for (c = b; c <= w; c++) y = o[c], u = t.get(y), void 0 !== u && -1 !== u ? (l[u] = n[c], f[u] = a[c], i && (h[u] = i[c]), u = e[u], t.set(y, u)) : a[c]();
				for (u = b; u < m; u++) u in l ? (n[u] = l[u], a[u] = f[u], i && (i[u] = h[u], i[u](u))) : n[u] = v(p);
				n = n.slice(0, s = m), o = d.slice(0)
			}
			return n
		}));

		function p(t) {
			if (a[u] = t, i) {
				const [t, r] = x(u);
				return i[u] = r, e(d[u], t)
			}
			return e(d[u])
		}
	}
}

function R(t, e) {
	return C((() => t(e || {})))
}

function U() {
	return !0
}
const D = {
	get: (t, e, r) => e === i ? r : t.get(e),
	has: (t, e) => e === i || t.has(e),
	set: U,
	deleteProperty: U,
	getOwnPropertyDescriptor: (t, e) => ({
		configurable: !0,
		enumerable: !0,
		get: () => t.get(e),
		set: U,
		deleteProperty: U
	}),
	ownKeys: t => t.keys()
};

function Y(t) {
	return (t = "function" == typeof t ? t() : t) ? t : {}
}

function q(...t) {
	let e = !1;
	for (let r = 0; r < t.length; r++) {
		const o = t[r];
		e = e || !!o && i in o, t[r] = "function" == typeof o ? (e = !0, $(o)) : o
	}
	if (e) return new Proxy({
		get(e) {
			for (let r = t.length - 1; r >= 0; r--) {
				const o = Y(t[r])[e];
				if (void 0 !== o) return o
			}
		},
		has(e) {
			for (let r = t.length - 1; r >= 0; r--)
				if (e in Y(t[r])) return !0;
			return !1
		},
		keys() {
			const e = [];
			for (let r = 0; r < t.length; r++) e.push(...Object.keys(Y(t[r])));
			return [...new Set(e)]
		}
	}, D);
	const r = {};
	for (let e = t.length - 1; e >= 0; e--)
		if (t[e]) {
			const o = Object.getOwnPropertyDescriptors(t[e]);
			for (const e in o) e in r || Object.defineProperty(r, e, {
				enumerable: !0,
				get() {
					for (let r = t.length - 1; r >= 0; r--) {
						const o = (t[r] || {})[e];
						if (void 0 !== o) return o
					}
				}
			})
		} return r
}

function F(t, ...e) {
	const r = new Set(e.flat());
	if (i in t) {
		const o = e.map((e => new Proxy({
			get: r => e.includes(r) ? t[r] : void 0,
			has: r => e.includes(r) && r in t,
			keys: () => e.filter((e => e in t))
		}, D)));
		return o.push(new Proxy({
			get: e => r.has(e) ? void 0 : t[e],
			has: e => !r.has(e) && e in t,
			keys: () => Object.keys(t).filter((t => !r.has(t)))
		}, D)), o
	}
	const o = Object.getOwnPropertyDescriptors(t);
	return e.push(Object.keys(o).filter((t => !r.has(t)))), e.map((e => {
		const r = {};
		for (let n = 0; n < e.length; n++) {
			const a = e[n];
			a in t && Object.defineProperty(r, a, o[a] ? o[a] : {
				get: () => t[a],
				set: () => !0,
				enumerable: !0
			})
		}
		return r
	}))
}

function V(t) {
	const e = "fallback" in t && {
		fallback: () => t.fallback
	};
	return $(X((() => t.each), t.children, e || void 0))
}

function G(t) {
	const e = t.keyed,
		r = $((() => t.when), void 0, {
			equals: (t, r) => e ? t === r : !t == !r
		});
	return $((() => {
		const o = r();
		if (o) {
			const n = t.children;
			return "function" == typeof n && n.length > 0 ? C((() => n(e ? o : () => {
				if (!C(r)) throw `Stale read from <${"Show"}>.`;
				return t.when
			}))) : n
		}
		return t.fallback
	}), void 0, void 0)
}
const J = new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", "allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"]),
	Z = new Set(["innerHTML", "textContent", "innerText", "children"]),
	K = Object.assign(Object.create(null), {
		className: "class",
		htmlFor: "for"
	}),
	W = Object.assign(Object.create(null), {
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
const Q = new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]),
	tt = {
		xlink: "http://www.w3.org/1999/xlink",
		xml: "http://www.w3.org/XML/1998/namespace"
	};
const et = "_$DX_DELEGATE";

function rt(t, e, r) {
	let o;
	const n = () => {
			const e = document.createElement("template");
			return e.innerHTML = t, r ? e.content.firstChild.firstChild : e.content.firstChild
		},
		a = e ? () => (o || (o = n())).cloneNode(!0) : () => C((() => document.importNode(o || (o = n()), !0)));
	return a.cloneNode = a, a
}

function ot(t, e = window.document) {
	const r = e[et] || (e[et] = new Set);
	for (let o = 0, n = t.length; o < n; o++) {
		const n = t[o];
		r.has(n) || (r.add(n), e.addEventListener(n, dt))
	}
}

function nt(t, e, r) {
	null == r ? t.removeAttribute(e) : t.setAttribute(e, r)
}

function at(t, e) {
	null == e ? t.removeAttribute("class") : t.className = e
}

function st(t, e = {}, r, o) {
	const n = {};
	return o || k((() => n.children = pt(t, e.children, n.children))), k((() => e.ref && e.ref(t))), k((() => function(t, e, r, o, n = {}, a = !1) {
		e || (e = {});
		for (const o in n)
			if (!(o in e)) {
				if ("children" === o) continue;
				n[o] = ut(t, o, null, n[o], r, a)
			} for (const s in e) {
			if ("children" === s) {
				o || pt(t, e.children);
				continue
			}
			const i = e[s];
			n[s] = ut(t, s, i, n[s], r, a)
		}
	}(t, e, r, !0, n, !0))), n
}

function it(t, e, r) {
	return C((() => t(e, r)))
}

function lt(t, e, r, o) {
	if (void 0 === r || o || (o = []), "function" != typeof e) return pt(t, e, o, r);
	k((o => pt(t, e(), o, r)), o)
}

function ct(t, e, r) {
	const o = e.trim().split(/\s+/);
	for (let e = 0, n = o.length; e < n; e++) t.classList.toggle(o[e], r)
}

function ut(t, e, r, o, n, a) {
	let s, i, l, c, u;
	if ("style" === e) return function(t, e, r) {
		if (!e) return r ? nt(t, "style") : e;
		const o = t.style;
		if ("string" == typeof e) return o.cssText = e;
		let n, a;
		for (a in "string" == typeof r && (o.cssText = r = void 0), r || (r = {}), e || (e = {}), r) null == e[a] && o.removeProperty(a), delete r[a];
		for (a in e) n = e[a], n !== r[a] && (o.setProperty(a, n), r[a] = n);
		return r
	}(t, r, o);
	if ("classList" === e) return function(t, e, r = {}) {
		const o = Object.keys(e || {}),
			n = Object.keys(r);
		let a, s;
		for (a = 0, s = n.length; a < s; a++) {
			const o = n[a];
			o && "undefined" !== o && !e[o] && (ct(t, o, !1), delete r[o])
		}
		for (a = 0, s = o.length; a < s; a++) {
			const n = o[a],
				s = !!e[n];
			n && "undefined" !== n && r[n] !== s && s && (ct(t, n, !0), r[n] = s)
		}
		return r
	}(t, r, o);
	if (r === o) return o;
	if ("ref" === e) a || r(t);
	else if ("on:" === e.slice(0, 3)) {
		const n = e.slice(3);
		o && t.removeEventListener(n, o), r && t.addEventListener(n, r)
	} else if ("oncapture:" === e.slice(0, 10)) {
		const n = e.slice(10);
		o && t.removeEventListener(n, o, !0), r && t.addEventListener(n, r, !0)
	} else if ("on" === e.slice(0, 2)) {
		const n = e.slice(2).toLowerCase(),
			a = Q.has(n);
		if (!a && o) {
			const e = Array.isArray(o) ? o[0] : o;
			t.removeEventListener(n, e)
		}(a || r) && (! function(t, e, r, o) {
			if (o) Array.isArray(r) ? (t[`$$${e}`] = r[0], t[`$$${e}Data`] = r[1]) : t[`$$${e}`] = r;
			else if (Array.isArray(r)) {
				const o = r[0];
				t.addEventListener(e, r[0] = e => o.call(t, r[1], e))
			} else t.addEventListener(e, r)
		}(t, n, r, a), a && ot([n]))
	} else if ("attr:" === e.slice(0, 5)) nt(t, e.slice(5), r);
	else if ((u = "prop:" === e.slice(0, 5)) || (l = Z.has(e)) || !n && ((c = function(t, e) {
			const r = W[t];
			return "object" == typeof r ? r[e] ? r.$ : void 0 : r
		}(e, t.tagName)) || (i = J.has(e))) || (s = t.nodeName.includes("-"))) u && (e = e.slice(5), i = !0), "class" === e || "className" === e ? at(t, r) : !s || i || l ? t[c || e] = r : t[(d = e, d.toLowerCase().replace(/-([a-z])/g, ((t, e) => e.toUpperCase())))] = r;
	else {
		const o = n && e.indexOf(":") > -1 && tt[e.split(":")[0]];
		o ? function(t, e, r, o) {
			null == o ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, o)
		}(t, o, e, r) : nt(t, K[e] || e, r)
	}
	var d;
	return r
}

function dt(t) {
	const e = `$$${t.type}`;
	let r = t.composedPath && t.composedPath()[0] || t.target;
	for (t.target !== r && Object.defineProperty(t, "target", {
			configurable: !0,
			value: r
		}), Object.defineProperty(t, "currentTarget", {
			configurable: !0,
			get: () => r || document
		}); r;) {
		const o = r[e];
		if (o && !r.disabled) {
			const n = r[`${e}Data`];
			if (void 0 !== n ? o.call(r, n, t) : o.call(r, t), t.cancelBubble) return
		}
		r = r._$host || r.parentNode || r.host
	}
}

function pt(t, e, r, o, n) {
	for (;
		"function" == typeof r;) r = r();
	if (e === r) return r;
	const a = typeof e,
		s = void 0 !== o;
	if (t = s && r[0] && r[0].parentNode || t, "string" === a || "number" === a)
		if ("number" === a && (e = e.toString()), s) {
			let n = r[0];
			n && 3 === n.nodeType ? n.data = e : n = document.createTextNode(e), r = bt(t, r, o, n)
		} else r = "" !== r && "string" == typeof r ? t.firstChild.data = e : t.textContent = e;
	else if (null == e || "boolean" === a) r = bt(t, r, o);
	else {
		if ("function" === a) return k((() => {
			let n = e();
			for (;
				"function" == typeof n;) n = n();
			r = pt(t, n, r, o)
		})), () => r;
		if (Array.isArray(e)) {
			const a = [],
				i = r && Array.isArray(r);
			if (ft(a, e, r, n)) return k((() => r = pt(t, a, r, o, !0))), () => r;
			if (0 === a.length) {
				if (r = bt(t, r, o), s) return r
			} else i ? 0 === r.length ? ht(t, a, o) : function(t, e, r) {
				let o = r.length,
					n = e.length,
					a = o,
					s = 0,
					i = 0,
					l = e[n - 1].nextSibling,
					c = null;
				for (; s < n || i < a;)
					if (e[s] !== r[i]) {
						for (; e[n - 1] === r[a - 1];) n--, a--;
						if (n === s) {
							const e = a < o ? i ? r[i - 1].nextSibling : r[a - i] : l;
							for (; i < a;) t.insertBefore(r[i++], e)
						} else if (a === i)
							for (; s < n;) c && c.has(e[s]) || e[s].remove(), s++;
						else if (e[s] === r[a - 1] && r[i] === e[n - 1]) {
							const o = e[--n].nextSibling;
							t.insertBefore(r[i++], e[s++].nextSibling), t.insertBefore(r[--a], o), e[n] = r[a]
						} else {
							if (!c) {
								c = new Map;
								let t = i;
								for (; t < a;) c.set(r[t], t++)
							}
							const o = c.get(e[s]);
							if (null != o)
								if (i < o && o < a) {
									let l, u = s,
										d = 1;
									for (; ++u < n && u < a && null != (l = c.get(e[u])) && l === o + d;) d++;
									if (d > o - i) {
										const n = e[s];
										for (; i < o;) t.insertBefore(r[i++], n)
									} else t.replaceChild(r[i++], e[s++])
								} else s++;
							else e[s++].remove()
						}
					} else s++, i++
			}(t, r, a) : (r && bt(t), ht(t, a));
			r = a
		} else if (e instanceof Node) {
			if (Array.isArray(r)) {
				if (s) return r = bt(t, r, o, e);
				bt(t, r, null, e)
			} else null != r && "" !== r && t.firstChild ? t.replaceChild(e, t.firstChild) : t.appendChild(e);
			r = e
		} else console.warn("Unrecognized value. Skipped inserting", e)
	}
	return r
}

function ft(t, e, r, o) {
	let n = !1;
	for (let a = 0, s = e.length; a < s; a++) {
		let s = e[a],
			i = r && r[a];
		if (s instanceof Node) t.push(s);
		else if (null == s || !0 === s || !1 === s);
		else if (Array.isArray(s)) n = ft(t, s, i) || n;
		else if ("function" == typeof s)
			if (o) {
				for (;
					"function" == typeof s;) s = s();
				n = ft(t, Array.isArray(s) ? s : [s], Array.isArray(i) ? i : [i]) || n
			} else t.push(s), n = !0;
		else {
			const e = String(s);
			i && 3 === i.nodeType ? (i.data = e, t.push(i)) : t.push(document.createTextNode(e))
		}
	}
	return n
}

function ht(t, e, r = null) {
	for (let o = 0, n = e.length; o < n; o++) t.insertBefore(e[o], r)
}

function bt(t, e, r, o) {
	if (void 0 === r) return t.textContent = "";
	const n = o || document.createTextNode("");
	if (e.length) {
		let o = !1;
		for (let a = e.length - 1; a >= 0; a--) {
			const s = e[a];
			if (n !== s) {
				const e = s.parentNode === t;
				o || a ? e && s.remove() : e ? t.replaceChild(n, s) : t.insertBefore(n, r)
			} else o = !0
		}
	} else t.insertBefore(n, r);
	return [n]
}

function wt(t) {
	return (e, r) => {
		const {
			element: o
		} = r;
		return v((n => {
			const a = function(t) {
				const e = Object.keys(t),
					r = {};
				for (let o = 0; o < e.length; o++) {
					const [n, a] = x(t[e[o]]);
					Object.defineProperty(r, e[o], {
						get: n,
						set(t) {
							a((() => t))
						}
					})
				}
				return r
			}(e);
			o.addPropertyChangedCallback(((t, e) => a[t] = e)), o.addReleaseCallback((() => {
				o.renderRoot.textContent = "", n()
			}));
			const s = t(a, r);
			return lt(o.renderRoot, s)
		}), function(t) {
			if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
			let e = t.parentNode;
			for (; e && !e._$owner && (!e.assignedSlot || !e.assignedSlot._$owner);) e = e.parentNode;
			return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner
		}(o))
	}
}
const gt = {
	chatflowid: "",
	apiHost: void 0
};
const yt = t => null != t,
	mt = rt('<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'),
	vt = rt('<img alt="Bubble button icon">'),
	xt = rt('<button part="button"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'),
	kt = t => (() => {
		const e = xt(),
			r = e.firstChild;
		return e.$$click = () => t.toggleBot(), e.style.setProperty("z-index", "42424242"), lt(e, R(G, {
			get when() {
				return null == t.customIconSrc
			},
			keyed: !0,
			get children() {
				const e = mt();
				return k((r => {
					const o = t.iconColor ?? "white",
						n = "stroke-2 fill-transparent absolute duration-200 transition " + (t.isBotOpened ? "scale-0 opacity-0" : "scale-100 opacity-100") + ("large" === t.size ? " w-9" : " w-7");
					return o !== r._v$ && (null != (r._v$ = o) ? e.style.setProperty("stroke", o) : e.style.removeProperty("stroke")), n !== r._v$2 && nt(e, "class", r._v$2 = n), r
				}), {
					_v$: void 0,
					_v$2: void 0
				}), e
			}
		}), r), lt(e, R(G, {
			get when() {
				return t.customIconSrc
			},
			get children() {
				const e = vt();
				return k((r => {
					const o = t.customIconSrc,
						n = "rounded-full object-cover" + ("large" === t.size ? " w-9 h-9" : " w-7 h-7");
					return o !== r._v$3 && nt(e, "src", r._v$3 = o), n !== r._v$4 && at(e, r._v$4 = n), r
				}), {
					_v$3: void 0,
					_v$4: void 0
				}), e
			}
		}), r), k((o => {
			const n = "fixed bottom-5 right-5 shadow-md  rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in" + ("large" === t.size ? " w-16 h-16" : " w-12 h-12"),
				a = t.backgroundColor ?? "#673ab7",
				s = t.iconColor ?? "white",
				i = "absolute duration-200 transition " + (t.isBotOpened ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0") + ("large" === t.size ? " w-9" : " w-7");
			return n !== o._v$5 && at(e, o._v$5 = n), a !== o._v$6 && (null != (o._v$6 = a) ? e.style.setProperty("background-color", a) : e.style.removeProperty("background-color")), s !== o._v$7 && (null != (o._v$7 = s) ? r.style.setProperty("fill", s) : r.style.removeProperty("fill")), i !== o._v$8 && nt(r, "class", o._v$8 = i), o
		}), {
			_v$5: void 0,
			_v$6: void 0,
			_v$7: void 0,
			_v$8: void 0
		}), e
	})();
ot(["click"]);
const _t = ({
		chatflowid: t,
		apiHost: e = "http://localhost:3000",
		body: r
	}) => (async t => {
		try {
			const e = "string" == typeof t ? t : t.url,
				r = await fetch(e, {
					method: "string" == typeof t ? "GET" : t.method,
					mode: "cors",
					headers: "string" != typeof t && yt(t.body) ? {
						"Content-Type": "application/json"
					} : void 0,
					body: "string" != typeof t && yt(t.body) ? JSON.stringify(t.body) : void 0
				}),
				o = await r.json();
			if (!r.ok) throw "error" in o ? o.error : o;
			return {
				data: o
			}
		} catch (t) {
			return console.error(t), {
				error: t
			}
		}
	})({
		method: "POST",
		url: `${e}/api/v1/prediction/${t}`,
		body: r
	}),
	$t = rt('<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'),
	Ct = t => {
		const [e, r] = F(t, ["ref", "onInput"]);
		return (() => {
			const o = $t();
			o.$$input = t => e.onInput(t.currentTarget.value);
			const n = t.ref;
			return "function" == typeof n ? it(n, o) : t.ref = o, o.style.setProperty("font-size", "16px"), st(o, r, !1, !1), o
		})()
	};
ot(["input"]);
const St = rt('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px" color="white"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'),
	Pt = t => (() => {
		const e = St();
		return st(e, t, !0, !0), e
	})(),
	At = rt('<button type="submit">'),
	jt = rt('<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'),
	zt = t => (() => {
		const e = At();
		return st(e, q({
			get disabled() {
				return t.isDisabled || t.isLoading
			}
		}, t, {
			get class() {
				return "py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button " + t.class
			},
			style: {
				background: "white",
				border: "none"
			}
		}), !1, !0), lt(e, R(G, {
			get when() {
				return !t.isLoading
			},
			get fallback() {
				return R(Ot, {
					class: "text-white"
				})
			},
			get children() {
				return R(Pt, {
					get class() {
						return "send-icon flex " + (t.disableIcon ? "hidden" : "")
					}
				})
			}
		})), e
	})(),
	Ot = t => (() => {
		const e = jt();
		return st(e, q(t, {
			get class() {
				return "animate-spin -ml-1 mr-3 h-5 w-5 " + t.class
			},
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			"data-testid": "loading-spinner"
		}), !0, !0), e
	})(),
	[Nt, Mt] = x(),
	Tt = rt("<span>Send"),
	Et = rt('<div class="flex items-end justify-between pr-2 chatbot-input w-full" data-testid="input">'),
	Lt = t => {
		const [e, r] = x(t.defaultValue ?? "");
		let o;
		const n = t => r(t),
			a = () => {
				"" !== e() && o?.reportValidity() && t.onSubmit(e()), r("")
			},
			s = t => {
				"Enter" === t.key && a()
			};
		var i;
		return i = () => {
			!Nt() && o && o.focus()
		}, _((() => C(i))), (() => {
			const t = Et();
			return t.$$keydown = s, t.style.setProperty("border-top", "1px solid #eeeeee"), t.style.setProperty("width", "100%"), t.style.setProperty("position", "absolute"), t.style.setProperty("bottom", "0"), t.style.setProperty("left", "0"), t.style.setProperty("right", "0"), lt(t, R(Ct, {
				ref(t) {
					"function" == typeof o ? o(t) : o = t
				},
				onInput: n,
				get value() {
					return e()
				},
				placeholder: "Type your question"
			}), null), lt(t, R(zt, {
				type: "button",
				get isDisabled() {
					return "" === e()
				},
				class: "my-2 ml-2",
				"on:click": a,
				get children() {
					const t = Tt();
					return t.style.setProperty("font-family", "Poppins, sans-serif"), t
				}
			}), null), t
		})()
	};
ot(["keydown"]);
const It = rt('<div class="cloud"><div class="messagelist">'),
	Bt = rt('<div><div class="markdownanswer"><span>'),
	Ht = rt('<img src="https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png" alt="AI" width="30" height="30" class="boticon">'),
	Xt = rt('<img src="https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png" alt="Me" width="30" height="30" class="usericon">'),
	Rt = t => {
		let e;
		const [r, o] = x(""), [n, a] = x(!1), [s, i] = x([{
			message: "Hi there! How can I help?",
			type: "apiMessage"
		}]), l = () => {
			setTimeout((() => {
				e?.scrollTo(0, e.scrollHeight)
			}), 50)
		};
		return _((() => {
			l()
		})), _((() => () => {
			o(""), a(!1), i([{
				message: "Hi there! How can I help?",
				type: "apiMessage"
			}])
		})), [(() => {
			const t = It(),
				r = t.firstChild;
			return "function" == typeof e ? it(e, r) : e = r, lt(r, R(V, {
				get each() {
					return s()
				},
				children: (t, e) => (() => {
					const r = Bt(),
						o = r.firstChild,
						a = o.firstChild;
					return r.style.setProperty("display", "flex"), r.style.setProperty("align-items", "center"), lt(r, (() => {
						const e = $((() => "apiMessage" === t.type));
						return () => e() ? Ht() : Xt()
					})(), o), a.style.setProperty("font-family", "Poppins, sans-serif"), lt(a, (() => t.message)), k((o => {
						const a = "apiMessage" === t.type ? "#f7f8ff" : "",
							i = "userMessage" === t.type && n() && e() === s().length - 1 ? "usermessagewaiting-light" : "usermessagewaiting" === t.type ? "apimessage" : "usermessage";
						return a !== o._v$ && (null != (o._v$ = a) ? r.style.setProperty("background", a) : r.style.removeProperty("background")), i !== o._v$2 && at(r, o._v$2 = i), o
					}), {
						_v$: void 0,
						_v$2: void 0
					}), r
				})()
			})), t
		})(), R(Lt, {
			get defaultValue() {
				return r()
			},
			onSubmit: async e => {
				if (o(e), "" === e.trim()) return;
				a(!0), i((t => [...t, {
					message: e,
					type: "userMessage"
				}]));
				const {
					data: r,
					error: n
				} = await _t({
					chatflowid: t.chatflowid,
					apiHost: t.apiHost,
					body: {
						question: e,
						history: s().filter((t => "Hi there! How can I help?" !== t.message))
					}
				});
				if (console.log(r), r && (i((t => [...t, {
						message: r,
						type: "apiMessage"
					}])), a(!1), o(""), setTimeout((() => {
						l()
					}), 100)), n) {
					console.error(n);
					const t = n;
					((t = "Oops! There seems to be an error. Please try again.") => {
						i((e => [...e, {
							message: t,
							type: "apiMessage"
						}])), a(!1), o("")
					})(t.response.data || `${t.response.status}: ${t.response.statusText}`)
				} else;
			}
		})]
	},
	Ut = rt("<style>"),
	Dt = rt('<div part="bot">'),
	Yt = t => {
		const e = document.createElement("flowise-chatbot");
		Object.assign(e, t), document.body.appendChild(e)
	};
"undefined" != typeof window && function(t, e, r) {
	2 === arguments.length && (r = e, e = {}), s(t, e)(wt(r))
}("flowise-chatbot", gt, (t => {
	const [e] = F(t, ["theme"]), [r, o] = x(!1), [n, a] = x(!1);
	return [(() => {
		const t = Ut();
		return lt(t, '/*! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.bottom-5{bottom:20px}.right-5{right:20px}.my-2{margin-bottom:8px;margin-top:8px}.-ml-1{margin-left:-4px}.ml-2{margin-left:8px}.mr-3{margin-right:12px}.flex{display:flex}.hidden{display:none}.h-12{height:48px}.h-16{height:64px}.h-5{height:20px}.h-7{height:28px}.h-9{height:36px}.max-h-\\[704px\\]{max-height:704px}.w-12{width:48px}.w-16{width:64px}.w-5{width:20px}.w-7{width:28px}.w-9{width:36px}.w-full{width:100%}.flex-1{flex:1 1 0%}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.border{border-width:1px}.bg-transparent{background-color:transparent}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.px-4{padding-left:16px;padding-right:16px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.pr-2{padding-right:8px}.font-semibold{font-weight:600}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--chatbot-container-bg-image:none;--chatbot-container-bg-color:transparent;--chatbot-container-font-family:"Open Sans";--chatbot-button-bg-color:#673ab7;--chatbot-button-color:#fff;--chatbot-host-bubble-bg-color:#f7f8ff;--chatbot-host-bubble-color:#303235;--chatbot-guest-bubble-bg-color:#ff8e21;--chatbot-guest-bubble-color:#fff;--chatbot-input-bg-color:#fff;--chatbot-input-color:#303235;--chatbot-input-placeholder-color:#9095a0;--chatbot-header-bg-color:#fff;--chatbot-header-color:#303235;--chatbot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}button,input,textarea{font-weight:300}.text-input::-moz-placeholder{color:var(--chatbot-input-placeholder-color)!important;opacity:1!important}.text-input::placeholder{color:var(--chatbot-input-placeholder-color)!important;opacity:1!important}.chatbot-container{background-color:var(--chatbot-container-bg-color);background-image:var(--chatbot-container-bg-image);font-family:var(--chatbot-container-font-family),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.chatbot-button{background-color:var(--chatbot-button-bg-color);border:1px solid var(--chatbot-button-bg-color);border-radius:var(--chatbot-border-radius);color:var(--chatbot-button-color)}.chatbot-button.selectable{background-color:var(--chatbot-host-bubble-bg-color);border:1px solid var(--chatbot-button-bg-color);color:var(--chatbot-host-bubble-color)}.chatbot-input{background-color:var(--chatbot-input-bg-color);border-radius:var(--chatbot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1)}.chatbot-input,.chatbot-input-error-message{color:var(--chatbot-input-color)}.chatbot-button>.send-icon{fill:var(--chatbot-button-bg-color)}.chatbot-chat-view{max-width:800px}.secondary-button{background-color:var(--chatbot-host-bubble-bg-color);border-radius:var(--chatbot-border-radius);color:var(--chatbot-host-bubble-color)}.messagelist{border-radius:.5rem;height:100%;overflow-y:scroll;width:100%}.messagelistloading{display:flex;justify-content:center;margin-top:1rem;width:100%}.usermessage{padding:1rem 1.5rem}.usermessagewaiting-light{background:linear-gradient(270deg,#ede7f6,#e3f2fd,#ede7f6);background-position:-100% 0;background-size:200% 200%}.usermessagewaiting-dark,.usermessagewaiting-light{animation:loading-gradient 2s ease-in-out infinite;animation-direction:alternate;animation-name:loading-gradient;padding:1rem 1.5rem}.usermessagewaiting-dark{background:linear-gradient(270deg,#2e2352,#1d3d60,#2e2352);background-position:-100% 0;background-size:200% 200%;color:#ececf1}@keyframes loading-gradient{0%{background-position:-100% 0}to{background-position:100% 0}}.apimessage{animation:fadein .5s;padding:1rem 1.5rem}@keyframes fadein{0%{opacity:0}to{opacity:1}}.apimessage,.usermessage,.usermessagewaiting{display:flex}.markdownanswer{line-height:1.75}.markdownanswer a:hover{opacity:.8}.markdownanswer a{color:#16bed7;font-weight:500}.markdownanswer code{color:#15cb19;font-weight:500;white-space:pre-wrap!important}.markdownanswer ol,.markdownanswer ul{margin:1rem}.boticon,.usericon{border-radius:1rem;margin-right:1rem}.markdownanswer h1,.markdownanswer h2,.markdownanswer h3{font-size:inherit}.center{flex-direction:column;padding:10px;position:relative}.center,.cloud{align-items:center;display:flex;justify-content:center}.cloud{border-radius:.5rem;height:calc(100% - 50px);width:400px}input{background-color:transparent;border:none;font-family:Poppins,sans-serif;padding:10px}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}.sm\\:w-\\[400px\\]{width:400px}}'), t
	})(), R(kt, q((() => e.theme?.button), {
		toggleBot: () => {
			r() ? o(!1) : (n() || a(!0), o(!0))
		},
		get isBotOpened() {
			return r()
		}
	})), (() => {
		const o = Dt();
		return o.style.setProperty("height", "calc(100% - 120px)"), o.style.setProperty("transition", "transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out"), o.style.setProperty("transform-origin", "bottom right"), o.style.setProperty("box-shadow", "rgb(0 0 0 / 16%) 0px 5px 40px"), o.style.setProperty("z-index", "42424242"), lt(o, R(G, {
			get when() {
				return n()
			},
			get children() {
				return R(Rt, {
					get chatflowid() {
						return t.chatflowid
					},
					get apiHost() {
						return t.apiHost
					}
				})
			}
		})), k((n => {
			const a = r() ? "scale3d(1, 1, 1)" : "scale3d(0, 0, 1)",
				s = e.theme?.chatWindow?.backgroundColor || "#ffffff",
				i = "fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]" + (r() ? " opacity-1" : " opacity-0 pointer-events-none") + ("large" === t.theme?.button?.size ? " bottom-24" : " bottom-20");
			return a !== n._v$ && (null != (n._v$ = a) ? o.style.setProperty("transform", a) : o.style.removeProperty("transform")), s !== n._v$2 && (null != (n._v$2 = s) ? o.style.setProperty("background-color", s) : o.style.removeProperty("background-color")), i !== n._v$3 && at(o, n._v$3 = i), n
		}), {
			_v$: void 0,
			_v$2: void 0,
			_v$3: void 0
		}), o
	})()]
}));
const qt = {
	init: Yt
};
var Ft;
Ft = qt, "undefined" != typeof window && (window.Chatbot = {
	...Ft
});
export {
	qt as
	default
};