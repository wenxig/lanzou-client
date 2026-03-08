import { useLocalStorage } from '@vueuse/core'
import { Mutex } from 'es-toolkit'
import { isEmpty } from 'es-toolkit/compat'
import { type CookieOptions } from 'tauri-plugin-better-cors-fetch'

import { lanzouApi } from '../axios'
import { toFormData } from 'axios'

const loginData = useLocalStorage('data.api.login-cookie', new Array<CookieOptions>())

export const checkLogin = () => isEmpty(loginData.value)

declare global {
  class noCaptcha {
    constructor(config: object)
    upLang(lang: string, config: object): void
  }
}

const loginLock = new Mutex()
export const beginLogin = async (el: Element) => {
  await loginLock.acquire()
  try {
    const base = 'FFFF0N00000000000555'
    const token = [base, new Date().getTime(), Math.random()].join(':')
    const nc = new noCaptcha({
      renderTo: el.id || el,
      appkey: base,
      scene: 'nc_login',
      token,
      customWidth: 249,
      trans: { key1: 'code0' },
      elementID: ['usernameID'],
      is_Opt: 0,
      language: 'cn',
      isEnabled: true,
      timeout: 3000,
      times: 5,
      callback(data: any) {
        console.log(token)
        console.log(data.csessionid)
        console.log(data.sig)
        captchaResult.sessionId = data.csessionid
        captchaResult.sig = data.sig
      }
    })
    const captchaResult = { sessionId: '', sig: '' }
    nc.upLang('cn', {
      _startTEXT: '请按住滑块，拖动到最右边',
      _yesTEXT: '验证通过',
      _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
      _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
    })
    return async (username: string, password: string) => {
      const data = {
        action: 'login',
        task: 'login',
        setScene: 'nc_login',
        setSessionId: captchaResult.sessionId,
        setToken: token,
        setSig: captchaResult.sig,
        formhash: '330f23a8',
        username,
        password
      }
      const cookies = await lanzouApi.post('account.php', toFormData(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const c = cookies.headers['set-cookie']?.map(v => v.split(';')[0].split('=')) ?? []
      console.log(cookies, c, data)
      return c
    }
  } finally {
    loginLock.release()
  }
}