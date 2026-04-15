import { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS || 
  'http://localhost:3000,http://localhost:3001'
).split(',').map(origin => origin.trim());

const CREDENTIALS = process.env.ALLOW_CREDENTIALS === 'true';

export interface CorsOptions {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  maxAge?: number;
  credentials?: boolean;
}

const DEFAULT_OPTIONS: Required<CorsOptions> = {
  allowedOrigins: ALLOWED_ORIGINS,
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Razorpay-Signature'],
  exposedHeaders: ['X-Request-Id'],
  maxAge: 86400,
  credentials: CREDENTIALS,
};

/**
 * Get CORS headers for a request
 */
export function getCorsHeaders(
  request: NextRequest,
  options: CorsOptions = {}
): Record<string, string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const origin = request.headers.get('origin');

  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': opts.allowedMethods.join(', '),
    'Access-Control-Allow-Headers': opts.allowedHeaders.join(', '),
    'Access-Control-Max-Age': opts.maxAge.toString(),
  };

  if (opts.exposedHeaders.length > 0) {
    headers['Access-Control-Expose-Headers'] = opts.exposedHeaders.join(', ');
  }

  if (origin && opts.allowedOrigins.includes('*')) {
    headers['Access-Control-Allow-Origin'] = '*';
  } else if (origin && opts.allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  if (opts.credentials && origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

/**
 * Handle CORS preflight requests
 */
export function handleCorsPreflight(
  request: NextRequest,
  options: CorsOptions = {}
): Response {
  const headers = getCorsHeaders(request, options);
  return new Response(null, {
    status: 204,
    headers,
  });
}

/**
 * Check if origin is allowed
 */
export function isOriginAllowed(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false;
  if (allowedOrigins.includes('*')) return true;
  return allowedOrigins.includes(origin);
}

/**
 * Add CORS headers to any Response
 */
export function withCorsHeaders(
  response: Response,
  request: NextRequest,
  options: CorsOptions = {}
): Response {
  const corsHeaders = getCorsHeaders(request, options);
  const newHeaders = new Headers(response.headers);
  
  for (const [key, value] of Object.entries(corsHeaders)) {
    newHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
