/**
 * Stripe Products and Prices Configuration
 * These are the pricing tiers for NexaFlow
 */

export const PRODUCTS = {
  STARTER: {
    name: 'Starter',
    description: 'For small teams',
    prices: {
      USD: 9900, // $99/month in cents
      INR: 825000, // ₹8250/month in paise
      EUR: 8900, // €89/month in cents
    },
  },
  PROFESSIONAL: {
    name: 'Professional',
    description: 'For growing teams',
    prices: {
      USD: 29900, // $299/month in cents
      INR: 2490000, // ₹24900/month in paise
      EUR: 26900, // €269/month in cents
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    description: 'For large organizations',
    prices: {
      USD: 99900, // $999/month in cents
      INR: 8325000, // ₹83250/month in paise
      EUR: 89900, // €899/month in cents
    },
  },
};

export const CURRENCIES = ['USD', 'INR', 'EUR'] as const;
export type Currency = typeof CURRENCIES[number];

export function getPriceInCents(product: keyof typeof PRODUCTS, currency: Currency): number {
  return PRODUCTS[product].prices[currency];
}

export function getProductByName(name: string): keyof typeof PRODUCTS | null {
  for (const key of Object.keys(PRODUCTS)) {
    if (PRODUCTS[key as keyof typeof PRODUCTS].name === name) {
      return key as keyof typeof PRODUCTS;
    }
  }
  return null;
}
