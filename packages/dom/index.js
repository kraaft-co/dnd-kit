import { configurator, Plugin, CorePlugin, Sensor, DragDropManager as DragDropManager$1, Draggable as Draggable$1, descriptor, Droppable as Droppable$1 } from '@dnd-kit/abstract';
import { ScrollDirection, isElement, generateUniqueId, isSafari, getDocument, getFrameTransform, DOMRectangle, Styles, getComputedStyles, isKeyboardEvent, parseTranslate, supportsPopover, showPopover, getWindow, supportsStyle, isKeyframeEffect, animateTransform, canScroll, detectScrollIntent, scheduler, getElementFromPoint, getScrollableAncestors, Listeners, scrollIntoViewIfNeeded, isHTMLElement, cloneElement, ProxiedElements, getFrameElement, isPointerEvent, PositionObserver } from '@dnd-kit/dom/utilities';
import { effects, computed, effect, untracked, deepEqual, batch, signal, reactive } from '@dnd-kit/state';
import { Rectangle, Axes, exceedsDistance } from '@dnd-kit/geometry';
import { defaultCollisionDetection } from '@dnd-kit/collision';

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
  var _a4;
  return [, , , __create((_a4 = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a4 : null)];
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

// src/core/plugins/accessibility/defaults.ts
var defaultAttributes = {
  role: "button",
  roleDescription: "draggable",
  tabIndex: 0
};
var defaultDescriptionIdPrefix = `dnd-kit-description`;
var defaultAnnouncementIdPrefix = `dnd-kit-announcement`;
var defaultScreenReaderInstructions = {
  draggable: `To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel.`
};
var defaultAnnouncements = {
  dragstart({ operation: { source } }) {
    if (!source) return;
    return `Picked up draggable item ${source.id}.`;
  },
  dragover({ operation: { source, target } }) {
    if (!source) return;
    if (target) {
      return `Draggable item ${source.id} was moved over droppable target ${target.id}.`;
    }
    return `Draggable item ${source.id} is no longer over a droppable target.`;
  },
  dragend({ operation: { source, target }, canceled }) {
    if (!source) return;
    if (canceled) {
      return `Dragging was cancelled. Draggable item ${source.id} was dropped.`;
    }
    if (target) {
      return `Draggable item ${source.id} was dropped over droppable target ${target.id}`;
    }
    return `Draggable item ${source.id} was dropped.`;
  }
};

// src/core/plugins/accessibility/utilities.ts
function isFocusable(element) {
  const tagName = element.tagName.toLowerCase();
  return ["input", "select", "textarea", "a", "button"].includes(tagName);
}

// src/core/plugins/accessibility/HiddenText.ts
function createHiddenText(id, value) {
  const element = document.createElement("div");
  element.id = id;
  element.style.setProperty("display", "none");
  element.innerText = value;
  return element;
}

// src/core/plugins/accessibility/LiveRegion.ts
function createLiveRegion(id) {
  const element = document.createElement("div");
  element.id = id;
  element.setAttribute("role", "status");
  element.setAttribute("aria-live", "polite");
  element.setAttribute("aria-atomic", "true");
  element.style.setProperty("position", "fixed");
  element.style.setProperty("width", "1px");
  element.style.setProperty("height", "1px");
  element.style.setProperty("margin", "-1px");
  element.style.setProperty("border", "0");
  element.style.setProperty("padding", "0");
  element.style.setProperty("overflow", "hidden");
  element.style.setProperty("clip", "rect(0 0 0 0)");
  element.style.setProperty("clip-path", "inset(100%)");
  element.style.setProperty("white-space", "nowrap");
  return element;
}

// src/core/plugins/accessibility/Accessibility.ts
var Accessibility = class extends Plugin {
  constructor(manager, options) {
    super(manager);
    const {
      id,
      idPrefix: {
        description: descriptionPrefix = defaultDescriptionIdPrefix,
        announcement: announcementPrefix = defaultAnnouncementIdPrefix
      } = {},
      announcements = defaultAnnouncements,
      screenReaderInstructions = defaultScreenReaderInstructions
    } = options != null ? options : {};
    const descriptionId = id ? `${descriptionPrefix}-${id}` : generateUniqueId(descriptionPrefix);
    const announcementId = id ? `${announcementPrefix}-${id}` : generateUniqueId(announcementPrefix);
    let hiddenTextElement;
    let liveRegionElement;
    const eventListeners = Object.entries(announcements).map(
      ([eventName, getAnnouncement]) => {
        return this.manager.monitor.addEventListener(
          eventName,
          (event, manager2) => {
            const announcement = getAnnouncement == null ? void 0 : getAnnouncement(event, manager2);
            if (announcement && liveRegionElement) {
              liveRegionElement.innerText = announcement;
            }
          }
        );
      }
    );
    const initialize = () => {
      hiddenTextElement = createHiddenText(
        descriptionId,
        screenReaderInstructions.draggable
      );
      liveRegionElement = createLiveRegion(announcementId);
      document.body.append(hiddenTextElement, liveRegionElement);
    };
    const cleanupEffects = effects(() => {
      for (const draggable of manager.registry.draggables.value) {
        const { element, handle } = draggable;
        const activator = handle != null ? handle : element;
        if (activator) {
          if (!hiddenTextElement || !liveRegionElement) {
            initialize();
          }
          if ((!isFocusable(activator) || isSafari()) && !activator.hasAttribute("tabindex")) {
            activator.setAttribute("tabindex", "0");
          }
          if (!activator.hasAttribute("role") && !(activator.tagName.toLowerCase() === "button")) {
            activator.setAttribute("role", defaultAttributes.role);
          }
          if (!activator.hasAttribute("role-description")) {
            activator.setAttribute(
              "aria-roledescription",
              defaultAttributes.roleDescription
            );
          }
          if (!activator.hasAttribute("aria-describedby")) {
            activator.setAttribute("aria-describedby", descriptionId);
          }
          for (const key of ["aria-pressed", "aria-grabbed"]) {
            activator.setAttribute(key, String(draggable.isDragging));
          }
          activator.setAttribute("aria-disabled", String(draggable.disabled));
        }
      }
      this.destroy = () => {
        hiddenTextElement == null ? void 0 : hiddenTextElement.remove();
        liveRegionElement == null ? void 0 : liveRegionElement.remove();
        eventListeners.forEach((unsubscribe) => unsubscribe());
        cleanupEffects();
      };
    });
  }
};
var Cursor = class extends Plugin {
  constructor(manager, options) {
    super(manager, options);
    this.manager = manager;
    const doc = computed(
      () => {
        var _a4;
        return getDocument((_a4 = this.manager.dragOperation.source) == null ? void 0 : _a4.element);
      }
    );
    this.destroy = effect(() => {
      var _a4;
      const { dragOperation } = this.manager;
      const { cursor = "grabbing" } = (_a4 = this.options) != null ? _a4 : {};
      if (dragOperation.status.initialized) {
        const document2 = doc.value;
        const style = document2.createElement("style");
        style.innerText = `* { cursor: ${cursor} !important; }`;
        document2.head.appendChild(style);
        return () => style.remove();
      }
    });
  }
};

// src/core/plugins/feedback/constants.ts
var ATTR_PREFIX = "data-dnd-";
var CSS_PREFIX = "--dnd-";
var ATTRIBUTE = `${ATTR_PREFIX}dragging`;
var PLACEHOLDER_ATTRIBUTE = `${ATTR_PREFIX}placeholder`;
var IGNORED_ATTRIBUTES = [
  ATTRIBUTE,
  PLACEHOLDER_ATTRIBUTE,
  "popover",
  "aria-pressed",
  "aria-grabbing"
];
var IGNORED_STYLES = ["view-transition-name"];
var CSS_RULES = `
  :root [${ATTRIBUTE}] {
    position: fixed !important;
    pointer-events: none !important;
    touch-action: none;
    z-index: calc(infinity);
    will-change: translate;
    top: var(${CSS_PREFIX}top, 0px) !important;
    left: var(${CSS_PREFIX}left, 0px) !important;
    right: unset !important;
    bottom: unset !important;
    width: var(${CSS_PREFIX}width, auto);
    max-width: var(${CSS_PREFIX}width, auto);
    height: var(${CSS_PREFIX}height, auto);
    max-height: var(${CSS_PREFIX}height, auto);
    box-sizing: border-box;
  }

  :root [${PLACEHOLDER_ATTRIBUTE}] {
    transition: none;
  }

  :root [${PLACEHOLDER_ATTRIBUTE}='hidden'] {
    visibility: hidden;
  }

  [${ATTRIBUTE}] * {
    pointer-events: none !important;
  }
  [${ATTRIBUTE}][style*='${CSS_PREFIX}translate'] {
    translate: var(${CSS_PREFIX}translate) !important;
  }
  [style*='${CSS_PREFIX}transition'] {
    transition: var(${CSS_PREFIX}transition) !important;
  }
  [style*='${CSS_PREFIX}scale'] {
    scale: var(${CSS_PREFIX}scale) !important;
    transform-origin: var(${CSS_PREFIX}transform-origin) !important;
  }
  @layer {
    :where([${ATTRIBUTE}][popover]) {
      overflow: visible;
      background: unset;
      border: unset;
      margin: unset;
      padding: unset;
      color: inherit;

      &:is(input, button) {
        border: revert;
        background: revert;
      }
    }
  }
  [${ATTRIBUTE}]::backdrop, [${ATTR_PREFIX}overlay]:not([${ATTRIBUTE}]) {
    display: none;
  }
`.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
function createPlaceholder(source, type = "hidden") {
  return untracked(() => {
    const { element, manager } = source;
    if (!element || !manager) return;
    const containedDroppables = findContainedDroppables(
      element,
      manager.registry.droppables
    );
    const cleanup = [];
    const placeholder = cloneElement(element);
    const { remove } = placeholder;
    proxyDroppableElements(containedDroppables, placeholder, cleanup);
    configurePlaceholder(placeholder, type);
    placeholder.remove = () => {
      cleanup.forEach((fn) => fn());
      remove.call(placeholder);
    };
    return placeholder;
  });
}
function findContainedDroppables(element, droppables) {
  const containedDroppables = /* @__PURE__ */ new Map();
  for (const droppable of droppables) {
    if (!droppable.element) continue;
    if (element === droppable.element || element.contains(droppable.element)) {
      const identifierAttribute = `${ATTR_PREFIX}${generateUniqueId("dom-id")}`;
      droppable.element.setAttribute(identifierAttribute, "");
      containedDroppables.set(droppable, identifierAttribute);
    }
  }
  return containedDroppables;
}
function proxyDroppableElements(containedDroppables, placeholder, cleanup) {
  for (const [droppable, identifierAttribute] of containedDroppables) {
    if (!droppable.element) continue;
    const selector = `[${identifierAttribute}]`;
    const clonedElement = placeholder.matches(selector) ? placeholder : placeholder.querySelector(selector);
    droppable.element.removeAttribute(identifierAttribute);
    if (!clonedElement) continue;
    const originalElement = droppable.element;
    droppable.proxy = clonedElement;
    clonedElement.removeAttribute(identifierAttribute);
    ProxiedElements.set(originalElement, clonedElement);
    cleanup.push(() => {
      ProxiedElements.delete(originalElement);
      droppable.proxy = void 0;
    });
  }
}
function configurePlaceholder(placeholder, type = "hidden") {
  placeholder.setAttribute("inert", "true");
  placeholder.setAttribute("tab-index", "-1");
  placeholder.setAttribute("aria-hidden", "true");
  placeholder.setAttribute(PLACEHOLDER_ATTRIBUTE, type);
}
function isSameFrame(element, target) {
  if (element === target) return true;
  return getFrameElement(element) === getFrameElement(target);
}
function preventPopoverClose(event) {
  const { target } = event;
  if ("newState" in event && event.newState === "closed" && isElement(target) && target.hasAttribute("popover")) {
    requestAnimationFrame(() => showPopover(target));
  }
}
function isTableRow(element) {
  return element.tagName === "TR";
}

// src/core/plugins/feedback/Feedback.ts
var _overlay_dec, _a, _init, _overlay, _Feedback_instances, render_fn, injectStyles_fn;
var _Feedback = class _Feedback extends (_a = Plugin, _overlay_dec = [reactive], _a) {
  constructor(manager, options) {
    super(manager);
    __privateAdd(this, _Feedback_instances);
    __privateAdd(this, _overlay, __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
    this.state = {
      initial: {},
      current: {}
    };
    this.registerEffect(__privateMethod(this, _Feedback_instances, injectStyles_fn));
    this.registerEffect(__privateMethod(this, _Feedback_instances, render_fn));
  }
  destroy() {
    super.destroy();
    injectedStyleTags.forEach((style) => style.remove());
    injectedStyleTags.clear();
  }
};
_init = __decoratorStart(_a);
_overlay = new WeakMap();
_Feedback_instances = new WeakSet();
render_fn = function() {
  var _a4, _b2, _c3;
  const { state, manager, options } = this;
  const { dragOperation } = manager;
  const { position, source, status } = dragOperation;
  if (status.idle) {
    state.current = {};
    state.initial = {};
    return;
  }
  if (!source) return;
  const { element, feedback } = source;
  if (!element || feedback === "none" || status.initializing) {
    return;
  }
  const { initial } = state;
  const feedbackElement = (_a4 = this.overlay) != null ? _a4 : element;
  const frameTransform = getFrameTransform(feedbackElement);
  const elementFrameTransform = getFrameTransform(element);
  const crossFrame = !isSameFrame(element, feedbackElement);
  const shape = new DOMRectangle(element, {
    frameTransform: crossFrame ? elementFrameTransform : null,
    ignoreTransforms: !crossFrame
  });
  const scaleDelta = {
    x: elementFrameTransform.scaleX / frameTransform.scaleX,
    y: elementFrameTransform.scaleY / frameTransform.scaleY
  };
  let cleanup;
  let { width, height, top, left } = shape;
  if (crossFrame) {
    width = width / scaleDelta.x;
    height = height / scaleDelta.y;
  }
  const styles = new Styles(feedbackElement);
  const { transition, translate } = getComputedStyles(element);
  const clone = feedback === "clone";
  const placeholder = feedback !== "move" && !this.overlay ? createPlaceholder(source, clone ? "clone" : "hidden") : null;
  const isKeyboardOperation = untracked(
    () => isKeyboardEvent(manager.dragOperation.activatorEvent)
  );
  if (translate !== "none") {
    const parsedTranslate = parseTranslate(translate);
    if (parsedTranslate && !initial.translate) {
      initial.translate = parsedTranslate;
    }
  }
  if (!initial.transformOrigin) {
    const current = untracked(() => position.current);
    initial.transformOrigin = {
      x: (current.x - left * frameTransform.scaleX - frameTransform.x) / (width * frameTransform.scaleX),
      y: (current.y - top * frameTransform.scaleY - frameTransform.y) / (height * frameTransform.scaleY)
    };
  }
  const { transformOrigin } = initial;
  const relativeTop = top * frameTransform.scaleY + frameTransform.y;
  const relativeLeft = left * frameTransform.scaleX + frameTransform.x;
  if (!initial.coordinates) {
    initial.coordinates = {
      x: relativeLeft,
      y: relativeTop
    };
    if (scaleDelta.x !== 1 || scaleDelta.y !== 1) {
      const { scaleX, scaleY } = elementFrameTransform;
      const { x: tX2, y: tY2 } = transformOrigin;
      initial.coordinates.x += (width * scaleX - width) * tX2;
      initial.coordinates.y += (height * scaleY - height) * tY2;
    }
  }
  if (!initial.dimensions) {
    initial.dimensions = { width, height };
  }
  if (!initial.frameTransform) {
    initial.frameTransform = frameTransform;
  }
  const coordinatesDelta = {
    x: initial.coordinates.x - relativeLeft,
    y: initial.coordinates.y - relativeTop
  };
  const sizeDelta = {
    width: (initial.dimensions.width * initial.frameTransform.scaleX - width * frameTransform.scaleX) * transformOrigin.x,
    height: (initial.dimensions.height * initial.frameTransform.scaleY - height * frameTransform.scaleY) * transformOrigin.y
  };
  const delta = {
    x: coordinatesDelta.x / frameTransform.scaleX + sizeDelta.width,
    y: coordinatesDelta.y / frameTransform.scaleY + sizeDelta.height
  };
  const projected = {
    left: left + delta.x,
    top: top + delta.y
  };
  feedbackElement.setAttribute(ATTRIBUTE, "true");
  const transform = untracked(() => dragOperation.transform);
  const initialTranslate = (_b2 = initial.translate) != null ? _b2 : { x: 0, y: 0 };
  const tX = transform.x * frameTransform.scaleX + initialTranslate.x;
  const tY = transform.y * frameTransform.scaleY + initialTranslate.y;
  const translateString = `${tX}px ${tY}px 0`;
  styles.set(
    {
      width,
      height,
      top: projected.top,
      left: projected.left,
      translate: translateString,
      scale: crossFrame ? `${scaleDelta.x} ${scaleDelta.y}` : "",
      "transform-origin": `${transformOrigin.x * 100}% ${transformOrigin.y * 100}%`
    },
    CSS_PREFIX
  );
  if (placeholder) {
    element.insertAdjacentElement("afterend", placeholder);
    if (options == null ? void 0 : options.rootElement) {
      const root = typeof options.rootElement === "function" ? options.rootElement(source) : options.rootElement;
      root.appendChild(element);
    }
  }
  if (supportsPopover(feedbackElement)) {
    if (!feedbackElement.hasAttribute("popover")) {
      feedbackElement.setAttribute("popover", "manual");
    }
    showPopover(feedbackElement);
    feedbackElement.addEventListener("beforetoggle", preventPopoverClose);
  }
  const resizeObserver = new ResizeObserver(() => {
    if (!placeholder) return;
    const placeholderShape = new DOMRectangle(placeholder, {
      frameTransform,
      ignoreTransforms: true
    });
    const origin = transformOrigin != null ? transformOrigin : { x: 1, y: 1 };
    const dX = (width - placeholderShape.width) * origin.x + delta.x;
    const dY = (height - placeholderShape.height) * origin.y + delta.y;
    styles.set(
      {
        width: placeholderShape.width,
        height: placeholderShape.height,
        top: top + dY,
        left: left + dX
      },
      CSS_PREFIX
    );
    getWindow(element);
    if (isTableRow(element) && isTableRow(placeholder)) {
      const cells = Array.from(element.cells);
      const placeholderCells = Array.from(placeholder.cells);
      for (const [index, cell] of cells.entries()) {
        const placeholderCell = placeholderCells[index];
        cell.style.width = `${placeholderCell.offsetWidth}px`;
      }
    }
    dragOperation.shape = new DOMRectangle(element);
  });
  dragOperation.shape = new DOMRectangle(feedbackElement);
  if (untracked(() => source.status) === "idle") {
    requestAnimationFrame(() => source.status = "dragging");
  }
  let elementMutationObserver;
  let documentMutationObserver;
  if (placeholder) {
    resizeObserver.observe(placeholder);
    elementMutationObserver = new MutationObserver(() => {
      for (const attribute of Array.from(element.attributes)) {
        if (attribute.name.startsWith("aria-") || IGNORED_ATTRIBUTES.includes(attribute.name)) {
          continue;
        }
        if (attribute.name === "style") {
          if (supportsStyle(element) && supportsStyle(placeholder)) {
            for (const key of Object.values(element.style)) {
              if (key.startsWith(CSS_PREFIX) || IGNORED_STYLES.includes(key)) {
                continue;
              }
              placeholder.style.setProperty(
                key,
                element.style.getPropertyValue(key)
              );
            }
          }
          continue;
        }
        placeholder.setAttribute(attribute.name, attribute.value);
      }
      if (clone) {
        placeholder.innerHTML = element.innerHTML;
      }
    });
    elementMutationObserver.observe(element, {
      attributes: true,
      subtree: true
    });
    documentMutationObserver = new MutationObserver((entries) => {
      for (const entry of entries) {
        if (entry.addedNodes.length === 0) continue;
        for (const node of Array.from(entry.addedNodes)) {
          if (node.contains(element) && element.nextElementSibling !== placeholder) {
            element.insertAdjacentElement("afterend", placeholder);
            showPopover(feedbackElement);
            return;
          }
          if (node.contains(placeholder) && placeholder.previousElementSibling !== element) {
            placeholder.insertAdjacentElement("beforebegin", element);
            showPopover(feedbackElement);
            return;
          }
        }
      }
    });
    documentMutationObserver.observe(element.ownerDocument.body, {
      childList: true,
      subtree: true
    });
  }
  const cleanupEffect = effect(() => {
    var _a5;
    const { transform: transform2, status: status2 } = dragOperation;
    if (!transform2.x && !transform2.y && !state.current.translate) {
      return;
    }
    if (status2.dragging) {
      const translateTransition = isKeyboardOperation ? "250ms cubic-bezier(0.25, 1, 0.5, 1)" : "0ms linear";
      const initialTranslate2 = (_a5 = initial.translate) != null ? _a5 : { x: 0, y: 0 };
      const x = transform2.x / frameTransform.scaleX + initialTranslate2.x;
      const y = transform2.y / frameTransform.scaleY + initialTranslate2.y;
      styles.set(
        {
          transition: `${transition}, translate ${translateTransition}`,
          translate: `${x}px ${y}px 0`
        },
        CSS_PREFIX
      );
      dragOperation.shape = new DOMRectangle(feedbackElement);
      state.current.translate = {
        x,
        y
      };
    }
  });
  const id = (_c3 = manager.dragOperation.source) == null ? void 0 : _c3.id;
  const restoreFocus = () => {
    var _a5;
    if (!isKeyboardOperation || id == null) {
      return;
    }
    const draggable = manager.registry.draggables.get(id);
    const element2 = (_a5 = draggable == null ? void 0 : draggable.handle) != null ? _a5 : draggable == null ? void 0 : draggable.element;
    if (isHTMLElement(element2)) {
      element2.focus();
    }
  };
  let dropEffectCleanup;
  cleanup = () => {
    elementMutationObserver == null ? void 0 : elementMutationObserver.disconnect();
    documentMutationObserver == null ? void 0 : documentMutationObserver.disconnect();
    resizeObserver.disconnect();
    if (supportsPopover(feedbackElement)) {
      feedbackElement.removeEventListener(
        "beforetoggle",
        preventPopoverClose
      );
      feedbackElement.removeAttribute("popover");
    }
    feedbackElement.removeAttribute(ATTRIBUTE);
    styles.reset();
    source.status = "idle";
    const moved = state.current.translate != null;
    if (placeholder && (moved || placeholder.parentElement !== feedbackElement.parentElement) && feedbackElement.isConnected) {
      placeholder.replaceWith(feedbackElement);
    }
    placeholder == null ? void 0 : placeholder.remove();
    cleanupEffect();
    dropEffectCleanup == null ? void 0 : dropEffectCleanup();
  };
  dropEffectCleanup = effect(() => {
    if (dragOperation.status.dropped) {
      const onComplete = cleanup;
      cleanup = void 0;
      source.status = "dropping";
      let translate2 = state.current.translate;
      const moved = translate2 != null;
      if (!translate2 && element !== feedbackElement) {
        translate2 = {
          x: 0,
          y: 0
        };
      }
      if (!translate2 || source.disableDropAnimation) {
        onComplete == null ? void 0 : onComplete();
        return;
      }
      manager.renderer.rendering.then(() => {
        showPopover(feedbackElement);
        const target = placeholder != null ? placeholder : element;
        const animations = feedbackElement.getAnimations();
        if (animations.length) {
          animations.forEach((animation) => {
            const { effect: effect9 } = animation;
            if (isKeyframeEffect(effect9) && effect9.getKeyframes().some((keyframe) => keyframe.translate)) {
              animation.finish();
            }
          });
        }
        const options2 = {
          frameTransform: isSameFrame(feedbackElement, target) ? null : void 0
        };
        const current = new DOMRectangle(feedbackElement, options2);
        const final = new DOMRectangle(target, options2);
        const delta2 = Rectangle.delta(current, final, source.alignment);
        const finalTranslate = {
          x: translate2.x - delta2.x,
          y: translate2.y - delta2.y
        };
        const heightKeyframes = Math.round(current.intrinsicHeight) !== Math.round(final.intrinsicHeight) ? {
          minHeight: [
            `${current.intrinsicHeight}px`,
            `${final.intrinsicHeight}px`
          ],
          maxHeight: [
            `${current.intrinsicHeight}px`,
            `${final.intrinsicHeight}px`
          ]
        } : {};
        const widthKeyframes = Math.round(current.intrinsicWidth) !== Math.round(final.intrinsicWidth) ? {
          minWidth: [
            `${current.intrinsicWidth}px`,
            `${final.intrinsicWidth}px`
          ],
          maxWidth: [
            `${current.intrinsicWidth}px`,
            `${final.intrinsicWidth}px`
          ]
        } : {};
        animateTransform({
          element: feedbackElement,
          keyframes: __spreadProps(__spreadValues(__spreadValues({}, heightKeyframes), widthKeyframes), {
            translate: [
              `${translate2.x}px ${translate2.y}px 0`,
              `${finalTranslate.x}px ${finalTranslate.y}px 0`
            ]
          }),
          options: {
            duration: moved || feedbackElement !== element ? 250 : 0,
            easing: "ease"
          },
          onReady() {
            styles.remove(["translate"], CSS_PREFIX);
          },
          onFinish() {
            onComplete == null ? void 0 : onComplete();
            requestAnimationFrame(restoreFocus);
          }
        });
      });
    }
  });
  return () => cleanup == null ? void 0 : cleanup();
};
injectStyles_fn = function() {
  var _a4, _b2;
  const { status, source, target } = this.manager.dragOperation;
  if (status.initialized) {
    const sourceDocument = getDocument((_a4 = source == null ? void 0 : source.element) != null ? _a4 : null);
    const targetDocument = getDocument((_b2 = target == null ? void 0 : target.element) != null ? _b2 : null);
    const documents = /* @__PURE__ */ new Set([sourceDocument, targetDocument]);
    for (const doc of documents) {
      if (!injectedStyleTags.has(doc)) {
        const style = document.createElement("style");
        style.innerText = CSS_RULES;
        doc.head.prepend(style);
        injectedStyleTags.set(doc, style);
      }
    }
  }
};
__decorateElement(_init, 4, "overlay", _overlay_dec, _Feedback, _overlay);
__decoratorMetadata(_init, _Feedback);
_Feedback.configure = configurator(_Feedback);
var Feedback = _Feedback;
var injectedStyleTags = /* @__PURE__ */ new Map();
var LOCKED = true;
var UNLOCKED = false;
var _dec, _a2, _dec2, _b, _init2, __b, __a;
_b = (_dec2 = [reactive], ScrollDirection.Forward), _a2 = (_dec = [reactive], ScrollDirection.Reverse);
var ScrollLock = class {
  constructor() {
    __privateAdd(this, __b, __runInitializers(_init2, 8, this, LOCKED)), __runInitializers(_init2, 11, this);
    __privateAdd(this, __a, __runInitializers(_init2, 12, this, LOCKED)), __runInitializers(_init2, 15, this);
  }
  isLocked(direction) {
    if (direction === ScrollDirection.Idle) {
      return false;
    }
    if (direction == null) {
      return this[ScrollDirection.Forward] === LOCKED && this[ScrollDirection.Reverse] === LOCKED;
    }
    return this[direction] === LOCKED;
  }
  unlock(direction) {
    if (direction === ScrollDirection.Idle) {
      return;
    }
    this[direction] = UNLOCKED;
  }
};
_init2 = __decoratorStart(null);
__b = new WeakMap();
__a = new WeakMap();
__decorateElement(_init2, 4, _b, _dec2, ScrollLock, __b);
__decorateElement(_init2, 4, _a2, _dec, ScrollLock, __a);
__decoratorMetadata(_init2, ScrollLock);

// src/core/plugins/scrolling/ScrollIntent.ts
var DIRECTIONS = [ScrollDirection.Forward, ScrollDirection.Reverse];
var ScrollIntent = class {
  constructor() {
    this.x = new ScrollLock();
    this.y = new ScrollLock();
  }
  isLocked() {
    return this.x.isLocked() && this.y.isLocked();
  }
};
var ScrollIntentTracker = class extends Plugin {
  constructor(manager) {
    super(manager);
    const scrollIntent = signal(new ScrollIntent());
    let previousDelta = null;
    this.signal = scrollIntent;
    effect(() => {
      const { status } = manager.dragOperation;
      if (!status.initialized) {
        previousDelta = null;
        scrollIntent.value = new ScrollIntent();
        return;
      }
      const { delta } = manager.dragOperation.position;
      if (previousDelta) {
        const directions = {
          x: getDirection(delta.x, previousDelta.x),
          y: getDirection(delta.y, previousDelta.y)
        };
        const intent = scrollIntent.peek();
        batch(() => {
          for (const axis of Axes) {
            for (const direction of DIRECTIONS) {
              if (directions[axis] === direction) {
                intent[axis].unlock(direction);
              }
            }
          }
          scrollIntent.value = intent;
        });
      }
      previousDelta = delta;
    });
  }
  get current() {
    return this.signal.peek();
  }
};
function getDirection(a, b) {
  return Math.sign(a - b);
}

// src/core/plugins/scrolling/Scroller.ts
var _autoScrolling_dec, _a3, _init3, _autoScrolling, _meta, _scroll;
var Scroller = class extends (_a3 = CorePlugin, _autoScrolling_dec = [reactive], _a3) {
  constructor(manager) {
    super(manager);
    __privateAdd(this, _autoScrolling, __runInitializers(_init3, 8, this, false)), __runInitializers(_init3, 11, this);
    __privateAdd(this, _meta);
    __privateAdd(this, _scroll, () => {
      if (!__privateGet(this, _meta)) {
        return;
      }
      const { element, by } = __privateGet(this, _meta);
      if (by.y) element.scrollTop += by.y;
      if (by.x) element.scrollLeft += by.x;
    });
    this.scroll = (options) => {
      var _a4;
      if (this.disabled) {
        return false;
      }
      const elements = this.getScrollableElements();
      if (!elements) {
        __privateSet(this, _meta, void 0);
        return false;
      }
      const { position } = this.manager.dragOperation;
      const currentPosition = position == null ? void 0 : position.current;
      if (currentPosition) {
        const { by } = options != null ? options : {};
        const intent = by ? {
          x: getScrollIntent(by.x),
          y: getScrollIntent(by.y)
        } : void 0;
        const scrollIntent = intent ? void 0 : this.scrollIntentTracker.current;
        if (scrollIntent == null ? void 0 : scrollIntent.isLocked()) {
          return false;
        }
        for (const scrollableElement of elements) {
          const elementCanScroll = canScroll(scrollableElement, by);
          if (elementCanScroll.x || elementCanScroll.y) {
            const { speed, direction } = detectScrollIntent(
              scrollableElement,
              currentPosition,
              intent
            );
            if (scrollIntent) {
              for (const axis of Axes) {
                if (scrollIntent[axis].isLocked(direction[axis])) {
                  speed[axis] = 0;
                  direction[axis] = 0;
                }
              }
            }
            if (direction.x || direction.y) {
              const { x, y } = by != null ? by : direction;
              const scrollLeftBy = x * speed.x;
              const scrollTopBy = y * speed.y;
              if (scrollLeftBy || scrollTopBy) {
                const previousScrollBy = (_a4 = __privateGet(this, _meta)) == null ? void 0 : _a4.by;
                if (this.autoScrolling && previousScrollBy) {
                  const scrollIntentMismatch = previousScrollBy.x && !scrollLeftBy || previousScrollBy.y && !scrollTopBy;
                  if (scrollIntentMismatch) continue;
                }
                __privateSet(this, _meta, {
                  element: scrollableElement,
                  by: {
                    x: scrollLeftBy,
                    y: scrollTopBy
                  }
                });
                scheduler.schedule(__privateGet(this, _scroll));
                return true;
              }
            }
          }
        }
      }
      __privateSet(this, _meta, void 0);
      return false;
    };
    let previousElementFromPoint = null;
    let previousScrollableElements = null;
    const elementFromPoint = computed(() => {
      const { position, source } = manager.dragOperation;
      if (!position) {
        return null;
      }
      const element = getElementFromPoint(
        getDocument(source == null ? void 0 : source.element),
        position.current
      );
      if (element) {
        previousElementFromPoint = element;
      }
      return element != null ? element : previousElementFromPoint;
    });
    const scrollableElements = computed(() => {
      const element = elementFromPoint.value;
      const { documentElement } = getDocument(element);
      if (!element || element === documentElement) {
        const { target } = manager.dragOperation;
        const targetElement = target == null ? void 0 : target.element;
        if (targetElement) {
          const elements = getScrollableAncestors(targetElement, {
            excludeElement: false
          });
          previousScrollableElements = elements;
          return elements;
        }
      }
      if (element) {
        const elements = getScrollableAncestors(element, {
          excludeElement: false
        });
        if (this.autoScrolling && previousScrollableElements && elements.size < (previousScrollableElements == null ? void 0 : previousScrollableElements.size)) {
          return previousScrollableElements;
        }
        previousScrollableElements = elements;
        return elements;
      }
      previousScrollableElements = null;
      return null;
    }, deepEqual);
    this.getScrollableElements = () => {
      return scrollableElements.value;
    };
    this.scrollIntentTracker = new ScrollIntentTracker(manager);
    this.destroy = manager.monitor.addEventListener("dragmove", (event) => {
      if (this.disabled || event.defaultPrevented || !isKeyboardEvent(manager.dragOperation.activatorEvent) || !event.by) {
        return;
      }
      if (this.scroll({ by: event.by })) {
        event.preventDefault();
      }
    });
  }
};
_init3 = __decoratorStart(_a3);
_autoScrolling = new WeakMap();
_meta = new WeakMap();
_scroll = new WeakMap();
__decorateElement(_init3, 4, "autoScrolling", _autoScrolling_dec, Scroller, _autoScrolling);
__decoratorMetadata(_init3, Scroller);
function getScrollIntent(value) {
  if (value > 0) {
    return ScrollDirection.Forward;
  }
  if (value < 0) {
    return ScrollDirection.Reverse;
  }
  return ScrollDirection.Idle;
}
var AUTOSCROLL_INTERVAL = 10;
var AutoScroller = class extends Plugin {
  constructor(manager, _options) {
    super(manager);
    const scroller = manager.registry.plugins.get(Scroller);
    if (!scroller) {
      throw new Error("AutoScroller plugin depends on Scroller plugin");
    }
    this.destroy = effect(() => {
      if (this.disabled) {
        return;
      }
      const { position: _, status } = manager.dragOperation;
      if (status.dragging) {
        const canScroll2 = scroller.scroll();
        if (canScroll2) {
          scroller.autoScrolling = true;
          const interval = setInterval(scroller.scroll, AUTOSCROLL_INTERVAL);
          return () => {
            clearInterval(interval);
          };
        } else {
          scroller.autoScrolling = false;
        }
      }
    });
  }
};
var listenerOptions = {
  capture: true,
  passive: true
};
var _timeout;
var ScrollListener = class extends CorePlugin {
  constructor(manager) {
    super(manager);
    __privateAdd(this, _timeout);
    this.handleScroll = () => {
      if (__privateGet(this, _timeout) == null) {
        __privateSet(this, _timeout, setTimeout(() => {
          this.manager.collisionObserver.forceUpdate(false);
          __privateSet(this, _timeout, void 0);
        }, 50));
      }
    };
    const { dragOperation } = this.manager;
    this.destroy = effect(() => {
      var _a4, _b2, _c3;
      const enabled = dragOperation.status.dragging;
      if (enabled) {
        const root = (_c3 = (_b2 = (_a4 = dragOperation.source) == null ? void 0 : _a4.element) == null ? void 0 : _b2.ownerDocument) != null ? _c3 : document;
        root.addEventListener("scroll", this.handleScroll, listenerOptions);
        return () => {
          root.removeEventListener(
            "scroll",
            this.handleScroll,
            listenerOptions
          );
        };
      }
    });
  }
};
_timeout = new WeakMap();
var PreventSelection = class extends Plugin {
  constructor(manager) {
    super(manager);
    this.manager = manager;
    this.destroy = effect(() => {
      const { dragOperation } = this.manager;
      if (dragOperation.status.initialized) {
        const style = document.createElement("style");
        style.innerText = `* { user-select: none !important; -webkit-user-select: none !important; }`;
        document.head.appendChild(style);
        removeSelection();
        document.addEventListener("selectionchange", removeSelection, {
          capture: true
        });
        return () => {
          document.removeEventListener("selectionchange", removeSelection, {
            capture: true
          });
          style.remove();
        };
      }
    });
  }
};
function removeSelection() {
  var _a4;
  (_a4 = document.getSelection()) == null ? void 0 : _a4.removeAllRanges();
}
var DEFAULT_KEYBOARD_CODES = {
  start: ["Space", "Enter"],
  cancel: ["Escape"],
  end: ["Space", "Enter", "Tab"],
  up: ["ArrowUp"],
  down: ["ArrowDown"],
  left: ["ArrowLeft"],
  right: ["ArrowRight"]
};
var DEFAULT_OFFSET = 10;
var _cleanupFunctions;
var KeyboardSensor = class extends Sensor {
  constructor(manager, options) {
    super(manager);
    this.manager = manager;
    this.options = options;
    __privateAdd(this, _cleanupFunctions, []);
    this.listeners = new Listeners();
    this.handleSourceKeyDown = (event, source, options) => {
      if (this.disabled || event.defaultPrevented) {
        return;
      }
      if (!isElement(event.target)) {
        return;
      }
      if (source.disabled) {
        return;
      }
      if (!source.handle && source.element && event.target === source.element || source.handle && event.target === source.handle) {
        const { keyboardCodes = DEFAULT_KEYBOARD_CODES } = options != null ? options : {};
        if (!keyboardCodes.start.includes(event.code)) {
          return;
        }
        if (!this.manager.dragOperation.status.idle) {
          return;
        }
        this.handleStart(event, source, options);
      }
    };
  }
  bind(source, options = this.options) {
    const unbind = effect(() => {
      var _a4;
      const target = (_a4 = source.handle) != null ? _a4 : source.element;
      const listener = (event) => {
        if (isKeyboardEvent(event)) {
          this.handleSourceKeyDown(event, source, options);
        }
      };
      if (target) {
        target.addEventListener("keydown", listener);
        return () => {
          target.removeEventListener("keydown", listener);
        };
      }
    });
    return unbind;
  }
  handleStart(event, source, options) {
    const { element } = source;
    if (!element) {
      throw new Error("Source draggable does not have an associated element");
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    scrollIntoViewIfNeeded(element);
    const { center } = new DOMRectangle(element);
    batch(() => {
      this.manager.actions.setDragSource(source.id);
      this.manager.actions.start({
        event,
        coordinates: {
          x: center.x,
          y: center.y
        }
      });
    });
    this.sideEffects();
    const sourceDocument = getDocument(element);
    const sourceWindow = getWindow(sourceDocument);
    const listeners = [
      this.listeners.bind(sourceDocument, [
        {
          type: "keydown",
          listener: (event2) => this.handleKeyDown(event2, source, options),
          options: { capture: true }
        }
      ]),
      this.listeners.bind(sourceWindow, [
        { type: "resize", listener: () => this.handleEnd(event, true) }
      ])
    ];
    __privateGet(this, _cleanupFunctions).push(...listeners);
  }
  handleKeyDown(event, _source, options) {
    const { keyboardCodes = DEFAULT_KEYBOARD_CODES } = options != null ? options : {};
    if (isKeycode(event, [...keyboardCodes.end, ...keyboardCodes.cancel])) {
      event.preventDefault();
      const canceled = isKeycode(event, keyboardCodes.cancel);
      this.handleEnd(event, canceled);
      return;
    }
    if (isKeycode(event, keyboardCodes.up)) {
      this.handleMove("up", event);
    } else if (isKeycode(event, keyboardCodes.down)) {
      this.handleMove("down", event);
    }
    if (isKeycode(event, keyboardCodes.left)) {
      this.handleMove("left", event);
    } else if (isKeycode(event, keyboardCodes.right)) {
      this.handleMove("right", event);
    }
  }
  handleEnd(event, canceled) {
    this.manager.actions.stop({
      event,
      canceled
    });
    this.cleanup();
  }
  handleMove(direction, event) {
    const { shape } = this.manager.dragOperation;
    const factor = event.shiftKey ? 5 : 1;
    let offset = {
      x: 0,
      y: 0
    };
    if (!shape) {
      return;
    }
    switch (direction) {
      case "up":
        offset = { x: 0, y: -DEFAULT_OFFSET * factor };
        break;
      case "down":
        offset = { x: 0, y: DEFAULT_OFFSET * factor };
        break;
      case "left":
        offset = { x: -DEFAULT_OFFSET * factor, y: 0 };
        break;
      case "right":
        offset = { x: DEFAULT_OFFSET * factor, y: 0 };
        break;
    }
    if ((offset == null ? void 0 : offset.x) || (offset == null ? void 0 : offset.y)) {
      event.preventDefault();
      this.manager.actions.move({
        event,
        by: offset
      });
    }
  }
  sideEffects() {
    const autoScroller = this.manager.registry.plugins.get(AutoScroller);
    if ((autoScroller == null ? void 0 : autoScroller.disabled) === false) {
      autoScroller.disable();
      __privateGet(this, _cleanupFunctions).push(() => {
        autoScroller.enable();
      });
    }
  }
  cleanup() {
    __privateGet(this, _cleanupFunctions).forEach((cleanup) => cleanup());
  }
  destroy() {
    this.cleanup();
    this.listeners.clear();
  }
};
_cleanupFunctions = new WeakMap();
function isKeycode(event, codes) {
  return codes.includes(event.code);
}
var _clearTimeout;
var _PointerSensor = class _PointerSensor extends Sensor {
  constructor(manager, options) {
    super(manager);
    this.manager = manager;
    this.options = options;
    this.listeners = new Listeners();
    this.cleanup = /* @__PURE__ */ new Set();
    __privateAdd(this, _clearTimeout);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  bind(source, options = this.options) {
    const unbind = effect(() => {
      var _a4;
      const target = (_a4 = source.handle) != null ? _a4 : source.element;
      const listener = (event) => {
        if (isPointerEvent(event)) {
          this.handlePointerDown(event, source, options);
        }
      };
      if (target) {
        patchWindow(target.ownerDocument.defaultView);
        target.addEventListener("pointerdown", listener);
        return () => {
          target.removeEventListener("pointerdown", listener);
        };
      }
    });
    return unbind;
  }
  handlePointerDown(event, source, options = {}) {
    if (this.disabled || !event.isPrimary || event.button !== 0 || !isElement(event.target) || source.disabled || isCapturedBySensor(event) || !this.manager.dragOperation.status.idle) {
      return;
    }
    const { target } = event;
    const isNativeDraggable = isHTMLElement(target) && target.draggable && target.getAttribute("draggable") === "true";
    const offset = getFrameTransform(source.element);
    this.initialCoordinates = {
      x: event.clientX * offset.scaleX + offset.x,
      y: event.clientY * offset.scaleY + offset.y
    };
    const { activationConstraints } = options;
    const constraints = typeof activationConstraints === "function" ? activationConstraints(event, source) : activationConstraints;
    event.sensor = this;
    if (!(constraints == null ? void 0 : constraints.delay) && !(constraints == null ? void 0 : constraints.distance)) {
      this.handleStart(source, event);
    } else {
      const { delay } = constraints;
      if (delay) {
        const timeout = setTimeout(
          () => this.handleStart(source, event),
          delay.value
        );
        __privateSet(this, _clearTimeout, () => {
          clearTimeout(timeout);
          __privateSet(this, _clearTimeout, void 0);
        });
      }
    }
    const ownerDocument = getDocument(event.target);
    const unbindListeners = this.listeners.bind(ownerDocument, [
      {
        type: "pointermove",
        listener: (event2) => this.handlePointerMove(event2, source, options)
      },
      {
        type: "pointerup",
        listener: this.handlePointerUp,
        options: {
          capture: true
        }
      },
      {
        // Cancel activation if there is a competing Drag and Drop interaction
        type: "dragstart",
        listener: isNativeDraggable ? this.handleCancel : preventDefault,
        options: {
          capture: true
        }
      }
    ]);
    const cleanup = () => {
      var _a4;
      unbindListeners();
      (_a4 = __privateGet(this, _clearTimeout)) == null ? void 0 : _a4.call(this);
      this.initialCoordinates = void 0;
    };
    this.cleanup.add(cleanup);
  }
  handlePointerMove(event, source, options) {
    const coordinates = {
      x: event.clientX,
      y: event.clientY
    };
    const offset = getFrameTransform(source.element);
    coordinates.x = coordinates.x * offset.scaleX + offset.x;
    coordinates.y = coordinates.y * offset.scaleY + offset.y;
    if (this.manager.dragOperation.status.dragging) {
      event.preventDefault();
      event.stopPropagation();
      this.manager.actions.move({ event, to: coordinates });
      return;
    }
    if (!this.initialCoordinates) {
      return;
    }
    const delta = {
      x: coordinates.x - this.initialCoordinates.x,
      y: coordinates.y - this.initialCoordinates.y
    };
    const { activationConstraints } = options;
    const constraints = typeof activationConstraints === "function" ? activationConstraints(event, source) : activationConstraints;
    const { distance, delay } = constraints != null ? constraints : {};
    if (distance) {
      if (distance.tolerance != null && exceedsDistance(delta, distance.tolerance)) {
        return this.handleCancel(event);
      }
      if (exceedsDistance(delta, distance.value)) {
        return this.handleStart(source, event);
      }
    }
    if (delay) {
      if (exceedsDistance(delta, delay.tolerance)) {
        return this.handleCancel(event);
      }
    }
  }
  handlePointerUp(event) {
    const { status } = this.manager.dragOperation;
    if (status.dragging) {
      event.preventDefault();
      event.stopPropagation();
      const canceled = !status.initialized;
      this.manager.actions.stop({ event, canceled });
    }
    this.cleanup.forEach((cleanup) => cleanup());
    this.cleanup.clear();
  }
  handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      this.handleCancel(event);
    }
  }
  handleStart(source, event) {
    var _a4;
    const { manager, initialCoordinates } = this;
    (_a4 = __privateGet(this, _clearTimeout)) == null ? void 0 : _a4.call(this);
    if (!initialCoordinates || manager.dragOperation.status.initialized) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    batch(() => {
      manager.actions.setDragSource(source.id);
      manager.actions.start({ coordinates: initialCoordinates, event });
    });
    const ownerDocument = getDocument(event.target);
    const pointerCaptureTarget = ownerDocument.body;
    pointerCaptureTarget.setPointerCapture(event.pointerId);
    const unbind = this.listeners.bind(ownerDocument, [
      {
        // Prevent scrolling on touch devices
        type: "touchmove",
        listener: preventDefault,
        options: {
          passive: false
        }
      },
      {
        // Prevent click events
        type: "click",
        listener: preventDefault
      },
      {
        type: "contextmenu",
        listener: preventDefault
      },
      {
        type: "keydown",
        listener: this.handleKeyDown
      },
      {
        type: "lostpointercapture",
        listener: (event2) => {
          if (event2.target !== pointerCaptureTarget) return;
          this.handlePointerUp(event2);
        }
      }
    ]);
    this.cleanup.add(unbind);
  }
  handleCancel(event) {
    const { dragOperation } = this.manager;
    if (dragOperation.status.initialized) {
      this.manager.actions.stop({ event, canceled: true });
    }
    this.cleanup.forEach((cleanup) => cleanup());
    this.cleanup.clear();
  }
  destroy() {
    this.listeners.clear();
  }
};
_clearTimeout = new WeakMap();
_PointerSensor.configure = configurator(_PointerSensor);
var PointerSensor = _PointerSensor;
function isCapturedBySensor(event) {
  return "sensor" in event;
}
function preventDefault(event) {
  event.preventDefault();
}
function noop() {
}
var windows = /* @__PURE__ */ new WeakSet();
function patchWindow(window) {
  if (!window || windows.has(window)) {
    return;
  }
  window.addEventListener("touchmove", noop, {
    capture: false,
    passive: false
  });
  windows.add(window);
}

// src/core/manager/manager.ts
var defaultPreset = {
  modifiers: [],
  plugins: [Accessibility, AutoScroller, Cursor, Feedback, PreventSelection],
  sensors: [
    PointerSensor.configure({
      activationConstraints(event, source) {
        var _a4;
        const { pointerType, target } = event;
        if (pointerType === "mouse" && isElement(target) && (source.handle === target || ((_a4 = source.handle) == null ? void 0 : _a4.contains(target)))) {
          return void 0;
        }
        if (pointerType === "touch") {
          return {
            delay: { value: 250, tolerance: 5 }
          };
        }
        return {
          delay: { value: 200, tolerance: 10 },
          distance: { value: 5 }
        };
      }
    }),
    KeyboardSensor
  ]
};
var DragDropManager = class extends DragDropManager$1 {
  constructor(input = {}) {
    const {
      plugins = defaultPreset.plugins,
      sensors = defaultPreset.sensors,
      modifiers = []
    } = input;
    super(__spreadProps(__spreadValues({}, input), {
      plugins: [ScrollListener, Scroller, ...plugins],
      sensors,
      modifiers
    }));
  }
};
var _disableDropAnimation_dec, _feedback_dec, _element_dec, _handle_dec, _c, _init4, _handle, _element, _feedback, _disableDropAnimation;
var Draggable = class extends (_c = Draggable$1, _handle_dec = [reactive], _element_dec = [reactive], _feedback_dec = [reactive], _disableDropAnimation_dec = [reactive], _c) {
  constructor(_a4, manager) {
    var _b2 = _a4, {
      element,
      effects: effects2 = () => [],
      handle,
      feedback = "default",
      disableDropAnimation
    } = _b2, input = __objRest(_b2, [
      "element",
      "effects",
      "handle",
      "feedback",
      "disableDropAnimation"
    ]);
    super(
      __spreadValues({
        effects: () => [
          ...effects2(),
          () => {
            var _a5, _b3;
            const { manager: manager2 } = this;
            if (!manager2) return;
            const sensors = (_b3 = (_a5 = this.sensors) == null ? void 0 : _a5.map(descriptor)) != null ? _b3 : [
              ...manager2.sensors
            ];
            const unbindFunctions = sensors.map((entry) => {
              const sensorInstance = entry instanceof Sensor ? entry : manager2.registry.register(entry.plugin);
              const options = entry instanceof Sensor ? void 0 : entry.options;
              const unbind = sensorInstance.bind(this, options);
              return unbind;
            });
            return function cleanup() {
              unbindFunctions.forEach((unbind) => unbind());
            };
          }
        ]
      }, input),
      manager
    );
    __privateAdd(this, _handle, __runInitializers(_init4, 8, this)), __runInitializers(_init4, 11, this);
    __privateAdd(this, _element, __runInitializers(_init4, 12, this)), __runInitializers(_init4, 15, this);
    __privateAdd(this, _feedback, __runInitializers(_init4, 16, this)), __runInitializers(_init4, 19, this);
    __privateAdd(this, _disableDropAnimation, __runInitializers(_init4, 20, this)), __runInitializers(_init4, 23, this);
    this.element = element;
    this.handle = handle;
    this.feedback = feedback;
    this.disableDropAnimation = disableDropAnimation;
  }
};
_init4 = __decoratorStart(_c);
_handle = new WeakMap();
_element = new WeakMap();
_feedback = new WeakMap();
_disableDropAnimation = new WeakMap();
__decorateElement(_init4, 4, "handle", _handle_dec, Draggable, _handle);
__decorateElement(_init4, 4, "element", _element_dec, Draggable, _element);
__decorateElement(_init4, 4, "feedback", _feedback_dec, Draggable, _feedback);
__decorateElement(_init4, 4, "disableDropAnimation", _disableDropAnimation_dec, Draggable, _disableDropAnimation);
__decoratorMetadata(_init4, Draggable);
var _proxy_dec, _element_dec2, _c2, _init5, _element2, _d, element_get, element_set, _Droppable_instances, _proxy;
var Droppable = class extends (_c2 = Droppable$1, _element_dec2 = [reactive], _proxy_dec = [reactive], _c2) {
  constructor(_a4, manager) {
    var _b2 = _a4, { element, effects: effects2 = () => [] } = _b2, input = __objRest(_b2, ["element", "effects"]);
    const { collisionDetector = defaultCollisionDetection } = input;
    const updateShape = (boundingClientRect) => {
      const { manager: manager2, element: element2 } = this;
      if (!element2 || boundingClientRect === null) {
        this.shape = void 0;
        return void 0;
      }
      if (!manager2) return;
      const updatedShape = new DOMRectangle(element2);
      const shape = untracked(() => this.shape);
      if (updatedShape && (shape == null ? void 0 : shape.equals(updatedShape))) {
        return shape;
      }
      this.shape = updatedShape;
      return updatedShape;
    };
    const observePosition = signal(false);
    super(
      __spreadProps(__spreadValues({}, input), {
        collisionDetector,
        effects: () => [
          ...effects2(),
          () => {
            const { element: element2, manager: manager2 } = this;
            if (!manager2) return;
            const { dragOperation } = manager2;
            const { source } = dragOperation;
            observePosition.value = Boolean(
              source && dragOperation.status.initialized && element2 && !this.disabled && this.accepts(source)
            );
          },
          () => {
            const { element: element2 } = this;
            if (observePosition.value && element2) {
              const positionObserver = new PositionObserver(
                element2,
                updateShape
              );
              return () => {
                positionObserver.disconnect();
                this.shape = void 0;
              };
            }
          },
          () => {
            var _a5;
            if ((_a5 = this.manager) == null ? void 0 : _a5.dragOperation.status.initialized) {
              return () => {
                this.shape = void 0;
              };
            }
          }
        ]
      }),
      manager
    );
    __privateAdd(this, _Droppable_instances);
    __privateAdd(this, _element2, __runInitializers(_init5, 8, this)), __runInitializers(_init5, 11, this);
    __privateAdd(this, _proxy, __runInitializers(_init5, 12, this)), __runInitializers(_init5, 15, this);
    this.element = element;
    this.refreshShape = () => updateShape();
  }
  set element(element) {
    __privateSet(this, _Droppable_instances, element, element_set);
  }
  get element() {
    var _a4;
    return (_a4 = this.proxy) != null ? _a4 : __privateGet(this, _Droppable_instances, element_get);
  }
};
_init5 = __decoratorStart(_c2);
_element2 = new WeakMap();
_Droppable_instances = new WeakSet();
_proxy = new WeakMap();
_d = __decorateElement(_init5, 20, "#element", _element_dec2, _Droppable_instances, _element2), element_get = _d.get, element_set = _d.set;
__decorateElement(_init5, 4, "proxy", _proxy_dec, Droppable, _proxy);
__decoratorMetadata(_init5, Droppable);

export { Accessibility, AutoScroller, DragDropManager, Draggable, Droppable, Feedback, KeyboardSensor, PointerSensor, ScrollListener, Scroller, defaultPreset };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map