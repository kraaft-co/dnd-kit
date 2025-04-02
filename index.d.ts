import * as react_jsx_runtime from 'react/jsx-runtime';
import { PropsWithChildren, ReactNode } from 'react';
import * as _dnd_kit_abstract from '@dnd-kit/abstract';
import { DragDropEvents, Data, DragDropManager as DragDropManager$1 } from '@dnd-kit/abstract';
import * as _dnd_kit_dom from '@dnd-kit/dom';
import { DragDropManagerInput, DragDropManager, Draggable, Droppable, DraggableInput, DroppableInput } from '@dnd-kit/dom';
import { RefOrValue } from '@dnd-kit/react/utilities';
import { CleanupFunction } from '@dnd-kit/state';

type Events$1 = DragDropEvents<Draggable, Droppable, DragDropManager>;
interface Props$1 extends DragDropManagerInput, PropsWithChildren {
    manager?: DragDropManager;
    onBeforeDragStart?: Events$1['beforedragstart'];
    onCollision?: Events$1['collision'];
    onDragStart?: Events$1['dragstart'];
    onDragMove?: Events$1['dragmove'];
    onDragOver?: Events$1['dragover'];
    onDragEnd?: Events$1['dragend'];
}
declare function DragDropProvider({ children, onCollision, onBeforeDragStart, onDragStart, onDragMove, onDragOver, onDragEnd, ...input }: Props$1): react_jsx_runtime.JSX.Element;

interface UseDraggableInput<T extends Data = Data> extends Omit<DraggableInput<T>, 'handle' | 'element'> {
    handle?: RefOrValue<Element>;
    element?: RefOrValue<Element>;
}
declare function useDraggable<T extends Data = Data>(input: UseDraggableInput<T>): {
    draggable: Draggable<T>;
    readonly isDragging: boolean;
    readonly isDropping: boolean;
    readonly isDragSource: boolean;
    handleRef: (element: Element | null) => void;
    ref: (element: Element | null) => void;
};

interface Props {
    className?: string;
    children: ReactNode | ((source: Draggable) => ReactNode);
    style?: React.CSSProperties;
    tag?: string;
}
declare function DragOverlay({ children, className, style, tag }: Props): react_jsx_runtime.JSX.Element;

interface UseDroppableInput<T extends Data = Data> extends Omit<DroppableInput<T>, 'element'> {
    element?: RefOrValue<Element>;
}
declare function useDroppable<T extends Data = Data>(input: UseDroppableInput<T>): {
    droppable: Droppable<T>;
    readonly isDropTarget: boolean;
    ref: (element: Element | null) => void;
};

declare function useDragDropManager(): _dnd_kit_dom.DragDropManager<_dnd_kit_dom.Draggable<_dnd_kit_abstract.Data>, _dnd_kit_dom.Droppable<_dnd_kit_abstract.Data>> | null;

type DragDropEventMap = {
    beforedragstart: 'onBeforeDragStart';
};
type EventHandlerName<T extends string> = T extends keyof DragDropEventMap ? DragDropEventMap[T] : T extends `drag${infer Second}${infer Rest}` ? `onDrag${Uppercase<Second>}${Rest}` : `on${Capitalize<T>}`;
/**
 * Type for all possible event handlers
 */
type Events<T extends Data> = DragDropEvents<Draggable<T>, Droppable<T>, DragDropManager<Draggable<T>, Droppable<T>>>;
type EventHandlers<T extends Data = Data> = {
    [K in keyof Events<T> as EventHandlerName<K>]?: Events<T>[K];
};
/**
 * Hook to monitor drag and drop events anywhere within a DragDropProvider
 * @param handlers Object containing event handlers for drag and drop events
 */
declare function useDragDropMonitor<T extends Data = Data>(handlers: EventHandlers<T>): void;

declare function useDragOperation(): {
    readonly source: _dnd_kit_dom.Draggable<_dnd_kit_abstract.Data> | null | undefined;
    readonly target: _dnd_kit_dom.Droppable<_dnd_kit_abstract.Data> | null | undefined;
};

interface Instance<T extends DragDropManager$1<any, any> = DragDropManager$1<any, any>> {
    manager: T | undefined;
    register(): CleanupFunction | void;
}
declare function useInstance<T extends Instance>(initializer: (manager: DragDropManager$1<any, any> | undefined) => T): T;

export { type EventHandlers as DragDropEventHandlers, DragDropProvider, DragOverlay, type UseDraggableInput, type UseDroppableInput, useDragDropManager, useDragDropMonitor, useDragOperation, useDraggable, useDroppable, useInstance };
