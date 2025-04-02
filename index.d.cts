import { Coordinates, Alignment, Shape, Position } from '@dnd-kit/geometry';
import { Effect, CleanupFunction } from '@dnd-kit/state';

type Data = Record<string, any>;
type UniqueIdentifier = string | number;
type Type = Symbol | string | number;

interface Input$2<T extends Data = Data> {
    /**
     * The unique identifier of the entity.
     */
    id: UniqueIdentifier;
    /**
     * Optional data associated with the entity.
     */
    data?: T;
    /**
     * Whether the entity should initially be disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the entity should be automatically registered with the manager when it is created.
     * @default true
     */
    register?: boolean;
    /**
     * An array of effects that are set up when the entity is registered and cleaned up when it is unregistered.
     */
    effects?(): Effect[];
}
/**
 * The `Entity` class is an abstract representation of a distinct unit in the drag and drop system.
 * It is a base class that other concrete classes like `Draggable` and `Droppable` can extend.
 *
 * @template T - The type of data associated with the entity.
 */
declare class Entity<T extends Data = Data, U extends DragDropManager<any, any> = DragDropManager<any, any>> {
    /**
     * Creates a new instance of the `Entity` class.
     *
     * @param input - An object containing the initial properties of the entity.
     * @param manager - The manager that controls the drag and drop operations.
     */
    constructor(input: Input$2<T>, manager: U | undefined);
    /**
     * The manager that controls the drag and drop operations.
     */
    accessor manager: U | undefined;
    /**
     * The unique identifier of the entity.
     */
    accessor id: UniqueIdentifier;
    /**
     * The data associated with the entity.
     */
    accessor data: Data;
    /**
     * A boolean indicating whether the entity is disabled.
     */
    accessor disabled: boolean;
    /**
     * An array of effects that are applied to the entity.
     */
    effects: () => Effect[];
    /**
     * A method that registers the entity with the manager.
     * @returns CleanupFunction | void
     */
    register(): CleanupFunction | void;
    /**
     * A method that unregisters the entity from the manager.
     * @returns void
     */
    unregister(): void;
    /**
     * A method that cleans up the entity when it is no longer needed.
     * @returns void
     */
    destroy(): void;
}

/**
 * Reactive class representing a registry for entities.
 * @template T - The type of entries that the registry manages,
 * for example, `Draggable` or `Droppable` entities.
 */
declare class EntityRegistry<T extends Entity> {
    private map;
    private cleanupFunctions;
    /**
     * Iterator for the EntityRegistry class.
     * @returns An iterator for the values in the map.
     */
    [Symbol.iterator](): MapIterator<T>;
    get value(): MapIterator<T>;
    /**
     * Checks if a entity with the given identifier exists in the registry.
     * @param identifier - The unique identifier of the entity.
     * @returns True if the entity exists, false otherwise.
     */
    has(identifier: UniqueIdentifier): boolean;
    /**
     * Retrieves a entity from the registry using its identifier.
     * @param identifier - The unique identifier of the entity.
     * @returns The entity if it exists, undefined otherwise.
     */
    get(identifier: UniqueIdentifier): T | undefined;
    /**
     * Registers a entity in the registry.
     * @param key - The unique identifier of the entity.
     * @param value - The entity to register.
     * @returns A function that unregisters the entity.
     */
    register: (key: UniqueIdentifier, value: T) => () => void;
    /**
     * Unregisters an entity from the registry.
     * @param key - The unique identifier of the entity.
     * @param value - The entity instance to unregister.
     */
    unregister: (key: UniqueIdentifier, value: T) => void;
    /**
     * Destroys all entries in the registry and clears the registry.
     */
    destroy(): void;
}

