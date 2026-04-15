import Razorpay from 'razorpay';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn(
    '[Razorpay] Warning: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not set. ' +
    'API calls will fail in production.'
  );
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID || '',
  key_secret: RAZORPAY_KEY_SECRET || '',
});

export default razorpay;

export const getRazorpayConfig = () => ({
  keyId: RAZORPAY_KEY_ID,
  keySecret: RAZORPAY_KEY_SECRET,
});

export const isRazorpayConfigured = () => {
  return !!(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);
};
