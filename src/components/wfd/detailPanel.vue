<template>
  <div class="detail-panel"  :style="{height: panelHeight}">

    <!-- 活动节点配置 -->
    <user-task-detail v-if="props.model.clazz === 'userTask'" :model="props.model" :on-change="props.onChange"
                      :read-only="props.readOnly" :users="props.users" :groups="props.groups" />
    <script-task-detail v-else-if="props.model.clazz === 'scriptTask'" :model="props.model" :on-change="props.onChange"
                      :read-only="props.readOnly" />
    <java-task-detail v-else-if="props.model.clazz === 'javaTask'" :model="props.model" :on-change="props.onChange"
                      :read-only="props.readOnly" />
    <receive-task-detail v-else-if="props.model.clazz === 'receiveTask'" :model="props.model" :on-change="props.onChange"
                         :read-only="props.readOnly" />
    <mail-task-detail v-else-if="props.model.clazz === 'mailTask'" :model="props.model" :on-change="props.onChange"
                      :read-only="props.readOnly" />
    <!-- 活动节点配置 结束 -->
    <!-- 定时节点、消息节点、信号节点的 开始事件与捕获事件配置 -->
    <timer-event-detail v-else-if="model.clazz === 'timerStart' || model.clazz === 'timerCatch'" :model="props.model"
                        :on-change="props.onChange" :read-only="props.readOnly" />
    <signal-event-detail v-else-if="model.clazz === 'signalStart' || model.clazz === 'signalCatch'" :model="props.model"
                         :on-change="onChange" :read-only="readOnly" :signal-defs="signalDefs" />
    <message-event-detail v-else-if="model.clazz === 'messageStart' || model.clazz === 'messageCatch'" :model="props.model"
                          :on-change="onChange" :read-only="readOnly" :message-defs="messageDefs" />
    <!-- 定时节点、消息节点、信号节点的 开始事件与捕获事件配置 结束 -->
    <!-- 网关节点配置 -->
    <gateway-detail
      v-else-if="model.clazz === 'gateway' ||
        model.clazz === 'exclusiveGateway' ||
        model.clazz === 'parallelGateway' ||
        model.clazz === 'inclusiveGateway'"
      :model="model"
      :onChange="onChange"
      :readOnly="readOnly"
    />
    <!-- 网关节点配置 结束 -->
    <!-- 开始与结束节点配置 -->
    <start-event-detail v-else-if="props.model.clazz === 'start'" :model="props.model" :on-change="props.onChange"
                        :read-only="props.readOnly" />
    <end-event-detail v-else-if="props.model.clazz === 'end'" :model="props.model" :on-change="props.onChange"
                      :read-only="props.readOnly" />
    <!-- 开始与结束节点配置 结束 -->

    <!-- 连接线属性 -->
    <flow-detail v-else-if="props.model.clazz === 'flow'" :model="props.model" :on-change="props.onChange"
                 :read-only="props.readOnly" />
    <!-- 连接线属性 结束 -->

    <!-- 当前流程配置属性 -->
    <process-detail v-else-if="props.model.clazz === 'process'" :model="props.model" :on-change="props.onChange"
                    :read-only="readOnly" :categories="categories" />
    <!-- 当前流程配置属性 结束 -->

    <a-alert
      v-else
      style="margin: 20px"
      message="您尚未选择可配置节点"
      description="请点击一项节点、连接线或空白处以开始属性配置"
      type="info"
      show-icon
    />


    <pre class="data-pre">{{JSON.stringify(props.model, false, 4)}}</pre>
  </div>
</template>
<script setup>
import {computed, inject} from "vue";
import userTaskDetail from "./detailPanel/userTaskDetail.vue"
import scriptTaskDetail from "./detailPanel/scriptTaskDetail.vue"
import javaTaskDetail from "./detailPanel/javaTaskDetail.vue"
import receiveTaskDetail from "./detailPanel/receiveTaskDetail.vue"
import mailTaskDetail from "./detailPanel/mailTaskDetail.vue";
import timerEventDetail from "./detailPanel/timerEventDetail.vue";
import signalEventDetail from "./detailPanel/signalEventDetail.vue"
import messageEventDetail from "./detailPanel/messageEventDetail.vue"
import gatewayDetail from "./detailPanel/gatewayDetail.vue"
import startEventDetail from "./detailPanel/startEventDetail.vue"
import endEventDetail from "./detailPanel/endEventDetail.vue"
import flowDetail from "./detailPanel/flowDetail.vue"
import processDetail from "./detailPanel/processDetail.vue"

const i18n = inject('i18n')

// eslint-disable-next-line no-undef
const props = defineProps({
  height: {
    type: [Number, String],
    default: 800,
  },
  model: {
    type: Object,
    default: () => ({}),
  },
  users: {
    type: Array,
    default: () => ([]),
  },
  groups: {
    type: Array,
    default: () => ([]),
  },
  categories: {
    type: Array,
    default: () => ([]),
  },
  signalDefs: {
    type: Array,
    default: () => ([]),
  },
  messageDefs: {
    type: Array,
    default: () => ([]),
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  readOnly: {
    type: Boolean,
    default: false,
  }
})

// 面板高度
const panelHeight = computed(() => {
  if(typeof props.height === 'number'){
    return props.height + "px"
  }else{
    return props.height
  }
})


</script>
<style scoped lang="less">
.detail-panel{
  height: 100%;
  background: #f0f2f5;
  flex: 0 0 auto;
  float: left;
  width: 20%;
  border-right: 1px solid #E9E9E9;
  border-bottom: 1px solid #E9E9E9;
  box-sizing: border-box;

  :deep(.panel-title) {
    text-align: left;
    height: 50px;
    padding-left: 12px;
    color: #000;
    line-height: 28px;
    background: #EBEEF2;
    border-bottom: 1px solid #DCE3E8;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  :deep(.panel-body) {
    box-sizing: border-box;
    padding: 10px;

    .panel-row {
      text-align: left;
      width: 100%;
      padding: 5px 12px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .label{
        font-size: 12px;
        width: fit-content;
        min-width: 60px;
        height: 32px;
        line-height: 32px;
      }

      .input{
        width: 50%;
        flex: auto;
        min-height: 32px;
        display: flex;
        align-items: center;
      }
    }
  }
}


.data-pre{
  background-color: #000000;
  color: #ffffff;
  box-sizing: border-box;
  padding: 20px;
  overflow: auto;
  width: 90%;
  max-height: 500px;
  margin: 20px auto;
  font-size: 10pt;
  font-family: "JetBrains Mono", sans-serif;
}
</style>
