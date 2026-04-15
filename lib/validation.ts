export class ValidationError extends Error {
  public readonly statusCode: number;
  public readonly errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string> = {}) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.errors = errors;
  }
}

export class AuthenticationError extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

export class ForbiddenError extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class NotFoundError extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class PaymentError extends Error {
  public readonly statusCode: number;
  public readonly razorpayError?: string;

  constructor(message: string, razorpayError?: string) {
    super(message);
    this.name = 'PaymentError';
    this.statusCode = 402;
    this.razorpayError = razorpayError;
  }
}

export interface CreateOrderInput {
  amount: number;
  currency?: string;
  site?: string;
  source?: string;
  product?: string;
  userId?: string;
  metadata?: Record<string, string>;
  receipt?: string;
  partialPayment?: boolean;
  notes?: Record<string, string>;
}

export interface VerifyPaymentInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface WebhookPayload {
  event: string;
  payload: Record<string, unknown>;
}

const CURRENCY_CODES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'];
const AMOUNT_LIMITS = {
  min: 100,
  max: 9999999999,
};

export function validateCreateOrderInput(body: unknown): CreateOrderInput {
  if (!body || typeof body !== 'object') {
    throw new ValidationError('Request body is required', { body: 'Invalid or missing body' });
  }

  const data = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  if (data.amount === undefined || data.amount === null) {
    errors.amount = 'Amount is required';
  } else if (typeof data.amount !== 'number') {
    errors.amount = 'Amount must be a number';
  } else if (data.amount < AMOUNT_LIMITS.min) {
    errors.amount = `Amount must be at least ${AMOUNT_LIMITS.min} paise (₹1)`;
  } else if (data.amount > AMOUNT_LIMITS.max) {
    errors.amount = `Amount exceeds maximum limit of ${AMOUNT_LIMITS.max} paise`;
  }

  if (data.currency !== undefined && typeof data.currency === 'string') {
    const currency = data.currency.toUpperCase();
    if (!CURRENCY_CODES.includes(currency)) {
      errors.currency = `Invalid currency. Supported: ${CURRENCY_CODES.join(', ')}`;
    }
  }

  const site = data.site as string | undefined;
  const source = data.source as string | undefined;
  
  if (!site && !source) {
    errors.site = 'Either site or source is required for multi-website tracking';
  }

  if (data.metadata !== undefined) {
    if (typeof data.metadata !== 'object' || data.metadata === null || Array.isArray(data.metadata)) {
      errors.metadata = 'Metadata must be an object';
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }

  return {
    amount: data.amount as number,
    currency: (data.currency as string)?.toUpperCase() || 'INR',
    site: site || source,
    source: source || site,
    product: data.product as string | undefined,
    userId: data.userId as string | undefined,
    metadata: data.metadata as Record<string, string> | undefined,
    receipt: data.receipt as string | undefined,
    partialPayment: data.partialPayment as boolean | undefined,
    notes: data.notes as Record<string, string> | undefined,
  };
}

export function validateVerifyPaymentInput(body: unknown): VerifyPaymentInput {
  if (!body || typeof body !== 'object') {
    throw new ValidationError('Request body is required', { body: 'Invalid or missing body' });
  }

  const data = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  if (!data.razorpayOrderId || typeof data.razorpayOrderId !== 'string') {
    errors.razorpayOrderId = 'razorpayOrderId is required';
  }

  if (!data.razorpayPaymentId || typeof data.razorpayPaymentId !== 'string') {
    errors.razorpayPaymentId = 'razorpayPaymentId is required';
  }

  if (!data.razorpaySignature || typeof data.razorpaySignature !== 'string') {
    errors.razorpaySignature = 'razorpaySignature is required';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }

  return {
    razorpayOrderId: data.razorpayOrderId as string,
    razorpayPaymentId: data.razorpayPaymentId as string,
    razorpaySignature: data.razorpaySignature as string,
  };
}

export function validateWebhookPayload(body: unknown): WebhookPayload {
  if (!body || typeof body !== 'object') {
    throw new ValidationError('Invalid webhook payload', { body: 'Invalid or missing body' });
  }

  const data = body as Record<string, unknown>;

  if (!data.event || typeof data.event !== 'string') {
    throw new ValidationError('Webhook event is required', { event: 'Missing or invalid event' });
  }

  if (!data.payload || typeof data.payload !== 'object') {
    throw new ValidationError('Webhook payload is required', { payload: 'Missing or invalid payload' });
  }

  return {
    event: data.event as string,
    payload: data.payload as Record<string, unknown>,
  };
}

export function sanitizeInput(input: unknown): unknown {
  if (typeof input === 'string') {
    return input.trim();
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (input && typeof input === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      if (typeof key === 'string') {
        sanitized[key.trim()] = sanitizeInput(value);
      }
    }
    return sanitized;
  }
  
  return input;
}
