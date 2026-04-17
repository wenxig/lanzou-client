import { CORSFetch } from 'tauri-plugin-better-cors-fetch'
import type { Lanzou, LoginData } from '..'
import { jsonToFormData } from '../helpers'

export class Auth {
  constructor(protected sdk: Lanzou) {}
  public uid?: number

  public async login(data: LoginData, signal?: AbortSignal) {
    const ky = this.sdk.requester.create()
    const result = ky.post<UserMe>(this.sdk.config.apiPath.auth_login, {
      body: jsonToFormData(data),
      signal,
    })
    const user = await result.json()

    return (this.user = { user, data })
  }

  public async logout(signal?: AbortSignal) {
    if (!this.uid) return
    await CORSFetch.clearCookie()
    this.user = undefined
  }
}