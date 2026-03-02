// 键盘类型枚举
const InputType = {
  Text: 'text', // 默认键盘
  Number: 'number', // 数字键盘
  Idcard: 'idcard', // 身份证键盘
  Digit: 'digit', // 带小数点键盘
};

Component({
  /**
   * 组件属性
   */
  properties: {
    // 输入框标题
    title: {
      type: String,
      value: '',
    },
    
    // 占位符
    placeholder: {
      type: String,
      value: '',
    },
    
    // 输入值
    value: {
      type: String,
      value: '',
    },
    
    // 键盘类型
    keyboardType: {
      type: String,
      value: InputType.Text,
    },
    
    // 是否密码输入
    isPassword: {
      type: Boolean,
      value: false,
    },
    
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false,
    },
    
    // 是否有错误
    isError: {
      type: Boolean,
      value: false,
    },
    
    // 错误提示
    errorMessage: {
      type: String,
      value: '',
    },
    
    // 输入框宽度
    width: {
      type: String,
      value: '',
    },
    
    // 是否全宽
    fullWidth: {
      type: Boolean,
      value: false,
    },
    
    // 输入框高度
    height: {
      type: String,
      value: '40px',
    },
    
    // 最大长度
    maxlength: {
      type: Number,
      value: 140,
    },
  },

  /**
   * 组件数据
   */
  data: {
    InputType,
    inputType: 'text', // 实际 input type
    borderColor: '#DDDDDD',
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      // 组件加载时计算类型和样式
      this._computeInputType();
      this._computeBorderColor();
    },
  },

  /**
   * 组件数据监听
   */
  observers: {
    'isPassword, keyboardType': function() {
      this._computeInputType();
    },
    'isError, disabled': function() {
      this._computeBorderColor();
    },
  },

  /**
   * 组件方法
   */
  methods: {
    /**
     * 计算输入框类型
     */
    _computeInputType() {
      const { isPassword, keyboardType } = this.data;
      
      this.setData({
        inputType: isPassword ? 'password' : keyboardType,
      });
    },

    /**
     * 计算边框颜色
     */
    _computeBorderColor() {
      const { isError, disabled } = this.data;
      
      let borderColor;
      
      if (disabled) {
        borderColor = '#DDDDDD';
      } else if (isError) {
        borderColor = '#FF3B30';
      } else {
        borderColor = '#DDDDDD';
      }
      
      this.setData({
        borderColor,
      });
    },

    /**
     * 输入框值变更事件
     */
    handleInput(e: WechatMiniprogram.Input) {
      const value = e.detail.value;
      this.triggerEvent('input', { value });
    },

    /**
     * 输入框聚焦事件
     */
    handleFocus(e: WechatMiniprogram.Input) {
      this.triggerEvent('focus', e.detail);
    },

    /**
     * 输入框失焦事件
     */
    handleBlur(e: WechatMiniprogram.Input) {
      this.triggerEvent('blur', e.detail);
    },

    /**
     * 输入框确认事件
     */
    handleConfirm(e: WechatMiniprogram.Input) {
      this.triggerEvent('confirm', e.detail);
    },

    /**
     * 获取输入框类名
     */
    getInputClass() {
      const { isError, disabled } = this.data;
      let classes = 'input-field';
      
      if (isError) {
        classes += ' input-field--error';
      }
      
      if (disabled) {
        classes += ' input-field--disabled';
      }
      
      return classes;
    },
  },
});
