export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  created_at: number;
  notes: Record<string, string>;
}

export interface RazorpayPayment {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: string | null;
  international: boolean;
  method: string | null;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string | null;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: Record<string, string>;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  created_at: number;
}

export interface RazorpayWebhookEvent {
  event: string;
  payload: {
    payment?: {
      entity: RazorpayPayment;
    };
    order?: {
      entity: RazorpayOrder;
    };
  };
}

export interface OrderNotes {
  site?: string;
  source?: string;
  product?: string;
  userId?: string;
  [key: string]: string | undefined;
}

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export type PaymentStatus = 
  | 'created'
  | 'attempted'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type WebhookEventType =
  | 'payment.captured'
  | 'payment.failed'
  | 'payment.refunded'
  | 'order.paid'
  | 'subscription.activated'
  | 'subscription.cancelled';
