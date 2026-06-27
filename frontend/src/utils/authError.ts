interface APIErrorLike {
  reason?: string
  message?: string
  response?: {
    data?: {
      detail?: string
      message?: string
      reason?: string
    }
  }
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  EMAIL_NOT_CONFIGURED: '邮件服务未配置，请联系管理员配置 SMTP 后重试。',
}

function extractErrorMessage(error: unknown): string {
  const err = (error || {}) as APIErrorLike
  const reason = err.reason || err.response?.data?.reason || ''
  if (reason && AUTH_ERROR_MESSAGES[reason]) {
    return AUTH_ERROR_MESSAGES[reason]
  }
  return err.response?.data?.detail || err.response?.data?.message || err.message || ''
}

export function buildAuthErrorMessage(
  error: unknown,
  options: {
    fallback: string
  }
): string {
  const { fallback } = options
  const message = extractErrorMessage(error)
  return message || fallback
}
