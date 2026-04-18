import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'
import { merge } from 'es-toolkit/compat'
import { CORSFetch } from 'tauri-plugin-better-cors-fetch'

export class Requester {
  public static async create() {
    const cors = await CORSFetch.init({ request: { instanceKey: `Lanzou-${Math.random()}` } })
    return new this(cors)
  }
  private constructor(public cors: CORSFetch) {}
  private requester?: AxiosInstance

  /**
   * @description 从config创建axios实例
   */
  public create(overrideConfig: Partial<CreateAxiosDefaults> = {}) {
    return axios.create(
      merge<CreateAxiosDefaults, CreateAxiosDefaults>(
        {
          timeout: 7000,
          baseURL: 'https://pc.woozooo.com',
          env: { fetch: this.cors.fetch },
          adapter: ['fetch'],
        },
        overrideConfig,
      ),
    )
  }
  public reference(overrideConfig: Partial<CreateAxiosDefaults> = {}) {
    return (this.requester ??= this.create(overrideConfig))
  }
}