<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['startEvent'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />

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
