<script setup lang="ts">
import { type PathBlock } from '@/utils/fileSymbol'

const $props = defineProps<{
  path: PathBlock
}>()
</script>

<template>
  <span class="text-(--nui-placeholder-color) text-xs">{{ path.name }}</span>
</template>