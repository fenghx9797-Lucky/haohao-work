<template>
  <section class="orders-page">
    <header class="orders-header">
      <p class="eyebrow">订单中心</p>
      <h1>最近订单</h1>
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
        <span v-for="item in lastOrder.items" :key="item.cartKey