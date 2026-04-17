import { useLocalStorage } from '@vueuse/core'
import { isEmpty } from 'es-toolkit/compat'
import { type CookieOptions, CORSFetch } from 'tauri-plugin-better-cors-fetch'

import { lanzouApi } from '../api'

const loginData = useLocalStorage('data.api.login-cookie', new Array<CookieOptions>())

export const checkLogin = () => isEmpty(loginData.value)

export const login = async (username: string, password: string) => {
  await CORSFetch.clearCookie()
  await lanzouApi.get('account.php', { params: { action: 'login', ref: '/mydisk.php' } })
  console.log('From', await CORSFetch.getAllCookies())

  const response = await lanzouApi.postForm<string>(
    'account.php',
    {
      action: 'login',
      task: 'login',
      setToken: '',
      setSig: '',
      setSessionId: '',
      formhash: '330f23a8',
      username,
      password,
      ref: '/mydisk.php'
    },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' }
  )
  const cookies = response.headers['set-cookie']?.map(v => v.split(';')[0].split('=')) ?? []

  console.log('To', cookies, '->', await CORSFetch.getAllCookies())
  const body = response.data
  if (!body.includes('登录成功，欢迎您回来')) throw new Error()
}