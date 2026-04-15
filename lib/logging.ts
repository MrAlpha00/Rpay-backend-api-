export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  site?: string;
  source?: string;
  orderId?: string;
  paymentId?: string;
  event?: string;
  [key: string]: unknown;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: LogContext;
  requestId?: string;
  duration?: number;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const MIN_LOG_LEVEL = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel;

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[MIN_LOG_LEVEL];
}

function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, context, requestId, duration } = entry;
  
  const parts = [
    `[${timestamp}]`,
    `[${level.toUpperCase()}]`,
    requestId ? `[${requestId}]` : null,
    message,
    Object.keys(context).length > 0 ? JSON.stringify(context) : null,
    duration !== undefined ? `(+${duration}ms)` : null,
  ].filter(Boolean);

  return parts.join(' ');
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context: LogContext = {},
  requestId?: string,
  duration?: number
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    requestId,
    duration,
  };
}

export const logger = {
  debug(message: string, context: LogContext = {}, requestId?: string): void {
    if (shouldLog('debug')) {
      const entry = createLogEntry('debug', message, context, requestId);
      console.debug(formatLogEntry(entry));
    }
  },

  info(message: string, context: LogContext = {}, requestId?: string): void {
    if (shouldLog('info')) {
      const entry = createLogEntry('info', message, context, requestId);
      console.info(formatLogEntry(entry));
    }
  },

  warn(message: string, context: LogContext = {}, requestId?: string): void {
    if (shouldLog('warn')) {
      const entry = createLogEntry('warn', message, context, requestId);
      console.warn(formatLogEntry(entry));
    }
  },

  error(message: string, context: LogContext = {}, requestId?: string): void {
    if (shouldLog('error')) {
      const entry = createLogEntry('error', message, context, requestId);
      console.error(formatLogEntry(entry));
    }
  },

  api(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context: LogContext = {},
    requestId?: string
  ): void {
    const level: LogLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    const entry = createLogEntry(
      level,
      `${method} ${path} ${statusCode}`,
      { ...context, statusCode, method, path, duration },
      requestId,
      duration
    );
    
    if (shouldLog(level)) {
      console.log(formatLogEntry(entry));
    }
  },

  payment(
    action: string,
    context: LogContext,
    requestId?: string
  ): void {
    const entry = createLogEntry(
      'info',
      `[PAYMENT] ${action}`,
      { ...context, paymentAction: action },
      requestId
    );
    console.info(formatLogEntry(entry));
  },

  webhook(
    event: string,
    payload: Record<string, unknown>,
    verified: boolean,
    requestId?: string
  ): void {
    const level: LogLevel = verified ? 'info' : 'error';
    const entry = createLogEntry(
      level,
      `[WEBHOOK] ${event} ${verified ? 'VERIFIED' : 'FAILED VERIFICATION'}`,
      { event, verified, payload },
      requestId
    );
    
    if (shouldLog(level)) {
      console.log(formatLogEntry(entry));
    }
  },
};

export function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
}

export function measureDuration<T>(
  fn: () => T | Promise<T>
): { result: T; duration: number } | Promise<{ result: T; duration: number }> {
  const start = performance.now();
  
  const result = fn();
  
  if (result instanceof Promise) {
    return result
      .then((resolved) => ({
        result: resolved,
        duration: Math.round(performance.now() - start),
      }))
      .catch((error) => {
        const duration = Math.round(performance.now() - start);
        throw { error, duration };
      }) as Promise<{ result: T; duration: number }>;
  }
  
  return {
    result,
    duration: Math.round(performance.now() - start),
  };
}
