<template>
  <div class="menu-page">
    <div class="bubble-layer" aria-hidden="true">
      <span v-for="bubble in bubbles" :key="bubble.id" class="tea-bubble" :style="bubble.style"></span>
    </div>

    <header class="menu-header">
      <div class="menu-header__top">
        <div>
          <p class="menu-header__eyebrow">邓美丽专属</p>
          <h1>{{ siteConfig.home.title }}</h1>
          <p class="menu-header__desc">{{ siteConfig.home.description }}</p>
        </div>
        <div class="mood-card">
          <span class="mood-card__icon">🫧</span>
          <span>{{ siteConfig.labels.treatTag }}</span>
        </div>
      </div>
    </header>

    <section class="category-strip">
      <button
        v-for="cat in productCategories"
        :key="cat.name"
        type="button"
        :class="['category-pill', activeCategory === cat.name ? 'category-pill--active' : '']"
        @click="activeCategory = cat.name"
      >
        {{ cat.name }}
      </button>
    </section>

    <main class="brand-list">
      <section v-for="brand in currentProducts" :key="brand.brandName" class="brand-card">
        <div class="brand-card__head">
          <h2>{{ brand.brandName }}</h2>
          <span class="brand-card__tag">热选</span>
        </div>

        <article v-for="item in brand.items" :key="item.id" class="drink-card">
          <div class="drink-card__icon">{{ item.icon }}</div>
          <div class="drink-card__content">
            <div class="drink-card__title-row">
              <h3>{{ item.name }}</h3>
              <span class="drink-card__price">￥{{ item.price }}</span>
            </div>
            <p>{{ item.desc }}</p>
            <div class="drink-card__footer">
              <span class="drink-card__badge">{{ siteConfig.labels.treatTag }}</span>
              <button
                type="button"
                class="add-button"
                @click="handleAdd(item)"
              >
                加入购物车
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>

    <transition name="dock">
      <button
        v-if="cartStore.totalCount > 0"
        type="button"
        :class="['floating-cart', cartPulse ? 'floating-cart--pulse' : '']"
        @click="$router.push('/cart')"
      >
        <div class="floating-cart__main">
          <div class="floating-cart__icon-wrap">
            <span class="floating-cart__icon">🛍️</span>
            <span class="floating-cart__badge">{{ cartStore.totalCount }}</span>
          </div>
          <div class="floating-cart__text">
            <span>共 {{ cartStore.totalCount }} 杯</span>
            <strong>￥{{ cartStore.totalPrice }}</strong>
          </div>
        </div>
        <span class="floating-cart__action">{{ siteConfig.labels.checkoutAction }}</span>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import { productCategories } from '../config/products'
import { siteConfig } from '../config/site'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const activeCategory = ref(productCategories[0]?.name || '')
const cartPulse = ref(false)

const bubbles = [
  { id: 1, style: { left: '7%', animationDelay: '0s', animationDuration: '8.5s', width: '16px', height: '16px' } },
  { id: 2, style: { left: '21%', animationDelay: '1.2s', animationDuration: '10s', width: '12px', height: '12px' } },
  { id: 3, style: { left: '48%', animationDelay: '0.8s', animationDuration: '9s', width: '18px', height: '18px' } },
  { id: 4, style: { left: '66%', animationDelay: '2.5s', animationDuration: '11s', width: '10px', height: '10px' } },
  { id: 5, style: { left: '82%', animationDelay: '1.6s', animationDuration: '8s', width: '20px', height: '20px' } }
]

const currentProducts = computed(() => {
  return productCategories.find((category) => category.name === activeCategory.value)?.brands || []
})

const handleAdd = (item) => {
  cartStore.addToCart(item)
}

watch(
  () => cartStore.totalCount,
  (next, prev) => {
    if (next !== prev && next > 0) {
      cartPulse.value = false
      requestAnimationFrame(() => {
        cartPulse.value = true
      })
      window.setTimeout(() => {
        cartPulse.value = false
      }, 420)
    }
  }
)
</script>

<style scoped>
.menu-page {
  position: relative;
  min-height: 100%;
  padding-bottom: 112px;
}

.bubble-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.tea-bubble {
  position: absolute;
  bottom: -24px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.92), rgba(242, 221, 224, 0.48) 62%, rgba(226, 204, 208, 0.16));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.72);
  opacity: 0;
  animation: bubbleRise linear infinite;
}

