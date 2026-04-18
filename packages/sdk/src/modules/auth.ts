import type { Lanzou, LoginData } from '..'

export class Auth {
  constructor(protected sdk: Lanzou) {}
  public uid?: number

  public async login({ password, username }: LoginData, signal?: AbortSignal) {
    const axios = this.sdk.requester.reference()
    await this.logout()

    // 初始化cookie
    await axios.get('account.php', { params: { action: 'login', ref: '/mydisk.php' }, signal })

    const response = await axios.postForm<string>(
      'account.php',
      {
        action: 'login',
        task: 'login',
        setToken: '',
        setSig: '',
        setScene: '',
        setSessionId: '',
        formhash: '330f23a8',
        username,
        password,
        ref: '/mydisk.php',
      },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, responseType: 'text' },
    )
    const body = response.data
    if (body.includes('登录成功，欢迎您回来')) {
      const uid = Number(
        (await this.sdk.requester.cors.getAllCookies()).find(v => v.name == 'ylogin'),
      )
      if (uid > 1) return
    }
    const dom = new DOMParser().parseFromString(body, 'text/html')
    const msg =
      dom.querySelector<HTMLDivElement>('.info_b2')?.innerText.replace(/注意.+/, '') || '未知原因'
    throw new Error(msg)
  }

  public async logout() {
    if (!this.uid) return
    await this.sdk.requester.cors.clearCookie()
    this.uid = undefined
  }
}