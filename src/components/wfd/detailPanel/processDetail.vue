<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['process'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />


      <div class="panel-row">
        <div class="label">{{i18n['process.category']}}：</div>
        <div class="input">
          <a-select
            style="width: 100%"
            :placeholder="i18n['process.category']"
            :value="model.category"
            mode="tags"
            allow-create
            :disabled="readOnly"
            @change="(e) => {
              onChange('category', e)
            }"
          >
            <template v-for="(item, index) in props.categories" :key="index">
              <a-select-option :value="item.id" >{{item.name}}</a-select-option>
            </template>
          </a-select>
        </div>
      </div>

      <div class="panel-row">
        <div class="label">{{i18n['process.id']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.id"
            @change="(e) => {
              props.onChange('id', e.target.value)
            }"
          />
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['process.name']}}：</div>
        <div class="input">
          <a-input
            :disabled="readOnly"
            :value="props.model.name"
            @change="(e) => {
              props.onChange('name', e.target.value)
            }"
          />
        </div>
      </div>

      <div class="panel-row">
        <div class="label">{{i18n['process.dataObjs']}}：</div>
        <div class="input">
          <a-button :disabled="readOnly" size="small" @click="()=>{}">{{i18n['tooltip.edit']}}</a-button>
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['process.signalDefs']}}：</div>
        <div class="input">
          <a-button :disabled="readOnly" size="small" @click="()=>{}">{{i18n['tooltip.edit']}}</a-button>
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['process.messageDefs']}}：</div>
        <div class="input">
          <a-button :disabled="readOnly" size="small" @click="()=>{}">{{i18n['tooltip.edit']}}</a-button>
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
  categories: {
    type: Array,
    default: function(){
      return []
    }
  }
})
</script>
