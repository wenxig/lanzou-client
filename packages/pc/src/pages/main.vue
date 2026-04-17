<script setup lang="ts">

</script>

<template>
  <NLayout embedded contentClass="size-full! overflow-hidden" class="size-full! overflow-hidden!">
    <NLayoutHeader data-tauri-drag-region bordered class="py-3">
      <span class="font-[Hywh]! text-2xl font-black text-(--p-color) ml-3">蓝奏云</span>
    </NLayoutHeader>
    <FileList class="h-[calc(100%-57px)]" />
  </NLayout>
  <Frame />
</template>