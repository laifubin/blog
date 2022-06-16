<script setup lang="ts">
import { useWatermark } from '@/use/use-watermark'
import Header from './components/header.vue'
import Aside from './components/aside.vue'
 
const { ZhWatermark } = useWatermark()
</script>

<template>
  <Header/>
  <div id="main" class="relative overflow-x-hidden overflow-y-auto pe-1/4" style="height: calc(100vh - 50px);padding-right: calc(20vw + 20px)">
   <router-view/> 
    <Aside/>
  </div>
  <el-backtop :right="20" :bottom="10" target="#main"/>
  <ZhWatermark/>
</template>