.menu-header {
  position: sticky;
  top: -20px;
  z-index: 6;
  margin: -20px -16px 12px;
  padding: 20px 16px 14px;
  background: linear-gradient(180deg, rgba(251, 247, 246, 0.96), rgba(251, 247, 246, 0.84));
  backdrop-filter: blur(14px);
}

.menu-header__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: start;
}

.menu-header__eyebrow {
  margin: 0 0 6px;
  color: #bd7e8d;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.menu-header h1 {
  margin: 0;
  color: #66555d;
  font-size: 26px;
  line-height: 1.2;
}

.menu-header__desc {
  margin: 8px 0 0;
  color: #8d8184;
  font-size: 14px;
}

.mood-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(226, 205, 207, 0.5);
  color: #b47a88;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(190, 173, 176, 0.1);
}

.mood-card__icon {
  font-size: 22px;
  animation: softFloat 3s ease-in-out infinite;
}

.category-strip {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 0 2px;
  scrollbar-width: none;
}

.category-strip::-webkit-scrollbar {
  display: none;
}

.category-pill {
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: #8f7d84;
  white-space: nowrap;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(194, 182, 184, 0.1);
}

.category-pill--active {
  background: linear-gradient(135deg, #efb8c1, #d89ca7);
  color: #fff;
}

.brand-list {
  display: grid;
  gap: 16px;
  margin-top: 14px;
}

.brand-card {
  padding: 18px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(227, 208, 210, 0.46);
  box-shadow: 0 14px 32px rgba(191, 178, 180, 0.1);
  backdrop-filter: blur(16px);
}

.brand-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.brand-card__head h2 {
  margin: 0;
  color: #66555d;
  font-size: 18px;
}

.brand-card__tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #f7eded;
  color: #b67987;
  font-size: 12px;
  font-weight: 700;
}

.drink-card {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 14px;
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(248, 244, 242, 0.94));
  border: 1px solid rgba(230, 212, 214, 0.44);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.86);
}

.drink-card + .drink-card {
  margin-top: 12px;
}

.drink-card__icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #f8eeed, #fffaf9);
  font-size: 28px;
}

.drink-card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.drink-card__title-row h3 {
  margin: 0;
  color: #67575e;
  font-size: 16px;
}

.drink-card__price {
  color: #c97f90;
  font-size: 17px;
  font-weight: 800;
}

.drink-card__content p {
  margin: 6px 0 12px;
  color: #8f8285;
  font-size: 13px;
}

.drink-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.drink-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #faf1f0;
  color: #b57988;
  font-size: 12px;
  font-weight: 700;
}

.add-button {
  min-width: 110px;
  border: none;
  padding: 10px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #edb2bc, #d994a5);
  color: #fff;
  font-weight: 800;
  animation: breathe 2.8s ease-in-out infinite;
}

.floating-cart {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: calc(70px + env(safe-area-inset-bottom));
  left: max(16px, env(safe-area-inset-left));
  width: auto;
  max-width: 398px;
  margin: 0 auto;
  padding: 14px 16px;
  border: none;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: linear-gradient(135deg, rgba(229, 179, 188, 0.96), rgba(208, 152, 165, 0.98));
  color: #fff;
  box-shadow: 0 16px 28px rgba(191, 171, 175, 0.22);
  z-index: 25;
}

.floating-cart__main {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.floating-cart__icon-wrap {
  position: relative;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.18);
}

.floating-cart__icon {
  font-size: 22px;
}

.floating-cart__badge {
  position: absolute;
  top: -6px;
  right: -5px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #fff;
  color: #cb7e8f;
  font-size: 11px;
  line-height: 20px;
  font-weight: 800;
  animation: pulseBadge 2s ease-in-out infinite;
}

.floating-cart__text {
  display: grid;
  gap: 2px;
  text-align: left;
}

.floating-cart__text span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.88);
}

.floating-cart__text strong {
  font-size: 18px;
  line-height: 1.1;
}

.floating-cart__action {
  flex-shrink: 0;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 13px;
  font-weight: 800;
}

.floating-cart--pulse {
  animation: cartDock 0.42s ease;
}

.dock-enter-active {
  animation: cartDock 0.5s ease;
}

.dock-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dock-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.97);
}
</style>
