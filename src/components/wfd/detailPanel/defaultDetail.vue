<template>
  <div>
    <div class="panel-row">
      <div class="label">标题：</div>
      <div class="input">
        <a-input
          :disabled="readOnly"
          :value="props.model.label"
          @change="(e) => {
            props.onChange('label', e.target.value)
          }"
        />
      </div>
    </div>
    <div class="panel-row">
      <div class="label">隐藏图标：</div>
      <div class="input">
        <a-checkbox
          class="input"
          :disabled="props.readOnly"
          :checked="!!props.model.hideIcon"
          @change="(e) => {
            props.onChange('hideIcon', e.target.checked)
          }"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import {inject} from "vue";

const i18n = inject('i18n')

// eslint-disable-next-line no-undef
const props = defineProps({
  model: {
    type:Object,
    default: ()=>({}),
  },
  onChange: {
    type: Function,
    default: ()=>{}
  },
  readOnly:{
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped lang="less">

</style>
