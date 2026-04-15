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
