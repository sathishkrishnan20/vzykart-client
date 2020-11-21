export interface RazorPaySuccess {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}
export interface RazorPayError {
  code: number;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

export interface RazorPayFailure {
  error: RazorPayError;
}
