import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: number;
  currency: string;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export default function PaymentModal({
  isOpen,
  onClose,
  planName,
  price,
  currency,
  onConfirm,
  isLoading = false,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'google' | 'upi'>('card');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const currencySymbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : '€';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg max-w-md w-full p-8 shadow-2xl shadow-yellow-400/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 mb-6">
          <p className="text-gray-400 text-sm mb-1">Plan</p>
          <p className="text-white font-semibold mb-2">{planName}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-yellow-400">
              {currencySymbol}
              {price}
            </span>
            <span className="text-gray-400">/month</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6">
          <p className="text-white font-semibold mb-3">Select Payment Method</p>
          <div className="space-y-2">
            {/* Credit/Debit Card */}
            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all" 
              style={{
                borderColor: paymentMethod === 'card' ? '#facc15' : '#374151',
                backgroundColor: paymentMethod === 'card' ? 'rgba(250, 204, 21, 0.1)' : 'transparent'
              }}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'google' | 'upi')}
                className="w-4 h-4"
              />
              <span className="ml-3 text-white font-medium">💳 Credit/Debit Card</span>
            </label>

            {/* Google Pay */}
            <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all"
              style={{
                borderColor: paymentMethod === 'google' ? '#facc15' : '#374151',
                backgroundColor: paymentMethod === 'google' ? 'rgba(250, 204, 21, 0.1)' : 'transparent'
              }}>
              <input
                type="radio"
                name="payment"
                value="google"
                checked={paymentMethod === 'google'}
                onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'google' | 'upi')}
                className="w-4 h-4"
              />
              <span className="ml-3 text-white font-medium">🔵 Google Pay</span>
            </label>

            {/* UPI (for INR) */}
            {currency === 'INR' && (
              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all"
                style={{
                  borderColor: paymentMethod === 'upi' ? '#facc15' : '#374151',
                  backgroundColor: paymentMethod === 'upi' ? 'rgba(250, 204, 21, 0.1)' : 'transparent'
                }}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'google' | 'upi')}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-white font-medium">📱 UPI</span>
              </label>
            )}
          </div>
        </div>

        {/* Terms */}
        <p className="text-gray-400 text-xs mb-6">
          By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy. Your payment is secure and encrypted.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-gray-700 text-gray-300 font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
