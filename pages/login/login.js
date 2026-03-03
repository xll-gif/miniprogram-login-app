// login.js
Page({
  data: {
    username: '',
    password: '',
    isLoading: false,
    errorMessage: ''
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  onLogin() {
    const { username, password } = this.data

    if (!username || !password) {
      this.setData({ errorMessage: '请输入用户名和密码' })
      return
    }

    this.setData({ isLoading: true, errorMessage: '' })

    // 模拟登录
    setTimeout(() => {
      this.setData({ isLoading: false })

      if (username === 'admin' && password === '123456') {
        wx.showToast({ title: '登录成功', icon: 'success' })
        // 跳转到首页
        wx.redirectTo({ url: '/pages/home/home' })
      } else {
        this.setData({ errorMessage: '用户名或密码错误' })
      }
    }, 1500)
  }
})
