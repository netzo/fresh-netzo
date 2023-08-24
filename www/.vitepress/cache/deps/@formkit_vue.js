import {
  __export,
  computed,
  createTextVNode,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  isReactive,
  isRef,
  markRaw,
  nextTick,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  resolveComponent,
  toRaw,
  toRef,
  triggerRef,
  watch,
  watchEffect
} from "./chunk-CZGXVFL7.js";

// node_modules/@formkit/utils/dist/index.mjs
var explicitKeys = [
  "__key",
  "__init",
  "__shim",
  "__original",
  "__index",
  "__prevKey"
];
function token() {
  return Math.random().toString(36).substring(2, 15);
}
function dedupe(arr1, arr2) {
  const original = arr1 instanceof Set ? arr1 : new Set(arr1);
  if (arr2)
    arr2.forEach((item) => original.add(item));
  return [...original];
}
function has(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
function eq(valA, valB, deep = true, explicit = ["__key"]) {
  if (valA === valB)
    return true;
  if (typeof valB === "object" && typeof valA === "object") {
    if (valA instanceof Map)
      return false;
    if (valA instanceof Set)
      return false;
    if (valA instanceof Date)
      return false;
    if (valA === null || valB === null)
      return false;
    if (Object.keys(valA).length !== Object.keys(valB).length)
      return false;
    for (const k of explicit) {
      if ((k in valA || k in valB) && valA[k] !== valB[k])
        return false;
    }
    for (const key in valA) {
      if (!(key in valB))
        return false;
      if (valA[key] !== valB[key] && !deep)
        return false;
      if (deep && !eq(valA[key], valB[key], deep, explicit))
        return false;
    }
    return true;
  }
  return false;
}
function empty(value) {
  const type = typeof value;
  if (type === "number")
    return false;
  if (value === void 0)
    return true;
  if (type === "string") {
    return value === "";
  }
  if (type === "object") {
    if (value === null)
      return true;
    for (const _i in value)
      return false;
    if (value instanceof RegExp)
      return false;
    if (value instanceof Date)
      return false;
    return true;
  }
  return false;
}
function escapeExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function regexForFormat(format) {
  const escaped = `^${escapeExp(format)}$`;
  const formats = {
    MM: "(0[1-9]|1[012])",
    M: "([1-9]|1[012])",
    DD: "([012][0-9]|3[01])",
    D: "([012]?[0-9]|3[01])",
    YYYY: "\\d{4}",
    YY: "\\d{2}"
  };
  const tokens = Object.keys(formats);
  return new RegExp(tokens.reduce((regex, format2) => {
    return regex.replace(format2, formats[format2]);
  }, escaped));
}
function isRecord(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isObject(o) {
  return isRecord(o) || Array.isArray(o);
}
function isPojo(o) {
  if (isRecord(o) === false)
    return false;
  if (o.__FKNode__ || o.__POJO__ === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  const prot = ctor.prototype;
  if (isRecord(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function extend(original, additional, extendArrays = false, ignoreUndefined = false) {
  if (additional === null)
    return null;
  const merged = {};
  if (typeof additional === "string")
    return additional;
  for (const key in original) {
    if (has(additional, key) && (additional[key] !== void 0 || !ignoreUndefined)) {
      if (extendArrays && Array.isArray(original[key]) && Array.isArray(additional[key])) {
        merged[key] = original[key].concat(additional[key]);
        continue;
      }
      if (additional[key] === void 0) {
        continue;
      }
      if (isPojo(original[key]) && isPojo(additional[key])) {
        merged[key] = extend(original[key], additional[key], extendArrays, ignoreUndefined);
      } else {
        merged[key] = additional[key];
      }
    } else {
      merged[key] = original[key];
    }
  }
  for (const key in additional) {
    if (!has(merged, key) && additional[key] !== void 0) {
      merged[key] = additional[key];
    }
  }
  return merged;
}
function isQuotedString(str) {
  if (str[0] !== '"' && str[0] !== "'")
    return false;
  if (str[0] !== str[str.length - 1])
    return false;
  const quoteType = str[0];
  for (let p = 1; p < str.length; p++) {
    if (str[p] === quoteType && (p === 1 || str[p - 1] !== "\\") && p !== str.length - 1) {
      return false;
    }
  }
  return true;
}
function rmEscapes(str) {
  if (!str.length)
    return "";
  let clean = "";
  let lastChar = "";
  for (let p = 0; p < str.length; p++) {
    const char = str.charAt(p);
    if (char !== "\\" || lastChar === "\\") {
      clean += char;
    }
    lastChar = char;
  }
  return clean;
}
function nodeProps(...sets) {
  return sets.reduce((valid, props2) => {
    const { value, name, modelValue, config, plugins, ...validProps } = props2;
    return Object.assign(valid, validProps);
  }, {});
}
function parseArgs(str) {
  const args = [];
  let arg = "";
  let depth = 0;
  let quote = "";
  let lastChar = "";
  for (let p = 0; p < str.length; p++) {
    const char = str.charAt(p);
    if (char === quote && lastChar !== "\\") {
      quote = "";
    } else if ((char === "'" || char === '"') && !quote && lastChar !== "\\") {
      quote = char;
    } else if (char === "(" && !quote) {
      depth++;
    } else if (char === ")" && !quote) {
      depth--;
    }
    if (char === "," && !quote && depth === 0) {
      args.push(arg);
      arg = "";
    } else if (char !== " " || quote) {
      arg += char;
    }
    lastChar = char;
  }
  if (arg) {
    args.push(arg);
  }
  return args;
}
function except(obj, toRemove) {
  const clean = {};
  const exps = toRemove.filter((n) => n instanceof RegExp);
  const keysToRemove = new Set(toRemove);
  for (const key in obj) {
    if (!keysToRemove.has(key) && !exps.some((exp) => exp.test(key))) {
      clean[key] = obj[key];
    }
  }
  return clean;
}
function only(obj, include) {
  const clean = {};
  const exps = include.filter((n) => n instanceof RegExp);
  include.forEach((key) => {
    if (!(key instanceof RegExp)) {
      clean[key] = obj[key];
    }
  });
  Object.keys(obj).forEach((key) => {
    if (exps.some((exp) => exp.test(key))) {
      clean[key] = obj[key];
    }
  });
  return clean;
}
function camel(str) {
  return str.replace(/-([a-z0-9])/gi, (_s, g) => g.toUpperCase());
}
function kebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, (_s, trail, cap) => trail + "-" + cap.toLowerCase()).replace(" ", "-").toLowerCase();
}
function shallowClone(obj, explicit = explicitKeys) {
  if (obj !== null && typeof obj === "object") {
    let returnObject;
    if (Array.isArray(obj))
      returnObject = [...obj];
    else if (isPojo(obj))
      returnObject = { ...obj };
    if (returnObject) {
      applyExplicit(obj, returnObject, explicit);
      return returnObject;
    }
  }
  return obj;
}
function clone(obj, explicit = explicitKeys) {
  if (obj === null || obj instanceof RegExp || obj instanceof Date || obj instanceof Map || obj instanceof Set || typeof File === "function" && obj instanceof File)
    return obj;
  let returnObject;
  if (Array.isArray(obj)) {
    returnObject = obj.map((value) => {
      if (typeof value === "object")
        return clone(value, explicit);
      return value;
    });
  } else {
    returnObject = Object.keys(obj).reduce((newObj, key) => {
      newObj[key] = typeof obj[key] === "object" ? clone(obj[key], explicit) : obj[key];
      return newObj;
    }, {});
  }
  for (const key of explicit) {
    if (key in obj) {
      Object.defineProperty(returnObject, key, {
        enumerable: false,
        value: obj[key]
      });
    }
  }
  return returnObject;
}
function cloneAny(obj) {
  return typeof obj === "object" ? clone(obj) : obj;
}
function getAt(obj, addr) {
  if (!obj || typeof obj !== "object")
    return null;
  const segments = addr.split(".");
  let o = obj;
  for (const i2 in segments) {
    const segment = segments[i2];
    if (has(o, segment)) {
      o = o[segment];
    }
    if (+i2 === segments.length - 1)
      return o;
    if (!o || typeof o !== "object")
      return null;
  }
  return null;
}
function undefine(value) {
  return value !== void 0 && value !== "false" && value !== false ? true : void 0;
}
function init(obj) {
  return !Object.isFrozen(obj) ? Object.defineProperty(obj, "__init", {
    enumerable: false,
    value: true
  }) : obj;
}
function slugify(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\s+/g, "-");
}
function applyExplicit(original, obj, explicit) {
  for (const key of explicit) {
    if (key in original) {
      Object.defineProperty(obj, key, {
        enumerable: false,
        value: original[key]
      });
    }
  }
  return obj;
}

// node_modules/@formkit/core/dist/index.mjs
function createDispatcher() {
  const middleware = [];
  let currentIndex = 0;
  const use2 = (dispatchable) => middleware.push(dispatchable);
  const dispatch = (payload) => {
    const current = middleware[currentIndex];
    if (typeof current === "function") {
      return current(payload, (explicitPayload) => {
        currentIndex++;
        return dispatch(explicitPayload === void 0 ? payload : explicitPayload);
      });
    }
    currentIndex = 0;
    return payload;
  };
  use2.dispatch = dispatch;
  use2.unshift = (dispatchable) => middleware.unshift(dispatchable);
  use2.remove = (dispatchable) => {
    const index2 = middleware.indexOf(dispatchable);
    if (index2 > -1)
      middleware.splice(index2, 1);
  };
  return use2;
}
function createEmitter() {
  const listeners = /* @__PURE__ */ new Map();
  const receipts2 = /* @__PURE__ */ new Map();
  let buffer = void 0;
  const emitter = (node, event) => {
    if (buffer) {
      buffer.set(event.name, [node, event]);
      return;
    }
    if (listeners.has(event.name)) {
      listeners.get(event.name).forEach((wrapper2) => {
        if (event.origin === node || wrapper2.modifiers.includes("deep")) {
          wrapper2.listener(event);
        }
      });
    }
    if (event.bubble) {
      node.bubble(event);
    }
  };
  emitter.on = (eventName, listener) => {
    const [event, ...modifiers] = eventName.split(".");
    const receipt = listener.receipt || token();
    const wrapper2 = {
      modifiers,
      event,
      listener,
      receipt
    };
    listeners.has(event) ? listeners.get(event).push(wrapper2) : listeners.set(event, [wrapper2]);
    receipts2.has(receipt) ? receipts2.get(receipt).push(event) : receipts2.set(receipt, [event]);
    return receipt;
  };
  emitter.off = (receipt) => {
    var _a;
    if (receipts2.has(receipt)) {
      (_a = receipts2.get(receipt)) === null || _a === void 0 ? void 0 : _a.forEach((event) => {
        const eventListeners = listeners.get(event);
        if (Array.isArray(eventListeners)) {
          listeners.set(event, eventListeners.filter((wrapper2) => wrapper2.receipt !== receipt));
        }
      });
      receipts2.delete(receipt);
    }
  };
  emitter.pause = (node) => {
    if (!buffer)
      buffer = /* @__PURE__ */ new Map();
    if (node) {
      node.walk((child) => child._e.pause());
    }
  };
  emitter.play = (node) => {
    if (!buffer)
      return;
    const events = buffer;
    buffer = void 0;
    events.forEach(([node2, event]) => emitter(node2, event));
    if (node) {
      node.walk((child) => child._e.play());
    }
  };
  return emitter;
}
function emit$1(node, context, name, payload, bubble2 = true) {
  context._e(node, {
    payload,
    name,
    bubble: bubble2,
    origin: node
  });
  return node;
}
function bubble(node, _context, event) {
  if (isNode(node.parent)) {
    node.parent._e(node.parent, event);
  }
  return node;
}
function on(_node, context, name, listener) {
  return context._e.on(name, listener);
}
function off(node, context, receipt) {
  context._e.off(receipt);
  return node;
}
var errorHandler = createDispatcher();
errorHandler((error2, next) => {
  if (!error2.message)
    error2.message = String(`E${error2.code}`);
  return next(error2);
});
var warningHandler = createDispatcher();
warningHandler((warning, next) => {
  if (!warning.message)
    warning.message = String(`W${warning.code}`);
  const result = next(warning);
  if (console && typeof console.warn === "function")
    console.warn(result.message);
  return result;
});
function warn(code, data = {}) {
  warningHandler.dispatch({ code, data });
}
function error(code, data = {}) {
  throw Error(errorHandler.dispatch({ code, data }).message);
}
function createMessage(conf, node) {
  const m = {
    blocking: false,
    key: token(),
    meta: {},
    type: "state",
    visible: true,
    ...conf
  };
  if (node && m.value && m.meta.localize !== false) {
    m.value = node.t(m);
    m.meta.locale = node.config.locale;
  }
  return m;
}
var storeTraps = {
  apply: applyMessages,
  set: setMessage,
  remove: removeMessage,
  filter: filterMessages,
  reduce: reduceMessages,
  release: releaseBuffer,
  touch: touchMessages
};
function createStore(_buffer = false) {
  const messages2 = {};
  let node;
  let buffer = _buffer;
  let _b = [];
  const _m = /* @__PURE__ */ new Map();
  let _r = void 0;
  const store = new Proxy(messages2, {
    get(...args) {
      const [_target, property] = args;
      if (property === "buffer")
        return buffer;
      if (property === "_b")
        return _b;
      if (property === "_m")
        return _m;
      if (property === "_r")
        return _r;
      if (has(storeTraps, property)) {
        return storeTraps[property].bind(null, messages2, store, node);
      }
      return Reflect.get(...args);
    },
    set(_t, prop, value) {
      if (prop === "_n") {
        node = value;
        if (_r === "__n")
          releaseMissed(node, store);
        return true;
      } else if (prop === "_b") {
        _b = value;
        return true;
      } else if (prop === "buffer") {
        buffer = value;
        return true;
      } else if (prop === "_r") {
        _r = value;
        return true;
      }
      error(101, node);
      return false;
    }
  });
  return store;
}
function setMessage(messageStore, store, node, message2) {
  if (store.buffer) {
    store._b.push([[message2]]);
    return store;
  }
  if (messageStore[message2.key] !== message2) {
    if (typeof message2.value === "string" && message2.meta.localize !== false) {
      const previous = message2.value;
      message2.value = node.t(message2);
      if (message2.value !== previous) {
        message2.meta.locale = node.props.locale;
      }
    }
    const e = `message-${has(messageStore, message2.key) ? "updated" : "added"}`;
    messageStore[message2.key] = Object.freeze(node.hook.message.dispatch(message2));
    node.emit(e, message2);
  }
  return store;
}
function touchMessages(messageStore, store) {
  for (const key in messageStore) {
    const message2 = { ...messageStore[key] };
    store.set(message2);
  }
}
function removeMessage(messageStore, store, node, key) {
  if (has(messageStore, key)) {
    const message2 = messageStore[key];
    delete messageStore[key];
    node.emit("message-removed", message2);
  }
  if (store.buffer === true) {
    store._b = store._b.filter((buffered) => {
      buffered[0] = buffered[0].filter((m) => m.key !== key);
      return buffered[1] || buffered[0].length;
    });
  }
  return store;
}
function filterMessages(messageStore, store, node, callback, type) {
  for (const key in messageStore) {
    const message2 = messageStore[key];
    if ((!type || message2.type === type) && !callback(message2)) {
      removeMessage(messageStore, store, node, key);
    }
  }
}
function reduceMessages(messageStore, _store, _node, reducer, accumulator) {
  for (const key in messageStore) {
    const message2 = messageStore[key];
    accumulator = reducer(accumulator, message2);
  }
  return accumulator;
}
function applyMessages(_messageStore, store, node, messages2, clear) {
  if (Array.isArray(messages2)) {
    if (store.buffer) {
      store._b.push([messages2, clear]);
      return;
    }
    const applied = new Set(messages2.map((message2) => {
      store.set(message2);
      return message2.key;
    }));
    if (typeof clear === "string") {
      store.filter((message2) => message2.type !== clear || applied.has(message2.key));
    } else if (typeof clear === "function") {
      store.filter((message2) => !clear(message2) || applied.has(message2.key));
    }
  } else {
    for (const address in messages2) {
      const child = node.at(address);
      if (child) {
        child.store.apply(messages2[address], clear);
      } else {
        missed(node, store, address, messages2[address], clear);
      }
    }
  }
}
function createMessages(node, ...errors2) {
  const sourceKey = `${node.name}-set`;
  const make = (error2) => createMessage({
    key: slugify(error2),
    type: "error",
    value: error2,
    meta: { source: sourceKey, autoClear: true }
  });
  return errors2.filter((m) => !!m).map((errorSet) => {
    if (typeof errorSet === "string")
      errorSet = [errorSet];
    if (Array.isArray(errorSet)) {
      return errorSet.map((error2) => make(error2));
    } else {
      const errors3 = {};
      for (const key in errorSet) {
        if (Array.isArray(errorSet[key])) {
          errors3[key] = errorSet[key].map((error2) => make(error2));
        } else {
          errors3[key] = [make(errorSet[key])];
        }
      }
      return errors3;
    }
  });
}
function missed(node, store, address, messages2, clear) {
  var _a;
  const misses = store._m;
  if (!misses.has(address))
    misses.set(address, []);
  if (!store._r)
    store._r = releaseMissed(node, store);
  (_a = misses.get(address)) === null || _a === void 0 ? void 0 : _a.push([messages2, clear]);
}
function releaseMissed(node, store) {
  return node.on("child.deep", ({ payload: child }) => {
    store._m.forEach((misses, address) => {
      if (node.at(address) === child) {
        misses.forEach(([messages2, clear]) => {
          child.store.apply(messages2, clear);
        });
        store._m.delete(address);
      }
    });
    if (store._m.size === 0 && store._r) {
      node.off(store._r);
      store._r = void 0;
    }
  });
}
function releaseBuffer(_messageStore, store) {
  store.buffer = false;
  store._b.forEach(([messages2, clear]) => store.apply(messages2, clear));
  store._b = [];
}
function createLedger() {
  const ledger = {};
  let n;
  return {
    count: (...args) => createCounter(n, ledger, ...args),
    init(node) {
      n = node;
      node.on("message-added.deep", add(ledger, 1));
      node.on("message-removed.deep", add(ledger, -1));
    },
    merge: (child) => merge(n, ledger, child),
    settled(counterName) {
      return has(ledger, counterName) ? ledger[counterName].promise : Promise.resolve();
    },
    unmerge: (child) => merge(n, ledger, child, true),
    value(counterName) {
      return has(ledger, counterName) ? ledger[counterName].count : 0;
    }
  };
}
function createCounter(node, ledger, counterName, condition, increment = 0) {
  condition = parseCondition(condition || counterName);
  if (!has(ledger, counterName)) {
    const counter = {
      condition,
      count: 0,
      name: counterName,
      node,
      promise: Promise.resolve(),
      resolve: () => {
      }
      // eslint-disable-line @typescript-eslint/no-empty-function
    };
    ledger[counterName] = counter;
    increment = node.store.reduce((sum, m) => sum + counter.condition(m) * 1, increment);
    node.each((child) => {
      child.ledger.count(counter.name, counter.condition);
      increment += child.ledger.value(counter.name);
    });
  }
  return count(ledger[counterName], increment).promise;
}
function parseCondition(condition) {
  if (typeof condition === "function") {
    return condition;
  }
  return (m) => m.type === condition;
}
function count(counter, increment) {
  const initial = counter.count;
  const post = counter.count + increment;
  counter.count = post;
  if (initial === 0 && post !== 0) {
    counter.node.emit(`unsettled:${counter.name}`, counter.count, false);
    counter.promise = new Promise((r) => counter.resolve = r);
  } else if (initial !== 0 && post === 0) {
    counter.node.emit(`settled:${counter.name}`, counter.count, false);
    counter.resolve();
  }
  counter.node.emit(`count:${counter.name}`, counter.count, false);
  return counter;
}
function add(ledger, delta) {
  return (e) => {
    for (const name in ledger) {
      const counter = ledger[name];
      if (counter.condition(e.payload)) {
        count(counter, delta);
      }
    }
  };
}
function merge(parent, ledger, child, remove = false) {
  for (const key in ledger) {
    const condition = ledger[key].condition;
    if (!remove)
      child.ledger.count(key, condition);
    const increment = child.ledger.value(key) * (remove ? -1 : 1);
    if (!parent)
      continue;
    do {
      parent.ledger.count(key, condition, increment);
      parent = parent.parent;
    } while (parent);
  }
}
var registry = /* @__PURE__ */ new Map();
var reflected = /* @__PURE__ */ new Map();
var emit = createEmitter();
var receipts = [];
function register(node) {
  if (node.props.id) {
    registry.set(node.props.id, node);
    reflected.set(node, node.props.id);
    emit(node, {
      payload: node,
      name: node.props.id,
      bubble: false,
      origin: node
    });
  }
}
function deregister(node) {
  if (reflected.has(node)) {
    const id2 = reflected.get(node);
    reflected.delete(node);
    registry.delete(id2);
    emit(node, {
      payload: null,
      name: id2,
      bubble: false,
      origin: node
    });
  }
}
function getNode$1(id2) {
  return registry.get(id2);
}
function watchRegistry(id2, callback) {
  receipts.push(emit.on(id2, callback));
}
function configChange(node, prop, value) {
  let usingFallback = true;
  !(prop in node.config._t) ? node.emit(`config:${prop}`, value, false) : usingFallback = false;
  if (!(prop in node.props)) {
    node.emit("prop", { prop, value });
    node.emit(`prop:${prop}`, value);
  }
  return usingFallback;
}
function createConfig$1(options2 = {}) {
  const nodes = /* @__PURE__ */ new Set();
  const target = {
    ...options2,
    ...{
      _add: (node) => nodes.add(node),
      _rm: (node) => nodes.delete(node)
    }
  };
  const rootConfig = new Proxy(target, {
    set(t, prop, value, r) {
      if (typeof prop === "string") {
        nodes.forEach((node) => configChange(node, prop, value));
      }
      return Reflect.set(t, prop, value, r);
    }
  });
  return rootConfig;
}
function submitForm(id2) {
  const formElement = document.getElementById(id2);
  if (formElement instanceof HTMLFormElement) {
    const event = new Event("submit", { cancelable: true, bubbles: true });
    formElement.dispatchEvent(event);
    return;
  }
  warn(151, id2);
}
function clearState(node) {
  const clear = (n) => {
    for (const key in n.store) {
      const message2 = n.store[key];
      if (message2.type === "error" || message2.type === "ui" && key === "incomplete") {
        n.store.remove(key);
      } else if (message2.type === "state") {
        n.store.set({ ...message2, value: false });
      }
    }
  };
  clear(node);
  node.walk(clear);
}
function reset(id2, resetTo) {
  const node = typeof id2 === "string" ? getNode$1(id2) : id2;
  if (node) {
    const initial = (n) => cloneAny(n.props.initial) || (n.type === "group" ? {} : n.type === "list" ? [] : void 0);
    node._e.pause(node);
    node.input(cloneAny(resetTo) || initial(node), false);
    node.walk((child) => child.input(initial(child), false));
    const finalInit = initial(node);
    node.input(typeof finalInit === "object" ? cloneAny(resetTo) || init(finalInit) : finalInit, false);
    node._e.play(node);
    clearState(node);
    node.emit("reset", node);
    return node;
  }
  warn(152, id2);
  return;
}
var defaultConfig = {
  delimiter: ".",
  delay: 0,
  locale: "en",
  rootClasses: (key) => ({ [`formkit-${kebab(key)}`]: true })
};
var useIndex = Symbol("index");
var valueRemoved = Symbol("removed");
var valueMoved = Symbol("moved");
var valueInserted = Symbol("inserted");
function isList(arg) {
  return arg.type === "list" && Array.isArray(arg._value);
}
function isNode(node) {
  return node && typeof node === "object" && node.__FKNode__ === true;
}
var invalidSetter = (node, _context, property) => {
  error(102, [node, property]);
};
var traps = {
  _c: trap(getContext, invalidSetter, false),
  add: trap(addChild),
  addProps: trap(addProps),
  address: trap(getAddress, invalidSetter, false),
  at: trap(getNode),
  bubble: trap(bubble),
  clearErrors: trap(clearErrors$1),
  calm: trap(calm),
  config: trap(false),
  define: trap(define),
  disturb: trap(disturb),
  destroy: trap(destroy),
  hydrate: trap(hydrate),
  index: trap(getIndex, setIndex, false),
  input: trap(input),
  each: trap(eachChild),
  emit: trap(emit$1),
  find: trap(find),
  on: trap(on),
  off: trap(off),
  parent: trap(false, setParent),
  plugins: trap(false),
  remove: trap(removeChild),
  root: trap(getRoot, invalidSetter, false),
  reset: trap(resetValue),
  resetConfig: trap(resetConfig),
  setErrors: trap(setErrors$1),
  submit: trap(submit),
  t: trap(text),
  use: trap(use),
  name: trap(getName, false, false),
  walk: trap(walkTree)
};
function createTraps() {
  return new Map(Object.entries(traps));
}
function trap(getter, setter, curryGetter = true) {
  return {
    get: getter ? (node, context) => curryGetter ? (...args) => getter(node, context, ...args) : getter(node, context) : false,
    set: setter !== void 0 ? setter : invalidSetter.bind(null)
  };
}
function createHooks() {
  const hooks = /* @__PURE__ */ new Map();
  return new Proxy(hooks, {
    get(_, property) {
      if (!hooks.has(property)) {
        hooks.set(property, createDispatcher());
      }
      return hooks.get(property);
    }
  });
}
var nameCount = 0;
var idCount = 0;
function resetCount() {
  nameCount = 0;
  idCount = 0;
}
function createName(options2) {
  var _a, _b;
  if (((_a = options2.parent) === null || _a === void 0 ? void 0 : _a.type) === "list")
    return useIndex;
  return options2.name || `${((_b = options2.props) === null || _b === void 0 ? void 0 : _b.type) || "input"}_${++nameCount}`;
}
function createValue(options2) {
  if (options2.type === "group") {
    return init(options2.value && typeof options2.value === "object" && !Array.isArray(options2.value) ? options2.value : {});
  } else if (options2.type === "list") {
    return init(Array.isArray(options2.value) ? options2.value : []);
  }
  return options2.value;
}
function input(node, context, value, async = true) {
  context._value = validateInput(node, node.hook.input.dispatch(value));
  node.emit("input", context._value);
  if (context.isSettled)
    node.disturb();
  if (async) {
    if (context._tmo)
      clearTimeout(context._tmo);
    context._tmo = setTimeout(commit, node.props.delay, node, context);
  } else {
    commit(node, context);
  }
  return context.settled;
}
function validateInput(node, value) {
  switch (node.type) {
    case "input":
      break;
    case "group":
      if (!value || typeof value !== "object")
        error(107, [node, value]);
      break;
    case "list":
      if (!Array.isArray(value))
        error(108, [node, value]);
      break;
  }
  return value;
}
function commit(node, context, calm2 = true, hydrate2 = true) {
  context._value = context.value = node.hook.commit.dispatch(context._value);
  if (node.type !== "input" && hydrate2)
    node.hydrate();
  node.emit("commit", context.value);
  if (calm2)
    node.calm();
}
function partial(context, { name, value, from }) {
  if (Object.isFrozen(context._value))
    return;
  if (isList(context)) {
    const insert = value === valueRemoved ? [] : value === valueMoved && typeof from === "number" ? context._value.splice(from, 1) : [value];
    context._value.splice(name, value === valueMoved || from === valueInserted ? 0 : 1, ...insert);
    return;
  }
  if (value !== valueRemoved) {
    context._value[name] = value;
  } else {
    delete context._value[name];
  }
}
function hydrate(node, context) {
  const _value = context._value;
  context.children.forEach((child) => {
    if (typeof _value !== "object")
      return;
    if (child.name in _value) {
      const childValue = child.type !== "input" || _value[child.name] && typeof _value[child.name] === "object" ? init(_value[child.name]) : _value[child.name];
      child.input(childValue, false);
    } else {
      if (node.type !== "list" || typeof child.name === "number") {
        partial(context, { name: child.name, value: child.value });
      }
      if (!_value.__init) {
        if (child.type === "group")
          child.input({}, false);
        else if (child.type === "list")
          child.input([], false);
        else
          child.input(void 0, false);
      }
    }
  });
  return node;
}
function disturb(node, context) {
  var _a;
  if (context._d <= 0) {
    context.isSettled = false;
    node.emit("settled", false, false);
    context.settled = new Promise((resolve) => {
      context._resolve = resolve;
    });
    if (node.parent)
      (_a = node.parent) === null || _a === void 0 ? void 0 : _a.disturb();
  }
  context._d++;
  return node;
}
function calm(node, context, value) {
  var _a;
  if (value !== void 0 && node.type !== "input") {
    partial(context, value);
    return commit(node, context, true, false);
  }
  if (context._d > 0)
    context._d--;
  if (context._d === 0) {
    context.isSettled = true;
    node.emit("settled", true, false);
    if (node.parent)
      (_a = node.parent) === null || _a === void 0 ? void 0 : _a.calm({ name: node.name, value: context.value });
    if (context._resolve)
      context._resolve(context.value);
  }
}
function destroy(node, context) {
  node.emit("destroying", node);
  node.store.filter(() => false);
  if (node.parent) {
    node.parent.remove(node);
  }
  deregister(node);
  context._value = context.value = void 0;
  node.emit("destroyed", node);
}
function define(node, context, definition) {
  context.type = definition.type;
  context.props.definition = clone(definition);
  context.value = context._value = createValue({
    type: node.type,
    value: context.value
  });
  if (definition.forceTypeProp) {
    if (node.props.type)
      node.props.originalType = node.props.type;
    context.props.type = definition.forceTypeProp;
  }
  if (definition.family) {
    context.props.family = definition.family;
  }
  if (definition.features) {
    definition.features.forEach((feature) => feature(node));
  }
  if (definition.props) {
    node.addProps(definition.props);
  }
  node.emit("defined", definition);
}
function addProps(node, context, props2) {
  var _a;
  if (node.props.attrs) {
    const attrs = { ...node.props.attrs };
    node.props._emit = false;
    for (const attr in attrs) {
      const camelName = camel(attr);
      if (props2.includes(camelName)) {
        node.props[camelName] = attrs[attr];
        delete attrs[attr];
      }
    }
    const initial = cloneAny(context._value);
    node.props.initial = node.type !== "input" ? init(initial) : initial;
    node.props._emit = true;
    node.props.attrs = attrs;
    if (node.props.definition) {
      node.props.definition.props = [
        ...((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.props) || [],
        ...props2
      ];
    }
  }
  node.emit("added-props", props2);
  return node;
}
function addChild(parent, parentContext, child, listIndex) {
  if (parent.type === "input")
    error(100, parent);
  if (child.parent && child.parent !== parent) {
    child.parent.remove(child);
  }
  if (!parentContext.children.includes(child)) {
    if (listIndex !== void 0 && parent.type === "list") {
      parentContext.children.splice(listIndex, 0, child);
      if (Array.isArray(parent.value) && parent.value.length < parentContext.children.length) {
        parent.disturb().calm({
          name: listIndex,
          value: child.value,
          from: valueInserted
        });
      }
    } else {
      parentContext.children.push(child);
    }
    if (!child.isSettled)
      parent.disturb();
  }
  if (child.parent !== parent) {
    child.parent = parent;
    if (child.parent !== parent) {
      parent.remove(child);
      child.parent.add(child);
      return parent;
    }
  } else {
    child.use(parent.plugins);
  }
  commit(parent, parentContext, false);
  parent.ledger.merge(child);
  parent.emit("child", child);
  return parent;
}
function setParent(child, context, _property, parent) {
  if (isNode(parent)) {
    if (child.parent && child.parent !== parent) {
      child.parent.remove(child);
    }
    context.parent = parent;
    child.resetConfig();
    !parent.children.includes(child) ? parent.add(child) : child.use(parent.plugins);
    return true;
  }
  if (parent === null) {
    context.parent = null;
    return true;
  }
  return false;
}
function removeChild(node, context, child) {
  const childIndex = context.children.indexOf(child);
  if (childIndex !== -1) {
    if (child.isSettled)
      node.disturb();
    context.children.splice(childIndex, 1);
    let preserve = undefine(child.props.preserve);
    let parent = child.parent;
    while (preserve === void 0 && parent) {
      preserve = undefine(parent.props.preserve);
      parent = parent.parent;
    }
    if (!preserve) {
      node.calm({
        name: node.type === "list" ? childIndex : child.name,
        value: valueRemoved
      });
    } else {
      node.calm();
    }
    child.parent = null;
    child.config._rmn = child;
  }
  node.ledger.unmerge(child);
  return node;
}
function eachChild(_node, context, callback) {
  context.children.forEach((child) => callback(child));
}
function walkTree(_node, context, callback, stopIfFalse = false) {
  context.children.forEach((child) => {
    if (callback(child) !== false || !stopIfFalse) {
      child.walk(callback, stopIfFalse);
    }
  });
}
function resetConfig(node, context) {
  const parent = node.parent || void 0;
  context.config = createConfig(node.config._t, parent);
  node.walk((n) => n.resetConfig());
}
function use(node, context, plugin2, run2 = true, library = true) {
  if (Array.isArray(plugin2) || plugin2 instanceof Set) {
    plugin2.forEach((p) => use(node, context, p));
    return node;
  }
  if (!context.plugins.has(plugin2)) {
    if (library && typeof plugin2.library === "function")
      plugin2.library(node);
    if (run2 && plugin2(node) !== false) {
      context.plugins.add(plugin2);
      node.children.forEach((child) => child.use(plugin2));
    }
  }
  return node;
}
function setIndex(node, _context, _property, setIndex2) {
  if (isNode(node.parent)) {
    const children = node.parent.children;
    const index2 = setIndex2 >= children.length ? children.length - 1 : setIndex2 < 0 ? 0 : setIndex2;
    const oldIndex = children.indexOf(node);
    if (oldIndex === -1)
      return false;
    children.splice(oldIndex, 1);
    children.splice(index2, 0, node);
    node.parent.children = children;
    if (node.parent.type === "list")
      node.parent.disturb().calm({ name: index2, value: valueMoved, from: oldIndex });
    return true;
  }
  return false;
}
function getIndex(node) {
  if (node.parent) {
    const index2 = [...node.parent.children].indexOf(node);
    return index2 === -1 ? node.parent.children.length : index2;
  }
  return -1;
}
function getContext(_node, context) {
  return context;
}
function getName(node, context) {
  var _a;
  if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === "list")
    return node.index;
  return context.name !== useIndex ? context.name : node.index;
}
function getAddress(node, context) {
  return context.parent ? context.parent.address.concat([node.name]) : [node.name];
}
function getNode(node, _context, locator) {
  const address = typeof locator === "string" ? locator.split(node.config.delimiter) : locator;
  if (!address.length)
    return void 0;
  const first = address[0];
  let pointer = node.parent;
  if (!pointer) {
    if (String(address[0]) === String(node.name))
      address.shift();
    pointer = node;
  }
  if (first === "$parent")
    address.shift();
  while (pointer && address.length) {
    const name = address.shift();
    switch (name) {
      case "$root":
        pointer = node.root;
        break;
      case "$parent":
        pointer = pointer.parent;
        break;
      case "$self":
        pointer = node;
        break;
      default:
        pointer = pointer.children.find((c) => String(c.name) === String(name)) || select(pointer, name);
    }
  }
  return pointer || void 0;
}
function select(node, selector) {
  const matches3 = String(selector).match(/^(find)\((.*)\)$/);
  if (matches3) {
    const [, action, argStr] = matches3;
    const args = argStr.split(",").map((arg) => arg.trim());
    switch (action) {
      case "find":
        return node.find(args[0], args[1]);
      default:
        return void 0;
    }
  }
  return void 0;
}
function find(node, _context, searchTerm, searcher) {
  return bfs(node, searchTerm, searcher);
}
function bfs(tree, searchValue, searchGoal = "name") {
  const search = typeof searchGoal === "string" ? (n) => n[searchGoal] == searchValue : searchGoal;
  const stack = [tree];
  while (stack.length) {
    const node = stack.shift();
    if (search(node, searchValue))
      return node;
    stack.push(...node.children);
  }
  return void 0;
}
function getRoot(n) {
  let node = n;
  while (node.parent) {
    node = node.parent;
  }
  return node;
}
function createConfig(target = {}, parent) {
  let node = void 0;
  return new Proxy(target, {
    get(...args) {
      const prop = args[1];
      if (prop === "_t")
        return target;
      const localValue = Reflect.get(...args);
      if (localValue !== void 0)
        return localValue;
      if (parent) {
        const parentVal = parent.config[prop];
        if (parentVal !== void 0)
          return parentVal;
      }
      if (target.rootConfig && typeof prop === "string") {
        const rootValue = target.rootConfig[prop];
        if (rootValue !== void 0)
          return rootValue;
      }
      if (prop === "delay" && (node === null || node === void 0 ? void 0 : node.type) === "input")
        return 20;
      return defaultConfig[prop];
    },
    set(...args) {
      const prop = args[1];
      const value = args[2];
      if (prop === "_n") {
        node = value;
        if (target.rootConfig)
          target.rootConfig._add(node);
        return true;
      }
      if (prop === "_rmn") {
        if (target.rootConfig)
          target.rootConfig._rm(node);
        node = void 0;
        return true;
      }
      if (!eq(target[prop], value, false)) {
        const didSet = Reflect.set(...args);
        if (node) {
          node.emit(`config:${prop}`, value, false);
          configChange(node, prop, value);
          node.walk((n) => configChange(n, prop, value), true);
        }
        return didSet;
      }
      return true;
    }
  });
}
function text(node, _context, key, type = "ui") {
  const fragment2 = typeof key === "string" ? { key, value: key, type } : key;
  const value = node.hook.text.dispatch(fragment2);
  node.emit("text", value, false);
  return value.value;
}
function submit(node) {
  const name = node.name;
  do {
    if (node.props.isForm === true)
      break;
    if (!node.parent)
      error(106, name);
    node = node.parent;
  } while (node);
  if (node.props.id) {
    submitForm(node.props.id);
  }
}
function resetValue(node, _context, value) {
  return reset(node, value);
}
function setErrors$1(node, _context, localErrors, childErrors) {
  const sourceKey = `${node.name}-set`;
  const errors2 = node.hook.setErrors.dispatch({ localErrors, childErrors });
  createMessages(node, errors2.localErrors, errors2.childErrors).forEach((errors3) => {
    node.store.apply(errors3, (message2) => message2.meta.source === sourceKey);
  });
  return node;
}
function clearErrors$1(node, context, clearChildErrors = true, sourceKey) {
  setErrors$1(node, context, []);
  if (clearChildErrors) {
    sourceKey = sourceKey || `${node.name}-set`;
    node.walk((child) => {
      child.store.filter((message2) => {
        return !(message2.type === "error" && message2.meta && message2.meta.source === sourceKey);
      });
    });
  }
  return node;
}
function defaultProps(node) {
  if (!has(node.props, "id"))
    node.props.id = `input_${idCount++}`;
  return node;
}
function createProps(initial) {
  const props2 = {
    initial: typeof initial === "object" ? cloneAny(initial) : initial
  };
  let node;
  let isEmitting = true;
  return new Proxy(props2, {
    get(...args) {
      const [_t, prop] = args;
      if (has(props2, prop))
        return Reflect.get(...args);
      if (node && typeof prop === "string" && node.config[prop] !== void 0)
        return node.config[prop];
      return void 0;
    },
    set(target, property, originalValue, receiver) {
      if (property === "_n") {
        node = originalValue;
        return true;
      }
      if (property === "_emit") {
        isEmitting = originalValue;
        return true;
      }
      const { prop, value } = node.hook.prop.dispatch({
        prop: property,
        value: originalValue
      });
      if (!eq(props2[prop], value, false) || typeof value === "object") {
        const didSet = Reflect.set(target, prop, value, receiver);
        if (isEmitting) {
          node.emit("prop", { prop, value });
          if (typeof prop === "string")
            node.emit(`prop:${prop}`, value);
        }
        return didSet;
      }
      return true;
    }
  });
}
function findDefinition(node, plugins) {
  if (node.props.definition)
    return node.define(node.props.definition);
  for (const plugin2 of plugins) {
    if (node.props.definition)
      return;
    if (typeof plugin2.library === "function") {
      plugin2.library(node);
    }
  }
}
function createContext(options2) {
  const value = createValue(options2);
  const config = createConfig(options2.config || {}, options2.parent);
  return {
    _d: 0,
    _e: createEmitter(),
    _resolve: false,
    _tmo: false,
    _value: value,
    children: dedupe(options2.children || []),
    config,
    hook: createHooks(),
    isCreated: false,
    isSettled: true,
    ledger: createLedger(),
    name: createName(options2),
    parent: options2.parent || null,
    plugins: /* @__PURE__ */ new Set(),
    props: createProps(value),
    settled: Promise.resolve(value),
    store: createStore(true),
    traps: createTraps(),
    type: options2.type || "input",
    value
  };
}
function nodeInit(node, options2) {
  var _a;
  node.ledger.init(node.store._n = node.props._n = node.config._n = node);
  node.props._emit = false;
  if (options2.props)
    Object.assign(node.props, options2.props);
  node.props._emit = true;
  findDefinition(node, /* @__PURE__ */ new Set([
    ...options2.plugins || [],
    ...node.parent ? node.parent.plugins : []
  ]));
  if (options2.plugins) {
    for (const plugin2 of options2.plugins) {
      use(node, node._c, plugin2, true, false);
    }
  }
  defaultProps(node);
  node.each((child) => node.add(child));
  if (node.parent)
    node.parent.add(node, options2.index);
  if (node.type === "input" && node.children.length)
    error(100, node);
  input(node, node._c, node._value, false);
  node.store.release();
  if ((_a = options2.props) === null || _a === void 0 ? void 0 : _a.id)
    register(node);
  node.emit("created", node);
  node.isCreated = true;
  return node;
}
function createNode(options2) {
  const ops = options2 || {};
  const context = createContext(ops);
  const node = new Proxy(context, {
    get(...args) {
      const [, property] = args;
      if (property === "__FKNode__")
        return true;
      const trap2 = context.traps.get(property);
      if (trap2 && trap2.get)
        return trap2.get(node, context);
      return Reflect.get(...args);
    },
    set(...args) {
      const [, property, value] = args;
      const trap2 = context.traps.get(property);
      if (trap2 && trap2.set)
        return trap2.set(node, context, property, value);
      return Reflect.set(...args);
    }
  });
  return nodeInit(node, ops);
}
function isDOM(node) {
  return typeof node !== "string" && has(node, "$el");
}
function isComponent(node) {
  return typeof node !== "string" && has(node, "$cmp");
}
function isConditional(node) {
  if (!node || typeof node === "string")
    return false;
  return has(node, "if") && has(node, "then");
}
function isSugar(node) {
  return typeof node !== "string" && "$formkit" in node;
}
function sugar(node) {
  if (typeof node === "string") {
    return {
      $el: "text",
      children: node
    };
  }
  if (isSugar(node)) {
    const { $formkit: type, for: iterator, if: condition, children, bind, ...props2 } = node;
    return Object.assign({
      $cmp: "FormKit",
      props: { ...props2, type }
    }, condition ? { if: condition } : {}, iterator ? { for: iterator } : {}, children ? { children } : {}, bind ? { bind } : {});
  }
  return node;
}
function compile(expr) {
  let provideTokens;
  const requirements = /* @__PURE__ */ new Set();
  const x = function expand(operand, tokens) {
    return typeof operand === "function" ? operand(tokens) : operand;
  };
  const operatorRegistry = [
    {
      "&&": (l, r, t) => x(l, t) && x(r, t),
      "||": (l, r, t) => x(l, t) || x(r, t)
    },
    {
      "===": (l, r, t) => !!(x(l, t) === x(r, t)),
      "!==": (l, r, t) => !!(x(l, t) !== x(r, t)),
      "==": (l, r, t) => !!(x(l, t) == x(r, t)),
      "!=": (l, r, t) => !!(x(l, t) != x(r, t)),
      ">=": (l, r, t) => !!(x(l, t) >= x(r, t)),
      "<=": (l, r, t) => !!(x(l, t) <= x(r, t)),
      ">": (l, r, t) => !!(x(l, t) > x(r, t)),
      "<": (l, r, t) => !!(x(l, t) < x(r, t))
    },
    {
      "+": (l, r, t) => x(l, t) + x(r, t),
      "-": (l, r, t) => x(l, t) - x(r, t)
    },
    {
      "*": (l, r, t) => x(l, t) * x(r, t),
      "/": (l, r, t) => x(l, t) / x(r, t),
      "%": (l, r, t) => x(l, t) % x(r, t)
    }
  ];
  const operatorSymbols = operatorRegistry.reduce((s, g) => {
    return s.concat(Object.keys(g));
  }, []);
  const operatorChars = new Set(operatorSymbols.map((key) => key.charAt(0)));
  function getOp(symbols, char, p, expression) {
    const candidates = symbols.filter((s) => s.startsWith(char));
    if (!candidates.length)
      return false;
    return candidates.find((symbol) => {
      if (expression.length >= p + symbol.length) {
        const nextChars = expression.substring(p, p + symbol.length);
        if (nextChars === symbol)
          return symbol;
      }
      return false;
    });
  }
  function getStep(p, expression, direction = 1) {
    let next = direction ? expression.substring(p + 1).trim() : expression.substring(0, p).trim();
    if (!next.length)
      return -1;
    if (!direction) {
      const reversed = next.split("").reverse();
      const start = reversed.findIndex((char2) => operatorChars.has(char2));
      next = reversed.slice(start).join("");
    }
    const char = next[0];
    return operatorRegistry.findIndex((operators) => {
      const symbols = Object.keys(operators);
      return !!getOp(symbols, char, 0, next);
    });
  }
  function getTail(pos, expression) {
    let tail = "";
    const length3 = expression.length;
    let depth = 0;
    for (let p = pos; p < length3; p++) {
      const char = expression.charAt(p);
      if (char === "(") {
        depth++;
      } else if (char === ")") {
        depth--;
      } else if (depth === 0 && char === " ") {
        continue;
      }
      if (depth === 0 && getOp(operatorSymbols, char, p, expression)) {
        return [tail, p - 1];
      } else {
        tail += char;
      }
    }
    return [tail, expression.length - 1];
  }
  function parseLogicals(expression, step = 0) {
    const operators = operatorRegistry[step];
    const length3 = expression.length;
    const symbols = Object.keys(operators);
    let depth = 0;
    let quote = false;
    let op = null;
    let operand = "";
    let left = null;
    let operation;
    let lastChar = "";
    let char = "";
    let parenthetical = "";
    let parenQuote = "";
    let startP = 0;
    const addTo = (depth2, char2) => {
      depth2 ? parenthetical += char2 : operand += char2;
    };
    for (let p = 0; p < length3; p++) {
      lastChar = char;
      char = expression.charAt(p);
      if ((char === "'" || char === '"') && lastChar !== "\\" && (depth === 0 && !quote || depth && !parenQuote)) {
        if (depth) {
          parenQuote = char;
        } else {
          quote = char;
        }
        addTo(depth, char);
        continue;
      } else if (quote && (char !== quote || lastChar === "\\") || parenQuote && (char !== parenQuote || lastChar === "\\")) {
        addTo(depth, char);
        continue;
      } else if (quote === char) {
        quote = false;
        addTo(depth, char);
        continue;
      } else if (parenQuote === char) {
        parenQuote = false;
        addTo(depth, char);
        continue;
      } else if (char === " ") {
        continue;
      } else if (char === "(") {
        if (depth === 0) {
          startP = p;
        } else {
          parenthetical += char;
        }
        depth++;
      } else if (char === ")") {
        depth--;
        if (depth === 0) {
          const fn = typeof operand === "string" && operand.startsWith("$") ? operand : void 0;
          const hasTail = fn && expression.charAt(p + 1) === ".";
          let tail = "";
          if (hasTail) {
            [tail, p] = getTail(p + 2, expression);
          }
          const lStep = op ? step : getStep(startP, expression, 0);
          const rStep = getStep(p, expression);
          if (lStep === -1 && rStep === -1) {
            operand = evaluate(parenthetical, -1, fn, tail);
          } else if (op && (lStep >= rStep || rStep === -1) && step === lStep) {
            left = op.bind(null, evaluate(parenthetical, -1, fn, tail));
            op = null;
            operand = "";
          } else if (rStep > lStep && step === rStep) {
            operand = evaluate(parenthetical, -1, fn, tail);
          } else {
            operand += `(${parenthetical})${hasTail ? `.${tail}` : ""}`;
          }
          parenthetical = "";
        } else {
          parenthetical += char;
        }
      } else if (depth === 0 && (operation = getOp(symbols, char, p, expression))) {
        if (p === 0) {
          error(103, [operation, expression]);
        }
        p += operation.length - 1;
        if (p === expression.length - 1) {
          error(104, [operation, expression]);
        }
        if (!op) {
          if (left) {
            op = operators[operation].bind(null, evaluate(left, step));
            left = null;
          } else {
            op = operators[operation].bind(null, evaluate(operand, step));
            operand = "";
          }
        } else if (operand) {
          left = op.bind(null, evaluate(operand, step));
          op = operators[operation].bind(null, left);
          operand = "";
        }
        continue;
      } else {
        addTo(depth, char);
      }
    }
    if (operand && op) {
      op = op.bind(null, evaluate(operand, step));
    }
    op = !op && left ? left : op;
    if (!op && operand) {
      op = (v, t) => {
        return typeof v === "function" ? v(t) : v;
      };
      op = op.bind(null, evaluate(operand, step));
    }
    if (!op && !operand) {
      error(105, expression);
    }
    return op;
  }
  function evaluate(operand, step, fnToken, tail) {
    if (fnToken) {
      const fn = evaluate(fnToken, operatorRegistry.length);
      let userFuncReturn;
      let tailCall = tail ? compile(`$${tail}`) : false;
      if (typeof fn === "function") {
        const args = parseArgs(String(operand)).map((arg) => evaluate(arg, -1));
        return (tokens) => {
          const userFunc = fn(tokens);
          if (typeof userFunc !== "function") {
            warn(150, fnToken);
            return userFunc;
          }
          userFuncReturn = userFunc(...args.map((arg) => typeof arg === "function" ? arg(tokens) : arg));
          if (tailCall) {
            tailCall = tailCall.provide((subTokens) => {
              const rootTokens = provideTokens(subTokens);
              const t = subTokens.reduce((tokenSet, token2) => {
                const isTail = token2 === tail || (tail === null || tail === void 0 ? void 0 : tail.startsWith(`${token2}(`));
                if (isTail) {
                  const value = getAt(userFuncReturn, token2);
                  tokenSet[token2] = () => value;
                } else {
                  tokenSet[token2] = rootTokens[token2];
                }
                return tokenSet;
              }, {});
              return t;
            });
          }
          return tailCall ? tailCall() : userFuncReturn;
        };
      }
    } else if (typeof operand === "string") {
      if (operand === "true")
        return true;
      if (operand === "false")
        return false;
      if (operand === "undefined")
        return void 0;
      if (isQuotedString(operand))
        return rmEscapes(operand.substring(1, operand.length - 1));
      if (!isNaN(+operand))
        return Number(operand);
      if (step < operatorRegistry.length - 1) {
        return parseLogicals(operand, step + 1);
      } else {
        if (operand.startsWith("$")) {
          const cleaned = operand.substring(1);
          requirements.add(cleaned);
          return function getToken(tokens) {
            return cleaned in tokens ? tokens[cleaned]() : void 0;
          };
        }
        return operand;
      }
    }
    return operand;
  }
  const compiled = parseLogicals(expr.startsWith("$:") ? expr.substring(2) : expr);
  const reqs = Array.from(requirements);
  function provide2(callback) {
    provideTokens = callback;
    return Object.assign(compiled.bind(null, callback(reqs)), {
      provide: provide2
    });
  }
  return Object.assign(compiled, {
    provide: provide2
  });
}
function createClasses(propertyKey, node, sectionClassList) {
  if (!sectionClassList)
    return {};
  if (typeof sectionClassList === "string") {
    const classKeys = sectionClassList.split(" ");
    return classKeys.reduce((obj, key) => Object.assign(obj, { [key]: true }), {});
  } else if (typeof sectionClassList === "function") {
    return createClasses(propertyKey, node, sectionClassList(node, propertyKey));
  }
  return sectionClassList;
}
function generateClassList(node, property, ...args) {
  const combinedClassList = args.reduce((finalClassList, currentClassList) => {
    if (!currentClassList)
      return finalClassList;
    const { $reset, ...classList } = currentClassList;
    if ($reset) {
      return classList;
    }
    return Object.assign(finalClassList, classList);
  }, {});
  return Object.keys(node.hook.classes.dispatch({ property, classes: combinedClassList }).classes).filter((key) => combinedClassList[key]).join(" ") || null;
}
function setErrors(id2, localErrors, childErrors) {
  const node = getNode$1(id2);
  if (node) {
    node.setErrors(localErrors, childErrors);
  } else {
    warn(651, id2);
  }
}
function clearErrors(id2, clearChildren = true) {
  const node = getNode$1(id2);
  if (node) {
    node.clearErrors(clearChildren);
  } else {
    warn(652, id2);
  }
}
var FORMKIT_VERSION = "1.0.0-beta.12";

// node_modules/@formkit/inputs/dist/index.mjs
function createLibraryPlugin(...libraries) {
  const library = libraries.reduce((merged, lib) => extend(merged, lib), {});
  const plugin2 = () => {
  };
  plugin2.library = function(node) {
    const type = camel(node.props.type);
    if (has(library, type)) {
      node.define(library[type]);
    }
  };
  return plugin2;
}
function normalizeOptions(options2) {
  let i2 = 1;
  if (Array.isArray(options2)) {
    return options2.map((option2) => {
      if (typeof option2 === "string" || typeof option2 === "number") {
        return {
          label: String(option2),
          value: String(option2)
        };
      }
      if (typeof option2 == "object") {
        if ("value" in option2 && typeof option2.value !== "string") {
          Object.assign(option2, {
            value: `__mask_${i2++}`,
            __original: option2.value
          });
        }
      }
      return option2;
    });
  }
  return Object.keys(options2).map((value) => {
    return {
      label: options2[value],
      value
    };
  });
}
function optionValue(options2, value) {
  if (Array.isArray(options2)) {
    for (const option2 of options2) {
      if (value == option2.value) {
        return "__original" in option2 ? option2.__original : option2.value;
      }
    }
  }
  return value;
}
function shouldSelect(valueA, valueB) {
  if (valueA == valueB)
    return true;
  if (isPojo(valueA) && isPojo(valueB))
    return eq(valueA, valueB);
  return false;
}
function options(node) {
  node.hook.prop((prop, next) => {
    if (prop.prop === "options") {
      if (typeof prop.value === "function") {
        node.props.optionsLoader = prop.value;
        prop.value = [];
      } else {
        prop.value = normalizeOptions(prop.value);
      }
    }
    return next(prop);
  });
}
var outer = createSection("outer", () => ({
  $el: "div",
  attrs: {
    key: "$id",
    "data-family": "$family || undefined",
    "data-type": "$type",
    "data-multiple": '$attrs.multiple || ($type != "select" && $options != undefined) || undefined',
    "data-disabled": "$disabled || undefined",
    "data-complete": "$state.complete || undefined",
    "data-invalid": "$state.valid === false && $state.validationVisible || undefined",
    "data-errors": "$state.errors || undefined",
    "data-submitted": "$state.submitted || undefined",
    "data-prefix-icon": "$_rawPrefixIcon !== undefined || undefined",
    "data-suffix-icon": "$_rawSuffixIcon !== undefined || undefined",
    "data-prefix-icon-click": "$onPrefixIconClick !== undefined || undefined",
    "data-suffix-icon-click": "$onSuffixIconClick !== undefined || undefined"
  }
}), true);
var inner = createSection("inner", "div");
var wrapper = createSection("wrapper", "div");
var label = createSection("label", () => ({
  $el: "label",
  if: "$label",
  attrs: {
    for: "$id"
  }
}));
var messages = createSection("messages", () => ({
  $el: "ul",
  if: "$fns.length($messages)"
}));
var message = createSection("message", () => ({
  $el: "li",
  for: ["message", "$messages"],
  attrs: {
    key: "$message.key",
    id: `$id + '-' + $message.key`,
    "data-message-type": "$message.type"
  }
}));
var prefix = createSection("prefix", null);
var suffix = createSection("suffix", null);
var help = createSection("help", () => ({
  $el: "div",
  if: "$help",
  attrs: {
    id: '$: "help-" + $id'
  }
}));
var fieldset = createSection("fieldset", () => ({
  $el: "fieldset",
  attrs: {
    id: "$id",
    "aria-describedby": {
      if: "$help",
      then: '$: "help-" + $id',
      else: void 0
    }
  }
}));
var decorator = createSection("decorator", () => ({
  $el: "span",
  attrs: {
    "aria-hidden": "true"
  }
}));
var box = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "$type",
    name: "$node.props.altName || $node.name",
    disabled: "$option.attrs.disabled || $disabled",
    onInput: "$handlers.toggleChecked",
    checked: "$fns.eq($_value, $onValue)",
    onBlur: "$handlers.blur",
    value: "$: true",
    id: "$id",
    "aria-describedby": {
      if: "$options.length",
      then: {
        if: "$option.help",
        then: '$: "help-" + $option.attrs.id',
        else: void 0
      },
      else: {
        if: "$help",
        then: '$: "help-" + $id',
        else: void 0
      }
    }
  }
}));
var legend = createSection("legend", () => ({
  $el: "legend",
  if: "$label"
}));
var boxOption = createSection("option", () => ({
  $el: "li",
  for: ["option", "$options"],
  attrs: {
    "data-disabled": "$option.attrs.disabled || $disabled"
  }
}));
var boxOptions = createSection("options", "ul");
var boxWrapper = createSection("wrapper", () => ({
  $el: "label",
  attrs: {
    "data-disabled": {
      if: "$options.length",
      then: void 0,
      else: "$disabled || undefined"
    }
  }
}));
var boxHelp = createSection("optionHelp", () => ({
  $el: "div",
  if: "$option.help",
  attrs: {
    id: '$: "help-" + $option.attrs.id'
  }
}));
var boxLabel = createSection("label", "span");
var buttonInput = createSection("input", () => ({
  $el: "button",
  bind: "$attrs",
  attrs: {
    type: "$type",
    disabled: "$disabled",
    name: "$node.name",
    id: "$id"
  }
}));
var buttonLabel = createSection("default", null);
var fileInput = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "file",
    disabled: "$disabled",
    name: "$node.name",
    onChange: "$handlers.files",
    onBlur: "$handlers.blur",
    id: "$id",
    "aria-describedby": "$describedBy"
  }
}));
var fileItem = createSection("fileItem", () => ({
  $el: "li",
  for: ["file", "$value"]
}));
var fileList = createSection("fileList", () => ({
  $el: "ul",
  if: "$value.length",
  attrs: {
    "data-has-multiple": {
      if: "$value.length > 1",
      then: "true"
    }
  }
}));
var fileName = createSection("fileName", () => ({
  $el: "span",
  attrs: {
    class: "$classes.fileName"
  }
}));
var fileRemove = createSection("fileRemove", () => ({
  $el: "button",
  attrs: {
    onClick: "$handlers.resetFiles"
  }
}));
var noFiles = createSection("noFiles", () => ({
  $el: "span",
  if: "$value.length == 0"
}));
var formInput = createSection("form", () => ({
  $el: "form",
  bind: "$attrs",
  attrs: {
    id: "$id",
    name: "$node.name",
    onSubmit: "$handlers.submit",
    "data-loading": "$state.loading || undefined"
  }
}), true);
var actions = createSection("actions", () => ({
  $el: "div",
  if: "$actions"
}));
var submitInput = createSection("submit", () => ({
  $cmp: "FormKit",
  bind: "$submitAttrs",
  props: {
    ignore: true,
    type: "submit",
    disabled: "$disabled",
    label: "$submitLabel"
  }
}));
var textInput = createSection("input", () => ({
  $el: "input",
  bind: "$attrs",
  attrs: {
    type: "$type",
    disabled: "$disabled",
    name: "$node.name",
    onInput: "$handlers.DOMInput",
    onBlur: "$handlers.blur",
    value: "$_value",
    id: "$id",
    "aria-describedby": "$describedBy"
  }
}));
var fragment = createSection("wrapper", null, true);
var selectInput$1 = createSection("input", () => ({
  $el: "select",
  bind: "$attrs",
  attrs: {
    id: "$id",
    "data-placeholder": "$fns.showPlaceholder($_value, $placeholder)",
    disabled: "$disabled",
    class: "$classes.input",
    name: "$node.name",
    onChange: "$handlers.onChange",
    onInput: "$handlers.selectInput",
    onBlur: "$handlers.blur",
    "aria-describedby": "$describedBy"
  }
}));
var option = createSection("option", () => ({
  $el: "option",
  for: ["option", "$options"],
  bind: "$option.attrs",
  attrs: {
    class: "$classes.option",
    value: "$option.value",
    selected: "$fns.isSelected($option)"
  }
}));
var optionSlot = () => ({
  $el: null,
  if: "$options.length",
  for: ["option", "$options"],
  children: "$slots.option"
});
var textareaInput = createSection("input", () => ({
  $el: "textarea",
  bind: "$attrs",
  attrs: {
    disabled: "$disabled",
    name: "$node.name",
    onInput: "$handlers.DOMInput",
    onBlur: "$handlers.blur",
    value: "$_value",
    id: "$id",
    "aria-describedby": "$describedBy"
  },
  children: "$initialValue"
}));
var icon = (sectionKey, el2) => {
  return createSection(`${sectionKey}Icon`, () => {
    const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}Icon`;
    return {
      if: `$${sectionKey}Icon && $${rawIconProp}`,
      $el: `${el2 ? el2 : "span"}`,
      attrs: {
        class: `$classes.${sectionKey}Icon + " formkit-icon"`,
        innerHTML: `$${rawIconProp}`,
        onClick: `$handlers.iconClick(${sectionKey})`,
        for: {
          if: `${el2 === "label"}`,
          then: "$id"
        }
      }
    };
  })();
};
function normalizeBoxes(node) {
  return function(prop, next) {
    if (prop.prop === "options" && Array.isArray(prop.value)) {
      prop.value = prop.value.map((option2) => {
        var _a;
        if (!((_a = option2.attrs) === null || _a === void 0 ? void 0 : _a.id)) {
          return extend(option2, {
            attrs: { id: `${node.name}-option-${kebab(String(option2.value))}` }
          });
        }
        return option2;
      });
      if (node.props.type === "checkbox" && !Array.isArray(node.value)) {
        if (node.isCreated) {
          node.input([], false);
        } else {
          node.on("created", () => {
            if (!Array.isArray(node.value)) {
              node.input([], false);
            }
          });
        }
      }
    }
    return next(prop);
  };
}
function toggleChecked$1(node, e) {
  const el2 = e.target;
  if (el2 instanceof HTMLInputElement) {
    const value = Array.isArray(node.props.options) ? optionValue(node.props.options, el2.value) : el2.value;
    if (Array.isArray(node.props.options) && node.props.options.length) {
      if (!Array.isArray(node._value)) {
        node.input([value]);
      } else if (!node._value.some((existingValue) => shouldSelect(value, existingValue))) {
        node.input([...node._value, value]);
      } else {
        node.input(node._value.filter((existingValue) => !shouldSelect(value, existingValue)));
      }
    } else {
      if (el2.checked) {
        node.input(node.props.onValue);
      } else {
        node.input(node.props.offValue);
      }
    }
  }
}
function isChecked$1(node, value) {
  var _a, _b;
  (_a = node.context) === null || _a === void 0 ? void 0 : _a.value;
  (_b = node.context) === null || _b === void 0 ? void 0 : _b._value;
  if (Array.isArray(node._value)) {
    return node._value.some((existingValue) => shouldSelect(optionValue(node.props.options, value), existingValue));
  }
  return false;
}
function checkboxes(node) {
  node.on("created", () => {
    var _a, _b;
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.toggleChecked = toggleChecked$1.bind(null, node);
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.fns) {
      node.context.fns.isChecked = isChecked$1.bind(null, node);
    }
    if (!has(node.props, "onValue"))
      node.props.onValue = true;
    if (!has(node.props, "offValue"))
      node.props.offValue = false;
  });
  node.hook.prop(normalizeBoxes(node));
}
function disables(node) {
  node.on("created", () => {
    node.props.disabled = undefine(node.props.disabled);
  });
  node.hook.prop(({ prop, value }, next) => {
    value = prop === "disabled" ? undefine(value) : value;
    return next({ prop, value });
  });
  node.on("prop:disabled", ({ payload: value }) => {
    node.config.disabled = undefine(value);
  });
  node.on("created", () => {
    node.config.disabled = undefine(node.props.disabled);
  });
}
function localize(key, value) {
  return (node) => {
    node.store.set(createMessage({
      key,
      type: "ui",
      value: value || key,
      meta: {
        localize: true,
        i18nArgs: [node]
      }
    }));
  };
}
var isBrowser = typeof window !== "undefined";
function removeHover(e) {
  if (e.target instanceof HTMLElement && e.target.hasAttribute("data-file-hover")) {
    e.target.removeAttribute("data-file-hover");
  }
}
function preventStrayDrop(type, e) {
  if (!(e.target instanceof HTMLInputElement)) {
    e.preventDefault();
  } else if (type === "dragover") {
    e.target.setAttribute("data-file-hover", "true");
  }
  if (type === "drop") {
    removeHover(e);
  }
}
function files(node) {
  localize("noFiles", "Select file")(node);
  localize("removeAll", "Remove all")(node);
  localize("remove")(node);
  if (isBrowser) {
    if (!window._FormKit_File_Drop) {
      window.addEventListener("dragover", preventStrayDrop.bind(null, "dragover"));
      window.addEventListener("drop", preventStrayDrop.bind(null, "drop"));
      window.addEventListener("dragleave", removeHover);
      window._FormKit_File_Drop = true;
    }
  }
  node.hook.input((value, next) => next(Array.isArray(value) ? value : []));
  node.on("created", () => {
    if (!Array.isArray(node.value))
      node.input([], false);
    if (!node.context)
      return;
    node.context.handlers.resetFiles = (e) => {
      e.preventDefault();
      node.input([]);
      if (node.props.id && isBrowser) {
        const el2 = document.getElementById(node.props.id);
        if (el2)
          el2.value = "";
      }
    };
    node.context.handlers.files = (e) => {
      var _a, _b;
      const files2 = [];
      if (e.target instanceof HTMLInputElement && e.target.files) {
        for (let i2 = 0; i2 < e.target.files.length; i2++) {
          let file2;
          if (file2 = e.target.files.item(i2)) {
            files2.push({ name: file2.name, file: file2 });
          }
        }
        node.input(files2);
      }
      if (node.context)
        node.context.files = files2;
      if (typeof ((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.onChange) === "function") {
        (_b = node.props.attrs) === null || _b === void 0 ? void 0 : _b.onChange(e);
      }
    };
  });
}
async function handleSubmit(node, submitEvent) {
  submitEvent.preventDefault();
  await node.settled;
  node.walk((n) => {
    n.store.set(createMessage({
      key: "submitted",
      value: true,
      visible: false
    }));
  });
  if (typeof node.props.onSubmitRaw === "function") {
    node.props.onSubmitRaw(submitEvent, node);
  }
  if (node.ledger.value("blocking")) {
    if (typeof node.props.onSubmitInvalid === "function") {
      node.props.onSubmitInvalid(node);
    }
    if (node.props.incompleteMessage !== false) {
      node.store.set(createMessage({
        blocking: false,
        key: `incomplete`,
        meta: {
          localize: node.props.incompleteMessage === void 0,
          i18nArgs: [{ node }],
          showAsMessage: true
        },
        type: "ui",
        value: node.props.incompleteMessage || "Form incomplete."
      }));
    }
  } else {
    if (typeof node.props.onSubmit === "function") {
      const retVal = node.props.onSubmit(node.hook.submit.dispatch(clone(node.value)), node);
      if (retVal instanceof Promise) {
        const autoDisable = node.props.disabled === void 0 && node.props.submitBehavior !== "live";
        if (autoDisable)
          node.props.disabled = true;
        node.store.set(createMessage({
          key: "loading",
          value: true,
          visible: false
        }));
        await retVal;
        if (autoDisable)
          node.props.disabled = false;
        node.store.remove("loading");
      }
    } else {
      if (submitEvent.target instanceof HTMLFormElement) {
        submitEvent.target.submit();
      }
    }
  }
}
function form$1(node) {
  node.props.isForm = true;
  node.on("created", () => {
    var _a;
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.submit = handleSubmit.bind(null, node);
    }
    if (!has(node.props, "actions")) {
      node.props.actions = true;
    }
  });
  node.on("settled:blocking", () => node.store.remove("incomplete"));
}
function ignore(node) {
  if (node.props.ignore === void 0) {
    node.props.ignore = true;
    node.parent = null;
  }
}
function initialValue(node) {
  node.on("created", () => {
    if (node.context) {
      node.context.initialValue = node.value || "";
    }
  });
}
function toggleChecked(node, event) {
  if (event.target instanceof HTMLInputElement) {
    node.input(optionValue(node.props.options, event.target.value));
  }
}
function isChecked(node, value) {
  var _a, _b;
  (_a = node.context) === null || _a === void 0 ? void 0 : _a.value;
  (_b = node.context) === null || _b === void 0 ? void 0 : _b._value;
  return shouldSelect(optionValue(node.props.options, value), node._value);
}
function radios(node) {
  node.on("created", () => {
    var _a, _b;
    if (!Array.isArray(node.props.options)) {
      warn(350, node);
    }
    if ((_a = node.context) === null || _a === void 0 ? void 0 : _a.handlers) {
      node.context.handlers.toggleChecked = toggleChecked.bind(null, node);
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.fns) {
      node.context.fns.isChecked = isChecked.bind(null, node);
    }
  });
  node.hook.prop(normalizeBoxes(node));
}
function isSelected(node, option2) {
  node.context && node.context.value;
  const optionValue2 = "__original" in option2 ? option2.__original : option2.value;
  function hasNoNullOption() {
    return !node.props.options.some((option3) => ("__original" in option3 ? option3.__original : option3.value) === null);
  }
  return Array.isArray(node._value) ? node._value.some((optionA) => shouldSelect(optionA, optionValue2)) : (node._value === void 0 || node._value === null && hasNoNullOption()) && option2.attrs && option2.attrs["data-is-placeholder"] ? true : shouldSelect(optionValue2, node._value);
}
async function deferChange(node, e) {
  var _a;
  if (typeof ((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.onChange) === "function") {
    await new Promise((r) => setTimeout(r, 0));
    await node.settled;
    node.props.attrs.onChange(e);
  }
}
function selectInput(node, e) {
  const target = e.target;
  const value = target.hasAttribute("multiple") ? Array.from(target.selectedOptions).map((o) => optionValue(node.props.options, o.value)) : optionValue(node.props.options, target.value);
  node.input(value);
}
function applyPlaceholder(options2, placeholder) {
  if (!options2.some((option2) => option2.attrs && option2.attrs["data-is-placeholder"])) {
    return [
      {
        label: placeholder,
        value: "",
        attrs: {
          hidden: true,
          disabled: true,
          "data-is-placeholder": "true"
        }
      },
      ...options2
    ];
  }
  return options2;
}
function select$1(node) {
  node.on("created", () => {
    var _a, _b, _c;
    const isMultiple = undefine((_a = node.props.attrs) === null || _a === void 0 ? void 0 : _a.multiple);
    if (!isMultiple && node.props.placeholder && Array.isArray(node.props.options)) {
      node.hook.prop(({ prop, value }, next) => {
        if (prop === "options") {
          value = applyPlaceholder(value, node.props.placeholder);
        }
        return next({ prop, value });
      });
      node.props.options = applyPlaceholder(node.props.options, node.props.placeholder);
    }
    if (isMultiple) {
      if (node.value === void 0) {
        node.input([], false);
      }
    } else if (node.context && !node.context.options) {
      node.props.attrs = Object.assign({}, node.props.attrs, {
        value: node._value
      });
      node.on("input", ({ payload }) => {
        node.props.attrs = Object.assign({}, node.props.attrs, {
          value: payload
        });
      });
    }
    if ((_b = node.context) === null || _b === void 0 ? void 0 : _b.handlers) {
      node.context.handlers.selectInput = selectInput.bind(null, node);
      node.context.handlers.onChange = deferChange.bind(null, node);
    }
    if ((_c = node.context) === null || _c === void 0 ? void 0 : _c.fns) {
      node.context.fns.isSelected = isSelected.bind(null, node);
      node.context.fns.showPlaceholder = (value, placeholder) => {
        if (!Array.isArray(node.props.options))
          return false;
        const hasMatchingValue = node.props.options.some((option2) => {
          if (option2.attrs && "data-is-placeholder" in option2.attrs)
            return false;
          const optionValue2 = "__original" in option2 ? option2.__original : option2.value;
          return eq(value, optionValue2);
        });
        return placeholder && !hasMatchingValue ? true : void 0;
      };
    }
  });
  node.hook.input((value, next) => {
    var _a, _b, _c;
    if (!node.props.placeholder && value === void 0 && Array.isArray((_a = node.props) === null || _a === void 0 ? void 0 : _a.options) && node.props.options.length && !undefine((_c = (_b = node.props) === null || _b === void 0 ? void 0 : _b.attrs) === null || _c === void 0 ? void 0 : _c.multiple)) {
      value = "__original" in node.props.options[0] ? node.props.options[0].__original : node.props.options[0].value;
    }
    return next(value);
  });
}
function defaultIcon(sectionKey, defaultIcon2) {
  return (node) => {
    if (node.props[`${sectionKey}Icon`] === void 0) {
      node.props[`${sectionKey}Icon`] = `default:${defaultIcon2}`;
    }
  };
}
function isSchemaObject(schema) {
  return typeof schema === "object" && ("$el" in schema || "$cmp" in schema || "$formkit" in schema);
}
function isSlotCondition(node) {
  if (isConditional(node) && node.if && node.if.startsWith("$slots.") && typeof node.then === "string" && node.then.startsWith("$slots.") && "else" in node) {
    return true;
  }
  return false;
}
function extendSchema(schema, extension = {}) {
  if (typeof schema === "string") {
    return isSchemaObject(extension) || typeof extension === "string" ? extension : schema;
  } else if (Array.isArray(schema)) {
    return isSchemaObject(extension) ? extension : schema;
  }
  return extend(schema, extension);
}
function useSchema(inputSection) {
  return outer(wrapper(label("$label"), inner(prefix(), inputSection(), suffix())), help("$help"), messages(message("$message.value")));
}
function createSection(section, el2, root = false) {
  return (...children) => {
    const extendable = (extensions) => {
      const node = !el2 || typeof el2 === "string" ? { $el: el2 } : el2();
      if (isDOM(node) || isComponent(node)) {
        if (!node.meta) {
          node.meta = { section };
        }
        if (children.length && !node.children) {
          node.children = [
            ...children.map((child) => typeof child === "string" ? child : child(extensions))
          ];
        }
        if (isDOM(node)) {
          node.attrs = {
            class: `$classes.${section}`,
            ...node.attrs || {}
          };
        }
      }
      return {
        if: `$slots.${section}`,
        then: `$slots.${section}`,
        else: section in extensions ? extendSchema(node, extensions[section]) : node
      };
    };
    return root ? createRoot(extendable) : extendable;
  };
}
function createRoot(rootSection) {
  return (extensions) => {
    return [rootSection(extensions)];
  };
}
function $if(condition, then, otherwise) {
  return (extensions) => {
    const node = then(extensions);
    if (otherwise || isSchemaObject(node) && "if" in node || isSlotCondition(node)) {
      const conditionalNode = {
        if: condition,
        then: node
      };
      if (otherwise) {
        conditionalNode.else = otherwise(extensions);
      }
      return conditionalNode;
    } else if (isSlotCondition(node)) {
      Object.assign(node.else, { if: condition });
    } else if (isSchemaObject(node)) {
      Object.assign(node, { if: condition });
    }
    return node;
  };
}
function $extend(section, extendWith) {
  return (extensions) => {
    const node = section({});
    if (isSlotCondition(node)) {
      if (Array.isArray(node.else))
        return node;
      node.else = extendSchema(extendSchema(node.else, extendWith), extensions);
      return node;
    }
    return extendSchema(extendSchema(node, extendWith), extensions);
  };
}
function $root(section) {
  return createRoot(section);
}
var button = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(messages(message("$message.value")), wrapper(buttonInput(icon("prefix"), prefix(), buttonLabel("$label || $ui.submit.value"), suffix(), icon("suffix"))), help("$help")),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "button",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [localize("submit"), ignore]
};
var checkbox = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      "$options == undefined",
      /**
       * Single checkbox structure.
       */
      boxWrapper(inner(prefix(), box(), decorator(icon("decorator")), suffix()), $extend(boxLabel("$label"), {
        if: "$label"
      })),
      /**
       * Multi checkbox structure.
       */
      fieldset(legend("$label"), help("$help"), boxOptions(boxOption(boxWrapper(inner(prefix(), $extend(box(), {
        bind: "$option.attrs",
        attrs: {
          id: "$option.attrs.id",
          value: "$option.value",
          checked: "$fns.isChecked($option.value)"
        }
      }), decorator(icon("decorator")), suffix()), $extend(boxLabel("$option.label"), {
        if: "$option.label"
      })), boxHelp("$option.help"))))
    ),
    // Help text only goes under the input when it is a single.
    $if("$options == undefined && $help", help("$help")),
    messages(message("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "box",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "onValue", "offValue", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [
    options,
    checkboxes,
    defaultIcon("decorator", "checkboxDecorator")
  ]
};
var file = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), fileInput(), fileList(fileItem(icon("fileItem"), fileName("$file.name"), $if("$value.length === 1", fileRemove(icon("fileRemove"), "$ui.remove.value")))), $if("$value.length > 1", fileRemove("$ui.removeAll.value")), noFiles(icon("noFiles"), "$ui.noFiles.value"), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [
    files,
    defaultIcon("fileItem", "fileItem"),
    defaultIcon("fileRemove", "fileRemove"),
    defaultIcon("noFiles", "noFiles")
  ]
};
var form = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: formInput("$slots.default", messages(message("$message.value")), actions(submitInput())),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "group",
  /**
   * An array of extra props to accept for this input.
   */
  props: [
    "actions",
    "submit",
    "submitLabel",
    "submitAttrs",
    "submitBehavior",
    "incompleteMessage"
  ],
  /**
   * Additional features that should be added to your input
   */
  features: [form$1, disables]
};
var group = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: fragment("$slots.default"),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "group",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [disables]
};
var hidden = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: $root(textInput()),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: []
};
var list = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: fragment("$slots.default"),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "list",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [disables]
};
var radio = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(
    $if(
      "$options == undefined",
      /**
       * Single radio structure.
       */
      boxWrapper(inner(prefix(), box(), decorator(icon("decorator")), suffix()), $if("$label", boxLabel("$label"))),
      /**
       * Multi radio structure.
       */
      fieldset(legend("$label"), help("$help"), boxOptions(boxOption(boxWrapper(inner(prefix(), $extend(box(), {
        bind: "$option.attrs",
        attrs: {
          id: "$option.attrs.id",
          value: "$option.value",
          checked: "$fns.isChecked($option.value)"
        }
      }), decorator(icon("decorator")), suffix()), $if("$option.label", boxLabel("$option.label"))), boxHelp("$option.help"))))
    ),
    // Help text only goes under the input when it is a single.
    $if("$options === undefined && $help", help("$help")),
    messages(message("$message.value"))
  ),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "box",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "onValue", "offValue", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [options, radios, defaultIcon("decorator", "radioDecorator")]
};
var select2 = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix"), prefix(), selectInput$1($if("$slots.default", () => "$slots.default", $if("$slots.option", optionSlot, option("$option.label")))), $if("$attrs.multiple !== undefined", () => "", icon("select")), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: ["options", "placeholder", "optionsLoader"],
  /**
   * Additional features that should be added to your input
   */
  features: [options, select$1, defaultIcon("select", "select")]
};
var textarea = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), textareaInput(), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: [initialValue]
};
var text2 = {
  /**
   * The actual schema of the input, or a function that returns the schema.
   */
  schema: outer(wrapper(label("$label"), inner(icon("prefix", "label"), prefix(), textInput(), suffix(), icon("suffix"))), help("$help"), messages(message("$message.value"))),
  /**
   * The type of node, can be a list, group, or input.
   */
  type: "input",
  /**
   * The family of inputs this one belongs too. For example "text" and "email"
   * are both part of the "text" family. This is primary used for styling.
   */
  family: "text",
  /**
   * An array of extra props to accept for this input.
   */
  props: [],
  /**
   * Additional features that should be added to your input
   */
  features: []
};
var index = Object.freeze({
  __proto__: null,
  button,
  submit: button,
  checkbox,
  file,
  form,
  group,
  hidden,
  list,
  radio,
  select: select2,
  textarea,
  text: text2,
  color: text2,
  date: text2,
  datetimeLocal: text2,
  email: text2,
  month: text2,
  number: text2,
  password: text2,
  search: text2,
  tel: text2,
  time: text2,
  url: text2,
  week: text2,
  range: text2
});

// node_modules/@formkit/rules/dist/index.mjs
var dist_exports = {};
__export(dist_exports, {
  accepted: () => accepted,
  alpha: () => alpha,
  alpha_spaces: () => alpha_spaces,
  alphanumeric: () => alphanumeric,
  between: () => between,
  confirm: () => confirm,
  date_after: () => date_after,
  date_before: () => date_before,
  date_between: () => date_between,
  date_format: () => date_format,
  email: () => email,
  ends_with: () => ends_with,
  is: () => is,
  length: () => length,
  matches: () => matches,
  max: () => max,
  min: () => min,
  not: () => not,
  number: () => number,
  required: () => required,
  starts_with: () => starts_with,
  url: () => url
});
var accepted = function accepted2({ value }) {
  return ["yes", "on", "1", 1, true, "true"].includes(value);
};
accepted.skipEmpty = false;
var date_after = function({ value }, compare = false) {
  const timestamp = Date.parse(compare || /* @__PURE__ */ new Date());
  const fieldValue = Date.parse(String(value));
  return isNaN(fieldValue) ? false : fieldValue > timestamp;
};
var alpha = function({ value }, set = "default") {
  const sets = {
    default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćČčĎďĘęĚěŁłŃńŇňŘřŚśŠšŤťŮůŹźŻŽžż]+$/,
    latin: /^[a-zA-Z]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var alpha_spaces = function({ value }, set = "default") {
  const sets = {
    default: /^[a-zA-ZÀ-ÖØ-öø-ÿĄąĆćČčĎďĘęĚěŁłŃńŇňŘřŚśŠšŤťŮůŹźŻŽžż ]+$/,
    latin: /^[a-zA-Z ]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var alphanumeric = function({ value }, set = "default") {
  const sets = {
    default: /^[a-zA-Z0-9À-ÖØ-öø-ÿĄąĆćĘęŁłŃńŚśŹźŻż]+$/,
    latin: /^[a-zA-Z0-9]+$/
  };
  const selectedSet = has(sets, set) ? set : "default";
  return sets[selectedSet].test(String(value));
};
var date_before = function({ value }, compare = false) {
  const timestamp = Date.parse(compare || /* @__PURE__ */ new Date());
  const fieldValue = Date.parse(String(value));
  return isNaN(fieldValue) ? false : fieldValue < timestamp;
};
var between = function between2({ value }, from, to) {
  if (!isNaN(value) && !isNaN(from) && !isNaN(to)) {
    const val = 1 * value;
    from = Number(from);
    to = Number(to);
    const [a, b] = from <= to ? [from, to] : [to, from];
    return val >= 1 * a && val <= 1 * b;
  }
  return false;
};
var hasConfirm = /(_confirm(?:ed)?)$/;
var confirm = function confirm2(node, address, comparison = "loose") {
  var _a;
  if (!address) {
    address = hasConfirm.test(node.name) ? node.name.replace(hasConfirm, "") : `${node.name}_confirm`;
  }
  const foreignValue = (_a = node.at(address)) === null || _a === void 0 ? void 0 : _a.value;
  return comparison === "strict" ? node.value === foreignValue : node.value == foreignValue;
};
var date_between = function date_between2({ value }, dateA, dateB) {
  dateA = dateA instanceof Date ? dateA.getTime() : Date.parse(dateA);
  dateB = dateB instanceof Date ? dateB.getTime() : Date.parse(dateB);
  const compareTo = value instanceof Date ? value.getTime() : Date.parse(String(value));
  if (dateA && !dateB) {
    dateB = dateA;
    dateA = Date.now();
  } else if (!dateA || !compareTo) {
    return false;
  }
  return compareTo >= dateA && compareTo <= dateB;
};
var date_format = function date({ value }, format) {
  if (format && typeof format === "string") {
    return regexForFormat(format).test(String(value));
  }
  return !isNaN(Date.parse(String(value)));
};
var email = function email2({ value }) {
  const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return isEmail.test(String(value));
};
var ends_with = function ends_with2({ value }, ...stack) {
  if (typeof value === "string" && stack.length) {
    return stack.some((item) => {
      return value.endsWith(item);
    });
  } else if (typeof value === "string" && stack.length === 0) {
    return true;
  }
  return false;
};
var is = function is2({ value }, ...stack) {
  return stack.some((item) => {
    if (typeof item === "object") {
      return eq(item, value);
    }
    return item == value;
  });
};
var length = function length2({ value }, first = 0, second = Infinity) {
  first = parseInt(first);
  second = isNaN(parseInt(second)) ? Infinity : parseInt(second);
  const min3 = first <= second ? first : second;
  const max3 = second >= first ? second : first;
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length >= min3 && value.length <= max3;
  } else if (value && typeof value === "object") {
    const length3 = Object.keys(value).length;
    return length3 >= min3 && length3 <= max3;
  }
  return false;
};
var matches = function matches2({ value }, ...stack) {
  return stack.some((pattern) => {
    if (typeof pattern === "string" && pattern.substr(0, 1) === "/" && pattern.substr(-1) === "/") {
      pattern = new RegExp(pattern.substr(1, pattern.length - 2));
    }
    if (pattern instanceof RegExp) {
      return pattern.test(String(value));
    }
    return pattern === value;
  });
};
var max = function max2({ value }, maximum = 10) {
  if (Array.isArray(value)) {
    return value.length <= maximum;
  }
  return Number(value) <= Number(maximum);
};
var min = function min2({ value }, minimum = 1) {
  if (Array.isArray(value)) {
    return value.length >= minimum;
  }
  return Number(value) >= Number(minimum);
};
var not = function not2({ value }, ...stack) {
  return !stack.some((item) => {
    if (typeof item === "object") {
      return eq(item, value);
    }
    return item === value;
  });
};
var number = function number2({ value }) {
  return !isNaN(value);
};
var required = function required2({ value }, action = "default") {
  return action === "trim" && typeof value === "string" ? !empty(value.trim()) : !empty(value);
};
required.skipEmpty = false;
var starts_with = function starts_with2({ value }, ...stack) {
  if (typeof value === "string" && stack.length) {
    return stack.some((item) => {
      return value.startsWith(item);
    });
  } else if (typeof value === "string" && stack.length === 0) {
    return true;
  }
  return false;
};
var url = function url2({ value }, ...stack) {
  try {
    const protocols = stack.length ? stack : ["http:", "https:"];
    const url3 = new URL(String(value));
    return protocols.includes(url3.protocol);
  } catch {
    return false;
  }
};

// node_modules/@formkit/observer/dist/index.mjs
var revokedObservers = /* @__PURE__ */ new WeakSet();
function createObserver(node, dependencies) {
  const deps = dependencies || Object.assign(/* @__PURE__ */ new Map(), { active: false });
  const receipts2 = /* @__PURE__ */ new Map();
  const addDependency = function(event) {
    var _a;
    if (!deps.active)
      return;
    if (!deps.has(node))
      deps.set(node, /* @__PURE__ */ new Set());
    (_a = deps.get(node)) === null || _a === void 0 ? void 0 : _a.add(event);
  };
  const observeProps = function(props2) {
    return new Proxy(props2, {
      get(...args) {
        typeof args[1] === "string" && addDependency(`prop:${args[1]}`);
        return Reflect.get(...args);
      }
    });
  };
  const observeLedger = function(ledger) {
    return new Proxy(ledger, {
      get(...args) {
        if (args[1] === "value") {
          return (key) => {
            addDependency(`count:${key}`);
            return ledger.value(key);
          };
        }
        return Reflect.get(...args);
      }
    });
  };
  const observe = function(value, property) {
    if (isNode(value)) {
      return createObserver(value, deps);
    }
    if (property === "value")
      addDependency("commit");
    if (property === "props")
      return observeProps(value);
    if (property === "ledger")
      return observeLedger(value);
    return value;
  };
  const { proxy: observed, revoke } = Proxy.revocable(node, {
    get(...args) {
      switch (args[1]) {
        case "deps":
          return deps;
        case "watch":
          return (block) => watch2(observed, block);
        case "observe":
          return () => {
            const old = new Map(deps);
            deps.clear();
            deps.active = true;
            return old;
          };
        case "stopObserve":
          return () => {
            const newDeps = new Map(deps);
            deps.active = false;
            return newDeps;
          };
        case "receipts":
          return receipts2;
        case "kill":
          return () => {
            removeListeners(receipts2);
            revokedObservers.add(args[2]);
            revoke();
          };
      }
      const value = Reflect.get(...args);
      if (typeof value === "function") {
        return (...subArgs) => {
          const subValue = value(...subArgs);
          return observe(subValue, args[1]);
        };
      }
      return observe(value, args[1]);
    }
  });
  return observed;
}
function applyListeners(node, [toAdd, toRemove], callback) {
  toAdd.forEach((events, depNode) => {
    events.forEach((event) => {
      node.receipts.has(depNode) || node.receipts.set(depNode, {});
      node.receipts.set(depNode, Object.assign(node.receipts.get(depNode), {
        [event]: depNode.on(event, callback)
      }));
    });
  });
  toRemove.forEach((events, depNode) => {
    events.forEach((event) => {
      if (node.receipts.has(depNode)) {
        const nodeReceipts = node.receipts.get(depNode);
        if (nodeReceipts && has(nodeReceipts, event)) {
          depNode.off(nodeReceipts[event]);
          delete nodeReceipts[event];
          node.receipts.set(depNode, nodeReceipts);
        }
      }
    });
  });
}
function removeListeners(receipts2) {
  receipts2.forEach((events, node) => {
    for (const event in events) {
      node.off(events[event]);
    }
  });
}
async function watch2(node, block) {
  const oldDeps = new Map(node.deps);
  node.observe();
  const res = block(node);
  if (res instanceof Promise)
    await res;
  const newDeps = node.stopObserve();
  applyListeners(node, diffDeps(oldDeps, newDeps), () => watch2(node, block));
}
function diffDeps(previous, current) {
  const toAdd = /* @__PURE__ */ new Map();
  const toRemove = /* @__PURE__ */ new Map();
  current.forEach((events, node) => {
    if (!previous.has(node)) {
      toAdd.set(node, events);
    } else {
      const eventsToAdd = /* @__PURE__ */ new Set();
      const previousEvents = previous.get(node);
      events.forEach((event) => !(previousEvents === null || previousEvents === void 0 ? void 0 : previousEvents.has(event)) && eventsToAdd.add(event));
      toAdd.set(node, eventsToAdd);
    }
  });
  previous.forEach((events, node) => {
    if (!current.has(node)) {
      toRemove.set(node, events);
    } else {
      const eventsToRemove = /* @__PURE__ */ new Set();
      const newEvents = current.get(node);
      events.forEach((event) => !(newEvents === null || newEvents === void 0 ? void 0 : newEvents.has(event)) && eventsToRemove.add(event));
      toRemove.set(node, eventsToRemove);
    }
  });
  return [toAdd, toRemove];
}
function isKilled(node) {
  return revokedObservers.has(node);
}

// node_modules/@formkit/validation/dist/index.mjs
var validatingMessage = createMessage({
  type: "state",
  blocking: true,
  visible: false,
  value: true,
  key: "validating"
});
function createValidationPlugin(baseRules = {}) {
  return function validationPlugin(node) {
    let availableRules = {
      ...baseRules,
      ...cloneAny(node.props.validationRules)
    };
    let observedNode = createObserver(node);
    const state = { input: token(), rerun: null, isPassing: true };
    let validation2 = cloneAny(node.props.validation);
    node.on("prop:validation", ({ payload }) => reboot(payload, availableRules));
    node.on("prop:validationRules", ({ payload }) => reboot(validation2, payload));
    function reboot(newValidation, newRules) {
      if (eq(availableRules, newRules) && eq(validation2, newValidation))
        return;
      validation2 = cloneAny(newValidation);
      availableRules = { ...baseRules, ...cloneAny(node.props.validationRules) };
      removeListeners(observedNode.receipts);
      node.store.filter(() => false, "validation");
      node.props.parsedRules = parseRules(newValidation, availableRules);
      observedNode.kill();
      observedNode = createObserver(node);
      validate(observedNode, node.props.parsedRules, state);
    }
    node.props.parsedRules = parseRules(validation2, availableRules);
    validate(observedNode, node.props.parsedRules, state);
  };
}
function validate(node, validations, state) {
  if (isKilled(node))
    return;
  state.input = token();
  state.isPassing = true;
  node.store.filter((message2) => !message2.meta.removeImmediately, "validation");
  validations.forEach((validation2) => validation2.debounce && clearTimeout(validation2.timer));
  if (validations.length) {
    node.store.set(validatingMessage);
    run(0, validations, node, state, false, () => {
      node.store.remove(validatingMessage.key);
    });
  }
}
function run(current, validations, node, state, removeImmediately, complete) {
  const validation2 = validations[current];
  if (!validation2)
    return complete();
  const currentRun = state.input;
  validation2.state = null;
  function next(async, result) {
    state.isPassing = state.isPassing && !!result;
    validation2.queued = false;
    const newDeps = node.stopObserve();
    applyListeners(node, diffDeps(validation2.deps, newDeps), () => {
      validation2.queued = true;
      if (state.rerun)
        clearTimeout(state.rerun);
      state.rerun = setTimeout(validate, 0, node, validations, state);
    });
    validation2.deps = newDeps;
    if (state.input === currentRun) {
      validation2.state = result;
      if (result === false) {
        createFailedMessage(node, validation2, removeImmediately || async);
      } else {
        removeMessage2(node, validation2);
      }
      if (validations.length > current + 1) {
        run(current + 1, validations, node, state, removeImmediately || async, complete);
      } else {
        complete();
      }
    }
  }
  if ((!empty(node.value) || !validation2.skipEmpty) && (state.isPassing || validation2.force)) {
    if (validation2.queued) {
      runRule(validation2, node, (result) => {
        result instanceof Promise ? result.then((r) => next(true, r)) : next(false, result);
      });
    } else {
      run(current + 1, validations, node, state, removeImmediately, complete);
    }
  } else {
    if (empty(node.value) && validation2.skipEmpty && state.isPassing) {
      node.observe();
      node.value;
      next(false, state.isPassing);
    } else {
      next(false, null);
    }
  }
}
function runRule(validation2, node, after) {
  if (validation2.debounce) {
    validation2.timer = setTimeout(() => {
      node.observe();
      after(validation2.rule(node, ...validation2.args));
    }, validation2.debounce);
  } else {
    node.observe();
    after(validation2.rule(node, ...validation2.args));
  }
}
function removeMessage2(node, validation2) {
  const key = `rule_${validation2.name}`;
  if (has(node.store, key)) {
    node.store.remove(key);
  }
}
function createFailedMessage(node, validation2, removeImmediately) {
  const i18nArgs = createI18nArgs(node, validation2);
  const customMessage = createCustomMessage(node, validation2, i18nArgs);
  const message2 = createMessage({
    blocking: validation2.blocking,
    key: `rule_${validation2.name}`,
    meta: {
      /**
       * Use this key instead of the message root key to produce i18n validation
       * messages.
       */
      messageKey: validation2.name,
      /**
       * For messages that were created *by or after* a debounced or async
       * validation rule — we make note of it so we can immediately remove them
       * as soon as the next commit happens.
       */
      removeImmediately,
      /**
       * Determines if this message should be passed to localization.
       */
      localize: !customMessage,
      /**
       * The arguments that will be passed to the validation rules
       */
      i18nArgs
    },
    type: "validation",
    value: customMessage || "This field is not valid."
  });
  node.store.set(message2);
  return message2;
}
function createCustomMessage(node, validation2, i18nArgs) {
  const customMessage = node.props.validationMessages && has(node.props.validationMessages, validation2.name) ? node.props.validationMessages[validation2.name] : void 0;
  if (typeof customMessage === "function") {
    return customMessage(...i18nArgs);
  }
  return customMessage;
}
function createI18nArgs(node, validation2) {
  return [
    {
      node,
      name: createMessageName(node),
      args: validation2.args
    }
  ];
}
function createMessageName(node) {
  if (typeof node.props.validationLabel === "function") {
    return node.props.validationLabel(node);
  }
  return node.props.validationLabel || node.props.label || node.props.name || String(node.name);
}
var hintPattern = "(?:[\\*+?()0-9]+)";
var rulePattern = "[a-zA-Z][a-zA-Z0-9_]+";
var ruleExtractor = new RegExp(`^(${hintPattern}?${rulePattern})(?:\\:(.*)+)?$`, "i");
var hintExtractor = new RegExp(`^(${hintPattern})(${rulePattern})$`, "i");
var debounceExtractor = /([\*+?]+)?(\(\d+\))([\*+?]+)?/;
var hasDebounce = /\(\d+\)/;
var defaultHints = {
  blocking: true,
  debounce: 0,
  force: false,
  skipEmpty: true,
  name: ""
};
function parseRules(validation2, rules) {
  if (!validation2)
    return [];
  const intents = typeof validation2 === "string" ? extractRules(validation2) : clone(validation2);
  return intents.reduce((validations, args) => {
    let rule = args.shift();
    const hints = {};
    if (typeof rule === "string") {
      const [ruleName, parsedHints] = parseHints(rule);
      if (has(rules, ruleName)) {
        rule = rules[ruleName];
        Object.assign(hints, parsedHints);
      }
    }
    if (typeof rule === "function") {
      validations.push({
        rule,
        args,
        timer: 0,
        state: null,
        queued: true,
        deps: /* @__PURE__ */ new Map(),
        ...defaultHints,
        ...fnHints(hints, rule)
      });
    }
    return validations;
  }, []);
}
function extractRules(validation2) {
  return validation2.split("|").reduce((rules, rule) => {
    const parsedRule = parseRule(rule);
    if (parsedRule) {
      rules.push(parsedRule);
    }
    return rules;
  }, []);
}
function parseRule(rule) {
  const trimmed = rule.trim();
  if (trimmed) {
    const matches3 = trimmed.match(ruleExtractor);
    if (matches3 && typeof matches3[1] === "string") {
      const ruleName = matches3[1].trim();
      const args = matches3[2] && typeof matches3[2] === "string" ? matches3[2].split(",").map((s) => s.trim()) : [];
      return [ruleName, ...args];
    }
  }
  return false;
}
function parseHints(ruleName) {
  const matches3 = ruleName.match(hintExtractor);
  if (!matches3) {
    return [ruleName, { name: ruleName }];
  }
  const map = {
    "*": { force: true },
    "+": { skipEmpty: false },
    "?": { blocking: false }
  };
  const [, hints, rule] = matches3;
  const hintGroups = hasDebounce.test(hints) ? hints.match(debounceExtractor) || [] : [, hints];
  return [
    rule,
    [hintGroups[1], hintGroups[2], hintGroups[3]].reduce((hints2, group2) => {
      if (!group2)
        return hints2;
      if (hasDebounce.test(group2)) {
        hints2.debounce = parseInt(group2.substr(1, group2.length - 1));
      } else {
        group2.split("").forEach((hint) => has(map, hint) && Object.assign(hints2, map[hint]));
      }
      return hints2;
    }, { name: rule })
  ];
}
function fnHints(existingHints, rule) {
  if (!existingHints.name) {
    existingHints.name = rule.ruleName || rule.name;
  }
  return ["skipEmpty", "force", "debounce", "blocking"].reduce((hints, hint) => {
    if (has(rule, hint) && !has(hints, hint)) {
      Object.assign(hints, {
        [hint]: rule[hint]
      });
    }
    return hints;
  }, existingHints);
}

// node_modules/@formkit/i18n/dist/index.mjs
function sentence(str) {
  return str[0].toUpperCase() + str.substr(1);
}
function list2(items, conjunction = "or") {
  return items.reduce((oxford, item, index2) => {
    oxford += item;
    if (index2 <= items.length - 2 && items.length > 2) {
      oxford += ", ";
    }
    if (index2 === items.length - 2) {
      oxford += `${items.length === 2 ? " " : ""}${conjunction} `;
    }
    return oxford;
  }, "");
}
function date2(date3) {
  const dateTime = typeof date3 === "string" ? new Date(Date.parse(date3)) : date3;
  if (!(dateTime instanceof Date)) {
    return "(unknown)";
  }
  return new Intl.DateTimeFormat(void 0, {
    dateStyle: "medium"
  }).format(dateTime);
}
function order(first, second) {
  return Number(first) >= Number(second) ? [second, first] : [first, second];
}
var ui$B = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "إضافة",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "إزالة",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "إزالة الكل",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "عذرا، لم يتم تعبئة جميع الحقول بشكل صحيح.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "إرسال",
  /**
   * Shown when no files are selected.
   */
  noFiles: "لا يوجد ملف مختار",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "تحرك لأعلى",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "انتقل لأسفل",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "يتم الآن التحميل...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "تحميل المزيد"
};
var validation$B = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `الرجاء قبول ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `يجب أن يكون ${sentence(name)} بعد ${date2(args[0])}.`;
    }
    return `يجب أن يكون ${sentence(name)} في المستقبل.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `يمكن أن يحتوي ${sentence(name)} على أحرف أبجدية فقط.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `يمكن أن يحتوي ${sentence(name)} على أحرف وأرقام فقط.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `يمكن أن تحتوي ${sentence(name)} على أحرف ومسافات فقط.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `يجب أن يكون ${sentence(name)} قبل ${date2(args[0])}.`;
    }
    return `يجب أن يكون ${sentence(name)} في الماضي.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `تمت تهيئة هذا الحقل بشكل غير صحيح ولا يمكن إرساله.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `يجب أن يكون ${sentence(name)} ما بين ${a} و ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} غير متطابق.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ليس تاريخًا صالحًا ، يرجى استخدام التنسيق ${args[0]}`;
    }
    return "تمت تهيئة هذا الحقل بشكل غير صحيح ولا يمكن إرساله";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `يجب أن يكون ${sentence(name)} بين ${date2(args[0])} و ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "الرجاء أدخال بريد إليكتروني صالح.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `لا ينتهي ${sentence(name)} بـ ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ليست قيمة مسموح بها.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `يجب أن يكون ${sentence(name)} حرفًا واحدًا على الأقل.`;
    }
    if (min3 == 0 && max3) {
      return `يجب أن يكون ${sentence(name)} أقل من أو يساوي ${max3} حرفًا.`;
    }
    if (min3 === max3) {
      return `يجب أن يتكون ${sentence(name)} من الأحرف ${max3}.`;
    }
    if (min3 && max3 === Infinity) {
      return `يجب أن يكون ${sentence(name)} أكبر من أو يساوي ${min3} حرفًا.`;
    }
    return `يجب أن يكون ${sentence(name)} بين ${min3} و ${max3} حرفًا.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ليست قيمة مسموح بها.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `لا يمكن أن يكون أكثر من ${args[0]} ${name}.`;
    }
    return `يجب أن يكون ${sentence(name)} أقل من أو يساوي ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "لا يسمح بتنسيقات الملفات.";
    }
    return `يجب أن يكون ${sentence(name)} من النوع: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `لا يمكن أن يكون أقل من ${args[0]} ${name}.`;
    }
    return `يجب أن يكون ${sentence(name)} على الأقل ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ليس ${name} مسموحًا به.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} يجب ان يكون رقماً`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} مطلوب.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `لا يبدأ ${sentence(name)} بـ ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `الرجاء تضمين عنوان رابط صحيح.`;
  }
};
var ar = Object.freeze({
  __proto__: null,
  ui: ui$B,
  validation: validation$B
});
var ui$A = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "əlavə edin",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "çıxarmaq",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hamısını silin",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Üzr istəyirik, bütün sahələr düzgün doldurulmayıb.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Təqdim et",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Heç bir fayl seçilməyib",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "yuxarı hərəkət",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Aşağı hərəkət",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Yükləmə...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Daha çox yüklə"
};
var validation$A = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} qəbul edin.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} sonra olmalıdır.`;
    }
    return `${sentence(name)} gələcəkdə olmalıdır.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} yalnız əlifba sırası simvollarından ibarət ola bilər.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} yalnız hərf və rəqəmlərdən ibarət ola bilər.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} yalnız hərflərdən və boşluqlardan ibarət ola bilər.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} əvvəl olmalıdır.`;
    }
    return `${sentence(name)} keçmişdə olmalıdır.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Bu sahə səhv konfiqurasiya edilib və onu təqdim etmək mümkün deyil.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a} və ${b} arasında olmalıdır.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} uyğun gəlmir.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} etibarlı tarix deyil, ${args[0]} formatından istifadə edin`;
    }
    return "Bu sahə səhv konfiqurasiya edilib və onu təqdim etmək mümkün deyil";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ${date2(args[0])} və ${date2(args[1])} arasında olmalıdır`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Etibarlı e-poçt ünvanı daxil edin.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ilə bitmir.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} icazə verilən dəyər deyil.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} ən azı bir simvol olmalıdır.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3} simvoldan kiçik və ya ona bərabər olmalıdır.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} simvol uzunluğunda olmalıdır.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3} simvoldan böyük və ya ona bərabər olmalıdır.`;
    }
    return `${sentence(name)} ${min3} və ${max3} simvol arasında olmalıdır.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} icazə verilən dəyər deyil.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name}-dən çox ola bilməz.`;
    }
    return `${sentence(name)} ${args[0]} dəyərindən kiçik və ya ona bərabər olmalıdır.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Fayl formatlarına icazə verilmir.";
    }
    return `${sentence(name)} aşağıdakı tipdə olmalıdır: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name}-dən az ola bilməz.`;
    }
    return `${sentence(name)} ən azı ${args[0]} olmalıdır.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” icazə verilən ${name} deyil.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} rəqəm olmalıdır.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} tələb olunur.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ilə başlamır.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Zəhmət olmasa etibarlı url daxil edin`;
  }
};
var az = Object.freeze({
  __proto__: null,
  ui: ui$A,
  validation: validation$A
});
var ui$z = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Добави",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Премахни",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Премахни всички",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Извинете, не всички полета са попълнени правилно.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Изпрати",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Няма избран файл",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Преместване нагоре",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Преместете се надолу",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Зареждане...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Заредете повече"
};
var validation$z = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Моля приемете ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} трябва да е след ${date2(args[0])}.`;
    }
    return `${sentence(name)} трябва да бъде в бъдещето.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} може да съдържа само букви.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} може да съдържа само букви и цифри.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} може да съдържа само букви и интервали.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} трябва да е преди ${date2(args[0])}.`;
    }
    return `${sentence(name)} трябва да бъде в миналото.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Това поле е конфигурирано неправилно и не може да бъде изпратено`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} трябва да бъде между ${a} и ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} не съвпада.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} е невалидна дата. Моля, използвайте формата ${args[0]}`;
    }
    return "Това поле е конфигурирано неправилно и не може да бъде изпратено";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} трябва да бъде между ${date2(args[0])} и ${date2(args[1])}.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Моля, въведете валиден имейл адрес.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} не завършва на ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} е неразрешена стойност.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} трябва да има поне един символ.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} трябва да бъде по-малко или равно на ${max3} символа.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} трябва да бъде ${max3} символи дълго.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} трябва да бъде по-голямо или равно на ${min3} символа.`;
    }
    return `${sentence(name)} трябва да бъде между ${min3} и ${max3} символа.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} е неразрешена стойност.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може да има повече от ${args[0]} ${name}.`;
    }
    return `${sentence(name)} трябва да бъде по-малко или равно на ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Не са разрешени никакви файлови формати.";
    }
    return `${sentence(name)} трябва да бъде от тип: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може да има по-малко от ${args[0]} ${name}.`;
    }
    return `${sentence(name)} трябва да бъде поне ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” е неразрешен ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} трябва да бъде число.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} е задължително.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} не започва с ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Моля, въведете валиден URL адрес.`;
  }
};
var bg = Object.freeze({
  __proto__: null,
  ui: ui$z,
  validation: validation$z
});
var ui$y = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Přidat",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Odebrat",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Odebrat vše",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pardon, ale ne všechna pole jsou vyplněna správně.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Odeslat",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Žádný soubor nebyl vybrán",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pohyb nahoru",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Posunout dolů",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Načítání...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Načíst více"
};
var validation$y = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prosím, zaškrtněte ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí být po ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí být v budoucnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} může obsahovat pouze písmena.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} může obsahovat pouze písmena a čísla.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí být před ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí být v minulosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Toto pole bylo špatně nakonfigurováno a nemůže být odesláno.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} musí být mezi ${a} a ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nejsou shodná.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} není platné datum, prosím, použijte formát ${args[0]}`;
    }
    return "Toto pole bylo špatně nakonfigurováno a nemůže být odesláno.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} musí být mezi ${date2(args[0])} a ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Prosím, zadejte platnou e-mailovou adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nekončí na ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} není povolená hodnota.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} musí mít nejméně jeden znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} může mít maximálně ${max3} znaků.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} by mělo být ${max3} znaků dlouhé.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} musí obsahovat minimálně ${min3} znaků.`;
    }
    return `${sentence(name)} musí být dlouhé ${min3} až ${max3} znaků.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} není povolená hodnota.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nelze použít více než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí mít menší nebo rovno než ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nejsou nakonfigurovány povolené typy souborů.";
    }
    return `${sentence(name)} musí být typu: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nelze mít méně než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí být minimálně ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” není dovolená hodnota pro ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} musí být číslo.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je povinné.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nezačíná na ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Zadejte, prosím, platnou URL adresu.`;
  }
};
var cs = Object.freeze({
  __proto__: null,
  ui: ui$y,
  validation: validation$y
});
var ui$x = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Tilføj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Fjern",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Fjern alle",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Alle felter er ikke korrekt udfyldt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Send",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ingen filer valgt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Flyt op",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Flyt ned",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Indlæser...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Indlæs mere"
};
var validation$x = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Accepter venligst ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} skal være senere end ${date2(args[0])}.`;
    }
    return `${sentence(name)} skal være i fremtiden.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} kan kun indeholde bogstaver.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} kan kun indeholde bogstaver og tal.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} kan kun indeholde bogstaver og mellemrum.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} skal være før ${date2(args[0])}.`;
    }
    return `${sentence(name)} skal være før i dag.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dette felt er ikke konfigureret korrekt og kan derfor ikke blive sendt.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} skal være mellem ${a} og ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} matcher ikke.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} er ikke gyldig, brug venligst formatet ${args[0]}`;
    }
    return "Dette felt er ikke konfigureret korrekt og kan derfor ikke blive sendt.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} skal være mellem ${date2(args[0])} og ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Indtast venligst en gyldig email-adresse.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} slutter ikke med ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} er ikke en gyldig værdi.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} skal være på mindst ét tegn.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} skal være på højst ${max3} tegn.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} skal være ${max3} tegn lange.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} skal være på mindst ${min3} tegn.`;
    }
    return `${sentence(name)} skal være på mindst ${min3} og højst ${max3} tegn.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} er ikke en gyldig værdi.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke have flere end ${args[0]} ${name}.`;
    }
    return `${sentence(name)} skal være mindre eller lig med ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ingen filformater tilladt.";
    }
    return `${sentence(name)} skal være af filtypen: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke have mindre end ${args[0]} ${name}.`;
    }
    return `${sentence(name)} skal være mindst ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” er ikke en tilladt ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} skal være et tal.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} er påkrævet.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} starter ikke med ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Indtast venligst en gyldig URL.`;
  }
};
var da = Object.freeze({
  __proto__: null,
  ui: ui$x,
  validation: validation$x
});
var ui$w = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Hinzufügen",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Entfernen",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Alles entfernen",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Entschuldigung, nicht alle Felder wurden korrekt ausgefüllt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Senden",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Keine Datei ausgewählt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Gehe nach oben",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Gehen Sie nach unten",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Wird geladen...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Mehr laden"
};
var validation$w = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Bitte ${name} akzeptieren.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} muss nach dem ${date2(args[0])} liegen.`;
    }
    return `${sentence(name)} muss in der Zukunft liegen.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} darf nur Buchstaben enthalten.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} darf nur Buchstaben und Zahlen enthalten.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} dürfen nur Buchstaben und Leerzeichen enthalten.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} muss vor dem ${date2(args[0])} liegen.`;
    }
    return `${sentence(name)} muss in der Vergangenheit liegen.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dieses Feld wurde falsch konfiguriert und kann nicht übermittelt werden.`;
    }
    return `${sentence(name)} muss zwischen ${args[0]} und ${args[1]} sein.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} stimmt nicht überein.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ist kein gültiges Datum im Format ${args[0]}.`;
    }
    return "Dieses Feld wurde falsch konfiguriert und kann nicht übermittelt werden.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} muss zwischen ${date2(args[0])} und ${date2(args[1])} liegen.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "E-Mail Adresse ist ungültig.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} endet nicht mit ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} enthält einen ungültigen Wert.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} muss mindestens ein Zeichen enthalten.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} darf maximal ${max3} Zeichen enthalten.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} sollte ${max3} Zeichen lang sein.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} muss mindestens ${min3} Zeichen enthalten.`;
    }
    return `${sentence(name)} muss zwischen ${min3} und ${max3} Zeichen enthalten.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} enthält einen ungültigen Wert.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Darf maximal ${args[0]} ${name} haben.`;
    }
    return `${sentence(name)} darf maximal ${args[0]} sein.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Keine Dateiformate konfiguriert.";
    }
    return `${sentence(name)} muss vom Typ ${args[0]} sein.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mindestens ${args[0]} ${name} erforderlich.`;
    }
    return `${sentence(name)} muss mindestens ${args[0]} sein.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ist kein gültiger Wert für ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} muss eine Zahl sein.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} ist erforderlich.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} beginnt nicht mit ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `URL ist ungültig.`;
  }
};
var de = Object.freeze({
  __proto__: null,
  ui: ui$w,
  validation: validation$w
});
var ui$v = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Προσθήκη",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Αφαίρεση",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Αφαίρεση όλων",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Λυπούμαστε, υπάρχουν πεδία που δεν έχουν συμπληρωθεί σωστά.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Υποβολή",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Κανένα αρχείο δεν έχει επιλεγεί",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Προς τα επάνω",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Προς τα κάτω",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Φορτώνει...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Φόρτωση περισσότερων"
};
var validation$v = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Παρακαλώ αποδεχτείτε το ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} πρέπει να είναι μετά της ${date2(args[0])}.`;
    }
    return `${sentence(name)} πρέπει να είναι στο μέλλον.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} μπορεί να περιέχει μόνο αλφαβητικούς χαρακτήρες.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} μπορεί να περιέχει μόνο γράμματα και αριθμούς.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} μπορεί να περιέχει μόνο γράμματα και κενά.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} πρέπει να είναι πριν της ${date2(args[0])}.`;
    }
    return `${sentence(name)} πρέπει να είναι στο παρελθόν.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Αυτό το πεδίο έχει ρυθμιστεί λανθασμένα και δεν μπορεί να υποβληθεί.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} πρέπει να είναι μεταξύ ${a} και ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} δεν ταιριάζει.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} δεν είναι έγυρη ημερομηνία, παρακαλώ ακολουθήστε την διαμόρφωση ${args[0]}`;
    }
    return "Αυτό το πεδίο έχει ρυθμιστεί λανθασμένα και δεν μπορεί να υποβληθεί";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} πρέπει να είναι μεταξύ ${date2(args[0])} και ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Παρακαλώ πληκτρολογήστε μια έγκυρη email διεύθυνση. ",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} δεν καταλήγει με ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} δεν είναι μια επιτρεπτή τιμή.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} πρέπει να είναι τουλάχιστον ενός χαρακτήρα.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} πρέπει να είναι λιγότεροι ή ίσοι με ${max3} χαρακτήρες.`;
    }
    if (min3 === max3) {
      return `Το ${sentence(name)} θα πρέπει να έχει μήκος ${max3} χαρακτήρες.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} πρέπει να είναι περισσότεροι ή ίσοι με ${min3} χαρακτήρες.`;
    }
    return `${sentence(name)} πρέπει να είναι μεταξύ ${min3} και ${max3} χαρακτήρες.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} δεν είναι μια επιτρεπτή τιμή.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Δεν μπορεί να έχει παραπάνω από ${args[0]} ${name}.`;
    }
    return `${sentence(name)} πρέπει αν είναι λιγότερο ή ίσο με το ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Δεν επιτρέπονται αρχεία.";
    }
    return `${sentence(name)} πρέπει να είναι τύπου: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Δεν μπορεί να είναι λιγότερο από ${args[0]} ${name}.`;
    }
    return `${sentence(name)} πρέπει να είναι τουλάχιστον ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” δεν είναι μια επιτρεπτή ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} πρέπει να είναι αριθμός.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} είναι υποχρεωτικό.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} δεν αρχίζει με ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Παρακαλώ συμπεριλάβετε μια έγκυρη διεύθυνση ιστοσελίδας.`;
  }
};
var el = Object.freeze({
  __proto__: null,
  ui: ui$v,
  validation: validation$v
});
var ui$u = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Add",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Remove",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Remove all",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, not all fields are filled out correctly.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Submit",
  /**
   * Shown when no files are selected.
   */
  noFiles: "No file chosen",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Move up",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Move down",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Loading...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Load more"
};
var validation$u = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Please accept the ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} must be after ${date2(args[0])}.`;
    }
    return `${sentence(name)} must be in the future.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} can only contain alphabetical characters.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} can only contain letters and numbers.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} can only contain letters and spaces.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} must be before ${date2(args[0])}.`;
    }
    return `${sentence(name)} must be in the past.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `This field was configured incorrectly and can’t be submitted.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} must be between ${a} and ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} does not match.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is not a valid date, please use the format ${args[0]}`;
    }
    return "This field was configured incorrectly and can’t be submitted";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} must be between ${date2(args[0])} and ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Please enter a valid email address.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} doesn’t end with ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is not an allowed value.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} must be at least one character.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} must be less than or equal to ${max3} characters.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} should be ${max3} characters long.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} must be greater than or equal to ${min3} characters.`;
    }
    return `${sentence(name)} must be between ${min3} and ${max3} characters.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is not an allowed value.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Cannot have more than ${args[0]} ${name}.`;
    }
    return `${sentence(name)} must be less than or equal to ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "No file formats allowed.";
    }
    return `${sentence(name)} must be of the type: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Cannot have less than ${args[0]} ${name}.`;
    }
    return `${sentence(name)} must be at least ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” is not an allowed ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} must be a number.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is required.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} doesn’t start with ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Please include a valid url.`;
  }
};
var en = Object.freeze({
  __proto__: null,
  ui: ui$u,
  validation: validation$u
});
var ui$t = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Añadir",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Quitar",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Quitar todos",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Discúlpe, los campos no fueron completados correctamente.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Enviar",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Archivo no seleccionado",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Moverse hacia arriba",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Moverse hacia abajo",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Cargando...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Cargar más"
};
var validation$t = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Acepte el ${name} por favor.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} debe ser posterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} debe ser una fecha futura.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} debe contener solo caractéres alfabéticos.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} debe ser alfanumérico.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} espacios alfa solo pueden contener letras y espacios.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} debe ser anterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} debe ser una fecha pasada.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `El campo no fue completado correctamente y no puede ser enviado.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} debe estar entre ${a} y ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} no coincide.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} no es una fecha válida, por favor utilice el formato ${args[0]}`;
    }
    return "El campo no fue completado correctamente y no puede ser enviado.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} debe estar entre ${date2(args[0])} y ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Ingrese una dirección de correo electrónico válida por favor.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} no termina con ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} no es un valor permitido.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} debe tener al menos una letra.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} debe tener como máximo ${max3} caractéres.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} debe tener ${max3} caracteres.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} debe tener como mínimo ${min3} caractéres.`;
    }
    return `${sentence(name)} debe tener entre ${min3} y ${max3} caractéres.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} no es un valor permitido.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `No puede tener más de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} debe ser menor o igual a ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "No existen formatos de archivos permitidos.";
    }
    return `${sentence(name)} debe ser del tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `No puede tener menos de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} debe ser de al menos ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” no es un valor permitido de ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} debe ser un número.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} es requerido.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} debe comenzar con ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Proporcione una URL válida por favor.`;
  }
};
var es = Object.freeze({
  __proto__: null,
  ui: ui$t,
  validation: validation$t
});
var ui$s = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "افزودن",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "حذف",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "همه را حذف کنید",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "همه فیلدها به‌درستی پر نشده‌اند",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "ثبت",
  /**
   * Shown when no files are selected.
   */
  noFiles: "هیچ فایلی انتخاب نشده است",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "حرکت به بالا",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "حرکت به پایین",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "در حال بارگذاری...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "بارگذاری بیشتر"
};
var validation$s = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `لطفاً ${name} را بپذیرید.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} باید بعد از تاریخ ${date2(args[0])} باشد.`;
    }
    return `${sentence(name)} باید مربوط به آینده باشد.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} فقط میتواند شامل حروف الفبا باشد.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} فقط میتواند شامل حروف و اعداد باشد.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} فقط می تواند شامل حروف و فاصله باشد.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} باید قبل از تاریخ ${date2(args[0])} باشد.`;
    }
    return `${sentence(name)} باید مربوط به گذشته باشد.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `این فیلد به اشتباه پیکربندی شده است و قابل ارسال نیست`;
    }
    return `${sentence(name)} باید بین ${args[0]} و ${args[1]} باشد.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} مطابقت ندارد.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} تاریخ معتبری نیست، لطفاً از قالب ${args[0]} استفاده کنید
`;
    }
    return "این فیلد به اشتباه پیکربندی شده است و قابل ارسال نیست";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} باید بین ${date2(args[0])} و ${date2(args[1])} باشد.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "لطفا آدرس ایمیل معتبر وارد کنید.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} باید به ${list2(args)} ختم شود.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} مجاز نیست.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} باید حداقل یک کاراکتر باشد.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} باید کمتر یا برابر با ${max3} کاراکتر باشد.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} باید ${max3} کاراکتر طولانی باشد.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} باید بزرگتر یا برابر با ${min3} کاراکتر باشد.`;
    }
    return `${sentence(name)} باید بین ${min3} و ${max3} کاراکتر باشد.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} مجاز نیست.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} نمی تواند بیش از ${args[0]} باشد.`;
    }
    return `${sentence(name)} باید کمتر یا برابر با ${args[0]} باشد.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "فرمت فایل مجاز نیست.";
    }
    return `${sentence(name)} باید از این نوع باشد: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} نمی تواند کمتر از ${args[0]} باشد.
