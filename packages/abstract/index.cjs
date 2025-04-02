'use strict';

var state = require('@dnd-kit/state');
var geometry = require('@dnd-kit/geometry');

var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __decoratorStart = (base) => {
  var _a;
  return [, , , __create((_a = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a : null)];
};
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/core/plugins/utilities.ts
function configure(plugin, options) {
  return {
    plugin,
    options
  };
}
function configurator(plugin) {
  return (options) => {
    return configure(plugin, options);
  };
}
function descriptor(plugin) {
  if (typeof plugin === "function") {
    return {
      plugin,
      options: void 0
    };
  }
  return plugin;
}

// src/core/plugins/plugin.ts
var _disabled_dec, _init, _disabled, _cleanupFunctions;
_disabled_dec = [state.reactive];
var Plugin = class {
  constructor(manager, options) {
    this.manager = manager;
    this.options = options;
    __privateAdd(this, _disabled, __runInitializers(_init, 8, this, false)), __runInitializers(_init, 11, this);
    __privateAdd(this, _cleanupFunctions, /* @__PURE__ */ new Set());
  }
  /**
   * Enable a disabled plugin instance.
   * Triggers effects.
   */
  enable() {
    this.disabled = false;
  }
  /**
   * Disable an enabled plugin instance.
   * Triggers effects.
   */
  disable() {
    this.disabled = true;
  }
  /**
   * Whether the plugin instance is disabled.
   * Does not trigger effects when accessed.
   */
  isDisabled() {
    return state.untracked(() => {
      return this.disabled;
    });
  }
  /**
   * Configure a plugin instance with new options.
   */
  configure(options) {
    this.options = options;
  }
  /**
   * Register an effect that will be cleaned up when the plugin instance is destroyed.
   * Returns a cleanup function that can be used to dispose of the effect.
   */
  registerEffect(callback) {
    const dispose = state.effect(callback.bind(this));
    __privateGet(this, _cleanupFunctions).add(dispose);
    return dispose;
  }
  /**
   * Destroy a plugin instance.
   */
  destroy() {
    __privateGet(this, _cleanupFunctions).forEach((cleanup) => cleanup());
  }
  /**
   * Configure a plugin constructor with options.
   * This method is used to configure the options that the
   * plugin constructor will use to create plugin instances.
   */
  static configure(options) {
    return configure(this, options);
  }
};
_init = __decoratorStart(null);
_disabled = new WeakMap();
_cleanupFunctions = new WeakMap();
__decorateElement(_init, 4, "disabled", _disabled_dec, Plugin, _disabled);
__decoratorMetadata(_init, Plugin);
var CorePlugin = class extends Plugin {
};

// src/core/plugins/registry.ts
var _previousValues;
var PluginRegistry = class {
  constructor(manager) {
    this.manager = manager;
    this.instances = /* @__PURE__ */ new Map();
    __privateAdd(this, _previousValues, []);
  }
  get values() {
    return Array.from(this.instances.values());
  }
  set values(entries) {
    const descriptors = entries.map(descriptor).reduceRight((acc, descriptor2) => {
      if (acc.some(({ plugin }) => plugin === descriptor2.plugin)) {
        return acc;
      }
      return [descriptor2, ...acc];
    }, []);
    const constructors = descriptors.map(({ plugin }) => plugin);
    for (const plugin of __privateGet(this, _previousValues)) {
      if (!constructors.includes(plugin)) {
        if (plugin.prototype instanceof CorePlugin) {
          continue;
        }
        this.unregister(plugin);
      }
    }
    for (const { plugin, options } of descriptors) {
      this.register(plugin, options);
    }
    __privateSet(this, _previousValues, constructors);
  }
  get(plugin) {
    const instance = this.instances.get(plugin);
    return instance;
  }
  register(plugin, options) {
    const existingInstance = this.instances.get(plugin);
    if (existingInstance) {
      if (existingInstance.options !== options) {
        existingInstance.options = options;
      }
      return existingInstance;
    }
    const instance = new plugin(this.manager, options);
    this.instances.set(plugin, instance);
    return instance;
  }
  unregister(plugin) {
    const instance = this.instances.get(plugin);
    if (instance) {
      instance.destroy();
      this.instances.delete(plugin);
    }
  }
  destroy() {
    for (const plugin of this.instances.values()) {
      plugin.destroy();
    }
    this.instances.clear();
  }
};
_previousValues = new WeakMap();

// src/core/collision/utilities.ts
function sortCollisions(a, b) {
  if (a.priority === b.priority) {
    if (a.type === b.type) {
      return b.value - a.value;
    }
    return b.type - a.type;
  }
  return b.priority - a.priority;
}

// src/core/collision/observer.ts
var DEFAULT_VALUE = [];
var _previousCoordinates, _collisions;
var CollisionObserver = class extends Plugin {
  constructor(manager) {
    super(manager);
    __privateAdd(this, _previousCoordinates);
    __privateAdd(this, _collisions);
    this.computeCollisions = this.computeCollisions.bind(this);
    __privateSet(this, _collisions, state.signal(DEFAULT_VALUE));
    this.destroy = state.effects(
      () => {
        const collisions = this.computeCollisions();
        const coordinates = state.untracked(
          () => this.manager.dragOperation.position.current
        );
        if (collisions !== DEFAULT_VALUE) {
          const previousCoordinates = __privateGet(this, _previousCoordinates);
          __privateSet(this, _previousCoordinates, coordinates);
          if (previousCoordinates && coordinates.x == previousCoordinates.x && coordinates.y == previousCoordinates.y) {
            return;
          }
        } else {
          __privateSet(this, _previousCoordinates, void 0);
        }
        __privateGet(this, _collisions).value = collisions;
      },
      () => {
        const { dragOperation } = this.manager;
        if (dragOperation.status.initialized) {
          this.forceUpdate();
        }
      }
    );
  }
  forceUpdate(immediate = true) {
    state.untracked(() => {
      if (immediate) {
        __privateGet(this, _collisions).value = this.computeCollisions();
      } else {
        __privateSet(this, _previousCoordinates, void 0);
      }
    });
  }
  computeCollisions(entries, collisionDetector) {
    const { registry, dragOperation } = this.manager;
    const { source, shape, status } = dragOperation;
    if (!status.initialized || !shape) {
      return DEFAULT_VALUE;
    }
    const collisions = [];
    const potentialTargets = [];
    for (const entry of entries != null ? entries : registry.droppables) {
      if (entry.disabled) {
        continue;
      }
      if (source && !entry.accepts(source)) {
        continue;
      }
      const detectCollision = collisionDetector != null ? collisionDetector : entry.collisionDetector;
      if (!detectCollision) {
        continue;
      }
      potentialTargets.push(entry);
      void entry.shape;
      const collision = state.untracked(
        () => detectCollision({
          droppable: entry,
          dragOperation
        })
      );
      if (collision) {
        if (entry.collisionPriority != null) {
          collision.priority = entry.collisionPriority;
        }
        collisions.push(collision);
      }
    }
    if (potentialTargets.length === 0) {
      return DEFAULT_VALUE;
    }
    collisions.sort(sortCollisions);
    return collisions;
  }
  get collisions() {
    return __privateGet(this, _collisions).value;
  }
};
_previousCoordinates = new WeakMap();
_collisions = new WeakMap();

// src/core/manager/events.ts
var Monitor = class {
  constructor() {
    this.registry = /* @__PURE__ */ new Map();
  }
  addEventListener(name, handler) {
    const { registry } = this;
    const listeners = new Set(registry.get(name));
    listeners.add(handler);
    registry.set(name, listeners);
    return () => this.removeEventListener(name, handler);
  }
  removeEventListener(name, handler) {
    const { registry } = this;
    const listeners = new Set(registry.get(name));
    listeners.delete(handler);
    registry.set(name, listeners);
  }
  dispatch(name, ...args) {
    const { registry } = this;
    const listeners = registry.get(name);
    if (!listeners) {
      return;
    }
    for (const listener of listeners) {
      listener(...args);
    }
  }
};
var DragDropMonitor = class extends Monitor {
  constructor(manager) {
    super();
    this.manager = manager;
  }
  dispatch(type, event) {
    const args = [event, this.manager];
    super.dispatch(type, ...args);
  }
};
function defaultPreventable(event, cancelable = true) {
  let defaultPrevented = false;
  return __spreadProps(__spreadValues({}, event), {
    cancelable,
    get defaultPrevented() {
      return defaultPrevented;
    },
    preventDefault() {
      if (!cancelable) {
        return;
      }
      defaultPrevented = true;
    }
  });
}

// src/core/collision/notifier.ts
var CollisionNotifier = class extends CorePlugin {
  constructor(manager) {
    super(manager);
    const isEqual = (a, b) => a.map(({ id }) => id).join("") === b.map(({ id }) => id).join("");
    let previousCollisions = [];
    this.destroy = state.effects(
      () => {
        const { dragOperation, collisionObserver } = manager;
        if (dragOperation.status.initializing) {
          previousCollisions = [];
          collisionObserver.enable();
        }
      },
      () => {
        const { collisionObserver, monitor } = manager;
        const { collisions } = collisionObserver;
        if (collisionObserver.isDisabled()) {
          return;
        }
        const event = defaultPreventable({
          collisions
        });
        monitor.dispatch("collision", event);
        if (event.defaultPrevented) {
          return;
        }
        if (isEqual(collisions, previousCollisions)) {
          return;
        } else {
          previousCollisions = collisions;
        }
        const [firstCollision] = collisions;
        state.untracked(() => {
          var _a;
          if ((firstCollision == null ? void 0 : firstCollision.id) !== ((_a = manager.dragOperation.target) == null ? void 0 : _a.id)) {
            collisionObserver.disable();
            manager.actions.setDropTarget(firstCollision == null ? void 0 : firstCollision.id).then(() => {
              collisionObserver.enable();
            });
          }
        });
      }
    );
  }
};

// src/core/collision/types.ts
var CollisionPriority = /* @__PURE__ */ ((CollisionPriority2) => {
  CollisionPriority2[CollisionPriority2["Lowest"] = 0] = "Lowest";
  CollisionPriority2[CollisionPriority2["Low"] = 1] = "Low";
  CollisionPriority2[CollisionPriority2["Normal"] = 2] = "Normal";
  CollisionPriority2[CollisionPriority2["High"] = 3] = "High";
  CollisionPriority2[CollisionPriority2["Highest"] = 4] = "Highest";
  return CollisionPriority2;
})(CollisionPriority || {});
var CollisionType = /* @__PURE__ */ ((CollisionType2) => {
  CollisionType2[CollisionType2["Collision"] = 0] = "Collision";
  CollisionType2[CollisionType2["ShapeIntersection"] = 1] = "ShapeIntersection";
  CollisionType2[CollisionType2["PointerIntersection"] = 2] = "PointerIntersection";
  return CollisionType2;
})(CollisionType || {});
var _disabled_dec2, _data_dec, _id_dec, _manager_dec, _init2, _manager, _id, _data, _disabled2;
_manager_dec = [state.reactive], _id_dec = [state.reactive], _data_dec = [state.reactive], _disabled_dec2 = [state.reactive];
var Entity = class {
  /**
   * Creates a new instance of the `Entity` class.
   *
   * @param input - An object containing the initial properties of the entity.
   * @param manager - The manager that controls the drag and drop operations.
   */
  constructor(input, manager) {
    __privateAdd(this, _manager, __runInitializers(_init2, 8, this)), __runInitializers(_init2, 11, this);
    __privateAdd(this, _id, __runInitializers(_init2, 12, this)), __runInitializers(_init2, 15, this);
    __privateAdd(this, _data, __runInitializers(_init2, 16, this)), __runInitializers(_init2, 19, this);
    __privateAdd(this, _disabled2, __runInitializers(_init2, 20, this)), __runInitializers(_init2, 23, this);
    const { effects: effects5, id, data = {}, disabled = false, register = true } = input;
    let previousId = id;
    this.manager = manager;
    this.id = id;
    this.data = data;
    this.disabled = disabled;
    this.effects = () => {
      var _a;
      return [
        () => {
          const { id: id2, manager: manager2 } = this;
          if (id2 === previousId) {
            return;
          }
          manager2 == null ? void 0 : manager2.registry.register(this);
          return () => manager2 == null ? void 0 : manager2.registry.unregister(this);
        },
        ...(_a = effects5 == null ? void 0 : effects5()) != null ? _a : []
      ];
    };
    this.register = this.register.bind(this);
    this.unregister = this.unregister.bind(this);
    this.destroy = this.destroy.bind(this);
    if (manager && register) {
      queueMicrotask(this.register);
    }
  }
  /**
   * A method that registers the entity with the manager.
   * @returns CleanupFunction | void
   */
  register() {
    var _a;
    return (_a = this.manager) == null ? void 0 : _a.registry.register(this);
  }
  /**
   * A method that unregisters the entity from the manager.
   * @returns void
   */
  unregister() {
    var _a;
    (_a = this.manager) == null ? void 0 : _a.registry.unregister(this);
  }
  /**
   * A method that cleans up the entity when it is no longer needed.
   * @returns void
   */
  destroy() {
    var _a;
    (_a = this.manager) == null ? void 0 : _a.registry.unregister(this);
  }
};
_init2 = __decoratorStart(null);
_manager = new WeakMap();
_id = new WeakMap();
_data = new WeakMap();
_disabled2 = new WeakMap();
__decorateElement(_init2, 4, "manager", _manager_dec, Entity, _manager);
__decorateElement(_init2, 4, "id", _id_dec, Entity, _id);
__decorateElement(_init2, 4, "data", _data_dec, Entity, _data);
__decorateElement(_init2, 4, "disabled", _disabled_dec2, Entity, _disabled2);
__decoratorMetadata(_init2, Entity);
var EntityRegistry = class {
  constructor() {
    this.map = state.signal(/* @__PURE__ */ new Map());
    this.cleanupFunctions = /* @__PURE__ */ new WeakMap();
    /**
     * Registers a entity in the registry.
     * @param key - The unique identifier of the entity.
     * @param value - The entity to register.
     * @returns A function that unregisters the entity.
     */
    this.register = (key, value) => {
      const current = this.map.peek();
      const currentValue = current.get(key);
      const unregister = () => this.unregister(key, value);
      if (currentValue === value) return unregister;
      if (currentValue) {
        const cleanup2 = this.cleanupFunctions.get(currentValue);
        cleanup2 == null ? void 0 : cleanup2();
        this.cleanupFunctions.delete(currentValue);
      }
      const updatedMap = new Map(current);
      updatedMap.set(key, value);
      this.map.value = updatedMap;
      const cleanup = state.effects(...value.effects());
      this.cleanupFunctions.set(value, cleanup);
      return unregister;
    };
    /**
     * Unregisters an entity from the registry.
     * @param key - The unique identifier of the entity.
     * @param value - The entity instance to unregister.
     */
    this.unregister = (key, value) => {
      const current = this.map.peek();
      if (current.get(key) !== value) {
        return;
      }
      const cleanup = this.cleanupFunctions.get(value);
      cleanup == null ? void 0 : cleanup();
      this.cleanupFunctions.delete(value);
      const updatedMap = new Map(current);
      updatedMap.delete(key);
      this.map.value = updatedMap;
    };
  }
  /**
   * Iterator for the EntityRegistry class.
   * @returns An iterator for the values in the map.
   */
  [Symbol.iterator]() {
    return this.map.peek().values();
  }
  get value() {
    return this.map.value.values();
  }
  /**
   * Checks if a entity with the given identifier exists in the registry.
   * @param identifier - The unique identifier of the entity.
   * @returns True if the entity exists, false otherwise.
   */
  has(identifier) {
    return this.map.value.has(identifier);
  }
  /**
   * Retrieves a entity from the registry using its identifier.
   * @param identifier - The unique identifier of the entity.
   * @returns The entity if it exists, undefined otherwise.
   */
  get(identifier) {
    return this.map.value.get(identifier);
  }
  /**
   * Destroys all entries in the registry and clears the registry.
   */
  destroy() {
    for (const entry of this) {
      const cleanup = this.cleanupFunctions.get(entry);
      cleanup == null ? void 0 : cleanup();
      entry.destroy();
    }
    this.map.value = /* @__PURE__ */ new Map();
  }
};
var _isDragSource_dec, _isDragging_dec, _isDropping_dec, _status_dec, _modifiers_dec, _type_dec, _c, _init3, _type, _modifiers, _status;
var Draggable = class extends (_c = Entity, _type_dec = [state.reactive], _modifiers_dec = [state.reactive], _status_dec = [state.reactive], _isDropping_dec = [state.derived], _isDragging_dec = [state.derived], _isDragSource_dec = [state.derived], _c) {
  constructor(_a, manager) {
    var _b = _a, { modifiers, type, sensors } = _b, input = __objRest(_b, ["modifiers", "type", "sensors"]);
    super(input, manager);
    __runInitializers(_init3, 5, this);
    __privateAdd(this, _type, __runInitializers(_init3, 8, this)), __runInitializers(_init3, 11, this);
    __privateAdd(this, _modifiers, __runInitializers(_init3, 12, this)), __runInitializers(_init3, 15, this);
    __privateAdd(this, _status, __runInitializers(_init3, 16, this, this.isDragSource ? "dragging" : "idle")), __runInitializers(_init3, 19, this);
    this.type = type;
    this.sensors = sensors;
    this.modifiers = modifiers;
    this.alignment = input.alignment;
  }
  get isDropping() {
    return this.status === "dropping" && this.isDragSource;
  }
  get isDragging() {
    return this.status === "dragging" && this.isDragSource;
  }
  get isDragSource() {
    var _a, _b;
    return ((_b = (_a = this.manager) == null ? void 0 : _a.dragOperation.source) == null ? void 0 : _b.id) === this.id;
  }
};
_init3 = __decoratorStart(_c);
_type = new WeakMap();
_modifiers = new WeakMap();
_status = new WeakMap();
__decorateElement(_init3, 4, "type", _type_dec, Draggable, _type);
__decorateElement(_init3, 4, "modifiers", _modifiers_dec, Draggable, _modifiers);
__decorateElement(_init3, 4, "status", _status_dec, Draggable, _status);
__decorateElement(_init3, 2, "isDropping", _isDropping_dec, Draggable);
__decorateElement(_init3, 2, "isDragging", _isDragging_dec, Draggable);
__decorateElement(_init3, 2, "isDragSource", _isDragSource_dec, Draggable);
__decoratorMetadata(_init3, Draggable);
var _isDropTarget_dec, _shape_dec, _collisionPriority_dec, _collisionDetector_dec, _type_dec2, _accept_dec, _c2, _init4, _accept, _type2, _collisionDetector, _collisionPriority, _shape;
var Droppable = class extends (_c2 = Entity, _accept_dec = [state.reactive], _type_dec2 = [state.reactive], _collisionDetector_dec = [state.reactive], _collisionPriority_dec = [state.reactive], _shape_dec = [state.reactive], _isDropTarget_dec = [state.derived], _c2) {
  constructor(_a, manager) {
    var _b = _a, { accept, collisionDetector, collisionPriority, type } = _b, input = __objRest(_b, ["accept", "collisionDetector", "collisionPriority", "type"]);
    super(input, manager);
    __runInitializers(_init4, 5, this);
    __privateAdd(this, _accept, __runInitializers(_init4, 8, this)), __runInitializers(_init4, 11, this);
    __privateAdd(this, _type2, __runInitializers(_init4, 12, this)), __runInitializers(_init4, 15, this);
    __privateAdd(this, _collisionDetector, __runInitializers(_init4, 16, this)), __runInitializers(_init4, 19, this);
    __privateAdd(this, _collisionPriority, __runInitializers(_init4, 20, this)), __runInitializers(_init4, 23, this);
    __privateAdd(this, _shape, __runInitializers(_init4, 24, this)), __runInitializers(_init4, 27, this);
    this.accept = accept;
    this.collisionDetector = collisionDetector;
    this.collisionPriority = collisionPriority;
    this.type = type;
  }
  /**
   * Checks whether or not the droppable accepts a given draggable.
   *
   * @param {Draggable} draggable
   * @returns {boolean}
   */
  accepts(draggable) {
    const { accept } = this;
    if (!accept) {
      return true;
    }
    if (typeof accept === "function") {
      return accept(draggable);
    }
    if (!draggable.type) {
      return false;
    }
    if (Array.isArray(accept)) {
      return accept.includes(draggable.type);
    }
    return draggable.type === accept;
  }
  get isDropTarget() {
    var _a, _b;
    return ((_b = (_a = this.manager) == null ? void 0 : _a.dragOperation.target) == null ? void 0 : _b.id) === this.id;
  }
};
_init4 = __decoratorStart(_c2);
_accept = new WeakMap();
_type2 = new WeakMap();
_collisionDetector = new WeakMap();
_collisionPriority = new WeakMap();
_shape = new WeakMap();
__decorateElement(_init4, 4, "accept", _accept_dec, Droppable, _accept);
__decorateElement(_init4, 4, "type", _type_dec2, Droppable, _type2);
__decorateElement(_init4, 4, "collisionDetector", _collisionDetector_dec, Droppable, _collisionDetector);
__decorateElement(_init4, 4, "collisionPriority", _collisionPriority_dec, Droppable, _collisionPriority);
__decorateElement(_init4, 4, "shape", _shape_dec, Droppable, _shape);
__decorateElement(_init4, 2, "isDropTarget", _isDropTarget_dec, Droppable);
__decoratorMetadata(_init4, Droppable);

// src/core/sensors/sensor.ts
var Sensor = class extends Plugin {
  constructor(manager, options) {
    super(manager, options);
    this.manager = manager;
    this.options = options;
  }
};

// src/core/modifiers/modifier.ts
var Modifier = class extends Plugin {
  constructor(manager, options) {
    super(manager, options);
    this.manager = manager;
    this.options = options;
  }
  apply(operation) {
    return operation.transform;
  }
};

// src/core/manager/registry.ts
var DragDropRegistry = class {
  constructor(manager) {
    this.draggables = new EntityRegistry();
    this.droppables = new EntityRegistry();
    this.plugins = new PluginRegistry(manager);
    this.sensors = new PluginRegistry(manager);
    this.modifiers = new PluginRegistry(manager);
  }
  register(input, options) {
    if (input instanceof Draggable) {
      return this.draggables.register(input.id, input);
    }
    if (input instanceof Droppable) {
      return this.droppables.register(input.id, input);
    }
    if (input.prototype instanceof Modifier) {
      return this.modifiers.register(input, options);
    }
    if (input.prototype instanceof Sensor) {
      return this.sensors.register(input, options);
    }
    if (input.prototype instanceof Plugin) {
      return this.plugins.register(input, options);
    }
    throw new Error("Invalid instance type");
  }
  unregister(input) {
    if (input instanceof Entity) {
      if (input instanceof Draggable) {
        return this.draggables.unregister(input.id, input);
      }
      if (input instanceof Droppable) {
        return this.droppables.unregister(input.id, input);
      }
      return () => {
      };
    }
    if (input.prototype instanceof Modifier) {
      return this.modifiers.unregister(input);
    }
    if (input.prototype instanceof Sensor) {
      return this.sensors.unregister(input);
    }
    if (input.prototype instanceof Plugin) {
      return this.plugins.unregister(input);
    }
    throw new Error("Invalid instance type");
  }
  destroy() {
    this.draggables.destroy();
    this.droppables.destroy();
    this.plugins.destroy();
    this.sensors.destroy();
    this.modifiers.destroy();
  }
};
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["Idle"] = "idle";
  Status2["Initializing"] = "initializing";
  Status2["Dragging"] = "dragging";
  Status2["Dropped"] = "dropped";
  return Status2;
})(Status || {});
function DragOperationManager(manager) {
  const {
    registry: { draggables, droppables },
    monitor
  } = manager;
  const status = state.signal("idle" /* Idle */);
  const shape = {
    initial: state.signal(null),
    current: state.signal(null)
  };
  const canceled = state.signal(false);
  const position = new geometry.Position({ x: 0, y: 0 });
  const activatorEvent = state.signal(null);
  const sourceIdentifier = state.signal(null);
  const targetIdentifier = state.signal(null);
  const dragging = state.computed(() => status.value === "dragging" /* Dragging */);
  const initialized = state.computed(() => status.value !== "idle" /* Idle */);
  const initializing = state.computed(() => status.value === "initializing" /* Initializing */);
  const idle = state.computed(() => status.value === "idle" /* Idle */);
  const dropped = state.computed(() => status.value === "dropped" /* Dropped */);
  const dragended = state.signal(true);
  let previousSource;
  const source = state.computed(() => {
    var _a;
    const identifier = sourceIdentifier.value;
    if (identifier == null) return null;
    const value = draggables.get(identifier);
    if (value) {
      previousSource = value;
    }
    return (_a = value != null ? value : previousSource) != null ? _a : null;
  });
  const target = state.computed(() => {
    var _a;
    const identifier = targetIdentifier.value;
    return identifier != null ? (_a = droppables.get(identifier)) != null ? _a : null : null;
  });
  const modifiers = state.signal([]);
  const dispose = state.effect(() => {
    var _a, _b, _c3;
    const currentModifiers = modifiers.peek();
    if (!state.deepEqual(currentModifiers, manager.modifiers)) {
      currentModifiers.forEach((modifier) => modifier.destroy());
    }
    modifiers.value = (_c3 = (_b = (_a = source.value) == null ? void 0 : _a.modifiers) == null ? void 0 : _b.map((modifier) => {
      const { plugin, options } = descriptor(modifier);
      return new plugin(manager, options);
    })) != null ? _c3 : manager.modifiers;
  });
  const transform = state.computed(() => {
    const { x, y } = position.delta;
    let transform2 = { x, y };
    const initialShape = shape.initial.value;
    const currentShape = shape.current.peek();
    const operation2 = {
      activatorEvent: activatorEvent.peek(),
      canceled: canceled.peek(),
      source: source.peek(),
      target: target.peek(),
      status: {
        current: status.peek(),
        idle: idle.peek(),
        initializing: initializing.peek(),
        initialized: initialized.peek(),
        dragging: dragging.peek(),
        dragended: dragended.peek(),
        dropped: dropped.peek()
      },
      shape: initialShape && currentShape ? { initial: initialShape, current: currentShape } : null,
      position
    };
    for (const modifier of modifiers.value) {
      transform2 = modifier.apply(__spreadProps(__spreadValues({}, operation2), { transform: transform2 }));
    }
    return transform2;
  });
  const operation = {
    get activatorEvent() {
      return activatorEvent.value;
    },
    get canceled() {
      return canceled.value;
    },
    get source() {
      return source.value;
    },
    get target() {
      return target.value;
    },
    status: {
      get current() {
        return status.value;
      },
      get idle() {
        return idle.value;
      },
      get initializing() {
        return initializing.value;
      },
      get initialized() {
        return initialized.value;
      },
      get dragging() {
        return dragging.value;
      },
      get dragended() {
        return dragended.value;
      },
      get dropped() {
        return dropped.value;
      }
    },
    get shape() {
      const initial = shape.initial.value;
      const current = shape.current.value;
      return initial && current ? { initial, current } : null;
    },
    set shape(value) {
      var _a;
      if (value && ((_a = shape.current.peek()) == null ? void 0 : _a.equals(value))) {
        return;
      }
      const initial = shape.initial.peek();
      if (!initial) {
        shape.initial.value = value;
      }
      shape.current.value = value;
    },
    get transform() {
      return transform.value;
    },
    position
  };
  const reset = () => {
    state.batch(() => {
      status.value = "idle" /* Idle */;
      sourceIdentifier.value = null;
      targetIdentifier.value = null;
      shape.current.value = null;
      shape.initial.value = null;
      position.reset({ x: 0, y: 0 });
      modifiers.value = [];
    });
  };
  const actions = {
    setDragSource(identifier) {
      sourceIdentifier.value = identifier;
    },
    setDropTarget(identifier) {
      const id = identifier != null ? identifier : null;
      if (targetIdentifier.peek() === id) {
        return Promise.resolve(false);
      }
      targetIdentifier.value = id;
      const event = defaultPreventable({
        operation: snapshot(operation)
      });
      if (status.peek() === "dragging" /* Dragging */) {
        monitor.dispatch("dragover", event);
      }
      return manager.renderer.rendering.then(() => event.defaultPrevented);
    },
    start({
      event: nativeEvent,
      coordinates
    }) {
      const sourceInstance = source.peek();
      if (!sourceInstance) {
        throw new Error("Cannot start a drag operation without a drag source");
      }
      state.batch(() => {
        shape.initial.value = null;
        shape.current.value = null;
        dragended.value = false;
        canceled.value = false;
        activatorEvent.value = nativeEvent != null ? nativeEvent : null;
        position.reset(coordinates);
      });
      const beforeStartEvent = defaultPreventable({
        operation: snapshot(operation)
      });
      monitor.dispatch("beforedragstart", beforeStartEvent);
      manager.renderer.rendering.then(() => {
        if (beforeStartEvent.defaultPrevented) {
          reset();
          return;
        }
        status.value = "initializing" /* Initializing */;
        requestAnimationFrame(() => {
          status.value = "dragging" /* Dragging */;
          monitor.dispatch("dragstart", {
            nativeEvent,
            operation: snapshot(operation),
            cancelable: false
          });
        });
      });
    },
    move({
      by,
      to,
      event: nativeEvent,
      cancelable = true,
      propagate = true
    }) {
      if (!dragging.peek()) {
        return;
      }
      const event = defaultPreventable(
        {
          nativeEvent,
          operation: snapshot(operation),
          by,
          to
        },
        cancelable
      );
      if (propagate) {
        monitor.dispatch("dragmove", event);
      }
      queueMicrotask(() => {
        if (event.defaultPrevented) {
          return;
        }
        const coordinates = to != null ? to : {
          x: position.current.x + by.x,
          y: position.current.y + by.y
        };
        position.update(coordinates);
      });
    },
    stop({
      canceled: eventCanceled = false,
      event: nativeEvent
    } = {}) {
      let promise;
      const suspend = () => {
        const output = {
          resume: () => {
          },
          abort: () => {
          }
        };
        promise = new Promise((resolve, reject) => {
          output.resume = resolve;
          output.abort = reject;
        });
        return output;
      };
      const end = () => {
        manager.renderer.rendering.then(() => {
          status.value = "dropped" /* Dropped */;
          const dropping = state.untracked(() => {
            var _a;
            return ((_a = source.value) == null ? void 0 : _a.status) === "dropping";
          });
          if (dropping) {
            const currentSource = source.value;
            const dispose2 = state.effect(() => {
              if ((currentSource == null ? void 0 : currentSource.status) === "idle") {
                dispose2();
                if (source.value !== currentSource) return;
                reset();
              }
            });
          } else {
            manager.renderer.rendering.then(reset);
          }
        });
      };
      state.batch(() => {
        dragended.value = true;
        canceled.value = eventCanceled;
      });
      monitor.dispatch("dragend", {
        nativeEvent,
        operation: snapshot(operation),
        canceled: eventCanceled,
        suspend
      });
      if (promise) {
        promise.then(end).catch(reset);
      } else {
        end();
      }
    }
  };
  return {
    operation,
    actions,
    cleanup() {
      if (status.peek() !== "idle" /* Idle */) {
        actions.stop({ canceled: true });
      }
      modifiers.value.forEach((modifier) => modifier.destroy());
      dispose();
    }
  };
}
function snapshot(obj) {
  return __spreadValues({}, obj);
}

