<script setup lang="ts">
import { reactive } from 'vue';
import { useGeolocation } from '@vueuse/core'


// import Editor from '@/components/tinymceEditor.vue'
import Editor from '@tinymce/tinymce-vue'
const data = useGeolocation()

const state = reactive({
  content: 'hello vue3-tinymce!',
  // editor 配置项
  setting: {
    height: 400, // editor 高度
  },
});
 document.addEventListener('dblclick', ()=>{
   console.log('test', state.content);
   const { coords, locatedAt, error } = useGeolocation()
   console.log('dddd', coords.value.latitude.toString(), locatedAt, error);
   
 })
</script>
<template>
  <div class="h-1000px pt-4 ps-4">
     <editor
      v-model="state.content" 
      :init="{
        height: 500,
        language: 'zh_CN',
        statusbar: false, // 隐藏底部状态栏
        // inline: true,
        // skin: 'oxide-dark', // 深色主题，默认浅色
        // branding: false //隐藏右下角技术支持
        plugins: 'advlist autolink link image lists preview fullscreen', //字符串方式
        toolbar: 'bold italic underline strikethrough image | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | removeformat fullscreen preview', 
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
      }"
    />
  </div>
</template>