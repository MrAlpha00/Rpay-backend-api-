import crypto from 'crypto';

/**
 * Verify payment signature for client-side payment verification
 * This verifies that the payment details haven't been tampered with
 * 
 * @param razorpayOrderId - Order ID from Razorpay
 * @param razorpayPaymentId - Payment ID from Razorpay
 * @param razorpaySignature - Signature received from frontend
 * @param secret - Your RAZORPAY_KEY_SECRET
 */
export function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  secret: string = process.env.RAZORPAY_KEY_SECRET || ''
): boolean {
  if (!secret) {
    console.error('[Signature] ERROR: RAZORPAY_KEY_SECRET is not configured');
    return false;
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(razorpaySignature),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    console.warn('[Signature] Payment signature verification FAILED', {
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  }

  return isValid;
}

/**
 * Verify webhook signature to ensure the webhook is from Razorpay
 * 
 * @param payload - Raw request body as string
 * @param signature - X-Razorpay-Signature header value
 * @param secret - Your RAZORPAY_WEBHOOK_SECRET
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string = process.env.RAZORPAY_WEBHOOK_SECRET || ''
): boolean {
  if (!secret) {
    console.error('[Webhook] ERROR: RAZORPAY_WEBHOOK_SECRET is not configured');
    return false;
  }

  if (!signature) {
    console.warn('[Webhook] No signature provided');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    console.warn('[Webhook] Webhook signature verification FAILED');
  }

  return isValid;
}

/**
 * Generate a unique receipt ID for orders
 * Format: {prefix}-{timestamp}-{random}
 */
export function generateReceiptId(prefix: string = 'rcpt'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Hash a string using SHA256 (useful for creating idempotency keys)
 */
export function hashString(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}
