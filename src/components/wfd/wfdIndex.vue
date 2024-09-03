<template>
  <div class="root">
    <tool-bar-panel ref="toolBarRefs" v-if="!props.isView">
      <slot name="controlButton" />
    </tool-bar-panel>
    <div class="flow_stage">
      <!-- 左侧拖入组件列表 -->
      <item-panel
        ref="addItemPanelRefs"
        v-if="!props.isView"
        :height="props.height"
      />
      <!-- 左侧拖入组件列表 结束 -->
      <!-- 舞台 -->
      <div
        ref="renderCanvasRefs"
        class="canvasPanel"
        :style="{height: canvasHeight}"
      />
      <!-- 舞台 结束 -->
      <!-- 配置项 -->
      <detail-panel
        ref="detailPanelRef"
        v-if="!props.isView"
        :height="props.height"
        :model="selectedModel"
        :readOnly="props.mode !== 'edit'"
        :users="props.users"
        :groups="props.groups"
        :categories="props.categories"
        :signalDefs="processModel.signalDefs"
        :messageDefs="processModel.messageDefs"
        :onChange="(key,val)=>{onItemCfgChange(key,val)}"
      />
      <!-- 配置项 结束 -->
    </div>
  </div>
</template>
<script setup>
import {computed, nextTick, onMounted, onUnmounted, provide, ref} from "vue"
import G6 from '@antv/g6';
import {getShapeName} from '@/utils/clazz'
import Command from '@/utils/plugins/command'
import Toolbar from '@/utils/plugins/toolbar'
import AddItemPanel from '@/utils/plugins/addItemPanel'
import CanvasPanel from '@/utils/plugins/canvasPanel'
import ToolBarPanel from "@/components/wfd/toolBarPanel.vue";
import detailPanel from "@/components/wfd/detailPanel.vue";
import ItemPanel from '@/components/wfd/itemPanel.vue'
import i18n from '@/utils/locales'
import {exportXML, exportImg} from "@/utils/bpmn-activiti"
import registerShape from "@/utils/shape"
import registerBehavior from "@/utils/behavior"

registerShape(G6);
registerBehavior(G6);

// eslint-disable-next-line no-undef
const props = defineProps({
  isView: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: "edit"
  },
  height: {
    type: [Number, String],
    default: 800,
  },
  lang: {
    type: String,
    default: "zh"
  },
  data: {
    type: Object,
    default: () => ({nodes: [], edges: []})
  },
  users: {
    type: Array,
    default: () => ([])
  },
  groups: {
    type: Array,
    default: () => ([])
  },
  categories: {
    type: Array,
    default: () => ([])
  }
})


const saveXML = ref(null)
const getXML = ref(null)
const saveImg = ref(null)
const getGraphData = ref(null)

// 舞台高度
const canvasHeight = computed(() => {
  if(typeof props.height === 'number'){
    return props.height + "px"
  }else{
    return props.height
  }
})

// 将i18n提供出去供子组件注入
provide('i18n', i18n[props.lang])


// toolbar refs
const toolBarRefs = ref()
// add item panel refs
const addItemPanelRefs = ref()
// canvas refs
const renderCanvasRefs = ref()

// 渲染对象
const graph = ref(null)
// Command 插件
const cmdPlugin = ref(null)

// 界面变化逻辑
const resizeFunc = ref(null)

/**
 * 编辑逻辑
 */
// 流程编辑暂存
const processModel = ref({
  id: '',
  name: '',
  category: '',
  clazz: 'process',
  dataObjs: [],
  signalDefs: [],
  messageDefs: [],
})

// 当前选中
const selectedModel = ref({})


// 当前时间戳
const currentTimeStep = ref(0)


/**
 * 初始化
 */
// 初始化事件逻辑
function initEvents() {
  graph.value.on('afteritemselected', (items) => {
    if (items && items.length > 0) {
      let item = graph.value.findById(items[0]);
      if (!item) {
        item = getNodeInSubProcess(items[0])
      }
      selectedModel.value = {...item.getModel()};
    } else {
      selectedModel.value = processModel.value;
    }
  });
  // const page = renderCanvasRefs.value;
  // const height = (typeof props.height==='number')?(props.height - 1):(window.innerHeight - 1);
  const width = renderCanvasRefs.value.offsetWidth;
  const height = renderCanvasRefs.value.offsetHeight;
  resizeFunc.value = () => {
    graph.value.changeSize(width, height);
  };
  window.addEventListener("resize", resizeFunc.value);
}