// src/core/manager/renderer.ts
var defaultRenderer = {
  get rendering() {
    return Promise.resolve();
  }
};

// src/core/manager/manager.ts
var DragDropManager = class {
  constructor(config) {
    this.destroy = () => {
      this.registry.destroy();
      this.collisionObserver.destroy();
    };
    const {
      plugins = [],
      sensors = [],
      modifiers = [],
      renderer = defaultRenderer
    } = config != null ? config : {};
    const monitor = new DragDropMonitor(this);
    const registry = new DragDropRegistry(this);
    this.registry = registry;
    this.monitor = monitor;
    this.renderer = renderer;
    const { actions, operation, cleanup } = DragOperationManager(this);
    this.actions = actions;
    this.dragOperation = operation;
    this.collisionObserver = new CollisionObserver(this);
    this.plugins = [CollisionNotifier, ...plugins];
    this.modifiers = modifiers;
    this.sensors = sensors;
    const { destroy } = this;
    this.destroy = () => {
      cleanup();
      destroy();
    };
  }
  get plugins() {
    return this.registry.plugins.values;
  }
  set plugins(plugins) {
    this.registry.plugins.values = plugins;
  }
  get modifiers() {
    return this.registry.modifiers.values;
  }
  set modifiers(modifiers) {
    this.registry.modifiers.values = modifiers;
  }
  get sensors() {
    return this.registry.sensors.values;
  }
  set sensors(sensors) {
    this.registry.sensors.values = sensors;
  }
};

exports.CollisionPriority = CollisionPriority;
exports.CollisionType = CollisionType;
exports.CorePlugin = CorePlugin;
exports.DragDropManager = DragDropManager;
exports.DragOperationStatus = Status;
exports.Draggable = Draggable;
exports.Droppable = Droppable;
exports.Modifier = Modifier;
exports.Plugin = Plugin;
exports.PluginRegistry = PluginRegistry;
exports.Sensor = Sensor;
exports.configurator = configurator;
exports.configure = configure;
exports.descriptor = descriptor;
exports.sortCollisions = sortCollisions;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map