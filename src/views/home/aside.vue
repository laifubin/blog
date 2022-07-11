<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { PropType } from 'vue';
import { _getNewBlogList, _detailsBlog } from "@/api/blog";

const emits = defineEmits(['getDetails'])
defineProps({
  formatterCategory: {
    type: Function as PropType<(category: number) => string|number>,
    default: () => []
  }
})

const blogList = ref<Record<string, any>[]>([])
const currentPage = ref(1)
const loading = ref(false)
const noMore = ref(false)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  _getNewBlogList(currentPage.value).then((res:any)=> {
    currentPage.value++
    noMore.value = res.data.length < 20 // 一次性返回20条，不足20表示没数据了
    blogList.value.push(...res.data)
  }).finally(() => {
    loading.value = false
  })
}

const getDetails = (id: string) => {
  _detailsBlog(id).then(res => {
    emits('getDetails', res.data)
  })
}
</script>
<template>
<!-- fixed right-24px top-60px bottom-10px -->
  <div class="infinite-list-wrapper w-1/5 max-h-full overflow-auto">
    <ul
      v-infinite-scroll="load"
      class="list shadow"
      :infinite-scroll-disabled="disabled"
    >
      <li v-for="blog in blogList" :key="blog.id" class="list-item cursor-pointer" @click="getDetails(blog.id)">
      <div class="ellipsis-1">{{ blog.title }}</div>
      <span class="text-gray-500 text-sm">{{ formatterCategory(blog.category) }}</span>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">我也是有底线的哦。。。</p>
  </div>
</template>

<style>
.infinite-list-wrapper {
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  padding: 0 1rem;
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>
