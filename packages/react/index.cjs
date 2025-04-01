'use strict';

var react = require('react');
var dom = require('@dnd-kit/dom');
var hooks = require('@dnd-kit/react/hooks');
var state = require('@dnd-kit/state');
var jsxRuntime = require('react/jsx-runtime');
var utilities = require('@dnd-kit/react/utilities');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
var defaultManager = new dom.DragDropManager();
var DragDropContext = react.createContext(
  defaultManager
);
function useRenderer() {
  const [_, startTransition2] = react.useTransition();
  const [transitionCount, setTransitionCount] = react.useState(0);
  const rendering = react.useRef(null);
  const resolver = react.useRef(null);
  const renderer = hooks.useConstant(() => ({
    get rendering() {
      var _a;
      return (_a = rendering.current) != null ? _a : Promise.resolve();
    }
  }));
  hooks.useOnValueChange(
    transitionCount,
    () => {
      var _a;
      (_a = resolver.current) == null ? void 0 : _a.call(resolver);
      rendering.current = null;
    },
    react.useLayoutEffect
  );
  return {
    renderer,
    trackRendering(callback) {
      if (!rendering.current) {
        rendering.current = new Promise((resolve) => {
          resolver.current = resolve;
        });
      }
      startTransition2(() => {
        callback();
        setTransitionCount((count) => count + 1);
      });
    }
  };
}
var options = [void 0, state.deepEqual];
function DragDropProvider(_a) {
  var _b = _a, {
    children,
    onCollision,
    onBeforeDragStart,
    onDragStart,
    onDragMove,
    onDragOver,
    onDragEnd
  } = _b, input = __objRest(_b, [
    "children",
    "onCollision",
    "onBeforeDragStart",
    "onDragStart",
    "onDragMove",
    "onDragOver",
    "onDragEnd"
  ]);
  var _a2;
  const { renderer, trackRendering } = useRenderer();
  const [manager, setManager] = react.useState(
    (_a2 = input.manager) != null ? _a2 : null
  );
  const { plugins, modifiers, sensors } = input;
  const handleBeforeDragStart = hooks.useLatest(onBeforeDragStart);
  const handleDragStart = hooks.useLatest(onDragStart);
  const handleDragOver = hooks.useLatest(onDragOver);
  const handleDragMove = hooks.useLatest(onDragMove);
  const handleDragEnd = hooks.useLatest(onDragEnd);
  const handleCollision = hooks.useLatest(onCollision);
  react.useEffect(() => {
    var _a3;
    const manager2 = (_a3 = input.manager) != null ? _a3 : new dom.DragDropManager(input);
    manager2.renderer = renderer;
    manager2.monitor.addEventListener("beforedragstart", (event, manager3) => {
      const callback = handleBeforeDragStart.current;
      if (callback) {
        trackRendering(() => callback(event, manager3));
      }
    });
    manager2.monitor.addEventListener(
      "dragstart",
      (event, manager3) => {
        var _a4;
        return (_a4 = handleDragStart.current) == null ? void 0 : _a4.call(handleDragStart, event, manager3);
      }
    );
    manager2.monitor.addEventListener("dragover", (event, manager3) => {
      const callback = handleDragOver.current;
      if (callback) {
        trackRendering(() => callback(event, manager3));
      }
    });
    manager2.monitor.addEventListener("dragmove", (event, manager3) => {
      const callback = handleDragMove.current;
      if (callback) {
        trackRendering(() => callback(event, manager3));
      }
    });
    manager2.monitor.addEventListener("dragend", (event, manager3) => {
      const callback = handleDragEnd.current;
      if (callback) {
        trackRendering(() => callback(event, manager3));
      }
    });
    manager2.monitor.addEventListener(
      "collision",
      (event, manager3) => {
        var _a4;
        return (_a4 = handleCollision.current) == null ? void 0 : _a4.call(handleCollision, event, manager3);
      }
    );
    react.startTransition(() => setManager(manager2));
    return manager2.destroy;
  }, [renderer, input.manager]);
  hooks.useOnValueChange(
    plugins,
    () => manager && (manager.plugins = plugins != null ? plugins : dom.defaultPreset.plugins),
    ...options
  );
  hooks.useOnValueChange(
    sensors,
    () => manager && (manager.sensors = sensors != null ? sensors : dom.defaultPreset.sensors),
    ...options
  );
  hooks.useOnValueChange(
    modifiers,
    () => manager && (manager.modifiers = modifiers != null ? modifiers : dom.defaultPreset.modifiers),
    ...options
  );
  return /* @__PURE__ */ jsxRuntime.jsx(DragDropContext.Provider, { value: manager, children });
}
function useDragDropManager() {
  return react.useContext(DragDropContext);
}