`;
    }
    return `${sentence(name)} باید حداقل ${args[0]} باشد.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" یک ${name} مجاز نیست.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} باید عدد باشد.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `پر کردن ${sentence(name)} اجباری است.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} باید با ${list2(args)} شروع شود.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `لطفاً آدرس اینترنتی معتبر وارد کنید.`;
  }
};
var fa = Object.freeze({
  __proto__: null,
  ui: ui$s,
  validation: validation$s
});
var ui$r = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Lisää",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Poista",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Poista kaikki",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Kaikkia kenttiä ei ole täytetty oikein.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Tallenna",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ei valittuja tiedostoja",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Siirrä ylös",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Siirrä alas",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Ladataan...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Lataa lisää"
};
var validation$r = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Ole hyvä ja hyväksy ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} tulee olla ${date2(args[0])} jälkeen.`;
    }
    return `${sentence(name)} on oltava tulevaisuudessa.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} saa sisältää vain kirjaimia.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} saa sisältää vain kirjaimia ja numeroita.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} voivat sisältää vain kirjaimia ja välilyöntejä.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} tulee olla ennen: ${date2(args[0])}.`;
    }
    return `${sentence(name)} on oltava menneisyydessä.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Tämä kenttä on täytetty virheellisesti joten sitä ei voitu lähettää.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} on oltava välillä ${a} - ${b} `;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ei täsmää.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ei ole validi päivämäärä, ole hyvä ja syötä muodossa: ${args[0]}`;
    }
    return "Tämä kenttä on täytetty virheellisesti joten sitä ei voitu lähettää.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} on oltava välillä ${date2(args[0])} - ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Syötä validi sähköpostiosoite.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} tulee päättyä ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ei ole sallittu vaihtoehto.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} on oltava vähintään yksi merkki.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} on oltava ${max3} tai alle merkkiä.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} pitäisi olla ${max3} merkkiä pitkä.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} on oltava vähintään ${min3} merkkiä.`;
    }
    return `${sentence(name)} on oltava vähintään ${min3}, enintään ${max3} merkkiä.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ei ole sallittu arvo.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Valitse enintään ${args[0]} ${name} vaihtoehtoa.`;
    }
    return `${sentence(name)} on oltava ${args[0]} tai alle.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Tiedostoja ei sallita.";
    }
    return `${sentence(name)} tulee olla ${args[0]}-tiedostotyyppiä.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Valitse vähintään ${args[0]} ${name} vaihtoehtoa.`;
    }
    return `${sentence(name)} tulee olla ${args[0]} tai suurempi.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ei ole sallittu ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `Kentän ${sentence(name)} tulee olla numero.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} vaaditaan.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} on alettava ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Syötä validi url-osoite.`;
  }
};
var fi = Object.freeze({
  __proto__: null,
  ui: ui$r,
  validation: validation$r
});
var ui$q = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Ajouter",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Supprimer",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Enlever tout",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Désolé, tous les champs ne sont pas remplis correctement.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Valider",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Aucun fichier choisi",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Déplacez-vous",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Déplacez-vous",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Chargement...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Chargez plus"
};
var validation$q = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Veuillez accepter le ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} doit être postérieure au ${date2(args[0])}.`;
    }
    return `${sentence(name)} doit être dans le futur.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} ne peut contenir que des caractères alphabétiques.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} ne peut contenir que des lettres et des chiffres.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} ne peuvent contenir que des lettres et des espaces.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} doit être antérieure au ${date2(args[0])}.`;
    }
    return `${sentence(name)} doit être dans le passé.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ce champ a été configuré de manière incorrecte et ne peut pas être soumis.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} doit être comprise entre ${a} et ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ne correspond pas.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} n'est pas une date valide, veuillez utiliser le format ${args[0]}`;
    }
    return "Ce champ a été configuré de manière incorrecte et ne peut pas être soumis.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} doit être comprise entre ${date2(args[0])} et ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Veuillez saisir une adresse email valide.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ne se termine pas par ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} n'est pas une valeur autorisée.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} doit comporter au moins un caractère.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} doit être inférieur ou égal à ${max3} caractères.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} doit contenir ${max3} caractères.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} doit être supérieur ou égal à ${min3} caractères.`;
    }
    return `${sentence(name)} doit être comprise entre ${min3} et ${max3} caractères.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} n'est pas une valeur autorisée.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne peut pas avoir plus de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} doit être inférieur ou égal à ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Aucun format de fichier n’est autorisé";
    }
    return `${sentence(name)} doit être du type: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne peut pas avoir moins de ${args[0]} ${name}.`;
    }
    return `${sentence(name)} doit être au moins de ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” n'est pas un ${name} autorisé.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} doit être un nombre.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} est requis.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ne commence pas par ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Veuillez saisir une url valide.`;
  }
};
var fr = Object.freeze({
  __proto__: null,
  ui: ui$q,
  validation: validation$q
});
var ui$p = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Foeg ta",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ferwider",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ferwider alles",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, net alle fjilden binne korrekt ynfolle.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Ferstjoere",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Gjin bestân keazen"
};
var validation$p = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Akseptearje de ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moat nei ${date2(args[0])} wêze.`;
    }
    return `${sentence(name)} moat yn de takomst lizze.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} mei allinne alfabetyske tekens befetsje.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} mei allinne letters en sifers befetsje.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} mei allinne letters en spaasjes befetsje.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moat foar ${date2(args[0])} falle.`;
    }
    return `${sentence(name)} moat yn it ferline wêze.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dit fjild is ferkeard konfigurearre en kin net ferstjoerd wurde.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} moat tusken ${a} en ${b} lizze.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} komt net oerien.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is gjin jildige datum, brûk de notaasje ${args[0]}`;
    }
    return "Dit fjild is ferkeard konfigurearre en kin net ferstjoerd wurde";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} moat tusken ${date2(args[0])} en ${date2(args[1])} lizze`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Folje in jildich e-mailadres yn.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} einiget net mei ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is gjin tastiene wearde.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} moat minimaal ien teken wêze.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} moat lytser wêze as of gelyk wêze oan ${max3} tekens.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} moat ${max3} tekens lang wêze.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} moat grutter wêze as of gelyk wêze oan ${min3} tekens.`;
    }
    return `${sentence(name)} moat tusken de ${min3} en ${max3} tekens befetsje.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is gjin tastiene wearde.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mei net mear as ${args[0]} ${name} hawwe.`;
    }
    return `${sentence(name)} moat lytser wêze as of gelyk wêze oan ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Gjin bestânsnotaasjes tastien.";
    }
    return `${sentence(name)} moat fan it type: ${args[0]} wêze`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mei net minder as ${args[0]} ${name} hawwe.`;
    }
    return `${sentence(name)} moat minimaal ${args[0]} wêze.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" is gjin tastiene ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} moat in getal wêze.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is ferplicht.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} begjint net mei ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Doch der in jildige url by.`;
  }
};
var fy = Object.freeze({
  __proto__: null,
  ui: ui$p,
  validation: validation$p
});
var ui$o = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "הוסף",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "מחק",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "מחק הכל",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "שים לב, לא כל השדות מלאים כראוי.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "שלח",
  /**
   * Shown when no files are selected.
   */
  noFiles: "לא נבחר קובץ..",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "הזז למעלה",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "הזז למטה",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "טוען...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "טען יותר"
};
var validation$o = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `אנא אשר את ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} חייב להיות אחרי ${date2(args[0])}.`;
    }
    return `${sentence(name)} חייב להיות בעתיד.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} חייב להכיל אותיות אלפבת.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} יכול להכיל רק מספרים ואותיות.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} יכול להכיל רק אותיות ורווחים.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} חייב להיות לפני ${date2(args[0])}.`;
    }
    return `${sentence(name)} חייב להיות בעבר`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `שדה זה לא הוגדר כראוי ולא יכול להישלח.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} חייב להיות בין ${a} ו- ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} לא מתאים.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} הוא לא תאריך תקין, אנא השתמש בפורמט ${args[0]}`;
    }
    return "שדה זה לא הוגדר כראוי ולא יכול להישלח.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} חייב להיות בין ${date2(args[0])} ו- ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "אנא הקלד אימייל תקין.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} לא מסתיים ב- ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} הוא לא ערך מורשה.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} חייב להיות לפחות תו אחד.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} חייב להיות פחות או שווה ל- ${max3} תווים.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} צריך להיות ${max3} תווים ארוכים.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} חייב להיות גדול או שווה ל- ${min3} תווים.`;
    }
    return `${sentence(name)} חייב להיות בין ${min3} ו- ${max3} תווים.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} הוא לא ערך תקין.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} לא יכול להיות עם יותר מ- ${args[0]}.`;
    }
    return `${sentence(name)} חייב להיות פחות או שווה ל- ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "פורמט הקובץ לא מורשה.";
    }
    return `${sentence(name)} חייב להיות מסוג: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} לא יכול להיות עם פחות מ- ${args[0]}.`;
    }
    return `${sentence(name)} חייב להיות לפחות ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” לא מתאים ל- ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} חייב להיות מספר.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} הינו חובה.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} לא מתחיל ב- ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `אנא הקלד קישור תקין.`;
  }
};
var he = Object.freeze({
  __proto__: null,
  ui: ui$o,
  validation: validation$o
});
var ui$n = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ukloni",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pojedina polja nisu ispravno ispunjena.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Predaj",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pomaknite se gore",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pomakni se dolje",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Učitavanje...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Učitaj više"
};
var validation$n = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Potrebno je potvrditi ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti u periodu poslije ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u budućnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} mora sadržavati samo slova.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} mora sadržavati slova i brojeve.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} mogu sadržavati samo slova i razmake..`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti prije ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u prošlosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Format sadržaja nije ispravan i ne može biti predan.`;
    }
    return `${sentence(name)} mora biti između ${args[0]} i ${args[1]}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ne odgovara zadanoj vrijednosti.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nije ispravan format datuma. Molimo koristite sljedeći format: ${args[0]}`;
    }
    return "Ovo polje nije ispravno postavljeno i ne može biti predano.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mora biti vrijednost između ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Molimo upišite ispravnu email adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ne završava s ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nije dopuštena vrijednost.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mora sadržavati barem jedan znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mora imati ${max3} ili manje znakova.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} trebao bi biti dugačak ${max3} znakova.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mora imati barem ${min3} znakova.`;
    }
    return `Broj znakova za polje ${sentence(name)} mora biti između ${min3} i ${max3}.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nije dozvoljena vrijednost.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne smije imati više od ${args[0]} ${name} polja.`;
    }
    return `${sentence(name)} mora imati vrijednost manju ili jednaku ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Format datoteke nije dozvoljen.";
    }
    return `Format datoteke na polju ${sentence(name)} mora odgovarati: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Broj upisanih vrijednosti na polju ${name} mora biti barem ${args[0]}.`;
    }
    return `${sentence(name)} mora biti barem ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nije dozvoljena vrijednost na polju ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mora biti broj.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je obavezno.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ne počinje s ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Molimo unesite ispravnu poveznicu.`;
  }
};
var hr = Object.freeze({
  __proto__: null,
  ui: ui$n,
  validation: validation$n
});
var ui$m = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Hozzáadás",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Eltávolítás",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Összes eltávolítása",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sajnáljuk, nem minden mező lett helyesen kitöltve.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Beküldés",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nincs fájl kiválasztva",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Mozgás felfelé",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Mozgás lefelé",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Betöltés...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Töltsön be többet"
};
var validation$m = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Fogadja el a ${name} mezőt.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mezőnek ${date2(args[0])} után kell lennie.`;
    }
    return `${sentence(name)} mezőnek a jövőben kell lennie.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} csak alfanumerikus karaktereket tartalmazhat.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} csak betűket és számokat tartalmazhat.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} csak betűket és szóközöket tartalmazhat.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mezőnek ${date2(args[0])} előtt kell lennie.`;
    }
    return `${sentence(name)} mezőnek a múltban kell lennie.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ez a mező hibásan lett konfigurálva, így nem lehet beküldeni.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `A ${sentence(name)} mezőnek ${a} és ${b} között kell lennie.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nem egyezik.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nem érvényes dátum, ${args[0]} formátumot használj`;
    }
    return "Ez a mező hibásan lett konfigurálva, így nem lehet beküldeni.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mezőnek ${date2(args[0])} és ${args[1]} között kell lennie`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Kérjük, érvényes email címet adjon meg.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} mező nem a kijelölt (${list2(args)}) módon ér véget.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nem engedélyezett érték.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mezőnek legalább egy karakteresnek kell lennie.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mezőnek maximum ${max3} karakteresnek kell lennie.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} karakter hosszúnak kell lennie.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mezőnek minimum ${min3} karakteresnek kell lennie.`;
    }
    return `${sentence(name)} mezőnek ${min3} és ${max3} karakter között kell lennie.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nem engedélyezett érték.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nem lehet több mint ${args[0]} ${name}.`;
    }
    return `${sentence(name)} nem lehet nagyobb, mint ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nincsenek támogatott fájlformátumok.";
    }
    return `${sentence(name)}-nak/nek a következőnek kell lennie: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nem lehet kevesebb, mint ${args[0]} ${name}.`;
    }
    return `${sentence(name)}-nak/nek minimum ${args[0]}-nak/nek kell lennie.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" nem engedélyezett ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mezőnek számnak kell lennie.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} mező kötelező.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nem a következővel kezdődik: ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Kérjük, érvényes URL-t adjon meg.`;
  }
};
var hu = Object.freeze({
  __proto__: null,
  ui: ui$m,
  validation: validation$m
});
var ui$l = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Tambah",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Hapus",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hapus semua",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Maaf, tidak semua bidang formulir terisi dengan benar",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Kirim",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Tidak ada file yang dipilih",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pindah ke atas",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pindah ke bawah",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Memuat...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Muat lebih"
};
var validation$l = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Tolong terima kolom ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nilainya harus lebih dari waktu ${date2(args[0])}.`;
    }
    return `${sentence(name)} harus berisi waktu di masa depan.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} hanya bisa diisi huruf alfabet.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} hanya bisa diisi huruf dan angka.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} hanya boleh berisi huruf dan spasi..`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nilainya harus kurang dari waktu ${date2(args[0])}.`;
    }
    return `${sentence(name)} harus berisi waktu yang sudah lampau.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Kolom ini tidak diisi dengan benar sehingga tidak bisa dikirim`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} harus bernilai diantara ${a} dan ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nilainya tidak cocok.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} waktu tidak cocok, mohon gunakan format waktu ${args[0]}`;
    }
    return "Kolom ini tidak diisi dengan benar sehingga tidak bisa dikirim";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} harus diantara waktu ${date2(args[0])} dan waktu ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Tolong tulis alamat email yang benar.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nilainya tidak berakhiran dengan ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} adalah nilai yang tidak diizinkan.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} nilainya setidaknya berisi satu karakter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} jumlah karakternya harus kurang dari atau sama dengan ${max3} karakter.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} harus ${max3} karakter panjang.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} jumlah karakternya harus lebih dari atau sama dengan ${min3} karakter.`;
    }
    return `${sentence(name)} jumlah karakternya hanya bisa antara ${min3} dan ${max3} karakter.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nilainya tidak diizinkan.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Tidak bisa memiliki lebih dari ${args[0]} ${name}.`;
    }
    return `${sentence(name)} harus lebih kecil atau sama dengan ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Format file tidak diizinkan";
    }
    return `${sentence(name)} hanya bisa bertipe: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Tidak boleh kurang dari ${args[0]} ${name}.`;
    }
    return `${sentence(name)} setidaknya harus berisi ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” adalah nilai yang tidak diperbolehkan untuk ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} harus berupa angka.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} harus diisi.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} tidak dimulai dengan ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Mohon tuliskan url yang benar.`;
  }
};
var id = Object.freeze({
  __proto__: null,
  ui: ui$l,
  validation: validation$l
});
var ui$k = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Inserisci",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Rimuovi",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Rimuovi tutti",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Ci dispiace, non tutti i campi sono compilati correttamente.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Invia",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nessun file selezionato",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Sposta in alto",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Sposta giù",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Caricamento...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Carica altro"
};
var validation$k = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Si prega di accettare ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `la data ${sentence(name)} deve essere successiva ${date2(args[0])}.`;
    }
    return `la data ${sentence(name)} deve essere nel futuro.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} può contenere solo caratteri alfanumerici.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} può contenere solo lettere e numeri.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} può contenere solo lettere e spazi.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `la data ${sentence(name)} deve essere antecedente ${date2(args[0])}.`;
    }
    return `${sentence(name)} deve essere nel passato.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Questo campo è stato configurato male e non può essere inviato.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} deve essere tra ${a} e ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} non corrisponde.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} non è una data valida, per favore usa il formato ${args[0]}`;
    }
    return "Questo campo è stato configurato in modo errato e non può essere inviato.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} deve essere tra ${date2(args[0])} e ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Per favore inserire un indirizzo email valido.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} non termina con ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} non è un valore consentito.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} deve contenere almeno un carattere.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} deve essere minore o uguale a ${max3} caratteri.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} deve contenere ${max3} caratteri.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} deve essere maggiore o uguale a ${min3} caratteri.`;
    }
    return `${sentence(name)} deve essere tra ${min3} e ${max3} caratteri.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} non è un valore consentito.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Non può avere più di ${args[0]} ${name}.`;
    }
    return `${sentence(name)} deve essere minore o uguale a ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Formato file non consentito.";
    }
    return `${sentence(name)} deve essere di tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Non può avere meno di ${args[0]} ${name}.`;
    }
    return `${sentence(name)} deve essere almeno ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" non è un ${name} consentito.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} deve essere un numero.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} è richiesto.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} non inizia con ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Per favore utilizare un url valido.`;
  }
};
var it = Object.freeze({
  __proto__: null,
  ui: ui$k,
  validation: validation$k
});
var ui$j = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "追加",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "削除",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "全て削除",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "項目が正しく入力されていません。",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "送信",
  /**
   * Shown when no files are selected.
   */
  noFiles: "ファイルが選択されていません",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "上に移動",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "下へ移動",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "読み込み中...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "さらに読み込む"
};
var validation$j = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name}の同意が必要です。`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}は${date2(args[0])}より後の日付である必要があります。`;
    }
    return `${sentence(name)}は将来の日付でなければなりません。`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)}には英字のみを含めることができます。`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)}には、文字と数字のみを含めることができます。`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)}には、文字とスペースのみを含めることができます。`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}は${date2(args[0])}より前の日付である必要があります。`;
    }
    return `${sentence(name)}は過去の日付である必要があります。`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `このフィールドは正しく構成されていないため、送信できません。`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)}は${a}と${b}の間にある必要があります。`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)}が一致しません。`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}は有効な日付ではありません。${args[0]}の形式を使用してください。`;
    }
    return "このフィールドは正しく構成されておらず、送信できません。";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)}は${date2(args[0])}と${date2(args[1])}の間にある必要があります。`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "有効なメールアドレスを入力してください。",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)}は${list2(args)}で終わっていません。`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)}は許可された値ではありません。`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)}は少なくとも1文字である必要があります。`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)}は${max3}文字以下である必要があります。`;
    }
    if (min3 === max3) {
      return `${sentence(name)} の長さは ${max3} 文字でなければなりません。`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)}は${min3}文字以上である必要があります。`;
    }
    return `${sentence(name)}は${min3}から${max3}文字の間でなければなりません。`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)}は許可された値ではありません。`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}は${args[0]}を超えることはできません。`;
    }
    return `${sentence(name)}は${args[0]}以下である必要があります。`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "ファイル形式は許可されていません。";
    }
    return `${sentence(name)}は${args[0]}である必要があります。`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}は${args[0]}未満にすることはできません。`;
    }
    return `${sentence(name)}は少なくとも${args[0]}である必要があります。`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}”は許可された${name}ではありません。`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)}は数値でなければなりません。`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)}は必須です。`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)}は${list2(args)}で始まっていません。`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `有効なURLを含めてください。`;
  }
};
var ja = Object.freeze({
  __proto__: null,
  ui: ui$j,
  validation: validation$j
});
var ui$i = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "қосу",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Жою",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Барлығын жою",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Кешіріңіз, барлық өрістер дұрыс толтырылмаған.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Жіберу",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ешбір файл таңдалмады",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Жоғары жылжу",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Төмен жылжытыңыз",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Жүктеу...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Көбірек жүктеңіз"
};
var validation$i = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `қабылдаңыз ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} кейін болуы керек ${date2(args[0])}.`;
    }
    return `${sentence(name)} болашақта болуы керек.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} тек алфавиттік таңбаларды қамтуы мүмкін.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} тек әріптер мен сандардан тұруы мүмкін.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} тек әріптер мен бос орындар болуы мүмкін.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} бұрын болуы керек ${date2(args[0])}.`;
    }
    return `${sentence(name)} өткенде болуы керек.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Бұл өріс қате конфигурацияланған және оны жіберу мүмкін емес.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} арасында болуы керек ${a} және ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} сәйкес келмейді.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} жарамды күн емес, пішімді пайдаланыңыз ${args[0]}`;
    }
    return "Бұл өріс қате конфигурацияланған және оны жіберу мүмкін емес";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} арасында болуы керек ${date2(args[0])} және ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Өтінеміз қолданыстағы электронды пошта адресін енгізіңіз.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} -мен бітпейді ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} рұқсат етілген мән емес.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} кем дегенде бір таңба болуы керек.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} кем немесе тең болуы керек ${max3} кейіпкерлер.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} таңбалары болуы керек.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} артық немесе тең болуы керек ${min3} кейіпкерлер.`;
    }
    return `${sentence(name)} арасында болуы керек ${min3} және ${max3} кейіпкерлер.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} рұқсат етілген мән емес.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `артық болуы мүмкін емес ${args[0]} ${name}.`;
    }
    return `${sentence(name)} кем немесе тең болуы керек ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Файл пішімдері рұқсат етілмейді.";
    }
    return `${sentence(name)} типте болуы керек: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `кем болуы мүмкін емес ${args[0]} ${name}.`;
    }
    return `${sentence(name)} кем дегенде болуы керек ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” рұқсат етілмейді ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} сан болуы керек.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} талап етіледі.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} -ден басталмайды ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Жарамды URL мекенжайын қосыңыз.`;
  }
};
var kk = Object.freeze({
  __proto__: null,
  ui: ui$i,
  validation: validation$i
});
var ui$h = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "추가",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "제거",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "모두 제거",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "모든 값을 채워주세요",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "제출하기",
  /**
   * Shown when no files are selected.
   */
  noFiles: "선택된 파일이 없습니다",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "위로 이동",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "아래로 이동",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "로드 중...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "더 불러오기"
};
var validation$h = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} 올바른 값을 선택 해주세요`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} 이후여야 합니다`;
    }
    return `${sentence(name)} 미래의 날짜여야합니다`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} 알파벳 문자만 포함할 수 있습니다`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} 문자와 숫자만 포함될 수 있습니다`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} 문자와 공백만 포함할 수 있습니다.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} 이전여야 합니다`;
    }
    return `${sentence(name)} 과거의 날짜여야합니다`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `잘못된 구성으로 제출할 수 없습니다`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a}와 ${b} 사이여야 합니다`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} 일치하지 않습니다`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} 유효한 날짜가 아닙니다. ${args[0]}과 같은 형식을 사용해주세요`;
    }
    return "잘못된 구성으로 제출할 수 없습니다";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ${date2(args[0])}에서 ${date2(args[1])} 사이여야 합니다`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "올바른 이메일 주소를 입력해주세요",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)}로 끝나지 않습니다`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} 허용되는 값이 아닙니다`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} 하나 이상의 문자여야 합니다`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3}자 이하여야 합니다`;
    }
    if (min3 === max3) {
      return `${sentence(name)} 는 ${max3} 자 길이여야 합니다.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3} 문자보다 크거나 같아야 합니다`;
    }
    return `${sentence(name)} ${min3}에서 ${max3}자 사이여야 합니다`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} 허용되는 값이 아닙니다`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name} 초과할 수 없습니다`;
    }
    return `${sentence(name)} ${args[0]}보다 작거나 같아야 합니다`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "파일 형식이 허용되지 않습니다";
    }
    return `${sentence(name)} ${args[0]} 유형이어야 합니다`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name}보다 작을 수 없습니다`;
    }
    return `${sentence(name)} ${args[0]} 이상이어야 합니다`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `${value}" 허용되지 않는 ${name}입니다`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} 숫자여야 합니다`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} 필수 값입니다`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)}로 시작하지 않습니다`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `올바른 URL을 입력해주세요`;
  }
};
var ko = Object.freeze({
  __proto__: null,
  ui: ui$h,
  validation: validation$h
});
var ui$g = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Legg til",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Fjern",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Fjern alle",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Beklager, noen felter er ikke fylt ut korrekt.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Send inn",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ingen fil valgt",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Flytt opp",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Flytt ned",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Laster...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Last mer"
};
var validation$g = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Vennligst aksepter ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} må være senere enn ${date2(args[0])}.`;
    }
    return `${sentence(name)} må være i fremtiden.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} kan bare inneholde alfabetiske tegn.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} kan bare inneholde bokstaver og tall.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} kan bare inneholde bokstaver og mellomrom.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} må være tidligere enn ${date2(args[0])}.`;
    }
    return `${sentence(name)} må være i fortiden.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dette feltet er feilkonfigurert og kan ikke innsendes.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} må være mellom ${a} og ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} stemmer ikke overens.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} er ikke en gyldig dato, vennligst bruk formatet ${args[0]}`;
    }
    return "Dette feltet er feilkonfigurert og kan ikke innsendes.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} må være mellom ${date2(args[0])} og ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Vennligst oppgi en gyldig epostadresse.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} slutter ikke med ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} er ikke en tillatt verdi.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} må ha minst ett tegn.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} må ha mindre enn eller nøyaktig ${max3} tegn.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} skal være ${max3} tegn langt.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} må ha mer enn eller nøyaktig ${min3} tegn.`;
    }
    return `${sentence(name)} må ha mellom ${min3} og ${max3} tegn.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} er ikke en tillatt verdi.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke ha mer enn ${args[0]} ${name}.`;
    }
    return `${sentence(name)} må være mindre enn eller nøyaktig ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ingen tillatte filformater.";
    }
    return `${sentence(name)} må være av typen: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan ikke ha mindre enn ${args[0]} ${name}.`;
    }
    return `${sentence(name)} må være minst ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” er ikke en tillatt ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} må være et tall.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} er påkrevd.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} starter ikke med ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Vennligst inkluder en gyldig url.`;
  }
};
var nb = Object.freeze({
  __proto__: null,
  ui: ui$g,
  validation: validation$g
});
var ui$f = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Toevoegen",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Verwijderen",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Alles verwijderen",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Sorry, niet alle velden zijn correct ingevuld.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Versturen",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Geen bestand gekozen",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Naar boven gaan",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Naar beneden verplaatsen",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Aan het laden...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Meer laden"
};
var validation$f = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Accepteer de ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moet na ${date2(args[0])} zijn.`;
    }
    return `${sentence(name)} moet in de toekomst liggen.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} mag alleen alfabetische tekens bevatten.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} mag alleen letters en cijfers bevatten.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} mag alleen letters en spaties bevatten.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} moet vóór ${date2(args[0])} vallen.`;
    }
    return `${sentence(name)} moet in het verleden liggen.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Dit veld is onjuist geconfigureerd en kan niet worden verzonden.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} moet tussen ${a} en ${b} liggen.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} komt niet overeen.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} is geen geldige datum, gebruik de notatie ${args[0]}`;
    }
    return "Dit veld is onjuist geconfigureerd en kan niet worden verzonden";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} moet tussen ${date2(args[0])} en ${date2(args[1])} liggen`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Vul een geldig e-mailadres in.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} eindigt niet met ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} is geen toegestane waarde.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} moet minimaal één teken zijn.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} moet kleiner zijn dan of gelijk zijn aan ${max3} tekens.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} moet ${max3} tekens lang zijn.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} moet groter zijn dan of gelijk zijn aan ${min3} tekens.`;
    }
    return `${sentence(name)} moet tussen de ${min3} en ${max3} tekens bevatten.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} is geen toegestane waarde.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mag niet meer dan ${args[0]} ${name} hebben.`;
    }
    return `${sentence(name)} moet kleiner zijn dan of gelijk zijn aan ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Geen bestandsformaten toegestaan.";
    }
    return `${sentence(name)} moet van het type: ${args[0]} zijn`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Mag niet minder dan ${args[0]} ${name} hebben.`;
    }
    return `${sentence(name)} moet minimaal ${args[0]} zijn.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" is geen toegestane ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} moet een getal zijn.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} is verplicht.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} begint niet met ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Vul een geldige url in.`;
  }
};
var nl = Object.freeze({
  __proto__: null,
  ui: ui$f,
  validation: validation$f
});
var ui$e = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Usuń",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Usuń wszystko",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Nie wszystkie pola zostały wypełnione poprawnie.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Wyślij",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nie wybrano pliku",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Przesuń w górę",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Przesuń w dół",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Ładowanie...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Załaduj więcej"
};
var validation$e = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Proszę zaakceptować ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musi być po ${date2(args[0])}.`;
    }
    return `${sentence(name)} musi być w przyszłości.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `Pole ${sentence(name)} może zawierać tylko znaki alfabetyczne.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `Pole ${sentence(name)} może zawierać tylko znaki alfanumeryczne.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `Pole ${sentence(name)} mogą zawierać tylko litery i spacje.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musi być przed ${date2(args[0])}.`;
    }
    return `${sentence(name)} musi być w przeszłości.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Pole zostało wypełnione niepoprawnie i nie może zostać wysłane.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `Wartość pola ${sentence(name)} musi być pomiędzy ${a} i ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nie pokrywa się.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Wartość pola ${sentence(name)} nie jest poprawną datą, proszę użyć formatu ${args[0]}`;
    }
    return "To pole zostało wypełnione niepoprawnie i nie może zostać wysłane";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `Data w polu ${sentence(name)} musi być pomiędzy ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Proszę wpisać poprawny adres email.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `Pole ${sentence(name)} nie kończy się na ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `Pole ${sentence(name)} nie jest dozwoloną wartością.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `Pole ${sentence(name)} musi posiadać minimum jeden znak.`;
    }
    if (min3 == 0 && max3) {
      return `Pole ${sentence(name)} musi zawierać ${max3} lub mniej znaków.`;
    }
    if (min3 && max3 === Infinity) {
      return `Pole ${sentence(name)} musi zawierać ${min3} lub więcej znaków.`;
    }
    if (min3 === max3) {
      return `Pole ${sentence(name)} musi mieć ${min3} znaków.`;
    }
    return `Pole ${sentence(name)} musi mieć ${min3}-${max3} znaków.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `Pole ${sentence(name)} zawiera niedozwolone znaki.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nie można mieć więcej niż ${args[0]} ${name}.`;
    }
    return `Wartość pola ${sentence(name)} musi być mniejsza lub równa ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nie podano dozwolonych typów plików.";
    }
    return `${sentence(name)} musi być typem: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Musisz podać więcej niż ${args[0]} ${name}.`;
    }
    return ` Musisz podać conajmniej ${args[0]} ${sentence(name)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name }) {
    return `Wartość pola ${name} jest niedozwolona.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} musi być numerem.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `Pole ${sentence(name)} jest wymagane.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `Wartośc pola ${sentence(name)} nie zaczyna się od ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Proszę podać prawidłowy adres url.`;
  }
};
var pl = Object.freeze({
  __proto__: null,
  ui: ui$e,
  validation: validation$e
});
var ui$d = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Adicionar",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Remover",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Deletar tudo",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Desculpe, nem todos os campos foram preenchidos corretamente.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Enviar",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nenhum arquivo",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Mova-se para cima",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Mova-se para baixo",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Carregando...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Carregue mais"
};
var validation$d = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Por favor aceite o ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} deve ser posterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} deve ser no futuro.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} só pode conter caracteres do alfabeto.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} só pode ter letras e números.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} só podem conter letras e espaços.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} deve ser anterior a ${date2(args[0])}.`;
    }
    return `${sentence(name)} deve ser anterior a data atual.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `O campo foi configurado incorretamente e não pode ser enviado.`;
    }
    return `${sentence(name)} deve estar entre ${args[0]} e ${args[1]}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} não confere.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} não é uma data válida, por favor use o formato ${args[0]}`;
    }
    return "O campo foi configurado incorretamente e não pode ser enviado.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} deve ser entre ${date2(args[0])} e ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Por favor informe um e-mail válido.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} não termina com ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} não é um valor permitido.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} deve ter ao menos um caractere.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} não pode ter mais que ${max3} caracteres.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} deve ter ${max3} caracteres.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} deve ter no mínimo ${min3} caracteres.`;
    }
    return `${sentence(name)} deve ter entre ${min3} e ${max3} caracteres.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} não é um valor permitido.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Não pode ter mais que ${args[0]} ${name}.`;
    }
    return `${sentence(name)} deve ser igual ou menor que ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nenhum formato de arquivo permitido.";
    }
    return `${sentence(name)} deve ser do tipo: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Não pode ter menos que ${args[0]} ${name}.`;
    }
    return `${sentence(name)} deve ter pelo menos ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” não permite ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} deve ser um número.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} é obrigatório.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} não começa com ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Por favor informe um url válido.`;
  }
};
var pt = Object.freeze({
  __proto__: null,
  ui: ui$d,
  validation: validation$d
});
var ui$c = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Adăugare",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Elimină",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Elimină tot",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pare rău, unele câmpuri nu sunt corect completate.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Trimite",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nu este selectat nici un fișier",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Mutare în sus",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Mutare în jos",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Se încarcă...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Încărcați mai mult"
};
var validation$c = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Te rog acceptă ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} trebuie să fie după ${date2(args[0])}.`;
    }
    return `${sentence(name)} trebuie sa fie în viitor.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} poate conține doar caractere alafetice.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} poate conține doar litere și numere.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} poate conține doar litere și spații.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} trebuie să preceadă ${date2(args[0])}.`;
    }
    return `${sentence(name)} trebuie să fie în trecut.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Câmpul a fost configurat incorect și nu poate fi trimis.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} trebuie să fie între ${a} și ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} nu se potrivește.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nu este validă, te rog foloște formatul ${args[0]}`;
    }
    return "Câmpul a fost incorect configurat și nu poate fi trimis.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} trebuie să fie între ${date2(args[0])} și ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Te rog folosește o adresă de email validă.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nu se termină cu ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nu este o valoare acceptată.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} trebuie sa conțină cel puțin un caracter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} trebuie sa aibă cel mult ${max3} caractere.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ar trebui să aibă ${max3} caractere lungi.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} trebuie să aibă cel puțin ${min3} caractere.`;
    }
    return `${sentence(name)} trebuie să aibă între ${min3} și ${max3} caractere.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nu este o valoare acceptată.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nu poate avea mai mult decat ${args[0]} ${name}.`;
    }
    return `${sentence(name)} trebuie să fie cel mult egal cu ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Tipul de fișier neacceptat.";
    }
    return `${sentence(name)} trebuie să fie de tipul: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nu poate avea mai puțin decât ${args[0]} ${name}.`;
    }
    return `${sentence(name)} trebuie să fie cel puțin ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nu este o valoare acceptă pentru ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} trebuie să fie un număr.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} este necesar.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nu începe cu ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Te rog include o adresă web validă`;
  }
};
var ro = Object.freeze({
  __proto__: null,
  ui: ui$c,
  validation: validation$c
});
var ui$b = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Добавить",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Удалить",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Убрать все",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Извините, не все поля заполнены верно.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Отправить",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Файл не выбран",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Переместить вверх",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Переместить вниз",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Загрузка...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Загрузить больше"
};
var validation$b = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Пожалуйста, примите ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} должна быть позже ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} должна быть в будущем.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `Поле ${sentence(name)} может содержать только буквы.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `Поле ${sentence(name)} может содержать только буквы и цифры.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} могут содержать только буквы и пробелы.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} должна быть раньше ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} должна быть в прошлом.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Это поле заполнено неверно и не может быть отправлено.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `Поле ${sentence(name)} должно быть между ${a} и ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `Поле ${sentence(name)} не совпадает.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Поле ${sentence(name)} имеет неверную дату. Пожалуйста, используйте формат ${args[0]}`;
    }
    return "Это поле заполнено неверно и не может быть отправлено.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `Дата ${sentence(name)} должна быть между ${date2(args[0])} и ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Пожалуйста, введите действительный электронный адрес.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `Поле ${sentence(name)} не должно заканчиваться на ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `Поле ${sentence(name)} имеет неподустимое значение.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `Поле ${sentence(name)} должно содержать минимум один символ.`;
    }
    if (min3 == 0 && max3) {
      return `Длина поля ${sentence(name)} должна быть меньше или равна ${max3} символам.`;
    }
    if (min3 === max3) {
      return `Длина ${sentence(name)} должна составлять ${max3} символов.`;
    }
    if (min3 && max3 === Infinity) {
      return `Длина поля ${sentence(name)} должна быть больше или равна ${min3} символам.`;
    }
    return `Длина поля ${sentence(name)} должна быть между ${min3} и ${max3} символами.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `Поле ${sentence(name)} имеет недопустимое значение.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не может быть выбрано больше, чем ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} должно быть меньше или равно ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Не указаны поддержиавемые форматы файла.";
    }
    return `Формат файла в поле ${sentence(name)} должен быть: ${args[0]}.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не может быть выбрано меньше, чем ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} должно быть не менее, чем ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” не поддерживается в поле ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `Поле ${sentence(name)} должно быть числом.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `Поле ${sentence(name)} обязательно для заполнения.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `Поле ${sentence(name)} должно начинаться с ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Пожалуйста, введите действительный URL адрес.`;
  }
};
var ru = Object.freeze({
  __proto__: null,
  ui: ui$b,
  validation: validation$b
});
var ui$a = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Pridať",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Odstrániť",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Odstrániť všetko",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Prepáčte, ale nie všetky polia sú vyplnené správne.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Odoslať",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nebol vybraný žiadny súbor",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Posunúť hore",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Posunúť dole",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Načítavanie...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Načítať viac"
};
var validation$a = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prosím zaškrtnite ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí byť za ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí byť v budúcnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} môže obsahovať iba písmená.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} môže obsahovať iba písmená a čísla.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} môže obsahovať iba písmená a medzery.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} musí byť pred ${date2(args[0])}.`;
    }
    return `${sentence(name)} musí byť v minulosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Toto pole bolo nesprávne nakonfigurované a nemôže byť odoslané.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} musí byť medzi ${a} and ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} does not match.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nie je platným dátumom, prosím, použite formát ${args[0]}`;
    }
    return "Toto pole bolo nesprávne nakonfigurované a nemôže byť odoslané.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} musí byť medzi ${date2(args[0])} a ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Prosím, zadajte platnú emailovú adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} nekončí na ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nie je povolená hodnota.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} musí mať najmenej jeden znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} musí byť menšie alebo rovné ako ${max3} znakov.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} by mala mať dĺžku ${max3} znakov.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} musí byť väčšie alebo rovné ako ${min3} znakov.`;
    }
    return `${sentence(name)} musí byť medzi ${min3} až ${max3} znakov.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nie je povolená hodnota.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nie je možné použiť viac než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí byť menšie alebo rovné ako ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nie sú povolené formáty súborov.";
    }
    return `${sentence(name)} musí byť typu: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Nemôže byť menej než ${args[0]} ${name}.`;
    }
    return `${sentence(name)} musí byť minimálne ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nie je povolené hodnota pre ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} musí byť číslo.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je povinné.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} nezačíná s ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Zadajte, prosím, platnú URL adresu.`;
  }
};
var sk = Object.freeze({
  __proto__: null,
  ui: ui$a,
  validation: validation$a
});
var ui$9 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Odstrani",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Odstrani vse",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Nekatera polja niso pravilno izpolnjena.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Pošlji",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Nobena datoteka ni izbrana",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Premakni se navzgor",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Premakni se navzdol",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Nalaganje...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Naloži več"
};
var validation$9 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Prosimo popravite ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti po ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti v prihodnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} lahko vsebuje samo znake abecede.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} lahko vsebuje samo črke in številke.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} lahko vsebuje samo črke in presledke.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti pred ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti v preteklosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `To polje je narobe nastavljeno in ne mora biti izpolnjeno.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} mora biti med ${a} in ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} se ne ujema.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ni pravilen datum, prosimo uporabite format ${args[0]}`;
    }
    return "To polje je narobe nastavljeno in ne mora biti izpolnjeno.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mora biti med ${date2(args[0])} in ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Vnesite veljaven e-poštni naslov.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} se mora kočati z ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ni dovoljena vrednost.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mora vsebovati vsaj en znak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mora vsebovati največ ${max3} znakov.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} mora biti dolg ${max3} znakov.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mora vsebovati vsaj ${min3} znakov.`;
    }
    return `${sentence(name)} mora vsebovati med ${min3} in ${max3} znakov.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ni dovoljena vrednost.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Največ je ${args[0]} ${name}.`;
    }
    return `${sentence(name)} je lahko največ ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nobena vrsta datoteke ni dovoljena.";
    }
    return `${sentence(name)} mora biti tipa: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Najmanj ${args[0]} ${name} je dovoljenih.`;
    }
    return `${sentence(name)} mora biti vsaj ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ni dovoljen(a/o) ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mora biti številka.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je zahtevan(o/a).`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} se mora začeti z ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Vnesite veljavno povezavo.`;
  }
};
var sl = Object.freeze({
  __proto__: null,
  ui: ui$9,
  validation: validation$9
});
var ui$8 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Dodaj",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ukloni",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ukloni sve",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Pojedina polja nisu ispravno ispunjena.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Pošalji",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Fajl nije odabran",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Pomerite se gore",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pomeri se dole",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Učitavanje...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Učitaj više"
};
var validation$8 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Molimo prihvatite ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti posle ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u budućnosti.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} može da sadrži samo abecedne znakove.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} može da sadrži samo slova i brojeve.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} može da sadrži samo slova i razmake.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} mora biti pre ${date2(args[0])}.`;
    }
    return `${sentence(name)} mora biti u prošlosti.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ovo polje je pogrešno konfigurisano i ne može se poslati.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} mora biti između ${a} i ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} se ne podudara.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} nije važeći datum, molimo Vas koristite format ${args[0]}`;
    }
    return "Ovo polje je pogrešno konfigurisano i ne može se poslati";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} mora biti između ${date2(args[0])} i ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Unesite ispravnu e-mail adresu.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} se ne završava sa ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} nije dozvoljena vrednost`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} mora biti najmanje jedan karakter.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} mora biti manji ili jednaki od ${max3} karaktera.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} treba da bude ${max3} znakova dugačak.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} mora biti veći ili jednaki od ${min3} karaktera.`;
    }
    return `${sentence(name)} mora biti između ${min3} i ${max3} karaktera.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} nije dozvoljena vrednost.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne može imati više od ${args[0]} ${name}.`;
    }
    return `${sentence(name)} mora biti manji ili jednaki od ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Nisu dozvoljeni formati datoteka.";
    }
    return `${sentence(name)} mora biti tipa: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Ne može imati manje od ${args[0]} ${name}.`;
    }
    return `${sentence(name)} mora da ima najmanje ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” nije dozvoljeno ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} mora biti broj.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} je obavezno polje.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ne počinje sa ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Molimo unesite važeći URL.`;
  }
};
var sr = Object.freeze({
  __proto__: null,
  ui: ui$8,
  validation: validation$8
});
var ui$7 = {
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Ta bort",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ta bort alla",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Tyvärr är inte alla fält korrekt ifyllda",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Skicka",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ingen fil vald",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Flytta upp",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Flytta ner",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Laddar...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Ladda mer"
};
var validation$7 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Var god acceptera ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} måste vara efter ${date2(args[0])}.`;
    }
    return `${sentence(name)} måste vara framåt i tiden.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} kan enbart innehålla bokstäver i alfabetet.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} kan bara innehålla bokstäver och siffror.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} kan bara innehålla bokstäver och blanksteg.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} måste vara före ${date2(args[0])}.`;
    }
    return `${sentence(name)} måste vara bakåt i tiden.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Det här fältet ställdes inte in korrekt och kan inte användas.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} måste vara mellan ${a} och ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} matchar inte.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} är inte ett giltigt datum, var god använd formatet ${args[0]}`;
    }
    return "Det här fältet ställdes inte in korrekt och kan inte användas";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} måste vara mellan ${date2(args[0])} och ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Var god fyll i en giltig e-postadress.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} slutar inte med ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} är inte ett godkänt värde.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} måste ha minst ett tecken.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} måste vara ${max3} tecken eller färre.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} bör vara ${max3} tecken långa.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} måste vara ${min3} tecken eller fler.`;
    }
    return `${sentence(name)} måste vara mellan ${min3} och ${max3} tecken.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} är inte ett godkänt värde.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan inte ha mer än ${args[0]} ${name}.`;
    }
    return `${sentence(name)} måste vara ${args[0]} eller mindre.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Inga filtyper tillåtna.";
    }
    return `${sentence(name)} måste vara av filtypen: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Kan inte ha mindre än ${args[0]} ${name}.`;
    }
    return `${sentence(name)} måste vara minst ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” är inte ett godkänt ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} måste vara en siffra.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} är obligatoriskt.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} börjar inte med ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Var god fyll i en giltig länk.`;
  }
};
var sv = Object.freeze({
  __proto__: null,
  ui: ui$7,
  validation: validation$7
});
var ui$6 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Илова кардан",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Хориҷ кардан",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Ҳамаро хориҷ кунед",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Бубахшед, на ҳама майдонҳо дуруст пур карда шудаанд.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Пешниҳод кунед",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Ягон файл интихоб нашудааст"
};
var validation$6 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Лутфан ${name}-ро қабул кунед`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} бояд пас аз ${date2(args[0])} бошад.`;
    }
    return `${sentence(name)} бояд дар оянда бошад.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} метавонад танҳо аломатҳои алифборо дар бар гирад.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} метавонад танҳо ҳарфҳо ва рақамҳоро дар бар гирад.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} метавонад танҳо ҳарфҳо ва фосилаҳоро дар бар гирад.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} бояд пеш аз ${date2(args[0])} бошад.`;
    }
    return `${sentence(name)} бояд дар гузашта бошад.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Ин майдон нодуруст танзим шудааст ва онро пешниҳод кардан ғайриимкон аст.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} бояд дар байни ${a} ва ${b} бошад.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} мувофиқат намекунад.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} санаи дуруст нест, лутфан формати ${args[0]}-ро истифода баред`;
    }
    return "Ин майдон нодуруст танзим шудааст ва онро пешниҳод кардан ғайриимкон аст";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} бояд дар байни ${date2(args[0])} ва ${date2(args[1])} бошад`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Лутфан нишонаи имейли амалкунандаро ворид намоед.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} бо ${list2(args)} ба охир намерасад.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} арзиши иҷозатдодашуда нест.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} бояд ҳадди аққал як аломат бошад.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} бояд аз ${max3} аломат камтар ё баробар бошад.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} бояд ${max3} аломат бошад.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} бояд аз ${min3} аломат зиёд ё баробар бошад.`;
    }
    return `${sentence(name)} бояд дар байни ${min3} ва ${max3} аломат бошад.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} арзиши иҷозатдодашуда нест.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Зиёда аз ${args[0]} ${name} дошта наметавонад.`;
    }
    return `${sentence(name)} бояд аз ${args[0]} камтар ё баробар бошад.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Ягон формати файл иҷозат дода намешавад.";
    }
    return `${sentence(name)} бояд чунин намуд бошад: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Камтар аз ${args[0]} ${name} дошта наметавонад.`;
    }
    return `${sentence(name)} бояд ҳадди аққал ${args[0]} бошад.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" ${name} иҷозат дода намешавад.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} бояд рақам бошад.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} лозим аст.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} бо ${list2(args)} оғоз намешавад.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Лутфан URL-и дурустро дохил кунед.`;
  }
};
var tg = Object.freeze({
  __proto__: null,
  ui: ui$6,
  validation: validation$6
});
var ui$5 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "เพิ่ม",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "เอาออก",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "เอาออกทั้งหมด",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "ขออภัย ข้อมูลบางช่องที่กรอกไม่ถูกต้อง",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "ส่ง",
  /**
   * Shown when no files are selected.
   */
  noFiles: "ยังไม่ได้เลือกไฟล์",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "เลื่อนขึ้น",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "เลื่อนลง",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "กำลังโหลด...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "โหลดเพิ่มเติม"
};
var validation$5 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `กรุณายอมรับ ${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} จะต้องเป็นวันที่หลังจาก ${date2(args[0])}`;
    }
    return `${sentence(name)} จะต้องเป็นวันที่ที่ยังไม่มาถึง`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} สามารถเป็นได้แค่ตัวอักษรเท่านั้น`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} สามารถเป็นได้แค่ตัวอักษรและตัวเลขเท่านั้น`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} สามารถเป็นได้แค่ตัวอักษรและเว้นวรรคเท่านั้น`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} จะต้องเป็นวันที่ที่มาก่อน ${date2(args[0])}`;
    }
    return `${sentence(name)} จะต้องเป็นวันที่ที่ผ่านมาแล้ว`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `ช่องนี้ถูกตั้งค่าอย่างไม่ถูกต้อง และจะไม่สามารถส่งข้อมูลได้`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} จะต้องเป็นค่าระหว่าง ${a} และ ${b}`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} ไม่ตรงกัน`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ไม่อยู่ในรูปแบบวันที่ที่ถูกต้อง กรุณากรอกตามรูปแบบ ${args[0]}`;
    }
    return "ช่องนี้ถูกตั้งค่าอย่างไม่ถูกต้อง และจะไม่สามารถส่งข้อมูลได้";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} จะต้องเป็นวันที่ระหว่าง ${date2(args[0])} และ ${date2(args[1])}`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "กรุณากรอกที่อยู่อีเมลทีถูกต้อง",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} จะต้องลงท้ายด้วย ${list2(args)}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ไม่ใช่ค่าที่อนุญาตให้กรอก`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} จะต้องมีความยาวอย่างน้อยหนึ่งตัวอักษร`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} จะต้องมีความยาวไม่เกิน ${max3} ตัวอักษร`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ควรจะเป็น ${max3} ตัวอักษรยาว`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} จะต้องมีความยาว ${min3} ตัวอักษรขึ้นไป`;
    }
    return `${sentence(name)} จะต้องมีความยาวระหว่าง ${min3} และ ${max3} ตัวอักษร`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ไม่ใช่ค่าที่อนุญาตให้กรอก`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `ไม่สามารถเลือกมากกว่า ${args[0]} ${name} ได้`;
    }
    return `${sentence(name)} จะต้องมีค่าไม่เกิน ${args[0]}`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "ไม่มีประเภทของไฟล์ที่อนุญาต";
    }
    return `${sentence(name)} จะต้องเป็นไฟล์ประเภท ${args[0]} เท่านั้น`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `ไม่สามารถเลือกน้อยกว่า ${args[0]} ${name} ได้`;
    }
    return `${sentence(name)} จะต้องมีค่าอย่างน้อย ${args[0]}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ไม่ใช่ค่า ${name} ที่อนุญาตให้กรอก`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} จะต้องเป็นตัวเลขเท่านั้น`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `กรุณากรอก ${sentence(name)}`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} จะต้องเริ่มต้นด้วย ${list2(args)}`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `กรุณาระบุที่อยู่ลิงก์ให้ถูกต้อง`;
  }
};
var th = Object.freeze({
  __proto__: null,
  ui: ui$5,
  validation: validation$5
});
var ui$4 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Ekle",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Kaldır",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hepsini kaldır",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Maalesef, tüm alanlar doğru doldurulmadı.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Gönder",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Dosya yok",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Yukarı Taşı",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Aşağı taşı",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Yükleniyor...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Daha fazla yükle"
};
var validation$4 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Lütfen ${name}'yi kabul edin.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])}'den sonra olmalıdır.`;
    }
    return `${sentence(name)} gelecekte bir zaman olmalıdır.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} sadece alfabetik karakterler içerebilir.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} sadece alfabetik karakterler ve sayı içerebilir.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} yalnızca harf ve boşluk içerebilir.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} tarihinden önce olmalı.`;
    }
    return `${sentence(name)} geçmişte olmalı.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Alan yanlış yapılandırılmış ve gönderilemez.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a} ve ${b} aralığında olmalı.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} eşleşmiyor.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} geçerli bir tarih değil, lütfen ${args[0]} biçimini kullanın.`;
    }
    return "Alan yanlış yapılandırılmış ve gönderilemez.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)}, ${date2(args[0])} ve ${date2(args[1])} aralığında olmalı.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Lütfen geçerli bir e-mail adresi girin.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ile bitmiyor.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} izin verilen bir değer değil.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} en azından bir karakter uzunluğunda olmalı.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3}'e eşit veya daha küçük olmalı.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} ${max3} karakter uzunluğunda olmalıdır.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3}'e eşit veya daha büyük olmalı.`;
    }
    return `${sentence(name)}, ${min3} ve ${max3} karakter uzunluğu aralığında olmalı.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} izin verilen bir değer değil.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}'in uzunluğu ${args[0]}'dan daha uzun olamaz.`;
    }
    return `${sentence(name)} en azından ${args[0]} uzunluğunda veya ona eşit olmalı.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Hiçbir dosya türüne izin verilmez.";
    }
    return `${sentence(name)} şu tiplerden biri olmalı: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}'in uzunluğu ${args[0]}'dan daha kısa olamaz.`;
    }
    return `${sentence(name)} en azından ${args[0]} uzunluğunda olmalı.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” ${name} olamaz.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} sayı olmalı.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} gerekli.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} ile başlamıyor.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Lütfen geçerli bir url dahil edin.`;
  }
};
var tr = Object.freeze({
  __proto__: null,
  ui: ui$4,
  validation: validation$4
});
var ui$3 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Додати",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Видалити",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Видалити все",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Вибачте, не всі поля заповнені правильно.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Відправити",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Файл не вибрано",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Рухатися вгору",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Пересунути вниз",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Завантаження...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Завантажте більше"
};
var validation$3 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Будь ласка, прийміть ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} повинна бути пізніше за ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} має бути в майбутньому.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `Поле ${sentence(name)} може містити лише літери.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `Поле ${sentence(name)} може містити лише літери та цифри.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `Поле ${sentence(name)} може містити лише літери та пробіли.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Дата ${sentence(name)} повинна бути раніше за ${date2(args[0])}.`;
    }
    return `Дата ${sentence(name)} повинна бути в минулому.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Це поле заповнено неправильно і не може бути надіслано.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `Поле ${sentence(name)} повинно бути між ${a} та ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `Поле ${sentence(name)} не збігається.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `Поле ${sentence(name)} має неправильну дату. Будь ласка, використовуйте формат ${args[0]}.`;
    }
    return "Це поле заповнено неправильно і не може бути надіслано.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `Дата ${sentence(name)} повинна бути між ${date2(args[0])} та ${date2(args[1])}.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Будь ласка, введіть дійсну електронну адресу.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `Поле ${sentence(name)} не повинно закінчуватися на ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `Поле ${sentence(name)} має неприпустиме значення.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `Поле ${sentence(name)} має містити щонайменше один символ.`;
    }
    if (min3 == 0 && max3) {
      return `Довжина поля ${sentence(name)} повинна бути меншою або дорівнювати ${max3} символам.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} має бути довжиною ${max3} символів.`;
    }
    if (min3 && max3 === Infinity) {
      return `Довжина поля ${sentence(name)} повинна бути більшою або дорівнювати ${min3} символам.`;
    }
    return `Довжина поля ${sentence(name)} повинна бути між ${min3} та ${max3} символами.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `Поле ${sentence(name)} має неприпустиме значення.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може бути вибрано більше ніж ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} має бути менше або дорівнювати ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Не вказано дозволені типи файлів.";
    }
    return `Тип файлу в полі ${sentence(name)} має бути: ${args[0]}.`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `Не може бути вибрано менше ніж ${args[0]} ${name}.`;
    }
    return `Поле ${sentence(name)} має бути не менше ніж ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}” не дозволено в полі ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `Поле ${sentence(name)} має бути числом.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `Поле ${sentence(name)} є обов'язковим.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `Поле ${sentence(name)} має починатися з ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Будь ласка, введіть дійсну URL-адресу.`;
  }
};
var uk = Object.freeze({
  __proto__: null,
  ui: ui$3,
  validation: validation$3
});
var ui$2 = {
  /**
   * Shown on a button for adding additional items.
   */
  add: "Qo'shish",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "O'chirish",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Hammasini o'chirish",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Kechirasiz, barcha maydonlar to'g'ri to'ldirilmagan.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Yuborish",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Hech qanday fayl tanlanmagan",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Yuqoriga ko’taring",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Pastga siljish",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Yuklanmoqda...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Ko’proq yuklang"
};
var validation$2 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `${name} ni qabul qiling.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} dan keyin bo'lishi kerak.`;
    }
    return `${sentence(name)} kelajakda bo'lishi kerak.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} faqat alifbo tartibidagi belgilardan iborat bo'lishi mumkin.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} faqat harflar va raqamlardan iborat bo'lishi mumkin.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} faqat harf va bo'shliqlardan iborat bo'lishi mumkin.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} ${date2(args[0])} dan oldin bo'lishi kerak`;
    }
    return `${sentence(name)} o'tmishda bo'lishi kerak.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Bu maydon noto'g'ri sozlangan va uni yuborib bo'lmaydi.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} ${a} va ${b} orasida bo'lishi kerak.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} mos emas.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} haqiqiy sana emas, iltimos ${args[0]} formatidan foydalaning`;
    }
    return "Bu maydon noto'g'ri sozlangan va uni yuborib bo'lmaydi";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} ${date2(args[0])} va ${date2(args[1])} oralig'ida bo'lishi kerak`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Iltimos amaldagi e-mail manzilingizni kiriting.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} bilan tugamaydi.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} ruxsat etilgan qiymat emas.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} kamida bitta belgidan iborat bo'lishi kerak.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} ${max3} ta belgidan kam yoki teng bo'lishi kerak.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} bo'lishi kerak ${max3} belgilar uzun.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} ${min3} ta belgidan ko'p yoki teng bo'lishi kerak.`;
    }
    return `${sentence(name)} ${min3} va ${max3} gacha belgilardan iborat bo'lishi kerak.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} ruxsat etilgan qiymat emas.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name} dan ortiq bo'lishi mumkin emas.`;
    }
    return `${sentence(name)} ${args[0]} dan kichik yoki teng bo'lishi kerak.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Fayl formatlariga ruxsat berilmagan.";
    }
    return `${sentence(name)} quyidagi turdagi bo'lishi kerak: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${args[0]} ${name} dan kam bo'lmasligi kerak.`;
    }
    return `${sentence(name)} kamida ${args[0]} bo'lishi kerak.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" ruxsat berilmagan ${name}.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} raqam bo'lishi kerak.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} talab qilinadi.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} ${list2(args)} bilan boshlanmaydi.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `URL emas`;
  }
};
var uz = Object.freeze({
  __proto__: null,
  ui: ui$2,
  validation: validation$2
});
var ui$1 = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "Thêm",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "Xoá",
  /**
   * Shown when there are multiple items to remove at the same time.
   */
  removeAll: "Xoá tất cả",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "Xin lỗi, không phải tất cả các trường đều được nhập đúng.",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "Gửi",
  /**
   * Shown when no files are selected.
   */
  noFiles: "Chưa chọn file",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "Di chuyển lên",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "Di chuyển xuống",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "Đang tải...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "Tải thêm"
};
var validation$1 = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `Hãy đồng ý với ${name}.`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} phải sau ${date2(args[0])}.`;
    }
    return `${sentence(name)} phải trong tương lai.`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)} có thể chỉ bao gồm các chữ cái alphabet.`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)} có thể chỉ bao gồm các chữ cái và chữ số.`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)} chỉ có thể chứa các chữ cái và khoảng trắng.`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} phải trước ${date2(args[0])}.`;
    }
    return `${sentence(name)} phải trong quá khứ.`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `Trường này đã được thiết lập sai và không thể gửi.`;
    }
    const [a, b] = order(args[0], args[1]);
    return `${sentence(name)} phải ở giữa ${a} và ${b}.`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)} không khớp.`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)} không phải ngày hợp lệ, hãy sử dụng định dạng ${args[0]}`;
    }
    return "Trường này đã được thiết lập sai và không thể gửi.";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)} phải ở giữa khoảng từ ${date2(args[0])} đến ${date2(args[1])}.`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "Hãy nhập một địa chỉ email hợp lệ.",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)} không kết thúc với ${list2(args)}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)} không phải một giá trị được cho phép.`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = Number(first) <= Number(second) ? first : second;
    const max3 = Number(second) >= Number(first) ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)} phải có độ dài tối thiểu một ký tự.`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)} phải có độ dài tối đa ${max3} ký tự.`;
    }
    if (min3 === max3) {
      return `${sentence(name)} nên dài ${max3} ký tự.`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)} phải có độ dài tối thiểu ${min3} ký tự.`;
    }
    return `${sentence(name)} phải có độ dài tối đa trong khoảng từ ${min3} đến ${max3} ký tự.`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)} không phải một giá trị được cho phép.`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} không thể lớn hơn ${args[0]}.`;
    }
    return `${sentence(name)} phải tối đa bằng ${args[0]}.`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "Định dạng tệp tin này không được phép.";
    }
    return `${sentence(name)} phải là một trong các dạng: ${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name} không thể nhỏ hơn ${args[0]}.`;
    }
    return `${sentence(name)} phải tối thiểu bằng ${args[0]}.`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `"${value}" không phải giá trị ${name} được phép.`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)} phải là một số.`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)} là bắt buộc.`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)} không bắt đầu với ${list2(args)}.`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `Hãy nhập một URL hợp lệ.`;
  }
};
var vi = Object.freeze({
  __proto__: null,
  ui: ui$1,
  validation: validation$1
});
var ui = {
  /**
   * Shown on buttons for adding new items.
   */
  add: "添加",
  /**
   * Shown when a button to remove items is visible.
   */
  remove: "移除",
  /**
   * Shown when all fields are not filled out correctly.
   */
  incomplete: "抱歉，有些字段未被正确填写",
  /**
   * Shown in a button inside a form to submit the form.
   */
  submit: "提交",
  /**
   * Shown on buttons that move fields up in a list.
   */
  moveUp: "向上移动",
  /**
   * Shown on buttons that move fields down in a list.
   */
  moveDown: "向下移动",
  /**
   * Shown when something is actively loading.
   */
  isLoading: "正在加载...",
  /**
   * Shown when there is more to load.
   */
  loadMore: "加载更多"
};
var validation = {
  /**
   * The value is not an accepted value.
   * @see {@link https://docs.formkit.com/essentials/validation#accepted}
   */
  accepted({ name }) {
    return `请接受${name}`;
  },
  /**
   * The date is not after
   * @see {@link https://docs.formkit.com/essentials/validation#date-after}
   */
  date_after({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}必须晚于${date2(args[0])}`;
    }
    return `${sentence(name)}必须是未来的日期`;
  },
  /**
   * The value is not a letter.
   * @see {@link https://docs.formkit.com/essentials/validation#alpha}
   */
  alpha({ name }) {
    return `${sentence(name)}仅能包含字母字符`;
  },
  /**
   * The value is not alphanumeric
   * @see {@link https://docs.formkit.com/essentials/validation#alphanumeric}
   */
  alphanumeric({ name }) {
    return `${sentence(name)}仅能包含字母和数字`;
  },
  /**
   * The value is not letter and/or spaces
   * @see {@link https://docs.formkit.com/essentials/validation#alpha-spaces}
   */
  alpha_spaces({ name }) {
    return `${sentence(name)}只能包含字母和空格`;
  },
  /**
   * The date is not before
   * @see {@link https://docs.formkit.com/essentials/validation#date-before}
   */
  date_before({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}必须早于${date2(args[0])}`;
    }
    return `${sentence(name)}必须是过去的日期`;
  },
  /**
   * The value is not between two numbers
   * @see {@link https://docs.formkit.com/essentials/validation#between}
   */
  between({ name, args }) {
    if (isNaN(args[0]) || isNaN(args[1])) {
      return `该字段未被正确设置而无法被提交`;
    }
    return `${sentence(name)}必须在${args[0]}和${args[1]}之间`;
  },
  /**
   * The confirmation field does not match
   * @see {@link https://docs.formkit.com/essentials/validation#confirm}
   */
  confirm({ name }) {
    return `${sentence(name)}不匹配`;
  },
  /**
   * The value is not a valid date
   * @see {@link https://docs.formkit.com/essentials/validation#date-format}
   */
  date_format({ name, args }) {
    if (Array.isArray(args) && args.length) {
      return `${sentence(name)}不是一个合法日期，请使用此格式${args[0]}`;
    }
    return "该字段未被正确设置而无法被提交";
  },
  /**
   * Is not within expected date range
   * @see {@link https://docs.formkit.com/essentials/validation#date-between}
   */
  date_between({ name, args }) {
    return `${sentence(name)}必须在${date2(args[0])}和${date2(args[1])}之间`;
  },
  /**
   * Shown when the user-provided value is not a valid email address.
   * @see {@link https://docs.formkit.com/essentials/validation#email}
   */
  email: "请输入一个合法的电子邮件地址",
  /**
   * Does not end with the specified value
   * @see {@link https://docs.formkit.com/essentials/validation#ends-with}
   */
  ends_with({ name, args }) {
    return `${sentence(name)}并未以${list2(args)}结尾`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#is}
   */
  is({ name }) {
    return `${sentence(name)}不是一个允许值`;
  },
  /**
   * Does not match specified length
   * @see {@link https://docs.formkit.com/essentials/validation#length}
   */
  length({ name, args: [first = 0, second = Infinity] }) {
    const min3 = first <= second ? first : second;
    const max3 = second >= first ? second : first;
    if (min3 == 1 && max3 === Infinity) {
      return `${sentence(name)}至少要有一个字符`;
    }
    if (min3 == 0 && max3) {
      return `${sentence(name)}必须少于或等于${max3}个字符`;
    }
    if (min3 === max3) {
      return `${sentence(name)} 的长度应为 ${max3} 个字符。`;
    }
    if (min3 && max3 === Infinity) {
      return `${sentence(name)}必须多于或等于${min3}个字符`;
    }
    return `${sentence(name)}必须有${min3}至${max3}个字符`;
  },
  /**
   * Value is not a match
   * @see {@link https://docs.formkit.com/essentials/validation#matches}
   */
  matches({ name }) {
    return `${sentence(name)}不是一个允许值`;
  },
  /**
   * Exceeds maximum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#max}
   */
  max({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}不能超过${args[0]}`;
    }
    return `${sentence(name)}必须小于或等于${args[0]}`;
  },
  /**
   * The (field-level) value does not match specified mime type
   * @see {@link https://docs.formkit.com/essentials/validation#mime}
   */
  mime({ name, args }) {
    if (!args[0]) {
      return "无允许的文件格式";
    }
    return `${sentence(name)}必须为此类型：${args[0]}`;
  },
  /**
   * Does not fulfill minimum allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#min}
   */
  min({ name, node: { value }, args }) {
    if (Array.isArray(value)) {
      return `${name}不能少于${args[0]}`;
    }
    return `${sentence(name)}不能小于${args[0]}`;
  },
  /**
   * Is not an allowed value
   * @see {@link https://docs.formkit.com/essentials/validation#not}
   */
  not({ name, node: { value } }) {
    return `“${value}”不是一个被允许的${name}`;
  },
  /**
   *  Is not a number
   * @see {@link https://docs.formkit.com/essentials/validation#number}
   */
  number({ name }) {
    return `${sentence(name)}必须是一个数字`;
  },
  /**
   * Required field.
   * @see {@link https://docs.formkit.com/essentials/validation#required}
   */
  required({ name }) {
    return `${sentence(name)}必须填写`;
  },
  /**
   * Does not start with specified value
   * @see {@link https://docs.formkit.com/essentials/validation#starts-with}
   */
  starts_with({ name, args }) {
    return `${sentence(name)}没有以${list2(args)}开头`;
  },
  /**
   * Is not a url
   * @see {@link https://docs.formkit.com/essentials/validation#url}
   */
  url() {
    return `请包含一个合法的url`;
  }
};
var zh = Object.freeze({
  __proto__: null,
  ui,
  validation
});
function createI18nPlugin(registry2) {
  return function i18nPlugin(node) {
    let localeKey = parseLocale(node.config.locale, registry2);
    let locale = localeKey ? registry2[localeKey] : {};
    node.on("prop:locale", ({ payload: lang }) => {
      localeKey = parseLocale(lang, registry2);
      locale = localeKey ? registry2[localeKey] : {};
      node.store.touch();
    });
    node.on("prop:label", () => node.store.touch());
    node.on("prop:validationLabel", () => node.store.touch());
    node.hook.text((fragment2, next) => {
      var _a, _b;
      const key = ((_a = fragment2.meta) === null || _a === void 0 ? void 0 : _a.messageKey) || fragment2.key;
      if (has(locale, fragment2.type) && has(locale[fragment2.type], key)) {
        const t = locale[fragment2.type][key];
        if (typeof t === "function") {
          fragment2.value = Array.isArray((_b = fragment2.meta) === null || _b === void 0 ? void 0 : _b.i18nArgs) ? t(...fragment2.meta.i18nArgs) : t(fragment2);
        } else {
          fragment2.value = t;
        }
      }
      return next(fragment2);
    });
  };
}
function parseLocale(locale, availableLocales) {
  if (has(availableLocales, locale)) {
    return locale;
  }
  const [lang] = locale.split("-");
  if (has(availableLocales, lang)) {
    return lang;
  }
  for (const locale2 in availableLocales) {
    return locale2;
  }
  return false;
}

