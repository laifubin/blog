<script setup lang="ts">
import {ref, reactive} from 'vue'
import {_login} from '@/api/login'
import router from '@/router/index'
import { useStore } from '@/store/index'
import { storeToRefs } from 'pinia'
import request from '@/utils/request'
import { Md5 } from 'ts-md5/dist/md5'
import { log } from 'console'
 
const drawer = ref(false)
const formRef = ref()
const form = reactive({
  account: '',
  password: '123456'
})
const store = useStore()
// const { menuList } = storeToRefs(store)

const onSubmit = ()=> {
  request({
    url: '/logined',
    method: 'POST',
    data: {
      name: 'laifubin',
      password: Md5.hashStr(form.password)
    }
  }).then(res => {
    console.log(res, 'res=====')
  })
  console.log(Md5.hashStr(form.password), 2323)
  console.log(Md5.hashStr(form.password), 55)
  _login(form).then(res => {
    // console.log('123', res, router.getRoutes());
 
  res.data.forEach((item: any) => {
   router.addRoute( {
            path: item.path,
            name: item.name,
            component: () => import(`../views/${item.name}.vue`),
            meta: {
              auth: true
            }
    })
  })

  store.menuList.push(...res.data)
    // store.$patch({
    //   menuList: store.menuList.push(res)
    // })
    setTimeout(()=>{
      console.log(store.menuList)
    }, 5000)
  })
}
</script>
<template>
  <div class="w-2px h-50px" @click="drawer = true"></div>

  <el-drawer v-model="drawer" title="I am the title" custom-class="login-bg" :with-header="false" direction="ttb" size="61.8%">
    <div class="absolute inset-0 m-auto pt-4 w-1/3 h-240px">
      <div class="text-3xl text-center mb-10">Hi there!</div>
      <el-form ref="formRefs" :model="form">
        <el-form-item prop="account" label="账号" class="text-2xl">
          <el-input v-model="form.account"></el-input>
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