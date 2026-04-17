import { useInfiniteQuery } from '@pinia/colada'

import { lanzouApi, type PathBlock } from '../api'
import { checkLogin } from '../auth/login'

type Booleanic = '0' | '1' | 0 | 1
type Numeric = string | number

interface Dir {
  onof: Booleanic
  folderlock: Booleanic
  is_lock: Booleanic
  is_copyright: Booleanic
  name: string
  fol_id: string
  folder_des: string
}

interface LsDirsInDir {
  zt: number
  info: any[]
  text: Dir[]
  dat: null
}

interface File {
  icon: string
  id: Numeric
  name_all: string
  name: string
  size: string
  /**
   * @example '2022-10-19'
   */
  time: string
  downs: Numeric
  onof: Numeric
  is_lock: Booleanic
  filelock: Booleanic
  is_copyright: Booleanic
  is_bakdownload: Booleanic
  bakdownload: Numeric
  is_des: Booleanic
  is_ico: Booleanic
}

interface LsFilesInDir {
  zt: number
  info: number
  text: File[]
  dat: null
}

export const readdir = async (dirId: Numeric) => {
  if (!(await checkLogin())) throw new Error('你还没有登陆')

  let data = new Array<PathBlock[]>()
  while (true){
    lanzouApi.post<LsDirsInDir>()
  }
  // const data = Promise.all([lanzouApi.post<LsDirsInDir>()])
}