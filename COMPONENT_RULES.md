# Button 组件使用规则

## 组件说明

通用登录按钮组件，基于设计稿样式实现，使用微信小程序原生框架构建。

## 设计稿样式规范

- **背景色**: `#007AFF`（蓝色）
- **文字颜色**: `#FFFFFF`（白色）
- **圆角**: `4px`
- **宽度**: `300px`（可根据容器调整）
- **高度**: `44px`（固定）
- **文字大小**: `16px`
- **文字粗细**: `500 (Medium)`

## API 文档

### Properties

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `text` | `String` | `''` | 按钮文字（必填） |
| `variant` | `String` | `'primary'` | 按钮样式变体 |
| `width` | `String` | `''` | 按钮宽度，空字符串表示宽度自适应 |
| `fullWidth` | `Boolean` | `false` | 是否全宽填充父容器 |
| `disabled` | `Boolean` | `false` | 是否可用 |
| `height` | `String` | `'44px'` | 按钮高度（建议保持默认） |

### Events

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| `bindtap` | 点击事件 | - |

### ButtonVariant 常量

| 值 | 说明 | 背景色 | 文字颜色 | 边框 |
|---|---|---|---|---|
| `'primary'` | 主要按钮（默认） | `#007AFF` | `#FFFFFF` | 无 |
| `'secondary'` | 次要按钮 | `#FFFFFF` | `#007AFF` | `#007AFF` (1px) |
| `'danger'` | 危险按钮 | `#FF3B30` | `#FFFFFF` | 无 |

## 使用规则

### 1. 在页面中引入组件

```json
{
  "usingComponents": {
    "button": "/components/button/button"
  }
}
```

### 2. 主要操作按钮

用于主要操作，如登录、提交、确认等。

```xml
<button
  text="登录"
  width="300px"
  bind:tap="handleLogin"
/>
```

### 3. 次要操作按钮

用于次要操作，如取消、返回等。

```xml
<button
  text="取消"
  variant="secondary"
  width="300px"
  bind:tap="handleCancel"
/>
```

### 4. 危险操作按钮

用于危险操作，如退出登录、删除等。

```xml
<button
  text="退出登录"
  variant="danger"
  width="300px"
  bind:tap="handleLogout"
/>
```

### 5. 禁用状态

当按钮处于禁用状态时，自动应用禁用样式。

```xml
<button
  text="登录"
  disabled="{{ true }}"
  width="300px"
  bind:tap="handleLogin"
/>
```

### 6. 宽度设置

- **固定宽度**: 使用 `width="300px"` 设置固定宽度
- **自适应宽度**: 不设置 `width` 属性，按钮宽度自适应
- **全宽填充**: 使用 `fullWidth="{{ true }}"` 填充父容器宽度
- **建议**: 登录页面的操作按钮建议使用固定宽度 `300px`

### 7. 高度设置

- 按钮高度默认为 `44px`，符合小程序设计规范
- 除非有特殊需求，否则不建议修改高度

### 8. 事件处理

```javascript
Page({
  handleLogin() {
    // 处理登录逻辑
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });
  },
  
  handleCancel() {
    // 处理取消逻辑
    wx.navigateBack();
  },
  
  handleLogout() {
    // 处理退出逻辑
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
});
```

## 禁止事项

1. ❌ 不要使用非设计稿规范的颜色
2. ❌ 不要修改按钮高度（除非有特殊需求）
3. ❌ 不要在按钮文字中使用特殊符号（如图标）
4. ❌ 不要嵌套按钮
5. ❌ 不要同时使用 `variant="secondary"` 和 `variant="danger"`
6. ❌ 不要使用 `button` 组件的默认样式（组件已覆盖）

## 布局建议

### 垂直布局

```xml
<view style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
  <button
    text="登录"
    width="300px"
    bind:tap="handleLogin"
  />
  
  <button
    text="注册"
    variant="secondary"
    width="300px"
    bind:tap="handleRegister"
  />
</view>
```

### 水平布局

```xml
<view style="display: flex; flex-direction: row; gap: 16px; padding: 16px;">
  <button
    text="取消"
    variant="secondary"
    style="flex: 1;"
    bind:tap="handleCancel"
  />
  
  <button
    text="确认"
    style="flex: 1;"
    bind:tap="handleConfirm"
  />
</view>
```

## 样式自定义

组件使用内联样式和类名实现，如需自定义样式，可以通过添加额外的类名或修改 `button.wxss` 文件。

```xml
<button
  text="登录"
  class="custom-button"
  width="300px"
  bind:tap="handleLogin"
/>
```

## 可访问性

- 按钮文字应简洁明了，不超过 6 个汉字
- 避免使用纯符号或表情符号作为按钮文字
- 禁用状态应有明确的视觉反馈（半透明 + 灰色）
- 支持触摸反馈（-webkit-tap-highlight-color: transparent）

## 小程序兼容性

- 微信小程序基础库 2.20.0+
- 支持所有主流机型（iOS/Android）

## 版本历史

- v1.0.0 (2026-02-27): 初始版本，基于设计稿创建
