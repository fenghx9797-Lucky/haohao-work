<template>
  <div class="app-shell">
    <div class="mobile-frame">
      <main class="page-content">
        <RouterView />
      </main>
      <BottomNav />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import BottomNav from './components/BottomNav.vue'
</script>
