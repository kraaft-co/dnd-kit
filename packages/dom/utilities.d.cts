import { BoundingRectangle, Coordinates, Axis, Rectangle } from '@dnd-kit/geometry';

declare function getBoundingRectangle(element: Element): BoundingRectangle;

/**
 * Returns the bounding rectangle of the viewport
 * @param element
 * @returns BoundingRectangle
 */
declare function getViewportBoundingRectangle(element: Element): BoundingRectangle;

type PositionObserverCallback = (boundingClientRect: BoundingRectangle | null) => void;
declare class PositionObserver {
    #private;
    private element;
    constructor(element: Element, callback: PositionObserverCallback, options?: {
        debug?: boolean;
    });
    boundingClientRect: DOMRectReadOnly;
    disconnect(): void;
}

declare function getVisibleBoundingRectangle(element: Element, boundingClientRect?: DOMRect, margin?: number): BoundingRectangle;

declare const canUseDOM: boolean;

declare function getDocument(target: Event['target'] | undefined): Document;

declare function getWindow(target: Event['target'] | null | undefined): typeof window;

declare function isSafari(): boolean;

declare function cloneElement(element: Element): Element;

declare function getElementFromPoint(document: Document, { x, y }: Coordinates): Element | null;

declare const ProxiedElements: WeakMap<Element, Element>;

interface EventListenerDescriptor {
    type: string;
    listener(event: Event): void;
    options?: AddEventListenerOptions;
}
type EventListenerInput = EventListenerDescriptor[] | EventListenerDescriptor;
declare class Listeners {
    private entries;
    constructor();
    bind(target: EventTarget, input: EventListenerInput): () => void;
    clear: () => void;
}

declare function showPopover(element: Element): void;

declare function supportsPopover(element: Element): element is Element & {
    showPopover(): void;
    hidePopover(): void;
};

declare function canScroll(scrollableElement: Element, by?: Coordinates): {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
    x: boolean;
    y: boolean;
};

interface Options {
    limit?: number;
    excludeElement?: boolean;
}
declare function getScrollableAncestors(element: Node | null, options?: Options): Set<Element>;
declare function getFirstScrollableAncestor(node: Node | null): Element | null;

declare enum ScrollDirection {
    Idle = 0,
    Forward = 1,
    Reverse = -1
}
interface ScrollIntent {
    x: ScrollDirection;
    y: ScrollDirection;
}
declare function detectScrollIntent(scrollableElement: Element, coordinates: Coordinates, intent?: ScrollIntent, acceleration?: number, thresholdPercentage?: Record<Axis, number>, tolerance?: Record<Axis, number>): {
    direction: Record<Axis, ScrollDirection>;
    speed: {
        x: number;
        y: number;
    };
};

declare function isDocumentScrollingElement(element: Element | null): boolean;

declare function scrollIntoViewIfNeeded(el: Element, centerIfNeeded?: boolean): void;

declare class Scheduler {
    private animationFrame;
    private tasks;
    schedule(task: () => void): void;
    flush: () => void;
}
declare const scheduler: Scheduler;

declare function timeout(callback: () => void, duration: number): () => void;

interface Arguments {
    element: Element;
    keyframes: PropertyIndexedKeyframes | Keyframe[];
    options: KeyframeAnimationOptions;
    onReady?(): void;
    onFinish?(): void;
}
declare function animateTransform({ element, keyframes, options, onReady, onFinish, }: Arguments): void;

declare function computeTranslate(element: Element, translate?: string, projected?: boolean): {
    x: number;
    y: number;
    z: number;
};

interface Transform extends Coordinates {
    z?: number;
    scaleX: number;
    scaleY: number;
}
declare function parseTransform(computedStyles: {
    scale: string;
    transform: string;
    translate: string;
}): Transform | null;

declare function inverseTransform(rect: BoundingRectangle, parsedTransform: Transform, transformOrigin: string): BoundingRectangle;

declare function parseTranslate(translate: string): {
    x: number;
    y: number;
    z: number;
} | null;

interface DOMRectangleOptions {
    getBoundingClientRect?: (element: Element) => BoundingRectangle;
    ignoreTransforms?: boolean;
    frameTransform?: Transform | null;
}
declare class DOMRectangle extends Rectangle {
    constructor(element: Element, options?: DOMRectangleOptions);
    intrinsicWidth: number;
    intrinsicHeight: number;
}

declare class Styles {
    private element;
    private initial;
    constructor(element: Element);
    set(properties: Record<string, string | number>, prefix?: string): void;
    remove(properties: string[], prefix?: string): void;
    reset(): void;
}

declare function getComputedStyles(element: Element): CSSStyleDeclaration;

declare function isElement(target: EventTarget | null): target is Element;

declare function isHTMLElement(node: Node | Window | null | undefined): node is HTMLElement;

declare function isKeyframeEffect(effect: AnimationEffect | null | undefined): effect is KeyframeEffect;

declare function isKeyboardEvent(event: Event | null | undefined): event is KeyboardEvent;

declare function isPointerEvent(event: Event | null | undefined): event is PointerEvent;

interface ViewTransition {
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    finished: Promise<void>;
    skipTransition(): void;
}
declare function supportsViewTransition(document: Document): document is Document & {
    startViewTransition(updateCallback: () => void): ViewTransition;
};

declare function supportsStyle(element: Element): element is Element & {
    style: CSSStyleDeclaration;
};

declare function generateUniqueId(prefix: string): string;

declare function getFrameElement(el: Element | undefined): Element | null;

declare function getFrameTransform(el: Element | undefined, boundary?: Element | null): Transform;

export { DOMRectangle, type DOMRectangleOptions, Listeners, PositionObserver, ProxiedElements, Scheduler, ScrollDirection, Styles, type Transform, animateTransform, canScroll, canUseDOM, cloneElement, computeTranslate, detectScrollIntent, generateUniqueId, getBoundingRectangle, getComputedStyles, getDocument, getElementFromPoint, getFirstScrollableAncestor, getFrameElement, getFrameTransform, getScrollableAncestors, getViewportBoundingRectangle, getVisibleBoundingRectangle, getWindow, inverseTransform, isDocumentScrollingElement, isElement, isHTMLElement, isKeyboardEvent, isKeyframeEffect, isPointerEvent, isSafari, parseTransform, parseTranslate, scheduler, scrollIntoViewIfNeeded, showPopover, supportsPopover, supportsStyle, supportsViewTransition, timeout };
