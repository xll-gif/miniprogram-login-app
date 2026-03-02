// 登录页面
const { MockLoginService, LoginErrorType, LoginErrorMessages } = require('../../utils/loginApi')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 表单状态
    email: '',
    password: '',
    showPassword: false,

    // 验证状态
    emailError: '',
    passwordError: '',
    submitError: '',

    // 加载状态
    isLoading: false,

    // 登录服务
    loginService: new MockLoginService()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查登录状态
    const token = wx.getStorageSync('token')
    if (token) {
      wx.redirectTo({
        url: '/pages/home/home'
      })
    }
  },

  /**
   * 邮箱输入变化
   */
  onEmailChange(e) {
    const email = e.detail.value
    this.setData({ email })

    // 验证邮箱
    if (email === '') {
      this.setData({ emailError: '' })
    } else if (!this.data.loginService.validateEmail(email)) {
      this.setData({ emailError: LoginErrorMessages[LoginErrorType.INVALID_EMAIL] })
    } else {
      this.setData({ emailError: '' })
    }
  },

  /**
   * 密码输入变化
   */
  onPasswordChange(e) {
    const password = e.detail.value
    this.setData({ password })

    // 验证密码
    if (password === '') {
      this.setData({ passwordError: '' })
    } else {
      const result = this.data.loginService.validatePassword(password)
      this.setData({ passwordError: result.error || '' })
    }
  },

  /**
   * 切换密码显示/隐藏
   */
  onTogglePassword() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },

  /**
   * 判断表单是否有效
   */
  get isFormValid() {
    return this.data.email !== '' &&
           this.data.password !== '' &&
           this.data.emailError === '' &&
           this.data.passwordError === ''
  },

  /**
   * 处理登录
   */
  async onLogin() {
    // 清除之前的提交错误
    this.setData({ submitError: '' })

    // 表单验证
    if (!this.isFormValid) {
      return
    }

    // 开始加载
    this.setData({ isLoading: true })

    try {
      const request = {
        email: this.data.email,
        password: this.data.password
      }

      const response = await this.data.loginService.login(request)

      if (response.code === 200 && response.data) {
        // 登录成功
        console.log('登录成功:', response.data)

        // 保存 Token 到本地存储
        wx.setStorageSync('token', response.data.token)
        wx.setStorageSync('userId', response.data.userId)

        // 跳转到首页
        wx.redirectTo({
          url: '/pages/home/home'
        })
      } else {
        // 登录失败
        this.setData({ submitError: response.message || '登录失败，请重试' })
      }
    } catch (error) {
      // 网络错误
      console.error('登录失败:', error)
      this.setData({ submitError: LoginErrorMessages[LoginErrorType.NETWORK_ERROR] })
    } finally {
      // 结束加载
      this.setData({ isLoading: false })
    }
  },

  /**
   * 忘记密码
   */
  onForgotPassword() {
    wx.showToast({
      title: '找回密码功能开发中',
      icon: 'none'
    })
  },

  /**
   * 注册
   */
  onRegister() {
    wx.showToast({
      title: '注册功能开发中',
      icon: 'none'
    })
  }
})
