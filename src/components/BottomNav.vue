<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="bottom-nav__item"
      active-class="bottom-nav__item--active"
    >
      <span class="bottom-nav__label">{{ item.label }}</span>
      <span v-if="item.to === '/cart' && cartStore.totalCount" class="bottom-nav__badge">
        {{ cartStore.totalCount }}
      </span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { siteConfig } from '../config/site'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const navItems = [
  { label: siteConfig.nav.home, to: '/menu' },
  { label: siteConfig.nav.cart, to: '/cart' },
  { label: siteConfig.nav.orders, to: '/orders' }
]
</script>

<style scoped>
.bottom-nav__item {
  position: relative;
}

.bottom-nav__badge {
  position: absolute;
  top: 6px;
  right: 18px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #ff4d4f;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
}
</style>
