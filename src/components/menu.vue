<script setup lang="ts">
import {ref} from 'vue' 
import { useStore } from '@/store/index'

const activeIndex = ref('home')
const store = useStore ()

</script>
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    router
    background-color="transparent"
    active-text-color="var(--color-primary)"
  >
    <el-menu-item v-for="item in store.menuList" :key="item.name" :index="item.name">{{item.label}}</el-menu-item>
    
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