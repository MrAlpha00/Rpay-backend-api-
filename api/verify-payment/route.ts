import {
  verifyPaymentSignature,
  validateVerifyPaymentInput,
  ValidationError,
  sendSuccess,
  sendValidationError,
  sendForbidden,
  sendInternalError,
  getCorsHeaders,
  handleCorsPreflight,
  logger,
  generateRequestId,
  ipRateLimiter,
} from '../../lib/index.js';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function OPTIONS(request: NextRequest): Promise<Response> {
  return handleCorsPreflight(request);
}

export async function POST(request: NextRequest): Promise<Response> {
  const requestId = generateRequestId();

  logger.info(`[${requestId}] Payment verification request received`);

  const rateLimitResult = ipRateLimiter(request);
  if (!rateLimitResult.allowed && rateLimitResult.response) {
    logger.warn(`[${requestId}] Rate limit exceeded`);
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
    validatedInput = validateVerifyPaymentInput(body);
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.warn(`[${requestId}] Validation failed`, { errors: error.errors });
      return sendValidationError(error.message, error.errors, requestId);
    }
    throw error;
  }

  if (!RAZORPAY_KEY_SECRET) {
    logger.error(`[${requestId}] RAZORPAY_KEY_SECRET not configured`);
    return sendInternalError('Server configuration error', requestId);
  }

  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  } = validatedInput;

  logger.info(`[${requestId}] Verifying payment signature`, {
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
  });

  try {
    const isValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      RAZORPAY_KEY_SECRET
    );

    if (!isValid) {
      logger.warn(`[${requestId}] Payment signature verification FAILED`, {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });

      const response = sendForbidden('Invalid payment signature', requestId);

      const corsHeaders = getCorsHeaders(request);
      const newHeaders = new Headers(response.headers);
      for (const [key, value] of Object.entries(corsHeaders)) {
        newHeaders.set(key, value);
      }

      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }

    logger.info(`[${requestId}] Payment signature verified successfully`, {
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });

    logger.payment('VERIFIED', {
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      source: 'verify-payment-endpoint',
    });

    const responseData = {
      verified: true,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      message: 'Payment verified successfully',
    };

    const response = sendSuccess(responseData, 200, requestId);

    const corsHeaders = getCorsHeaders(request);
    const newHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders)) {
      newHeaders.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error) {
    logger.error(`[${requestId}] Payment verification error`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });

    return sendInternalError('Payment verification failed', requestId);
  }
}
