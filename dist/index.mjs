// src/index.ts
import {
  batch,
  effect as effect2,
  untracked,
  signal as signal2,
  Signal
} from "@preact/signals-core";

// src/computed.ts
import {
  computed as computedSignal
} from "@preact/signals-core";
function computed(compute, comparator) {
  if (comparator) {
    let previousValue;
    return computedSignal(() => {
      const value = compute();
      if (value && previousValue && comparator(previousValue, value)) {
        return previousValue;
      }
      previousValue = value;
      return value;
    });
  }
  return computedSignal(compute);
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
import { signal } from "@preact/signals-core";
function reactive({ get }, _) {
  return {
    init(value) {
      return signal(value);
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
import { effect } from "@preact/signals-core";
function effects(...entries) {
  const effects2 = entries.map(effect);
  return () => effects2.forEach((cleanup) => cleanup());
}
export {
  Signal,
  batch,
  computed,
  deepEqual,
  derived,
  effect2 as effect,
  effects,
  reactive,
  signal2 as signal,
  untracked
};
