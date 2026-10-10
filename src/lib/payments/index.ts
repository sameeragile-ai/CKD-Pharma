import { PaymentMethodId, Order } from '../../types';

export interface PaymentGatewayResult {
  success: boolean;
  transactionId?: string;
  gatewayMessage: string;
  receiptUrl?: string;
}

export interface PaymentGatewayAdapter {
  id: PaymentMethodId;
  name: string;
  tagline: string;
  badge?: string;
  requiresOnlineRedirect: boolean;
  processPayment: (order: Order, payload?: Record<string, unknown>) => Promise<PaymentGatewayResult>;
}

/**
 * Cash on Delivery (COD) Adapter
 * Default nationwide payment method in Pakistan.
 */
export const cashOnDeliveryAdapter: PaymentGatewayAdapter = {
  id: 'cod',
  name: 'Cash on Delivery (COD)',
  tagline: 'Pay cash directly to the courier upon doorstep inspection',
  badge: 'Recommended',
  requiresOnlineRedirect: false,
  processPayment: async (order: Order) => {
    // COD is confirmed instantly without external gateway processing
    return {
      success: true,
      transactionId: `COD-${order.id}-${Math.floor(1000 + Math.random() * 9000)}`,
      gatewayMessage: 'Order confirmed for Cash on Delivery. Please keep exact change ready.'
    };
  }
};

/**
 * JazzCash Mobile Account & Voucher Adapter
 * {{TODO: Connect JazzCash Merchant Sandbox/Production API Credentials}}
 * Endpoint: https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform
 */
export const jazzCashAdapter: PaymentGatewayAdapter = {
  id: 'jazzcash',
  name: 'JazzCash Mobile Account',
  tagline: 'Instant mobile wallet payment or OTC voucher across JazzCash outlets',
  badge: 'Mobile Wallet',
  requiresOnlineRedirect: true,
  processPayment: async (order: Order, payload?: Record<string, unknown>) => {
    // {{TODO: In production, generate Secure HMAC-SHA256 Hash with Merchant ID & Password}}
    const mobileNumber = payload?.jazzCashMobileNumber || order.customer.phone;
    
    // Simulating gateway transaction latency
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      success: true,
      transactionId: `JC-${Date.now().toString().slice(-6)}-${order.id.slice(-4)}`,
      gatewayMessage: `JazzCash MPIN prompt dispatched to ${mobileNumber}. Approved successfully.`,
      receiptUrl: `https://jazzcash.com.pk/receipt/${order.id}`
    };
  }
};

/**
 * Easypaisa Mobile Account & QR Adapter
 * {{TODO: Connect Telenor Easypaisa Merchant Integration}}
 * Endpoint: https://easypay.easypaisa.com.pk/easypay/Index.jsf
 */
export const easyPaisaAdapter: PaymentGatewayAdapter = {
  id: 'easypaisa',
  name: 'Easypaisa Wallet',
  tagline: 'Pay securely using Easypaisa wallet or any Easypaisa shop agent',
  badge: 'Instant QR / Account',
  requiresOnlineRedirect: true,
  processPayment: async (order: Order, payload?: Record<string, unknown>) => {
    // {{TODO: Connect Easypaisa IPN webhook and postback verification}}
    const mobileNumber = payload?.easyPaisaMobileNumber || order.customer.phone;

    await new Promise(resolve => setTimeout(resolve, 850));

    return {
      success: true,
      transactionId: `EP-${Date.now().toString().slice(-6)}-${order.id.slice(-4)}`,
      gatewayMessage: `Easypaisa payment debited from ${mobileNumber}. Reference verified.`,
      receiptUrl: `https://easypaisa.com.pk/transaction/${order.id}`
    };
  }
};

/**
 * Debit / Credit Card Adapter (Visa, Mastercard, PayPak)
 * {{TODO: Integrate with Bank Alfalah APG, Safepay PK, or Habib Bank HBL Pay}}
 */
export const creditDebitCardAdapter: PaymentGatewayAdapter = {
  id: 'card',
  name: 'Debit / Credit Card (Visa & Mastercard)',
  tagline: 'Secure 3D-Secure 2.0 encrypted card processing via Pakistani bank gateway',
  badge: 'Visa / Mastercard',
  requiresOnlineRedirect: false,
  processPayment: async (order: Order, payload?: Record<string, unknown>) => {
    // {{TODO: Tokenize card details via 1-Link / Bank Alfalah / Safepay iframe}}
    await new Promise(resolve => setTimeout(resolve, 950));

    const lastFour = (payload?.cardNumber as string)?.slice(-4) || '4242';

    return {
      success: true,
      transactionId: `TXN-CARD-${Date.now().toString().slice(-8)}`,
      gatewayMessage: `Payment of Rs. ${order.total.toLocaleString()} authorized on card ending in •••• ${lastFour}.`
    };
  }
};

export const paymentAdapters: Record<PaymentMethodId, PaymentGatewayAdapter> = {
  cod: cashOnDeliveryAdapter,
  jazzcash: jazzCashAdapter,
  easypaisa: easyPaisaAdapter,
  card: creditDebitCardAdapter
};
