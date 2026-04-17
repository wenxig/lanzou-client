import axios from 'axios'

export const lanzouApi = axios.create({
  baseURL: 'https://pc.woozooo.com',
  timeout: 7000,
  adapter: ['fetch'],
})

export enum CloudRole {
  root = '$ROOT',
  bin = '$BIN',
  other = '$OTHER',
}
export enum PathType {
  Dir = 'folder',
  file = 'file',
}

export interface PathBlock {
  lanzouId: number
  name: string
  type: PathType
  role: CloudRole
}

export const rootPathBlock: PathBlock = {
  lanzouId: -1,
  name: '你的网盘',
  role: CloudRole.root,
  type: PathType.Dir,
}
export const binPathBlock: PathBlock = {
  name: '回收站',
  role: CloudRole.bin,
  type: PathType.Dir,
  lanzouId: -2,
}

export const createPathBlock = (data: Omit<PathBlock, 'role'>): PathBlock => ({
  role: CloudRole.other,
  ...data,
})