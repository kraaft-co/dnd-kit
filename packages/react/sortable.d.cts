import { Data } from '@dnd-kit/abstract';
import { SortableInput, Sortable } from '@dnd-kit/dom/sortable';
export { isSortable } from '@dnd-kit/dom/sortable';
import { RefOrValue } from '@dnd-kit/react/utilities';

interface UseSortableInput<T extends Data = Data> extends Omit<SortableInput<T>, 'handle' | 'element' | 'target'> {
    handle?: RefOrValue<Element>;
    element?: RefOrValue<Element>;
    target?: RefOrValue<Element>;
}
declare function useSortable<T extends Data = Data>(input: UseSortableInput<T>): {
    sortable: Sortable<T>;
    readonly isDragging: boolean;
    readonly isDropping: boolean;
    readonly isDragSource: boolean;
    readonly isDropTarget: boolean;
    handleRef: (element: Element | null) => void;
    ref: (element: Element | null) => void;
    sourceRef: (element: Element | null) => void;
    targetRef: (element: Element | null) => void;
};

export { type UseSortableInput, useSortable };
