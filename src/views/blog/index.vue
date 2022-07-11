<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, rowContextKey } from 'element-plus'
import { useInsert } from 'vue-insert-component'
import { _searchBlog, TSearchBlogReq, _deleteBlog, _updateBlogStatus } from '@/api/blog'
import { _getLocation } from '@/api/location'
import { _getCategoryList } from '@/api/category'
import Switch from '@/components/switch.vue'
import UpdateBlogComponent from './updateBlog.vue'

const form = reactive({
  title: '',
  category: '',
  status: ''
})
const current = ref(1)
const size = ref(20)
const total = ref(0)
const formRef = ref()
const tableData = ref<Record<string, any>[]>([])
const loading = ref(false)
const location = ref('')
const categoryList = ref<{ label: string, value: number }[]>([])

_getLocation().then(data => {
  location.value = data
})
_getCategoryList().then(data => {
  categoryList.value = data
})

const onSearch = () => {
  loading.value = true
  const data = { ...form, current: current.value, size: size.value } as TSearchBlogReq
  data.status === '' && delete data.status
  data.category === '' && delete data.category
  _searchBlog(data as TSearchBlogReq).then(res => {
    tableData.value = res.data
    total.value = res.total
  }).finally(() => {
    loading.value = false
  })
}
onSearch()
const onReset = () => {
  formRef.value?.resetFields()
}
const indexMethod = (index: number) => {
  return (current.value - 1) * size.value + index + 1
}
const onDelete = (id: string) => {
  loading.value = true
  _deleteBlog(id).then(() => {
    ElMessage.success('删除成功！')
    onSearch()
  }).finally(() => {
    loading.value = false
  })
}
const updateBlog = (row?: Record<string, any>) => {
  const props: Record<string, any> = {location: location.value, categoryList: categoryList.value }
  if (row) props.row = row
  useInsert({
    title: row?.id ? '修改' : '新增',
    component: UpdateBlogComponent,
    props,
    width: '80vw',
    callback: (bool: boolean) => {
      if (bool) onSearch()
    }
  })
}
const formatterCategory = (...args: any[]) => {
  const [ row ] = args as [ any ]
  return categoryList.value.find((item: any) => item.value === +row.category)?.label ?? row.category
}
</script>

<template>
  <el-form ref="formRef" :model="form" label-width="60px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" clearable filterable class="w-full" placeholder=" ">
            <el-option
              v-for="item in categoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="">全部</el-radio>
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="updateBlog()">新增</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-table v-loading="loading" :data="tableData" class="w-full mb-4" border>
    <el-table-column type="index" label="序号" width="70" :index="indexMethod" align="center"/>
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="category" label="分类" :formatter="formatterCategory"/>
    <el-table-column prop="author" label="作者" width="180" />
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <Switch v-model="row.status" :request="_updateBlogStatus" :id="row.id" :activeValue="1" :inactiveValue="0" />
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="updateTime" label="更新时间" />
    <el-table-column prop="handler" label="操作">
      <template #default="{ row }">
        <el-button type="primary" text @click="updateBlog(row)">修改</el-button>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          :title="`确认删除标题为${row.title}的文章吗？`"
          @confirm="onDelete(row.id)"
        >
          <template #reference>
            <el-button type="danger" text>删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:currentPage="current"
      v-model:page-size="size"
      :page-sizes="[20, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSearch"
      @current-change="onSearch"
      class="sticky bottom-16px right-20px z-10 bg-white"
    >
  </el-pagination>
</template>

<style lang="scss" scoped>

</style>