type PluginOptions = Record<string, any>;
interface PluginConstructor<T extends DragDropManager<any, any> = DragDropManager<any, any>, U extends Plugin<T> = Plugin<T>, V extends PluginOptions = InferPluginOptions<U>> {
    new (manager: T, options?: V): U;
}
type PluginDescriptor<T extends DragDropManager<any, any> = DragDropManager<any, any>, U extends Plugin<T> = Plugin<T>, V extends PluginConstructor<T, U> = PluginConstructor<T, U>> = {
    plugin: V;
    options?: InferPluginOptions<U>;
};
type Plugins<T extends DragDropManager<any, any> = DragDropManager<any, any>> = (PluginConstructor<T> | PluginDescriptor<T>)[];
type InferPluginOptions<P> = P extends PluginConstructor<any, any, infer T> ? T : P extends Plugin<any, infer T> ? T : never;

/**
 * An abstract plugin class that can be extended to implement custom
 * functionality that augments the `DragDropManager`'s core capabilities.
 */
declare abstract class Plugin<T extends DragDropManager<any, any> = DragDropManager<any, any>, U extends PluginOptions = PluginOptions> {
    #private;
    manager: T;
    options?: U | undefined;
    constructor(manager: T, options?: U | undefined);
    /**
     * Whether the plugin instance is disabled.
     * Triggers effects when accessed.
     */
    accessor disabled: boolean;
    /**
     * Enable a disabled plugin instance.
     * Triggers effects.
     */
    enable(): void;
    /**
     * Disable an enabled plugin instance.
     * Triggers effects.
     */
    disable(): void;
    /**
     * Whether the plugin instance is disabled.
     * Does not trigger effects when accessed.
     */
    isDisabled(): boolean;
    /**
     * Configure a plugin instance with new options.
     */
    configure(options?: U): void;
    /**
     * Register an effect that will be cleaned up when the plugin instance is destroyed.
     * Returns a cleanup function that can be used to dispose of the effect.
     */
    protected registerEffect(callback: () => void): () => void;
    /**
     * Destroy a plugin instance.
     */
    destroy(): void;
    /**
     * Configure a plugin constructor with options.
     * This method is used to configure the options that the
     * plugin constructor will use to create plugin instances.
     */
    static configure(options: PluginOptions): PluginDescriptor<any, any, any>;
}
declare class CorePlugin<T extends DragDropManager<any, any> = DragDropManager<any, any>, U extends PluginOptions = PluginOptions> extends Plugin<T, U> {
}

declare class PluginRegistry<T extends DragDropManager<any, any>, W extends PluginConstructor<T> = PluginConstructor<T>, U extends Plugin<T> = InstanceType<W>> {
    #private;
    private manager;
    private instances;
    constructor(manager: T);
    get values(): U[];
    set values(entries: Plugins<T>);
    get<X extends W>(plugin: X): InstanceType<X> | undefined;
    register<X extends W>(plugin: X, options?: InferPluginOptions<X>): InstanceType<X>;
    unregister<X extends W>(plugin: X): void;
    destroy(): void;
}

declare function configure<T extends PluginConstructor<any, any, any>, V extends PluginOptions = InferPluginOptions<T>>(plugin: T, options: V): PluginDescriptor<any, any, T>;
declare function configurator<T extends PluginConstructor<any, any, any>>(plugin: T): (options: InferPluginOptions<T>) => PluginDescriptor<any, any, T>;
declare function descriptor<T extends PluginConstructor<any, any, any>>(plugin: T | PluginDescriptor<any, any, T>): PluginDescriptor<any, any, T>;

type ModifierOptions = PluginOptions;
declare class Modifier<T extends DragDropManager<any, any> = DragDropManager<any, any>, U extends ModifierOptions = ModifierOptions> extends Plugin<T, U> {
    manager: T;
    options?: U | undefined;
    constructor(manager: T, options?: U | undefined);
    apply(operation: T['dragOperation']): Coordinates;
}
type ModifierConstructor<T extends DragDropManager<any, any> = DragDropManager<any, any>> = PluginConstructor<T, Modifier<T, any>>;
type ModifierDescriptor<T extends DragDropManager<any, any> = DragDropManager<any, any>> = PluginDescriptor<T, Modifier<T, any>, ModifierConstructor<T>>;
type Modifiers<T extends DragDropManager<any, any> = DragDropManager<any, any>> = (ModifierConstructor<T> | ModifierDescriptor<T>)[];

