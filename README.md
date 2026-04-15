# 🚀 Razorpay Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Razorpay-API-blue?style=for-the-badge&logo=razorpay&logoColor=white" alt="Razorpay">
</p>

---

<div align="center">

```
██████╗ ██╗██╗  ██╗████████╗██████╗  ██████╗ ██████╗ ██████╗ ███████╗
██╔══██╗██║╚██╗██╔╝╚══██╔══╝██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔════╝
██████╔╝██║ ╚███╔╝    ██║   ██████╔╝██║   ██║██████╔╝██████╔╝███████╗
██╔═══╝ ██║ ██╔██╗    ██║   ██╔══██╗██║   ██║██╔══██╗██╔══██╗╚════██║
██║     ██║██╔╝ ██╗   ██║   ██║  ██║╚██████╔╝██████╔╝██████╔╝███████║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
```

### ⭐ Production-Ready • Serverless • Multi-Website Support • Secure ⭐

*[Live Demo](#-quick-start) • [Documentation](#-features) • [Deployment](#-deployment) • [Examples](#-frontend-integration)*

</div>

---

## ✨ What's New in v2.0

```
╔══════════════════════════════════════════════════════════════════════╗
║  🆕 Multi-Website Tracking    │  ⚡ Serverless Optimized            ║
║  🔒 Military-Grade Security   │  📊 Structured Logging             ║
║  🎯 Type-Safe API            │  🌐 CORS Configurable               ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## 🎯 Features

<details>
<summary><b>🎨 Click to expand all features</b></summary>

### Core Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔄 **Create Order** | Create Razorpay orders with multi-site tracking | ✅ |
| ✅ **Verify Payment** | Cryptographically verify payment signatures | ✅ |
| 🪝 **Webhook Handler** | Handle payment events securely | ✅ |
| 🌐 **Multi-Website** | Track payments across multiple sites | ✅ |
| 🔒 **Rate Limiting** | Built-in IP-based rate limiting | ✅ |
| 📝 **Input Validation** | Comprehensive request validation | ✅ |
| 📊 **Structured Logging** | JSON logs with request tracking | ✅ |
| 🌈 **CORS Support** | Configurable cross-origin requests | ✅ |
| ⚡ **Serverless** | Optimized for Vercel Functions | ✅ |
| 🔧 **TypeScript** | Full type safety | ✅ |

### Security Features

| Feature | Description |
|---------|-------------|
| 🛡️ **Signature Verification** | Timing-safe HMAC comparison |
| 🔐 **Webhook Auth** | X-Razorpay-Signature validation |
| 🚫 **No Secrets Exposed** | Keys never returned to frontend |
| ✅ **Input Sanitization** | All inputs validated & sanitized |
| 🔑 **Environment Variables** | Secrets managed securely |

### Developer Experience

| Feature | Description |
|---------|-------------|
| 📖 **Full Documentation** | Comprehensive README |
| 🧪 **Examples Included** | React, Vue, Vanilla JS examples |
| 🎯 **Type Definitions** | Complete TypeScript support |
| 📁 **Modular Structure** | Easy to extend & maintain |
| 🏃 **Hot Reload** | Local development with Vercel CLI |

</details>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                          RAZORPAY API                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │ HTTPS
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                     🟢 Vercel Serverless                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │
│  │   Create     │  │    Verify    │  │   Webhook    │               │
│  │   Order      │  │   Payment    │  │   Handler    │               │
│  │   API        │  │   API        │  │   API        │               │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘               │
│         │                │                │                       │
│  ┌──────┴────────────────┴────────────────┴──────┐               │
│  │              📦 lib/ utilities                   │               │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │               │
│  │  │Signature│ │  CORS  │ │Logging │ │Validate│   │               │
│  │  └────────┘ └────────┘ └────────┘ └────────┘   │               │
│  └────────────────────────────────────────────────┘               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                    │              │              │
                    ▼              ▼              ▼
         ┌────────────────┬────────────────┬────────────────┐
         │   🌐 Website   │   📱 Mobile    │   🖥️ Dashboard  │
         │   (React)      │   (React Nat)  │   (Admin)       │
         └────────────────┴────────────────┴────────────────┘
```

### Project Structure

```
rpay-backend-api/
│
├── 📁 api/                          # Serverless Functions
│   ├── 📁 create-order/
│   │   └── 📄 route.ts              # POST /api/create-order
│   ├── 📁 verify-payment/
│   │   └── 📄 route.ts              # POST /api/verify-payment
│   └── 📁 webhook/
│       └── 📄 route.ts              # POST /api/webhook
│
├── 📁 lib/                          # Core Utilities
│   ├── 📄 razorpay.ts               # Razorpay client instance
│   ├── 📄 signature.ts              # Signature verification (crypto)
│   ├── 📄 cors.ts                   # CORS headers & preflight
│   ├── 📄 logging.ts                # Structured logging system
│   ├── 📄 validation.ts              # Input validation & errors
│   ├── 📄 response.ts                # API response helpers
│   ├── 📄 rateLimit.ts               # Rate limiting middleware
│   ├── 📄 types.ts                  # TypeScript type definitions
│   └── 📄 index.ts                  # Barrel exports
│
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 vercel.json                   # Vercel deployment config
├── 📄 .env.example                  # Environment variables template
├── 📄 .eslintrc.json               # ESLint configuration
├── 📄 README.md                     # Documentation
└── 📄 .gitignore                   # Git ignore patterns
```

---

## 🔌 API Endpoints

### 📤 POST `/api/create-order`

> Create a new Razorpay order with multi-website tracking

#### Request

```http
POST /api/create-order
Content-Type: application/json

{
  "amount": 29900,              // Amount in paise (₹299.00)
  "currency": "INR",            // Currency code (optional, default: INR)
  "site": "course-platform",   // Website identifier (required)
  "product": "react-course",    // Product identifier (optional)
  "userId": "user_12345",      // User identifier (optional)
  "metadata": {                // Custom metadata (optional)
    "courseId": "react-101",
    "coupon": "SAVE20"
  }
}
```

#### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "orderId": "order_NIYiPRpG4oVDfb",
    "amount": 29900,
    "amountDue": 29900,
    "currency": "INR",
    "status": "created",
    "receipt": "rcpt_niyipr_1699999999",
    "createdAt": 1699999999,
    "notes": {
      "site": "course-platform",
      "product": "react-course",
      "userId": "user_12345"
    },
    "keyId": "rzp_test_XXXXXX"
  },
  "requestId": "req_abc123xyz"
}
```

#### Example Usage

```javascript
const response = await fetch('/api/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 29900,
    site: 'my-website',
    product: 'premium-subscription'
  })
});

