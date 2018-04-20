import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/layout'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/login')
  },
    {
      path: '/',
      name: 'coverpage',
      redirect: '/coverpage',
      component: Layout,
      children: [
        {
          path: 'coverpage',
          component: () => import('@/components/dashboard/CoverPage')
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('@/components/dashboard/Overview')
        },
        {
          path: 'campaign',
          name: 'campaign',
          component: () => import('@/components/dashboard/Campaign')
        },
        {
          path: 'dotcom',
          name: 'dotcom',
          component: () => import('@/components/dashboard/Dotcom')
        },
        {
          path: 'crm',
          name: 'crm',
          component: () => import('@/components/dashboard/CRM')
        },
        {
          path: 'ratingreview',
          name: 'ratingreview',
          component: () => import('@/components/dashboard/RatingReview')
        },
        {
          path: 'ecommerce',
          name: 'ecommerce',
          component: () => import('@/components/dashboard/eCommerce')
        }
      ]
    }
  ]
})
