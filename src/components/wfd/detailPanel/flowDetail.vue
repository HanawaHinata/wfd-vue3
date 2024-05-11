<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['sequenceFlow'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />


      <div class="panel-row">
        <div class="label">{{i18n['sequenceFlow.expression']}}：</div>
        <div class="input">
          <a-textarea
            :disabled="readOnly"
            :value="props.model.conditionExpression"
            @change="(e) => {
              props.onChange('conditionExpression', e.target.value)
            }"
          />
        </div>
      </div>

      <div class="panel-row">
        <div class="label">{{i18n['sequenceFlow.seq']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.seq"
            @change="(e) => {
              props.onChange('seq', e.target.value)
            }"
          />
        </div>
      </div>

      <div class="panel-row">
        <div class="label">{{i18n['sequenceFlow.reverse']}}：</div>
        <div class="input">
          <a-checkbox
            class="input"
            :disabled="props.readOnly"
            :checked="!!props.model.reverse"
            @change="(e) => {
              props.onChange('reverse', e.target.checked)
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
