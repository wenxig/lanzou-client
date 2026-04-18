<script setup lang="ts">
import type { PathBlock } from 'sdk'

defineProps<{
  paths: PathBlock[]
}>()
</script>

<template>
  <NLayoutFooter class="h-7" bordered>
    <NBreadcrumb>
      <NBreadcrumbItem v-for="path of paths" class="*:first:flex! *:first:items-center!">
        <FileIcon :path />
        <PathName :path />
      </NBreadcrumbItem>
    </NBreadcrumb>
  </NLayoutFooter>
</template>