import { ReadonlySignal } from '@preact/signals-core';
export { ReadonlySignal, Signal, batch, effect, signal, untracked } from '@preact/signals-core';

declare function computed<T>(compute: () => T, comparator?: (a: T, b: T) => boolean): ReadonlySignal<T>;

declare function deepEqual<T>(a: T, b: T): boolean;

declare function reactive<This, Value>({ get }: ClassAccessorDecoratorTarget<This, Value>, _: ClassAccessorDecoratorContext<This, Value>): ClassAccessorDecoratorResult<This, Value>;
declare function derived<This, Return>(target: (this: This) => Return, _: ClassGetterDecoratorContext<This, Return>): (this: This) => Return;

type CleanupFunction = () => void;
type Effect = () => CleanupFunction | void;

declare function effects(...entries: Effect[]): CleanupFunction;

export { type CleanupFunction, type Effect, computed, deepEqual, derived, effects, reactive };
