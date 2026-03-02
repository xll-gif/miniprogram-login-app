// 启动页面组件
Component({
  /**
   * 组件数据
   */
  data: {
    progress: 0,
    isLoaded: false,
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      this.startLoading();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    /**
     * 开始加载
     */
    startLoading() {
      const timer = setInterval(() => {
        let newProgress = this.data.progress + 0.05;
        
        if (newProgress >= 1) {
          newProgress = 1;
          clearInterval(timer);
          this.setData({
            progress: newProgress,
            isLoaded: true
          });
          
          // 延迟 0.5 秒后跳转
          setTimeout(() => {
            this.triggerEvent('loadingComplete');
          }, 500);
        } else {
          this.setData({
            progress: newProgress
          });
        }
      }, 100);
    },
  },
});
