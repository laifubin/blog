<script setup lang="ts">
import { useWatermark } from '@/use/use-watermark'
import Header from '@/components/header.vue'

const { ZhWatermark } = useWatermark()
</script>

<template>
  <Header/>
  <div id="main" class="relative overflow-x-hidden overflow-y-auto p-4" style="height: calc(100vh - 50px);">
    <router-view/>
  </div>
  <el-backtop :right="20" :bottom="10" class="z-100" target="#main"/>
  <slot/>
  <!-- <ZhWatermark/> -->
</template>
