// 首页
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取用户 ID
    const userId = wx.getStorageSync('userId') || '未知用户'
    this.setData({ userId })
  },

  /**
   * 退出登录
   */
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录信息
          wx.removeStorageSync('token')
          wx.removeStorageSync('userId')

          // 跳转到登录页
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})
