# InputField 组件使用规则

## 组件说明

通用输入框组件，基于设计稿样式实现，使用微信小程序原生框架构建。

## 设计稿样式规范

- **边框颜色**: `#DDDDDD`（浅灰色）
- **边框宽度**: `1px`
- **圆角**: `4px`
- **宽度**: `300px`（可根据容器调整）
- **高度**: `40px`（固定）
- **文字大小**: `16px`
- **文字颜色**: `#333333`
- **占位符颜色**: `#999999`
- **内边距**: `12px`

## API 文档

### Properties

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `title` | `String` | `''` | 输入框标题 |
| `placeholder` | `String` | `''` | 占位符（必填） |
| `value` | `String` | `''` | 输入值（必填） |
| `keyboardType` | `String` | `'text'` | 键盘类型 |
| `isPassword` | `Boolean` | `false` | 是否密码输入 |
| `disabled` | `Boolean` | `false` | 是否禁用 |
| `isError` | `Boolean` | `false` | 是否有错误 |
| `errorMessage` | `String` | `''` | 错误提示 |
| `width` | `String` | `''` | 输入框宽度，空字符串表示宽度自适应 |
| `fullWidth` | `Boolean` | `false` | 是否全宽填充父容器 |
| `height` | `String` | `'40px'` | 输入框高度（建议保持默认） |
| `maxlength` | `Number` | `140` | 最大输入长度 |

### Events

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| `bindinput` | 输入值变更 | `{ value: string }` |
| `bindfocus` | 输入框聚焦 | event.detail |
| `bindblur` | 输入框失焦 | event.detail |
| `bindconfirm` | 输入框确认 | event.detail |

### InputType 常量

| 值 | 说明 |
|---|------|
| `'text'` | 默认键盘 |
| `'number'` | 数字键盘 |
| `'idcard'` | 身份证键盘 |
| `'digit'` | 带小数点键盘 |

## 使用规则

### 1. 在页面中引入组件

```json
{
  "usingComponents": {
    "input-field": "/components/input-field/input-field"
  }
}
```

### 2. 基础输入框

```xml
<input-field
  placeholder="请输入邮箱"
  value="{{ email }}"
  bind:input="handleEmailInput"
  keyboardType="text"
  width="300px"
/>
```

### 3. 带标题的输入框

```xml
<input-field
  title="密码"
  placeholder="请输入密码"
  value="{{ password }}"
  bind:input="handlePasswordInput"
  isPassword="{{ true }}"
  width="300px"
/>
```

### 4. 错误状态

```xml
<input-field
  title="邮箱"
  placeholder="请输入邮箱"
  value="{{ email }}"
  bind:input="handleEmailInput"
  isError="{{ isError }}"
  errorMessage="邮箱格式不正确"
  width="300px"
/>
```

### 5. 禁用状态

```xml
<input-field
  placeholder="禁用状态"
  value="{{ disabledText }}"
  disabled="{{ true }}"
  width="300px"
/>
```

### 6. 手机号输入

```xml
<input-field
  title="手机号"
  placeholder="请输入手机号"
  value="{{ phone }}"
  bind:input="handlePhoneInput"
  keyboardType="number"
  width="300px"
/>
```

### 7. 数字输入

```xml
<input-field
  title="金额"
  placeholder="请输入金额"
  value="{{ amount }}"
  bind:input="handleAmountInput"
  keyboardType="digit"
  width="300px"
/>
```

### 8. 事件处理

```javascript
Page({
  data: {
    email: '',
    password: '',
    isError: false,
  },

  handleEmailInput(e) {
    this.setData({
      email: e.detail.value
    });
  },

  handlePasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  handleFocus(e) {
    console.log('输入框聚焦', e.detail);
  },

  handleBlur(e) {
    console.log('输入框失焦', e.detail);
    // 在失焦时进行验证
    this.validateEmail();
  },

  validateEmail() {
    const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;
    if (!emailRegex.test(this.data.email)) {
      this.setData({
        isError: true
      });
    } else {
      this.setData({
        isError: false
      });
    }
  },

  handleSubmit() {
    if (this.validateEmail()) {
      // 提交逻辑
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '请检查输入',
        icon: 'error'
      });
    }
  }
});
```

## 布局建议

### 垂直表单布局

```xml
<view style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
  <input-field
    title="邮箱"
    placeholder="请输入邮箱"
    value="{{ email }}"
    bind:input="handleEmailInput"
    keyboardType="text"
    width="300px"
  />

  <input-field
    title="密码"
    placeholder="请输入密码"
    value="{{ password }}"
    bind:input="handlePasswordInput"
    isPassword="{{ true }}"
    width="300px"
  />
</view>
```

### 错误验证流程

```javascript
function validateEmail(email) {
  const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;
  return emailRegex.test(email);
}

function handleSubmit() {
  if (!validateEmail(this.data.email)) {
    this.setData({
      isError: true
    });
  } else {
    // 提交逻辑
  }
}
```

## 禁止事项

1. ❌ 不要使用非设计稿规范的颜色
2. ❌ 不要修改输入框高度（除非有特殊需求）
3. ❌ 不要在占位符中使用特殊符号
4. ❌ 不要嵌套输入框
5. ❌ 不要使用 input 组件的默认样式（组件已覆盖）
6. ❌ 不要同时使用错误状态和禁用状态（除非业务需要）

## 样式自定义

组件使用内联样式和类名实现，如需自定义样式，可以通过添加额外的类名或修改 `input-field.wxss` 文件。

```xml
<input-field
  class="custom-input-field"
  style="width: 300px;"
  value="{{ email }}"
  bind:input="handleEmailInput"
  placeholder="请输入邮箱"
/>
```

## 可访问性

- 输入框标题应简洁明了，不超过 4 个汉字
- 占位符应清晰说明输入内容
- 错误提示应准确描述问题
- 支持触摸反馈

## 小程序兼容性

- 微信小程序基础库 2.20.0+
- 支持所有主流机型（iOS/Android）

## 版本历史

- v1.0.0 (2026-02-27): 初始版本，基于设计稿创建
