<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

await $router.push($route.fullPath)
</script>

<template>
  <RouterView :key="$route.meta.force ? $route.fullPath : undefined" v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>