type SensorOptions = PluginOptions;
declare abstract class Sensor<T extends DragDropManager<any, any> = DragDropManager<Draggable, Droppable>, U extends SensorOptions = SensorOptions> extends Plugin<T, U> {
    manager: T;
    options?: U | undefined;
    constructor(manager: T, options?: U | undefined);
    /**
     * Bind the sensor to a draggable source, and optionally pass
     * in sensor options to override the default sensor options
     * for this draggable source only.
     */
    abstract bind(source: Draggable, options?: U): CleanupFunction;
}
type SensorConstructor<T extends DragDropManager<any, any> = DragDropManager<any, any>> = PluginConstructor<T, Sensor<T>>;
type SensorDescriptor<T extends DragDropManager<any, any> = DragDropManager<any, any>> = PluginDescriptor<T, Sensor<T>, SensorConstructor<T>>;
type Sensors<T extends DragDropManager<any, any> = DragDropManager<any, any>> = (SensorConstructor<T> | SensorDescriptor<T>)[];

interface Input$1<T extends Data = Data> extends Input$2<T> {
    type?: Type;
    sensors?: Sensors;
    modifiers?: Modifiers;
    alignment?: Alignment;
}
type DraggableStatus = 'idle' | 'dragging' | 'dropping';
declare class Draggable<T extends Data = Data, U extends DragDropManager<any, any> = DragDropManager<any, any>> extends Entity<T, U> {
    constructor({ modifiers, type, sensors, ...input }: Input$1<T>, manager: U | undefined);
    accessor type: Type | undefined;
    sensors: Sensors | undefined;
    accessor modifiers: Modifiers | undefined;
    alignment: Alignment | undefined;
    accessor status: DraggableStatus;
    /**
     * A boolean indicating whether the draggable item is being dropped.
     */
    get isDropping(): boolean;
    /**
     * A boolean indicating whether the draggable item is being dropped.
     */
    get isDragging(): boolean;
    /**
     * A boolean indicating whether the draggable item is the source of a drag operation.
     */
    get isDragSource(): boolean;
}

declare enum CollisionPriority {
    Lowest = 0,
    Low = 1,
    Normal = 2,
    High = 3,
    Highest = 4
}
declare enum CollisionType {
    Collision = 0,
    ShapeIntersection = 1,
    PointerIntersection = 2
}
interface Collision {
    id: UniqueIdentifier;
    priority: CollisionPriority | number;
    type: CollisionType;
    value: number;
}
type Collisions = Collision[];
interface CollisionDetectorInput<T extends Draggable = Draggable, U extends Droppable = Droppable> {
    droppable: U;
    dragOperation: DragOperation<T, U>;
}
type CollisionDetector = <T extends Draggable = Draggable, U extends Droppable = Droppable>(input: CollisionDetectorInput<T, U>) => Collision | null;

declare class CollisionObserver<T extends Draggable = Draggable, U extends Droppable = Droppable, V extends DragDropManager<T, U> = DragDropManager<T, U>> extends Plugin<V> {
    #private;
    constructor(manager: V);
    forceUpdate(immediate?: boolean): void;
    computeCollisions(entries?: Droppable[], collisionDetector?: CollisionDetector): Collisions;
    get collisions(): Collisions;
}

/**
 * Sort collisions from greatest to smallest priority
 * Collisions of equal priority are sorted from greatest to smallest value
 */
declare function sortCollisions(a: Collision, b: Collision): number;

