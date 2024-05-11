<template>
  <div class="item-panel" :style="{height: panelHeight}">
    <a-collapse v-model:activeKey="collapseActiveKey">
      <a-collapse-panel v-for="(item, index) in flowNodeTypeSelectOptionsList" :key="item.key" :header="i18n[item.key]">
        <div class="node-type-options-box">
          <template v-for="(typeItem, typeIndex) in item.nodeTypeList" :key="index + '-' + typeIndex">
            <div class="item"
                 :data-item="'{clazz:\''+typeItem.clazz+'\',size:\''+typeItem.size+'\',label:\''+typeItem.label+'\'}'">
              <img :src="typeItem.icon" :alt="i18n[typeItem.key]" class="icon" />
              <div class="name">{{i18n[typeItem.key]}}</div>
            </div>
          </template>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script setup>
import {computed, inject, onMounted, ref} from "vue"

const i18n = inject('i18n')

// eslint-disable-next-line no-undef
const props = defineProps({
  height: {
    type: [Number, String],
    default: 800
  },
})

const panelHeight = computed(() => {
  if(typeof props.height === 'number'){
    return props.height + "px"
  }else{
    return props.height
  }
})

const flowNodeTypeSelectOptionsList = [
  {
    key: "start", nodeTypeList: [
      {key: "startEvent", clazz: 'start', size: '30*30', label: "", icon: require("@/assets/icons/flowNodeType/start.svg")},
      {key: "timerEvent", clazz: 'timerStart', size: '30*30', label: "", icon: require("@/assets/icons/flowNodeType/timer-start.svg")},
      {key: "messageEvent", clazz: 'messageStart', size: '30*30', label: "", icon: require("@/assets/icons/flowNodeType/message-start.svg")},
      {key: "signalEvent", clazz: 'signalStart', size: '30*30', label: "", icon: require("@/assets/icons/flowNodeType/signal-start.svg")}
    ]
  },
  {
    key: "task", nodeTypeList: [
      {key: "userTask", clazz: 'userTask', size: '80*44', label: i18n['userTask'], icon: require("@/assets/icons/flowNodeType/user-task.svg")},
      {key: "scriptTask", clazz: 'scriptTask', size: '80*44', label: i18n['scriptTask'], icon: require("@/assets/icons/flowNodeType/script-task.svg")},
      {key: "javaTask", clazz: 'javaTask', size: '80*44', label: i18n['javaTask'], icon: require("@/assets/icons/flowNodeType/java-task.svg")},
      {key: "mailTask", clazz: 'mailTask', size: '80*44', label: i18n['mailTask'], icon: require("@/assets/icons/flowNodeType/mail-task.svg")},
      {key: "receiveTask", clazz: 'receiveTask', size: '80*44', label: i18n['receiveTask'], icon: require("@/assets/icons/flowNodeType/receive-task.svg")}
    ]
  },
  {
    key: "gateway", nodeTypeList: [
      {key: "exclusiveGateway", clazz: 'exclusiveGateway', size: '40*40', label: "", icon: require("@/assets/icons/flowNodeType/exclusive-gateway.svg")},
      {key: "parallelGateway", clazz: 'parallelGateway', size: '40*40', label: "", icon: require("@/assets/icons/flowNodeType/parallel-gateway.svg")},
      {key: "inclusiveGateway", clazz: 'inclusiveGateway', size: '40*40', label: "", icon: require("@/assets/icons/flowNodeType/inclusive-gateway.svg")}
    ]
  },
  {
    key: "catch", nodeTypeList: [
      {key: "timerEvent", clazz: 'timerCatch', size: '50*30', label: "", icon: require("@/assets/icons/flowNodeType/timer-catch.svg")},
      {key: "messageEvent", clazz: 'messageCatch', size: '50*30', label: "", icon: require("@/assets/icons/flowNodeType/message-catch.svg")},
      {key: "signalEvent", clazz: 'signalCatch', size: '50*30', label: "", icon: require("@/assets/icons/flowNodeType/signal-catch.svg")}
    ]
  },
  {
    key: "end", nodeTypeList: [
      {key: "endEvent", clazz: 'end', size: '30*30', label: "", icon: require("@/assets/icons/flowNodeType/end.svg")}
    ]
  }
]
const collapseActiveKey = ref(['start', 'task', 'gateway', 'catch', 'end']);

onMounted(() => {
  setTimeout(() => {
    collapseActiveKey.value = []
  }, 200)
})
</script>
<style scoped lang="less">
.item-panel {
  float: left;
  width: 250px;
  background: #f0f2f5;
  overflow-y: auto;
  border-left: 1px solid #E9E9E9;
  border-bottom: 1px solid #E9E9E9;

  .node-type-options-box{
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    .item{
      width: 100%;
      height: fit-content;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      row-gap: 10px;
      box-sizing: border-box;
      padding: 20px;
      cursor: pointer;
      user-select: none;

      .icon{
        height: 40px;
      }

      .name{
        font-size: 10pt;
        font-weight: bold;
        color: #888888;
      }

      &:hover{
        background-color: #f8f8f8;
        border-radius: 8px;
      }
    }
  }
}
</style>
