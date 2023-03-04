<script setup lang="ts">
import { ref,unref  } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const quikNav=ref(false)
const onClickOutside = () => {
  quikNav.value=false
  unref(popoverRef).popperRef?.delayHide?.()
}
const show = () => {
  quikNav.value=!quikNav.value
  console.log(popoverRef.value);
  
}
const input = ref('')
</script>

<template>
  <main class="flex flex-col items-center ">
<!-- 搜索表单 -->
<div class="flex items-center justify-center w-full h-48">
  <div class="flex w-1/3 h-12 p-2 mb-8 bg-red-100 rounded-md">
<div class="flex items-center h-full hover:cursor-pointer" ref="buttonRef" v-click-outside="onClickOutside" @click="show()">
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
<el-input v-model="input" placeholder="输入关键词搜索|点击左侧切换引擎" clearable />
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