interface Input<T extends Data = Data> extends Input$2<T> {
    accept?: Type | Type[] | ((source: Draggable) => boolean);
    collisionPriority?: CollisionPriority | number;
    collisionDetector: CollisionDetector;
    type?: Type;
}
declare class Droppable<T extends Data = Data, U extends DragDropManager<any, any> = DragDropManager<any, any>> extends Entity<T, U> {
    constructor({ accept, collisionDetector, collisionPriority, type, ...input }: Input<T>, manager: U | undefined);
    /**
     * An array of types that are compatible with the droppable.
     */
    accessor accept: Type | Type[] | ((draggable: Draggable) => boolean) | undefined;
    /**
     * The type of the droppable.
     */
    accessor type: Type | undefined;
    /**
     * Checks whether or not the droppable accepts a given draggable.
     *
     * @param {Draggable} draggable
     * @returns {boolean}
     */
    accepts(draggable: Draggable): boolean;
    accessor collisionDetector: CollisionDetector;
    accessor collisionPriority: CollisionPriority | number | undefined;
    accessor shape: Shape | undefined;
    get isDropTarget(): boolean;
}

declare class DragDropRegistry<T extends Draggable, U extends Droppable, V extends DragDropManager<T, U>> {
    constructor(manager: V);
    draggables: EntityRegistry<T>;
    droppables: EntityRegistry<U>;
    plugins: PluginRegistry<V, PluginConstructor<V>>;
    sensors: PluginRegistry<V, SensorConstructor<V>>;
    modifiers: PluginRegistry<V, ModifierConstructor<V>>;
    register(input: Entity): () => void;
    register(input: Draggable): () => void;
    register(input: Droppable): () => void;
    register(input: SensorConstructor, options?: SensorOptions): Sensor;
    register(input: ModifierConstructor): Modifier;
    register(input: PluginConstructor, options?: PluginOptions): Plugin;
    unregister(input: Entity): CleanupFunction;
    unregister(input: Draggable): CleanupFunction;
    unregister(input: Droppable): CleanupFunction;
    unregister(input: SensorConstructor): CleanupFunction;
    unregister(input: ModifierConstructor): CleanupFunction;
    unregister(input: PluginConstructor): CleanupFunction;
    destroy(): void;
}

declare enum Status {
    Idle = "idle",
    Initializing = "initializing",
    Dragging = "dragging",
    Dropped = "dropped"
}
type Serializable = {
    [key: string]: string | number | null | Serializable | Serializable[];
};
interface DragOperation<T extends Draggable = Draggable, U extends Droppable = Droppable> {
    activatorEvent: Event | null;
    canceled: boolean;
    position: Position;
    transform: Coordinates;
    status: {
        current: Status;
        initialized: boolean;
        initializing: boolean;
        dragging: boolean;
        dragended: boolean;
        dropped: boolean;
        idle: boolean;
    };
    get shape(): {
        initial: Shape;
        current: Shape;
    } | null;
    set shape(value: Shape | null);
    source: T | null;
    target: U | null;
    data?: Serializable;
}
type DragActions<T extends Draggable, U extends Droppable, V extends DragDropManager<T, U>> = ReturnType<typeof DragOperationManager<T, U, V>>['actions'];
declare function DragOperationManager<T extends Draggable, U extends Droppable, V extends DragDropManager<T, U>>(manager: V): {
    operation: DragOperation<T, U>;
    actions: {
        setDragSource(identifier: UniqueIdentifier): void;
        setDropTarget(identifier: UniqueIdentifier | null | undefined): Promise<boolean>;
        start({ event: nativeEvent, coordinates, }: {
            event?: Event;
            coordinates: Coordinates;
        }): void;
        move({ by, to, event: nativeEvent, cancelable, propagate, }: {
            by: Coordinates;
            to?: undefined;
            event?: Event;
            cancelable?: boolean;
            propagate?: boolean;
        } | {
            by?: undefined;
            to: Coordinates;
            event?: Event;
            cancelable?: boolean;
            propagate?: boolean;
        }): void;
        stop({ canceled: eventCanceled, event: nativeEvent, }?: {
            event?: Event;
            canceled?: boolean;
        }): void;
    };
    cleanup(): void;
};

