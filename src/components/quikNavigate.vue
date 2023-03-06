<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus'
const useSearch = useSearchStore()
const { quikNavigate } = storeToRefs(useSearch) as any


const a = document.createElement('a')
a.setAttribute('target','_blank')
const search = (item:any) => {
  a.setAttribute('href', item.url)
  a.click()
}

const openAdd = () => {
    ElMessage({
    showClose: true,
    message: '功能暂未开发，敬请期待！',
  })
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
  </main>
</template>

<style scoped>

</style>