// src/core/hooks/useInstance.ts
function useInstance(initializer) {
  var _a;
  const manager = (_a = useDragDropManager()) != null ? _a : void 0;
  const [instance] = react.useState(() => initializer(manager));
  if (instance.manager !== manager) {
    instance.manager = manager;
  }
  hooks.useIsomorphicLayoutEffect(instance.register, [manager, instance]);
  return instance;
}

// src/core/draggable/useDraggable.ts
function useDraggable(input) {
  const { disabled, data, element, handle, id, modifiers, sensors } = input;
  const draggable = useInstance(
    (manager) => new dom.Draggable(
      __spreadProps(__spreadValues({}, input), {
        register: false,
        handle: utilities.currentValue(handle),
        element: utilities.currentValue(element)
      }),
      manager
    )
  );
  const trackedDraggable = hooks.useDeepSignal(draggable, shouldUpdateSynchronously);
  hooks.useOnValueChange(id, () => draggable.id = id);
  hooks.useOnElementChange(handle, (handle2) => draggable.handle = handle2);
  hooks.useOnElementChange(element, (element2) => draggable.element = element2);
  hooks.useOnValueChange(data, () => data && (draggable.data = data));
  hooks.useOnValueChange(disabled, () => draggable.disabled = disabled === true);
  hooks.useOnValueChange(sensors, () => draggable.sensors = sensors);
  hooks.useOnValueChange(
    modifiers,
    () => draggable.modifiers = modifiers,
    void 0,
    state.deepEqual
  );
  hooks.useOnValueChange(
    input.feedback,
    () => {
      var _a;
      return draggable.feedback = (_a = input.feedback) != null ? _a : "default";
    }
  );
  hooks.useOnValueChange(
    input.alignment,
    () => draggable.alignment = input.alignment
  );
  return {
    draggable: trackedDraggable,
    get isDragging() {
      return trackedDraggable.isDragging;
    },
    get isDropping() {
      return trackedDraggable.isDropping;
    },
    get isDragSource() {
      return trackedDraggable.isDragSource;
    },
    handleRef: react.useCallback(
      (element2) => {
        draggable.handle = element2 != null ? element2 : void 0;
      },
      [draggable]
    ),
    ref: react.useCallback(
      (element2) => {
        var _a, _b;
        if (!element2 && ((_a = draggable.element) == null ? void 0 : _a.isConnected) && !((_b = draggable.manager) == null ? void 0 : _b.dragOperation.status.idle)) {
          return;
        }
        draggable.element = element2 != null ? element2 : void 0;
      },
      [draggable]
    )
  };
}
function shouldUpdateSynchronously(key, oldValue, newValue) {
  if (key === "isDragSource" && !newValue && oldValue) return true;
  return false;
}
function DragOverlay({ children, className, style, tag, disableDropAnimation }) {
  const ref = react.useRef(null);
  const manager = useDragDropManager();
  const source = hooks.useComputed(
    () => manager == null ? void 0 : manager.dragOperation.source,
    [manager]
  ).value;
  react.useEffect(() => {
    var _a;
    if (!ref.current || !manager) return;
    const feedback = manager.plugins.find(
      (plugin) => plugin instanceof dom.Feedback
    );
    if (!feedback) return;
    feedback.overlay = ref.current;
    const oldDisableDropAnimation = (_a = feedback.options) == null ? void 0 : _a.disableDropAnimation;
    feedback.options = __spreadProps(__spreadValues({}, feedback.options), { disableDropAnimation });
    return () => {
      feedback.overlay = void 0;
      feedback.options = __spreadProps(__spreadValues({}, feedback.options), { disableDropAnimation: oldDisableDropAnimation });
    };
  }, [manager, disableDropAnimation]);
  const patchedManager = react.useMemo(() => {
    if (!manager) return null;
    const patchedRegistry = new Proxy(manager.registry, {
      get(target, property) {
        if (property === "register" || property === "unregister") {
          return noop;
        }
        return target[property];
      }
    });
    return new Proxy(manager, {
      get(target, property) {
        if (property === "registry") {
          return patchedRegistry;
        }
        return target[property];
      }
    });
  }, [manager]);
  return /* @__PURE__ */ jsxRuntime.jsx(DragDropContext.Provider, { value: patchedManager, children: react.createElement(
    tag || "div",
    { ref, className, style, "data-dnd-overlay": true },
    renderChildren()
  ) });
  function renderChildren() {
    if (!source) return null;
    if (typeof children === "function") {
      return /* @__PURE__ */ jsxRuntime.jsx(Children, { source, children });
    }
    return children;
  }
}
function noop() {
  return () => {
  };
}
function Children({
  children,
  source
}) {
  return children(hooks.useDeepSignal(source));
}
function useDroppable(input) {
  const { collisionDetector, data, disabled, element, id, accept, type } = input;
  const droppable = useInstance(
    (manager) => new dom.Droppable(
      __spreadProps(__spreadValues({}, input), {
        register: false,
        element: utilities.currentValue(element)
      }),
      manager
    )
  );
  const trackedDroppalbe = hooks.useDeepSignal(droppable);
  hooks.useOnValueChange(id, () => droppable.id = id);
  hooks.useOnElementChange(element, (element2) => droppable.element = element2);
  hooks.useOnValueChange(accept, () => droppable.id = id, void 0, state.deepEqual);
  hooks.useOnValueChange(collisionDetector, () => droppable.id = id);
  hooks.useOnValueChange(data, () => data && (droppable.data = data));
  hooks.useOnValueChange(disabled, () => droppable.disabled = disabled === true);
  hooks.useOnValueChange(type, () => droppable.id = id);
  return {
    droppable: trackedDroppalbe,
    get isDropTarget() {
      return trackedDroppalbe.isDropTarget;
    },
    ref: react.useCallback(
      (element2) => {
        var _a, _b;
        if (!element2 && ((_a = droppable.element) == null ? void 0 : _a.isConnected) && !((_b = droppable.manager) == null ? void 0 : _b.dragOperation.status.idle)) {
          return;
        }
        droppable.element = element2 != null ? element2 : void 0;
      },
      [droppable]
    )
  };
}
function useDragDropMonitor(handlers) {
  const manager = useDragDropManager();
  react.useEffect(() => {
    if (!manager) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "useDndMonitor hook was called outside of a DragDropProvider. Make sure your app is wrapped in a DragDropProvider component."
        );
      }
      return;
    }
    const cleanupFns = Object.entries(handlers).reduce(
      (acc, [handlerName, handler]) => {
        if (handler) {
          const eventName = handlerName.replace(/^on/, "").toLowerCase();
          const unsubscribe = manager.monitor.addEventListener(
            eventName,
            handler
          );
          acc.push(unsubscribe);
        }
        return acc;
      },
      []
    );
    return () => cleanupFns.forEach((cleanup) => cleanup == null ? void 0 : cleanup());
  }, [manager, handlers]);
}
function useDragOperation() {
  const manager = useDragDropManager();
  const source = hooks.useComputed(() => manager == null ? void 0 : manager.dragOperation.source, [manager]);
  const target = hooks.useComputed(() => manager == null ? void 0 : manager.dragOperation.target, [manager]);
  return {
    get source() {
      return source.value;
    },
    get target() {
      return target.value;
    }
  };
}

exports.DragDropProvider = DragDropProvider;
exports.DragOverlay = DragOverlay;
exports.useDragDropManager = useDragDropManager;
exports.useDragDropMonitor = useDragDropMonitor;
exports.useDragOperation = useDragOperation;
exports.useDraggable = useDraggable;
exports.useDroppable = useDroppable;
exports.useInstance = useInstance;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map