<script setup lang="ts">
import { NIcon, type MenuOption } from 'naive-ui'
import { CloudRole, type PathBlock } from 'sdk'
import { h, ref, type Component } from 'vue'

import { Icons } from '@/icons'

defineProps<{
  paths: PathBlock[]
}>()

const collapsed = ref(true)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions: MenuOption[] = [
  {
    icon: renderIcon(Icons.ic_fluent_folder_24_filled),
    key: CloudRole.root,
    label: '文件夹',
  },
]
</script>

<template>
  <NLayoutSider
    class="relative! h-full!"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <Transition name="fade">
      <NMenu
        :value="paths.at(0)?.role"
        collapsed
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        v-if="collapsed"
      />
      <NTree v-else class="w-full!"></NTree>
    </Transition>
  </NLayoutSider>
</template>