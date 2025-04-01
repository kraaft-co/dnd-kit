import { createContext, useState, useEffect, startTransition, useContext, useCallback, useRef, useMemo, createElement, useTransition, useLayoutEffect } from 'react';
import { DragDropManager, defaultPreset, Draggable, Feedback, Droppable } from '@dnd-kit/dom';
import { useLatest, useOnValueChange, useIsomorphicLayoutEffect, useDeepSignal, useOnElementChange, useComputed, useConstant } from '@dnd-kit/react/hooks';
import { deepEqual } from '@dnd-kit/state';
import { jsx } from 'react/jsx-runtime';
import { currentValue } from '@dnd-kit/react/utilities';

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
var defaultManager = new DragDropManager();
var DragDropContext = createContext(
  defaultManager
);
function useRenderer() {
  const [_, startTransition2] = useTransition();
  const [transitionCount, setTransitionCount] = useState(0);
  const rendering = useRef(null);
  const resolver = useRef(null);
  const renderer = useConstant(() => ({
    get rendering() {
      var _a;
      return (_a = rendering.current) != null ? _a : Promise.resolve();
    }
  }));
  useOnValueChange(
    transitionCount,
    () => {
      var _a;
      (_a = resolver.current) == null ? void 0 : _a.call(resolver);
      rendering.current = null;
    },
    useLayoutEffect
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
var options = [void 0, deepEqual];
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
  const [manager, setManager] = useState(
    (_a2 = input.manager) != null ? _a2 : null
  );
  const { plugins, modifiers, sensors } = input;
  const handleBeforeDragStart = useLatest(onBeforeDragStart);
  const handleDragStart = useLatest(onDragStart);
  const handleDragOver = useLatest(onDragOver);
  const handleDragMove = useLatest(onDragMove);
  const handleDragEnd = useLatest(onDragEnd);
  const handleCollision = useLatest(onCollision);
  useEffect(() => {
    var _a3;
    const manager2 = (_a3 = input.manager) != null ? _a3 : new DragDropManager(input);
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
    startTransition(() => setManager(manager2));
    return manager2.destroy;
  }, [renderer, input.manager]);
  useOnValueChange(
    plugins,
    () => manager && (manager.plugins = plugins != null ? plugins : defaultPreset.plugins),
    ...options
  );
  useOnValueChange(
    sensors,
    () => manager && (manager.sensors = sensors != null ? sensors : defaultPreset.sensors),
    ...options
  );
  useOnValueChange(
    modifiers,
    () => manager && (manager.modifiers = modifiers != null ? modifiers : defaultPreset.modifiers),
    ...options
  );
  return /* @__PURE__ */ jsx(DragDropContext.Provider, { value: manager, children });
}
function useDragDropManager() {
  return useContext(DragDropContext);
}

// src/core/hooks/useInstance.ts
function useInstance(initializer) {
  var _a;
  const manager = (_a = useDragDropManager()) != null ? _a : void 0;
  const [instance] = useState(() => initializer(manager));
  if (instance.manager !== manager) {
    instance.manager = manager;
  }
  useIsomorphicLayoutEffect(instance.register, [manager, instance]);
  return instance;
}

// src/core/draggable/useDraggable.ts
function useDraggable(input) {
  const { disabled, data, element, handle, id, modifiers, sensors } = input;
  const draggable = useInstance(
    (manager) => new Draggable(
      __spreadProps(__spreadValues({}, input), {
        register: false,
        handle: currentValue(handle),
        element: currentValue(element)
      }),
      manager
    )
  );
  const trackedDraggable = useDeepSignal(draggable, shouldUpdateSynchronously);
  useOnValueChange(id, () => draggable.id = id);
  useOnElementChange(handle, (handle2) => draggable.handle = handle2);
  useOnElementChange(element, (element2) => draggable.element = element2);
  useOnValueChange(data, () => data && (draggable.data = data));
  useOnValueChange(disabled, () => draggable.disabled = disabled === true);
  useOnValueChange(sensors, () => draggable.sensors = sensors);
  useOnValueChange(
    modifiers,
    () => draggable.modifiers = modifiers,
    void 0,
    deepEqual
  );
  useOnValueChange(
    input.feedback,
    () => {
      var _a;
      return draggable.feedback = (_a = input.feedback) != null ? _a : "default";
    }
  );
  useOnValueChange(
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
    handleRef: useCallback(
      (element2) => {
        draggable.handle = element2 != null ? element2 : void 0;
      },
      [draggable]
    ),
    ref: useCallback(
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
  const ref = useRef(null);
  const manager = useDragDropManager();
  const source = useComputed(
    () => manager == null ? void 0 : manager.dragOperation.source,
    [manager]
  ).value;
  useEffect(() => {
    var _a;
    if (!ref.current || !manager) return;
    const feedback = manager.plugins.find(
      (plugin) => plugin instanceof Feedback
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
  const patchedManager = useMemo(() => {
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
  return /* @__PURE__ */ jsx(DragDropContext.Provider, { value: patchedManager, children: createElement(
    tag || "div",
    { ref, className, style, "data-dnd-overlay": true },
    renderChildren()
  ) });
  function renderChildren() {
    if (!source) return null;
    if (typeof children === "function") {
      return /* @__PURE__ */ jsx(Children, { source, children });
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
  return children(useDeepSignal(source));
}
function useDroppable(input) {
  const { collisionDetector, data, disabled, element, id, accept, type } = input;
  const droppable = useInstance(
    (manager) => new Droppable(
      __spreadProps(__spreadValues({}, input), {
        register: false,
        element: currentValue(element)
      }),
      manager
    )
  );
  const trackedDroppalbe = useDeepSignal(droppable);
  useOnValueChange(id, () => droppable.id = id);
  useOnElementChange(element, (element2) => droppable.element = element2);
  useOnValueChange(accept, () => droppable.id = id, void 0, deepEqual);
  useOnValueChange(collisionDetector, () => droppable.id = id);
  useOnValueChange(data, () => data && (droppable.data = data));
  useOnValueChange(disabled, () => droppable.disabled = disabled === true);
  useOnValueChange(type, () => droppable.id = id);
  return {
    droppable: trackedDroppalbe,
    get isDropTarget() {
      return trackedDroppalbe.isDropTarget;
    },
    ref: useCallback(
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
  useEffect(() => {
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
  const source = useComputed(() => manager == null ? void 0 : manager.dragOperation.source, [manager]);
  const target = useComputed(() => manager == null ? void 0 : manager.dragOperation.target, [manager]);
  return {
    get source() {
      return source.value;
    },
    get target() {
      return target.value;
    }
  };
}

export { DragDropProvider, DragOverlay, useDragDropManager, useDragDropMonitor, useDragOperation, useDraggable, useDroppable, useInstance };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map