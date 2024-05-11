<template>
  <div :data-clazz="props.model.clazz">
    <div class="panel-title">{{ i18n['userTask'] }}</div>
    <div class="panel-body">

      <default-detail :model="model" :onChange="onChange" :readOnly="readOnly" />

      <div class="panel-row">
        <div class="label">{{i18n['userTask.assignType']}}：</div>
        <div class="input">
          <a-select
            style="width: 100%"
            :placeholder="i18n['userTask.assignType.placeholder']"
            :value="model.assignType"
            :disabled="readOnly"
            @change="(e) => {
              console.log(e)
              onChange('assignValue', []);
              onChange('assignType', e)
            }"
          >
            <a-select-option value="assignee">{{i18n['userTask.assignType.assignee']}}</a-select-option>
            <a-select-option value="person">{{i18n['userTask.assignType.person']}}</a-select-option>
            <a-select-option value="persongroup">{{i18n['userTask.assignType.persongroup']}}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="panel-row" v-if="model.assignType === 'assignee'">
        <div class="label">{{i18n['userTask.assignType.assignee.title']}}：</div>
        <div class="input">
          <a-select
            style="width: 100%"
            :placeholder="i18n['userTask.assignType.assignee.placeholder']"
            :value="model.assignValue"
            mode="tags"
            allow-create
            :disabled="readOnly"
            @change="(e) => {
              console.log(e)
              onChange('assignValue', e)
            }"
          >
            <template v-for="(item, index) in props.users" :key="index">
              <a-select-option :value="item.id" >{{item.name}}</a-select-option>
            </template>
          </a-select>
        </div>
      </div>
      <div class="panel-row" v-if="model.assignType === 'person'">
        <div class="label">{{i18n['userTask.assignType.person.title']}}：</div>
        <div class="input">
          <a-select
            style="width: 100%"
            :placeholder="i18n['userTask.assignType.person.placeholder']"
            :value="model.assignValue"
            mode="tags"
            allow-create
            :disabled="readOnly"
            @change="(e) => {
              console.log(e)
              onChange('assignValue', e)
            }"
          >
            <template v-for="(item, index) in props.users" :key="index">
              <a-select-option :value="item.id" >{{item.name}}</a-select-option>
            </template>
          </a-select>
        </div>
      </div>
      <div class="panel-row" v-if="model.assignType === 'persongroup'">
        <div class="label">{{i18n['userTask.assignType.persongroup.title']}}：</div>
        <div class="input">
          <a-select
            style="width: 100%"
            :placeholder="i18n['userTask.assignType.persongroup.placeholder']"
            :value="model.assignValue"
            mode="tags"
            allow-create
            :disabled="readOnly"
            @change="(e) => {
              console.log(e)
              onChange('assignValue', e)
            }"
          >
            <template v-for="(item, index) in props.groups" :key="index">
              <a-select-option :value="item.id" >{{item.name}}</a-select-option>
            </template>
          </a-select>
        </div>
      </div>

      <div class="panel-row">
        <div class="label">{{i18n['userTask.dueDate']}}：</div>
        <div class="input">
          <a-date-picker
            :placeholder="i18n['userTask.dueDate.placeholder']"
            :disabled="readOnly"
            show-time
            :value="dayjs(props.dueDate)"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="(e) => {
              props.onChange('dueDate', e)
            }"
          />
        </div>
      </div>
      <div class="panel-row">
        <div class="label">{{i18n['userTask.counterSign']}}：</div>
        <div class="input">
          <a-checkbox
            class="input"
            :disabled="props.readOnly"
            :checked="!!model.isSequential"
            @change="(e) => {
              props.onChange('isSequential', e.target.checked)
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
import dayjs from "dayjs"

const i18n = inject('i18n')

// eslint-disable-next-line no-undef
const props = defineProps({
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
