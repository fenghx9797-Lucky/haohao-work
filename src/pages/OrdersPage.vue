<template>
  <section class="orders-page">
    <header class="orders-header">
      <p class="eyebrow">订单中心</p>
      <h1>最近订单</h1>
      <p>这里保留最近的点单记录，整体也换成了更像微信小程序的粉色卡片风格。</p>
    </header>

    <article v-if="lastOrder" class="order-card order-card--active">
      <div class="order-card__top">
        <div>
          <strong>{{ lastOrder.id }}</strong>
          <p>{{ lastOrder.createdAt }}</p>
        </div>
        <span class="status-pill">{{ lastOrder.status }}</span>
      </div>
      <div class="order-items">
        <span v-for="item in lastOrder.items" :key="item.id" class="order-chip">
          {{ item.name }} x {{ item.quantity }}
        </span>
      </div>
      <div class="order-card__bottom">
        <span>取餐码 {{ lastOrder.pickupCode }}</span>
        <strong>￥{{ lastOrder.totalPrice }}</strong>
      </div>
    </article>

    <article class="order-card">
      <div class="order-card__top">
        <div>
          <strong>DM20260514001</strong>
          <p>2026-05-14 09:18:02</p>
        </div>
        <span class="status-pill status-pill--muted">已完成</span>
      </div>
      <div class="order-items">
        <span class="order-chip">生椰拿铁 x 1</span>
        <span class="order-chip">伯牙绝弦 x 1</span>
      </div>
      <div class="order-card__bottom">
        <span>门店自取</span>
        <strong>￥38</strong>
      </div>
    </article>

    <article class="order-card">
      <div class="order-card__top">
        <div>
          <strong>DM20260513015</strong>
          <p>2026-05-13 16:42:11</p>
        </div>
        <span class="status-pill status-pill--muted">已完成</span>
      </div>
      <div class="order-items">
        <span class="order-chip">多肉葡萄 x 2</span>
      </div>
      <div class="order-card__bottom">
        <span>品牌专区</span>
        <strong>￥56</strong>
      </div>
    </article>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const { lastOrder } = storeToRefs(cartStore)
</script>

<style scoped>
.orders-page {
  display: grid;
  gap: 16px;
}

.orders-header,
.order-card {
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 176, 203, 0.34);
  box-shadow: 0 14px 32px rgba(220, 145, 174, 0.15);
  backdrop-filter: blur(14px);
}

.orders-header h1,
.orders-header p {
  margin: 0;
}

.orders-header h1 {
  color: #6d4d5b;
}

.orders-header p:last-child {
  margin-top: 10px;
  color: #8d7080;
}

.order-card--active {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 237, 245, 0.94) 100%);
  border-color: rgba(255, 146, 184, 0.36);
}

.order-card__top,
.order-card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.order-card__top p,
.order-card__bottom span {
  margin: 6px 0 0;
  color: #8e7181;
  font-size: 13px;
}

.order-card__bottom strong {
  color: #ea5f90;
}

.order-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.order-chip {
  padding: 7px 10px;
  border-radius: 999px;
  background: #fff0f6;
  color: #ca638b;
  font-size: 12px;
  font-weight: 700;
}
</style>
