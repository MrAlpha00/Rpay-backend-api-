# Razorpay Backend API

Production-ready Razorpay backend API for Vercel serverless functions. Supports multiple websites using a single Razorpay account through multi-website tracking.

## Features

- **Multi-Website Support**: Track payments across multiple websites using `site`/`source` fields
- **Serverless Ready**: Optimized for Vercel serverless functions
- **Secure**: Signature verification, CORS configuration, rate limiting
- **Structured Logging**: Easy debugging with request tracking
- **TypeScript**: Full type safety with ES modules

## API Endpoints

### POST `/api/create-order`

Create a new Razorpay order.

**Request Body:**
```json
{
  "amount": 29900,
  "currency": "INR",
  "site": "course-site",
  "product": "react-course",
  "userId": "user_123",
  "metadata": {
    "courseId": "react-101"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_XXXXXXXXXXXX",
    "amount": 29900,
    "amountDue": 29900,
    "currency": "INR",
    "status": "created",
    "receipt": "rcpt_xxx",
    "createdAt": 1699999999,
    "notes": {
      "site": "course-site",
      "product": "react-course"
    },
    "keyId": "rzp_test_XXXXXX"
  },
  "requestId": "req_xxx"
}
```

### POST `/api/verify-payment`

Verify payment signature from frontend.

**Request Body:**
```json
{
  "razorpayOrderId": "order_XXXXXXXXXXXX",
  "razorpayPaymentId": "pay_XXXXXXXXXXXX",
  "razorpaySignature": "XXXXXXXXXXXXXXXXXX"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "orderId": "order_XXXXXXXXXXXX",
    "paymentId": "pay_XXXXXXXXXXXX",
    "message": "Payment verified successfully"
  }
}
```

### POST `/api/webhook`

Handle Razorpay webhook events.

**Handled Events:**
- `payment.captured` - Payment successful
- `payment.failed` - Payment failed
- `order.paid` - Order fully paid
- `payment.refunded` - Payment refunded

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rpay-backend-api
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables:
   - Get your `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
   - Generate `RAZORPAY_WEBHOOK_SECRET` in Dashboard > Webhooks

5. Run locally:
```bash
npm run dev
```

## Deployment

### Deploy to Vercel

```bash
npm run deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Configure Environment Variables

In Vercel dashboard, add the following environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `RAZORPAY_KEY_ID` | Yes | Your Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | Yes | Your Razorpay Key Secret |
| `RAZORPAY_WEBHOOK_SECRET` | Yes | Webhook signature secret |
| `ALLOWED_ORIGINS` | No | Comma-separated frontend URLs |

### Configure Webhook in Razorpay

1. Go to Dashboard > Webhooks
2. Add new webhook
3. URL: `https://your-domain.vercel.app/api/webhook`
4. Select events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
   - `payment.refunded`
5. Copy the webhook secret to `RAZORPAY_WEBHOOK_SECRET`

## Frontend Integration Examples

### React/Vue/Svelte

```javascript
const RAZORPAY_KEY_ID = 'rzp_test_XXXXXX';
const API_BASE = 'https://your-api.vercel.app';

async function createOrderAndPay() {
  // 1. Create order on backend
  const orderResponse = await fetch(`${API_BASE}/api/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 29900,
      currency: 'INR',
      site: 'my-website',
      product: 'premium-course',
      userId: currentUser.id,
    }),
  });

  const { data: order } = await orderResponse.json();

  // 2. Open Razorpay checkout
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Your Company',
    description: 'Premium Course',
    order_id: order.orderId,
    prefill: {
      name: 'Customer Name',
      email: 'customer@example.com',
      contact: '9999999999',
    },
    notes: order.notes,
    handler: async function (response) {
      // 3. Verify payment on backend
      const verifyResponse = await fetch(`${API_BASE}/api/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      });

      const { success } = await verifyResponse.json();
      
      if (success) {
        alert('Payment successful!');
      } else {
        alert('Payment verification failed');
      }
    },
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function (response) {
    console.error('Payment failed:', response.error);
    alert(`Payment failed: ${response.error.description}`);
  });

  rzp.open();
}
```

### HTML/JS (Vanilla)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Pay with Razorpay</title>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>
  <button onclick="pay()">Pay ₹299</button>

  <script>
    const API_BASE = 'https://your-api.vercel.app';
    const RAZORPAY_KEY_ID = 'rzp_test_XXXXXX';

    async function pay() {
      // Create order
      const orderRes = await fetch(`${API_BASE}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 29900,
          site: 'my-site',
          product: 'item-1'
        })
      });
      
      const { data: order } = await orderRes.json();

      // Open checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'My Business',
        order_id: order.orderId,
        handler: async (response) => {
          // Verify payment
          await fetch(`${API_BASE}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
          });
          alert('Payment successful!');
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }
  </script>
</body>
</html>
```

## Project Structure

```
rpay-backend-api/
├── api/
│   ├── create-order/
│   │   └── route.ts       # Create Razorpay order
│   ├── verify-payment/
│   │   └── route.ts       # Verify payment signature
│   └── webhook/
│       └── route.ts       # Handle webhook events
├── lib/
│   ├── razorpay.ts        # Razorpay client instance
│   ├── signature.ts       # Signature verification
│   ├── cors.ts            # CORS headers
│   ├── logging.ts         # Structured logging
│   ├── validation.ts      # Input validation
│   ├── response.ts       # API response helpers
│   ├── rateLimit.ts       # Rate limiting
│   ├── types.ts           # TypeScript types
│   └── index.ts           # Exports
├── package.json
├── tsconfig.json
├── vercel.json
├── .env.example
└── README.md
```

## Security

- **Signature Verification**: All payments and webhooks are cryptographically verified
- **CORS Protection**: Configurable allowed origins
- **Rate Limiting**: Built-in rate limiting per IP
- **No Secrets in Responses**: API keys never exposed to frontend
- **Input Validation**: All inputs validated before processing

## Multi-Website Tracking

The API automatically adds tracking information to Razorpay orders:

```javascript
// Request
{
  "amount": 29900,
  "site": "course-website",
  "product": "react-course",
  "userId": "user_123"
}

// Creates Razorpay order with notes:
{
  "notes": {
    "site": "course-website",
    "product": "react-course",
    "userId": "user_123"
  }
}
```

This allows you to:
- Track revenue by website in Razorpay Dashboard
- Filter payments by source in webhooks
- Maintain separate analytics per website

## Database Integration Points

Webhook handlers include integration points marked with `[DB Integration Point]`. Uncomment and implement your database logic:

```typescript
// In webhook/route.ts
async function handlePaymentCaptured(...) {
  // TODO: Integrate with your database
  await db.payments.update({
    where: { razorpayPaymentId: paymentId },
    data: { status: 'captured', capturedAt: new Date() }
  });
}
```

## License

MIT
