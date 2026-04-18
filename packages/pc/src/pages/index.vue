<script setup lang="ts">
import { sdk } from '@/stores/app'

definePage({
  redirect: sdk.auth.uid ? '/main' : '/auth',
})
</script>

<template></template>