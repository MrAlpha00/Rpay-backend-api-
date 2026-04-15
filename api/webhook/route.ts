import { NextRequest } from 'next/server';
import {
  verifyWebhookSignature,
  validateWebhookPayload,
  ValidationError,
  sendSuccess,
  sendValidationError,
  sendUnauthorized,
  sendInternalError,
  logger,
  generateRequestId,
} from '../../lib/index.js';
import type { RazorpayWebhookEvent } from '../../lib/types.js';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

interface WebhookHandler {
  event: string;
  handler: (payload: RazorpayWebhookEvent, requestId: string) => Promise<void>;
}

const webhookHandlers: WebhookHandler[] = [
  {
    event: 'payment.captured',
    handler: handlePaymentCaptured,
  },
  {
    event: 'payment.failed',
    handler: handlePaymentFailed,
  },
  {
    event: 'order.paid',
    handler: handleOrderPaid,
  },
  {
    event: 'payment.refunded',
    handler: handlePaymentRefunded,
  },
];

async function handlePaymentCaptured(
  event: RazorpayWebhookEvent,
  requestId: string
): Promise<void> {
  const payment = event.payload?.payment?.entity;
  
  logger.payment('CAPTURED', {
    orderId: payment?.order_id,
    paymentId: payment?.id,
    amount: payment?.amount,
    source: payment?.notes?.source,
    product: payment?.notes?.product,
  });

  console.log(`[${requestId}] Payment captured:`, {
    paymentId: payment?.id,
    orderId: payment?.order_id,
    amount: payment?.amount,
    currency: payment?.currency,
  });

  await handlePaymentSuccess(
    payment?.id || '',
    payment?.order_id || '',
    payment?.amount || 0,
    {
      method: payment?.method,
      source: payment?.notes?.source,
      product: payment?.notes?.product,
    }
  );
}

async function handlePaymentFailed(
  event: RazorpayWebhookEvent,
  requestId: string
): Promise<void> {
  const payment = event.payload?.payment?.entity;

  logger.payment('FAILED', {
    orderId: payment?.order_id,
    paymentId: payment?.id,
    amount: payment?.amount,
    errorCode: payment?.error_code,
    errorDescription: payment?.error_description,
  });

  console.log(`[${requestId}] Payment failed:`, {
    paymentId: payment?.id,
    orderId: payment?.order_id,
    errorCode: payment?.error_code,
    errorDescription: payment?.error_description,
  });

  await handlePaymentFailure(
    payment?.id || '',
    payment?.order_id || '',
    payment?.error_code || 'UNKNOWN',
    payment?.error_description || 'Payment failed'
  );
}

async function handleOrderPaid(
  event: RazorpayWebhookEvent,
  requestId: string
): Promise<void> {
  const order = event.payload?.order?.entity;

  logger.payment('ORDER_PAID', {
    orderId: order?.id,
    amount: order?.amount,
    source: order?.notes?.source,
    product: order?.notes?.product,
  });

  console.log(`[${requestId}] Order paid:`, {
    orderId: order?.id,
    amount: order?.amount,
    status: order?.status,
  });

  await handleOrderComplete(
    order?.id || '',
    order?.amount || 0,
    {
      source: order?.notes?.source,
      product: order?.notes?.product,
      userId: order?.notes?.userId,
    }
  );
}

async function handlePaymentRefunded(
  event: RazorpayWebhookEvent,
  requestId: string
): Promise<void> {
  const payment = event.payload?.payment?.entity;

  logger.payment('REFUNDED', {
    orderId: payment?.order_id,
    paymentId: payment?.id,
    amountRefunded: payment?.amount_refunded,
    source: payment?.notes?.source,
  });

  console.log(`[${requestId}] Payment refunded:`, {
    paymentId: payment?.id,
    orderId: payment?.order_id,
    amountRefunded: payment?.amount_refunded,
  });

  await handleRefund(payment?.id || '', payment?.order_id || '');
}

