# Moniepoint POS Dashboard

A production-grade, frontend-only intelligence dashboard designed for managing
and monitoring POS transactions, disputes, reversals, and failure analytics.
This project mimics a sophisticated fintech interface, built with modern web
technologies and utilizing a mock backend for seamless development and
demonstration.

## 🚀 Project Overview

The **Moniepoint POS Dashboard** is a "Smart Dispute, Reversal & POS Failure
Intelligence Dashboard". It solves the problem of visualizing complex financial
data and managing multi-business operations in a unified interface.

**Key Functionalities:**

- **Multi-Business Context Switching**: Seamlessly toggle between different
  business entities with global state persistence.
- **Real-time Analytics**: Visualize transaction trends, failure breakdowns, and
  POS performance.
- **Transaction Management**: Detailed views of successful, pending, and failed
  transactions.
- **Dispute & Reversal Handling**: Interfaces for managing claims and financial
  interactions (in development).
- **Mocked Backend**: Fully functional implementation using Mock Service Worker
  (MSW) to simulate API responses for specialized data.

## 🛠 Tech Stack

This project leverages a cutting-edge frontend stack:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (built on Radix UI)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Visualization**: [Recharts](https://recharts.org/) for data-rich charts
- **API Mocking**: [Mock Service Worker (MSW)](https://mswjs.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## ⚡ Installation Instructions

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/moniepoint-pos-dashboard.git
   cd moniepoint-pos-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Initialize MSW (Mock Service Worker)**: Required to enable the mock API
   interception.
   ```bash
   npx msw init public/
   ```

## ⚙️ Configuration

The project is designed to run out-of-the-box with **zero environment variable
configuration** required for the core dashboard, as it relies on MSW for data.

However, if you plan to connect to a real backend in the future:

1. Check `.env.local` (or create it).
2. Define your API endpoints (e.g., `NEXT_PUBLIC_API_URL`).

## 🖥 Usage

**Run the development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Key Interactions**:

- **Business Switcher**: Located in the sidebar (or top bar), use this to switch
  data contexts between different simulated businesses.
- **Dashboard**: View the "Overview" for charts and high-level stats.
- **Transactions**: Navigate to `/transactions` to view tabular data.

## ✨ Features

- **Dashboard Overview**:
  - Transaction Trend Chart (Line/Area chart).
  - Failure Breakdown (Pie/Donut chart).
  - Key Performance Indicators (KPI) cards.
- **Business Context**:
  - Global store for selected business.
  - Data refreshing based on business selection.
- **Responsive Layout**:
  - Collapsible/Mobile-friendly Sidebar.
  - Dark/Light mode support (foundation laid).
- **Analytics Route**:
  - Dedicated analytics visualizations.

## 📂 Folder Structure

Here is an explanation of the key directories:

```
moniepoint-pos-dashboard/
├── app/                  # Next.js App Router pages and layouts
│   ├── analytics/        # Analytics route
│   ├── transactions/     # Transactions route
│   ├── globals.css       # Global styles (Tailwind imports)
│   └── page.tsx          # Main Dashboard Overview
├── public/               # Static assets & MSW worker script
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific charts/widgets
│   │   ├── layout/       # Sidebar, Layout wrappers
│   │   └── ui/           # Generic shadcn/ui components (buttons, cards)
│   ├── hooks/            # Custom React hooks
│   ├── mocks/            # MSW handlers and setup
│   ├── store/            # Zustand state stores (e.g., useStore.ts)
│   └── utils/            # Helper functions
└── package.json          # Project dependencies and scripts
```

## 🤝 Contributing Guidelines

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

**Note**: Please ensure you run the linter and check that the builds pass before
submitting.

## 📄 License

This project is open-source and available under the **MIT License**.

## 📝 Additional Notes

- **Mock Data**: The data shown in the dashboard is generated randomly or
  statically defined in `src/mocks/handlers.ts`. It does not represent real
  financial data.
- **Tailwind v4**: This project uses the latest Tailwind CSS v4. Configuration
  is handled primarily through CSS variables in global styles.
