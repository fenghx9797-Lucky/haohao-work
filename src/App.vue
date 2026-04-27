<template>
  <div class="app-shell">
    <div class="mobile-frame" :class="{ 'mobile-frame--splash': isSplash }">
      <main class="page-content" :class="{ 'page-content--splash': isSplash }">
        <RouterView />
      </main>
      <BottomNav v-if="!isSplash" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import BottomNav from './components/BottomNav.vue'

const route = useRoute()
const isSplash = computed(() => route.name === 'splash')
</script>