// node_modules/@formkit/themes/dist/index.mjs
var documentStyles = void 0;
var documentThemeLinkTag = null;
var themeDidLoad;
var themeHasLoaded = false;
var themeWasRequested = false;
var themeLoaded = new Promise((res) => {
  themeDidLoad = () => {
    themeHasLoaded = true;
    res();
  };
});
var isClient = typeof window !== "undefined" && typeof fetch !== "undefined";
documentStyles = isClient ? getComputedStyle(document.documentElement) : void 0;
var iconRegistry = {};
var iconRequests = {};
function createThemePlugin(theme, icons, iconLoaderUrl, iconLoader) {
  if (icons) {
    Object.assign(iconRegistry, icons);
  }
  if (isClient && !themeWasRequested && (documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue("--formkit-theme"))) {
    themeDidLoad();
    themeWasRequested = true;
  } else if (theme && !themeWasRequested && isClient) {
    loadTheme(theme);
  } else if (!themeWasRequested && isClient) {
    themeDidLoad();
  }
  const themePlugin = function themePlugin2(node) {
    var _a, _b;
    node.addProps(["iconLoader", "iconLoaderUrl"]);
    node.props.iconHandler = createIconHandler(((_a = node.props) === null || _a === void 0 ? void 0 : _a.iconLoader) ? node.props.iconLoader : iconLoader, ((_b = node.props) === null || _b === void 0 ? void 0 : _b.iconLoaderUrl) ? node.props.iconLoaderUrl : iconLoaderUrl);
    loadIconPropIcons(node, node.props.iconHandler);
    node.on("created", () => {
      var _a2;
      if ((_a2 = node === null || node === void 0 ? void 0 : node.context) === null || _a2 === void 0 ? void 0 : _a2.handlers) {
        node.context.handlers.iconClick = (sectionKey) => {
          const clickHandlerProp = `on${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}IconClick`;
          const handlerFunction = node.props[clickHandlerProp];
          if (handlerFunction && typeof handlerFunction === "function") {
            return (e) => {
              return handlerFunction(node, e);
            };
          }
          return void 0;
        };
      }
    });
  };
  themePlugin.iconHandler = createIconHandler(iconLoader, iconLoaderUrl);
  return themePlugin;
}
function loadTheme(theme) {
  if (!theme || !isClient || typeof getComputedStyle !== "function") {
    return;
  }
  themeWasRequested = true;
  documentThemeLinkTag = document.getElementById("formkit-theme");
  if (theme && // if we have a window object
  isClient && // we don't have an existing theme OR the theme being set up is different
  (!(documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue("--formkit-theme")) && !documentThemeLinkTag || (documentThemeLinkTag === null || documentThemeLinkTag === void 0 ? void 0 : documentThemeLinkTag.getAttribute("data-theme")) && (documentThemeLinkTag === null || documentThemeLinkTag === void 0 ? void 0 : documentThemeLinkTag.getAttribute("data-theme")) !== theme)) {
    const formkitVersion = FORMKIT_VERSION.startsWith("__") ? "latest" : FORMKIT_VERSION;
    const themeUrl = `https://cdn.jsdelivr.net/npm/@formkit/themes@${formkitVersion}/dist/${theme}/theme.css`;
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "formkit-theme";
    link.setAttribute("data-theme", theme);
    link.onload = () => {
      documentStyles = getComputedStyle(document.documentElement);
      themeDidLoad();
    };
    document.head.appendChild(link);
    link.href = themeUrl;
    if (documentThemeLinkTag) {
      documentThemeLinkTag.remove();
    }
  }
}
function createIconHandler(iconLoader, iconLoaderUrl) {
  return (iconName) => {
    if (typeof iconName === "boolean") {
      return;
    }
    if (iconName.startsWith("<svg")) {
      return iconName;
    }
    if (typeof iconName !== "string")
      return;
    const icon2 = iconRegistry[iconName];
    const isDefault = iconName.startsWith("default:");
    iconName = isDefault ? iconName.split(":")[1] : iconName;
    let loadedIcon = void 0;
    if (icon2 || iconName in iconRegistry) {
      return iconRegistry[iconName];
    } else if (!iconRequests[iconName]) {
      loadedIcon = getIconFromStylesheet(iconName);
      loadedIcon = isClient && typeof loadedIcon === "undefined" ? Promise.resolve(loadedIcon) : loadedIcon;
      if (loadedIcon instanceof Promise) {
        iconRequests[iconName] = loadedIcon.then((iconValue) => {
          if (!iconValue && typeof iconName === "string" && !isDefault) {
            return loadedIcon = typeof iconLoader === "function" ? iconLoader(iconName) : getRemoteIcon(iconName, iconLoaderUrl);
          }
          return iconValue;
        }).then((finalIcon) => {
          if (typeof iconName === "string") {
            iconRegistry[isDefault ? `default:${iconName}` : iconName] = finalIcon;
          }
          return finalIcon;
        });
      } else if (typeof loadedIcon === "string") {
        iconRegistry[isDefault ? `default:${iconName}` : iconName] = loadedIcon;
        return loadedIcon;
      }
    }
    return iconRequests[iconName];
  };
}
function getIconFromStylesheet(iconName) {
  if (!isClient)
    return;
  if (themeHasLoaded) {
    return loadStylesheetIcon(iconName);
  } else {
    return themeLoaded.then(() => {
      return loadStylesheetIcon(iconName);
    });
  }
}
function loadStylesheetIcon(iconName) {
  const cssVarIcon = documentStyles === null || documentStyles === void 0 ? void 0 : documentStyles.getPropertyValue(`--fk-icon-${iconName}`);
  if (cssVarIcon) {
    const icon2 = atob(cssVarIcon);
    if (icon2.startsWith("<svg")) {
      iconRegistry[iconName] = icon2;
      return icon2;
    }
  }
  return void 0;
}
function getRemoteIcon(iconName, iconLoaderUrl) {
  const formkitVersion = FORMKIT_VERSION.startsWith("__") ? "latest" : FORMKIT_VERSION;
  const fetchUrl = typeof iconLoaderUrl === "function" ? iconLoaderUrl(iconName) : `https://cdn.jsdelivr.net/npm/@formkit/icons@${formkitVersion}/dist/icons/${iconName}.svg`;
  if (!isClient)
    return void 0;
  return fetch(`${fetchUrl}`).then(async (r) => {
    const icon2 = await r.text();
    if (icon2.startsWith("<svg")) {
      return icon2;
    }
    return void 0;
  }).catch((e) => {
    console.error(e);
    return void 0;
  });
}
function loadIconPropIcons(node, iconHandler) {
  const iconRegex = /^[a-zA-Z-]+(?:-icon|Icon)$/;
  const iconProps = Object.keys(node.props).filter((prop) => {
    return iconRegex.test(prop);
  });
  iconProps.forEach((sectionKey) => {
    return loadPropIcon(node, iconHandler, sectionKey);
  });
}
function loadPropIcon(node, iconHandler, sectionKey) {
  const iconName = node.props[sectionKey];
  const loadedIcon = iconHandler(iconName);
  const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
  const clickHandlerProp = `on${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}Click`;
  node.addProps([rawIconProp, clickHandlerProp]);
  node.on(`prop:${sectionKey}`, reloadIcon);
  if (loadedIcon instanceof Promise) {
    return loadedIcon.then((svg) => {
      node.props[rawIconProp] = svg;
    });
  } else {
    node.props[rawIconProp] = loadedIcon;
  }
  return;
}
function reloadIcon(event) {
  var _a;
  const node = event.origin;
  const iconName = event.payload;
  const iconHandler = (_a = node === null || node === void 0 ? void 0 : node.props) === null || _a === void 0 ? void 0 : _a.iconHandler;
  const sectionKey = event.name.split(":")[1];
  const rawIconProp = `_raw${sectionKey.charAt(0).toUpperCase()}${sectionKey.slice(1)}`;
  if (iconHandler && typeof iconHandler === "function") {
    const loadedIcon = iconHandler(iconName);
    if (loadedIcon instanceof Promise) {
      return loadedIcon.then((svg) => {
        node.props[rawIconProp] = svg;
      });
    } else {
      node.props[rawIconProp] = loadedIcon;
    }
  }
}

