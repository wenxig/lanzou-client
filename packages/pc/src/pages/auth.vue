<script setup lang="ts">
import { isError } from 'es-toolkit'
import { useMessage, type FormRules } from 'naive-ui'
import { reactive, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/api/auth/login'
import { createLoadingMessage } from '@/utils/loading'

const $router = useRouter()

const formValue = reactive({
  username: '',
  password: ''
})

const rules = {
  username: {
    required: true,
    message: '请输入账号',
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  }
} satisfies FormRules

const message = useMessage()

const formRef = useTemplateRef('formRef')
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async errors => {
    if (errors) {
      console.log(errors)
      message.error('表单无效')
      return
    }
    await createLoadingMessage('132', message).bind(
      login(formValue.username, formValue.password).catch(err => {
        if (!isError(err)) throw err
        message.error(err.message.replaceAll('\n', '\n'))
        throw err
      })
    )
    $router.replace('/')
  })
}
</script>

<template>
  <NLayout
    embedded
    contentClass="size-full! flex justify-center items-center"
    class="font-hywh size-full!"
  >
    <div
      class="absolute top-3 left-3 rounded-full bg-(--p-color)/30 px-10 py-1 text-xl font-black opacity-70"
    >
      登陆
    </div>
    <NCard class="w-[unset]! min-w-75!">
      <NForm ref="formRef" :model="formValue" :rules>
        <!-- name -->
        <NFormItem label="账号" path="username">
          <NInput clearable v-model:value="formValue.username" />
        </NFormItem>
        <!-- pwd -->
        <NFormItem label="密码" path="password">
          <NInput clearable v-model:value="formValue.password" type="password" />
        </NFormItem>
        <!-- submit -->
        <NButton @click="handleValidateClick" type="primary">提交</NButton>
      </NForm>
    </NCard>
  </NLayout>
  <Frame />
</template>