type Events = Record<string, (...args: any[]) => void>;
type Preventable<T> = T & {
    cancelable: boolean;
    defaultPrevented: boolean;
    preventDefault(): void;
};
declare class Monitor<T extends Events> {
    private registry;
    addEventListener<U extends keyof T>(name: U, handler: T[U]): () => void;
    removeEventListener(name: keyof T, handler: T[keyof T]): void;
    protected dispatch<U extends keyof T>(name: U, ...args: any[]): void;
}
type DragDropEvents<T extends Draggable, U extends Droppable, V extends DragDropManager<T, U>> = {
    collision(event: Preventable<{
        collisions: Collisions;
    }>, manager: V): void;
    beforedragstart(event: Preventable<{
        operation: DragOperation<T, U>;
        nativeEvent?: Event;
    }>, manager: V): void;
    dragstart(event: {
        cancelable: false;
        operation: DragOperation<T, U>;
        nativeEvent?: Event;
    }, manager: V): void;
    dragmove(event: Preventable<{
        operation: DragOperation<T, U>;
        to?: Coordinates;
        by?: Coordinates;
        nativeEvent?: Event;
    }>, manager: V): void;
    dragover(event: Preventable<{
        operation: DragOperation<T, U>;
    }>, manager: V): void;
    dragend(event: {
        operation: DragOperation<T, U>;
        nativeEvent?: Event;
        canceled: boolean;
        suspend(): {
            resume(): void;
            abort(): void;
        };
    }, manager: V): void;
};
declare class DragDropMonitor<T extends Draggable, U extends Droppable, V extends DragDropManager<T, U>> extends Monitor<DragDropEvents<T, U, V>> {
    private manager;
    constructor(manager: V);
    dispatch<Key extends keyof DragDropEvents<T, U, V>>(type: Key, event: Parameters<DragDropEvents<T, U, V>[Key]>[0]): void;
}

interface Renderer {
    get rendering(): Promise<void>;
}

type DragDropManagerInput<T extends DragDropManager<any, any>> = {
    plugins?: Plugins<T>;
    sensors?: Sensors<T>;
    modifiers?: Modifiers<T>;
    renderer?: Renderer;
};
declare class DragDropManager<T extends Draggable, U extends Droppable> {
    actions: DragActions<T, U, DragDropManager<T, U>>;
    collisionObserver: CollisionObserver<T, U>;
    dragOperation: DragOperation<T, U>;
    monitor: DragDropMonitor<T, U, DragDropManager<T, U>>;
    registry: DragDropRegistry<T, U, DragDropManager<T, U>>;
    renderer: Renderer;
    constructor(config?: DragDropManagerInput<any>);
    get plugins(): Plugin<any>[];
    set plugins(plugins: Plugins<any>);
    get modifiers(): Modifier<any>[];
    set modifiers(modifiers: Modifiers<any>);
    get sensors(): Sensor<any>[];
    set sensors(sensors: Sensors<any>);
    destroy: () => void;
}

export { type Collision, type CollisionDetector, CollisionPriority, CollisionType, CorePlugin, type Data, type DragDropEvents, DragDropManager, type DragDropManagerInput, type DragOperation, DragOperationManager, Status as DragOperationStatus, Draggable, type Input$1 as DraggableInput, Droppable, type Input as DroppableInput, Entity, Modifier, type ModifierConstructor, type Modifiers, Plugin, type PluginConstructor, type PluginDescriptor, type PluginOptions, PluginRegistry, type Plugins, type Renderer, Sensor, type SensorConstructor, type SensorDescriptor, type SensorOptions, type Sensors, type Type, type UniqueIdentifier, configurator, configure, descriptor, sortCollisions };
