import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'
import { merge } from 'es-toolkit/compat'
import { CORSFetch } from 'tauri-plugin-better-cors-fetch'

import type { Lanzou } from '..'

export class Requester {
  constructor(protected sdk: Lanzou) {
    this.cors = CORSFetch.init({}, false)
  }
  public cors
  private requester?: AxiosInstance

  /**
   * @description 从config创建axios实例
   */
  public create(overrideConfig: Partial<CreateAxiosDefaults> = {}) {
    const { requestTimeout: timeout, requestUsingFork: baseUrl } = this.sdk.config

    return axios.create(
      merge<CreateAxiosDefaults, CreateAxiosDefaults>(
        { timeout, baseURL: baseUrl, env: { fetch: this.cors.fetch }, adapter: ['fetch'] },
        overrideConfig,
      ),
    )
  }
  public reference(overrideConfig: Partial<CreateAxiosDefaults> = {}) {
    return (this.requester ??= this.create(overrideConfig))
  }
}