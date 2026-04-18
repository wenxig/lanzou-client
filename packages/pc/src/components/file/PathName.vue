<script setup lang="ts">
import { type PathBlock } from 'sdk'

const $props = defineProps<{
  path: PathBlock
}>()
</script>

<template>
  <span class="text-xs text-(--nui-placeholder-color)">{{ path.name }}</span>
</template>