<template>
  <article class="product-card">
    <div class="product-card__body">
      <div class="product-card__meta">
        <div class="tag-list">
          <span v-for="tag in product.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.desc }}</p>
      </div>
      <div class="product-card__footer">
        <strong>¥{{ product.price }}</strong>
        <button type="button" class="primary-button" @click="$emit('add', product)">
          加入购物车
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add'])
</script>
