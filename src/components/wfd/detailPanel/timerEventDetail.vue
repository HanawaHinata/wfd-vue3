<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['timerEvent'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />


      <div class="panel-row">
        <div class="label">{{i18n['timerEvent.cycle']}}：</div>
        <div class="input">
          <a-textarea
            :disabled="readOnly"
            :value="props.model.cycle"
            @change="(e) => {
              props.onChange('cycle', e.target.value)
            }"
          />
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['timerEvent.duration']}}：</div>
        <div class="input">
          <a-textarea
            :disabled="readOnly"
            :value="props.model.duration"
            @change="(e) => {
              props.onChange('duration', e.target.value)
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
