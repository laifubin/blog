<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, Grid, Timer, Location } from '@element-plus/icons-vue'
import Aside from './aside.vue'
import { _getCategoryList } from '@/api/category'
import { _searchBlog, TSearchBlogReq } from '@/api/blog'

const detailsData = ref<Record<string, any>>({})
const categoryList = ref<{ label: string, value: number }[]>([])
const loading = ref(false)
const blogList = ref<Record<string, any>>([])
_getCategoryList().then(data => {
  categoryList.value = data
})
const getDetails = (data: Record<string, any>) => {
  detailsData.value = data
}
const formatterCategory = (category: number) => {
  return categoryList.value.find((item: any) => item.value === +category)?.label ?? category
}
const onBack = () => {
  detailsData.value = {}
}

const onSearch = () => {
  loading.value = true
  _searchBlog({ title: '', status: 1, current: 1, size: 5} as TSearchBlogReq).then(res => {
    blogList.value = res.data
  }).finally(() => {
    loading.value = false
  })
}
if (!blogList.value.length) onSearch()
</script>
<template>
  <div class="flex justify-between px-2" style="height: calc(100vh - 66px);">
    <div v-loading="loading" class="flex-grow-1 w-full me-4 mb-4 overflow-auto">
      <template v-if="detailsData.id">
        <el-page-header :icon="ArrowLeft" content="" title="返回" class="sticky top-0 bg-white" @back="onBack"/>
        <div class="text-center text-2xl font-bold">{{ detailsData.title }}</div>
        <div class="flex justify-between text-gray-500 text-sm">
          <span>作者：{{ detailsData.author }}</span>
          <span>时间：{{ detailsData.updateTime }} 地点：{{ detailsData.location }}</span>
        </div>
        <div v-html="detailsData.content" />
      </template>

      <div v-else v-for="item in blogList" :key="item.id" class="flex justify-between blog_item py-4 w-full" @click="getDetails(item)">
        <div class="flex-grow-1 w-full">
          <div class="text-2xl ellipsis-1 title">{{ item.title }}</div>
          <div v-html="item.content" class="text-base ellipsis-2 my-1" />
          <div class="text-base text-gray-500 text-end px-4">
            <span><el-icon class="vertical-middle"><Grid /></el-icon> {{ formatterCategory(item.category) }}</span>
            <span class="mx-4"><el-icon class="vertical-middle"><Timer /></el-icon> {{ item.updateTime }}</span>
            <span><el-icon class="vertical-middle"><Location /></el-icon>{{ item.location }}</span>
          </div>
        </div>
        <!-- <el-image :src="item.image"></el-image> -->
      </div>
    </div>
    <Aside @get-details="getDetails" :formatter-category="formatterCategory"/>
  </div>

</template>

<style lang="scss" scoped>
.blog_item:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.blog_item:hover .title {
  color: var(--el-color-primary);
}
</style>