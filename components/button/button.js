// 按钮样式变体
const ButtonVariant = {
  Primary: 'primary', // 主要按钮（蓝色背景，白色文字）
  Secondary: 'secondary', // 次要按钮（白色背景，蓝色文字，蓝色边框）
  Danger: 'danger', // 危险按钮（红色背景，白色文字）
};

Component({
  /**
   * 组件属性
   */
  properties: {
    // 按钮文字
    text: {
      type: String,
      value: '',
    },
    
    // 按钮样式变体
    variant: {
      type: String,
      value: ButtonVariant.Primary,
    },
    
    // 按钮宽度
    width: {
      type: String,
      value: '',
    },
    
    // 是否全宽
    fullWidth: {
      type: Boolean,
      value: false,
    },
    
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    },
    
    // 按钮高度
    height: {
      type: String,
      value: '44px',
    },
  },

  /**
   * 组件数据
   */
  data: {
    ButtonVariant,
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      // 组件加载时计算样式
      this._computeStyles();
    },
  },

  /**
   * 组件数据监听
   */
  observers: {
    'variant, disabled': function() {
      this._computeStyles();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    /**
     * 计算按钮样式
     */
    _computeStyles() {
      const { variant, disabled } = this.data;
      
      let backgroundColor, color, borderColor;
      
      if (disabled) {
        backgroundColor = '#E5E5E5';
        color = '#999999';
        borderColor = variant === ButtonVariant.Secondary ? '#DDDDDD' : 'transparent';
      } else {
        switch (variant) {
          case ButtonVariant.Primary:
            backgroundColor = '#007AFF';
            color = '#FFFFFF';
            borderColor = 'transparent';
            break;
          case ButtonVariant.Secondary:
            backgroundColor = '#FFFFFF';
            color = '#007AFF';
            borderColor = '#007AFF';
            break;
          case ButtonVariant.Danger:
            backgroundColor = '#FF3B30';
            color = '#FFFFFF';
            borderColor = 'transparent';
            break;
          default:
            backgroundColor = '#007AFF';
            color = '#FFFFFF';
            borderColor = 'transparent';
        }
      }
      
      this.setData({
        buttonStyle: {
          backgroundColor,
          color,
          borderColor,
        },
      });
    },

    /**
     * 按钮点击事件
     */
    handleTap() {
      if (this.data.disabled) {
        return;
      }
      
      this.triggerEvent('tap', {});
    },

    /**
     * 获取按钮样式类名
     */
    getButtonClass() {
      const { variant, disabled, fullWidth } = this.data;
      let classes = 'button';
      
      classes += ` button--${variant}`;
      
      if (disabled) {
        classes += ' button--disabled';
      }
      
      if (fullWidth) {
        classes += ' button--full-width';
      }
      
      return classes;
    },
  },
});
