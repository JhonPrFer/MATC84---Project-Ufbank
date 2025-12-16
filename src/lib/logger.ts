type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogContext {
  component?: string
  action?: string
  metadata?: Record<string, unknown>
}

const formatMessage = (level: LogLevel, message: string, context?: LogContext): string => {
  const timestamp = new Date().toISOString()
  const contextStr = context ? ` | ${JSON.stringify(context)}` : ''
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
}

export const logger = {
  info: (message: string, context?: LogContext) => {
    console.log(formatMessage('info', message, context))
  },
  warn: (message: string, context?: LogContext) => {
    console.warn(formatMessage('warn', message, context))
  },
  error: (message: string, context?: LogContext) => {
    console.error(formatMessage('error', message, context))
  },
  debug: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('debug', message, context))
    }
  },
}
