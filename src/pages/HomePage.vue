<template>
  <div class="menu-container">
    <header class="glass-header">
      <h1>{{ siteConfig.home.title }}</h1>
      <p>{{ siteConfig.home.description }}</p>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <div
          v-for="cat in productCategories"
          :key="cat.name"
          :class="['category-item', activeCategory === cat.name ? 'active' : '']"
          @click="activeCategory = cat.name"
        >
          {{ cat.name }}
        </div>
      </aside>

      <main class="product-list">
        <div v-for="brand in currentProducts" :key="brand.brandName" class="brand-section">
          <h3 class="brand-title">{{ brand.brandName }}</h3>
          <div v-for="item in brand.items" :key="item.id" class="product-card glass-card">
            <div class="product-info">
              <span class="product-icon">{{ item.icon }}</span>
              <div class="text-content">
                <h4>{{ item.name }}</h4>
                <p>{{ item.desc }}</p>
                <span class="price">{{ siteConfig.labels.sponsoredPrice }}</span>
              </div>
            </div>
            <button class="add-btn" @click="cartStore.addToCart(item)">+</button>
          </div>
        </div>
      </main>
    </div>

    <div
      v-if="cartStore.totalCount > 0"
      class="float-cart glass-card"
      @click="$router.push('/cart')"
    >
      <div class="cart-info">
        <span class="badge">{{ cartStore.totalCount }}</span>
        <span>{{ siteConfig.labels.selectedSummary }} {{ siteConfig.labels.sponsoredPrice }}</span>
      </div>
      <button class="checkout-btn">{{ siteConfig.labels.checkoutAction }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import { productCategories } from '../config/products'
import { siteConfig } from '../config/site'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const activeCategory = ref(productCategories[0]?.name || '')

const currentProducts = computed(() => {
  return productCategories.find((category) => category.name === activeCategory.value)?.brands || []
})
</script>

<style scoped>
.menu-container {
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-bottom: 96px;
}

.glass-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-header h1,
.glass-header p {
  margin: 0;
}

.glass-header p {
  margin-top: 6px;
  color: #4f5b73;
}

.main-content {
  display: flex;
  min-height: calc(100vh - 188px);
  min-height: calc(100svh - 188px);
  min-height: calc(100dvh - 188px);
}

.sidebar {
  width: 80px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 0;
}

.category-item {
  padding: 15px 5px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  color: #42516a;
}

.category-item.active {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 20px 20px 0;
  color: #007aff;
  font-weight: 700;
}

.product-list {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.brand-section + .brand-section {
  margin-top: 20px;
}

.brand-title {
  margin: 0 0 12px;
  color: #32425e;
}

.glass-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}

.product-info {
  display: flex;
  align-items: center;
  min-width: 0;
}

.product-icon {
  flex-shrink: 0;
  font-size: 32px;
  margin-right: 12px;
}

.text-content h4 {
  margin: 0;
  font-size: 16px;
}

.text-content p {
  margin: 4px 0;
  font-size: 12px;
  color: #666;
}

.price {
  font-weight: 700;
  color: #ff6a8b;
}

.add-btn {
  flex-shrink: 0;
  background: #007aff;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
}

.float-cart {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: calc(60px + env(safe-area-inset-bottom));
  left: max(16px, env(safe-area-inset-left));
  transform: none;
  width: auto;
  max-width: 430px;
  height: 60px;
  margin: 0 auto;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.74);
  color: white;
  z-index: 20;
}

.cart-info {
  display: flex;
  align-items: center;
}

.checkout-btn {
  background: #4cd964;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  color: white;
  font-weight: 700;
}

.badge {
  background: #ff3b30;
  padding: 2px 8px;
  border-radius: 10px;
  margin-right: 8px;
}
</style>
