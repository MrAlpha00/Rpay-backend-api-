interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitStore {
  [key: string]: RateLimitEntry;
}

const store: RateLimitStore = {};

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

function cleanup(): void {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  }
}

setInterval(cleanup, WINDOW_MS);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS
): RateLimitResult {
  const now = Date.now();
  const entry = store[identifier];

  if (!entry || entry.resetAt < now) {
    store[identifier] = {
      count: 1,
      resetAt: now + windowMs,
    };
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
      limit: maxRequests,
    };
  }

  entry.count++;

  if (entry.count > maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      limit: maxRequests,
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
    limit: maxRequests,
  };
}

export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetAt.toString(),
  };
}

export function createRateLimitMiddleware(
  getIdentifier: (request: Request) => string,
  maxRequests?: number,
  windowMs?: number
) {
  return (request: Request): { allowed: boolean; response?: Response; headers: Record<string, string> } => {
    const identifier = getIdentifier(request);
    const result = checkRateLimit(identifier, maxRequests, windowMs);
    const headers = getRateLimitHeaders(result);

    if (!result.allowed) {
      return {
        allowed: false,
        response: new Response(
          JSON.stringify({
            success: false,
            error: {
              code: 'RATE_LIMITED',
              message: 'Too many requests. Please try again later.',
              details: {
                retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
              },
            },
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
              ...headers,
            },
          }
        ),
        headers,
      };
    }

    return { allowed: true, headers };
  };
}

export const ipRateLimiter = createRateLimitMiddleware((request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return `ip:${ip}`;
});

export const keyRateLimiter = createRateLimitMiddleware((request: Request) => {
  const key = request.headers.get('x-api-key') || 'anonymous';
  return `key:${key}`;
});
