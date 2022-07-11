<template>
  <el-dialog v-model="show"
             :title="options.title"
             :width="options.width"
             append-to-body
             custom-class="custom-dialog"
             v-bind="dialogOptions"
             @closed="onClosed"
  >
    <slot />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import type { PropType } from 'vue'
import type { InsertOptions } from 'vue-insert-component'

const props = defineProps({
  options: {
    type: Object as PropType<InsertOptions>,
    default: () => ({
      title: '',
      width: '50%'
    })
  }
})

const emits = defineEmits(['close'])

const show = ref(true)
const dialogOptions = computed(() => {
  const defaults = {
    'destroy-on-close': true,
    'append-to-body': true,
    'close-on-click-modal': false
  }
  return Object.assign(defaults, props.options.dialogOptions)
})

provide('close', (...args: any[]) => {
  show.value = false
  if (props.options.callback) {
    props.options.callback(...args)
  }
})

const onClosed = () => emits('close')

</script>

<style lang="scss">
.el-overlay-dialog{
  display: flex;
  justify-content: center;
  align-items: center;
  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    max-height: calc(100% - 50px);
    max-width: calc(100% - 50px);
    .el-dialog__body {
      padding: 0;
      flex: 1;
      overflow: auto;
    }
    .el-dialog__header{
      border-bottom: 1px #eee solid;
      padding: 10px 30px 10px 15px;
      .el-dialog__title {
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }  
}
</style>