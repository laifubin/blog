<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import type { PropType } from 'vue'

type TValue = string | number | boolean

type TEmits = {
  (e: 'update:modelValue', value: TValue): void;
}

const emits = defineEmits<TEmits>()
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  },
  request: {
    type: Function,
    required: true
  },
  /** 启用对应的值，默认 `true` */
  activeValue: {
    type: [String, Number, Boolean],
    default: true
  },
  /** 禁用对应的值，默认 `false` */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false
  }
})

const loading = ref(false)
const value = computed({
  get () {
    return props.modelValue
  },
  set (val: TValue) {
    emits('update:modelValue', val)
  }
})

async function onChange () {
  loading.value = true
  const { activeValue, inactiveValue, id } = props
  const status = value.value === activeValue ? inactiveValue : activeValue
  return props.request({ id, status})
    .then((res: any) => {
      ElMessage.success('操作成功！')
      if (res.code !== 200) {
        return Promise.reject(res.msg)
      }
      return true
    }).finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <el-switch v-model="value"
             :loading="loading"
             :before-change="onChange"
             :active-value="activeValue"
             :inactive-value="inactiveValue"
  />
</template>
