/*! UIkit 3.0.10 | http://www.getuikit.com | (c) 2014 - 2018 YOOtheme | MIT License */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define('uikit', factory) :
			(global = global || self, global.UIkit = factory());
}(this, () => {

	function bind(fn, context) {
		return function (a) {
			let l = arguments.length;
			return l ? l > 1 ? fn.apply(context, arguments) : fn.call(context, a) : fn.call(context);
		};
	}

	let objPrototype = Object.prototype;
	let hasOwnProperty = objPrototype.hasOwnProperty;

	function hasOwn(obj, key) {
		return hasOwnProperty.call(obj, key);
	}

	let hyphenateCache = {};
	let hyphenateRe = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {

		if (!(str in hyphenateCache)) {
			hyphenateCache[str] = str
				.replace(hyphenateRe, '$1-$2')
				.toLowerCase();
		}

		return hyphenateCache[str];
	}

	let camelizeRe = /-(\w)/g;

	function camelize(str) {
		return str.replace(camelizeRe, toUpper);
	}

	function toUpper(_, c) {
		return c ? c.toUpperCase() : '';
	}

	function ucfirst(str) {
		return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
	}

	let strPrototype = String.prototype;
	let startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

	function startsWith(str, search) {
		return startsWithFn.call(str, search);
	}

	let endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search; };

	function endsWith(str, search) {
		return endsWithFn.call(str, search);
	}

	let includesFn = function (search) { return ~this.indexOf(search); };
	let includesStr = strPrototype.includes || includesFn;
	let includesArray = Array.prototype.includes || includesFn;

	function includes(obj, search) {
		return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
	}

	let isArray = Array.isArray;

	function isFunction(obj) {
		return typeof obj === 'function';
	}

	function isObject(obj) {
		return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
		return isObject(obj) && Object.getPrototypeOf(obj) === objPrototype;
	}

	function isWindow(obj) {
		return isObject(obj) && obj === obj.window;
	}

	function isDocument(obj) {
		return isObject(obj) && obj.nodeType === 9;
	}

	function isJQuery(obj) {
		return isObject(obj) && !!obj.jquery;
	}

	function isNode(obj) {
		return obj instanceof Node || isObject(obj) && obj.nodeType >= 1;
	}

	let toString = objPrototype.toString;
	function isNodeCollection(obj) {
		return toString.call(obj).match(/^\[object (NodeList|HTMLCollection)\]$/);
	}

	function isBoolean(value) {
		return typeof value === 'boolean';
	}

	function isString(value) {
		return typeof value === 'string';
	}

	function isNumber(value) {
		return typeof value === 'number';
	}

	function isNumeric(value) {
		return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
	}

	function isUndefined(value) {
		return value === void 0;
	}

	function toBoolean(value) {
		return isBoolean(value)
			? value
			: value === 'true' || value === '1' || value === ''
				? true
				: value === 'false' || value === '0'
					? false
					: value;
	}

	function toNumber(value) {
		let number = Number(value);
		return !isNaN(number) ? number : false;
	}

	function toFloat(value) {
		return parseFloat(value) || 0;
	}

	function toNode(element) {
		return isNode(element) || isWindow(element) || isDocument(element)
			? element
			: isNodeCollection(element) || isJQuery(element)
				? element[0]
				: isArray(element)
					? toNode(element[0])
					: null;
	}

	let arrayProto = Array.prototype;
	function toNodes(element) {
		return isNode(element)
			? [element]
			: isNodeCollection(element)
				? arrayProto.slice.call(element)
				: isArray(element)
					? element.map(toNode).filter(Boolean)
					: isJQuery(element)
						? element.toArray()
						: [];
	}

	function toList(value) {
		return isArray(value)
			? value
			: isString(value)
				? value.split(/,(?![^(]*\))/).map((value) => { return isNumeric(value)
					? toNumber(value)
					: toBoolean(value.trim()); })
				: [value];
	}

	function toMs(time) {
		return !time
			? 0
			: endsWith(time, 'ms')
				? toFloat(time)
				: toFloat(time) * 1000;
	}

	function isEqual(value, other) {
		return value === other
            || isObject(value)
            && isObject(other)
            && Object.keys(value).length === Object.keys(other).length
            && each(value, (val, key) => { return val === other[key]; });
	}

	function swap(value, a, b) {
		return value.replace(new RegExp((a + "|" + b), 'mg'), (match) => {
			return match === a ? b : a;
		});
	}

	let assign = Object.assign || function (target) {
		let args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		target = Object(target);
		for (let i = 0; i < args.length; i++) {
			let source = args[i];
			if (source !== null) {
				for (let key in source) {
					if (hasOwn(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};

	function each(obj, cb) {
		for (let key in obj) {
			if (false === cb(obj[key], key)) {
				return false;
			}
		}
		return true;
	}

	function sortBy(collection, prop) {
		return collection.sort((ref, ref$1) => {
			let propA = ref[prop]; if ( propA === void 0 ) propA = 0;
			let propB = ref$1[prop]; if ( propB === void 0 ) propB = 0;

			return propA > propB
				? 1
				: propB > propA
					? -1
					: 0;
		}
		);
	}

	function clamp(number, min, max) {
		if ( min === void 0 ) min = 0;
		if ( max === void 0 ) max = 1;

		return Math.min(Math.max(toNumber(number) || 0, min), max);
	}

	function noop() {}

	function intersectRect(r1, r2) {
		return r1.left < r2.right &&
            r1.right > r2.left &&
            r1.top < r2.bottom &&
            r1.bottom > r2.top;
	}

	function pointInRect(point, rect) {
		return point.x <= rect.right &&
            point.x >= rect.left &&
            point.y <= rect.bottom &&
            point.y >= rect.top;
	}

	let Dimensions = {

		ratio(dimensions, prop, value) {
			let obj;


			let aProp = prop === 'width' ? 'height' : 'width';

			return ( obj = {}, obj[aProp] = dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp], obj[prop] = value, obj );
		},

		contain(dimensions, maxDimensions) {
			let this$1 = this;

			dimensions = assign({}, dimensions);

			each(dimensions, (_, prop) => { return dimensions = dimensions[prop] > maxDimensions[prop]
				? this$1.ratio(dimensions, prop, maxDimensions[prop])
				: dimensions; }
			);

			return dimensions;
		},

		cover(dimensions, maxDimensions) {
			let this$1 = this;

			dimensions = this.contain(dimensions, maxDimensions);

			each(dimensions, (_, prop) => { return dimensions = dimensions[prop] < maxDimensions[prop]
				? this$1.ratio(dimensions, prop, maxDimensions[prop])
				: dimensions; }
			);

			return dimensions;
		}

	};

	function attr(element, name, value) {

		if (isObject(name)) {
			for (let key in name) {
				attr(element, key, name[key]);
			}
			return;
		}

		if (isUndefined(value)) {
			element = toNode(element);
			return element && element.getAttribute(name);
		}
		toNodes(element).forEach((element) => {

			if (isFunction(value)) {
				value = value.call(element, attr(element, name));
			}

			if (value === null) {
				removeAttr(element, name);
			} else {
				element.setAttribute(name, value);
			}
		});
		

	}

	function hasAttr(element, name) {
		return toNodes(element).some((element) => { return element.hasAttribute(name); });
	}

	function removeAttr(element, name) {
		element = toNodes(element);
		name.split(' ').forEach((name) => { return element.forEach((element) => { return element.hasAttribute(name) && element.removeAttribute(name); }
		); }
		);
	}

	function data(element, attribute) {
		for (let i = 0, attrs = [attribute, ("data-" + attribute)]; i < attrs.length; i++) {
			if (hasAttr(element, attrs[i])) {
				return attr(element, attrs[i]);
			}
		}
	}

	function query(selector, context) {
		return toNode(selector) || find(selector, getContext(selector, context));
	}

	function queryAll(selector, context) {
		let nodes = toNodes(selector);
		return nodes.length && nodes || findAll(selector, getContext(selector, context));
	}

	function getContext(selector, context) {
		if ( context === void 0 ) context = document;

		return isContextSelector(selector) || isDocument(context)
			? context
			: context.ownerDocument;
	}

	function find(selector, context) {
		return toNode(_query(selector, context, 'querySelector'));
	}

	function findAll(selector, context) {
		return toNodes(_query(selector, context, 'querySelectorAll'));
	}

	function _query(selector, context, queryFn) {
		if ( context === void 0 ) context = document;


		if (!selector || !isString(selector)) {
			return null;
		}

		selector = selector.replace(contextSanitizeRe, '$1 *');

		let removes;

		if (isContextSelector(selector)) {

			removes = [];

			selector = selector.split(',').map((selector, i) => {

				let ctx = context;

				selector = selector.trim();

				if (selector[0] === '!') {

					let selectors = selector.substr(1).trim().split(' ');
					ctx = closest(context.parentNode, selectors[0]);
					selector = selectors.slice(1).join(' ').trim();

				}

				if (selector[0] === '-') {

					let selectors$1 = selector.substr(1).trim().split(' ');
					let prev = (ctx || context).previousElementSibling;
					ctx = matches(prev, selector.substr(1)) ? prev : null;
					selector = selectors$1.slice(1).join(' ');

				}

				if (!ctx) {
					return null;
				}

				if (!ctx.id) {
					ctx.id = "uk-" + (Date.now()) + i;
					removes.push(() => { return removeAttr(ctx, 'id'); });
				}

				return ("#" + (escape(ctx.id)) + " " + selector);

			}).filter(Boolean).join(',');

			context = document;

		}

		try {

			return context[queryFn](selector);

		} catch (e) {

			return null;

		} finally {

			removes && removes.forEach((remove) => { return remove(); });

		}

	}

	let contextSelectorRe = /(^|,)\s*[!>+~-]/;
	var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;

	function isContextSelector(selector) {
		return isString(selector) && selector.match(contextSelectorRe);
	}

	let elProto = Element.prototype;
	let matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;

	function matches(element, selector) {
		return toNodes(element).some((element) => { return matchesFn.call(element, selector); });
	}

	let closestFn = elProto.closest || function (selector) {
		let ancestor = this;

		do {

			if (matches(ancestor, selector)) {
				return ancestor;
			}

			ancestor = ancestor.parentNode;

		} while (ancestor && ancestor.nodeType === 1);
	};

	function closest(element, selector) {

		if (startsWith(selector, '>')) {
			selector = selector.slice(1);
		}

		return isNode(element)
			? element.parentNode && closestFn.call(element, selector)
			: toNodes(element).map((element) => { return closest(element, selector); }).filter(Boolean);
	}

	function parents(element, selector) {
		let elements = [];
		let parent = toNode(element).parentNode;

		while (parent && parent.nodeType === 1) {

			if (matches(parent, selector)) {
				elements.push(parent);
			}

			parent = parent.parentNode;
		}

		return elements;
	}

	let escapeFn = window.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, (match) => { return ("\\" + match); }); };
	function escape(css) {
		return isString(css) ? escapeFn.call(null, css) : '';
	}

	let voidElements = {
		area: true,
		base: true,
		br: true,
		col: true,
		embed: true,
		hr: true,
		img: true,
		input: true,
		keygen: true,
		link: true,
		menuitem: true,
		meta: true,
		param: true,
		source: true,
		track: true,
		wbr: true
	};
	function isVoidElement(element) {
		return toNodes(element).some((element) => { return voidElements[element.tagName.toLowerCase()]; });
	}

	function isVisible(element) {
		return toNodes(element).some((element) => { return element.offsetWidth || element.offsetHeight || element.getClientRects().length; });
	}

	let selInput = 'input,select,textarea,button';
	function isInput(element) {
		return toNodes(element).some((element) => { return matches(element, selInput); });
	}

	function filter(element, selector) {
		return toNodes(element).filter((element) => { return matches(element, selector); });
	}

	function within(element, selector) {
		return !isString(selector)
			? element === selector || (isDocument(selector)
				? selector.documentElement
				: toNode(selector)).contains(toNode(element)) // IE 11 document does not implement contains
			: matches(element, selector) || closest(element, selector);
	}

	/* global DocumentTouch */

	let isIE = /msie|trident/i.test(window.navigator.userAgent);
	let isRtl = attr(document.documentElement, 'dir') === 'rtl';

	let hasTouchEvents = 'ontouchstart' in window;
	let hasPointerEvents = window.PointerEvent;
	let hasTouch = hasTouchEvents
        || window.DocumentTouch && document instanceof DocumentTouch
        || navigator.maxTouchPoints; // IE >=11

	let pointerDown = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
	let pointerMove = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
	let pointerUp = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
	let pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
	let pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
	let pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';

	function on() {
		let args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];


		let ref = getArgs(args);
		let targets = ref[0];
		let type = ref[1];
		let selector = ref[2];
		let listener = ref[3];
		let useCapture = ref[4];

		targets = toEventTargets(targets);

		if (selector) {
			listener = delegate(targets, selector, listener);
		}

		if (listener.length > 1) {
			listener = detail(listener);
		}

		type.split(' ').forEach((type) => { return targets.forEach((target) => { return target.addEventListener(type, listener, useCapture); }
		); }
		);
		return function () { return off(targets, type, listener, useCapture); };
	}

	function off(targets, type, listener, useCapture) {
		if ( useCapture === void 0 ) useCapture = false;

		targets = toEventTargets(targets);
		type.split(' ').forEach((type) => { return targets.forEach((target) => { return target.removeEventListener(type, listener, useCapture); }
		); }
		);
	}

	function once() {
		let args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];


		let ref = getArgs(args);
		let element = ref[0];
		let type = ref[1];
		let selector = ref[2];
		let listener = ref[3];
		let useCapture = ref[4];
		let condition = ref[5];
		var off = on(element, type, selector, (e) => {
			let result = !condition || condition(e);
			if (result) {
				off();
				listener(e, result);
			}
		}, useCapture);

		return off;
	}

	function trigger(targets, event, detail) {
		return toEventTargets(targets).reduce((notCanceled, target) => { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
			, true);
	}

	function createEvent(e, bubbles, cancelable, detail) {
		if ( bubbles === void 0 ) bubbles = true;
		if ( cancelable === void 0 ) cancelable = false;

		if (isString(e)) {
			let event = document.createEvent('CustomEvent'); // IE 11
			event.initCustomEvent(e, bubbles, cancelable, detail);
			e = event;
		}

		return e;
	}

	function getArgs(args) {
		if (isFunction(args[2])) {
			args.splice(2, 0, false);
		}
		return args;
	}

	function delegate(delegates, selector, listener) {
		let this$1 = this;

		return function (e) {

			delegates.forEach((delegate) => {

				let current = selector[0] === '>'
					? findAll(selector, delegate).reverse().filter((element) => { return within(e.target, element); })[0]
					: closest(e.target, selector);

				if (current) {
					e.delegate = delegate;
					e.current = current;

					listener.call(this$1, e);
				}

			});

		};
	}

	function detail(listener) {
		return function (e) { return isArray(e.detail) ? listener(...[e].concat(e.detail)) : listener(e); };
	}

	function isEventTarget(target) {
		return target && 'addEventListener' in target;
	}

	function toEventTarget(target) {
		return isEventTarget(target) ? target : toNode(target);
	}

	function toEventTargets(target) {
		return isArray(target)
			? target.map(toEventTarget).filter(Boolean)
			: isString(target)
				? findAll(target)
				: isEventTarget(target)
					? [target]
					: toNodes(target);
	}

	function preventClick() {

		var timer = setTimeout(once(document, 'click', (e) => {

			e.preventDefault();
			e.stopImmediatePropagation();

			clearTimeout(timer);

		}, true));

		trigger(document, pointerCancel);

	}

	/* global setImmediate */

	let Promise = 'Promise' in window ? window.Promise : PromiseFn;

	let Deferred = function() {
		let this$1 = this;

		this.promise = new Promise(((resolve, reject) => {
			this$1.reject = reject;
			this$1.resolve = resolve;
		}));
	};

	/**
     * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
     */

	let RESOLVED = 0;
	let REJECTED = 1;
	let PENDING = 2;

	let async = 'setImmediate' in window ? setImmediate : setTimeout;

	function PromiseFn(executor) {

		this.state = PENDING;
		this.value = undefined;
		this.deferred = [];

		let promise = this;

		try {
			executor(
				(x) => {
					promise.resolve(x);
				},
				(r) => {
					promise.reject(r);
				}
			);
		} catch (e) {
			promise.reject(e);
		}
	}

	PromiseFn.reject = function (r) {
		return new PromiseFn(((resolve, reject) => {
			reject(r);
		}));
	};

	PromiseFn.resolve = function (x) {
		return new PromiseFn(((resolve, reject) => {
			resolve(x);
		}));
	};

	PromiseFn.all = function all(iterable) {
		return new PromiseFn(((resolve, reject) => {
			let result = [];
			let count = 0;

			if (iterable.length === 0) {
				resolve(result);
			}

			function resolver(i) {
				return function (x) {
					result[i] = x;
					count += 1;

					if (count === iterable.length) {
						resolve(result);
					}
				};
			}

			for (let i = 0; i < iterable.length; i += 1) {
				PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
			}
		}));
	};

	PromiseFn.race = function race(iterable) {
		return new PromiseFn(((resolve, reject) => {
			for (let i = 0; i < iterable.length; i += 1) {
				PromiseFn.resolve(iterable[i]).then(resolve, reject);
			}
		}));
	};

	let p = PromiseFn.prototype;

	p.resolve = function resolve(x) {
		let promise = this;

		if (promise.state === PENDING) {
			if (x === promise) {
				throw new TypeError('Promise settled with itself.');
			}

			let called = false;

			try {
				let then = x && x.then;

				if (x !== null && isObject(x) && isFunction(then)) {
					then.call(
						x,
						(x) => {
							if (!called) {
								promise.resolve(x);
							}
							called = true;
						},
						(r) => {
							if (!called) {
								promise.reject(r);
							}
							called = true;
						}
					);
					return;
				}
			} catch (e) {
				if (!called) {
					promise.reject(e);
				}
				return;
			}

			promise.state = RESOLVED;
			promise.value = x;
			promise.notify();
		}
	};

	p.reject = function reject(reason) {
		let promise = this;

		if (promise.state === PENDING) {
			if (reason === promise) {
				throw new TypeError('Promise settled with itself.');
			}

			promise.state = REJECTED;
			promise.value = reason;
			promise.notify();
		}
	};

	p.notify = function notify() {
		let this$1 = this;

		async(() => {
			if (this$1.state !== PENDING) {
				while (this$1.deferred.length) {
					let ref = this$1.deferred.shift();
					let onResolved = ref[0];
					let onRejected = ref[1];
					let resolve = ref[2];
					let reject = ref[3];

					try {
						if (this$1.state === RESOLVED) {
							if (isFunction(onResolved)) {
								resolve(onResolved.call(undefined, this$1.value));
							} else {
								resolve(this$1.value);
							}
						} else if (this$1.state === REJECTED) {
							if (isFunction(onRejected)) {
								resolve(onRejected.call(undefined, this$1.value));
							} else {
								reject(this$1.value);
							}
						}
					} catch (e) {
						reject(e);
					}
				}
			}
		});
	};

	p.then = function then(onResolved, onRejected) {
		let this$1 = this;

		return new PromiseFn(((resolve, reject) => {
			this$1.deferred.push([onResolved, onRejected, resolve, reject]);
			this$1.notify();
		}));
	};

	p.catch = function (onRejected) {
		return this.then(undefined, onRejected);
	};

	function ajax(url, options) {
		return new Promise(((resolve, reject) => {

			let env = assign({
				data: null,
				method: 'GET',
				headers: {},
				xhr: new XMLHttpRequest(),
				beforeSend: noop,
				responseType: ''
			}, options);

			env.beforeSend(env);

			let xhr = env.xhr;

			for (let prop in env) {
				if (prop in xhr) {
					try {

						xhr[prop] = env[prop];

					} catch (e) {}
				}
			}

			xhr.open(env.method.toUpperCase(), url);

			for (let header in env.headers) {
				xhr.setRequestHeader(header, env.headers[header]);
			}

			on(xhr, 'load', () => {

				if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
					resolve(xhr);
				} else {
					reject(assign(Error(xhr.statusText), {
						xhr,
						status: xhr.status
					}));
				}

			});

			on(xhr, 'error', () => { return reject(assign(Error('Network Error'), {xhr})); });
			on(xhr, 'timeout', () => { return reject(assign(Error('Network Timeout'), {xhr})); });

			xhr.send(env.data);
		}));
	}

	function getImage(src, srcset, sizes) {

		return new Promise(((resolve, reject) => {
			let img = new Image();

			img.onerror = reject;
			img.onload = function () { return resolve(img); };

			sizes && (img.sizes = sizes);
			srcset && (img.srcset = srcset);
			img.src = src;
		}));

	}

	function ready(fn) {

		if (document.readyState !== 'loading') {
			fn();
			return;
		}

		var unbind = on(document, 'DOMContentLoaded', () => {
			unbind();
			fn();
		});
	}

	function index(element, ref) {
		return ref
			? toNodes(element).indexOf(toNode(ref))
			: toNodes((element = toNode(element)) && element.parentNode.children).indexOf(element);
	}

	function getIndex(i, elements, current, finite) {
		if ( current === void 0 ) current = 0;
		if ( finite === void 0 ) finite = false;


		elements = toNodes(elements);

		let length = elements.length;

		i = isNumeric(i)
			? toNumber(i)
			: i === 'next'
				? current + 1
				: i === 'previous'
					? current - 1
					: index(elements, i);

		if (finite) {
			return clamp(i, 0, length - 1);
		}

		i %= length;

		return i < 0 ? i + length : i;
	}

	function empty(element) {
		element = $(element);
		element.innerHTML = '';
		return element;
	}

	function html(parent, html) {
		parent = $(parent);
		return isUndefined(html)
			? parent.innerHTML
			: append(parent.hasChildNodes() ? empty(parent) : parent, html);
	}

	function prepend(parent, element) {

		parent = $(parent);

		if (!parent.hasChildNodes()) {
			return append(parent, element);
		}
		return insertNodes(element, (element) => { return parent.insertBefore(element, parent.firstChild); });
		
	}

	function append(parent, element) {
		parent = $(parent);
		return insertNodes(element, (element) => { return parent.appendChild(element); });
	}

	function before(ref, element) {
		ref = $(ref);
		return insertNodes(element, (element) => { return ref.parentNode.insertBefore(element, ref); });
	}

	function after(ref, element) {
		ref = $(ref);
		return insertNodes(element, (element) => { return ref.nextSibling
			? before(ref.nextSibling, element)
			: append(ref.parentNode, element); }
		);
	}

	function insertNodes(element, fn) {
		element = isString(element) ? fragment(element) : element;
		return element
			? 'length' in element
				? toNodes(element).map(fn)
				: fn(element)
			: null;
	}

	function remove(element) {
		toNodes(element).map((element) => { return element.parentNode && element.parentNode.removeChild(element); });
	}

	function wrapAll(element, structure) {

		structure = toNode(before(element, structure));

		while (structure.firstChild) {
			structure = structure.firstChild;
		}

		append(structure, element);

		return structure;
	}

	function wrapInner(element, structure) {
		return toNodes(toNodes(element).map((element) => { return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure); }
		));
	}

	function unwrap(element) {
		toNodes(element)
			.map((element) => { return element.parentNode; })
			.filter((value, index, self) => { return self.indexOf(value) === index; })
			.forEach((parent) => {
				before(parent, parent.childNodes);
				remove(parent);
			});
	}

	let fragmentRe = /^\s*<(\w+|!)[^>]*>/;
	let singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

	function fragment(html) {

		let matches = singleTagRe.exec(html);
		if (matches) {
			return document.createElement(matches[1]);
		}

		let container = document.createElement('div');
		if (fragmentRe.test(html)) {
			container.insertAdjacentHTML('beforeend', html.trim());
		} else {
			container.textContent = html;
		}

		return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

	}

	function apply(node, fn) {

		if (!node || node.nodeType !== 1) {
			return;
		}

		fn(node);
		node = node.firstElementChild;
		while (node) {
			apply(node, fn);
			node = node.nextElementSibling;
		}
	}

	function $(selector, context) {
		return !isString(selector)
			? toNode(selector)
			: isHtml(selector)
				? toNode(fragment(selector))
				: find(selector, context);
	}

	function $$(selector, context) {
		return !isString(selector)
			? toNodes(selector)
			: isHtml(selector)
				? toNodes(fragment(selector))
				: findAll(selector, context);
	}

	function isHtml(str) {
		return str[0] === '<' || str.match(/^\s*</);
	}

	function addClass(element) {
		let args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		apply$1(element, args, 'add');
	}

	function removeClass(element) {
		let args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		apply$1(element, args, 'remove');
	}

	function removeClasses(element, cls) {
		attr(element, 'class', (value) => { return (value || '').replace(new RegExp(("\\b" + cls + "\\b"), 'g'), ''); });
	}

	function replaceClass(element) {
		let args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

		args[0] && removeClass(element, args[0]);
		args[1] && addClass(element, args[1]);
	}

	function hasClass(element, cls) {
		return cls && toNodes(element).some((element) => { return element.classList.contains(cls.split(' ')[0]); });
	}

	function toggleClass(element) {
		let args = [], len = arguments.length - 1;
		while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];


		if (!args.length) {
			return;
		}

		args = getArgs$1(args);

		let force = !isString(args[args.length - 1]) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

		args = args.filter(Boolean);

		toNodes(element).forEach((ref) => {
			let classList = ref.classList;

			for (let i = 0; i < args.length; i++) {
				supports.Force
					? classList.toggle(...[args[i]].concat(force))
					: (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
			}
		});

	}

	function apply$1(element, args, fn) {
		args = getArgs$1(args).filter(Boolean);

		args.length && toNodes(element).forEach((ref) => {
			let classList = ref.classList;

			supports.Multiple
				? classList[fn](...args)
				: args.forEach((cls) => { return classList[fn](cls); });
		});
	}

	function getArgs$1(args) {
		return args.reduce((args, arg) => { return args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg); }
			, []);
	}

	var supports = {};

	// IE 11
	(function () {

		let list = document.createElement('_').classList;
		if (list) {
			list.add('a', 'b');
			list.toggle('c', false);
			supports.Multiple = list.contains('b');
			supports.Force = !list.contains('c');
		}
		list = null;

	})();

	let cssNumber = {
		'animation-iteration-count': true,
		'column-count': true,
		'fill-opacity': true,
		'flex-grow': true,
		'flex-shrink': true,
		'font-weight': true,
		'line-height': true,
		'opacity': true,
		'order': true,
		'orphans': true,
		'stroke-dasharray': true,
		'stroke-dashoffset': true,
		'widows': true,
		'z-index': true,
		'zoom': true
	};

	function css(element, property, value) {

		return toNodes(element).map((element) => {

			if (isString(property)) {

				property = propName(property);

				if (isUndefined(value)) {
					return getStyle(element, property);
				} else if (!value && !isNumber(value)) {
					element.style.removeProperty(property);
				} else {
					element.style[property] = isNumeric(value) && !cssNumber[property] ? (value + "px") : value;
				}

			} else if (isArray(property)) {

				let styles = getStyles(element);

				return property.reduce((props, property) => {
					props[property] = styles[propName(property)];
					return props;
				}, {});

			} else if (isObject(property)) {
				each(property, (value, property) => { return css(element, property, value); });
			}

			return element;

		})[0];

	}

	function getStyles(element, pseudoElt) {
		element = toNode(element);
		return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
	}

	function getStyle(element, property, pseudoElt) {
		return getStyles(element, pseudoElt)[property];
	}

	let vars = {};

	function getCssVar(name) {

		let docEl = document.documentElement;

		if (!isIE) {
			return getStyles(docEl).getPropertyValue(("--uk-" + name));
		}

		if (!(name in vars)) {

			/* usage in css: .uk-name:before { content:"xyz" } */

			let element = append(docEl, document.createElement('div'));

			addClass(element, ("uk-" + name));

			vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');

			remove(element);

		}

		return vars[name];

	}

	let cssProps = {};

	function propName(name) {

		let ret = cssProps[name];
		if (!ret) {
			ret = cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	let cssPrefixes = ['webkit', 'moz', 'ms'];
	let ref = document.createElement('_');
	let style = ref.style;

	function vendorPropName(name) {

		name = hyphenate(name);

		if (name in style) {
			return name;
		}

		let i = cssPrefixes.length, prefixedName;

		while (i--) {
			prefixedName = "-" + (cssPrefixes[i]) + "-" + name;
			if (prefixedName in style) {
				return prefixedName;
			}
		}
	}

	function transition(element, props, duration, timing) {
		if ( duration === void 0 ) duration = 400;
		if ( timing === void 0 ) timing = 'linear';


		return Promise.all(toNodes(element).map((element) => { return new Promise(((resolve, reject) => {

			for (let name in props) {
				let value = css(element, name);
				if (value === '') {
					css(element, name, value);
				}
			}

			let timer = setTimeout(() => { return trigger(element, 'transitionend'); }, duration);

			once(element, 'transitionend transitioncanceled', (ref) => {
				let type = ref.type;

				clearTimeout(timer);
				removeClass(element, 'uk-transition');
				css(element, {
					'transition-property': '',
					'transition-duration': '',
					'transition-timing-function': ''
				});
				type === 'transitioncanceled' ? reject() : resolve();
			}, false, (ref) => {
				let target = ref.target;

				return element === target;
			});

			addClass(element, 'uk-transition');
			css(element, assign({
				'transition-property': Object.keys(props).map(propName).join(','),
				'transition-duration': (duration + "ms"),
				'transition-timing-function': timing
			}, props));

		})); }
		));

	}

	let Transition = {

		start: transition,

		stop(element) {
			trigger(element, 'transitionend');
			return Promise.resolve();
		},

		cancel(element) {
			trigger(element, 'transitioncanceled');
		},

		inProgress(element) {
			return hasClass(element, 'uk-transition');
		}

	};

	let animationPrefix = 'uk-animation-';
	let clsCancelAnimation = 'uk-cancel-animation';

	function animate(element, animation, duration, origin, out) {
		let arguments$1 = arguments;
		if ( duration === void 0 ) duration = 200;


		return Promise.all(toNodes(element).map((element) => { return new Promise(((resolve, reject) => {

			if (hasClass(element, clsCancelAnimation)) {
				requestAnimationFrame(() => { return Promise.resolve().then(() => { return animate(...arguments$1).then(resolve, reject); }
				); }
				);
				return;
			}

			let cls = animation + " " + animationPrefix + (out ? 'leave' : 'enter');

			if (startsWith(animation, animationPrefix)) {

				if (origin) {
					cls += " uk-transform-origin-" + origin;
				}

				if (out) {
					cls += " " + animationPrefix + "reverse";
				}

			}

			reset();

			once(element, 'animationend animationcancel', (ref) => {
				let type = ref.type;


				let hasReset = false;

				if (type === 'animationcancel') {
					reject();
					reset();
				} else {
					resolve();
					Promise.resolve().then(() => {
						hasReset = true;
						reset();
					});
				}

				requestAnimationFrame(() => {
					if (!hasReset) {
						addClass(element, clsCancelAnimation);

						requestAnimationFrame(() => { return removeClass(element, clsCancelAnimation); });
					}
				});

			}, false, (ref) => {
				let target = ref.target;

				return element === target;
			});

			css(element, 'animationDuration', (duration + "ms"));
			addClass(element, cls);

			function reset() {
				css(element, 'animationDuration', '');
				removeClasses(element, (animationPrefix + "\\S*"));
			}

		})); }
		));

	}

	let inProgress = new RegExp((animationPrefix + "(enter|leave)"));
	let Animation = {

		in(element, animation, duration, origin) {
			return animate(element, animation, duration, origin, false);
		},

		out(element, animation, duration, origin) {
			return animate(element, animation, duration, origin, true);
		},

		inProgress(element) {
			return inProgress.test(attr(element, 'class'));
		},

		cancel(element) {
			trigger(element, 'animationcancel');
		}

	};

	let dirs = {
		width: ['x', 'left', 'right'],
		height: ['y', 'top', 'bottom']
	};

	function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {

		elAttach = getPos(elAttach);
		targetAttach = getPos(targetAttach);

		let flipped = {element: elAttach, target: targetAttach};

		if (!element || !target) {
			return flipped;
		}

		let dim = getDimensions(element);
		let targetDim = getDimensions(target);
		let position = targetDim;

		moveTo(position, elAttach, dim, -1);
		moveTo(position, targetAttach, targetDim, 1);

		elOffset = getOffsets(elOffset, dim.width, dim.height);
		targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

		elOffset['x'] += targetOffset['x'];
		elOffset['y'] += targetOffset['y'];

		position.left += elOffset['x'];
		position.top += elOffset['y'];

		if (flip) {

			let boundaries = [getDimensions(getWindow(element))];

			if (boundary) {
				boundaries.unshift(getDimensions(boundary));
			}

			each(dirs, (ref, prop) => {
				let dir = ref[0];
				let align = ref[1];
				let alignFlip = ref[2];


				if (!(flip === true || includes(flip, dir))) {
					return;
				}

				boundaries.some((boundary) => {

					let elemOffset = elAttach[dir] === align
						? -dim[prop]
						: elAttach[dir] === alignFlip
							? dim[prop]
							: 0;

					let targetOffset = targetAttach[dir] === align
						? targetDim[prop]
						: targetAttach[dir] === alignFlip
							? -targetDim[prop]
							: 0;

					if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

						let centerOffset = dim[prop] / 2;
						let centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

						return elAttach[dir] === 'center' && (
							apply(centerOffset, centerTargetOffset)
                            || apply(-centerOffset, -centerTargetOffset)
						) || apply(elemOffset, targetOffset);

					}

					function apply(elemOffset, targetOffset) {

						let newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

						if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
							position[align] = newVal;

							['element', 'target'].forEach((el) => {
								flipped[el][dir] = !elemOffset
									? flipped[el][dir]
									: flipped[el][dir] === dirs[prop][1]
										? dirs[prop][2]
										: dirs[prop][1];
							});

							return true;
						}

					}

				});

			});
		}

		offset(element, position);

		return flipped;
	}

	function offset(element, coordinates) {

		element = toNode(element);

		if (coordinates) {

			let currentOffset = offset(element);
			let pos = css(element, 'position');

			['left', 'top'].forEach((prop) => {
				if (prop in coordinates) {
					let value = css(element, prop);
					css(element, prop, coordinates[prop] - currentOffset[prop]
                        + toFloat(pos === 'absolute' && value === 'auto'
                        	? position(element)[prop]
                        	: value)
					);
				}
			});

			return;
		}

		return getDimensions(element);
	}

	function getDimensions(element) {

		element = toNode(element);

		let ref = getWindow(element);
		let top = ref.pageYOffset;
		let left = ref.pageXOffset;

		if (isWindow(element)) {

			let height = element.innerHeight;
			let width = element.innerWidth;

			return {
				top,
				left,
				height,
				width,
				bottom: top + height,
				right: left + width
			};
		}

		let style, hidden;

		if (!isVisible(element)) {
			style = attr(element, 'style');
			hidden = attr(element, 'hidden');

			attr(element, {
				style: ((style || '') + ";display:block !important;"),
				hidden: null
			});
		}

		let rect = element.getBoundingClientRect();

		if (!isUndefined(style)) {
			attr(element, {style, hidden});
		}

		return {
			height: rect.height,
			width: rect.width,
			top: rect.top + top,
			left: rect.left + left,
			bottom: rect.bottom + top,
			right: rect.right + left
		};
	}

	function position(element) {
		element = toNode(element);

		let parent = element.offsetParent || getDocEl(element);
		let parentOffset = offset(parent);
		let ref = ['top', 'left'].reduce((props, prop) => {
			let propName = ucfirst(prop);
			props[prop] -= parentOffset[prop]
                + toFloat(css(element, ("margin" + propName)))
                + toFloat(css(parent, ("border" + propName + "Width")));
			return props;
		}, offset(element));
		let top = ref.top;
		let left = ref.left;

		return {top, left};
	}

	let height = dimension('height');
	let width = dimension('width');

	function dimension(prop) {
		let propName = ucfirst(prop);
		return function (element, value) {

			element = toNode(element);

			if (isUndefined(value)) {

				if (isWindow(element)) {
					return element[("inner" + propName)];
				}

				if (isDocument(element)) {
					let doc = element.documentElement;
					return Math.max(doc[("offset" + propName)], doc[("scroll" + propName)]);
				}

				value = css(element, prop);
				value = value === 'auto' ? element[("offset" + propName)] : toFloat(value) || 0;

				return value - boxModelAdjust(prop, element);

			}

			css(element, prop, !value && value !== 0
				? ''
				: +value + boxModelAdjust(prop, element) + 'px'
			);

            

		};
	}

	function boxModelAdjust(prop, element, sizing) {
		if ( sizing === void 0 ) sizing = 'border-box';

		return css(element, 'boxSizing') === sizing
			? dirs[prop].slice(1).map(ucfirst).reduce((value, prop) => { return value
                + toFloat(css(element, ("padding" + prop)))
                + toFloat(css(element, ("border" + prop + "Width"))); }
				, 0)
			: 0;
	}

	function moveTo(position, attach, dim, factor) {
		each(dirs, (ref, prop) => {
			let dir = ref[0];
			let align = ref[1];
			let alignFlip = ref[2];

			if (attach[dir] === alignFlip) {
				position[align] += dim[prop] * factor;
			} else if (attach[dir] === 'center') {
				position[align] += dim[prop] * factor / 2;
			}
		});
	}

	function getPos(pos) {

		let x = /left|center|right/;
		let y = /top|center|bottom/;

		pos = (pos || '').split(' ');

		if (pos.length === 1) {
			pos = x.test(pos[0])
				? pos.concat(['center'])
				: y.test(pos[0])
					? ['center'].concat(pos)
					: ['center', 'center'];
		}

		return {
			x: x.test(pos[0]) ? pos[0] : 'center',
			y: y.test(pos[1]) ? pos[1] : 'center'
		};
	}

	function getOffsets(offsets, width, height) {

		let ref = (offsets || '').split(' ');
		let x = ref[0];
		let y = ref[1];

		return {
			x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
			y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
		};
	}

	function flipPosition(pos) {
		switch (pos) {
			case 'left':
				return 'right';
			case 'right':
				return 'left';
			case 'top':
				return 'bottom';
			case 'bottom':
				return 'top';
			default:
				return pos;
		}
	}

	function isInView(element, topOffset, leftOffset) {
		if ( topOffset === void 0 ) topOffset = 0;
		if ( leftOffset === void 0 ) leftOffset = 0;


		if (!isVisible(element)) {
			return false;
		}

		element = toNode(element);

		let win = getWindow(element);
		let client = element.getBoundingClientRect();
		let bounding = {
			top: -topOffset,
			left: -leftOffset,
			bottom: topOffset + height(win),
			right: leftOffset + width(win)
		};

		return intersectRect(client, bounding) || pointInRect({x: client.left, y: client.top}, bounding);

	}

	function scrolledOver(element, heightOffset) {
		if ( heightOffset === void 0 ) heightOffset = 0;


		if (!isVisible(element)) {
			return 0;
		}

		element = toNode(element);

		let win = getWindow(element);
		let doc = getDocument(element);
		let elHeight = element.offsetHeight + heightOffset;
		let ref = offsetPosition(element);
		let top = ref[0];
		let vp = height(win);
		let vh = vp + Math.min(0, top - vp);
		let diff = Math.max(0, vp - (height(doc) + heightOffset - (top + elHeight)));

		return clamp(((vh + win.pageYOffset - top) / ((vh + (elHeight - (diff < vp ? diff : 0))) / 100)) / 100);
	}

	function scrollTop(element, top) {
		element = toNode(element);

		if (isWindow(element) || isDocument(element)) {
			let ref = getWindow(element);
			let scrollTo = ref.scrollTo;
			let pageXOffset = ref.pageXOffset;
			scrollTo(pageXOffset, top);
		} else {
			element.scrollTop = top;
		}
	}

	function offsetPosition(element) {
		let offset = [0, 0];

		do {

			offset[0] += element.offsetTop;
			offset[1] += element.offsetLeft;

			if (css(element, 'position') === 'fixed') {
				let win = getWindow(element);
				offset[0] += win.pageYOffset;
				offset[1] += win.pageXOffset;
				return offset;
			}

		} while ((element = element.offsetParent));

		return offset;
	}

	function toPx(value, property, element) {
		if ( property === void 0 ) property = 'width';
		if ( element === void 0 ) element = window;

		return isNumeric(value)
			? +value
			: endsWith(value, 'vh')
				? percent(height(getWindow(element)), value)
				: endsWith(value, 'vw')
					? percent(width(getWindow(element)), value)
					: endsWith(value, '%')
						? percent(getDimensions(element)[property], value)
						: toFloat(value);
	}

	function percent(base, value) {
		return base * toFloat(value) / 100;
	}

	function getWindow(element) {
		return isWindow(element) ? element : getDocument(element).defaultView;
	}

	function getDocument(element) {
		return toNode(element).ownerDocument;
	}

	function getDocEl(element) {
		return getDocument(element).documentElement;
	}

	/*
        Based on:
        Copyright (c) 2016 Wilson Page wilsonpage@me.com
        https://github.com/wilsonpage/fastdom
    */

	let fastdom = {

		reads: [],
		writes: [],

		read(task) {
			this.reads.push(task);
			scheduleFlush();
			return task;
		},

		write(task) {
			this.writes.push(task);
			scheduleFlush();
			return task;
		},

		clear(task) {
			return remove$1(this.reads, task) || remove$1(this.writes, task);
		},

		flush() {

			runTasks(this.reads);
			runTasks(this.writes.splice(0, this.writes.length));

			this.scheduled = false;

			if (this.reads.length || this.writes.length) {
				scheduleFlush();
			}

		}

	};

	function scheduleFlush() {
		if (!fastdom.scheduled) {
			fastdom.scheduled = true;
			requestAnimationFrame(fastdom.flush.bind(fastdom));
		}
	}

	function runTasks(tasks) {
		let task;
		while ((task = tasks.shift())) {
			task();
		}
	}

	function remove$1(array, item) {
		let index = array.indexOf(item);
		return !!~index && !!array.splice(index, 1);
	}

	function MouseTracker() {}

	MouseTracker.prototype = {

		positions: [],
		position: null,

		init() {
			let this$1 = this;


			this.positions = [];
			this.position = null;

			let ticking = false;
			this.unbind = on(document, 'mousemove', (e) => {

				if (ticking) {
					return;
				}

				setTimeout(() => {

					let time = Date.now();
					let ref = this$1.positions;
					let length = ref.length;

					if (length && (time - this$1.positions[length - 1].time > 100)) {
						this$1.positions.splice(0, length);
					}

					this$1.positions.push({time, x: e.pageX, y: e.pageY});

					if (this$1.positions.length > 5) {
						this$1.positions.shift();
					}

					ticking = false;
				}, 5);

				ticking = true;
			});

		},

		cancel() {
			if (this.unbind) {
				this.unbind();
			}
		},

		movesTo(target) {

			if (this.positions.length < 2) {
				return false;
			}

			let p = offset(target);
			let position = this.positions[this.positions.length - 1];
			let ref = this.positions;
			let prevPos = ref[0];

			if (p.left <= position.x && position.x <= p.right && p.top <= position.y && position.y <= p.bottom) {
				return false;
			}

			let points = [
				[{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
				[{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
			];

			if (p.right <= position.x) ; else if (p.left >= position.x) {
				points[0].reverse();
				points[1].reverse();
			} else if (p.bottom <= position.y) {
				points[0].reverse();
			} else if (p.top >= position.y) {
				points[1].reverse();
			}

			return !!points.reduce((result, point) => {
				return result + (slope(prevPos, point[0]) < slope(position, point[0]) && slope(prevPos, point[1]) > slope(position, point[1]));
			}, 0);
		}

	};

	function slope(a, b) {
		return (b.y - a.y) / (b.x - a.x);
	}

	let strats = {};

	strats.events =
    strats.created =
    strats.beforeConnect =
    strats.connected =
    strats.beforeDisconnect =
    strats.disconnected =
    strats.destroy = concatStrat;

	// args strategy
	strats.args = function (parentVal, childVal) {
		return concatStrat(childVal || parentVal);
	};

	// update strategy
	strats.update = function (parentVal, childVal) {
		return sortBy(concatStrat(parentVal, isFunction(childVal) ? {read: childVal} : childVal), 'order');
	};

	// property strategy
	strats.props = function (parentVal, childVal) {

		if (isArray(childVal)) {
			childVal = childVal.reduce((value, key) => {
				value[key] = String;
				return value;
			}, {});
		}

		return strats.methods(parentVal, childVal);
	};

	// extend strategy
	strats.computed =
    strats.methods = function (parentVal, childVal) {
    	return childVal
    		? parentVal
    			? assign({}, parentVal, childVal)
    			: childVal
    		: parentVal;
    };

	// data strategy
	strats.data = function (parentVal, childVal, vm) {

		if (!vm) {

			if (!childVal) {
				return parentVal;
			}

			if (!parentVal) {
				return childVal;
			}

			return function (vm) {
				return mergeFnData(parentVal, childVal, vm);
			};

		}

		return mergeFnData(parentVal, childVal, vm);
	};

	function mergeFnData(parentVal, childVal, vm) {
		return strats.computed(
			isFunction(parentVal)
				? parentVal.call(vm, vm)
				: parentVal,
			isFunction(childVal)
				? childVal.call(vm, vm)
				: childVal
		);
	}

	// concat strategy
	function concatStrat(parentVal, childVal) {

		parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

		return childVal
			? parentVal
				? parentVal.concat(childVal)
				: isArray(childVal)
					? childVal
					: [childVal]
			: parentVal;
	}

	// default strategy
	function defaultStrat(parentVal, childVal) {
		return isUndefined(childVal) ? parentVal : childVal;
	}

	function mergeOptions(parent, child, vm) {

		let options = {};

		if (isFunction(child)) {
			child = child.options;
		}

		if (child.extends) {
			parent = mergeOptions(parent, child.extends, vm);
		}

		if (child.mixins) {
			for (let i = 0, l = child.mixins.length; i < l; i++) {
				parent = mergeOptions(parent, child.mixins[i], vm);
			}
		}

		for (let key in parent) {
			mergeKey(key);
		}

		for (let key$1 in child) {
			if (!hasOwn(parent, key$1)) {
				mergeKey(key$1);
			}
		}

		function mergeKey(key) {
			options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
		}

		return options;
	}

	function parseOptions(options, args) {
		let obj;

		if ( args === void 0 ) args = [];

		try {

			return !options
				? {}
				: startsWith(options, '{')
					? JSON.parse(options)
					: args.length && !includes(options, ':')
						? (( obj = {}, obj[args[0]] = options, obj ))
						: options.split(';').reduce((options, option) => {
							let ref = option.split(/:(.*)/);
							let key = ref[0];
							let value = ref[1];
							if (key && !isUndefined(value)) {
								options[key.trim()] = value.trim();
							}
							return options;
						}, {});

		} catch (e) {
			return {};
		}

	}

	let id = 0;

	let Player = function(el) {
		this.id = ++id;
		this.el = toNode(el);
	};

	Player.prototype.isVideo = function () {
		return this.isYoutube() || this.isVimeo() || this.isHTML5();
	};

	Player.prototype.isHTML5 = function () {
		return this.el.tagName === 'VIDEO';
	};

	Player.prototype.isIFrame = function () {
		return this.el.tagName === 'IFRAME';
	};

	Player.prototype.isYoutube = function () {
		return this.isIFrame() && !!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
	};

	Player.prototype.isVimeo = function () {
		return this.isIFrame() && !!this.el.src.match(/vimeo\.com\/video\/.*/);
	};

	Player.prototype.enableApi = function () {
		let this$1 = this;


		if (this.ready) {
			return this.ready;
		}

		let youtube = this.isYoutube();
		let vimeo = this.isVimeo();

		let poller;

		if (youtube || vimeo) {

			return this.ready = new Promise(((resolve) => {

				once(this$1.el, 'load', () => {
					if (youtube) {
						let listener = function () { return post(this$1.el, {event: 'listening', id: this$1.id}); };
						poller = setInterval(listener, 100);
						listener();
					}
				});

				listen((data) => { return youtube && data.id === this$1.id && data.event === 'onReady' || vimeo && Number(data.player_id) === this$1.id; })
					.then(() => {
						resolve();
						poller && clearInterval(poller);
					});

				attr(this$1.el, 'src', ("" + (this$1.el.src) + (includes(this$1.el.src, '?') ? '&' : '?') + (youtube ? 'enablejsapi=1' : ("api=1&player_id=" + (this$1.id)))));

			}));

		}

		return Promise.resolve();

	};

	Player.prototype.play = function () {
		let this$1 = this;


		if (!this.isVideo()) {
			return;
		}

		if (this.isIFrame()) {
			this.enableApi().then(() => { return post(this$1.el, {func: 'playVideo', method: 'play'}); });
		} else if (this.isHTML5()) {
			try {
				let promise = this.el.play();

				if (promise) {
					promise.catch(noop);
				}
			} catch (e) {}
		}
	};

	Player.prototype.pause = function () {
		let this$1 = this;


		if (!this.isVideo()) {
			return;
		}

		if (this.isIFrame()) {
			this.enableApi().then(() => { return post(this$1.el, {func: 'pauseVideo', method: 'pause'}); });
		} else if (this.isHTML5()) {
			this.el.pause();
		}
	};

	Player.prototype.mute = function () {
		let this$1 = this;


		if (!this.isVideo()) {
			return;
		}

		if (this.isIFrame()) {
			this.enableApi().then(() => { return post(this$1.el, {func: 'mute', method: 'setVolume', value: 0}); });
		} else if (this.isHTML5()) {
			this.el.muted = true;
			attr(this.el, 'muted', '');
		}

	};

	function post(el, cmd) {
		try {
			el.contentWindow.postMessage(JSON.stringify(assign({event: 'command'}, cmd)), '*');
		} catch (e) {}
	}

	function listen(cb) {

		return new Promise(((resolve) => {

			once(window, 'message', (_, data) => { return resolve(data); }, false, (ref) => {
				let data = ref.data;


				if (!data || !isString(data)) {
					return;
				}

				try {
					data = JSON.parse(data);
				} catch (e) {
					return;
				}

				return data && cb(data);

			});

		}));

	}

	let IntersectionObserver = 'IntersectionObserver' in window
		? window.IntersectionObserver
		: /*@__PURE__*/(function () {
			function IntersectionObserverClass(callback, ref) {
				let this$1 = this;
				if ( ref === void 0 ) ref = {};
				let rootMargin = ref.rootMargin; if ( rootMargin === void 0 ) rootMargin = '0 0';


				this.targets = [];

				let ref$1 = (rootMargin || '0 0').split(' ').map(toFloat);
				let offsetTop = ref$1[0];
				let offsetLeft = ref$1[1];

				this.offsetTop = offsetTop;
				this.offsetLeft = offsetLeft;

				let pending;
				this.apply = function () {

					if (pending) {
						return;
					}

					pending = requestAnimationFrame(() => { return setTimeout(() => {
						let records = this$1.takeRecords();

						if (records.length) {
							callback(records, this$1);
						}

						pending = false;
					}); });

				};

				this.off = on(window, 'scroll resize load', this.apply, {passive: true, capture: true});

			}

			IntersectionObserverClass.prototype.takeRecords = function () {
				let this$1 = this;

				return this.targets.filter((entry) => {

					let inView = isInView(entry.target, this$1.offsetTop, this$1.offsetLeft);

					if (entry.isIntersecting === null || inView ^ entry.isIntersecting) {
						entry.isIntersecting = inView;
						return true;
					}

				});
			};

			IntersectionObserverClass.prototype.observe = function (target) {
				this.targets.push({
					target,
					isIntersecting: null
				});
				this.apply();
			};

			IntersectionObserverClass.prototype.disconnect = function () {
				this.targets = [];
				this.off();
			};

			return IntersectionObserverClass;
		}());

	let off$1;

	on(document, pointerDown, (e) => {

		off$1 && off$1();

		if (!isTouch(e)) {
			return;
		}

		let pos = getPos$1(e);
		let target = 'tagName' in e.target ? e.target : e.target.parentNode;
		off$1 = once(document, pointerUp, (e) => {

			let ref = getPos$1(e);
			let x = ref.x;
			let y = ref.y;

			// swipe
			if (target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {

				setTimeout(() => {
					trigger(target, 'swipe');
					trigger(target, ("swipe" + (swipeDirection(pos.x, pos.y, x, y))));
				});

			}

		});
	});

	function isTouch(e) {
		return e.pointerType === 'touch' || e.touches;
	}

	function getPos$1(e, prop) {
		if ( prop === void 0 ) prop = 'client';

		let touches = e.touches;
		let changedTouches = e.changedTouches;
		let ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
		let x = ref[(prop + "X")];
		let y = ref[(prop + "Y")];

		return {x, y};
	}

	function swipeDirection(x1, y1, x2, y2) {
		return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
			? x1 - x2 > 0
				? 'Left'
				: 'Right'
			: y1 - y2 > 0
				? 'Up'
				: 'Down';
	}



	let util = /*#__PURE__*/Object.freeze({
		ajax,
		getImage,
		transition,
		Transition,
		animate,
		Animation,
		attr,
		hasAttr,
		removeAttr,
		data,
		addClass,
		removeClass,
		removeClasses,
		replaceClass,
		hasClass,
		toggleClass,
		positionAt,
		offset,
		position,
		height,
		width,
		boxModelAdjust,
		flipPosition,
		isInView,
		scrolledOver,
		scrollTop,
		offsetPosition,
		toPx,
		ready,
		index,
		getIndex,
		empty,
		html,
		prepend,
		append,
		before,
		after,
		remove,
		wrapAll,
		wrapInner,
		unwrap,
		fragment,
		apply,
		$,
		$$,
		isIE,
		isRtl,
		hasTouch,
		pointerDown,
		pointerMove,
		pointerUp,
		pointerEnter,
		pointerLeave,
		pointerCancel,
		on,
		off,
		once,
		trigger,
		createEvent,
		toEventTargets,
		preventClick,
		fastdom,
		isVoidElement,
		isVisible,
		selInput,
		isInput,
		filter,
		within,
		bind,
		hasOwn,
		hyphenate,
		camelize,
		ucfirst,
		startsWith,
		endsWith,
		includes,
		isArray,
		isFunction,
		isObject,
		isPlainObject,
		isWindow,
		isDocument,
		isJQuery,
		isNode,
		isNodeCollection,
		isBoolean,
		isString,
		isNumber,
		isNumeric,
		isUndefined,
		toBoolean,
		toNumber,
		toFloat,
		toNode,
		toNodes,
		toList,
		toMs,
		isEqual,
		swap,
		assign,
		each,
		sortBy,
		clamp,
		noop,
		intersectRect,
		pointInRect,
		Dimensions,
		MouseTracker,
		mergeOptions,
		parseOptions,
		Player,
		Promise,
		Deferred,
		IntersectionObserver,
		query,
		queryAll,
		find,
		findAll,
		matches,
		closest,
		parents,
		escape,
		css,
		getStyles,
		getStyle,
		getCssVar,
		propName,
		isTouch,
		getPos: getPos$1
	});

	function componentAPI (UIkit) {

		let DATA = UIkit.data;

		let components = {};

		UIkit.component = function (name, options) {

			if (!options) {

				if (isPlainObject(components[name])) {
					components[name] = UIkit.extend(components[name]);
				}

				return components[name];

			}

			UIkit[name] = function (element, data) {
				let i = arguments.length, argsArray = Array(i);
				while ( i-- ) argsArray[i] = arguments[i];


				let component = UIkit.component(name);

				if (isPlainObject(element)) {
					return new component({data: element});
				}

				if (component.options.functional) {
					return new component({data: [].concat( argsArray )});
				}

				return element && element.nodeType ? init(element) : $$(element).map(init)[0];

				function init(element) {

					let instance = UIkit.getComponent(element, name);

					if (instance) {
						if (!data) {
							return instance;
						}
						instance.$destroy();
						
					}

					return new component({el: element, data});

				}

			};

			let opt = isPlainObject(options) ? assign({}, options) : options.options;

			opt.name = name;

			if (opt.install) {
				opt.install(UIkit, opt, name);
			}

			if (UIkit._initialized && !opt.functional) {
				let id = hyphenate(name);
				fastdom.read(() => { return UIkit[name](("[uk-" + id + "],[data-uk-" + id + "]")); });
			}

			return components[name] = isPlainObject(options) ? opt : options;
		};

		UIkit.getComponents = function (element) { return element && element[DATA] || {}; };
		UIkit.getComponent = function (element, name) { return UIkit.getComponents(element)[name]; };

		UIkit.connect = function (node) {

			if (node[DATA]) {
				for (let name in node[DATA]) {
					node[DATA][name]._callConnected();
				}
			}

			for (let i = 0; i < node.attributes.length; i++) {

				let name$1 = getComponentName(node.attributes[i].name);

				if (name$1 && name$1 in components) {
					UIkit[name$1](node);
				}

			}

		};

		UIkit.disconnect = function (node) {
			for (let name in node[DATA]) {
				node[DATA][name]._callDisconnected();
			}
		};

	}

	function getComponentName(attribute) {
		return startsWith(attribute, 'uk-') || startsWith(attribute, 'data-uk-')
			? camelize(attribute.replace('data-uk-', '').replace('uk-', ''))
			: false;
	}

	function boot (UIkit) {

		let connect = UIkit.connect;
		let disconnect = UIkit.disconnect;

		if (!('MutationObserver' in window)) {
			return;
		}

		if (document.body) {

			init();

		} else {

			(new MutationObserver(function () {

				if (document.body) {
					this.disconnect();
					init();
				}

			})).observe(document, {childList: true, subtree: true});

		}

		function init() {

			apply(document.body, connect);

			fastdom.flush();

			(new MutationObserver(((mutations) => { return mutations.forEach(applyMutation); }))).observe(document, {
				childList: true,
				subtree: true,
				characterData: true,
				attributes: true
			});

			UIkit._initialized = true;
		}

		function applyMutation(mutation) {

			let target = mutation.target;
			let type = mutation.type;

			let update = type !== 'attributes'
				? applyChildList(mutation)
				: applyAttribute(mutation);

			update && UIkit.update(target);

		}

		function applyAttribute(ref) {
			let target = ref.target;
			let attributeName = ref.attributeName;


			if (attributeName === 'href') {
				return true;
			}

			let name = getComponentName(attributeName);

			if (!name || !(name in UIkit)) {
				return;
			}

			if (hasAttr(target, attributeName)) {
				UIkit[name](target);
				return true;
			}

			let component = UIkit.getComponent(target, name);

			if (component) {
				component.$destroy();
				return true;
			}

		}

		function applyChildList(ref) {
			let addedNodes = ref.addedNodes;
			let removedNodes = ref.removedNodes;


			for (let i = 0; i < addedNodes.length; i++) {
				apply(addedNodes[i], connect);
			}

			for (let i$1 = 0; i$1 < removedNodes.length; i$1++) {
				apply(removedNodes[i$1], disconnect);
			}

			return true;
		}

		function apply(node, fn) {

			if (node.nodeType !== 1 || hasAttr(node, 'uk-no-boot')) {
				return;
			}

			fn(node);
			node = node.firstElementChild;
			while (node) {
				let next = node.nextElementSibling;
				apply(node, fn);
				node = next;
			}
		}

	}

	function globalAPI (UIkit) {

		let DATA = UIkit.data;

		UIkit.use = function (plugin) {

			if (plugin.installed) {
				return;
			}

			plugin.call(null, this);
			plugin.installed = true;

			return this;
		};

		UIkit.mixin = function (mixin, component) {
			component = (isString(component) ? UIkit.component(component) : component) || this;
			component.options = mergeOptions(component.options, mixin);
		};

		UIkit.extend = function (options) {

			options = options || {};

			let Super = this;
			let Sub = function UIkitComponent (options) {
				this._init(options);
			};

			Sub.prototype = Object.create(Super.prototype);
			Sub.prototype.constructor = Sub;
			Sub.options = mergeOptions(Super.options, options);

			Sub.super = Super;
			Sub.extend = Super.extend;

			return Sub;
		};

		UIkit.update = function (element, e) {

			element = element ? toNode(element) : document.body;

			path(element, (element) => { return update(element[DATA], e); });
			apply(element, (element) => { return update(element[DATA], e); });

		};

		let container;
		Object.defineProperty(UIkit, 'container', {

			get() {
				return container || document.body;
			},

			set(element) {
				container = $(element);
			}

		});

		function update(data, e) {

			if (!data) {
				return;
			}

			for (let name in data) {
				if (data[name]._connected) {
					data[name]._callUpdate(e);
				}
			}

		}

		function path(node, fn) {
			if (node && node !== document.body && node.parentNode) {
				path(node.parentNode, fn);
				fn(node.parentNode);
			}
		}

	}

	function hooksAPI (UIkit) {

		UIkit.prototype._callHook = function (hook) {
			let this$1 = this;


			let handlers = this.$options[hook];

			if (handlers) {
				handlers.forEach((handler) => { return handler.call(this$1); });
			}
		};

		UIkit.prototype._callConnected = function () {

			if (this._connected) {
				return;
			}

			this._data = {};
			this._computeds = {};
			this._initProps();

			this._callHook('beforeConnect');
			this._connected = true;

			this._initEvents();
			this._initObserver();

			this._callHook('connected');
			this._callUpdate();
		};

		UIkit.prototype._callDisconnected = function () {

			if (!this._connected) {
				return;
			}

			this._callHook('beforeDisconnect');

			if (this._observer) {
				this._observer.disconnect();
				this._observer = null;
			}

			this._unbindEvents();
			this._callHook('disconnected');

			this._connected = false;

		};

		UIkit.prototype._callUpdate = function (e) {
			let this$1 = this;
			if ( e === void 0 ) e = 'update';


			let type = e.type || e;

			if (includes(['update', 'resize'], type)) {
				this._callWatches();
			}

			let updates = this.$options.update;
			let ref = this._frames;
			let reads = ref.reads;
			let writes = ref.writes;

			if (!updates) {
				return;
			}

			updates.forEach((ref, i) => {
				let read = ref.read;
				let write = ref.write;
				let events = ref.events;


				if (type !== 'update' && !includes(events, type)) {
					return;
				}

				if (read && !includes(fastdom.reads, reads[i])) {
					reads[i] = fastdom.read(() => {

						let result = this$1._connected && read.call(this$1, this$1._data, type);

						if (result === false && write) {
							fastdom.clear(writes[i]);
						} else if (isPlainObject(result)) {
							assign(this$1._data, result);
						}
					});
				}

				if (write && !includes(fastdom.writes, writes[i])) {
					writes[i] = fastdom.write(() => { return this$1._connected && write.call(this$1, this$1._data, type); });
				}

			});

		};

	}

	function stateAPI (UIkit) {

		let uid = 0;

		UIkit.prototype._init = function (options) {

			options = options || {};
			options.data = normalizeData(options, this.constructor.options);

			this.$options = mergeOptions(this.constructor.options, options, this);
			this.$el = null;
			this.$props = {};

			this._frames = {reads: {}, writes: {}};
			this._events = [];

			this._uid = uid++;
			this._initData();
			this._initMethods();
			this._initComputeds();
			this._callHook('created');

			if (options.el) {
				this.$mount(options.el);
			}
		};

		UIkit.prototype._initData = function () {

			let ref = this.$options;
			let data = ref.data; if ( data === void 0 ) data = {};

			for (let key in data) {
				this.$props[key] = this[key] = data[key];
			}
		};

		UIkit.prototype._initMethods = function () {

			let ref = this.$options;
			let methods = ref.methods;

			if (methods) {
				for (let key in methods) {
					this[key] = bind(methods[key], this);
				}
			}
		};

		UIkit.prototype._initComputeds = function () {

			let ref = this.$options;
			let computed = ref.computed;

			this._computeds = {};

			if (computed) {
				for (let key in computed) {
					registerComputed(this, key, computed[key]);
				}
			}
		};

		UIkit.prototype._callWatches = function () {

			let ref = this;
			let computed = ref.$options.computed;
			let _computeds = ref._computeds;

			for (let key in _computeds) {

				let value = _computeds[key];
				delete _computeds[key];

				if (computed[key].watch && !isEqual(value, this[key])) {
					computed[key].watch.call(this, this[key], value);
				}

			}

		};

		UIkit.prototype._initProps = function (props) {

			let key;

			props = props || getProps(this.$options, this.$name);

			for (key in props) {
				if (!isUndefined(props[key])) {
					this.$props[key] = props[key];
				}
			}

			let exclude = [this.$options.computed, this.$options.methods];
			for (key in this.$props) {
				if (key in props && notIn(exclude, key)) {
					this[key] = this.$props[key];
				}
			}
		};

		UIkit.prototype._initEvents = function () {
			let this$1 = this;


			let ref = this.$options;
			let events = ref.events;

			if (events) {

				events.forEach((event) => {

					if (!hasOwn(event, 'handler')) {
						for (let key in event) {
							registerEvent(this$1, event[key], key);
						}
					} else {
						registerEvent(this$1, event);
					}

				});
			}
		};

		UIkit.prototype._unbindEvents = function () {
			this._events.forEach((unbind) => { return unbind(); });
			this._events = [];
		};

		UIkit.prototype._initObserver = function () {
			let this$1 = this;


			let ref = this.$options;
			let attrs = ref.attrs;
			let props = ref.props;
			let el = ref.el;
			if (this._observer || !props || attrs === false) {
				return;
			}

			attrs = isArray(attrs) ? attrs : Object.keys(props);

			this._observer = new MutationObserver((() => {

				let data = getProps(this$1.$options, this$1.$name);
				if (attrs.some((key) => { return !isUndefined(data[key]) && data[key] !== this$1.$props[key]; })) {
					this$1.$reset();
				}

			}));

			let filter = attrs.map((key) => { return hyphenate(key); }).concat(this.$name);

			this._observer.observe(el, {
				attributes: true,
				attributeFilter: filter.concat(filter.map((key) => { return ("data-" + key); }))
			});
		};

		function getProps(opts, name) {

			let data$1 = {};
			let args = opts.args; if ( args === void 0 ) args = [];
			let props = opts.props; if ( props === void 0 ) props = {};
			let el = opts.el;

			if (!props) {
				return data$1;
			}

			for (let key in props) {
				let prop = hyphenate(key);
				let value = data(el, prop);

				if (!isUndefined(value)) {

					value = props[key] === Boolean && value === ''
						? true
						: coerce(props[key], value);

					if (prop === 'target' && (!value || startsWith(value, '_'))) {
						continue;
					}

					data$1[key] = value;
				}
			}

			let options = parseOptions(data(el, name), args);

			for (let key$1 in options) {
				let prop$1 = camelize(key$1);
				if (props[prop$1] !== undefined) {
					data$1[prop$1] = coerce(props[prop$1], options[key$1]);
				}
			}

			return data$1;
		}

		function registerComputed(component, key, cb) {
			Object.defineProperty(component, key, {

				enumerable: true,

				get() {

					let _computeds = component._computeds;
					let $props = component.$props;
					let $el = component.$el;

					if (!hasOwn(_computeds, key)) {
						_computeds[key] = (cb.get || cb).call(component, $props, $el);
					}

					return _computeds[key];
				},

				set(value) {

					let _computeds = component._computeds;

					_computeds[key] = cb.set ? cb.set.call(component, value) : value;

					if (isUndefined(_computeds[key])) {
						delete _computeds[key];
					}
				}

			});
		}

		function registerEvent(component, event, key) {

			if (!isPlainObject(event)) {
				event = ({name: key, handler: event});
			}

			let name = event.name;
			let el = event.el;
			let handler = event.handler;
			let capture = event.capture;
			let passive = event.passive;
			let delegate = event.delegate;
			let filter = event.filter;
			let self = event.self;
			el = isFunction(el)
				? el.call(component)
				: el || component.$el;

			if (isArray(el)) {
				el.forEach((el) => { return registerEvent(component, assign({}, event, {el}), key); });
				return;
			}

			if (!el || filter && !filter.call(component)) {
				return;
			}

			handler = detail(isString(handler) ? component[handler] : bind(handler, component));

			if (self) {
				handler = selfFilter(handler);
			}

			component._events.push(
				on(
					el,
					name,
					!delegate
						? null
						: isString(delegate)
							? delegate
							: delegate.call(component),
					handler,
					isBoolean(passive)
						? {passive, capture}
						: capture
				)
			);

		}

		function selfFilter(handler) {
			return function selfHandler(e) {
				if (e.target === e.currentTarget || e.target === e.current) {
					return handler.call(null, e);
				}
			};
		}

		function notIn(options, key) {
			return options.every((arr) => { return !arr || !hasOwn(arr, key); });
		}

		function detail(listener) {
			return function (e) { return isArray(e.detail) ? listener(...[e].concat(e.detail)) : listener(e); };
		}

		function coerce(type, value) {

			if (type === Boolean) {
				return toBoolean(value);
			} else if (type === Number) {
				return toNumber(value);
			} else if (type === 'list') {
				return toList(value);
			}

			return type ? type(value) : value;
		}

		function normalizeData(ref, ref$1) {
			let data = ref.data;
			let el = ref.el;
			let args = ref$1.args;
			let props = ref$1.props; if ( props === void 0 ) props = {};

			data = isArray(data)
				? args && args.length
					? data.slice(0, args.length).reduce((data, value, index) => {
						if (isPlainObject(value)) {
							assign(data, value);
						} else {
							data[args[index]] = value;
						}
						return data;
					}, {})
					: undefined
				: data;

			if (data) {
				for (let key in data) {
					if (isUndefined(data[key])) {
						delete data[key];
					} else {
						data[key] = props[key] ? coerce(props[key], data[key], el) : data[key];
					}
				}
			}

			return data;
		}
	}

	function instanceAPI (UIkit) {

		let DATA = UIkit.data;

		UIkit.prototype.$mount = function (el) {

			let ref = this.$options;
			let name = ref.name;

			if (!el[DATA]) {
				el[DATA] = {};
			}

			if (el[DATA][name]) {
				return;
			}

			el[DATA][name] = this;

			this.$el = this.$options.el = this.$options.el || el;

			if (within(el, document)) {
				this._callConnected();
			}
		};

		UIkit.prototype.$emit = function (e) {
			this._callUpdate(e);
		};

		UIkit.prototype.$reset = function () {
			this._callDisconnected();
			this._callConnected();
		};

		UIkit.prototype.$destroy = function (removeEl) {
			if ( removeEl === void 0 ) removeEl = false;


			let ref = this.$options;
			let el = ref.el;
			let name = ref.name;

			if (el) {
				this._callDisconnected();
			}

			this._callHook('destroy');

			if (!el || !el[DATA]) {
				return;
			}

			delete el[DATA][name];

			if (!Object.keys(el[DATA]).length) {
				delete el[DATA];
			}

			if (removeEl) {
				remove(this.$el);
			}
		};

		UIkit.prototype.$create = function (component, element, data) {
			return UIkit[component](element, data);
		};

		UIkit.prototype.$update = UIkit.update;
		UIkit.prototype.$getComponent = UIkit.getComponent;

		let names = {};
		Object.defineProperties(UIkit.prototype, {

			$container: Object.getOwnPropertyDescriptor(UIkit, 'container'),

			$name: {

				get() {
					let ref = this.$options;
					let name = ref.name;

					if (!names[name]) {
						names[name] = UIkit.prefix + hyphenate(name);
					}

					return names[name];
				}

			}

		});

	}

	let UIkit = function (options) {
		this._init(options);
	};

	UIkit.util = util;
	UIkit.data = '__uikit__';
	UIkit.prefix = 'uk-';
	UIkit.options = {};

	globalAPI(UIkit);
	hooksAPI(UIkit);
	stateAPI(UIkit);
	componentAPI(UIkit);
	instanceAPI(UIkit);

	function Core (UIkit) {

		ready(() => {

			UIkit.update();
			on(window, 'load resize', () => { return UIkit.update(null, 'resize'); });
			on(document, 'loadedmetadata load', (ref) => {
				let target = ref.target;

				return UIkit.update(target, 'resize');
			}, true);

			// throttle `scroll` event (Safari triggers multiple `scroll` events per frame)
			let pending;
			on(window, 'scroll', (e) => {

				if (pending) {
					return;
				}
				pending = true;
				fastdom.write(() => { return pending = false; });

				let target = e.target;
				UIkit.update(target.nodeType !== 1 ? document.body : target, e.type);

			}, {passive: true, capture: true});

			let started = 0;
			on(document, 'animationstart', (ref) => {
				let target = ref.target;

				if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {

					started++;
					css(document.body, 'overflowX', 'hidden');
					setTimeout(() => {
						if (!--started) {
							css(document.body, 'overflowX', '');
						}
					}, toMs(css(target, 'animationDuration')) + 100);
				}
			}, true);

		});

	}

	let Position = {

		props: {
			pos: String,
			offset: null,
			flip: Boolean,
			clsPos: String
		},

		data: {
			pos: ("bottom-" + (!isRtl ? 'left' : 'right')),
			flip: true,
			offset: false,
			clsPos: ''
		},

		computed: {

			pos(ref) {
				let pos = ref.pos;

				return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
			},

			dir() {
				return this.pos[0];
			},

			align() {
				return this.pos[1];
			}

		},

		methods: {

			positionAt(element, target, boundary) {

				removeClasses(element, ((this.clsPos) + "-(top|bottom|left|right)(-[a-z]+)?"));
				css(element, {top: '', left: ''});

				let node;
				let ref = this;
				let offset$1 = ref.offset;
				let axis = this.getAxis();

				if (!isNumeric(offset$1)) {
					node = $(offset$1);
					offset$1 = node
						? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
						: 0;
				}

				let ref$1 = positionAt(
					element,
					target,
					axis === 'x' ? ((flipPosition(this.dir)) + " " + (this.align)) : ((this.align) + " " + (flipPosition(this.dir))),
					axis === 'x' ? ((this.dir) + " " + (this.align)) : ((this.align) + " " + (this.dir)),
					axis === 'x' ? ("" + (this.dir === 'left' ? -offset$1 : offset$1)) : (" " + (this.dir === 'top' ? -offset$1 : offset$1)),
					null,
					this.flip,
					boundary
				).target;
				let x = ref$1.x;
				let y = ref$1.y;

				this.dir = axis === 'x' ? x : y;
				this.align = axis === 'x' ? y : x;

				toggleClass(element, ((this.clsPos) + "-" + (this.dir) + "-" + (this.align)), this.offset === false);

			},

			getAxis() {
				return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
			}

		}

	};

	let Togglable = {

		props: {
			cls: Boolean,
			animation: 'list',
			duration: Number,
			origin: String,
			transition: String,
			queued: Boolean
		},

		data: {
			cls: false,
			animation: [false],
			duration: 200,
			origin: false,
			transition: 'linear',
			queued: false,

			initProps: {
				overflow: '',
				height: '',
				paddingTop: '',
				paddingBottom: '',
				marginTop: '',
				marginBottom: ''
			},

			hideProps: {
				overflow: 'hidden',
				height: 0,
				paddingTop: 0,
				paddingBottom: 0,
				marginTop: 0,
				marginBottom: 0
			}

		},

		computed: {

			hasAnimation(ref) {
				let animation = ref.animation;

				return !!animation[0];
			},

			hasTransition(ref) {
				let animation = ref.animation;

				return this.hasAnimation && animation[0] === true;
			}

		},

		methods: {

			toggleElement(targets, show, animate) {
				let this$1 = this;

				return new Promise(((resolve) => {

					targets = toNodes(targets);

					let all = function (targets) { return Promise.all(targets.map((el) => { return this$1._toggleElement(el, show, animate); })); };
					let toggled = targets.filter((el) => { return this$1.isToggled(el); });
					let untoggled = targets.filter((el) => { return !includes(toggled, el); });

					let p;

					if (!this$1.queued || !isUndefined(animate) || !isUndefined(show) || !this$1.hasAnimation || targets.length < 2) {

						p = all(untoggled.concat(toggled));

					} else {

						let body = document.body;
						let scroll = body.scrollTop;
						let el = toggled[0];
						let inProgress = Animation.inProgress(el) && hasClass(el, 'uk-animation-leave')
                                || Transition.inProgress(el) && el.style.height === '0px';

						p = all(toggled);

						if (!inProgress) {
							p = p.then(() => {
								let p = all(untoggled);
								body.scrollTop = scroll;
								return p;
							});
						}

					}

					p.then(resolve, noop);

				}));
			},

			toggleNow(targets, show) {
				let this$1 = this;

				return new Promise(((resolve) => { return Promise.all(toNodes(targets).map((el) => { return this$1._toggleElement(el, show, false); })).then(resolve, noop); }));
			},

			isToggled(el) {
				let nodes = toNodes(el || this.$el);
				return this.cls
					? hasClass(nodes, this.cls.split(' ')[0])
					: !hasAttr(nodes, 'hidden');
			},

			updateAria(el) {
				if (this.cls === false) {
					attr(el, 'aria-hidden', !this.isToggled(el));
				}
			},

			_toggleElement(el, show, animate) {
				let this$1 = this;


				show = isBoolean(show)
					? show
					: Animation.inProgress(el)
						? hasClass(el, 'uk-animation-leave')
						: Transition.inProgress(el)
							? el.style.height === '0px'
							: !this.isToggled(el);

				if (!trigger(el, ("before" + (show ? 'show' : 'hide')), [this])) {
					return Promise.reject();
				}

				let promise = (
					isFunction(animate)
						? animate
						: animate === false || !this.hasAnimation
							? this._toggle
							: this.hasTransition
								? toggleHeight(this)
								: toggleAnimation(this)
				)(el, show);

				trigger(el, show ? 'show' : 'hide', [this]);

				let final = function () {
					trigger(el, show ? 'shown' : 'hidden', [this$1]);
					this$1.$update(el);
				};

				return promise ? promise.then(final) : Promise.resolve(final());
			},

			_toggle(el, toggled) {

				if (!el) {
					return;
				}

				toggled = Boolean(toggled);

				let changed;
				if (this.cls) {
					changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
					changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
				} else {
					changed = toggled === hasAttr(el, 'hidden');
					changed && attr(el, 'hidden', !toggled ? '' : null);
				}

				$$('[autofocus]', el).some((el) => { return isVisible(el) ? el.focus() || true : el.blur(); });

				this.updateAria(el);
				changed && this.$update(el);
			}

		}

	};

	function toggleHeight(ref) {
		let isToggled = ref.isToggled;
		let duration = ref.duration;
		let initProps = ref.initProps;
		let hideProps = ref.hideProps;
		let transition = ref.transition;
		let _toggle = ref._toggle;

		return function (el, show) {

			let inProgress = Transition.inProgress(el);
			let inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
			let currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;

			Transition.cancel(el);

			if (!isToggled(el)) {
				_toggle(el, true);
			}

			height(el, '');

			// Update child components first
			fastdom.flush();

			let endHeight = height(el) + (inProgress ? 0 : inner);
			height(el, currentHeight);

			return (show
				? Transition.start(el, assign({}, initProps, {overflow: 'hidden', height: endHeight}), Math.round(duration * (1 - currentHeight / endHeight)), transition)
				: Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(() => { return _toggle(el, false); })
			).then(() => { return css(el, initProps); });

		};
	}

	function toggleAnimation(ref) {
		let animation = ref.animation;
		let duration = ref.duration;
		let origin = ref.origin;
		let _toggle = ref._toggle;

		return function (el, show) {

			Animation.cancel(el);

			if (show) {
				_toggle(el, true);
				return Animation.in(el, animation[0], duration, origin);
			}

			return Animation.out(el, animation[1] || animation[0], duration, origin).then(() => { return _toggle(el, false); });
		};
	}

	let active;

	let Drop = {

		mixins: [Position, Togglable],

		args: 'pos',

		props: {
			mode: 'list',
			toggle: Boolean,
			boundary: Boolean,
			boundaryAlign: Boolean,
			delayShow: Number,
			delayHide: Number,
			clsDrop: String
		},

		data: {
			mode: ['click', 'hover'],
			toggle: '- *',
			boundary: window,
			boundaryAlign: false,
			delayShow: 0,
			delayHide: 800,
			clsDrop: false,
			hoverIdle: 200,
			animation: ['uk-animation-fade'],
			cls: 'uk-open'
		},

		computed: {

			boundary(ref, $el) {
				let boundary = ref.boundary;

				return query(boundary, $el);
			},

			clsDrop(ref) {
				let clsDrop = ref.clsDrop;

				return clsDrop || ("uk-" + (this.$options.name));
			},

			clsPos() {
				return this.clsDrop;
			}

		},

		created() {
			this.tracker = new MouseTracker();
		},

		connected() {

			addClass(this.$el, this.clsDrop);

			let ref = this.$props;
			let toggle = ref.toggle;
			this.toggle = toggle && this.$create('toggle', query(toggle, this.$el), {
				target: this.$el,
				mode: this.mode
			});

			!this.toggle && trigger(this.$el, 'updatearia');

		},

		events: [


			{

				name: 'click',

				delegate() {
					return ("." + (this.clsDrop) + "-close");
				},

				handler(e) {
					e.preventDefault();
					this.hide(false);
				}

			},

			{

				name: 'click',

				delegate() {
					return 'a[href^="#"]';
				},

				handler(e) {

					if (e.defaultPrevented) {
						return;
					}

					let id = e.target.hash;

					if (!id) {
						e.preventDefault();
					}

					if (!id || !within(id, this.$el)) {
						this.hide(false);
					}
				}

			},

			{

				name: 'beforescroll',

				handler() {
					this.hide(false);
				}

			},

			{

				name: 'toggle',

				self: true,

				handler(e, toggle) {

					e.preventDefault();

					if (this.isToggled()) {
						this.hide(false);
					} else {
						this.show(toggle, false);
					}
				}

			},

			{

				name: pointerEnter,

				filter() {
					return includes(this.mode, 'hover');
				},

				handler(e) {

					if (isTouch(e)) {
						return;
					}

					if (active
                        && active !== this
                        && active.toggle
                        && includes(active.toggle.mode, 'hover')
                        && !within(e.target, active.toggle.$el)
                        && !pointInRect({x: e.pageX, y: e.pageY}, offset(active.$el))
					) {
						active.hide(false);
					}

					e.preventDefault();
					this.show(this.toggle);
				}

			},

			{

				name: 'toggleshow',

				handler(e, toggle) {

					if (toggle && !includes(toggle.target, this.$el)) {
						return;
					}

					e.preventDefault();
					this.show(toggle || this.toggle);
				}

			},

			{

				name: ("togglehide " + pointerLeave),

				handler(e, toggle) {

					if (isTouch(e) || toggle && !includes(toggle.target, this.$el)) {
						return;
					}

					e.preventDefault();

					if (this.toggle && includes(this.toggle.mode, 'hover')) {
						this.hide();
					}
				}

			},

			{

				name: 'beforeshow',

				self: true,

				handler() {
					this.clearTimers();
					Animation.cancel(this.$el);
					this.position();
				}

			},

			{

				name: 'show',

				self: true,

				handler() {
					this.tracker.init();
					trigger(this.$el, 'updatearia');
					registerEvent();
				}

			},

			{

				name: 'beforehide',

				self: true,

				handler() {
					this.clearTimers();
				}

			},

			{

				name: 'hide',

				handler(ref) {
					let target = ref.target;


					if (this.$el !== target) {
						active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
						return;
					}

					active = this.isActive() ? null : active;
					trigger(this.$el, 'updatearia');
					this.tracker.cancel();
				}

			},

			{

				name: 'updatearia',

				self: true,

				handler(e, toggle) {

					e.preventDefault();

					this.updateAria(this.$el);

					if (toggle || this.toggle) {
						attr((toggle || this.toggle).$el, 'aria-expanded', this.isToggled() ? 'true' : 'false');
						toggleClass(this.toggle.$el, this.cls, this.isToggled());
					}
				}
			}

		],

		update: {

			write() {

				if (this.isToggled() && !Animation.inProgress(this.$el)) {
					this.position();
				}

			},

			events: ['resize']

		},

		methods: {

			show(toggle, delay) {
				let this$1 = this;
				if ( delay === void 0 ) delay = true;


				let show = function () { return !this$1.isToggled() && this$1.toggleElement(this$1.$el, true); };
				let tryShow = function () {

					this$1.toggle = toggle || this$1.toggle;

					this$1.clearTimers();

					if (this$1.isActive()) {
						return;
					} else if (delay && active && active !== this$1 && active.isDelaying) {
						this$1.showTimer = setTimeout(this$1.show, 10);
						return;
					} else if (this$1.isParentOf(active)) {

						if (active.hideTimer) {
							active.hide(false);
						} else {
							return;
						}

					} else if (active && this$1.isChildOf(active)) {

						active.clearTimers();

					} else if (active && !this$1.isChildOf(active) && !this$1.isParentOf(active)) {

						let prev;
						while (active && active !== prev && !this$1.isChildOf(active)) {
							prev = active;
							active.hide(false);
						}

					}

					if (delay && this$1.delayShow) {
						this$1.showTimer = setTimeout(show, this$1.delayShow);
					} else {
						show();
					}

					active = this$1;
				};

				if (toggle && this.toggle && toggle.$el !== this.toggle.$el) {

					once(this.$el, 'hide', tryShow);
					this.hide(false);

				} else {
					tryShow();
				}
			},

			hide(delay) {
				let this$1 = this;
				if ( delay === void 0 ) delay = true;


				let hide = function () { return this$1.toggleNow(this$1.$el, false); };

				this.clearTimers();

				this.isDelaying = this.tracker.movesTo(this.$el);

				if (delay && this.isDelaying) {
					this.hideTimer = setTimeout(this.hide, this.hoverIdle);
				} else if (delay && this.delayHide) {
					this.hideTimer = setTimeout(hide, this.delayHide);
				} else {
					hide();
				}
			},

			clearTimers() {
				clearTimeout(this.showTimer);
				clearTimeout(this.hideTimer);
				this.showTimer = null;
				this.hideTimer = null;
				this.isDelaying = false;
			},

			isActive() {
				return active === this;
			},

			isChildOf(drop) {
				return drop && drop !== this && within(this.$el, drop.$el);
			},

			isParentOf(drop) {
				return drop && drop !== this && within(drop.$el, this.$el);
			},

			position() {

				removeClasses(this.$el, ((this.clsDrop) + "-(stack|boundary)"));
				css(this.$el, {top: '', left: '', display: 'block'});
				toggleClass(this.$el, ((this.clsDrop) + "-boundary"), this.boundaryAlign);

				let boundary = offset(this.boundary);
				let alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);

				if (this.align === 'justify') {
					let prop = this.getAxis() === 'y' ? 'width' : 'height';
					css(this.$el, prop, alignTo[prop]);
				} else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
					addClass(this.$el, ((this.clsDrop) + "-stack"));
				}

				this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);

				css(this.$el, 'display', '');

			}

		}

	};

	let registered;

	function registerEvent() {

		if (registered) {
			return;
		}

		registered = true;
		on(document, pointerUp, (ref) => {
			let target = ref.target;
			let defaultPrevented = ref.defaultPrevented;

			let prev;

			if (defaultPrevented) {
				return;
			}

			while (active && active !== prev && !within(target, active.$el) && !(active.toggle && within(target, active.toggle.$el))) {
				prev = active;
				active.hide(false);
			}
		});
	}

	let Dropdown = {

		extends: Drop

	};

	let Class = {

		connected() {
			!hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
		}

	};

	let FormCustom = {

		mixins: [Class],

		args: 'target',

		props: {
			target: Boolean
		},

		data: {
			target: false
		},

		computed: {

			input(_, $el) {
				return $(selInput, $el);
			},

			state() {
				return this.input.nextElementSibling;
			},

			target(ref, $el) {
				let target = ref.target;

				return target && (target === true
                    && this.input.parentNode === $el
                    && this.input.nextElementSibling
                    || query(target, $el));
			}

		},

		update() {

			let ref = this;
			let target = ref.target;
			let input = ref.input;

			if (!target) {
				return;
			}

			let option;
			let prop = isInput(target) ? 'value' : 'textContent';
			let prev = target[prop];
			let value = input.files && input.files[0]
				? input.files[0].name
				: matches(input, 'select') && (option = $$('option', input).filter((el) => { return el.selected; })[0])
					? option.textContent
					: input.value;

			if (prev !== value) {
				target[prop] = value;
			}

		},

		events: {

			change() {
				this.$emit();
			}

		}

	};

	// Deprecated
	let Gif = {

		update: {

			read(data) {

				let inview = isInView(this.$el);

				if (!inview || data.isInView === inview) {
					return false;
				}

				data.isInView = inview;
			},

			write() {
				this.$el.src = this.$el.src;
			},

			events: ['scroll', 'resize']
		}

	};

	let Margin = {

		props: {
			margin: String,
			firstColumn: Boolean
		},

		data: {
			margin: 'uk-margin-small-top',
			firstColumn: 'uk-first-column'
		},

		update: {

			read(data) {

				let items = this.$el.children;
				let rows = [[]];

				if (!items.length || !isVisible(this.$el)) {
					return data.rows = rows;
				}

				data.rows = getRows(items);
				data.stacks = !data.rows.some((row) => { return row.length > 1; });

			},

			write(ref) {
				let this$1 = this;
				let rows = ref.rows;


				rows.forEach((row, i) => { return row.forEach((el, j) => {
					toggleClass(el, this$1.margin, i !== 0);
					toggleClass(el, this$1.firstColumn, j === 0);
				}); }
				);

			},

			events: ['resize']

		}

	};

	function getRows(items) {
		let rows = [[]];

		for (let i = 0; i < items.length; i++) {

			let el = items[i];
			let dim = getOffset(el);

			if (!dim.height) {
				continue;
			}

			for (let j = rows.length - 1; j >= 0; j--) {

				let row = rows[j];

				if (!row[0]) {
					row.push(el);
					break;
				}

				let leftDim = (void 0);
				if (row[0].offsetParent === el.offsetParent) {
					leftDim = getOffset(row[0]);
				} else {
					dim = getOffset(el, true);
					leftDim = getOffset(row[0], true);
				}

				if (dim.top >= leftDim.bottom - 1) {
					rows.push([el]);
					break;
				}

				if (dim.bottom > leftDim.top) {

					if (dim.left < leftDim.left && !isRtl) {
						row.unshift(el);
						break;
					}

					row.push(el);
					break;
				}

				if (j === 0) {
					rows.unshift([el]);
					break;
				}

			}

		}

		return rows;

	}

	function getOffset(element, offset) {
		let assign;

		if ( offset === void 0 ) offset = false;

		let offsetTop = element.offsetTop;
		let offsetLeft = element.offsetLeft;
		let offsetHeight = element.offsetHeight;

		if (offset) {
			(assign = offsetPosition(element), offsetTop = assign[0], offsetLeft = assign[1]);
		}

		return {
			top: offsetTop,
			left: offsetLeft,
			height: offsetHeight,
			bottom: offsetTop + offsetHeight
		};
	}

	let Grid = {

		extends: Margin,

		mixins: [Class],

		name: 'grid',

		props: {
			masonry: Boolean,
			parallax: Number
		},

		data: {
			margin: 'uk-grid-margin',
			clsStack: 'uk-grid-stack',
			masonry: false,
			parallax: 0
		},

		computed: {

			length(_, $el) {
				return $el.children.length;
			},

			parallax(ref) {
				let parallax = ref.parallax;

				return parallax && this.length ? Math.abs(parallax) : '';
			}

		},

		connected() {
			this.masonry && addClass(this.$el, 'uk-flex-top uk-flex-wrap-top');
		},

		update: [

			{

				read(ref) {
					let rows = ref.rows;


					if (this.masonry || this.parallax) {
						rows = rows.map((elements) => { return sortBy(elements, 'offsetLeft'); });

						if (isRtl) {
							rows.map((row) => { return row.reverse(); });
						}

					}

					let transitionInProgress = rows.some((elements) => { return elements.some(Transition.inProgress); });
					let translates = false;
					let elHeight = '';

					if (this.masonry && this.length) {

						let height = 0;

						translates = rows.reduce((translates, row, i) => {

							translates[i] = row.map((_, j) => { return i === 0 ? 0 : toFloat(translates[i - 1][j]) + (height - toFloat(rows[i - 1][j] && rows[i - 1][j].offsetHeight)); });
							height = row.reduce((height, el) => { return Math.max(height, el.offsetHeight); }, 0);

							return translates;

						}, []);

						elHeight = maxColumnHeight(rows) + getMarginTop(this.$el, this.margin) * (rows.length - 1);

					}

					return {rows, translates, height: !transitionInProgress ? elHeight : false};

				},

				write(ref) {
					let stacks = ref.stacks;
					let height = ref.height;


					toggleClass(this.$el, this.clsStack, stacks);

					css(this.$el, 'paddingBottom', this.parallax);
					height !== false && css(this.$el, 'height', height);

				},

				events: ['resize']

			},

			{

				read(ref) {
					let height$1 = ref.height;

					return {
						scrolled: this.parallax
							? scrolledOver(this.$el, height$1 ? height$1 - height(this.$el) : 0) * this.parallax
							: false
					};
				},

				write(ref) {
					let rows = ref.rows;
					let scrolled = ref.scrolled;
					let translates = ref.translates;


					if (scrolled === false && !translates) {
						return;
					}

					rows.forEach((row, i) => { return row.forEach((el, j) => { return css(el, 'transform', !scrolled && !translates ? '' : ("translateY(" + ((translates && -translates[i][j]) + (scrolled ? j % 2 ? scrolled : scrolled / 8 : 0)) + "px)")); }
					); }
					);

				},

				events: ['scroll', 'resize']

			}

		]

	};

	function getMarginTop(root, cls) {

		let nodes = toNodes(root.children);
		let ref = nodes.filter((el) => { return hasClass(el, cls); });
		let node = ref[0];

		return toFloat(node
			? css(node, 'marginTop')
			: css(nodes[0], 'paddingLeft'));
	}

	function maxColumnHeight(rows) {
		return Math.max(...rows.reduce((sum, row) => {
			row.forEach((el, i) => { return sum[i] = (sum[i] || 0) + el.offsetHeight; });
			return sum;
		}, []));
	}

	// IE 11 fix (min-height on a flex container won't apply to its flex items)
	let FlexBug = isIE ? {

		data: {
			selMinHeight: false,
			forceHeight: false
		},

		computed: {

			elements(ref, $el) {
				let selMinHeight = ref.selMinHeight;

				return selMinHeight ? $$(selMinHeight, $el) : [$el];
			}

		},

		update: [

			{

				read() {
					css(this.elements, 'height', '');
				},

				order: -5,

				events: ['resize']

			},

			{

				write() {
					let this$1 = this;

					this.elements.forEach((el) => {
						let height = toFloat(css(el, 'minHeight'));
						if (height && (this$1.forceHeight || Math.round(height + boxModelAdjust('height', el, 'content-box')) >= el.offsetHeight)) {
							css(el, 'height', height);
						}
					});
				},

				order: 5,

				events: ['resize']

			}

		]

	} : {};

	let HeightMatch = {

		mixins: [FlexBug],

		args: 'target',

		props: {
			target: String,
			row: Boolean
		},

		data: {
			target: '> *',
			row: true,
			forceHeight: true
		},

		computed: {

			elements(ref, $el) {
				let target = ref.target;

				return $$(target, $el);
			}

		},

		update: {

			read() {
				return {
					rows: (this.row ? getRows(this.elements) : [this.elements]).map(match)
				};
			},

			write(ref) {
				let rows = ref.rows;

				rows.forEach((ref) => {
					let heights = ref.heights;
					let elements = ref.elements;

					return elements.forEach((el, i) => { return css(el, 'minHeight', heights[i]); }
					);
				}
				);
			},

			events: ['resize']

		}

	};

	function match(elements) {
		let assign;


		if (elements.length < 2) {
			return {heights: [''], elements};
		}

		let ref = getHeights(elements);
		let heights = ref.heights;
		let max = ref.max;
		let hasMinHeight = elements.some((el) => { return el.style.minHeight; });
		let hasShrunk = elements.some((el, i) => { return !el.style.minHeight && heights[i] < max; });

		if (hasMinHeight && hasShrunk) {
			css(elements, 'minHeight', '');
			((assign = getHeights(elements), heights = assign.heights, max = assign.max));
		}

		heights = elements.map((el, i) => { return heights[i] === max && toFloat(el.style.minHeight).toFixed(2) !== max.toFixed(2) ? '' : max; }
		);

		return {heights, elements};
	}

	function getHeights(elements) {
		let heights = elements.map((el) => { return offset(el).height - boxModelAdjust('height', el, 'content-box'); });
		let max = Math.max.apply(null, heights);

		return {heights, max};
	}

	let HeightViewport = {

		mixins: [FlexBug],

		props: {
			expand: Boolean,
			offsetTop: Boolean,
			offsetBottom: Boolean,
			minHeight: Number
		},

		data: {
			expand: false,
			offsetTop: false,
			offsetBottom: false,
			minHeight: 0
		},

		update: {

			read() {

				let minHeight = '';
				let box = boxModelAdjust('height', this.$el, 'content-box');

				if (this.expand) {

					minHeight = height(window) - (offsetHeight(document.documentElement) - offsetHeight(this.$el)) - box || '';

				} else {

					// on mobile devices (iOS and Android) window.innerHeight !== 100vh
					minHeight = 'calc(100vh';

					if (this.offsetTop) {

						let ref = offset(this.$el);
						let top = ref.top;
						minHeight += top < height(window) / 2 ? (" - " + top + "px") : '';

					}

					if (this.offsetBottom === true) {

						minHeight += " - " + (offsetHeight(this.$el.nextElementSibling)) + "px";

					} else if (isNumeric(this.offsetBottom)) {

						minHeight += " - " + (this.offsetBottom) + "vh";

					} else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {

						minHeight += " - " + (toFloat(this.offsetBottom)) + "px";

					} else if (isString(this.offsetBottom)) {

						minHeight += " - " + (offsetHeight(query(this.offsetBottom, this.$el))) + "px";

					}

					minHeight += (box ? (" - " + box + "px") : '') + ")";

				}

				return {minHeight};
			},

			write(ref) {
				let minHeight = ref.minHeight;


				css(this.$el, {minHeight});

				if (this.minHeight && toFloat(css(this.$el, 'minHeight')) < this.minHeight) {
					css(this.$el, 'minHeight', this.minHeight);
				}

			},

			events: ['resize']

		}

	};

	function offsetHeight(el) {
		return el && el.offsetHeight || 0;
	}

	let SVG = {

		args: 'src',

		props: {
			id: Boolean,
			icon: String,
			src: String,
			style: String,
			width: Number,
			height: Number,
			ratio: Number,
			'class': String,
			strokeAnimation: Boolean,
			attributes: 'list'
		},

		data: {
			ratio: 1,
			include: ['style', 'class'],
			'class': '',
			strokeAnimation: false
		},

		connected() {
			let this$1 = this;
			let assign;


			this.class += ' uk-svg';

			if (!this.icon && includes(this.src, '#')) {

				let parts = this.src.split('#');

				if (parts.length > 1) {
					(assign = parts, this.src = assign[0], this.icon = assign[1]);
				}
			}

			this.svg = this.getSvg().then((el) => {
				this$1.applyAttributes(el);
				return this$1.svgEl = insertSVG(el, this$1.$el);
			}, noop);

		},

		disconnected() {
			let this$1 = this;


			if (isVoidElement(this.$el)) {
				attr(this.$el, 'hidden', null);
			}

			if (this.svg) {
				this.svg.then((svg) => { return (!this$1._connected || svg !== this$1.svgEl) && remove(svg); }, noop);
			}

			this.svg = this.svgEl = null;

		},

		update: {

			read() {
				return !!(this.strokeAnimation && this.svgEl && isVisible(this.svgEl));
			},

			write() {
				applyAnimation(this.svgEl);
			},

			type: ['resize']

		},

		methods: {

			getSvg() {
				let this$1 = this;

				return loadSVG(this.src).then((svg) => { return parseSVG(svg, this$1.icon) || Promise.reject('SVG not found.'); }
				);
			},

			applyAttributes(el) {
				let this$1 = this;


				for (let prop in this.$options.props) {
					if (this[prop] && includes(this.include, prop)) {
						attr(el, prop, this[prop]);
					}
				}

				for (let attribute in this.attributes) {
					let ref = this.attributes[attribute].split(':', 2);
					let prop$1 = ref[0];
					let value = ref[1];
					attr(el, prop$1, value);
				}

				if (!this.id) {
					removeAttr(el, 'id');
				}

				let props = ['width', 'height'];
				let dimensions = [this.width, this.height];

				if (!dimensions.some((val) => { return val; })) {
					dimensions = props.map((prop) => { return attr(el, prop); });
				}

				let viewBox = attr(el, 'viewBox');
				if (viewBox && !dimensions.some((val) => { return val; })) {
					dimensions = viewBox.split(' ').slice(2);
				}

				dimensions.forEach((val, i) => {
					val = (val | 0) * this$1.ratio;
					val && attr(el, props[i], val);

					if (val && !dimensions[i ^ 1]) {
						removeAttr(el, props[i ^ 1]);
					}
				});

				attr(el, 'data-svg', this.icon || this.src);

			}

		}

	};

	let svgs = {};

	function loadSVG(src) {

		if (svgs[src]) {
			return svgs[src];
		}

		return svgs[src] = new Promise(((resolve, reject) => {

			if (!src) {
				reject();
				return;
			}

			if (startsWith(src, 'data:')) {
				resolve(decodeURIComponent(src.split(',')[1]));
			} else {

				ajax(src).then(
					(xhr) => { return resolve(xhr.response); },
					() => { return reject('SVG not found.'); }
				);

			}

		}));
	}

	function parseSVG(svg, icon) {

		if (icon && includes(svg, '<symbol')) {
			svg = parseSymbols(svg, icon) || svg;
		}

		svg = $(svg.substr(svg.indexOf('<svg')));
		return svg && svg.hasChildNodes() && svg;
	}

	let symbolRe = /<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g;
	let symbols = {};

	function parseSymbols(svg, icon) {

		if (!symbols[svg]) {

			symbols[svg] = {};

			let match;
			while ((match = symbolRe.exec(svg))) {
				symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + (match[1]) + "svg>";
			}

			symbolRe.lastIndex = 0;

		}

		return symbols[svg][icon];
	}

	function applyAnimation(el) {

		let length = getMaxPathLength(el);

		if (length) {
			el.style.setProperty('--uk-animation-stroke', length);
		}

	}

	function getMaxPathLength(el) {
		return Math.ceil(Math.max(...$$('[stroke]', el).map((stroke) => { return stroke.getTotalLength && stroke.getTotalLength() || 0; }
		).concat([0])));
	}

	function insertSVG(el, root) {
		if (isVoidElement(root) || root.tagName === 'CANVAS') {

			attr(root, 'hidden', true);

			let next = root.nextElementSibling;
			return equals(el, next)
				? next
				: after(root, el);

		}

		let last = root.lastElementChild;
		return equals(el, last)
			? last
			: append(root, el);

		
	}

	function equals(el, other) {
		return attr(el, 'data-svg') === attr(other, 'data-svg');
	}

	let closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

	let closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

	let marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

	let navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"/><rect y=\"3\" width=\"20\" height=\"2\"/><rect y=\"15\" width=\"20\" height=\"2\"/></svg>";

	let overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

	let paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

	let paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

	let searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

	let searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

	let searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

	let slidenavNext = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

	let slidenavNextLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

	let slidenavPrevious = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

	let slidenavPreviousLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

	let spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

	let totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

	let parsed = {};
	let icons = {
		spinner,
		totop,
		marker,
		'close-icon': closeIcon,
		'close-large': closeLarge,
		'navbar-toggle-icon': navbarToggleIcon,
		'overlay-icon': overlayIcon,
		'pagination-next': paginationNext,
		'pagination-previous': paginationPrevious,
		'search-icon': searchIcon,
		'search-large': searchLarge,
		'search-navbar': searchNavbar,
		'slidenav-next': slidenavNext,
		'slidenav-next-large': slidenavNextLarge,
		'slidenav-previous': slidenavPrevious,
		'slidenav-previous-large': slidenavPreviousLarge
	};

	let Icon = {

		install,

		mixins: [Class, SVG],

		args: 'icon',

		props: ['icon'],

		data: {include: []},

		isIcon: true,

		connected() {
			addClass(this.$el, 'uk-icon');
		},

		methods: {

			getSvg() {

				let icon = getIcon(applyRtl(this.icon));

				if (!icon) {
					return Promise.reject('Icon not found.');
				}

				return Promise.resolve(icon);
			}

		}

	};

	let IconComponent = {

		extends: Icon,

		data (vm) { return ({
			icon: hyphenate(vm.constructor.options.name)
		}); }

	};

	let Slidenav = {

		extends: IconComponent,

		connected() {
			addClass(this.$el, 'uk-slidenav');
		},

		computed: {

			icon(ref, $el) {
				let icon = ref.icon;

				return hasClass($el, 'uk-slidenav-large')
					? (icon + "-large")
					: icon;
			}

		}

	};

	let Search = {

		extends: IconComponent,

		computed: {

			icon(ref, $el) {
				let icon = ref.icon;

				return hasClass($el, 'uk-search-icon') && parents($el, '.uk-search-large').length
					? 'search-large'
					: parents($el, '.uk-search-navbar').length
						? 'search-navbar'
						: icon;
			}

		}

	};

	let Close = {

		extends: IconComponent,

		computed: {

			icon() {
				return ("close-" + (hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon'));
			}

		}

	};

	let Spinner = {

		extends: IconComponent,

		connected() {
			let this$1 = this;

			this.svg.then((svg) => { return this$1.ratio !== 1 && css($('circle', svg), 'strokeWidth', 1 / this$1.ratio); }, noop);
		}

	};

	function install(UIkit) {
		UIkit.icon.add = function (name, svg) {
			let obj;


			let added = isString(name) ? (( obj = {}, obj[name] = svg, obj )) : name;
			each(added, (svg, name) => {
				icons[name] = svg;
				delete parsed[name];
			});

			if (UIkit._initialized) {
				apply(document.body, (el) => { return each(UIkit.getComponents(el), (cmp) => {
					cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
				}); }
				);
			}
		};
	}

	function getIcon(icon) {

		if (!icons[icon]) {
			return null;
		}

		if (!parsed[icon]) {
			parsed[icon] = $(icons[icon].trim());
		}

		return parsed[icon].cloneNode(true);
	}

	function applyRtl(icon) {
		return isRtl ? swap(swap(icon, 'left', 'right'), 'previous', 'next') : icon;
	}

	let Img = {

		args: 'dataSrc',

		props: {
			dataSrc: String,
			dataSrcset: Boolean,
			sizes: String,
			width: Number,
			height: Number,
			offsetTop: String,
			offsetLeft: String,
			target: String
		},

		data: {
			dataSrc: '',
			dataSrcset: false,
			sizes: false,
			width: false,
			height: false,
			offsetTop: '50vh',
			offsetLeft: 0,
			target: false
		},

		computed: {

			cacheKey(ref) {
				let dataSrc = ref.dataSrc;

				return ((this.$name) + "." + dataSrc);
			},

			width(ref) {
				let width = ref.width;
				let dataWidth = ref.dataWidth;

				return width || dataWidth;
			},

			height(ref) {
				let height = ref.height;
				let dataHeight = ref.dataHeight;

				return height || dataHeight;
			},

			sizes(ref) {
				let sizes = ref.sizes;
				let dataSizes = ref.dataSizes;

				return sizes || dataSizes;
			},

			isImg(_, $el) {
				return isImg($el);
			},

			target: {

				get(ref) {
					let target = ref.target;

					return [this.$el].concat(queryAll(target, this.$el));
				},

				watch() {
					this.observe();
				}

			},

			offsetTop(ref) {
				let offsetTop = ref.offsetTop;

				return toPx(offsetTop, 'height');
			},

			offsetLeft(ref) {
				let offsetLeft = ref.offsetLeft;

				return toPx(offsetLeft, 'width');
			}

		},

		connected() {

			if (storage[this.cacheKey]) {
				setSrcAttrs(this.$el, storage[this.cacheKey] || this.dataSrc, this.dataSrcset, this.sizes);
			} else if (this.isImg && this.width && this.height) {
				setSrcAttrs(this.$el, getPlaceholderImage(this.width, this.height, this.sizes));
			}

			this.observer = new IntersectionObserver(this.load, {
				rootMargin: ((this.offsetTop) + "px " + (this.offsetLeft) + "px")
			});

			requestAnimationFrame(this.observe);

		},

		disconnected() {
			this.observer.disconnect();
		},

		update: {

			read(ref) {
				let this$1 = this;
				let image = ref.image;


				if (!image && document.readyState === 'complete') {
					this.load(this.observer.takeRecords());
				}

				if (this.isImg) {
					return false;
				}

				image && image.then((img) => { return img && img.currentSrc !== '' && setSrcAttrs(this$1.$el, currentSrc(img)); });

			},

			write(data) {

				if (this.dataSrcset && window.devicePixelRatio !== 1) {

					let bgSize = css(this.$el, 'backgroundSize');
					if (bgSize.match(/^(auto\s?)+$/) || toFloat(bgSize) === data.bgSize) {
						data.bgSize = getSourceSize(this.dataSrcset, this.sizes);
						css(this.$el, 'backgroundSize', ((data.bgSize) + "px"));
					}

				}

			},

			events: ['resize']

		},

		methods: {

			load(entries) {
				let this$1 = this;


				if (!entries.some((entry) => { return entry.isIntersecting; })) {
					return;
				}

				this._data.image = getImage(this.dataSrc, this.dataSrcset, this.sizes).then((img) => {

					setSrcAttrs(this$1.$el, currentSrc(img), img.srcset, img.sizes);
					storage[this$1.cacheKey] = currentSrc(img);
					return img;

				}, noop);

				this.observer.disconnect();
			},

			observe() {
				let this$1 = this;

				if (!this._data.image && this._connected) {
					this.target.forEach((el) => { return this$1.observer.observe(el); });
				}
			}

		}

	};

	function setSrcAttrs(el, src, srcset, sizes) {

		if (isImg(el)) {
			sizes && (el.sizes = sizes);
			srcset && (el.srcset = srcset);
			src && (el.src = src);
		} else if (src) {

			let change = !includes(el.style.backgroundImage, src);
			if (change) {
				css(el, 'backgroundImage', ("url(" + (escape(src)) + ")"));
				trigger(el, createEvent('load', false));
			}

		}

	}

	function getPlaceholderImage(width, height, sizes) {
		let assign;


		if (sizes) {
			((assign = Dimensions.ratio({width, height}, 'width', toPx(sizesToPixel(sizes))), width = assign.width, height = assign.height));
		}

		return ("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + width + "\" height=\"" + height + "\"></svg>");
	}

	let sizesRe = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
	function sizesToPixel(sizes) {
		let matches;

		sizesRe.lastIndex = 0;

		while ((matches = sizesRe.exec(sizes))) {
			if (!matches[1] || window.matchMedia(matches[1]).matches) {
				matches = evaluateSize(matches[2]);
				break;
			}
		}

		return matches || '100vw';
	}

	let sizeRe = /\d+(?:\w+|%)/g;
	let additionRe = /[+-]?(\d+)/g;
	function evaluateSize(size) {
		return startsWith(size, 'calc')
			? size
				.substring(5, size.length - 1)
				.replace(sizeRe, (size) => { return toPx(size); })
				.replace(/ /g, '')
				.match(additionRe)
				.reduce((a, b) => { return a + +b; }, 0)
			: size;
	}

	let srcSetRe = /\s+\d+w\s*(?:,|$)/g;
	function getSourceSize(srcset, sizes) {
		let srcSize = toPx(sizesToPixel(sizes));
		let descriptors = (srcset.match(srcSetRe) || []).map(toFloat).sort((a, b) => { return a - b; });

		return descriptors.filter((size) => { return size >= srcSize; })[0] || descriptors.pop() || '';
	}

	function isImg(el) {
		return el.tagName === 'IMG';
	}

	function currentSrc(el) {
		return el.currentSrc || el.src;
	}

	let key = '__test__';
	let storage;

	// workaround for Safari's private browsing mode and accessing sessionStorage in Blink
	try {
		storage = window.sessionStorage || {};
		storage[key] = 1;
		delete storage[key];
	} catch (e) {
		storage = {};
	}

	let OverflowAuto = {

		mixins: [Class],

		props: {
			selContainer: String,
			selContent: String
		},

		data: {
			selContainer: '.uk-modal',
			selContent: '.uk-modal-dialog'
		},

		computed: {

			container(ref, $el) {
				let selContainer = ref.selContainer;

				return closest($el, selContainer);
			},

			content(ref, $el) {
				let selContent = ref.selContent;

				return closest($el, selContent);
			}

		},

		connected() {
			css(this.$el, 'minHeight', 150);
		},

		update: {

			read() {

				if (!this.content || !this.container) {
					return false;
				}

				return {
					current: toFloat(css(this.$el, 'maxHeight')),
					max: Math.max(150, height(this.container) - (offset(this.content).height - height(this.$el)))
				};
			},

			write(ref) {
				let current = ref.current;
				let max = ref.max;

				css(this.$el, 'maxHeight', max);
				if (Math.round(current) !== Math.round(max)) {
					trigger(this.$el, 'resize');
				}
			},

			events: ['resize']

		}

	};

	let Responsive = {

		props: ['width', 'height'],

		connected() {
			addClass(this.$el, 'uk-responsive-width');
		},

		update: {

			read() {
				return isVisible(this.$el) && this.width && this.height
					? {width: width(this.$el.parentNode), height: this.height}
					: false;
			},

			write(dim) {
				height(this.$el, Dimensions.contain({
					height: this.height,
					width: this.width
				}, dim).height);
			},

			events: ['resize']

		}

	};

	let Switcher = {

		mixins: [Togglable],

		args: 'connect',

		props: {
			connect: String,
			toggle: String,
			active: Number,
			swiping: Boolean
		},

		data: {
			connect: '~.uk-switcher',
			toggle: '> * > :first-child',
			active: 0,
			swiping: true,
			cls: 'uk-active',
			clsContainer: 'uk-switcher',
			attrItem: 'uk-switcher-item',
			queued: true
		},

		computed: {

			connects(ref, $el) {
				let connect = ref.connect;

				return queryAll(connect, $el);
			},

			toggles(ref, $el) {
				let toggle = ref.toggle;

				return $$(toggle, $el);
			}

		},

		events: [

			{

				name: 'click',

				delegate() {
					return ((this.toggle) + ":not(.uk-disabled)");
				},

				handler(e) {
					e.preventDefault();
					this.show(toNodes(this.$el.children).filter((el) => { return within(e.current, el); })[0]);
				}

			},

			{
				name: 'click',

				el() {
					return this.connects;
				},

				delegate() {
					return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
				},

				handler(e) {
					e.preventDefault();
					this.show(data(e.current, this.attrItem));
				}
			},

			{
				name: 'swipeRight swipeLeft',

				filter() {
					return this.swiping;
				},

				el() {
					return this.connects;
				},

				handler(ref) {
					let type = ref.type;

					this.show(endsWith(type, 'Left') ? 'next' : 'previous');
				}
			}

		],

		update() {
			let this$1 = this;


			this.connects.forEach((list) => { return this$1.updateAria(list.children); });
			let ref = this.$el;
			let children = ref.children;
			this.show(filter(children, ("." + (this.cls)))[0] || children[this.active] || children[0]);

		},

		methods: {

			index() {
				return !!this.connects.length && index(filter(this.connects[0].children, ("." + (this.cls)))[0]);
			},

			show(item) {
				let this$1 = this;


				let ref = this.$el;
				let children = ref.children;
				let length = children.length;
				let prev = this.index();
				let hasPrev = prev >= 0;
				let dir = item === 'previous' ? -1 : 1;

				let toggle, active, next = getIndex(item, children, prev);

				for (let i = 0; i < length; i++, next = (next + dir + length) % length) {
					if (!matches(this.toggles[next], '.uk-disabled *, .uk-disabled, [disabled]')) {
						toggle = this.toggles[next];
						active = children[next];
						break;
					}
				}

				if (!active || prev >= 0 && hasClass(active, this.cls) || prev === next) {
					return;
				}

				removeClass(children, this.cls);
				addClass(active, this.cls);
				attr(this.toggles, 'aria-expanded', false);
				attr(toggle, 'aria-expanded', true);

				this.connects.forEach((list) => {
					if (!hasPrev) {
						this$1.toggleNow(list.children[next]);
					} else {
						this$1.toggleElement([list.children[prev], list.children[next]]);
					}
				});

			}

		}

	};

	// import Accordion from './accordion';
	// import Tab from './tab';
	// import Toggle from './toggle';
	// import Video from './video';

	function core (UIkit) {

		// core components
		// UIkit.component('accordion', Accordion);
		// UIkit.component('alert', Alert);
		// UIkit.component('cover', Cover);
		// UIkit.component('drop', Drop);
		UIkit.component('dropdown', Dropdown);
		UIkit.component('formCustom', FormCustom);
		UIkit.component('gif', Gif);
		UIkit.component('grid', Grid);
		UIkit.component('heightMatch', HeightMatch);
		UIkit.component('heightViewport', HeightViewport);
		UIkit.component('icon', Icon);
		UIkit.component('img', Img);
		// UIkit.component('leader', Leader);
		UIkit.component('margin', Margin);
		// UIkit.component('modal', Modal);
		// UIkit.component('nav', Nav);
		// UIkit.component('navbar', Navbar);
		// UIkit.component('offcanvas', Offcanvas);
		UIkit.component('overflowAuto', OverflowAuto);
		UIkit.component('responsive', Responsive);
		// UIkit.component('scroll', Scroll);
		// UIkit.component('scrollspy', Scrollspy);
		// UIkit.component('scrollspyNav', ScrollspyNav);
		// UIkit.component('sticky', Sticky);
		UIkit.component('svg', SVG);
		UIkit.component('switcher', Switcher);
		// UIkit.component('tab', Tab);
		// UIkit.component('toggle', Toggle);
		// UIkit.component('video', Video);

		// Icon components
		UIkit.component('close', Close);
		UIkit.component('marker', IconComponent);
		UIkit.component('navbarToggleIcon', IconComponent);
		UIkit.component('overlayIcon', IconComponent);
		UIkit.component('paginationNext', IconComponent);
		UIkit.component('paginationPrevious', IconComponent);
		UIkit.component('searchIcon', Search);
		UIkit.component('slidenavNext', Slidenav);
		UIkit.component('slidenavPrevious', Slidenav);
		UIkit.component('spinner', Spinner);
		UIkit.component('totop', IconComponent);

		// core functionality
		UIkit.use(Core);

	}

	UIkit.version = '3.0.10';

	core(UIkit);

	let targetClass = 'uk-animation-target';

	let Animate = {

		props: {
			animation: Number
		},

		data: {
			animation: 150
		},

		computed: {

			target() {
				return this.$el;
			}

		},

		methods: {

			animate(action) {
				let this$1 = this;


				addStyle();

				let children = toNodes(this.target.children);
				let propsFrom = children.map((el) => { return getProps(el, true); });

				let oldHeight = height(this.target);
				let oldScrollY = window.pageYOffset;

				action();

				Transition.cancel(this.target);
				children.forEach(Transition.cancel);

				reset(this.target);
				this.$update(this.target);
				fastdom.flush();

				let newHeight = height(this.target);

				children = children.concat(toNodes(this.target.children).filter((el) => { return !includes(children, el); }));

				let propsTo = children.map((el, i) => { return el.parentNode && i in propsFrom
					? propsFrom[i]
						? isVisible(el)
							? getPositionWithMargin(el)
							: {opacity: 0}
						: {opacity: isVisible(el) ? 1 : 0}
					: false; }
				);

				propsFrom = propsTo.map((props, i) => {
					let from = children[i].parentNode === this$1.target
						? propsFrom[i] || getProps(children[i])
						: false;

					if (from) {
						if (!props) {
							delete from.opacity;
						} else if (!('opacity' in props)) {
							let opacity = from.opacity;

							if (opacity % 1) {
								props.opacity = 1;
							} else {
								delete from.opacity;
							}
						}
					}

					return from;
				});

				addClass(this.target, targetClass);
				children.forEach((el, i) => { return propsFrom[i] && css(el, propsFrom[i]); });
				css(this.target, 'height', oldHeight);
				scrollTop(window, oldScrollY);

				return Promise.all(children.map((el, i) => { return propsFrom[i] && propsTo[i]
					? Transition.start(el, propsTo[i], this$1.animation, 'ease')
					: Promise.resolve(); }
				).concat(Transition.start(this.target, {height: newHeight}, this.animation, 'ease'))).then(() => {
					children.forEach((el, i) => { return css(el, {display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: ''}); });
					reset(this$1.target);
					this$1.$update(this$1.target);
					fastdom.flush(); // needed for IE11
				}, noop);

			}
		}
	};

	function getProps(el, opacity) {

		let zIndex = css(el, 'zIndex');

		return isVisible(el)
			? assign({
				display: '',
				opacity: opacity ? css(el, 'opacity') : '0',
				pointerEvents: 'none',
				position: 'absolute',
				zIndex: zIndex === 'auto' ? index(el) : zIndex
			}, getPositionWithMargin(el))
			: false;
	}

	function reset(el) {
		css(el.children, {
			height: '',
			left: '',
			opacity: '',
			pointerEvents: '',
			position: '',
			top: '',
			width: ''
		});
		removeClass(el, targetClass);
		css(el, 'height', '');
	}

	function getPositionWithMargin(el) {
		let ref = el.getBoundingClientRect();
		let height = ref.height;
		let width = ref.width;
		let ref$1 = position(el);
		let top = ref$1.top;
		let left = ref$1.left;
		top += toFloat(css(el, 'marginTop'));

		return {top, left, height, width};
	}

	let style$1;

	function addStyle() {
		if (style$1) {
			return;
		}
		style$1 = append(document.head, '<style>').sheet;
		style$1.insertRule(
			("." + targetClass + " > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }"), 0
		);
	}

	let Filter = {

		mixins: [Animate],

		args: 'target',

		props: {
			target: Boolean,
			selActive: Boolean
		},

		data: {
			target: null,
			selActive: false,
			attrItem: 'uk-filter-control',
			cls: 'uk-active',
			animation: 250
		},

		computed: {

			toggles: {

				get(ref, $el) {
					let attrItem = ref.attrItem;

					return $$(("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]"), $el);
				},

				watch() {
					this.updateState();
				}

			},

			target(ref, $el) {
				let target = ref.target;

				return $(target, $el);
			},

			children: {

				get() {
					return toNodes(this.target.children);
				},

				watch(list, old) {
					if (!isEqualList(list, old)) {
						this.updateState();
					}
				}
			}

		},

		events: [

			{

				name: 'click',

				delegate() {
					return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
				},

				handler(e) {

					e.preventDefault();
					this.apply(e.current);

				}

			}

		],

		connected() {
			let this$1 = this;


			this.updateState();

			if (this.selActive === false) {
				return;
			}

			let actives = $$(this.selActive, this.$el);
			this.toggles.forEach((el) => { return toggleClass(el, this$1.cls, includes(actives, el)); });
		},

		methods: {

			apply(el) {
				this.setState(mergeState(el, this.attrItem, this.getState()));
			},

			getState() {
				let this$1 = this;

				return this.toggles
					.filter((item) => { return hasClass(item, this$1.cls); })
					.reduce((state, el) => { return mergeState(el, this$1.attrItem, state); }, {filter: {'': ''}, sort: []});
			},

			setState(state, animate) {
				let this$1 = this;
				if ( animate === void 0 ) animate = true;


				state = assign({filter: {'': ''}, sort: []}, state);

				trigger(this.$el, 'beforeFilter', [this, state]);

				let ref = this;
				let children = ref.children;

				this.toggles.forEach((el) => { return toggleClass(el, this$1.cls, matchFilter(el, this$1.attrItem, state)); });

				let apply = function () {

					let selector = getSelector(state);

					children.forEach((el) => { return css(el, 'display', selector && !matches(el, selector) ? 'none' : ''); });

					let ref = state.sort;
					let sort = ref[0];
					let order = ref[1];

					if (sort) {
						let sorted = sortItems(children, sort, order);
						if (!isEqual(sorted, children)) {
							sorted.forEach((el) => { return append(this$1.target, el); });
						}
					}

				};

				if (animate) {
					this.animate(apply).then(() => { return trigger(this$1.$el, 'afterFilter', [this$1]); });
				} else {
					apply();
					trigger(this.$el, 'afterFilter', [this]);
				}

			},

			updateState() {
				let this$1 = this;

				fastdom.write(() => { return this$1.setState(this$1.getState(), false); });
			}

		}

	};

	function getFilter(el, attr) {
		return parseOptions(data(el, attr), ['filter']);
	}

	function mergeState(el, attr, state) {

		toNodes(el).forEach((el) => {
			let filterBy = getFilter(el, attr);
			let filter = filterBy.filter;
			let group = filterBy.group;
			let sort = filterBy.sort;
			let order = filterBy.order; if ( order === void 0 ) order = 'asc';

			if (filter || isUndefined(sort)) {

				if (group) {
					delete state.filter[''];
					state.filter[group] = filter;
				} else {
					state.filter = {'': filter || ''};
				}

			}

			if (!isUndefined(sort)) {
				state.sort = [sort, order];
			}
		});

		return state;
	}

	function matchFilter(el, attr, ref) {
		let stateFilter = ref.filter; if ( stateFilter === void 0 ) stateFilter = {'': ''};
		let ref_sort = ref.sort;
		let stateSort = ref_sort[0];
		let stateOrder = ref_sort[1];


		let ref$1 = getFilter(el, attr);
		let filter = ref$1.filter;
		let group = ref$1.group; if ( group === void 0 ) group = '';
		let sort = ref$1.sort;
		let order = ref$1.order; if ( order === void 0 ) order = 'asc';

		filter = isUndefined(sort) ? filter || '' : filter;
		sort = isUndefined(filter) ? sort || '' : sort;

		return (isUndefined(filter) || group in stateFilter && filter === stateFilter[group])
            && (isUndefined(sort) || stateSort === sort && stateOrder === order);
	}

	function isEqualList(listA, listB) {
		return listA.length === listB.length
            && listA.every((el) => { return ~listB.indexOf(el); });
	}

	function getSelector(ref) {
		let filter = ref.filter;

		let selector = '';
		each(filter, (value) => { return selector += value || ''; });
		return selector;
	}

	function sortItems(nodes, sort, order) {
		return assign([], nodes).sort((a, b) => { return data(a, sort).localeCompare(data(b, sort), undefined, {numeric: true}) * (order === 'asc' || -1); });
	}

	UIkit.component('filter', Filter);

	{
		boot(UIkit);
	}

	return UIkit;

}));
