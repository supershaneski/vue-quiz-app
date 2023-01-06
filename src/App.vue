<script setup>
import { RouterView } from "vue-router"
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition name="slide-right" :duration="200">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>