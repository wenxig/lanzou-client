import { useLocalStorage } from '@vueuse/core'
import { Mutex } from 'es-toolkit'
import { isEmpty } from 'es-toolkit/compat'
import { type CookieOptions } from 'tauri-plugin-better-cors-fetch'

import { lanzouApi } from '../axios'

const loginData = useLocalStorage('data.api.login-cookie', new Array<CookieOptions>())

export const checkLogin = () => isEmpty(loginData.value)

const loginLock = new Mutex()
export const beginLogin = async () => {
  await loginLock.acquire()
  try {
    const dom = await lanzouApi.get<Document>('/account.php', {
      params: { action: 'login' },
      responseType: 'document'
    })
    dom.data
  } finally {
    loginLock.release()
  }
}