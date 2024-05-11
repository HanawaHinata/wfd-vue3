<template>
  <div class="toolbar">
    <div class="edit-button-box">
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.undo'] }}</template>
        <span class="command" data-command="undo"><UndoOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.redo'] }}</template>
        <span class="command" data-command="redo"><RedoOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.copy'] }}</template>
        <span class="command" data-command="copy"><CopyOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.paste'] }}</template>
        <span class="command" data-command="paste"><SnippetsOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.delete'] }}</template>
        <span class="command" data-command="delete"><DeleteOutlined /></span>
      </a-tooltip>
      <a-divider type="vertical"/>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.zoomIn'] }}</template>
        <span class="command" data-command="zoomIn"><ZoomInOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.zoomOut'] }}</template>
        <span class="command" data-command="zoomOut"><ZoomOutOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.resetZoom'] }}</template>
        <span class="command" data-command="resetZoom"><OneToOneOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.autoFit'] }}</template>
        <span class="command" data-command="autoFit"><ColumnWidthOutlined /></span>
      </a-tooltip>
      <a-divider type="vertical"/>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.toFront'] }}</template>
        <span class="command" data-command="toFront"><VerticalAlignTopOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>{{ i18n['tooltip.toBack'] }}</template>
        <span class="command" data-command="toBack"><VerticalAlignBottomOutlined /></span>
      </a-tooltip>
    </div>
    <div class="slot-button-box">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import {inject} from "vue";
import {
  UndoOutlined,
  RedoOutlined,
  CopyOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  OneToOneOutlined,
  ColumnWidthOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,

} from "@ant-design/icons-vue"

const i18n = inject('i18n')
</script>

<style scoped lang="less">
.toolbar {
  text-align: left;
  width: 100%;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #E9E9E9;
  box-shadow: 0 8px 12px 0 rgba(0, 52, 107, 0.04);
  box-sizing: border-box;
  display: flex;

  .edit-button-box {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: auto;

    .command {
      margin: 0 6px;
      border: 1px solid rgba(2, 2, 2, 0);
      border-radius: 2px;
      cursor: pointer;
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease-in-out;


      &:nth-of-type(1) {
        margin-left: 24px;
      }

      &:hover {
        border: 1px solid #E9E9E9;
        transition: all 200ms ease-in-out;
      }
    }
  }

  .slot-button-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
