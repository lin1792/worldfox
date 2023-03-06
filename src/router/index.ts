import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/IndexView.vue'

import { useSearchStore } from '@/stores/search'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      // children: [
      //   {
      //     path: '/index',
      //     component:()=>import('@/views/IndexView.vue')
      //   }
      // ]
    },

  ]
});
router.beforeEach(async (to, from, next) => {
  const useSearch = useSearchStore()
  useSearch.useupdata()
  console.log(1);
  next()
});
export default router
