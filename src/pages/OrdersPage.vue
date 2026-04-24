<template>
  <section class="orders-page">
    <header class="orders-header">
      <p class="eyebrow">订单中心</p>
      <h1>最近订单</h1>
      <p>可以先用这页预览移动端订单信息布局，后面我再接真实数据。</p>
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
        <strong>¥{{ lastOrder.totalPrice }}</strong>
      </div>
    </article>

    <article class="order-card">
      <div class="order-card__top">
        <div>
          <strong>OD20260424001</strong>
          <p>2026-04-24 09:18:02</p>
        </div>
        <span class="status-pill status-pill--muted">已完成</span>
      </div>
      <div class="order-items">
        <span class="order-chip">生椰拿铁 x 1</span>
        <span class="order-chip">伯牙绝弦 x 1</span>
      </div>
      <div class="order-card__bottom">
        <span>门店自取</span>
        <strong>¥38</strong>
      </div>
    </article>

    <article class="order-card">
      <div class="order-card__top">
        <div>
          <strong>OD20260423015</strong>
          <p>2026-04-23 16:42:11</p>
        </div>
        <span class="status-pill status-pill--muted">已完成</span>
      </div>
      <div class="order-items">
        <span class="order-chip">多肉葡萄 x 2</span>
      </div>
      <div class="order-card__bottom">
        <span>品牌专区</span>
        <strong>¥56</strong>
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
  background: rgba(255, 253, 249, 0.94);
  border: 1px solid rgba(145, 111, 77, 0.12);
  box-shadow: 0 12px 30px rgba(116, 81, 43, 0.08);
}

.orders-header h1,
.orders-header p {
  margin: 0;
}

.orders-header p:last-child {
  margin-top: 10px;
  color: #725f50;
}

.eyebrow {
  margin: 0 0 8px;
  color: #ad5f24;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.order-card--active {
  background: linear-gradient(180deg, #fffdf8 0%, #eefcf1 100%);
  border-color: rgba(90, 160, 111, 0.2);
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
  color: #78624f;
  font-size: 13px;
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
  background: #f4e6d5;
  color: #7b512e;
  font-size: 12px;
  font-weight: 700;
}
</style>
