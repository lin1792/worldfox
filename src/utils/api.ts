// import { storeToRefs } from 'pinia';
import http from './http';
// import { useSearchStore } from '@/stores/search.ts'
// const useSearch = useSearchStore()
// const {currentSearchMethod}=storeToRefs(useSearch)

export async function usesug(url:any,param:any) {
  const res: any = await http.get(`${url}+${param}`, {
  });
  // console.log(res.split('window.baidu.sug({q:"1",p:false,s:[')[1].split(']});')[0].replace(/"/g,'').split(','));
  return res;
}

export async function usesearch(url:any,path:any,param:any) {
  const res: any = await http.get(`${path + param}`, {
  });
  console.log(res);
  return res;
}
