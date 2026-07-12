# Pizza Lab

A modern, animated multi-page website for Pizza Lab built with Next.js 16, TailwindCSS, Framer Motion, Sanity CMS, and Stripe.

## Features

- Multi-page routing (Home, Menu, About, Contact, Order Online)
- Animated UI with Framer Motion (scroll reveals, page transitions, hover effects)
- Shopping cart with client-side state management
- Stripe checkout integration
- Google Maps embed on Contact page
- Responsive design with TailwindCSS
- Sanity CMS-ready schema for menu management

## Pages

- `/` - Hero section, feature highlights, CTA
- `/menu` - Filterable pizza menu with category tabs
- `/about` - Brand story and values
- `/contact` - Location, hours, and embedded Google Maps
- `/order` - Cart summary and Stripe checkout

## Getting Started

1. Clone the repo and navigate to the directory:
   ```bash
   cd "C:\Users\SC\3rd website\pizza-lab"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```

   - **Sanity**: Create a project at [sanity.io](https://www.sanity.io/) and add your `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
   - **Stripe**: Get your keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) and add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **CMS**: Sanity
- **Payments**: Stripe
- **State**: React Context (Cart)
