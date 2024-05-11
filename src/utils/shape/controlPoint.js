import editorStyle from "../defaultStyle";
// import { shapeBase } from '@antv/g6-core/lib/shape/shapeBase';
// import Shape from '@antv/g6-core/lib/shape/shape';
import { shapeBase } from '@antv/g6-core/lib/element/shapeBase';
import Shape from "@antv/g6-core/lib/element/shape";

export default function(G6) {
  Shape.registerFactory('controlPoint', {
    defaultShapeType: 'marker',
    getShape: (type) => {
      const shapeObj = Object.assign({}, shapeBase, {
        type: 'marker',
        itemType: type,
        drawShape(cfg, group) {
          const style = this.getShapeStyle(cfg);
          const shape = group.addShape('marker', {
            attrs: {
              ...style,
              symbol: 'square'
            },
            name: 'controlPoint-shape',
            draggable: true,
          });
          return shape;
        },
        setState(name, value, item) {
          if (name === 'active') {
            if (value) {
              this.update({ style: { ...editorStyle.pointPointHoverStyle } }, item);
            } else {
              this.update({ style: { ...editorStyle.pointPointStyle } }, item);
            }
          }
        }
      });
      return shapeObj;
    }
  });
}