const { data } = await response.json();
// data.orderId → "order_NIYiPRpG4oVDfb"
// Use this with Razorpay Checkout
```

---

### ✅ POST `/api/verify-payment`

> Verify payment signature from frontend (NEVER trust frontend alone!)

#### Request

```http
POST /api/verify-payment
Content-Type: application/json

{
  "razorpayOrderId": "order_NIYiPRpG4oVDfb",
  "razorpayPaymentId": "pay_NIYiRKmH5gRVCl",
  "razorpaySignature": "c456a3b4e7f8a9b2c1d0e9f8a7b6c5d4e3f2a1b"
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "verified": true,
    "orderId": "order_NIYiPRpG4oVDfb",
    "paymentId": "pay_NIYiRKmH5gRVCl",
    "message": "Payment verified successfully"
  }
}
```

#### Response (403 Forbidden)

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Invalid payment signature"
  },
  "requestId": "req_abc123xyz"
}
```

---

### 🪝 POST `/api/webhook`

> Handle Razorpay webhook events (payment.captured, payment.failed, etc.)

#### Supported Events

| Event | Description | Action |
|-------|-------------|--------|
| `payment.captured` | Payment successful | Update order status |
| `payment.failed` | Payment failed | Log failure, notify user |
| `order.paid` | Order fully paid | Fulfill order |
| `payment.refunded` | Payment refunded | Update refund status |

#### Request (from Razorpay)

```http
POST /api/webhook
Content-Type: application/json
X-Razorpay-Signature: <HMAC signature>

{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_NIYiRKmH5gRVCl",
        "amount": 29900,
        "currency": "INR",
        "status": "captured",
        "order_id": "order_NIYiPRpG4oVDfb",
        "method": "card",
        "card": {
          "network": "Visa",
          "last4": "1111"
        },
        "notes": {
          "site": "course-platform",
          "product": "react-course"
        }
      }
    }
  }
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "received": true,
    "event": "payment.captured",
    "handled": true
  }
}
```

---

## 💻 Frontend Integration

### React Integration

