<script setup lang="ts">
import {ref} from 'vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus'
const useSearch = useSearchStore()
const { quikNavigate } = storeToRefs(useSearch) as any
const quikListDialog = ref(false)
const openIndex = ref(null as any)
const ulbt=ref(null as any)

const a = document.createElement('a')
a.setAttribute('target','_blank')
const search = (item:any) => {
  a.setAttribute('href', item.url)
  a.click()
}

const openAdd = () => {
  quikListDialog.value=true
  //   ElMessage({
  //   showClose: true,
  //   message: '功能暂未开发，敬请期待！',
  // })
}
const openButton= (index:any) => {
  console.log(2);
  openIndex.value = index;
}
</script>

<template>
  <main>
  <ul class="flex">
      <li class="flex items-center justify-center mr-3 text-white">快捷导航</li>

      <li v-for="item in quikNavigate" :key="item" class="flex items-center p-0.5 pr-3 mr-3 transition-all bg-red-100 bg-opacity-50 border border-transparent rounded-full cursor-pointer hover:border-red-100 h-6" @click="search(item)">
           <img :src="`${item.img}`+'/favicon.ico'" class="h-full mr-1 bg-white rounded-full" alt="">
           <span class="text-xs text-white">{{ item.title }}</span>
      </li>

      <li class="flex items-center justify-center w-6 h-6 text-2xl text-white transition-all bg-red-100 bg-opacity-50 border border-transparent rounded-full cursor-pointer hover:border-red-100 iconfont icon-gengduo" title="添加快捷导航" @click="openAdd()"></li>
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
        <h5 class="transition-all cursor-pointer hover:text-gray-300">+新建快捷导航</h5>
      </div>
  </template>
    <ul class="h-440">
       <li v-for="(item,index) in 10" :key="item" class="flex items-center justify-between px-2 transition-all rounded-sm cursor-pointer hover:bg-red-200 h-11">
         <div class="flex items-center text-gray-50"><img src="../../assets/image/biying.png" class="h-8 mr-2" alt="">必应收缩</div>
         <div class="relative">
             <span class="text-2xl leading-9 scale-150 iconfont text-gray-50 hover:text-gray-400 icon-gengduo" @click="openButton(index)"></span>
             <ul tabindex="2" ref="ulbt" :class="'absolute focus:outline-none py-1 -top-3 flex flex-col justify-center -right-2 w-9 bg-red-100 rounded transition-all h-16'+(openIndex===index?'':' scale-0')" @blur="openIndex=null">
                <li class="flex items-center justify-center flex-1 text-xs transition-all w-9 hover:bg-red-200">修改</li>
                <li class="flex items-center justify-center flex-1 text-xs transition-all w-9 hover:bg-red-200" @click="openIndex=null">删除</li>
             </ul>
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
</style>
