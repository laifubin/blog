<script setup lang="ts">
import { ref } from 'vue'

import Login from './login.vue'
import Menu from './menu.vue'

const content = ref('')
</script>
<template>
  <div class="flex justify-between items-center bg-sky-200" >
    <Login/>
    <div class="px-4 flex-grow-1 flex-shrink-0">xxxx, 欢迎您！</div>
    <div class="flex-grow-1 w-full"><Menu/></div>
    <div  class="px-4 flex-grow-1 flex items-center">
      <el-input v-model="content" class="me-4 w-xs search-input"></el-input>
      <span class="w-80px text-gray-500 text-center cursor-pointer">修改密码</span>
      <span class="w-40px text-gray-500 text-center cursor-pointer">退出</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-input {
  border-bottom: 1px solid var(--color-primary);
  
  & > :deep(.el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;

}
}
</style>