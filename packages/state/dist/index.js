"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Signal: () => import_signals_core4.Signal,
  batch: () => import_signals_core4.batch,
  computed: () => computed,
  deepEqual: () => deepEqual,
  derived: () => derived,
  effect: () => import_signals_core4.effect,
  effects: () => effects,
  reactive: () => reactive,
  signal: () => import_signals_core4.signal,
  untracked: () => import_signals_core4.untracked
});
module.exports = __toCommonJS(src_exports);
var import_signals_core4 = require("@preact/signals-core");

// src/computed.ts
var import_signals_core = require("@preact/signals-core");
function computed(compute, comparator) {
  if (comparator) {
    let previousValue;
    return (0, import_signals_core.computed)(() => {
      const value = compute();
      if (value && previousValue && comparator(previousValue, value)) {
        return previousValue;
      }
      previousValue = value;
      return value;
    });
  }
  return (0, import_signals_core.computed)(compute);
}

// src/comparators.ts
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a === "function" && typeof b === "function") {
    return a === b;
  }
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) {
      return false;
    }
    for (const value of a) {
      if (!b.has(value)) {
        return false;
      }
    }
    return true;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    const hasDifferentValues = a.some(
      (value, index) => !deepEqual(value, b[index])
    );
    return !hasDifferentValues;
  }
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (e) {
    return false;
  }
}

// src/decorators.ts
var import_signals_core2 = require("@preact/signals-core");
function reactive({ get }, _) {
  return {
    init(value) {
      return (0, import_signals_core2.signal)(value);
    },
    get() {
      const current = get.call(this);
      return current.value;
    },
    set(newValue) {
      const current = get.call(this);
      if (current.peek() === newValue) {
        return;
      }
      current.value = newValue;
    }
  };
}
function derived(target, _) {
  const map = /* @__PURE__ */ new WeakMap();
  return function() {
    let result = map.get(this);
    if (!result) {
      result = computed(target.bind(this));
      map.set(this, result);
    }
    return result.value;
  };
}

// src/effects.ts
var import_signals_core3 = require("@preact/signals-core");
function effects(...entries) {
  const effects2 = entries.map(import_signals_core3.effect);
  return () => effects2.forEach((cleanup) => cleanup());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Signal,
  batch,
  computed,
  deepEqual,
  derived,
  effect,
  effects,
  reactive,
  signal,
  untracked
});
