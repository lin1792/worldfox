import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/IndexView.vue'

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
})

export default router
