<script setup lang="ts">
import { asyncNoop } from 'es-toolkit'
import { onMounted, ref, useTemplateRef } from 'vue'

import { lanzou } from '@/api'
const username = ref('')
const password = ref('')

const loginCaptcha = useTemplateRef('loginCaptcha')
let submit: (un: string, pwd: string) => Promise<any> = asyncNoop
onMounted(async () => {
  if (loginCaptcha.value) submit = await lanzou.auth.beginLogin(loginCaptcha.value)
})
</script>

<template>
  <NInput v-model:value="username" />
  <NInput v-model:value="password" />
  <div ref="loginCaptcha" class="nc-container" id="login-captcha"></div>
  <NButton @click="submit(username, password)">submit</NButton>
</template>