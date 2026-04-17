<script setup lang="ts">
import { checkLogin } from '@/api/auth/login'

definePage({
  redirect: (await checkLogin()) ? '/main' : '/auth'
})
</script>

<template></template>