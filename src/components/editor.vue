<script setup lang="ts">
import { computed } from 'vue';

import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])

const content = computed({
  get () {
    return props.modelValue
  },
  set (val: string) {
    emits('update:modelValue', val)
  }
})
</script>
<template>
  <div class="p-4 pt-0">
     <editor
      v-model="content" 
      :init="{
        height: 400,
        language: 'zh_CN',
        statusbar: false, // 隐藏底部状态栏
        // inline: true,
        // skin: 'oxide-dark', // 深色主题，默认浅色
        branding: false, //隐藏右下角技术支持
        plugins: 'advlist autolink link image lists preview fullscreen', //字符串方式
        toolbar: 'bold italic underline strikethrough image | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | removeformat fullscreen preview', 
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
      }"
    />
  </div>
</template>