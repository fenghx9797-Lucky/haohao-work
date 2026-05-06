<template>
  <section class="splash-page">
    <img class="splash-image" :src="openingCover" alt="点单开屏引导图" />
    <div class="splash-overlay">
      <p class="splash-hint">{{ siteConfig.splash.buttonHint }}</p>
      <button
        type="button"
        class="splash-button"
        :style="buttonStyle"
        @click="router.push('/menu')"
      >
        {{ siteConfig.splash.buttonText }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import openingCover from '../config/openingCover.js'
import { siteConfig } from '../config/site'

const router = useRouter()

const buttonStyle = computed(() => ({
  background: `linear-gradient(135deg, ${siteConfig.splash.buttonColor} 0%, ${siteConfig.splash.buttonColorDeep} 100%)`,
  boxShadow: `0 18px 36px color-mix(in srgb, ${siteConfig.splash.buttonColorDeep} 32%, transparent)`
}))
</script>

<style scoped>
.splash-page {
  position: relative;
  min-height: 100%;
  overflow: hidden;
  border-radius: 28px;
  background: linear-gradient(180deg, #cfe6ff 0%, #fff7fb 100%);
}

.splash-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.splash-overlay {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px 18px 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 250, 252, 0.84) 30%, rgba(255, 248, 250, 0.98) 100%);
}

.splash-hint {
  margin: 0 0 12px;
  text-align: center;
  color: #8a6670;
  font-size: 14px;
  font-weight: 600;
}

.splash-button {
  width: 100%;
  min-height: 52px;
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

@media (max-width: 480px) {
  .splash-page {
    border-radius: 0;
  }
}
</style>
