<template>
  <div class="app">
    <wfd-vue
      ref="wfdRefs"
      :data="currentEditProgressData"
      height="100vh"
      :users="candidateUsers"
      :groups="candidateGroups"
      :categories="categories"
      :lang="lang"
    >
      <template #controlButton>
        <a-button style="float:right;margin-top:6px;margin-right:6px;"
                  @click="showGraphPreview">预览流程
        </a-button>
        <a-button style="float:right;margin-top:6px;margin-right:6px;"
                  @click="exportGraphImage">导出图片
        </a-button>
        <a-button style="float:right;margin-top:6px;margin-right:6px;"
                  @click="exportGraphXml">导出XML
        </a-button>
        <a-button style="float:right;margin-top:6px;margin-right:6px;"
                  @click="getGraphData">获取数据
        </a-button>
        <a-button type="primary" style="float:right;margin-top:6px;margin-right:6px;"
                  @click="saveGraphData">保存
        </a-button>
      </template>
    </wfd-vue>


    <!-- 预览对话框 -->
    <a-modal
      title="预览流程图"
      v-model:open="modalVisible"
      :width="800"
    >
      <wfd-vue
        :data="currentEditProgressData"
        :height="300"
        isView
      />
    </a-modal>
    <!-- 预览对话框 结束 -->
  </div>
</template>

<script setup>
import wfdVue from './components/wfd/wfdIndex.vue'
import {onMounted, ref} from "vue";
import {message} from "ant-design-vue";

const wfdRefs = ref()
const refsHeight = ref(0)
const modalVisible = ref(false)
const currentTimeSteps = ref(0)
const currentEditProgressData = ref({
  nodes: [],
  edges: []
})

const testData = ref({
  nodes: [
    {id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start',},
    {id: 'startNode2', x: 50, y: 320, label: '', clazz: 'timerStart',},
    {id: 'taskNode1', x: 200, y: 200, label: '主任审批', clazz: 'userTask',},
    {id: 'taskNode2', x: 400, y: 200, label: '经理审批', clazz: 'scriptTask',},
    {id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', clazz: 'inclusiveGateway',},
    {id: 'taskNode3', x: 400, y: 450, label: '董事长审批', clazz: 'receiveTask',},
    {id: 'catchNode1', x: 600, y: 200, label: '等待结束', clazz: 'signalCatch',},
    {id: 'endNode', x: 600, y: 320, label: '', clazz: 'end',}
  ],
  edges: [
    {source: 'startNode1', target: 'taskNode1', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow'},
    {source: 'startNode2', target: 'gatewayNode', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow'},
    {source: 'taskNode1', target: 'catchNode1', sourceAnchor: 0, targetAnchor: 0, clazz: 'flow'},
    {source: 'taskNode1', target: 'taskNode2', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow'},
    {source: 'taskNode2', target: 'gatewayNode', sourceAnchor: 1, targetAnchor: 0, clazz: 'flow'},
    {source: 'taskNode2', target: 'taskNode1', sourceAnchor: 2, targetAnchor: 2, clazz: 'flow'},
    {source: 'gatewayNode', target: 'taskNode3', sourceAnchor: 2, targetAnchor: 0, clazz: 'flow'},
    {source: 'gatewayNode', target: 'endNode', sourceAnchor: 1, targetAnchor: 2, clazz: 'flow'},
    {source: 'taskNode3', target: 'endNode', sourceAnchor: 1, targetAnchor: 1, clazz: 'flow'},
    {source: 'catchNode1', target: 'endNode', sourceAnchor: 1, targetAnchor: 0, clazz: 'flow'}
  ]
})


const candidateUsers = ref([{id: '1', name: 'Tom'}, {id: '2', name: 'Steven'}, {id: '3', name: 'Andy'}])
const candidateGroups = ref([{id: '1', name: 'Manager'}, {id: '2', name: 'Security'}, {id: '3', name: 'OA'}])
const categories = ref([{id: '1', name: 'Common'}, {id: '2', name: 'Subsidy'}, {id: '3', name: 'Maintain'}])

/**
 * 增删查改逻辑
 */

// 获取当前工作流详情
function getGraphItemById(id) {
  // 可以使用传入的ID通过网络请求获取已保存的数据
  // 此处加载测试数据用于演示
  console.log(id)
  currentEditProgressData.value = Object.assign({}, testData.value)
}


/**
 * 工作流引擎界面逻辑
 */
// 显示预览
function showGraphPreview() {
  getGraphData();
  modalVisible.value = true;
}

function exportGraphImage() {
  wfdRefs.value.saveImg();
}

function exportGraphXml() {
  wfdRefs.value.saveXML();
}

function getGraphData() {
  let graphData = wfdRefs.value.getGraphData();
  let canvasData = wfdRefs.value.processModel;
  currentEditProgressData.value = {
    nodes: graphData.nodes,
    edges: graphData.edges
  }
  message.info("请按F12查看控制台输出")
  console.log("这是刚才点击“获取数据”按钮输出的数据。", graphData, canvasData);
}

function saveGraphData() {
  let hideLoading = message.loading("保存中", 0)
  setTimeout(() => {
    hideLoading()
    message.info("请按F12查看控制台输出")
    console.log("这是刚才点击“保存”按钮输出的数据。您可以调用接口保存这些数据，方便下次根据ID回显。", currentEditProgressData.value);
  }, 2000)
}


/**
 * 语言
 */
const lang = ref("zh")


onMounted(() => {
  refsHeight.value = wfdRefs.value.offsetHeight;
  currentTimeSteps.value = new Date().getTime()
  // 根据当前ID获取流程详情
  getGraphItemById(1)
})
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
