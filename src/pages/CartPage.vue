<template>
  <div class="cart-page">
    <header class="page-header">
      <button @click="$router.back()" class="back-btn">←</button>
      <h2>{{ siteConfig.labels.cartTitle }}</h2>
    </header>

    <div v-if="cartStore.items.length" class="list-container">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item glass-card">
        <div class="item-detail">
          <h4>{{ item.name }}</h4>
          <p>{{ siteConfig.labels.sponsoredPrice }} x {{ item.quantity }}</p>
        </div>
        <div class="item-actions">
          <button @click="cartStore.removeFromCart(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="cartStore.addToCart(item)">+</button>
        </div>
      </div>
    </div>

    <div v-else class="glass-card empty-state">
      <p>{{ siteConfig.labels.cartEmpty }}</p>
    </div>

    <div class="summary glass-card">
      <div class="total-bar">
        <span>共 {{ cartStore.totalCount }} 件</span>
        <span class="total-price">{{ siteConfig.labels.cartTotal }}: {{ siteConfig.labels.sponsoredPrice }}</span>
      </div>
      <button class="submit-btn" :disabled="!cartStore.totalCount" @click="handleConfirm">
        {{ siteConfig.labels.cartSubmit }}
      </button>
    </div>
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
  padding: 20px;
  background: #f0f2f5;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
}

.back-btn {
  background: none;
  border: none;
  font-size: 24px;
  margin-right: 10px;
}

.list-container {
  padding-bottom: 108px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.item-detail h4,
.item-detail p {
  margin: 0;
}

.item-detail p {
  margin-top: 6px;
  color: #5e6773;
}

.item-actions {
  display: flex;
  align-items: center;
}

.item-actions button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
}

.item-actions span {
  margin: 0 10px;
}

.empty-state {
  text-align: center;
  color: #5e6773;
}

.summary {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: calc(60px + env(safe-area-inset-bottom));
  left: max(16px, env(safe-area-inset-left));
  transform: none;
  width: auto;
  max-width: 430px;
  margin: 0 auto;
  z-index: 20;
}

.total-bar {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.submit-btn {
  width: 100%;
  height: 44px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 22px;
  margin-top: 15px;
  font-size: 16px;
}

.submit-btn:disabled {
  opacity: 0.5;
}

.total-price {
  font-size: 18px;
  font-weight: 700;
  color: #ff3b30;
}
</style>
