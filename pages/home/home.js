// home.js
Page({
  data: {},

  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.redirectTo({ url: '/pages/login/login' })
        }
      }
    })
  }
})
