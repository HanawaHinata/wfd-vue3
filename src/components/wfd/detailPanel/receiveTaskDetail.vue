<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['receiveTask'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />


      <div class="panel-row">
        <div class="label">{{i18n['receiveTask.waitState']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.waitState"
            @change="(e) => {
              props.onChange('waitState', e.target.value)
            }"
          />
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['receiveTask.stateValue']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.stateValue"
            @change="(e) => {
              props.onChange('stateValue', e.target.value)
            }"
          />
        </div>
      </div>


    </div>
  </div>
</template>
<script setup>
import defaultDetail from "./defaultDetail.vue"
import {inject} from "vue";

const i18n = inject('i18n')

// eslint-disable-next-line no-undef
const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
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
</script>