// node_modules/@formkit/dev/dist/index.mjs
var registered = false;
var errors = {
  /**
   * FormKit errors:
   */
  100: ({ data: node }) => `Only groups, lists, and forms can have children (${node.name}).`,
  101: ({ data: node }) => `You cannot directly modify the store (${node.name}). See: https://formkit.com/advanced/core#message-store`,
  102: ({ data: [node, property] }) => `You cannot directly assign node.${property} (${node.name})`,
  103: ({ data: [operator] }) => `Schema expressions cannot start with an operator (${operator})`,
  104: ({ data: [operator, expression] }) => `Schema expressions cannot end with an operator (${operator} in "${expression}")`,
  105: ({ data: expression }) => `Invalid schema expression: ${expression}`,
  106: ({ data: name }) => `Cannot submit because (${name}) is not in a form.`,
  107: ({ data: [node, value] }) => `Cannot set ${node.name} to non object value: ${value}`,
  108: ({ data: [node, value] }) => `Cannot set ${node.name} to non array value: ${value}`,
  /**
   * Input specific errors:
   */
  300: ({ data: [node] }) => `Cannot set behavior prop to overscroll (on ${node.name} input) when options prop is a function.`,
  /**
   * FormKit vue errors:
   */
  600: ({ data: node }) => `Unknown input type${typeof node.props.type === "string" ? ' "' + node.props.type + '"' : ""} ("${node.name}")`,
  601: ({ data: node }) => `Input definition${typeof node.props.type === "string" ? ' "' + node.props.type + '"' : ""} is missing a schema or component property (${node.name}).`
};
var warnings = {
  /**
   * Core warnings:
   */
  150: ({ data: fn }) => `Schema function "${fn}()" is not a valid function.`,
  151: ({ data: id2 }) => `No form element with id: ${id2}`,
  152: ({ data: id2 }) => `No input element with id: ${id2}`,
  /**
   * Input specific warnings:
   */
  350: ({ data: node }) => `Invalid options prop for radio input (${node.name}). See https://formkit.com/inputs/radio`,
  /**
   * Vue warnings:
   */
  650: 'Schema "$get()" must use the id of an input to access.',
  651: ({ data: id2 }) => `Cannot setErrors() on "${id2}" because no such id exists.`,
  652: ({ data: id2 }) => `Cannot clearErrors() on "${id2}" because no such id exists.`,
  /**
   * Deprecation warnings:
   */
  800: ({ data: name }) => `${name} is deprecated.`
};
var decodeErrors = (error2, next) => {
  if (error2.code in errors) {
    const err = errors[error2.code];
    error2.message = typeof err === "function" ? err(error2) : err;
  }
  return next(error2);
};
if (!registered)
  errorHandler(decodeErrors);
