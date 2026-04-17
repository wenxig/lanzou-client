<script setup lang="ts">
import { window } from '@tauri-apps/api'

import { Icons } from '@/icons'
const thisWindow = window.getCurrentWindow()
</script>

<template>
  <div
    class="absolute top-1.5 right-1 flex h-10 w-fit items-center gap-2 overflow-hidden rounded-full px-2 shadow-lg/30"
  >
    <NButton quaternary circle @click="thisWindow.minimize()">
      <template #icon>
        <NIcon>
          <Icons.ic_fluent_subtract_24_filled />
        </NIcon>
      </template>
    </NButton>
    <NButton quaternary circle @click="thisWindow.close()">
      <template #icon>
        <NIcon>
          <Icons.ic_fluent_dismiss_24_filled />
        </NIcon>
      </template>
    </NButton>
  </div>
</template>