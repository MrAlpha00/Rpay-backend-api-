export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  requestId?: string;
}

export function createSuccessResponse<T>(
  data: T,
  requestId?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    requestId,
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, string>,
  requestId?: string
): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    requestId,
  };
}

export function sendSuccess<T>(
  data: T,
  statusCode: number = 200,
  requestId?: string
): Response {
  return new Response(JSON.stringify(createSuccessResponse(data, requestId)), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function sendError(
  code: string,
  message: string,
  statusCode: number = 400,
  details?: Record<string, string>,
  requestId?: string
): Response {
  return new Response(
    JSON.stringify(createErrorResponse(code, message, details, requestId)),
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export function sendNoContent(): Response {
  return new Response(null, { status: 204 });
}

export function sendUnauthorized(message: string = 'Unauthorized', requestId?: string): Response {
  return sendError('UNAUTHORIZED', message, 401, undefined, requestId);
}

export function sendForbidden(message: string = 'Forbidden', requestId?: string): Response {
  return sendError('FORBIDDEN', message, 403, undefined, requestId);
}

export function sendNotFound(message: string = 'Not Found', requestId?: string): Response {
  return sendError('NOT_FOUND', message, 404, undefined, requestId);
}

export function sendInternalError(
  message: string = 'Internal Server Error',
  requestId?: string
): Response {
  return sendError('INTERNAL_ERROR', message, 500, undefined, requestId);
}

export function sendValidationError(
  message: string,
  details: Record<string, string>,
  requestId?: string
): Response {
  return sendError('VALIDATION_ERROR', message, 400, details, requestId);
}

export function sendPaymentError(
  message: string,
  razorpayError?: string,
  requestId?: string
): Response {
  return sendError(
    'PAYMENT_ERROR',
    message,
    402,
    razorpayError ? { razorpay: razorpayError } : undefined,
    requestId
  );
}
