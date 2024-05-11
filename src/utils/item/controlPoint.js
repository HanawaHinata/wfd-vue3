import editorStyle from '../defaultStyle';
import Item from '@antv/g6-core/lib/item/item';
import {deepMix} from '@antv/util';

export default class ControlPoint extends Item {
  constructor(cfg) {
    super(deepMix(cfg, {
      type: 'controlPoint',
      isActived: false,
      model: {
        type: 'controlPoint',
        style: {
          ...editorStyle.anchorPointStyle,
        },
      },
    }));
    this.enableCapture(true);
    this.toFront();
  }
}
