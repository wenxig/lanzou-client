<script setup lang="ts">
import { rootPathBlock, type PathBlock } from 'sdk'
import { reactive } from 'vue'

const paths = reactive(new Array<PathBlock>().concat([rootPathBlock]))
</script>

<template>
  <NLayout hasSider>
    <FileSider :paths />
    <NLayout class="h-full!">
      <NLayoutContent class="h-[calc(100%---spacing(7))]"></NLayoutContent>
      <FileFooter :paths />
    </NLayout>
  </NLayout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  position: absolute;
}
</style>