```jsx
import { useState } from 'react';
import Razorpay from 'razorpay';

const RAZORPAY_KEY_ID = 'rzp_test_XXXXXX';
const API_BASE = 'https://your-api.vercel.app';

export default function PaymentButton({ product, amount }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Step 1: Create order on backend
      const orderRes = await fetch(`${API_BASE}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,          // in paise
          site: 'my-website',      // your site identifier
          product: product.id,
          userId: currentUser.id
        })
      });

      const { data: order } = await orderRes.json();

      // Step 2: Open Razorpay checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company',
        description: product.name,
        order_id: order.orderId,
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
          contact: currentUser.phone
        },
        notes: order.notes,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          const verifyRes = await fetch(`${API_BASE}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
          });

          const { success } = await verifyRes.json();

          if (success) {
            // Payment successful - fulfill order
            await fulfillOrder(product.id);
            showSuccessMessage();
          } else {
            showError('Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => setLoading(false)
        }
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (response) => {
        showError(`Payment failed: ${response.error.description}`);
        logPaymentFailure(response.error);
      });

      rzp.open();

    } catch (error) {
      showError('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : `Pay ₹${amount / 100}`}
    </button>
  );
}
```

### Vue 3 Integration

```vue
<template>
  <button @click="pay" :disabled="loading">
    {{ loading ? 'Processing...' : `Pay ₹${amount / 100}` }}
  </button>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  amount: Number,
  product: Object
});

const loading = ref(false);

const pay = async () => {
  loading.value = true;

  try {
    // Create order
    const { data: order } = await fetch('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({
        amount: props.amount,
        site: 'my-vue-app',
        product: props.product.id
      })
    });

    // Initialize Razorpay
    const options = {
      key: 'rzp_test_XXXXXX',
      amount: order.amount,
      order_id: order.orderId,
      handler: async (response) => {
        await fetch('/api/verify-payment', {
          method: 'POST',
          body: JSON.stringify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          })
        });
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } finally {
    loading.value = false;
  }
};
</script>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout</title>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>
  <button id="pay-btn">Pay ₹299</button>

  <script>
    const API_BASE = 'https://your-api.vercel.app';
    const RAZORPAY_KEY_ID = 'rzp_test_XXXXXX';

    document.getElementById('pay-btn').addEventListener('click', async () => {
      // Create order
      const orderRes = await fetch(`${API_BASE}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 29900,
          site: 'my-website',
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
        description: 'Premium Item',
        order_id: order.orderId,
        handler: async (response) => {
          // Verify payment
          const verifyRes = await fetch(`${API_BASE}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
          });

          const { success } = await verifyRes.json();
          alert(success ? 'Payment successful!' : 'Verification failed');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        }
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (response) => {
        alert(`Error: ${response.error.description}`);
      });

      rzp.open();
    });
  </script>
</body>
</html>
```

---

## 🎨 Multi-Website Tracking

One of the most powerful features! Track payments across multiple websites using a single Razorpay account.

### How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🏢 Course Platform (site: "course-platform")                  │
│   ┌─────────────┐                                               │
│   │ React Course│ ──► amount: 29900 ──► order.notes.site        │
│   │ ₹299        │                                               │
│   └─────────────┘                                               │
│                                                                 │
│   🛒 E-Commerce (site: "ecommerce")                             │
│   ┌─────────────┐                                               │
│   │ Laptop      │ ──► amount: 59900 ──► order.notes.site       │
│   │ ₹599        │                                               │
│   └─────────────┘                                               │
│                                                                 │
│   📱 Mobile App (site: "mobile-app")                            │
│   ┌─────────────┐                                               │
│   │ Subscription│ ──► amount: 999 ──► order.notes.site         │
│   │ ₹9.99/mo    │                                               │
│   └─────────────┘                                               │
│                                                                 │
│   All payments → Same Razorpay Account → Dashboard with filters │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Request Example

```javascript
// From Course Platform
await fetch('/api/create-order', {
  method: 'POST',
  body: JSON.stringify({
    amount: 29900,
    site: 'course-platform',
    product: 'react-masterclass'
  })
});

// From E-Commerce Store
await fetch('/api/create-order', {
  method: 'POST',
  body: JSON.stringify({
    amount: 59900,
    site: 'ecommerce-store',
    product: 'laptop-ideapad'
  })
});
```

### Dashboard View

```
┌────────────────────────────────────────────────────────────────┐
│ Razorpay Dashboard                                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📊 Payment Analytics                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Total Revenue    │  course-platform  │  ecommerce-store │  │
│  │    ₹1,25,400    │      ₹89,700       │     ₹35,700      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  💳 Recent Payments                                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ pay_xxx  │  ₹299   │  course-platform │  ✅ Captured    │  │
│  │ pay_yyy  │  ₹5,999 │  ecommerce-store  │  ✅ Captured    │  │
│  │ pay_zzz  │  ₹199   │  course-platform  │  ⏳ Pending    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Features

### Signature Verification

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   FRONTEND                              BACKEND                  │
│   ────────                              ───────                  │
│                                                                 │
│   ┌──────────────┐                      ┌──────────────┐        │
│   │ Razorpay     │  razorpay_signature  │              │        │
│   │ Checkout     │─────────────────────►│ /verify-     │        │
│   │ generates    │                      │  payment     │        │
│   │ signature    │                      │              │        │
│   └──────────────┘                      └──────┬───────┘        │
│                                                │                │
│                                                ▼                │
│                                        ┌──────────────┐        │
│                                        │ HMAC-SHA256  │        │
│                                        │ verify with │        │
│                                        │ KEY_SECRET   │        │
│                                        └──────┬───────┘        │
│                                                │                │
│                               ┌────────────────┴────────────┐  │
│                               │                             │  │
│                               ▼                             ▼  │
│                         ┌─────────┐                   ┌─────────┐
│                         │ MATCH!  │                   │  FAIL   │
│                         │ ✅ 200  │                   │ ❌ 403  │
│                         └─────────┘                   └─────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Webhook Security

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   RAZORPAY                               BACKEND                  │
│   ────────                               ───────                  │
│                                                                 │
│   ┌──────────────┐                      ┌──────────────┐        │
│   │ Webhook     │   POST /webhook      │              │        │
│   │ Event       │────────────────────►│  Verify      │        │
│   │ (payment.   │   X-Razorpay-        │  HMAC-SHA256 │        │
│   │  captured)  │   Signature: xyz      │  Signature   │        │
│   └──────────────┘                      └──────┬───────┘        │
│                                                │                │
│                               ┌────────────────┴────────────┐  │
│                               │                             │  │
│                               ▼                             ▼  │
│                         ┌─────────┐                   ┌─────────┐
│                         │ VALID  │                   │ INVALID │
│                         │ Process│                   │  Reject │
│                         │ Event  │                   │  401    │
│                         └─────────┘                   └─────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Razorpay Account ([Sign up here](https://razorpay.com/))
- Vercel Account ([Sign up here](https://vercel.com/))

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/rpay-backend-api.git
cd rpay-backend-api

# Install dependencies
npm install
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
notepad .env
```

**Required Variables:**

| Variable | Where to Get |
|----------|-------------|
| `RAZORPAY_KEY_ID` | Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | Razorpay Dashboard → Settings → API Keys |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Dashboard → Webhooks → Add Webhook |

**Optional Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `ALLOWED_ORIGINS` | `localhost:3000,localhost:3001` | CORS origins |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Window size in ms |
| `LOG_LEVEL` | `info` | Log level (debug, info, warn, error) |

### Step 3: Run Locally

```bash
# Start development server
npm run dev

# Server running at http://localhost:3000
```

### Step 4: Test API

```bash
# Test create-order
curl -X POST http://localhost:3000/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 29900, "site": "test", "product": "test-item"}'
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Or Connect GitHub

```
1. Push code to GitHub
2. Go to vercel.com/dashboard
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Deploy!
```

### Configure Environment in Vercel

```
┌────────────────────────────────────────────────────────────────┐
│ Vercel Dashboard → Project → Settings → Environment Variables   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Variable              Value                                   │
│  ───────────────────   ──────────────────────────────────     │
│  RAZORPAY_KEY_ID       rzp_test_xxxxxxxxxxxx                   │
│  RAZORPAY_KEY_SECRET   xxxxxxxxxxxxxxxxxxxxxxxxxxxx             │
│  RAZORPAY_WEBHOOK_SECRET  XXXXXXXXXXXXXXXXXXXXXXXX             │
│  ALLOWED_ORIGINS       https://your-frontend.com               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Configure Webhook in Razorpay

```
┌────────────────────────────────────────────────────────────────┐
│ Razorpay Dashboard → Settings → Webhooks                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  1. Click "Add Webhook"                                        │
│                                                                │
│  2. URL: https://your-app.vercel.app/api/webhook               │
│                                                                │
│  3. Select Events:                                             │
│     ☑ payment.captured                                         │
│     ☑ payment.failed                                           │
│     ☑ order.paid                                               │
│     ☑ payment.refunded                                         │
│                                                                │
│  4. Copy Webhook Secret to RAZORPAY_WEBHOOK_SECRET             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Integration

The webhook handlers include integration points for your database. Here's how to implement them:

### Example: Prisma Integration

```typescript
// In api/webhook/route.ts

async function handlePaymentCaptured(
  event: RazorpayWebhookEvent,
  requestId: string
): Promise<void> {
  const payment = event.payload?.payment?.entity;
  
  // Your database logic here
  await prisma.payment.update({
    where: { razorpayPaymentId: payment.id },
    data: {
      status: 'CAPTURED',
      capturedAt: new Date(),
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
    }
  });

  // Update order status
  await prisma.order.update({
    where: { razorpayOrderId: payment.order_id },
    data: { status: 'PAID' }
  });

  // Send confirmation email
  await sendPaymentConfirmationEmail(payment.notes.userId);
}
```

### Example: Supabase Integration

```typescript
async function handlePaymentCaptured(event, requestId) {
  const { payment } = event.payload;
  
  await supabase
    .from('payments')
    .update({
      status: 'captured',
      captured_at: new Date().toISOString()
    })
    .eq('razorpay_payment_id', payment.id);

  await supabase
    .from('orders')
    .update({ status: 'paid' })
    .eq('razorpay_order_id', payment.order_id);
}
```

---

## 🔧 Configuration Options

### CORS Configuration

```bash
# Allow specific origins (recommended for production)
ALLOWED_ORIGINS=https://your-app.vercel.app,https://admin.your-app.vercel.app

# Allow all origins (development only)
ALLOWED_ORIGINS=*
```

### Rate Limiting

```bash
# More lenient for high-traffic apps
RATE_LIMIT_MAX_REQUESTS=1000
RATE_LIMIT_WINDOW_MS=60000

# Stricter for security
RATE_LIMIT_MAX_REQUESTS=50
RATE_LIMIT_WINDOW_MS=60000
```

### Logging

```bash
# Verbose logging (development)
LOG_LEVEL=debug

# Minimal logging (production)
LOG_LEVEL=warn
```

---

## 🧪 Testing

### Local Testing

```bash
# Start server
npm run dev

# Test create-order
curl -X POST http://localhost:3000/api/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "site": "test-site",
    "product": "test-product"
  }'

# Test verify-payment (mock)
curl -X POST http://localhost:3000/api/verify-payment \
  -H "Content-Type: application/json" \
  -d '{
    "razorpayOrderId": "order_xxx",
    "razorpayPaymentId": "pay_xxx",
    "razorpaySignature": "signature"
  }'
```

### Razorpay Test Mode

```
Use these test credentials in test mode:

Card Number: 4111111111111111
Expiry: Any future date
CVV: Any 3 digits

More test cards: https://razorpay.com/docs/payments/cards/
```

---

## 📝 API Response Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful request |
| 201 | Created | Order created successfully |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Invalid/missing webhook signature |
| 403 | Forbidden | Payment verification failed |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |
| 502 | Bad Gateway | Razorpay API error |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Razorpay](https://razorpay.com/) for the excellent payment API
- [Vercel](https://vercel.com/) for serverless hosting
- All contributors who have helped improve this project

---

## 🌐 Complete Frontend Integration Guide

*Everything you need to connect your website to this Razorpay API after deployment*

---

### 📋 Prerequisites Checklist

Before starting, make sure you have:

```
✅ Backend API deployed on Vercel (e.g., https://your-api.vercel.app)
✅ Razorpay account with API keys (Test or Live mode)
✅ Frontend website (React, Vue, Next.js, or plain HTML/JS)
✅ Backend API URL ready
```

---

### 🔧 Step 1: Get Your Deployed API URL

After deploying to Vercel, your API will be available at:

```
https://your-project-name.vercel.app
```

**Example:**
- Project Name: `my-rpay-api`
- API URL: `https://my-rpay-api.vercel.app`
- Create Order: `https://my-rpay-api.vercel.app/api/create-order`
- Verify Payment: `https://my-rpay-api.vercel.app/api/verify-payment`

---

### 🔐 Step 2: Set Up Environment Variables in Your Frontend

Create a `.env` file in your frontend project root:

#### For React/Next.js/Vue Projects

```bash
# .env (Create this file in your frontend project)

# Your Razorpay KEY_ID (from Razorpay Dashboard)
# This is PUBLIC - safe to expose
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX

# Your Backend API URL
NEXT_PUBLIC_API_URL=https://your-rpay-api.vercel.app
```

#### For Vanilla JS / HTML Projects

```javascript
// config.js (Create this file)
const CONFIG = {
  RAZORPAY_KEY_ID: 'rzp_test_XXXXXXXXXXXX',
  API_URL: 'https://your-rpay-api.vercel.app'
};
```

**⚠️ IMPORTANT SECURITY NOTES:**

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║  🔒 RAZORPAY_KEY_ID - PUBLIC key, can be exposed to frontend         ║
║  🔒 RAZORPAY_KEY_SECRET - NEVER expose to frontend (backend only)   ║
║  🔒 RAZORPAY_WEBHOOK_SECRET - NEVER expose to frontend (backend)    ║
║                                                                      ║
║  Only KEY_ID goes in frontend .env files with NEXT_PUBLIC_ prefix   ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

### 📁 Step 3: Project Structure (Frontend)

Your frontend project should look like this:

```
my-website/
├── src/
│   ├── components/
│   │   └── PaymentButton.jsx      # Payment button component
│   ├── services/
│   │   └── paymentService.js      # API calls to backend
│   ├── pages/
│   │   └── checkout.jsx           # Checkout page
│   └── App.jsx
├── .env                          # Environment variables
├── .env.local                     # Local overrides
├── .env.production               # Production variables
└── package.json
```

---

### 🔌 Step 4: Create Payment Service

Create a service file to handle API calls:

#### `src/services/paymentService.js`

```javascript
// Payment service for frontend
// All API calls to your deployed backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-rpay-api.vercel.app';

/**
 * Create a Razorpay order on backend
 * @param {Object} orderData - Order details
 * @returns {Promise<Object>} Order response from backend
 */
export async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_URL}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || 'Failed to create order');
    }

    return data.data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}

/**
 * Verify payment on backend
 * @param {Object} paymentData - Payment verification data
 * @returns {Promise<Object>} Verification response
 */
export async function verifyPayment(paymentData) {
  try {
    const response = await fetch(`${API_URL}/api/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    return {
      success: data.success,
      verified: data.data?.verified || false,
      message: data.data?.message || data.error?.message,
    };
  } catch (error) {
    console.error('Verify payment error:', error);
    return { success: false, verified: false, message: error.message };
  }
}
```

---

### 💳 Step 5: Create Payment Component

#### React Component Example

```jsx
// src/components/RazorpayButton.jsx
import { useState } from 'react';
import { createOrder, verifyPayment } from '../services/paymentService';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export default function RazorpayButton({ product, amount, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // STEP 1: Create order on backend
      console.log('Creating order on backend...');
      const order = await createOrder({
        amount: amount,                    // Amount in PAISE (₹299 = 29900)
        currency: 'INR',                  // Currency code
        site: 'my-website',               // Your website identifier
        product: product.id,              // Product identifier
        userId: currentUser?.id,          // User ID (optional)
        metadata: {
          productName: product.name,
          // Any custom data
        }
      });

      console.log('Order created:', order);

      // STEP 2: Load Razorpay script & open checkout
      const options = {
        key: RAZORPAY_KEY_ID,             // Your Razorpay KEY_ID
        amount: order.amount,              // Amount from order
        currency: order.currency,          // Currency from order
        name: 'Your Company Name',
        description: product.name,
        order_id: order.orderId,          // Razorpay order ID
        prefill: {
          name: currentUser?.name || 'Customer',
          email: currentUser?.email || 'customer@example.com',
          contact: currentUser?.phone || '9999999999',
        },
        notes: order.notes,               // Include notes
        theme: {
          color: '#3399cc',
        },
        handler: async (response) => {
          // STEP 3: Verify payment on backend
          console.log('Payment successful, verifying...');
          console.log('Razorpay Response:', response);

          const verification = await verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (verification.verified) {
            console.log('✅ Payment verified successfully!');
            onSuccess?.({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              status: 'verified'
            });
          } else {
            console.error('❌ Payment verification failed!');
            onError?.('Payment verification failed');
          }
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal closed');
            setLoading(false);
          }
        }
      };

      // Open Razorpay
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', (response) => {
        console.error('❌ Payment failed:', response.error);
        onError?.(response.error.description);
      });

      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      style={{
        padding: '12px 24px',
        backgroundColor: loading ? '#ccc' : '#3399cc',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }}
    >
      {loading ? '⏳ Processing...' : `💳 Pay ₹${amount / 100}`}
    </button>
  );
}
```

---

### 🎯 Step 6: Usage in Your Pages

#### Next.js Page

```jsx
// pages/checkout.jsx
import dynamic from 'next/dynamic';

