type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  component: string;
  action: string;
  metadata?: Record<string, unknown>;
}

interface LogEntry extends LogContext {
  timestamp: string;
  level: LogLevel;
  message: string;
}

const formatLog = (entry: LogEntry): string => {
  return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.component}:${entry.action}`;
};

export const logger = {
  log: (level: LogLevel, message: string, context: LogContext) => {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      ...context,
    };

    const formattedMessage = formatLog(logEntry);

    if (level === 'error') {
      console.error(formattedMessage, logEntry);
      return;
    }

    if (level === 'warn') {
      console.warn(formattedMessage, logEntry);
      return;
    }

    console.log(formattedMessage, logEntry);
  },

  info: (message: string, context: LogContext) => logger.log('info', message, context),

  warn: (message: string, context: LogContext) => logger.log('warn', message, context),

  error: (message: string, context: LogContext) => logger.log('error', message, context),

  debug: (message: string, context: LogContext) => logger.log('debug', message, context),
};
