# 微信小程序登录应用

## 项目概述
基于微信小程序原生框架实现的企业级登录应用，支持多端联调。

## 技术栈
- **语言**: JavaScript + WXML + WXSS
- **UI 框架**: 微信小程序原生组件
- **最低基础库版本**: 2.20.0
- **架构模式**: MVP (Model-View-Presenter)
- **开发工具**: 微信开发者工具

## 功能特性
- 用户登录（用户名/密码）
- 表单验证
- 加载状态提示
- 错误处理
- Mock 数据联调支持

## 项目结构
```
miniprogram-login-app/
├── app.js                             # 应用入口
├── app.json                           # 全局配置
├── app.wxss                           # 全局样式
├── sitemap.json                       # 站点地图
├── project.config.json                # 项目配置
├── pages/                             # 页面目录
│   ├── index/                         # 首页
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   ├── index.js
│   │   └── index.json
│   └── login/                         # 登录页面
│       ├── login.wxml
│       ├── login.wxss
│       ├── login.js
│       └── login.json
├── components/                        # 组件目录
│   ├── login-button/                  # 登录按钮组件
│   │   ├── login-button.wxml
│   │   ├── login-button.wxss
│   │   ├── login-button.js
│   │   └── login-button.json
│   ├── login-input/                   # 输入框组件
│   │   ├── login-input.wxml
│   │   ├── login-input.wxss
│   │   ├── login-input.js
│   │   └── login-input.json
│   └── loading-view/                  # 加载提示组件
│       ├── loading-view.wxml
│       ├── loading-view.wxss
│       ├── loading-view.js
│       └── loading-view.json
├── services/                          # 服务层
│   ├── api.js                         # API 服务（支持 Mock）
│   └── request.js                     # 网络请求封装
├── models/                            # 数据模型
│   ├── login-request.js               # 登录请求模型
│   └── login-response.js              # 登录响应模型
├── utils/                             # 工具函数
│   ├── validator.js                   # 表单验证
│   └── storage.js                     # 本地存储
└── assets/                            # 资源文件
    └── images/                        # 图片资源
```

## 开发说明
- 使用微信开发者工具打开项目
- 点击"编译"按钮进行预览
- 点击"真机调试"进行真机测试

## 组件映射
- 通用按钮 -> 小程序 `<button>`
- 通用输入框 -> 小程序 `<input>`
- 通用图片 -> 小程序 `<image>`

## 生成说明
本项目由自动化工作流生成，基于以下输入：
- 需求文档：GitHub Issue
- 设计稿：MasterGo（通过 Magic MCP 集成）
- API 定义：Postman Collection
