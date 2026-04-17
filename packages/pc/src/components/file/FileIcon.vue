<script setup lang="ts">
import type { IconProps } from 'naive-ui'
import { computed } from 'vue'

import { CloudRole, PathType, type PathBlock } from '@/utils/fileSymbol'

import { Icons } from '../../icons'

const $props = defineProps<{
  path: PathBlock
  props?: Partial<IconProps>
}>()
const icon = computed(() => {
  if ($props.path.role == CloudRole.root) return Icons.ic_fluent_cube_24_filled
  if ($props.path.role == CloudRole.bin) return Icons.ic_fluent_delete_24_filled

  if ($props.path.type == PathType.Dir) return Icons.ic_fluent_folder_24_filled
  if ($props.path.type == PathType.file) return Icons.ic_fluent_document_24_filled

  return Icons.ic_fluent_folder_24_filled
})
</script>

<template>
  <NIcon :="$props.props">
    <component :is="icon"></component>
  </NIcon>
</template>