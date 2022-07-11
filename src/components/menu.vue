<script setup lang="ts">
import { ref, watch,  } from 'vue' 
// import { injectRoutes } from '@/router'
import { useRouter, useRoute } from 'vue-router'
import { UserStore } from '@/store/user'

const activeIndex = ref(localStorage.getItem('blog_currentMenu') ?? 'home')
const store = UserStore()
const routes = useRoute()
console.log('2', routes)
 
// useRouter().beforeEach((to, from) => {
  // console.log(to, from, 'to-from')
    // injectRoutes(store.menuList)
// })
watch(() => routes.name, (val) => {
  console.log('vla', val)
  activeIndex.value = (val as string).toLowerCase()
})
watch(activeIndex, val => {
  localStorage.setItem('blog_currentMenu', val)
})
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    :ellipsis="false"
    router
    background-color="transparent"
    active-text-color="var(--color-primary)"
  >
    <el-menu-item v-for="item in store.menuList" :key="item.name" :index="item.name.toLowerCase()">
      {{item.label}}
    </el-menu-item>
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu--horizontal {
  border-bottom: none;
  .el-sub-menu,.el-menu-item {
    height: 50px;
  }
  .el-menu-item:not(.is-disabled):hover {
    background-color: var(--color-second);
  }
}
</style>