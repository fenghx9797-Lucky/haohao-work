<template>
  <div class="cart-page">
    <header class="cart-header">
      <button type="button" @click="$router.back()" class="back-btn">‹</button>
      <div>
        <p class="cart-header__eyebrow">购物车</p>
        <h2>{{ siteConfig.labels.cartTitle }}</h2>
      </div>
    </header>

    <section v-if="cartStore.items.length" class="cart-list">
      <article
        v-for="item in cartStore.items"
        :key="item.cartKey"
        class="cart-item-card"
      >
        <div class="cart-item-card__icon">{{ item.icon }}</div>
        <div class="cart-item-card__content">
          <div class="cart-item-card__row">
            <h3>{{ item.name }}</h3>
            <strong>{{ siteConfig.labels.priceText }}</strong>
          </div>
          <p>{{ item.selectedSize }}<template v-if="item.selectedToppings.length"> · {{ item.selectedToppings.join('、') }}</template></p>
          <div class="cart-item-card__footer">
            <div class="item-actions">
              <button type="button" @click="cartStore.removeFromCart(item.cartKey)">-</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click="cartStore.addToCart({ id: item.id, name: item.name, icon: item.icon, price: item.basePrice, sizes: [{ name: item.selectedSize, price: item.price - item.selectedToppings.length * 0 }], toppings: [] }, { selectedSize: { name: item.selectedSize, price: item.price - 0 }, selectedToppings: [] })">+</button>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section v-else class="empty-state">
      <div class="empty-state__icon">🫖</div>
      <h3>还没有选中饮品</h3>
      <p>{{ siteConfig.labels.cartEmpty }}</p>
    </section>

    <transition name="summary-dock">
      <section v-if="cartStore.totalCount" class="summary-dock">
        <div class="summary-dock__meta">
          <span>{{ siteConfig.labels.cartTotal }}</span>
          <strong>{{ siteConfig.labels.priceText }}</strong>
          <small>共 {{ cartStore.totalCount }} 杯</small>
        </div>
        <button class="submit-btn" @click="handleConfirm">
          {{ siteConfig.labels.cartSubmit }}
        </button>
      </section>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { siteConfig } from '../config/site'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const handleConfirm = () => {
  const order = cartStore.submitOrder()

  if (order) {
    router.push('/checkout')
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100%;
  padding-bottom: 140px;
  display: grid;
  gap: 14px;
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(227, 208, 210, 0.46);
  box-shadow: 0 14px 32px rgba(191, 178, 180, 0.1);
}

.cart-header__eyebrow {
  margin: 0 0 4px;
  color: #b97d8c;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.cart-header h2 {
  margin: 0;
  color: #67575e;
}

.back-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 14px;
  background: #faf2f1;
  color: #b67c8a;
  font-size: 28px;
  line-height: 1;
}

.cart-list {
  display: grid;
  gap: 12px;
}

.cart-item-card {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 14px;
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(248, 244, 242, 0.94));
  border: 1px solid rgba(230, 212, 214, 0.44);
  box-shadow: 0 12px 26px rgba(191, 178, 180, 0.1);
}

.cart-item-card__icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #f8eeed, #fffaf9);
  font-size: 28px;
}

.cart-item-card__row,
.cart-item-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.cart-item-card__row h3,
.cart-item-card__row strong {
  margin: 0;
}

.cart-item-card__row h3 {
  color: #67575e;
  font-size: 16px;
}

.cart-item-card__row strong {
  color: #c97f90;
  font-size: 14px;
}

.cart-item-card__content p {
  margin: 8px 0 12px;
  color: #8f8285;
  font-size: 13px;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  padding: 6px;
  border-radius: 999px;
  background: rgba(250, 242, 241, 0.98);
}

.item-actions button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #edb2bc, #d994a5);
  color: #fff;
  font-size: 18px;
  line-height: 1;
  box-shadow: 0 8px 16px rgba(191, 171, 175, 0.2);
}

.item-actions span {
  min-width: 18px;
  text-align: center;
  color: #77666d;
  font-weight: 700;
}

.empty-state {
  padding: 34px 24px;
  border-radius: 28px;
  text-align: center;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(227, 208, 210, 0.46);
  box-shadow: 0 14px 32px rgba(191, 178, 180, 0.1);
}

.empty-state__icon {
  font-size: 42px;
}

.empty-state h3 {
  margin: 14px 0 8px;
  color: #67575e;
}

.empty-state p {
  margin: 0;
  color: #8d7f83;
}

.summary-dock {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: calc(92px + env(safe-area-inset-bottom));
  left: max(16px, env(safe-area-inset-left));
  width: auto;
  max-width: 398px;
  margin: 0 auto;
  padding: 14px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(255, 253, 252, 0.96);
  border: 1px solid rgba(227, 208, 210, 0.46);
  box-shadow: 0 18px 36px rgba(191, 178, 180, 0.14);
  backdrop-filter: blur(14px);
  z-index: 20;
}

.summary-dock__meta {
  display: grid;
  gap: 2px;
}

.summary-dock__meta span {
  color: #9a898f;
  font-size: 12px;
}

.summary-dock__meta strong {
  color: #c87f90;
  font-size: 18px;
  line-height: 1.1;
}

.summary-dock__meta small {
  color: #8c7c82;
}

.submit-btn {
  min-width: 122px;
  border: none;
  padding: 14px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #edb2bc, #d994a5);
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  animation: breathe 2.8s ease-in-out infinite;
}

.summary-dock-enter-active {
  animation: cartDock 0.5s ease;
}

.summary-dock-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.summary-dock-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
