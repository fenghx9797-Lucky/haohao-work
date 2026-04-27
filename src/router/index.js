import { createRouter, createWebHashHistory } from 'vue-router'

import { siteConfig } from '../config/site'
import CartPage from '../pages/CartPage.vue'
import CheckoutPage from '../pages/CheckoutPage.vue'
import HomePage from '../pages/HomePage.vue'
import OrdersPage from '../pages/OrdersPage.vue'
import SplashPage from '../pages/SplashPage.vue'

const routes = [
  {
    path: '/',
    name: 'splash',
    component: SplashPage,
    meta: { title: siteConfig.pages.splash }
  },
  {
    path: '/menu',
    name: 'home',
    component: HomePage,
    meta: { title: siteConfig.pages.home }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: { title: siteConfig.pages.cart }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutPage,
    meta: { title: siteConfig.pages.checkout }
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
    meta: { title: siteConfig.pages.orders }
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} | ${siteConfig.browserTitle}`
  }
})

export default router