// Load Razorpay script dynamically
const RazorpayButton = dynamic(() => import('../components/RazorpayButton'), {
  ssr: false,
  loading: () => <button disabled>Loading...</button>
});

const product = {
  id: 'prod_123',
  name: 'Premium Course',
  price: 29900 // in paise
};

export default function CheckoutPage() {
  const handleSuccess = (data) => {
    console.log('Success:', data);
    alert('Payment successful! Order ID: ' + data.orderId);
    // Redirect to thank you page
    // Update your database
    // Send confirmation email
  };

  const handleError = (error) => {
    console.error('Error:', error);
    alert('Payment failed: ' + error);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Checkout</h1>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <h2>{product.name}</h2>
        <p>Price: ₹{product.price / 100}</p>
        
        <RazorpayButton
          product={product}
          amount={product.price}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
}
```

---

### 🔄 Step 7: Payment Flow Diagram

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                        💰 COMPLETE PAYMENT FLOW 💰                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

    ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
    │              │           │              │           │              │
    │   FRONTEND   │           │  BACKEND API │           │   RAZORPAY   │
    │   (Your      │           │  (Deployed   │           │   SERVER     │
    │   Website)   │           │  on Vercel)  │           │              │
    │              │           │              │           │              │
    └──────┬───────┘           └──────┬───────┘           └──────┬───────┘
           │                          │                          │
           │                          │                          │
           │  1. POST /api/create-order                          │
           │  { amount, site, product }                          │
           │ ─────────────────────────────────────────────────► │
           │                          │                          │
           │                          │  Create Order            │
           │                          │ ────────────────────────►│
           │                          │                          │
           │                          │  { orderId, amount, ... } │
           │  { orderId, amount, ... } │ ◄────────────────────────│
           │ ◄─────────────────────────                          │
           │                          │                          │
           │                          │                          │
           │  2. Open Razorpay Checkout                          │
           │ ┌─────────────────────────────────────────────┐     │
           │ │  ┌─────────────┐                           │     │
           │ │  │ Credit Card │  UPI                      │     │
           │ │  │ ●●●● ●●●●   │  @upi                    │     │
           │ │  │ 11/25 123   │  Pay                      │     │
           │ │  └─────────────┘                           │     │
           │ └─────────────────────────────────────────────┘     │
           │                          │                          │
           │                          │                          │
           │  3. POST /api/verify-payment                       │
           │  { razorpay_order_id,                              │
           │    razorpay_payment_id,                            │
           │    razorpay_signature }                            │
           │ ─────────────────────────────────────────────────► │
           │                          │                          │
           │                          │  Verify Signature        │
           │                          │  (HMAC-SHA256)          │
           │                          │                          │
           │                          │  ✅ VERIFIED or ❌ FAILED│
           │  { verified: true }      │ ◄────────────────────────│
           │ ◄─────────────────────────                          │
           │                          │                          │
           │                          │                          │
           │  ✅ Payment Complete!   │                          │
           │  Update UI, Redirect    │                          │
           │                          │                          │
           └──────────────────────────┘                          │


╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║  🎉 SUCCESS! Your payment flow is complete and secure!                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

### 📊 Step 8: Understanding Status Codes

After payment, here's what each status means:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   PAYMENT STATUS FLOW                                                       │
│                                                                            │
│   ┌─────────┐     ┌──────────┐     ┌───────────┐     ┌──────────┐         │
│   │ Created │────►│ Attempted │────►│  Paid     │────►│ Captured │         │
│   └─────────┘     └──────────┘     └───────────┘     └──────────┘         │
│       │                                                   │               │
│       │                                                   │               │
│       ▼                                                   ▼               │
│   ┌─────────┐                                       ┌──────────┐          │
│   │ Failed  │                                       │ Refunded │          │
│   └─────────┘                                       └──────────┘          │
│                                                                            │
│   Status Meanings:                                                          │
│   ───────────────                                                          │
│   • Created    → Order created, waiting for payment                         │
│   • Attempted  → User started payment process                               │
│   • Paid       → Payment received by Razorpay                              │
│   • Captured  → Money transferred to your account (final success)           │
│   • Failed     → Payment failed at any stage                               │
│   • Refunded  → Money returned to customer                                 │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 📧 Step 9: Webhook Status Updates

Your backend automatically handles webhooks. Here's what happens:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   🪝 WEBHOOK FLOW                                                          │
│                                                                            │
│   RAZORPAY                      YOUR BACKEND                  YOUR DB      │
│   ────────                      ────────────                  ───────       │
│                                                                            │
│   Payment Success                                                            │
│        │                                                                    │
│        ▼                                                                    │
│   ┌────────────────────┐                                                   │
│   │ POST /api/webhook   │                                                   │
│   │ event: payment.     │                                                   │
│   │       captured      │                                                   │
│   │ X-Razorpay-         │                                                   │
│   │ Signature: xyz      │                                                   │
│   └──────────┬──────────┘                                                   │
│              │                                                             │
│              ▼                                                             │
│   ┌────────────────────┐                                                   │
│   │ Verify Signature   │                                                   │
│   │ (HMAC-SHA256)     │                                                   │
│   └──────────┬──────────┘                                                   │
│              │                                                             │
│              │ ✅ Valid                                                    │
│              ▼                                                             │
│   ┌────────────────────┐                                                   │
│   │ handlePayment      │                                                   │
│   │ Captured()         │                                                   │
│   │                    │                                                   │
│   │ • Log event        │                                                   │
│   │ • Update DB status │ ────────────────────────────────────────────────►│
│   │ • Send email       │                                                   │
│   └────────────────────┘                                                   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 🔒 Step 10: Security Checklist

Before going live, verify:

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║  🔒 SECURITY CHECKLIST                                                   ║
║                                                                          ║
║  ☐ Use HTTPS on frontend (SSL certificate)                                ║
║  ☐ Never expose RAZORPAY_KEY_SECRET in frontend                          ║
║  ☐ Always verify payments on backend (never trust frontend alone)         ║
║  ☐ Webhook URL uses HTTPS                                                ║
║  ☐ Webhook signature verification enabled                                ║
║  ☐ CORS configured with your domain(s) only                              ║
║  ☐ Rate limiting enabled                                                 ║
║  ☐ Input validation working                                              ║
║  ☐ Test mode keys replaced with live keys                                ║
║                                                                          ║
║  🚀 PRODUCTION CHECKLIST                                                  ║
║                                                                          ║
║  ☐ .env.local created with production keys                               ║
║  ☐ Vercel environment variables set                                      ║
║  ☐ API deployed to production                                             ║
║  ☐ Frontend using production API URL                                      ║
║  ☐ Test payment completed successfully                                   ║
║  ☐ Webhook configured in Razorpay Dashboard                               ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### 🌍 Step 11: Environment Variables Reference

#### Your Backend (.env on Vercel)

```bash
# Required
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
RAZORPAY_WEBHOOK_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX

# Optional
ALLOWED_ORIGINS=https://your-frontend.com
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

#### Your Frontend (.env.local in React/Next.js)

```bash
# Public variables (can be accessed in browser)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
NEXT_PUBLIC_API_URL=https://your-rpay-api.vercel.app

# Private variables (server-side only)
# Don't add private keys here!
```

#### Your Frontend (.env in Vanilla JS)

```javascript
// config.js
const CONFIG = {
  RAZORPAY_KEY_ID: 'rzp_live_XXXXXXXXXXXX',
  API_URL: 'https://your-rpay-api.vercel.app'
};
```

---

### 📱 Step 12: Different Frontend Frameworks

#### React (with useRazorpay hook)

```jsx
import { useCallback, useState } from 'react';
import { loadScript } from '../utils/loadScript';
import { createOrder, verifyPayment } from '../services/paymentService';

export function useRazorpay() {
  const [loading, setLoading] = useState(false);

  const displayRazorpay = useCallback(async (amount, product) => {
    setLoading(true);

    // Load Razorpay script
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    // Create order
    const order = await createOrder({
      amount,
      site: 'my-app',
      product: product.id
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'My Business',
      order_id: order.orderId,
      handler: async (response) => {
        const verification = await verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
        return verification;
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  }, []);

  return { displayRazorpay, loading };
}
```

#### Vue 3 Composition API

```vue
<template>
  <button @click="pay" :disabled="loading">
    {{ loading ? 'Processing...' : 'Pay Now' }}
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { createOrder, verifyPayment } from '@/services/paymentService';

const loading = ref(false);

const pay = async () => {
  loading.value = true;
  
  const order = await createOrder({
    amount: 29900,
    site: 'my-vue-app',
    product: 'product-id'
  });

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    order_id: order.orderId,
    handler: async (response) => {
      await verifyPayment({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
  loading.value = false;
};
</script>
```

#### Plain HTML/JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Buy Now</title>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>
  <button onclick="pay()">Buy for ₹299</button>

  <script>
    // Configuration
    const CONFIG = {
      RAZORPAY_KEY_ID: 'rzp_test_XXXXXXXXXXXX',
      API_URL: 'https://your-api.vercel.app'
    };

    async function pay() {
      // Step 1: Create order
      const orderRes = await fetch(CONFIG.API_URL + '/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 29900,
          site: 'my-html-page',
          product: 'item-1'
        })
      });
      
      const { data: order } = await orderRes.json();

      // Step 2: Open Razorpay
      const options = {
        key: CONFIG.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'My Store',
        order_id: order.orderId,
        handler: async (response) => {
          // Step 3: Verify payment
          const verifyRes = await fetch(CONFIG.API_URL + '/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            })
          });
          
          const { success } = await verifyRes.json();
          alert(success ? 'Payment successful!' : 'Payment failed');
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }
  </script>
