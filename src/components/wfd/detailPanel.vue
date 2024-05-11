<template>
  <div class="detail-panel"  :style="{height: panelHeight}">
    <user-task-detail v-if="props.model.clazz === 'userTask'" :model="props.model" :onChange="props.onChange"
                      :readOnly="props.readOnly" :users="props.users" :groups="props.groups" />
    <script-task-detail v-else-if="props.model.clazz === 'scriptTask'" :model="props.model" :onChange="props.onChange"
                      :readOnly="props.readOnly" />


    <pre class="data-pre">{{JSON.stringify(props.model, false, 4)}}</pre>
  </div>
</template>
<script setup>
import {computed, inject} from "vue";
import userTaskDetail from "./detailPanel/userTaskDetail.vue"
import scriptTaskDetail from "./detailPanel/scriptTaskDetail.vue"

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
