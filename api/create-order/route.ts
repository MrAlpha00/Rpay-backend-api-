import razorpay, { isRazorpayConfigured } from '../../lib/razorpay.js';
import {
  validateCreateOrderInput,
  ValidationError,
  sendError,
  sendSuccess,
  sendValidationError,
  sendInternalError,
  getCorsHeaders,
  handleCorsPreflight,
  logger,
  generateRequestId,
  measureDuration,
  ipRateLimiter,
} from '../../lib/index.js';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function OPTIONS(request: Request): Promise<Response> {
  return handleCorsPreflight(request);
}

export async function POST(request: Request): Promise<Response> {
  const requestId = generateRequestId();

  logger.info(`[${requestId}] Create order request received`);

  const rateLimitResult = ipRateLimiter(request);
  if (!rateLimitResult.allowed && rateLimitResult.response) {
    logger.warn(`[${requestId}] Rate limit exceeded`, { ip: 'redacted' });
    return rateLimitResult.response;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    logger.error(`[${requestId}] Failed to parse request body`, { error });
    return sendValidationError(
      'Invalid JSON in request body',
      { body: 'Request body must be valid JSON' },
      requestId
    );
  }

  let validatedInput;
  try {
    validatedInput = validateCreateOrderInput(body);
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.warn(`[${requestId}] Validation failed`, { errors: error.errors });
      return sendValidationError(error.message, error.errors, requestId);
    }
    throw error;
  }

  if (!isRazorpayConfigured()) {
    logger.error(`[${requestId}] Razorpay not configured`);
    return sendInternalError('Payment service not configured', requestId);
  }

  const {
    amount,
    currency,
    site,
    source,
    product,
    userId,
    metadata,
    receipt,
    partialPayment,
    notes,
  } = validatedInput;

  const orderNotes: Record<string, string> = {
    ...(site && { site }),
    ...(source && { source }),
    ...(product && { product }),
    ...(userId && { userId }),
    ...(Object.keys(metadata || {}).reduce((acc, key) => {
      if (metadata && key) {
        acc[key] = metadata[key];
      }
      return acc;
    }, {} as Record<string, string>)),
    ...(notes && { ...notes }),
  };

  const amountInPaise = Math.round(amount);

  const orderPayload: {
    amount: number;
    currency: string;
    receipt?: string;
    notes: Record<string, string>;
    partial_payment?: boolean;
  } = {
    amount: amountInPaise,
    currency: currency || 'INR',
    receipt: receipt || `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    notes: orderNotes,
  };

  if (partialPayment) {
    orderPayload.partial_payment = true;
  }

  logger.info(`[${requestId}] Creating Razorpay order`, {
    site,
    source,
    amount: amountInPaise,
    currency,
    product,
  });

  try {
    const { result, duration } = await measureDuration(async () => {
      return razorpay.orders.create(orderPayload);
    });

    const order = await result;

    logger.info(`[${requestId}] Order created successfully`, {
      site,
      source,
      orderId: order.id,
      amount: order.amount,
      duration,
    });

    const responseData = {
      orderId: order.id,
      amount: order.amount,
      amountDue: order.amount_due,
      currency: order.currency,
      status: order.status,
      receipt: order.receipt,
      createdAt: order.created_at,
      notes: order.notes,
      keyId: RAZORPAY_KEY_ID,
    };

    const response = sendSuccess(responseData, 201, requestId);

    const corsHeaders = getCorsHeaders(request);
    const newHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders)) {
      newHeaders.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`[${requestId}] Failed to create order`, {
      site,
      source,
      error: errorMessage,
    });

    const razorpayError = (error as { error?: { code?: string; description?: string } })?.error;
    
    if (razorpayError?.code) {
      return sendError(
        razorpayError.code,
        razorpayError.description || 'Razorpay error',
        402,
        undefined,
        requestId
      );
    }

    return sendInternalError('Failed to create order', requestId);
  }
}
