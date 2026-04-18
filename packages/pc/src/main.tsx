import 'core-js'

import { useDark, usePreferredDark } from '@vueuse/core'
import Color from 'color'
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
  zhCN,
  darkTheme,
  NGlobalStyle
} from 'naive-ui'
import { createPinia } from 'pinia'

import '@/index.css'
import { CORSFetch } from 'tauri-plugin-better-cors-fetch'
import { createApp, defineComponent, watch } from 'vue'
import { DataLoaderPlugin } from 'vue-router/experimental'

import AppSetup from './AppSetup.vue'
import { router } from './router'
import { PiniaColada } from '@pinia/colada'
console.log(router,123)
await CORSFetch.init({
  request: { danger: { acceptInvalidCerts: true, acceptInvalidHostnames: true } },
})
console.log(456)

document.addEventListener('contextmenu', e => e.preventDefault())
const app = createApp(
  defineComponent(() => {
    const isDark = usePreferredDark()
    const isUseDarkMode = useDark({ listenToStorageChanges: false })
    watch(isDark, isDark => (isUseDarkMode.value = isDark), { immediate: true })

    const themeColor = Color('#FF8800').hex()
    const themeColorDark = Color(themeColor).darken(0.2).hex()

    return () => (
      <NConfigProvider
        locale={zhCN}
        abstract
        theme={isDark.value ? darkTheme : undefined}
        themeOverrides={{
          common: {
            primaryColor: themeColor,
            primaryColorHover: Color(themeColor).lighten(0.2).hex(),
            primaryColorPressed: themeColorDark,
            primaryColorSuppl: themeColorDark,
            cardColor: isDark.value ? '#17181a' : undefined,
          },
        }}
      >
        <NGlobalStyle />
        <NLoadingBarProvider container-class='z-200000'>
          <NDialogProvider to='#popups'>
            <NMessageProvider max={5} to='#messages'>
              <AppSetup />
            </NMessageProvider>
          </NDialogProvider>
        </NLoadingBarProvider>
      </NConfigProvider>
    )
  }),
)

app.use(DataLoaderPlugin, { router })
app.use(router)

const pinia = createPinia()
app.use(pinia)

app.use(PiniaColada)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')