import * as _dnd_kit_abstract from '@dnd-kit/abstract';
import { Modifier, DragDropManager, Draggable, Droppable, DragOperation } from '@dnd-kit/abstract';
import * as _dnd_kit_geometry from '@dnd-kit/geometry';
import { Shape, Coordinates, BoundingRectangle } from '@dnd-kit/geometry';

interface Options$1 {
    axis: 'x' | 'y';
    value: number;
}
declare class AxisModifier extends Modifier<DragDropManager<Draggable, Droppable>, Options$1> {
    apply({ transform }: DragOperation): _dnd_kit_geometry.Coordinates;
    static configure: (options: Options$1) => _dnd_kit_abstract.PluginDescriptor<any, any, typeof AxisModifier>;
}
declare const RestrictToVerticalAxis: _dnd_kit_abstract.PluginDescriptor<any, any, typeof AxisModifier>;
declare const RestrictToHorizontalAxis: _dnd_kit_abstract.PluginDescriptor<any, any, typeof AxisModifier>;

declare function restrictShapeToBoundingRectangle(shape: Shape, transform: Coordinates, boundingRect: BoundingRectangle): {
    x: number;
    y: number;
};

interface Options {
    size: number | {
        x: number;
        y: number;
    };
}
declare class SnapModifier extends Modifier<DragDropManager<Draggable, Droppable>, Options> {
    apply({ transform }: DragOperation): {
        x: number;
        y: number;
    };
    static configure: (options: Options) => _dnd_kit_abstract.PluginDescriptor<any, any, typeof SnapModifier>;
}

export { AxisModifier, RestrictToHorizontalAxis, RestrictToVerticalAxis, SnapModifier, restrictShapeToBoundingRectangle };
