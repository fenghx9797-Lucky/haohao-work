<template>
  <div class="cart-page">
    <header class="cart-header">
      <button type="button" @click="$router.back()" class="back-btn">‹</button>
      <div>
        <p class="cart-header__eyebrow">专属购物车</p>
        <h2>{{ siteConfig.labels.cartTitle }}</h2>
      </div>
    </header>

    <section v-if="cartStore.items.length" class="cart-list">
      <article
        v-for="item in cartStore.items"
        :key="item.id"
        class="cart-item-card"
      >
        <div class="cart-item-card__icon">{{ item.icon }}</div>
        <div class="cart-item-card__content">
          <div class="cart-item-card__row">
            <h3>{{ item.name }}</h3>
            <strong>￥{{ item.price * item.quantity }}</strong>
          </div>
          <p>{{ siteConfig.labels.treatTag }} · 单价 ￥{{ item.price }}</p>
          <div class="cart-item-card__footer">
            <span class="cart-item-card__tag">温柔加购中</span>
            <div class="item-actions">
              <button type="button" @click="cartStore.removeFromCart(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button type="button" @click="cartStore.addToCart(item)">+</button>
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

    <div v-if="cartStore.items.length" class="cart-tip-card">
      <span>🫧</span>
      <p>购物车已吸附到底部，确认后就能生成专属取餐码。</p>
    </div>

    <transition name="summary-dock">
      <section v-if="cartStore.totalCount" class="summary-dock">
        <div class="summary-dock__meta">
          <span>{{ siteConfig.labels.cartTotal }}</span>
          <strong>￥{{ cartStore.totalPrice }}</strong>
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
  padding-bottom: 118px;
  display: grid;
  gap: 14px;
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 176, 203, 0.36);
  box-shadow: 0 14px 32px rgba(220, 145, 174, 0.14);
}

.cart-header__eyebrow {
  margin: 0 0 4px;
  color: #d06790;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.cart-header h2 {
  margin: 0;
  color: #6b4c5c;
}

.back-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 14px;
  background: #fff0f6;
  color: #ca638a;
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 243, 247, 0.92));
  border: 1px solid rgba(255, 188, 210, 0.42);
  box-shadow: 0 12px 26px rgba(222, 148, 177, 0.14);
}

.cart-item-card__icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, #ffe3ee, #fff5f8);
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
  color: #6c4d5d;
  font-size: 16px;
}

.cart-item-card__row strong {
  color: #ea5e90;
  font-size: 17px;
}

.cart-item-card__content p {
  margin: 8px 0 12px;
  color: #977585;
  font-size: 13px;
}

.cart-item-card__tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #fff1f6;
  color: #cd658d;
  font-size: 12px;
  font-weight: 700;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255, 241, 247, 0.98);
}

.item-actions button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff98bb, #ff7da8);
  color: #fff;
  font-size: 18px;
  line-height: 1;
  box-shadow: 0 8px 16px rgba(240, 118, 165, 0.24);
}

.item-actions span {
  min-width: 18px;
  text-align: center;
  color: #7b5b6a;
  font-weight: 700;
}

.empty-state {
  padding: 34px 24px;
  border-radius: 28px;
  text-align: center;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 176, 203, 0.36);
  box-shadow: 0 14px 32px rgba(220, 145, 174, 0.14);
}

.empty-state__icon {
  font-size: 42px;
}

.empty-state h3 {
  margin: 14px 0 8px;
  color: #6a4d5a;
}

.empty-state p {
  margin: 0;
  color: #8e7080;
}

.cart-tip-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 241, 247, 0.94);
  border: 1px solid rgba(255, 188, 210, 0.38);
  color: #9a6f81;
}

.cart-tip-card p {
  margin: 0;
  font-size: 13px;
}

.summary-dock {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: calc(70px + env(safe-area-inset-bottom));
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
  background: rgba(255, 251, 253, 0.94);
  border: 1px solid rgba(255, 176, 203, 0.36);
  box-shadow: 0 18px 36px rgba(221, 140, 171, 0.22);
  backdrop-filter: blur(14px);
  z-index: 25;
}

.summary-dock__meta {
  display: grid;
  gap: 2px;
}

.summary-dock__meta span {
  color: #a47b8c;
  font-size: 12px;
}

.summary-dock__meta strong {
  color: #e85f90;
  font-size: 22px;
  line-height: 1.1;
}

.summary-dock__meta small {
  color: #947180;
}

.submit-btn {
  min-width: 122px;
  border: none;
  padding: 14px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff99bc, #ff7ca7);
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
