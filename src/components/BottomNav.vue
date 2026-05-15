<template>
  <nav class="bottom-nav">
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="bottom-nav__item"
      active-class="bottom-nav__item--active"
    >
      <span class="bottom-nav__icon">{{ item.icon }}</span>
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
  { label: siteConfig.nav.home, to: '/menu', icon: '🧋' },
  { label: siteConfig.nav.cart, to: '/cart', icon: '🛍️' },
  { label: siteConfig.nav.orders, to: '/orders', icon: '🧾' }
]
</script>

<style scoped>
.bottom-nav__item {
  position: relative;
  display: grid;
  place-items: center;
  gap: 3px;
}

.bottom-nav__icon {
  font-size: 18px;
  line-height: 1;
}

.bottom-nav__label {
  font-size: 12px;
}

.bottom-nav__badge {
  position: absolute;
  top: 3px;
  right: 16px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #ff5f93;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  animation: pulseBadge 2s ease-in-out infinite;
}
</style>
