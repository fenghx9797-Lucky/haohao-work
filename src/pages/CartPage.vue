<template>
  <div class="cart-page">
    <header class="page-header">
      <button @click="$router.back()" class="back-btn">←</button>
      <h2>订单清单</h2>
    </header>

    <div v-if="cartStore.items.length" class="list-container">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item glass-card">
        <div class="item-detail">
          <h4>{{ item.name }}</h4>
          <p>¥{{ item.price }} x {{ item.quantity }}</p>
        </div>
        <div class="item-actions">
          <button @click="cartStore.removeFromCart(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="cartStore.addToCart(item)">+</button>
        </div>
      </div>
    </div>

    <div v-else class="glass-card empty-state">
      <p>购物车还是空的，先去挑一杯吧。</p>
    </div>

    <div class="summary glass-card">
      <div class="total-bar">
        <span>共 {{ cartStore.totalCount }} 件</span>
        <span class="total-price">合计: ¥{{ cartStore.totalPrice }}</span>
      </div>
      <button class="submit-btn" :disabled="!cartStore.totalCount" @click="handleConfirm">
        确认并提交
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

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
  padding-bottom: 130px;
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
  bottom: 92px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 398px;
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
  font-size: 20px;
  font-weight: 700;
  color: #ff3b30;
}

@media (max-width: 480px) {
  .summary {
    bottom: 86px;
  }
}
</style>
