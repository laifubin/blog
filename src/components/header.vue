<script setup lang="ts">
import { ref } from 'vue'
import { UserStore } from '@/store/user';
import Login from './login.vue'
import Menu from './menu.vue'

const content = ref('')
const store = UserStore()
const loginOut = () => {
  store.loginOut()
}
</script>
<template>
  <div class="flex flex-wrap justify-between items-center bg-sky-200" >
    <div class="flex-grow-1 flex items-center">
      <Login v-if="store.userName===''"/>
      <div class="px-4">{{ store.userName || '游客' }}, 欢迎您</div>
      <Menu/>
    </div>
    <el-input v-model="content" class="me-4 w-auto search-input"/>
    <div class="px-4 flex-grow-1 flex items-center">
      <template  v-if="store.userName!==''">
        <span class="w-80px text-gray-500 text-center cursor-pointer">修改密码</span>
        <span class="w-40px text-gray-500 text-center cursor-pointer" @click="loginOut">退出</span>
      </template>
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