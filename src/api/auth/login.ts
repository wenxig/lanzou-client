import { useLocalStorage } from '@vueuse/core'
import { isEmpty } from 'es-toolkit/compat'
import { CORSFetch } from 'tauri-plugin-better-cors-fetch'

type CookieOptions = NonNullable<Parameters<typeof CORSFetch.setCookieByParts>[3]>
const loginData = useLocalStorage('data.api.login-cookie', new Array<CookieOptions>())

export const checkLogin = () => isEmpty(loginData.value)

export const login = ()=>{}