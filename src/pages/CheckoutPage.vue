<template>
  <section class="success-page">
    <div class="success-card">
      <div class="success-mark">✓</div>
      <p class="success-eyebrow">下单成功</p>
      <h1>奶茶已经加入制作队列</h1>
      <p class="success-desc">预计 12 分钟左右可取餐，到店后报取餐码就可以啦。</p>
    </div>

    <section v-if="lastOrder" class="detail-card">
      <div class="detail-row">
        <span>订单编号</span>
        <strong>{{ lastOrder.id }}</strong>
      </div>
      <div class="detail-row">
        <span>取餐码</span>
        <strong class="pickup-code">{{ lastOrder.pickupCode }}</strong>
      </div>
      <div class="detail-row">
        <span>商品数量</span>
        <strong>{{ lastOrder.totalCount }} 杯</strong>
      </div>
      <div class="detail-row">
        <span>订单金额</span>
        <strong>￥{{ lastOrder.totalPrice }}</strong>
      </div>
      <div class="detail-row">
        <span>下单时间</span>
        <strong>{{ lastOrder.createdAt }}</strong>
      </div>
    </section>

    <section v-if="lastOrder" class="items-card">
      <h2>本次饮品</h2>
      <div v-for="item in lastOrder.items" :key="item.id" class="items-row">
        <span>{{ item.name }} x {{ item.quantity }}</span>
        <strong>￥{{ item.price * item.quantity }}</strong>
      </div>
    </section>

    <div class="success-actions">
      <RouterLink to="/menu" class="secondary-button">继续点单</RouterLink>
      <RouterLink to="/orders" class="primary-button action-button">查看订单</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const { lastOrder } = storeToRefs(cartStore)
</script>

<style scoped>
.success-page {
  display: grid;
  gap: 16px;
}

.success-card,
.detail-card,
.items-card {
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(255, 176, 203, 0.34);
  box-shadow: 0 14px 32px rgba(220, 145, 174, 0.15);
  backdrop-filter: blur(14px);
}

.success-mark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #ff9abd, #ff79a6);
  color: #fff;
  font-size: 26px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(239, 115, 163, 0.24);
}

.success-eyebrow {
  margin: 16px 0 8px;
  color: #d0658f;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.success-card h1,
.items-card h2 {
  margin: 0;
  color: #6d4c5b;
}

.success-desc {
  margin: 10px 0 0;
  color: #896c7b;
}

.detail-card,
.items-card {
  display: grid;
  gap: 14px;
}

.detail-row,
.items-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.detail-row span,
.items-row span {
  color: #8b6d7d;
}

.pickup-code {
  color: #ea5f90;
  font-size: 24px;
}

.success-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.secondary-button,
.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 16px;
  font-weight: 700;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(255, 177, 203, 0.36);
  color: #8b6478;
}
</style>