async function handlePaymentSuccess(
  paymentId: string,
  orderId: string,
  amount: number,
  metadata: { method?: string | null; source?: string; product?: string }
): Promise<void> {
  console.log('[DB Integration Point] Payment success:', {
    paymentId,
    orderId,
    amount,
    ...metadata,
  });

  // TODO: Integrate with your database
  // await db.payments.update({
  //   where: { razorpayPaymentId: paymentId },
  //   data: { status: 'captured', capturedAt: new Date() }
  // });
}

async function handlePaymentFailure(
  paymentId: string,
  orderId: string,
  errorCode: string,
  errorDescription: string
): Promise<void> {
  console.log('[DB Integration Point] Payment failure:', {
    paymentId,
    orderId,
    errorCode,
    errorDescription,
  });

  // TODO: Integrate with your database
  // await db.payments.update({
  //   where: { razorpayPaymentId: paymentId },
  //   data: { status: 'failed', errorCode, errorDescription }
  // });
  // await db.orders.update({
  //   where: { razorpayOrderId: orderId },
  //   data: { status: 'failed' }
  // });
}

async function handleOrderComplete(
  orderId: string,
  amount: number,
  metadata: { source?: string; product?: string; userId?: string }
): Promise<void> {
  console.log('[DB Integration Point] Order complete:', {
    orderId,
    amount,
    ...metadata,
  });

  // TODO: Integrate with your database
  // await db.orders.update({
  //   where: { razorpayOrderId: orderId },
  //   data: { status: 'paid', paidAt: new Date() }
  // });
  // await sendConfirmationEmail(metadata.userId, orderId);
}

async function handleRefund(
  paymentId: string,
  orderId: string
): Promise<void> {
  console.log('[DB Integration Point] Payment refunded:', {
    paymentId,
    orderId,
  });

  // TODO: Integrate with your database
  // await db.payments.update({
  //   where: { razorpayPaymentId: paymentId },
  //   data: { refundStatus: 'full' }
  // });
}

export async function POST(request: NextRequest): Promise<Response> {
  const requestId = generateRequestId();

  logger.info(`[${requestId}] Webhook received`);

  if (!RAZORPAY_WEBHOOK_SECRET) {
    logger.error(`[${requestId}] RAZORPAY_WEBHOOK_SECRET not configured`);
    return sendInternalError('Webhook not configured', requestId);
  }

  const signature = request.headers.get('x-razorpay-signature');

  if (!signature) {
    logger.warn(`[${requestId}] No signature in webhook request`);
    return sendUnauthorized('Missing webhook signature', requestId);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch (error) {
    logger.error(`[${requestId}] Failed to read webhook body`, { error });
    return sendValidationError('Invalid webhook body', { body: 'Failed to read body' }, requestId);
  }

  const isValidSignature = verifyWebhookSignature(rawBody, signature, RAZORPAY_WEBHOOK_SECRET);

  if (!isValidSignature) {
    logger.warn(`[${requestId}] Invalid webhook signature`);
    return sendUnauthorized('Invalid webhook signature', requestId);
  }

  logger.info(`[${requestId}] Webhook signature verified`);

  let webhookData: RazorpayWebhookEvent;
  try {
    webhookData = JSON.parse(rawBody) as RazorpayWebhookEvent;
  } catch {
    logger.error(`[${requestId}] Invalid JSON in webhook`);
    return sendValidationError('Invalid JSON payload', { body: 'Invalid JSON' }, requestId);
  }

  const { event } = webhookData;

  logger.webhook(event, webhookData.payload, true, requestId);

  const handler = webhookHandlers.find((h) => h.event === event);

  if (!handler) {
    logger.info(`[${requestId}] No handler for event: ${event}`);
    return sendSuccess({ received: true, event, handled: false }, 200, requestId);
  }

  try {
    await handler.handler(webhookData, requestId);
    logger.info(`[${requestId}] Webhook processed successfully`, { event });
    return sendSuccess({ received: true, event, handled: true }, 200, requestId);
  } catch (error) {
    logger.error(`[${requestId}] Webhook handler error`, {
      event,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return sendInternalError('Webhook processing failed', requestId);
  }
}
