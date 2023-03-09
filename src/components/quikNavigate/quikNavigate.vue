<script setup lang="ts">
import {ref,reactive} from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import {debounce,throttle} from 'lodash'

const useSearch = useSearchStore()
const { quikNavigate } = storeToRefs(useSearch) as any
const {addquikNavigate,removequikNavigate,edituikNavigate}=useSearch
const quikListDialog = ref(false)
let editIndex = ref(null as any)
const quikNumber=ref(1)
const ulbt = ref(null as any)
const showeditbutton=ref(false)

const a = document.createElement('a')
a.setAttribute('target','_blank')
const search = (item:any) => {
  a.setAttribute('href', item.url)
  a.click()
}

const openAdd = () => {
  resetForm()
  quikListDialog.value=true
  //   ElMessage({
  //   showClose: true,
  //   message: '功能暂未开发，敬请期待！',
  // })
}
const openEdit= (item:any,index:any) => {
  editIndex.value = index;
  dynamicValidateForm.title=item.title
  dynamicValidateForm.url = item.url
  
}

// 表单
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{
  url: string
  title: string
}>({
  url:'',
  title: '',
})

const submitForm = throttle((formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    if (valid) {
      const imgurl = dynamicValidateForm.url.split('/')
      if (editIndex.value === null) {
        if (quikNavigate.value.length < 10) {
          await addquikNavigate({ url: dynamicValidateForm.url, img: imgurl[0] + '//' + imgurl[2], title: dynamicValidateForm.title })
        resetForm()
        } else {
            ElMessage.error({
              showClose: true,
    message: '快捷导航数量已达上限！',
  })
        }
        
      } else {
        edituikNavigate(editIndex.value, { url: dynamicValidateForm.url, img: imgurl[0] + '//' + imgurl[2], title: dynamicValidateForm.title })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
},1000)


const resetForm = () => {
  // 表单重置
  if (!formRef.value) return
  formRef.value.resetFields()

  editIndex.value=null
}
</script>

<template>
  <main>
  <ul class="flex flex-wrap">
      <li class="flex items-center justify-center mb-3 mr-3 text-white">快捷导航</li>

      <li v-for="item in quikNavigate" :key="item" class="flex mb-3 items-center p-0.5 pr-3 mr-3 transition-all bg-red-100 bg-opacity-50 border border-transparent rounded-full cursor-pointer hover:border-red-100 h-6" @click="search(item)">
           <img :src="`${item.img}`+'/favicon.ico'" class="h-full mr-1 bg-white rounded-full" alt="">
           <span class="text-xs text-white">{{ item.title }}</span>
      </li>

      <li class="flex items-center justify-center w-6 h-6 mb-3 text-2xl text-white transition-all bg-red-100 bg-opacity-50 border border-transparent rounded-full cursor-pointer hover:border-red-100 iconfont icon-gengduo" title="添加快捷导航" @click="openAdd()"></li>
  </ul>

  <!-- 切换页 -->
  <el-dialog
    v-model="quikListDialog"
    width="30%"
    :show-close="false"
    align-center
    class="bg-red-100 bg-opacity-40 backdrop-blur-xl"
  >
  <template #header>
      <div class="flex items-center justify-between cursor-default text-gray-50 my-header">
        <h1 class="text-lg">快捷导航</h1>
        <h5 class="transition-all cursor-pointer hover:text-gray-300" @click="resetForm()">+新建快捷导航</h5>
      </div>
  </template>
  <div v-show="quikNumber<10" :class="'transition-all w-full border-b'">
    <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="120px"
    class="flex items-end justify-between demo-dynamic"
  >
    <div style="flex:0.9">
    <el-form-item
      prop="url"
      label="URL"
      :rules="[
        {
          required: true,
          message: 'url不能为空',
          trigger: 'blur',
        },
        {
          type:'url',
          required: true,
          message: '请输入正确的url',
          trigger: 'blur',
        },
      ]"
    >
      <el-input v-model="dynamicValidateForm.url" />
    </el-form-item>
    <el-form-item
      :label="'网站名称'"
      :prop="'title'"
      :rules="[
      {
        required: true,
        message: '网站名称不能为空',
        trigger: 'blur',
      },
      {
        min:1,
        max:10,
        message: '网站名称长度在1到10个字符！',
        trigger: 'blur',
      }
      ]"
    >
      <el-input v-model="dynamicValidateForm.title" />
    </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
    </el-form-item>
  </el-form>
          </div>
    <ul class="h-440">
       <li v-for="(item,index) in quikNavigate" :key="item" class="">
         <div class="flex items-center justify-between px-2 transition-all rounded-sm cursor-pointer hover:bg-red-200 h-11">
          <div class="flex items-center text-gray-50"><img :src="item.img + '/favicon.ico'" class="mr-2 h-7" alt="">{{ item.title }}</div>
         <div>
          <el-popover
    placement="top"
    trigger="click"
    :show-arrow="false"
    :hide-after="0"
    popper-class="editSearch"
  >
    <template #reference>
      <span class="text-2xl leading-9 scale-150 iconfont text-gray-50 hover:text-gray-400 icon-gengduo"></span>
    </template>
    <ul tabindex="2" ref="ulbt" :class="'absolute focus:outline-none py-1 -top-3 flex flex-col justify-center -right-2 w-9 bg-red-100 rounded transition-all h-16'" >
                <li class="flex items-center justify-center flex-1 text-xs transition-all cursor-pointer w-9 hover:bg-red-200" @click="openEdit(item,index)">修改</li>
                <li class="flex items-center justify-center flex-1 text-xs transition-all cursor-pointer w-9 hover:bg-red-200" @click="removequikNavigate(index)">删除</li>
             </ul>
  </el-popover>
         </div>
         </div>
      </li>
    </ul>
  </el-dialog>
  
  </main>
  
</template>

<style scoped lang="less">
:deep(.el-dialog__header){
  border-bottom: 1px solid rgb(254 226 226) !important;
  margin-right: 0 !important;
}
:deep(.el-form-item__content){
  margin: 0 !important;
}
:deep(.el-form-item__label){
  color: #fff !important;
}

:deep(.el-button--primary){
  --el-button-border-color:rgb(254 226 226) !important;
  --el-button-hover-border-color:rgb(254 226 226) !important;
  --el-button-hover-bg-color: rgb(254 226 226) !important;
  --el-button-active-bg-color: rgb(254 226 226) !important;
    --el-button-active-border-color: rgb(254 226 226) !important;
    --el-button-hover-text-color:rgb(247, 96, 96) !important;
}
</style>
