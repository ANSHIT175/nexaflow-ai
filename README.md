# NexaFlow - Next-Gen AI Platform

A premium, cinematic landing page and SaaS platform for enterprise data automation with integrated payment processing, user authentication, and subscription management.

## 🚀 Features

### Frontend
- **Premium Dark Theme** - Cinematic design with animated particles and gradient effects
- **Responsive Design** - Mobile-first approach with smooth animations
- **Smooth Scrolling** - Navigation links with smooth scroll behavior
- **Payment Modal** - Beautiful popup with multiple payment methods (Card, Google Pay, UPI)
- **Currency Switcher** - Support for USD, INR, EUR
- **Billing Toggle** - Monthly/Annual plans with 20% discount
- **User Dashboard** - Profile management and subscription tracking
- **Hero Section** - Animated particles background with compelling CTAs

### Backend & Authentication
- **Google OAuth Integration** - Seamless Gmail login
- **Stripe Payment Processing** - Secure payment handling with webhook support
- **User Management** - Database-backed user profiles and roles
- **Session Management** - Secure cookie-based authentication

### Sections
1. **Hero** - Eye-catching headline with stats
2. **Features** - 6 key features with icons
3. **Pricing** - 3 pricing tiers with flexible billing
4. **Testimonials** - Social proof with customer quotes
5. **Dashboard** - User profile and subscription management

## 📋 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express.js, tRPC, Node.js
- **Database**: MySQL/TiDB with Drizzle ORM
- **Payment**: Stripe
- **Authentication**: Manus OAuth (Google)
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 22+
- pnpm (package manager)
- MySQL database
- Stripe account (for payments)

### 1. Clone & Install Dependencies
```bash
cd nexaflow-fix
pnpm install
```

### 2. Environment Variables
Create a `.env` file with:
```
DATABASE_URL=mysql://user:password@localhost:3306/nexaflow
JWT_SECRET=your_jwt_secret_key
VITE_APP_ID=your_manus_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
STRIPE_SECRET_KEY=sk_test_your_stripe_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 3. Database Setup
```bash
pnpm db:push
```

### 4. Start Development Server
```bash
pnpm dev
```

Server runs on `http://localhost:3000`

### 5. Build for Production
```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
nexaflow-fix/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── pages/            # Page components (Home, Dashboard)
│   │   ├── components/       # Reusable UI components
│   │   ├── _core/hooks/      # Custom hooks (useAuth)
│   │   ├── App.tsx           # Main app with routing
│   │   ├── App.css           # Global styles
│   │   └── AnimatedParticles.tsx  # Hero animation
│   └── index.html            # HTML entry point
├── server/                    # Backend Express server
│   ├── routers.ts            # tRPC procedure definitions
│   ├── db.ts                 # Database queries
│   ├── products.ts           # Stripe product configuration
│   ├── storage.ts            # S3 storage helpers
│   └── _core/                # Core server utilities
├── drizzle/                  # Database schema & migrations
│   └── schema.ts             # User and subscription tables
├── shared/                   # Shared types and constants
└── package.json              # Dependencies and scripts
```

## 🎨 Key Components

### PaymentModal.tsx
Beautiful modal for payment processing with:
- Plan summary display
- Multiple payment method options
- Secure payment form

### Home.tsx
Landing page with:
- Sticky navigation with smooth scroll
- Hero section with animated particles
- Features grid (6 features)
- Pricing section with currency switcher
- Testimonials carousel
- Footer with links

### Dashboard.tsx
User dashboard featuring:
- Profile information display
- Active subscription details
- Payment history table
- Action buttons (Upgrade, Download Invoice, Support)

## 💳 Stripe Integration

### Payment Flow
1. User clicks "Upgrade Now" on pricing card
2. Payment modal appears with plan details
3. User selects payment method (Card/Google Pay/UPI)
4. Checkout session created on backend
5. Redirects to Stripe checkout
6. Webhook confirms payment
7. User subscription updated

### Testing
- **Test Card**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## 🔐 Authentication Flow

