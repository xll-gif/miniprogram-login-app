// 登录 API 服务

// ===== 数据模型 =====

/**
 * 登录请求参数
 */
interface LoginRequest {
  email: string
  password: string
}

/**
 * 登录响应数据
 */
interface LoginResponse {
  token: string
  refreshToken: string
  userId: string
  email: string
  nickname: string
  avatar: string
  expiresIn: number
}

/**
 * API 响应格式
 */
interface APIResponse<T> {
  code: number
  message: string
  data?: T
}

/**
 * 登录错误类型
 */
enum LoginErrorType {
  INVALID_EMAIL = 'INVALID_EMAIL',
  PASSWORD_TOO_SHORT = 'PASSWORD_TOO_SHORT',
  PASSWORD_TOO_LONG = 'PASSWORD_TOO_LONG',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR'
}

/**
 * 登录错误信息
 */
const LoginErrorMessages: Record<LoginErrorType, string> = {
  [LoginErrorType.INVALID_EMAIL]: '请输入有效的邮箱地址',
  [LoginErrorType.PASSWORD_TOO_SHORT]: '密码至少需要 6 个字符',
  [LoginErrorType.PASSWORD_TOO_LONG]: '密码不能超过 20 个字符',
  [LoginErrorType.INVALID_CREDENTIALS]: '邮箱或密码错误，请重试',
  [LoginErrorType.ACCOUNT_LOCKED]: '账号已被锁定，请联系客服',
  [LoginErrorType.NETWORK_ERROR]: '网络连接失败，请检查网络设置',
  [LoginErrorType.SERVER_ERROR]: '服务器繁忙，请稍后再试'
}

// ===== Mock 用户数据 =====

interface MockUser {
  email: string
  password: string
  userId: string
  nickname: string
  avatar: string
}

// ===== Mock 登录服务 =====

class MockLoginService {
  private static readonly MOCK_DELAY = 1000
  private static readonly mockUsers: MockUser[] = [
    {
      email: 'test@example.com',
      password: 'password123',
      userId: 'MOCK_USER_001',
      nickname: '测试用户',
      avatar: 'https://via.placeholder.com/100'
    },
    {
      email: 'admin@example.com',
      password: 'admin123',
      userId: 'MOCK_USER_002',
      nickname: '管理员',
      avatar: 'https://via.placeholder.com/100'
    }
  ]

  /**
   * 用户登录
   * @param request 登录请求参数
   * @returns Promise<APIResponse<LoginResponse>>
   */
  async login(request: LoginRequest): Promise<APIResponse<LoginResponse>> {
    // 模拟网络延迟
    await new Promise<void>(resolve => setTimeout(resolve, MockLoginService.MOCK_DELAY))

    // 查找用户
    const user = MockLoginService.mockUsers.find(
      u => u.email === request.email && u.password === request.password
    )

    if (user) {
      // 登录成功
      const response: LoginResponse = {
        token: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
        userId: user.userId,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        expiresIn: 7200
      }

      return {
        code: 200,
        message: '登录成功',
        data: response
      }
    } else {
      // 登录失败
      return {
        code: 401,
        message: '邮箱或密码错误',
        data: undefined
      }
    }
  }

  /**
   * 验证邮箱格式
   * @param email 邮箱地址
   * @returns 是否有效
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/
    return emailRegex.test(email)
  }

  /**
   * 验证密码长度
   * @param password 密码
   * @returns 验证结果（valid: 是否有效, error: 错误信息）
   */
  validatePassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 6) {
      return { valid: false, error: LoginErrorMessages[LoginErrorType.PASSWORD_TOO_SHORT] }
    }
    if (password.length > 20) {
      return { valid: false, error: LoginErrorMessages[LoginErrorType.PASSWORD_TOO_LONG] }
    }
    return { valid: true }
  }
}

// 导出
module.exports = {
  MockLoginService,
  LoginErrorType,
  LoginErrorMessages
}
