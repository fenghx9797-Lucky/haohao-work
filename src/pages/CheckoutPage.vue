<template>
  <section class="success-page">
    <div class="success-card">
      <div class="success-mark">✓</div>
      <p class="success-eyebrow">下单成功</p>
      <h1>饮品已经加入制作队列</h1>
      <p class="success-desc">预计 12 分钟可取餐，到店后报取餐码即可。</p>
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
        <strong>{{ lastOrder.totalCount }} 件</strong>
      </div>
      <div class="detail-row">
        <span>订单金额</span>
        <strong>{{ siteConfig.labels.sponsoredPrice }}</strong>
      </div>
      <div class="detail-row">
        <span>下单时间</span>
        <strong>{{ lastOrder.createdAt }}</strong>
      </div>
    </section>

    <section v-if="lastOrder" class="items-card">
      <h2>本次订单</h2>
      <div v-for="item in lastOrder.items" :key="item.id" class="items-row">
        <span>{{ item.name }} x {{ item.quantity }}</span>
        <strong>{{ siteConfig.labels.sponsoredPrice }}</strong>
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

import { siteConfig } from '../config/site'
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
items-card {
  padding: 20px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 251, 248, 0.94));
  border: 1px solid rgba(97, 154, 113, 0.12);
  box-shadow: 0 12px 30px rgba(66, 110, 76, 0.08);
}

.success-mark {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #38b26e, #4fd98f);
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}

.success-eyebrow {
  margin: 16px 0 8px;
  color: #3f8f5f;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.success-card h1,
.items-card h2 {
  margin: 0;
}

.success-desc {
  margin: 10px 0 0;
  color: #587164;
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
  color: #6b7d74;
}

.pickup-code {
  color: #2c7a4b;
  font-size: 22px;
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
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(86, 114, 98, 0.16);
  color: #31483c;
}
</style>
