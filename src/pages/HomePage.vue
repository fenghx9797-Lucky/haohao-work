<template>
  <div class="menu-container">
    <header class="glass-header">
      <h1>点单助手</h1>
      <p>精选各大品牌热销单品</p>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <div
          v-for="cat in categories"
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
                <span class="price">¥{{ item.price }}</span>
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
        <span>已选商品 ¥{{ cartStore.totalPrice }}</span>
      </div>
      <button class="checkout-btn">去结算</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const activeCategory = ref('咖啡')

const categories = [
  {
    name: '咖啡',
    brands: [
      {
        brandName: '瑞幸咖啡',
        items: [
          { id: 101, name: '生椰拿铁', desc: '年度爆款，清甜生椰风味', price: 18, icon: '🥥' },
          { id: 102, name: '陨石拿铁', desc: '黑糖波波与咖啡的完美结合', price: 20, icon: '☄️' }
        ]
      },
      {
        brandName: '星巴克',
        items: [
          { id: 103, name: '燕麦拿铁', desc: '坚果香气，纯植物奶健康选择', price: 32, icon: '🌾' },
          { id: 104, name: '焦糖玛奇朵', desc: '经典香甜，层次分明', price: 35, icon: '🍯' }
        ]
      }
    ]
  },
  {
    name: '奶茶',
    brands: [
      {
        brandName: '霸王茶姬',
        items: [
          { id: 201, name: '伯牙绝弦', desc: '茉莉雪芽，清爽回甘', price: 20, icon: '🌸' },
          { id: 202, name: '青沫观音', desc: '铁观音茶底，奶香醇厚', price: 18, icon: '🍃' }
        ]
      },
      {
        brandName: '喜茶',
        items: [
          { id: 203, name: '多肉葡萄', desc: '经典果茶，新鲜手剥果粒', price: 28, icon: '🍇' },
          { id: 204, name: '芝芝莓莓', desc: '超厚芝士奶盖，草莓清香', price: 29, icon: '🍓' }
        ]
      }
    ]
  }
]

const currentProducts = computed(() => {
  return categories.find((category) => category.name === activeCategory.value)?.brands || []
})
</script>

<style scoped>
.menu-container {
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-bottom: 88px;
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
  min-height: calc(100vh - 210px);
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
  color: #ff3b30;
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
  bottom: 92px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 398px;
  height: 60px;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
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

@media (max-width: 480px) {
  .float-cart {
    bottom: 86px;
  }
}
</style>
