<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import type { PropType } from 'vue';
import { useUninsert } from 'vue-insert-component'
import Editor from '@/components/editor.vue'
import { _updateBlog, TUpdateBlogReq } from '@/api/blog'

const props = defineProps({
  row: {
    type: Object as PropType<TUpdateBlogReq>,
    default: () => ({})
  },
  location: {
    type: String,
    default: ''
  },
  categoryList: {
    type: Array as PropType<{ label: string, value: number }[]>,
    default: () => []
  }
})
console.log('row', props.row);

const unInsert = useUninsert()
const originLocation = ref<string>('')
type TForm =  Omit<TUpdateBlogReq, "id">
const form = reactive({
  title: '',
  content: '',
  author: '',
  status: 1,
  category: '',
  location: props.location
})
const rules = reactive({
  title: [{ required: true, message: '请输入标题' }],
  category: [{ required: true, message: '请选择分类' }],
  author: [{ required: true, message: '请输入作者' }]
})
const formRef = ref()
const loading = ref(false)
type TFormKey = keyof TForm

if (props.row?.id) {  
  (Object.keys(form) as TFormKey[]).forEach((key) => {
    const val = props.row[key]
    if (key === 'location') originLocation.value = val as string
    else if (key === 'category') (form as any)[key] = +val
    else (form as any)[key] = val
  })
}

const onSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (loading.value) return
      loading.value = true

      const data = { ...form } as TUpdateBlogReq
      if(props.row?.id) data.id = props.row?.id
      _updateBlog(data).then(() => {
        ElMessage.success('操作成功！')
        unInsert(true)
      }).finally(() => {
        loading.value = false
      })
    }
  })
}
</script>
<template>
   <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" label-width="60px" class="pt-4">
    <el-row>
      <el-col :span="6">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" />
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
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
      <el-col :span="7">
        <el-form-item label="区域"><!-- label-width="48px" -->
           <div>{{ form.location }} <span class="text-gray-500/50" v-if="form.location!==originLocation&&originLocation!==''">(现) / {{ originLocation }}(前)</span></div>
        </el-form-item>
      </el-col>
    </el-row>

    <Editor v-model="form.content"/>
    <div class="text-end mb-4 me-4">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="unInsert(false)">取消</el-button>
    </div>
  </el-form>
</template>