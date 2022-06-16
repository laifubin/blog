<script setup lang="ts">
import {ref} from 'vue'
import { _test } from "@/api/index";

const latestNewList = ref<{id:number,title: string}[]>([])
_test().then((res:any)=> {
  latestNewList.value = res
  console.log('%c_test: ', 'color:blue;font-size:16px;', res)
})
</script>
<template>
<div class="w-1/5 max-h-full fixed right-24px top-50px bottom-10px overflow-y-auto">
  <div class="shadow m-2 p-2 min-h-200px">
    <div v-for="item in latestNewList" :key="item.id" class="my-4">{{item.title}}</div>
  </div>
</div>
</template>
