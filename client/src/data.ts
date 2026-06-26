/* Pricing Configuration Matrix */
export const PRICING_CONFIG = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For small teams',
      baseMonthlyUSD: 99,
      features: ['Up to 5 workflows', 'Basic sync', 'Email support', 'Monthly reports'],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing teams',
      baseMonthlyUSD: 299,
      features: ['Unlimited workflows', 'Advanced sync', 'Priority support', 'Real-time analytics', 'Custom integrations'],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      baseMonthlyUSD: 999,
      features: ['Everything in Pro', 'Dedicated manager', 'Custom SLA', 'On-premise', 'Advanced security'],
    },
  ],
  currencies: {
    USD: { symbol: '$', rate: 1 },
    INR: { symbol: '₹', rate: 83 },
    EUR: { symbol: '€', rate: 0.92 },
  },
  discountAnnual: 0.2,
};

export function calculatePrice(tierId: string, currency: string, billingPeriod: string): number {
  const tier = PRICING_CONFIG.tiers.find(t => t.id === tierId);
  if (!tier) return 0;
  
  const currencyConfig = PRICING_CONFIG.currencies[currency as keyof typeof PRICING_CONFIG.currencies];
  if (!currencyConfig) return 0;
  
  let price = tier.baseMonthlyUSD * currencyConfig.rate;
  
  if (billingPeriod === 'annual') {
    price = price * 12 * (1 - PRICING_CONFIG.discountAnnual);
  }
  
  return Math.round(price * 100) / 100;
}

export const FEATURES = [
  {
    id: 'workflow',
    title: 'Intelligent Workflow Automation',
    description: 'Create complex data workflows without code. AI understands your business logic.',
    icon: '⚡',
  },
  {
    id: 'sync',
    title: 'Real-Time Data Sync',
    description: 'Keep all systems in sync with instant data propagation. No manual updates.',
    icon: '🔄',
  },
  {
    id: 'insights',
    title: 'AI-Powered Insights',
    description: 'Get actionable insights automatically. Detect anomalies and recommend optimizations.',
    icon: '🧠',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description: 'Enable seamless collaboration. Share workflows and manage permissions.',
    icon: '👥',
  },
  {
    id: 'api',
    title: 'Flexible API Integration',
    description: 'Connect any system with REST and GraphQL APIs. Build custom integrations.',
    icon: '🔌',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'End-to-end encryption, SOC 2 certified, GDPR compliant. Your data is safe.',
    icon: '🔒',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechCorp Inc.',
    text: 'NexaFlow AI reduced our sync time from 8 hours to 15 minutes. Immediate ROI.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Engineering Lead',
    company: 'DataFlow Systems',
    text: 'Eliminated 80% of manual data entry tasks. The AI automation is incredible.',
  },
  {
    name: 'Emily Watson',
    role: 'CTO',
    company: 'CloudScale Analytics',
    text: 'Enterprise security with ease of use. Exactly what we needed to scale.',
  },
];
