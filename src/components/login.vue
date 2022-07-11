<script setup lang="ts">
import {ref, reactive} from 'vue'
import { _login } from '@/api/login'
import { _getMenu } from '@/api/menu'
// import { injectRoutes } from '@/router/index'
import { UserStore } from '@/store/user'
import { Md5 } from 'ts-md5/dist/md5'
import { ElMessage } from 'element-plus'

const drawer = ref(false)
const form = reactive({
  name: '',
  password: ''
})
const store = UserStore()
const loading = ref(false)

const onSubmit = ()=> {
  loading.value = true
  _login({ name: form.name, password: Md5.hashStr(form.password) }).then((res: any) => {
    ElMessage.success(res.msg)
    store.userName = res.data.name
    const token = JSON.stringify({
      ...res.data,
      time: Date.now()
    })
    localStorage.setItem('blog_token', token)

    _getMenu().then(data => {
      // 添加菜单
      store.updateMenuList(data)
    })
  }).finally(() => {
    loading.value = false
  })
}
</script>
<template>
  <div v-loading="loading" class="w-2px h-50px" @click="drawer = true"/>

  <el-drawer v-model="drawer" custom-class="login-bg" :with-header="false" direction="ttb" size="61.8%">
    <div v-loading.fullscreen.lock="loading" class="absolute inset-0 m-auto pt-4 w-1/3 h-240px">
      <div class="text-3xl text-center mb-10">Hi there!</div>
      <el-form ref="formRefs" :model="form">
        <el-form-item prop="name" label="账号" class="text-2xl">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
    
        <el-form-item prop="account" label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <div class="text-right">
          <el-button text type="primary">忘记密码</el-button>
          <el-button text plain type="primary" @click="onSubmit">登录</el-button>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>
<style lang="scss" scoped>
:deep(.el-form-item) > label {
  color: #000;
}
</style>
<style>
.login-bg {
  position: relative;
  background-image: linear-gradient(to bottom, #0c4a6e ,#f0f9ff) !important;
}
</style>