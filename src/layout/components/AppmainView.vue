<script setup lang="ts">
import { ref,unref  } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { usesug } from '@/utils/api'
import {useSearchStore} from '@/stores/search'
import { storeToRefs } from 'pinia';
import quikNavigate from '@/components/quikNavigate.vue'
import { requiredNumber } from 'element-plus/es/components/table-v2/src/common';
const useSearch = useSearchStore()
const {currentSearchMethod,searchUrl}=storeToRefs(useSearch) as any

// const searchPic= require('../../assets/image/biying.png')
// const img=ref({biying:require('../../assets/image/biying.png'),baidu:'../../assets/image/baidu.png',google:'../../assets/image/google.png'})
const buttonRef = ref()
const popoverRef = ref()
const quikNav = ref(false)
const showSug = ref(false)
const sugList = ref([] as any)
const elinput = ref(null as any)

function getImageUrl(name: any) {    
    return new URL(`../../assets/image/${name}.png`, import.meta.url).href;
}

const onClickOutside = () => {
  quikNav.value=false
  unref(popoverRef).popperRef?.delayHide?.()
}
const showMore = () => {
  quikNav.value=!quikNav.value
  // quikNav.value=false
  console.log(popoverRef.value);
}
const inputBlur = () => {
  setTimeout(() => {
    showSug.value=false
  },100)
}
const input = ref('')
const inputFn =async () => {
  if (input.value !== '') {
    
   await currentSearchMethod.value==='biying'?usesug(currentSearchMethod.value+searchUrl.value.biying.sugPath, input.value).then((res) => {
     res.AS.Results[1] ? sugList.value = res.AS.Results[0].Suggests.concat(res.AS.Results[1].Suggests) : sugList.value = res.AS.Results[0].Suggests
     showSug.value=true
    }) : ''
    
   await currentSearchMethod.value === 'baidu' ? usesug(currentSearchMethod.value + searchUrl.value.baidu.sugPath, input.value).then((res) => {
     sugList.value = res.split('s:[')[1].split(']});')[0].replace(/"/g, '').split(',')
     showSug.value=true
    }) : ''
    
   await currentSearchMethod.value === 'google' ?usesug(currentSearchMethod.value + searchUrl.value.google.sugPath, input.value) : ''
    
  } else {
  showSug.value=false
    
  }
}

const a = document.createElement('a')
a.setAttribute('target', '_blank');

const search = () => {
  console.log(input.value);
  
  if (input.value !== '') {
    currentSearchMethod.value==='biying'?a.setAttribute('href', `${searchUrl.value.biying.searchUrl+searchUrl.value.biying.searchPath+input.value}`):''
    currentSearchMethod.value==='baidu'?a.setAttribute('href', `${searchUrl.value.baidu.searchUrl+searchUrl.value.baidu.searchPath+input.value}`):''
    currentSearchMethod.value==='google'?a.setAttribute('href', `${searchUrl.value.google.searchUrl+searchUrl.value.google.searchPath+input.value}`):''
    a.click()
    elinput.value!.blur()
}  
}
</script>

<template>
  <main class="flex flex-col items-center ">
<!-- 搜索表单 -->
<div class="flex items-center justify-center w-full h-48">
  <div :class="'relative w-1/3 mb-8' ">
 <div :class="'flex w-full h-12 py-2 pr-2 bg-red-100 border-t border-x'+ (showSug===true?' rounded-t-md border-red-400':' rounded-md border-transparent')">
  <!-- 切换搜索引擎 -->
<div class="flex items-center h-full hover:cursor-pointer" ref="buttonRef" v-click-outside="onClickOutside" @click="showMore()">
<img :src="getImageUrl(currentSearchMethod)" class="h-full pl-2 mr-1" alt="">
<div :class="'flex items-center justify-center w-5 text-gray-500 iconfont icon-sanjiaoxia transition-all'+(quikNav===true?' -rotate-180':'')"></div>
<el-popover
    ref="popoverRef"
    :visible="quikNav"
    :virtual-ref="buttonRef"
    trigger="click"
    title=""
    virtual-triggering
    :show-arrow="false"
    placement="bottom-start"
    popper-class="toggleSearch"
  >
  <el-radio-group v-model="currentSearchMethod">
    <el-radio label="biying" class="w-12 h-12"><img src="@/assets/image/biying.png" class="h-full" alt=""></el-radio>
    <el-radio label="baidu" class="w-12 h-12"><img src="@/assets/image/baidu.png" class="h-full" alt=""></el-radio>
    <el-radio label="google" class="w-12 h-12"><img src="@/assets/image/google.png" class="h-full" alt=""></el-radio>
  </el-radio-group>
  </el-popover>
</div>
<!-- 输入框 -->
<el-input v-model="input" ref="elinput" placeholder="输入关键词搜索|点击左侧切换引擎"  clearable @keyup.enter="search()" @input="inputFn()" @blur="inputBlur()"  @focus="input!==''?inputFn():''" />
 </div>

 <!-- 快捷导航 -->
 <div class="absolute flex justify-center w-screen pt-3 -left-full top-full">
  <quikNavigate></quikNavigate>
 </div> 

 <!-- 搜索建议 -->
 <ul v-show="showSug" class="absolute left-0 w-full p-2 bg-red-100 border-b border-red-400 rounded-b border-x top-full">
      <li class="border-t border-red-200"></li>
     <li v-for="item in sugList" :key="item" class="h-10 leading-10 transition-all cursor-pointer hover:bg-red-200" @click="input=item.Txt,search()"><span class="mr-3 text-xl iconfont icon-sousuo"></span>{{currentSearchMethod==='biying'?item.Txt:''}}{{ currentSearchMethod==='baidu'?item:'' }}</li>
  </ul>
  </div>
 
</div>


  <h1 class="mb-6 text-center text-white text-7xl">Pure</h1>

  <h2 class="text-center text-white text-8xl">Search navigation</h2>


  </main>
</template>

<style scoped>
 
 
</style>