// 初始化 shape
function initShape(data) {
  if (data && data.nodes) {
    return {
      nodes: data.nodes.map(node => {
        let item = {
          // 新版 g6 修改判断字段，兼容考虑为 shape 和 type 同时赋值。
          shape: getShapeName(node.clazz),
          type: getShapeName(node.clazz),
          ...node,
        }
        return item
      }),
      edges: data.edges
    }
  }
  return data;
}

/**
 * 其他界面逻辑
 */

// 获取子流程的节点
function getNodeInSubProcess(itemId) {
  const subProcess = graph.value.find('node', (node) => {
    if (node.get('model')) {
      const clazz = node.get('model').clazz;
      if (clazz === 'subProcess') {
        const containerGroup = node.getContainer();
        const subGroup = containerGroup.subGroup;
        const item = subGroup.findById(itemId);
        return subGroup.contain(item);
      } else {
        return false;
      }
    } else {
      return false;
    }
  });
  if (subProcess) {
    const group = subProcess.getContainer();
    return group.getItem(subProcess, itemId);
  }
  return null;
}


// 配置修改监听
function onItemCfgChange(key, value) {
  console.log(key, value)
  const items = graph.value.get('selectedItems');
  if (items && items.length > 0) {
    let item = graph.value.findById(items[0]);
    if (!item) {
      item = getNodeInSubProcess(items[0])
    }
    if (graph.value.executeCommand) {
      graph.value.executeCommand('update', {
        itemId: items[0],
        updateModel: {[key]: value}
      });
    } else {
      graph.value.updateItem(item, {[key]: value});
    }
    let updateModel = {}
    updateModel[key] = item.getModel()[key]
    selectedModel.value = Object.assign({}, selectedModel.value, updateModel)
    // selectedModel.value = {...item.getModel()};
  } else {
  //   const canvasModel = {...processModel.value, [key]: value};
  //   selectedModel.value = canvasModel;
  //   processModel.value = canvasModel;
  }
}


onMounted(() => {
  let plugins = [];
  if (!props.isView) {
    cmdPlugin.value = new Command();
    const toolbar = new Toolbar({container: toolBarRefs.value.$el});
    const addItemPanel = new AddItemPanel({container: addItemPanelRefs.value.$el});
    const canvasPanel = new CanvasPanel({container: renderCanvasRefs.value});
    plugins = [cmdPlugin.value, toolbar, addItemPanel, canvasPanel];
  }
  const width = renderCanvasRefs.value.offsetWidth;
  const height = renderCanvasRefs.value.offsetHeight;
  graph.value = new G6.Graph({
    plugins: plugins,
    container: renderCanvasRefs.value,
    height: height,
    width: width,
    modes: {
      default: ['drag-canvas', 'clickSelected'],
      view: [],
      edit: [
        'drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
        'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign', 'dragPoint', 'brush-select'
      ],
    },
    defaultEdge: {
      shape: 'flow-polyline-round',
      type: 'flow-polyline-round',
    },
  });

  // 保存XML逻辑
  graph.value.saveXML = (createFile = true) => {
    exportXML(graph.value.save(), processModel.value, createFile)
  };
  getGraphData.value = () => {
    return graph.value.save()
  }
  saveXML.value = graph.value.saveXML
  // 获取XML逻辑
  graph.value.getXML = (createFile = false) => exportXML(graph.value.save(), processModel.value, createFile);
  getXML.value = graph.value.getXML
  // 保存图片逻辑
  graph.value.saveImg = (createFile = true) => exportImg(renderCanvasRefs.value, processModel.value.name, createFile);
  saveImg.value = graph.value.saveImg

  graph.value.setMode(props.isView?'view':props.mode);


  nextTick().then(() => {
    graph.value.data(initShape(props.data));
    graph.value.render();
    if (props.isView && props.data && props.data.nodes) {
      graph.value.fitView(5)
    }
    initEvents();
  })
})

onUnmounted(() => {
  window.removeEventListener("resize", resizeFunc.value);
  graph.value.getNodes().forEach(node => {
    node.getKeyShape().stopAnimate();
  });
})

/**
 * 外部调用的内部方法
 */

// eslint-disable-next-line no-undef
defineExpose({
  getGraphData,
  saveXML,
  getXML,
  saveImg,
  processModel
})

</script>
<style scoped lang="less">
.root {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-flow: column;

  .flow_stage{
    height: 50%;
    flex: auto;
    display: flex;

    .canvasPanel {
      float: left;
      min-height: 600px;
      width: 500px;
      flex: auto;
      background-color: #fff;
    }
  }
}
</style>
