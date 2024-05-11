<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['messageEvent'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />


      <div class="panel-row">
        <div class="label">{{i18n['messageEvent.message']}}：</div>
        <div class="input">
          <a-select
            style="width: 100%"
            :placeholder="i18n['messageEvent.message']"
            :value="model.message"
            allow-create
            :disabled="readOnly"
            @change="(e) => {
              onChange('message', e)
            }"
          >
            <template v-for="(item, index) in props.messageDefs" :key="index">
              <a-select-option :value="item.id" >{{item.name}}</a-select-option>
            </template>
          </a-select>
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
  },
  messageDefs: {
    type: Array,
    default: function(){
      return []
    }
  }
})
</script>
