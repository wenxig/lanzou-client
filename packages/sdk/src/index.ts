import { Auth } from './modules/auth'
import { Config } from './modules/config'
import { Requester } from './modules/requester'

export * from './model/auth'
export * from './model/utils'

export class Lanzou {
  public config = new Config(this)
  public requester = new Requester(this)
  public auth = new Auth(this)
}