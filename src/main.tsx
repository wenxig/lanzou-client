import 'core-js'
import { CORSFetch } from 'tauri-plugin-better-cors-fetch'
CORSFetch.init({ request: { danger: { acceptInvalidCerts: true, acceptInvalidHostnames: true } } })

import axios from 'axios'

axios.defaults.timeout = 7000
axios.defaults.adapter = ['fetch']

import '@/index.css'
import { useDark, usePreferredDark } from '@vueuse/core'
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
import { createApp, defineComponent, watch } from 'vue'

import AppSetup from './AppSetup.vue'
import { router } from './router'

document.addEventListener('contextmenu', e => e.preventDefault())

import Color from 'color'
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
        theme={isDark ? darkTheme : undefined}
        themeOverrides={{
          common: {
            primaryColor: themeColor,
            primaryColorHover: Color(themeColor).lighten(0.2).hex(),
            primaryColorPressed: themeColorDark,
            primaryColorSuppl: themeColorDark,
            cardColor: isDark ? '#17181a' : undefined
          }
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
  })
)

const pinia = createPinia()
app.use(pinia)

app.use(router)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')