var decodeWarnings = (warning, next) => {
  if (warning.code in warnings) {
    const warn2 = warnings[warning.code];
    warning.message = typeof warn2 === "function" ? warn2(warning) : warn2;
  }
  return next(warning);
};
if (!registered)
  warningHandler(decodeWarnings);
registered = true;

// node_modules/@formkit/vue/dist/index.mjs
var memo = {};
var instanceKey;
var instanceScopes = /* @__PURE__ */ new Map();
var raw = "__raw__";
var isClassProp = /[a-zA-Z0-9\-][cC]lass$/;
function getRef(token2, data) {
  const value = ref(null);
  if (token2 === "get") {
    const nodeRefs = {};
    value.value = get$1.bind(null, nodeRefs);
    return value;
  }
  const path = token2.split(".");
  watchEffect(() => value.value = getValue(data, path));
  return value;
}
function getValue(set, path) {
  if (Array.isArray(set)) {
    for (const subset of set) {
      const value = subset !== false && getValue(subset, path);
      if (value !== void 0)
        return value;
    }
    return void 0;
  }
  let foundValue = void 0;
  let obj = set;
  for (const i2 in path) {
    const key = path[i2];
    if (typeof obj !== "object" || obj === null) {
      foundValue = void 0;
      break;
    }
    const currentValue = obj[key];
    if (Number(i2) === path.length - 1 && currentValue !== void 0) {
      foundValue = typeof currentValue === "function" ? currentValue.bind(obj) : currentValue;
      break;
    }
    obj = currentValue;
  }
  return foundValue;
}
function get$1(nodeRefs, id2) {
  if (typeof id2 !== "string")
    return warn(650);
  if (!(id2 in nodeRefs))
    nodeRefs[id2] = ref(void 0);
  if (nodeRefs[id2].value === void 0) {
    nodeRefs[id2].value = null;
    const root = getNode$1(id2);
    if (root)
      nodeRefs[id2].value = root.context;
    watchRegistry(id2, ({ payload: node }) => {
      nodeRefs[id2].value = isNode(node) ? node.context : node;
    });
  }
  return nodeRefs[id2].value;
}
function parseSchema(library, schema) {
  function parseCondition2(library2, node) {
    const condition = provider(compile(node.if), { if: true });
    const children = createElements(library2, node.then);
    const alternate = node.else ? createElements(library2, node.else) : null;
    return [condition, children, alternate];
  }
  function parseConditionAttr(attr, _default) {
    var _a, _b;
    const condition = provider(compile(attr.if));
    let b = () => _default;
    let a = () => _default;
    if (typeof attr.then === "object") {
      a = parseAttrs(attr.then, void 0);
    } else if (typeof attr.then === "string" && ((_a = attr.then) === null || _a === void 0 ? void 0 : _a.startsWith("$"))) {
      a = provider(compile(attr.then));
    } else {
      a = () => attr.then;
    }
    if (has(attr, "else")) {
      if (typeof attr.else === "object") {
        b = parseAttrs(attr.else);
      } else if (typeof attr.else === "string" && ((_b = attr.else) === null || _b === void 0 ? void 0 : _b.startsWith("$"))) {
        b = provider(compile(attr.else));
      } else {
        b = () => attr.else;
      }
    }
    return () => condition() ? a() : b();
  }
  function parseAttrs(unparsedAttrs, bindExp, _default = {}) {
    const explicitAttrs = new Set(Object.keys(unparsedAttrs || {}));
    const boundAttrs = bindExp ? provider(compile(bindExp)) : () => ({});
    const staticAttrs = {};
    const setters = [
      (attrs) => {
        const bound = boundAttrs();
        for (const attr in bound) {
          if (!explicitAttrs.has(attr)) {
            attrs[attr] = bound[attr];
          }
        }
      }
    ];
    if (unparsedAttrs) {
      if (isConditional(unparsedAttrs)) {
        const condition = parseConditionAttr(unparsedAttrs, _default);
        return condition;
      }
      for (let attr in unparsedAttrs) {
        const value = unparsedAttrs[attr];
        let getValue2;
        const isStr = typeof value === "string";
        if (attr.startsWith(raw)) {
          attr = attr.substring(7);
          getValue2 = () => value;
        } else if (isStr && value.startsWith("$") && value.length > 1 && !(value.startsWith("$reset") && isClassProp.test(attr))) {
          getValue2 = provider(compile(value));
        } else if (typeof value === "object" && isConditional(value)) {
          getValue2 = parseConditionAttr(value, void 0);
        } else if (typeof value === "object" && isPojo(value)) {
          getValue2 = parseAttrs(value);
        } else {
          getValue2 = () => value;
          staticAttrs[attr] = value;
        }
        setters.push((attrs) => {
          attrs[attr] = getValue2();
        });
      }
    }
    return () => {
      const attrs = Array.isArray(unparsedAttrs) ? [] : {};
      setters.forEach((setter) => setter(attrs));
      return attrs;
    };
  }
  function parseNode(library2, _node) {
    let element = null;
    let attrs = () => null;
    let condition = false;
    let children = null;
    let alternate = null;
    let iterator = null;
    let resolve = false;
    const node = sugar(_node);
    if (isDOM(node)) {
      element = node.$el;
      attrs = node.$el !== "text" ? parseAttrs(node.attrs, node.bind) : () => null;
    } else if (isComponent(node)) {
      if (typeof node.$cmp === "string") {
        if (has(library2, node.$cmp)) {
          element = library2[node.$cmp];
        } else {
          element = node.$cmp;
          resolve = true;
        }
      } else {
        element = node.$cmp;
      }
      attrs = parseAttrs(node.props, node.bind);
    } else if (isConditional(node)) {
      [condition, children, alternate] = parseCondition2(library2, node);
    }
    if (!isConditional(node) && "if" in node) {
      condition = provider(compile(node.if));
    } else if (!isConditional(node) && element === null) {
      condition = () => true;
    }
    if ("children" in node && node.children) {
      if (typeof node.children === "string") {
        if (node.children.startsWith("$slots.")) {
          element = element === "text" ? "slot" : element;
          children = provider(compile(node.children));
        } else if (node.children.startsWith("$") && node.children.length > 1) {
          const value = provider(compile(node.children));
          children = () => String(value());
        } else {
          children = () => String(node.children);
        }
      } else if (Array.isArray(node.children)) {
        children = createElements(library2, node.children);
      } else {
        const [childCondition, c, a] = parseCondition2(library2, node.children);
        children = (iterationData) => childCondition && childCondition() ? c && c(iterationData) : a && a(iterationData);
      }
    }
    if (isComponent(node)) {
      if (children) {
        const produceChildren = children;
        children = (iterationData) => {
          return {
            default(slotData2, key) {
              var _a, _b, _c, _d;
              const currentKey = instanceKey;
              if (key)
                instanceKey = key;
              if (slotData2)
                (_a = instanceScopes.get(instanceKey)) === null || _a === void 0 ? void 0 : _a.unshift(slotData2);
              if (iterationData)
                (_b = instanceScopes.get(instanceKey)) === null || _b === void 0 ? void 0 : _b.unshift(iterationData);
              const c = produceChildren(iterationData);
              if (slotData2)
                (_c = instanceScopes.get(instanceKey)) === null || _c === void 0 ? void 0 : _c.shift();
              if (iterationData)
                (_d = instanceScopes.get(instanceKey)) === null || _d === void 0 ? void 0 : _d.shift();
              instanceKey = currentKey;
              return c;
            }
          };
        };
        children.slot = true;
      } else {
        children = () => ({});
      }
    }
    if ("for" in node && node.for) {
      const values = node.for.length === 3 ? node.for[2] : node.for[1];
      const getValues = typeof values === "string" && values.startsWith("$") ? provider(compile(values)) : () => values;
      iterator = [
        getValues,
        node.for[0],
        node.for.length === 3 ? String(node.for[1]) : null
      ];
    }
    return [condition, element, attrs, children, alternate, iterator, resolve];
  }
  function createSlots(children, iterationData) {
    const slots = children(iterationData);
    const currentKey = instanceKey;
    return Object.keys(slots).reduce((allSlots, slotName) => {
      const slotFn = slots && slots[slotName];
      allSlots[slotName] = (data) => {
        return slotFn && slotFn(data, currentKey) || null;
      };
      return allSlots;
    }, {});
  }
  function createElement(library2, node) {
    const [condition, element, attrs, children, alternate, iterator, resolve] = parseNode(library2, node);
    let createNodes = (iterationData) => {
      if (condition && element === null && children) {
        return condition() ? children(iterationData) : alternate && alternate(iterationData);
      }
      if (element && (!condition || condition())) {
        if (element === "text" && children) {
          return createTextVNode(String(children()));
        }
        if (element === "slot" && children)
          return children(iterationData);
        const el2 = resolve ? resolveComponent(element) : element;
        const slots = (children === null || children === void 0 ? void 0 : children.slot) ? createSlots(children, iterationData) : null;
        return h(el2, attrs(), slots || (children ? children(iterationData) : []));
      }
      return typeof alternate === "function" ? alternate(iterationData) : alternate;
    };
    if (iterator) {
      const repeatedNode = createNodes;
      const [getValues, valueName, keyName] = iterator;
      createNodes = () => {
        const _v = getValues();
        const values = !isNaN(_v) ? Array(Number(_v)).fill(0).map((_, i2) => i2) : _v;
        const fragment2 = [];
        if (typeof values !== "object")
          return null;
        const instanceScope = instanceScopes.get(instanceKey) || [];
        const isArray = Array.isArray(values);
        for (const key in values) {
          if (isArray && key in Array.prototype)
            continue;
          const iterationData = Object.defineProperty({
            ...instanceScope.reduce((previousIterationData, scopedData) => {
              if (previousIterationData.__idata) {
                return { ...previousIterationData, ...scopedData };
              }
              return scopedData;
            }, {}),
            [valueName]: values[key],
            ...keyName !== null ? { [keyName]: isArray ? Number(key) : key } : {}
          }, "__idata", { enumerable: false, value: true });
          instanceScope.unshift(iterationData);
          fragment2.push(repeatedNode.bind(null, iterationData)());
          instanceScope.shift();
        }
        return fragment2;
      };
    }
    return createNodes;
  }
  function createElements(library2, schema2) {
    if (Array.isArray(schema2)) {
      const els = schema2.map(createElement.bind(null, library2));
      return (iterationData) => els.map((element2) => element2(iterationData));
    }
    const element = createElement(library2, schema2);
    return (iterationData) => element(iterationData);
  }
  const providers = [];
  function provider(compiled, hints = {}) {
    const compiledFns = {};
    providers.push((callback, key) => {
      compiledFns[key] = compiled.provide((tokens) => callback(tokens, hints));
    });
    return () => compiledFns[instanceKey]();
  }
  return function createInstance(providerCallback, key) {
    const memoKey = JSON.stringify(schema);
    const [render, compiledProviders] = has(memo, memoKey) ? memo[memoKey] : [createElements(library, schema), providers];
    memo[memoKey] = [render, compiledProviders];
    compiledProviders.forEach((compiledProvider) => {
      compiledProvider(providerCallback, key);
    });
    return () => {
      instanceKey = key;
      return render();
    };
  };
}
function useScope(token2, defaultValue) {
  const scopedData = instanceScopes.get(instanceKey) || [];
  let scopedValue = void 0;
  if (scopedData.length) {
    scopedValue = getValue(scopedData, token2.split("."));
  }
  return scopedValue === void 0 ? defaultValue : scopedValue;
}
function slotData(data, key) {
  return new Proxy(data, {
    get(...args) {
      let data2 = void 0;
      const property = args[1];
      if (typeof property === "string") {
        const prevKey = instanceKey;
        instanceKey = key;
        data2 = useScope(property, void 0);
        instanceKey = prevKey;
      }
      return data2 !== void 0 ? data2 : Reflect.get(...args);
    }
  });
}
function createRenderFn(instanceCreator, data, instanceKey2) {
  return instanceCreator((requirements, hints = {}) => {
    return requirements.reduce((tokens, token2) => {
      if (token2.startsWith("slots.")) {
        const slot = token2.substring(6);
        const hasSlot = data.slots && has(data.slots, slot);
        if (hints.if) {
          tokens[token2] = () => hasSlot;
        } else if (data.slots && hasSlot) {
          const scopedData = slotData(data, instanceKey2);
          tokens[token2] = () => data.slots[slot](scopedData);
          return tokens;
        }
      }
      const value = getRef(token2, data);
      tokens[token2] = () => useScope(token2, value.value);
      return tokens;
    }, {});
  }, instanceKey2);
}
var i = 0;
var FormKitSchema = defineComponent({
  name: "FormKitSchema",
  props: {
    schema: {
      type: [Array, Object],
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    },
    library: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props2, context) {
    const instance = getCurrentInstance();
    let instanceKey2 = Symbol(String(i++));
    instanceScopes.set(instanceKey2, []);
    let provider = parseSchema(props2.library, props2.schema);
    let render;
    let data;
    watch(() => props2.schema, (newSchema, oldSchema) => {
      var _a;
      instanceKey2 = Symbol(String(i++));
      provider = parseSchema(props2.library, props2.schema);
      render = createRenderFn(provider, data, instanceKey2);
      if (newSchema === oldSchema) {
        ((_a = instance === null || instance === void 0 ? void 0 : instance.proxy) === null || _a === void 0 ? void 0 : _a.$forceUpdate)();
      }
    }, { deep: true });
    watchEffect(() => {
      data = Object.assign(reactive(props2.data), {
        slots: context.slots
      });
      render = createRenderFn(provider, data, instanceKey2);
    });
    return () => render();
  }
});
var nativeProps = {
  config: {
    type: Object,
    default: {}
  },
  classes: {
    type: Object,
    required: false
  },
  delay: {
    type: Number,
    required: false
  },
  errors: {
    type: Array,
    default: []
  },
  inputErrors: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    required: false
  },
  id: {
    type: String,
    required: false
  },
  modelValue: {
    required: false
  },
  name: {
    type: String,
    required: false
  },
  parent: {
    type: Object,
    required: false
  },
  plugins: {
    type: Array,
    default: []
  },
  sectionsSchema: {
    type: Object,
    default: {}
  },
  type: {
    type: [String, Object],
    default: "text"
  },
  validation: {
    type: [String, Array],
    required: false
  },
  validationMessages: {
    type: Object,
    required: false
  },
  validationRules: {
    type: Object,
    required: false
  },
  validationLabel: {
    type: [String, Function],
    required: false
  }
};
var props = nativeProps;
var parentSymbol = Symbol("FormKitParent");
var FormKit = defineComponent({
  props,
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    input: (_value, _node) => true,
    inputRaw: (_value, _node) => true,
    "update:modelValue": (_value) => true,
    node: (node) => !!node,
    submit: (_data, _node) => true,
    submitRaw: (_event, _node) => true,
    submitInvalid: (_node) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  inheritAttrs: false,
  setup(props2, context) {
    const node = useInput(props2, context);
    if (!node.props.definition)
      error(600, node);
    if (node.props.definition.component) {
      return () => {
        var _a;
        return h((_a = node.props.definition) === null || _a === void 0 ? void 0 : _a.component, {
          context: node.context
        }, { ...context.slots });
      };
    }
    const schema = ref([]);
    const generateSchema = () => {
      var _a, _b;
      const schemaDefinition = (_b = (_a = node.props) === null || _a === void 0 ? void 0 : _a.definition) === null || _b === void 0 ? void 0 : _b.schema;
      if (!schemaDefinition)
        error(601, node);
      schema.value = typeof schemaDefinition === "function" ? schemaDefinition({ ...props2.sectionsSchema }) : schemaDefinition;
    };
    generateSchema();
    node.on("schema", generateSchema);
    context.emit("node", node);
    const library = node.props.definition.library;
    context.expose({ node });
    return () => h(FormKitSchema, { schema: schema.value, data: node.context, library }, { ...context.slots });
  }
});
function createPlugin(app, options2) {
  app.component(options2.alias || "FormKit", FormKit).component(options2.schemaAlias || "FormKitSchema", FormKitSchema);
  return {
    get: getNode$1,
    setLocale: (locale) => {
      var _a;
      if ((_a = options2.config) === null || _a === void 0 ? void 0 : _a.rootConfig) {
        options2.config.rootConfig.locale = locale;
      }
    },
    clearErrors,
    setErrors,
    submit: submitForm,
    reset
  };
}
var optionsSymbol = Symbol.for("FormKitOptions");
var configSymbol = Symbol.for("FormKitConfig");
var plugin = {
  install(app, _options) {
    const options2 = Object.assign({
      alias: "FormKit",
      schemaAlias: "FormKitSchema"
    }, typeof _options === "function" ? _options() : _options);
    const rootConfig = createConfig$1(options2.config || {});
    options2.config = { rootConfig };
    app.config.globalProperties.$formkit = createPlugin(app, options2);
    app.provide(optionsSymbol, options2);
    app.provide(configSymbol, rootConfig);
  }
};
var invalidGet = Symbol();
function watchVerbose(obj, callback) {
  const watchers = {};
  const applyWatch = (paths) => {
    for (const path of paths) {
      if (path.__str in watchers)
        watchers[path.__str]();
      watchers[path.__str] = watch(touch.bind(null, obj, path), dispatcher.bind(null, path), { deep: false });
    }
  };
  const clearWatch = (path) => {
    if (!path.length)
      return;
    for (const key in watchers) {
      if (`${key}`.startsWith(`${path.__str}.`)) {
        watchers[key]();
        delete watchers[key];
      }
    }
  };
  const dispatcher = createDispatcher2(obj, callback, applyWatch, clearWatch);
  applyWatch(getPaths(obj));
}
function createDispatcher2(obj, callback, applyWatch, clearChildWatches) {
  return (path) => {
    const value = get(obj, path);
    if (value === invalidGet)
      return;
    if (path.__deep)
      clearChildWatches(path);
    if (typeof value === "object")
      applyWatch(getPaths(value, [path], ...path));
    callback(path, value, obj);
  };
}
function touch(obj, path) {
  const value = get(obj, path);
  return value && typeof value === "object" ? Object.keys(value) : value;
}
function get(obj, path) {
  if (isRef(obj)) {
    if (path.length === 0)
      return obj.value;
    obj = obj.value;
  }
  return path.reduce((value, segment) => {
    if (value === invalidGet)
      return value;
    if (value === null || typeof value !== "object") {
      return invalidGet;
    }
    return value[segment];
  }, obj);
}
function getPaths(obj, paths = [], ...parents) {
  if (obj === null)
    return paths;
  if (!parents.length) {
    const path = Object.defineProperty([], "__str", {
      value: ""
    });
    obj = isRef(obj) ? obj.value : obj;
    if (obj && typeof obj === "object") {
      Object.defineProperty(path, "__deep", { value: true });
      paths.push(path);
    } else {
      return [path];
    }
  }
  if (obj === null || typeof obj !== "object")
    return paths;
  for (const key in obj) {
    const path = parents.concat(key);
    Object.defineProperty(path, "__str", { value: path.join(".") });
    const value = obj[key];
    if (isPojo(value) || Array.isArray(value)) {
      paths.push(Object.defineProperty(path, "__deep", { value: true }));
      paths = paths.concat(getPaths(value, [], ...path));
    } else {
      paths.push(path);
    }
  }
  return paths;
}
function useRaw(obj) {
  if (obj === null || typeof obj !== "object")
    return obj;
  if (isReactive(obj)) {
    obj = toRaw(obj);
  } else if (isRef(obj)) {
    obj = isReactive(obj.value) ? useRaw(obj.value) : obj.value;
  }
  return obj;
}
var pseudoProps = [
  "help",
  "label",
  "ignore",
  "disabled",
  "preserve",
  /^preserve(-e|E)rrors/,
  /^[a-z]+(?:-visibility|Visibility)$/,
  /^[a-zA-Z-]+(?:-class|Class)$/,
  "prefixIcon",
  "suffixIcon",
  /^[a-zA-Z-]+(?:-icon|Icon)$/
];
function classesToNodeProps(node, props2) {
  if (props2.classes) {
    Object.keys(props2.classes).forEach((key) => {
      if (typeof key === "string") {
        node.props[`_${key}Class`] = props2.classes[key];
        if (isObject(props2.classes[key]) && key === "inner")
          Object.values(props2.classes[key]);
      }
    });
  }
}
function onlyListeners(props2) {
  if (!props2)
    return {};
  const knownListeners = ["Submit", "SubmitRaw", "SubmitInvalid"].reduce((listeners, listener) => {
    const name = `on${listener}`;
    if (name in props2) {
      if (typeof props2[name] === "function") {
        listeners[name] = props2[name];
      }
    }
    return listeners;
  }, {});
  return knownListeners;
}
function useInput(props2, context, options2 = {}) {
  const config = Object.assign({}, inject(optionsSymbol) || {}, options2);
  const instance = getCurrentInstance();
  const listeners = onlyListeners(instance === null || instance === void 0 ? void 0 : instance.vnode.props);
  const isVModeled = props2.modelValue !== void 0;
  const value = props2.modelValue !== void 0 ? props2.modelValue : cloneAny(context.attrs.value);
  function createInitialProps() {
    const initialProps2 = {
      ...nodeProps(props2),
      ...listeners
    };
    const attrs = except(nodeProps(context.attrs), pseudoProps);
    if (!attrs.key)
      attrs.key = token();
    initialProps2.attrs = attrs;
    const propValues = only(nodeProps(context.attrs), pseudoProps);
    for (const propName in propValues) {
      initialProps2[camel(propName)] = propValues[propName];
    }
    const classesProps = { props: {} };
    classesToNodeProps(classesProps, props2);
    Object.assign(initialProps2, classesProps.props);
    if (typeof initialProps2.type !== "string") {
      initialProps2.definition = initialProps2.type;
      delete initialProps2.type;
    }
    return initialProps2;
  }
  const initialProps = createInitialProps();
  const parent = initialProps.ignore ? null : props2.parent || inject(parentSymbol, null);
  const node = createNode(extend(config || {}, {
    name: props2.name || void 0,
    value,
    parent,
    plugins: (config.plugins || []).concat(props2.plugins),
    config: props2.config,
    props: initialProps,
    index: props2.index
  }, false, true));
  if (!node.props.definition)
    error(600, node);
  const lateBoundProps = ref(new Set(node.props.definition.props || []));
  node.on("added-props", ({ payload: lateProps }) => {
    if (Array.isArray(lateProps))
      lateProps.forEach((newProp) => lateBoundProps.value.add(newProp));
  });
  const pseudoPropNames = computed(() => pseudoProps.concat([...lateBoundProps.value]).reduce((names, prop) => {
    if (typeof prop === "string") {
      names.push(camel(prop));
      names.push(kebab(prop));
    } else {
      names.push(prop);
    }
    return names;
  }, []));
  watchEffect(() => classesToNodeProps(node, props2));
  const passThrough = nodeProps(props2);
  for (const prop in passThrough) {
    watch(() => props2[prop], () => {
      if (props2[prop] !== void 0) {
        node.props[prop] = props2[prop];
      }
    });
  }
  const attributeWatchers = /* @__PURE__ */ new Set();
  const possibleProps = nodeProps(context.attrs);
  watchEffect(() => {
    watchAttributes(only(possibleProps, pseudoPropNames.value));
  });
  function watchAttributes(attrProps) {
    attributeWatchers.forEach((stop) => {
      stop();
      attributeWatchers.delete(stop);
    });
    for (const prop in attrProps) {
      const camelName = camel(prop);
      attributeWatchers.add(watch(() => context.attrs[prop], () => {
        node.props[camelName] = context.attrs[prop];
      }));
    }
  }
  watchEffect(() => {
    const attrs = except(nodeProps(context.attrs), pseudoPropNames.value);
    node.props.attrs = Object.assign({}, node.props.attrs || {}, attrs);
  });
  watchEffect(() => {
    const messages2 = props2.errors.map((error2) => createMessage({
      key: slugify(error2),
      type: "error",
      value: error2,
      meta: { source: "prop" }
    }));
    node.store.apply(messages2, (message2) => message2.type === "error" && message2.meta.source === "prop");
  });
  if (node.type !== "input") {
    const sourceKey = `${node.name}-prop`;
    watchEffect(() => {
      const keys = Object.keys(props2.inputErrors);
      if (!keys.length)
        node.clearErrors(true, sourceKey);
      const messages2 = keys.reduce((messages3, key) => {
        let value2 = props2.inputErrors[key];
        if (typeof value2 === "string")
          value2 = [value2];
        if (Array.isArray(value2)) {
          messages3[key] = value2.map((error2) => createMessage({
            key: error2,
            type: "error",
            value: error2,
            meta: { source: sourceKey }
          }));
        }
        return messages3;
      }, {});
      node.store.apply(messages2, (message2) => message2.type === "error" && message2.meta.source === sourceKey);
    });
  }
  watchEffect(() => Object.assign(node.config, props2.config));
  if (node.type !== "input") {
    provide(parentSymbol, node);
  }
  let inputTimeout;
  const mutex = /* @__PURE__ */ new WeakSet();
  node.on("modelUpdated", () => {
    var _a, _b;
    context.emit("inputRaw", (_a = node.context) === null || _a === void 0 ? void 0 : _a.value, node);
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(context.emit, 20, "input", (_b = node.context) === null || _b === void 0 ? void 0 : _b.value, node);
    if (isVModeled && node.context) {
      const newValue = useRaw(node.context.value);
      if (isObject(newValue) && useRaw(props2.modelValue) !== newValue) {
        mutex.add(newValue);
      }
      context.emit("update:modelValue", newValue);
    }
  });
  if (isVModeled) {
    watchVerbose(toRef(props2, "modelValue"), (path, value2) => {
      var _a;
      const rawValue = useRaw(value2);
      if (isObject(rawValue) && mutex.has(rawValue)) {
        return mutex.delete(rawValue);
      }
      if (!path.length)
        node.input(value2, false);
      else
        (_a = node.at(path)) === null || _a === void 0 ? void 0 : _a.input(value2, false);
    });
    if (node.value !== value) {
      node.emit("modelUpdated");
    }
  }
  onBeforeUnmount(() => node.destroy());
  return node;
}
var totalCreated = 1;
function isComponent2(obj) {
  return typeof obj === "function" && obj.length === 2 || typeof obj === "object" && !Array.isArray(obj) && !("$el" in obj) && !("$cmp" in obj) && !("if" in obj);
}
function createInput(schemaOrComponent, definitionOptions = {}) {
  const definition = {
    type: "input",
    ...definitionOptions
  };
  let schema;
  if (isComponent2(schemaOrComponent)) {
    const cmpName = `SchemaComponent${totalCreated++}`;
    schema = createSection("input", () => ({
      $cmp: cmpName,
      props: {
        context: "$node.context"
      }
    }));
    definition.library = { [cmpName]: markRaw(schemaOrComponent) };
  } else if (typeof schemaOrComponent === "function") {
    schema = schemaOrComponent;
  } else {
    schema = createSection("input", () => cloneAny(schemaOrComponent));
  }
  definition.schema = useSchema(schema || "Schema undefined");
  return definition;
}
var vueBindings = function vueBindings2(node) {
  node.ledger.count("blocking", (m) => m.blocking);
  const isValid = ref(!node.ledger.value("blocking"));
  node.ledger.count("errors", (m) => m.type === "error");
  const hasErrors = ref(!!node.ledger.value("errors"));
  let hasTicked = false;
  nextTick(() => {
    hasTicked = true;
  });
  const availableMessages = reactive(node.store.reduce((store, message2) => {
    if (message2.visible) {
      store[message2.key] = message2;
    }
    return store;
  }, {}));
  const validationVisibility = ref(node.props.validationVisibility || "blur");
  node.on("prop:validationVisibility", ({ payload }) => {
    validationVisibility.value = payload;
  });
  const hasShownErrors = ref(validationVisibility.value === "live");
  const validationVisible = computed(() => {
    if (context.state.submitted)
      return true;
    if (!hasShownErrors.value && !context.state.settled) {
      return false;
    }
    switch (validationVisibility.value) {
      case "live":
        return true;
      case "blur":
        return context.state.blurred;
      case "dirty":
        return context.state.dirty;
      default:
        return false;
    }
  });
  const isComplete = computed(() => {
    return hasValidation.value ? isValid.value && !hasErrors.value : context.state.dirty && !empty(context.value);
  });
  const hasValidation = ref(Array.isArray(node.props.parsedRules) && node.props.parsedRules.length > 0);
  node.on("prop:parsedRules", ({ payload: rules }) => {
    hasValidation.value = Array.isArray(rules) && rules.length > 0;
  });
  const messages2 = computed(() => {
    const visibleMessages = {};
    for (const key in availableMessages) {
      const message2 = availableMessages[key];
      if (message2.type !== "validation" || validationVisible.value) {
        visibleMessages[key] = message2;
      }
    }
    return visibleMessages;
  });
  const ui2 = reactive(node.store.reduce((messages3, message2) => {
    if (message2.type === "ui" && message2.visible)
      messages3[message2.key] = message2;
    return messages3;
  }, {}));
  const cachedClasses = reactive({});
  const classes = new Proxy(cachedClasses, {
    get(...args) {
      const [target, property] = args;
      let className = Reflect.get(...args);
      if (!className && typeof property === "string") {
        if (!has(target, property) && !property.startsWith("__v")) {
          const observedNode = createObserver(node);
          observedNode.watch((node2) => {
            const rootClasses = typeof node2.config.rootClasses === "function" ? node2.config.rootClasses(property, node2) : {};
            const globalConfigClasses = node2.config.classes ? createClasses(property, node2, node2.config.classes[property]) : {};
            const classesPropClasses = createClasses(property, node2, node2.props[`_${property}Class`]);
            const sectionPropClasses = createClasses(property, node2, node2.props[`${property}Class`]);
            className = generateClassList(node2, property, rootClasses, globalConfigClasses, classesPropClasses, sectionPropClasses);
            target[property] = className;
          });
        }
      }
      return className;
    }
  });
  const describedBy = computed(() => {
    const describers = [];
    if (context.help) {
      describers.push(`help-${node.props.id}`);
    }
    for (const key in messages2.value) {
      describers.push(`${node.props.id}-${key}`);
    }
    return describers.length ? describers.join(" ") : void 0;
  });
  const value = ref(node.value);
  const _value = ref(node.value);
  const context = reactive({
    _value,
    attrs: node.props.attrs,
    disabled: node.props.disabled,
    describedBy,
    fns: {
      length: (obj) => Object.keys(obj).length,
      number: (value2) => Number(value2),
      string: (value2) => String(value2),
      json: (value2) => JSON.stringify(value2),
      eq
    },
    handlers: {
      blur: (e) => {
        node.store.set(createMessage({ key: "blurred", visible: false, value: true }));
        if (typeof node.props.attrs.onBlur === "function") {
          node.props.attrs.onBlur(e);
        }
      },
      touch: () => {
        node.store.set(createMessage({ key: "dirty", visible: false, value: true }));
      },
      DOMInput: (e) => {
        node.input(e.target.value);
        node.emit("dom-input-event", e);
      }
    },
    help: node.props.help,
    id: node.props.id,
    label: node.props.label,
    messages: messages2,
    node: markRaw(node),
    options: node.props.options,
    state: {
      blurred: false,
      complete: isComplete,
      dirty: false,
      submitted: false,
      settled: node.isSettled,
      valid: isValid,
      errors: hasErrors,
      rules: hasValidation,
      validationVisible
    },
    type: node.props.type,
    family: node.props.family,
    ui: ui2,
    value,
    classes
  });
  node.on("created", () => {
    if (!eq(context.value, node.value)) {
      _value.value = node.value;
      value.value = node.value;
      triggerRef(value);
      triggerRef(_value);
    }
    node.props._init = cloneAny(node.value);
  });
  node.on("settled", ({ payload: isSettled }) => {
    context.state.settled = isSettled;
  });
  function observeProps(observe) {
    observe.forEach((prop) => {
      prop = camel(prop);
      if (!has(context, prop) && has(node.props, prop)) {
        context[prop] = node.props[prop];
      }
      node.on(`prop:${prop}`, ({ payload }) => {
        context[prop] = payload;
      });
    });
  }
  const rootProps = () => {
    const props2 = [
      "help",
      "label",
      "disabled",
      "options",
      "type",
      "attrs",
      "preserve",
      "preserveErrors",
      "id"
    ];
    const iconPattern = /^[a-zA-Z-]+(?:-icon|Icon)$/;
    const matchingProps = Object.keys(node.props).filter((prop) => {
      return iconPattern.test(prop);
    });
    return props2.concat(matchingProps);
  };
  observeProps(rootProps());
  function definedAs(definition) {
    if (definition.props)
      observeProps(definition.props);
  }
  node.props.definition && definedAs(node.props.definition);
  node.on("added-props", ({ payload }) => observeProps(payload));
  node.on("input", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      _value.value = shallowClone(payload);
    } else {
      _value.value = payload;
      triggerRef(_value);
    }
  });
  node.on("commit", ({ payload }) => {
    if (node.type !== "input" && !isRef(payload) && !isReactive(payload)) {
      value.value = _value.value = shallowClone(payload);
    } else {
      value.value = _value.value = payload;
      triggerRef(value);
    }
    node.emit("modelUpdated");
    if (!context.state.dirty && node.isCreated && hasTicked && !eq(value.value, node.props._init))
      context.handlers.touch();
    if (isComplete && node.type === "input" && hasErrors.value && !undefine(node.props.preserveErrors)) {
      node.store.filter((message2) => {
        var _a;
        return !(message2.type === "error" && ((_a = message2.meta) === null || _a === void 0 ? void 0 : _a.autoClear) === true);
      });
    }
  });
  const updateState = async (message2) => {
    if (message2.type === "ui" && message2.visible && !message2.meta.showAsMessage) {
      ui2[message2.key] = message2;
    } else if (message2.visible) {
      availableMessages[message2.key] = message2;
    } else if (message2.type === "state") {
      context.state[message2.key] = !!message2.value;
    }
  };
  node.on("message-added", (e) => updateState(e.payload));
  node.on("message-updated", (e) => updateState(e.payload));
  node.on("message-removed", ({ payload: message2 }) => {
    delete ui2[message2.key];
    delete availableMessages[message2.key];
    delete context.state[message2.key];
  });
  node.on("settled:blocking", () => {
    isValid.value = true;
  });
  node.on("unsettled:blocking", () => {
    isValid.value = false;
  });
  node.on("settled:errors", () => {
    hasErrors.value = false;
  });
  node.on("unsettled:errors", () => {
    hasErrors.value = true;
  });
  watch(validationVisible, (value2) => {
    if (value2) {
      hasShownErrors.value = true;
    }
  });
  node.context = context;
  node.emit("context", node, false);
};
var defaultConfig2 = (options2 = {}) => {
  const { rules = {}, locales = {}, inputs: inputs$1 = {}, messages: messages2 = {}, locale = void 0, theme = void 0, iconLoaderUrl = void 0, iconLoader = void 0, icons = {}, ...nodeOptions } = options2;
  const validation2 = createValidationPlugin({
    ...dist_exports,
    ...rules || {}
  });
  const i18n = createI18nPlugin(extend({ en, ...locales || {} }, messages2));
  const library = createLibraryPlugin(index, inputs$1);
  const themePlugin = createThemePlugin(theme, icons, iconLoaderUrl, iconLoader);
  return extend({
    plugins: [library, themePlugin, vueBindings, i18n, validation2],
    ...!locale ? {} : { config: { locale } }
  }, nodeOptions || {}, true);
};
var FormKitIcon = defineComponent({
  name: "FormKitIcon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    iconLoader: {
      type: Function,
      default: null
    },
    iconLoaderUrl: {
      type: Function,
      default: null
    }
  },
  setup(props2) {
    var _a, _b;
    const icon2 = ref(void 0);
    const config = inject(optionsSymbol, {});
    const parent = inject(parentSymbol, null);
    let iconHandler = void 0;
    if (props2.iconLoader && typeof props2.iconLoader === "function") {
      iconHandler = createIconHandler(props2.iconLoader);
    } else if (parent && ((_a = parent.props) === null || _a === void 0 ? void 0 : _a.iconLoader)) {
      iconHandler = createIconHandler(parent.props.iconLoader);
    } else if (props2.iconLoaderUrl && typeof props2.iconLoaderUrl === "function") {
      iconHandler = createIconHandler(iconHandler, props2.iconLoaderUrl);
    } else {
      const iconPlugin = (_b = config === null || config === void 0 ? void 0 : config.plugins) === null || _b === void 0 ? void 0 : _b.find((plugin2) => {
        return typeof plugin2.iconHandler === "function";
      });
      if (iconPlugin) {
        iconHandler = iconPlugin.iconHandler;
      }
    }
    if (iconHandler && typeof iconHandler === "function") {
      const iconOrPromise = iconHandler(props2.icon);
      if (iconOrPromise instanceof Promise) {
        iconOrPromise.then((iconValue) => {
          icon2.value = iconValue;
        });
      } else {
        icon2.value = iconOrPromise;
      }
    }
    return () => {
      if (icon2.value) {
        return h("span", {
          class: "formkit-icon",
          innerHTML: icon2.value
        });
      }
      return null;
    };
  }
});
export {
  FormKit,
  FormKitIcon,
  FormKitSchema,
  vueBindings as bindings,
  clearErrors,
  configSymbol,
  createInput,
  defaultConfig2 as defaultConfig,
  errorHandler,
  optionsSymbol,
  parentSymbol,
  plugin,
  reset,
  resetCount,
  setErrors,
  submitForm,
  useInput,
  watchVerbose
};
//# sourceMappingURL=@formkit_vue.js.map
