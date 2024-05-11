import Marker from '@antv/g6-core/lib/element/marker';
export default function(G6){
  G6.registerBehavior('hoverNodeActived', {
    getEvents() {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'anchor:mouseleave': 'onAnchorLeave',
      }
    },
    onAnchorLeave(e){
      let node = e.item.getContainer().getParent();
      if(node && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(node.get('item'), 'show-anchor', false);
      }
    },
    onNodeEnter(e){
      const clazz = e.item.getModel().clazz;
      if(clazz !== 'endEvent' && !this.graph.get('edgeDragging')){
        this.graph.setItemState(e.item, 'show-anchor', true);
      }
    },
    onNodeLeave(e){
      let _this = this;
      // if(!(e.target instanceof Marker) && !this.graph.get('edgeDragging')) {
      //   this.graph.setItemState(e.item, 'show-anchor', false);
      // }
      // 新版 g6 更新以后，Marker 不能参与 instanceof 运算。
      // https://github.com/guozhaolong/wfd-vue/issues/68#issuecomment-822126821
      if(!(e.target.constructor.name === 'Marker') && !this.graph.get('edgeDragging')){
        _this.graph.setItemState(e.item, 'show-anchor', false);
      }
    },
  });
}
