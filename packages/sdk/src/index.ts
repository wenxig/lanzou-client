import { Auth } from './modules/auth'
import { Fs } from './modules/fs'
import { Requester } from './modules/requester'

export * from './model/auth'
export * from './model/utils'
export * from './model/fs'

export class Lanzou {
  public static async create() {
    return new this(await Requester.create())
  }
  private constructor(public requester: Requester) {}
  public auth = new Auth(this)
  public fs = new Fs(this)
}