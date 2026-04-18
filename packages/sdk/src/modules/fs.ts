import { createPathBlock, PathType, type PathBlock } from '@/model/fs'

import type { Lanzou } from '..'

type Booleanic = '0' | '1' | 0 | 1
type Numeric = string | number

interface Dir {
  onof: Booleanic
  folderlock: Booleanic
  is_lock: Booleanic
  is_copyright: Booleanic
  name: string
  fol_id: Numeric
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

export class Fs {
  constructor(protected sdk: Lanzou) {}
  public async readdir(path: PathBlock, signal?: AbortSignal) {
    if (!this.sdk.auth.uid) throw new Error('你还没有登陆')
    const axios = this.sdk.requester.reference()

    let data = new Array<PathBlock>()
    const dirs = await axios.postForm<LsDirsInDir>(
      '/doupload.php',
      { task: 47, folder_id: path.lanzouId, vei: 'AlVTUQJQVQhXBARUCVM=' },
      { signal, params: { uid: this.sdk.auth.uid } },
    )
    for (const dir of dirs.data.text)
      data.push(
        createPathBlock({ lanzouId: Number(dir.fol_id), name: dir.name, type: PathType.dir }),
      )

    let index = 1
    while (true) {
      const files = await axios.postForm<LsFilesInDir>(
        '/doupload.php',
        { task: 5, folder_id: path.lanzouId, pg: index, vei: 'AlVTUQJQVQhXBARUCVM=' },
        { signal, params: { uid: this.sdk.auth.uid } },
      )
      if (files.data.text.length == 0) break

      index++

      for (const file of files.data.text)
        data.push(
          createPathBlock({ lanzouId: Number(file.id), name: file.name, type: PathType.file }),
        )
    }
    return data
  }
}