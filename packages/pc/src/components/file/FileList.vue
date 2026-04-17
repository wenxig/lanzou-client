<script setup lang="ts">
import { NIcon, type MenuOption } from 'naive-ui'
import { h, reactive, ref, type Component } from 'vue'

import { Icons } from '@/icons'
import { CloudRole, rootPathBlock, type PathBlock } from '@/utils/fileSymbol'

const collapsed = ref(true)

const paths = reactive(new Array<PathBlock>().concat([rootPathBlock]))

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
  <NLayout hasSider>
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
    <NLayout class="h-full!">
      <NLayoutContent class="h-[calc(100%---spacing(7))]"></NLayoutContent>
      <NLayoutFooter class="h-7" bordered>
        <NBreadcrumb>
          <NBreadcrumbItem v-for="path of paths" class="*:first:flex! *:first:items-center!">
            <FileIcon :path />
            <PathName :path />
          </NBreadcrumbItem>
        </NBreadcrumb>
      </NLayoutFooter>
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