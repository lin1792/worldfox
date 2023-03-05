<script setup lang="ts">
import { ref,unref  } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import {usesug} from '@/utils/api'
const buttonRef = ref()
const popoverRef = ref()
const quikNav = ref(false)
const showSug = ref(false)
const sugList = ref([] as any)
const elinput=ref(null as any)
const onClickOutside = () => {
  quikNav.value=false
  unref(popoverRef).popperRef?.delayHide?.()
}
const showMore = () => {
  // quikNav.value=!quikNav.value
  quikNav.value=false
  console.log(popoverRef.value);
}
const inputBlur = () => {
  setTimeout(() => {
    showSug.value=false
  },100)
}
const input = ref('')
const inputFn = () => {
  if (input.value !== '') {
    usesug(1, 1, input.value).then((res) => {
    sugList.value = res.AS.Results[0].Suggests.concat(res.AS.Results[1].Suggests)
    })
    showSug.value=true
  } else {
  showSug.value=false
    
  }
  
}

const a = document.createElement('a')
a.setAttribute('target', '_blank');

const search = () => {
  console.log(input.value);
  
  if (input.value !== '') {
a.setAttribute('href', `https://cn.bing.com/search?q=${input.value}`);
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
 <div :class="'flex w-full h-12 p-2 bg-red-100 border-t border-x'+ (showSug===true?' rounded-t-md border-red-600':' rounded-md border-transparent')">
  <!-- 切换搜索引擎 -->
<div class="flex items-center h-full hover:cursor-pointer" ref="buttonRef" v-click-outside="onClickOutside" @click="showMore()">
<img src="@/assets/image/bing.png" class="h-full mr-1" alt="">
<div :class="'flex items-center justify-center w-5 text-gray-500 iconfont icon-sanjiaoxia transition-all'+(quikNav===false?' -rotate-90':'')"></div>
<el-popover
    ref="popoverRef"
    :visible="quikNav"
    :virtual-ref="buttonRef"
    trigger="click"
    title="With title"
    virtual-triggering
  >
    <span> Some content </span>
  </el-popover>
</div>
<!-- 输入框 -->
<el-input v-model="input" ref="elinput" placeholder="输入关键词搜索|点击左侧切换引擎"  clearable @keyup.enter="search()" @input="inputFn()" @blur="inputBlur()"  @focus="input!==''?inputFn():''" />
 </div>

 <!-- 搜索建议 -->
 <ul v-show="showSug" class="absolute left-0 w-full bg-red-200 border-b border-red-600 rounded-b border-x top-full">
     <li v-for="item in sugList" :key="item" class="cursor-pointer" @click="input=item.Txt,search()">{{ item.Txt }}</li>
  </ul>
  </div>
 
</div>

<!-- 快捷导航 -->
  <div></div> 

  <h1 class="mb-6 text-center text-white text-7xl">狐域未来</h1>

  <h2 class="text-center text-white text-8xl">Search navigation</h2>


  </main>
</template>

<style scoped>

</style>