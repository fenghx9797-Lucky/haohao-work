import { createRouter, createWebHashHistory } from 'vue-router'

import CartPage from '../pages/CartPage.vue'
import CheckoutPage from '../pages/CheckoutPage.vue'
import HomePage from '../pages/HomePage.vue'
import OrdersPage from '../pages/OrdersPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { title: '点单' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: { title: '购物车' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { title: '下单成功' }
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
    meta: { title: '我的订单' }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} | 咖啡奶茶点单`
  }
})

export default router
