import { defineStore, } from 'pinia'
export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    currentSearchMethod:'' as any,
    searchUrl: {
      biying:{sugUrl:'https://api.bing.com',sugPath:'/qsonhs.aspx?type=cb&q=',searchUrl:'https://cn.bing.com',searchPath:'/search?q='},
      baidu:{sugUrl:'http://suggestion.baidu.com',sugPath:'/su?wd=',searchUrl:'https://www.baidu.com',searchPath:'/s?wd='},
      google:{sugUrl:'http://clients1.google.com',sugPath:'/complete/search?hl=zh&output=toolbar&q=',searchUrl:'https://www.google.com',searchPath:'/search?ie=UTF-8&q='}
    },
    quikNavigate: [] as any,
    // quikNavList:[] as any
  }),

  getters: {
    currentSearchUrl() {
      let a = ''
      this.currentSearchMethod==='biying'?a=this.searchUrl.biying.sugPath:''
      this.currentSearchMethod==='baidu'?a=this.searchUrl.baidu.sugPath:''
      this.currentSearchMethod==='google'?a=this.searchUrl.google.sugPath:''
      return a
    }
  },

  actions: {
    useupdata() {
      // console.log(JSON.parse(localStorage.getItem('search')!) );
      
      localStorage.getItem('search') ? this.currentSearchMethod = JSON.parse(localStorage.getItem('search')!).currentSearchMethod : this.currentSearchMethod = 'biying'
      
      localStorage.getItem('search') ? this.quikNavigate = JSON.parse(localStorage.getItem('search')!).quikNavigate : this.quikNavigate=[{url:'https://juejin.cn',img:'https://juejin.cn',title:'稀土掘金'},{url:'https://www.zhihu.com',img:'https://www.zhihu.com',title:'知乎'},{url:'https://www.bilibili.com',img:'https://www.bilibili.com',title:'哔哩哔哩'}]

    },


    addquikNavigate(item:any) {
      this.quikNavigate.push(item)
    },
    removequikNavigate(rmIndex:any) {
      this.quikNavigate = this.quikNavigate.filter((item: any, index: any) => {
        if (index !== rmIndex) {
          return item
        }
      })
    },
    edituikNavigate(rmIndex:any,item:any) {
      this.quikNavigate.splice(rmIndex, 1, item)
    }
  },
  persist: {
    // key:'123213',
		storage: localStorage,
		paths:['currentSearchMethod','quikNavigate']
  }
})

// piniaPersist(持久化)
// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);
// export default pinia;
