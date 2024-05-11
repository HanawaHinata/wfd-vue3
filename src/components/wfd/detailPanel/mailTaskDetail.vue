<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['mailTask'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />


      <div class="panel-row">
        <div class="label">{{i18n['mailTask.to']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.to"
            @change="(e) => {
              props.onChange('to', e.target.value)
            }"
          />
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['mailTask.subject']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.subject"
            @change="(e) => {
              props.onChange('subject', e.target.value)
            }"
          />
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['mailTask.content']}}：</div>
        <div class="input">
          <a-textarea
            :disabled="readOnly"
            :value="props.model.content"
            @change="(e) => {
              props.onChange('content', e.target.value)
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
