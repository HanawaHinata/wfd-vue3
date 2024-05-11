<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ panelTitleComputed }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />

    </div>
  </div>
</template>
<script setup>
import defaultDetail from "./defaultDetail.vue"
import {computed, inject} from "vue";

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


const panelTitleComputed = computed(() => {
  let panelTitle = "-"
  switch (props.model.clazz){
    case "exclusiveGateway":
    case "gateway": panelTitle = i18n['exclusiveGateway']; break;
    case "parallelGateway": panelTitle = i18n['parallelGateway']; break;
    case "inclusiveGateway": panelTitle = i18n['inclusiveGateway']; break;
  }
  return panelTitle
})
</script>
