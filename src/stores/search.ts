import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    searchUrl: {
      biying:{sugUrl:'https://api.bing.com',sugPath:'/qsonhs.aspx?type=cb&q=',searchUrl:'https://cn.bing.com',searchPath:'/search?q='},
      baidu:{sugUrl:'http://suggestion.baidu.com',sugPath:'/su?wd=',searchUrl:'https://www.baidu.com',searchPath:'/s?wd='},
      google:{sugUrl:'http://clients1.google.com',sugPath:'/complete/search?hl=zh&output=toolbar&q=',searchUrl:'https://www.google.com',searchPath:'/search?ie=UTF-8&q='}
    }
  })
})
