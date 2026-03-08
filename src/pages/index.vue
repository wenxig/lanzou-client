<script setup lang="ts">
import { lanzou } from '@/api'
</script>

<template>
  <NButton @click="lanzou.auth.beginLogin()">开始登录</NButton>
</template>