1. User clicks "Sign In" button
2. Redirects to Manus OAuth login
3. User authenticates with Gmail
4. OAuth callback creates/updates user in database
5. Session cookie set
6. User redirected to dashboard

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Manus Platform (Recommended)
1. Click "Publish" in Management UI
2. Configure custom domain (optional)
3. Website goes live automatically

### External Hosting
The project can be deployed to:
- Vercel
- Netlify
- Railway
- Render
- AWS

## 📱 Responsive Design

- **Mobile**: Optimized for 375px+ screens
- **Tablet**: Enhanced layout for 768px+ screens
- **Desktop**: Full experience on 1280px+ screens

All buttons styled with premium dark theme on mobile—no white boxes!

## 🎯 Features Breakdown

### Hero Section
- Animated particle background
- Gradient text effects
- CTA buttons with hover effects
- Stats grid (6 metrics)

### Features Section
- 6 feature cards with icons
- Hover effects with glow
- Responsive grid layout

### Pricing Section
- 3 pricing tiers
- Currency switcher (USD/INR/EUR)
- Monthly/Annual toggle (20% discount)
- Payment modal integration
- "Popular" badge on Professional plan

### Testimonials
- 3 customer testimonials
- Quote styling
- Author and role display

### User Dashboard
- Profile card with user info
- Subscription status with renewal date
- Payment history table
- Action buttons

## 🔧 Customization

### Colors
Edit `client/src/index.css` for theme colors:
```css
@layer base {
  :root {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --yellow-accent: 45 96% 56%;
  }
}
```

### Pricing Plans
Edit `Home.tsx` pricing section:
```tsx
const prices = {
  USD: { starter: 99, professional: 299, enterprise: 999 },
  INR: { starter: 8250, professional: 24900, enterprise: 83250 },
  EUR: { starter: 89, professional: 269, enterprise: 899 },
};
```

### Features
Modify features grid in `Home.tsx`:
```tsx
{
  icon: '⚡',
  title: 'Feature Title',
  desc: 'Feature description',
}
```

## 📝 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm check        # TypeScript type check
pnpm test         # Run tests with Vitest
pnpm format       # Format code with Prettier
pnpm db:push      # Push database migrations
```

## 🐛 Troubleshooting

### Payment Modal Not Showing
- Ensure `PaymentModal.tsx` is imported in `Home.tsx`
- Check browser console for errors
- Verify Stripe keys are set correctly

### Smooth Scroll Not Working
- Check that section IDs match button onClick handlers
- Ensure smooth scroll is enabled in browser
- Verify no CSS is preventing scroll behavior

### Mobile Buttons Look Ugly
- Check Tailwind CSS is properly compiled
- Verify mobile breakpoints in CSS
- Clear browser cache and rebuild

### Database Connection Error
- Verify `DATABASE_URL` environment variable
- Check MySQL server is running
- Ensure database exists and user has permissions

## 📞 Support

For issues or questions:
1. Check `.manus-logs/` for error details
2. Review browser console for client-side errors
3. Check server logs for backend errors
4. Verify all environment variables are set

## 📄 License

MIT License - Feel free to use and modify

## 🎉 What's Included

✅ Complete landing page with hero section  
✅ Premium dark cinematic theme  
✅ Smooth scroll navigation  
✅ Payment modal with multiple methods  
✅ User authentication (Google OAuth)  
✅ Stripe payment integration  
✅ User dashboard with subscription management  
✅ Responsive mobile design  
✅ Currency switcher (USD/INR/EUR)  
✅ Monthly/Annual billing toggle  
✅ Database schema with Drizzle ORM  
✅ TypeScript for type safety  
✅ Production-ready code  

## 🚀 Next Steps

1. **Customize Content** - Update company name, features, pricing
2. **Add Email Marketing** - Integrate Mailchimp or SendGrid
3. **Setup Analytics** - Add Mixpanel or Amplitude tracking
4. **Add Blog** - Create blog section for content marketing
5. **Implement Live Chat** - Add customer support widget
6. **Setup CDN** - Use Cloudflare for faster delivery

---

**Live Demo**: https://nexaflowai-5yqt9uxc.manus.space

**Built with ❤️ using Manus Platform**