</body>
</html>
```

---

### 🎯 Step 13: Complete Integration Example

Here's a full-stack example with everything connected:

```jsx
// Complete React Component with Error Handling
// src/components/ProductCard.jsx

import { useState } from 'react';
import { createOrder, verifyPayment } from '../services/paymentService';

export default function ProductCard({ product }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleBuy = async () => {
    setStatus('loading');
    setMessage('');

    try {
      // 1. Create order
      const order = await createOrder({
        amount: product.price,
        site: 'shop',
        product: product.id,
        userId: currentUser?.id,
        metadata: {
          productName: product.name,
          quantity: '1'
        }
      });

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'My Store',
        description: product.name,
        order_id: order.orderId,
        prefill: {
          name: currentUser?.name || 'Guest',
          email: currentUser?.email,
          contact: currentUser?.phone
        },
        handler: async (response) => {
          // 3. Verify payment
          const result = await verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          });

          if (result.verified) {
            setStatus('success');
            setMessage('Payment successful! Order ID: ' + response.razorpay_payment_id);
            // Update your database
            // Send confirmation email
            // Redirect to success page
          } else {
            setStatus('error');
            setMessage('Payment verification failed');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setStatus('error');
        setMessage('Payment failed: ' + response.error.description);
      });

      rzp.open();

    } catch (error) {
      setStatus('error');
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price / 100}</p>
      
      <button onClick={handleBuy} disabled={status === 'loading'}>
        {status === 'loading' ? 'Processing...' : 'Buy Now'}
      </button>
      
      {message && (
        <p className={`message ${status}`}>
          {message}
        </p>
      )}
    </div>
  );
}
```

---

### 🚨 Step 14: Troubleshooting Common Issues

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║  ❌ COMMON ISSUES & SOLUTIONS                                            ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Issue: "Razorpay is not defined"                                       ║
║  Solution: Script not loaded. Add:                                      ║
║             <script src="https://checkout.razorpay.com/v1/checkout.js"> │
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Issue: "Order creation failed"                                          ║
║  Solution: Check backend .env RAZORPAY_KEY_ID is correct                ║
║             Verify API is deployed and accessible                       ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Issue: "Signature verification failed"                                 ║
║  Solution: Ensure RAZORPAY_KEY_SECRET is correct in backend            ║
║             Never use frontend'srazorpaySignature directly             ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Issue: "CORS error"                                                     ║
║  Solution: Add your frontend URL to ALLOWED_ORIGINS in backend         ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Issue: "Webhook not working"                                            ║
║  Solution: Check webhook URL is HTTPS                                   ║
║             Verify RAZORPAY_WEBHOOK_SECRET is set                       ║
║             Check Razorpay Dashboard webhook logs                       ║
║                                                                          ║
║  ─────────────────────────────────────────────────────────────────────   ║
║                                                                          ║
║  Issue: "Payment modal not opening"                                      ║
║  Solution: Check RAZORPAY_KEY_ID is correct                             ║
║             Use correct KEY_ID (test vs live)                           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

### 📞 Step 15: Getting Help

If you need help:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   📚 RESOURCES                                                             │
│                                                                            │
│   • Razorpay Docs: https://razorpay.com/docs/                              │
│   • Vercel Docs: https://vercel.com/docs                                  │
│   • GitHub Issues: https://github.com/yourusername/rpay-backend-api/issues │
│   • Discord Community: Join our developer community                       │
│                                                                            │
│   💬 Still need help?                                                     │
│                                                                            │
│   1. Check the troubleshooting section above                              │
│   2. Search existing GitHub issues                                        │
│   3. Create a new issue with:                                             │
│      - Your frontend framework                                            │
│      - Error message                                                      │
│      - Steps to reproduce                                                 │
│      - Code snippet                                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

### 🎉 You're All Set!

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   🎊 CONGRATULATIONS! 🎊                                                 ║
║                                                                          ║
║   You've successfully integrated Razorpay payments into your website!    ║
║                                                                          ║
║   ✅ Backend API deployed on Vercel                                       ║
║   ✅ Frontend integrated with payment flow                               ║
║   ✅ Payment verification working                                         ║
║   ✅ Webhooks configured                                                  ║
║   ✅ Security best practices implemented                                  ║
║                                                                          ║
║   🚀 Time to start accepting real payments!                              ║
║                                                                          ║
║   Remember: Switch from Test to Live keys when ready for production!     ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

*Happy Coding! 💻 | Questions? Create an issue on GitHub | ⭐ Star this repo if it helped!*

---

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║   Made with ❤️  for the developer community                          ║
║                                                                      ║
║   🌐 https://rpay-api.vercel.app                                     ║
║   📦 https://github.com/yourusername/rpay-backend-api                ║
║   📚 Documentation: https://github.com/yourusername/rpay-backend-api │
║                                                                      ║
║   If this project helped you, please give it a ⭐!                   ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

</div>

---

<!--
   _  __          _                         _ _
  | |/ /___ _   _| |__   ___   __ _ _ __ __| | | _____      _____
  | ' // _ \ | | | '_ \ / _ \ / _` | '__/ _` | |/ _ \ \ /\ / / __|
  | . \  __/ |_| | |_) | (_) | (_| | | | (_| | | (_) \ V  V /\__ \
  |_|\_\___|\__, |_.__/ \___/ \__,_|_|  \__,_|_|\___/ \_/\_/ |___/
            |___/                   🚀
-->
