# Moniepoint POS Intelligence Dashboard

A production-grade React + TypeScript dashboard designed for Moniepoint
operations to monitor POS transactions, failed payments, and reversals in
real-time.

## 🚀 Features

- **Real-Time Transaction Health**: Live charts showing success/failure rates.
- **Smart Reversal Status**: Detailed timeline for failed transactions (Network
  vs Bank vs Device) + ETA for reversals.
- **Failure Heatmap**: Time-based analysis of failure spikes to identify network
  downtimes.
- **Proactive Alerts**: Context-aware alerts when systems are down (e.g.,
  "GTBank Network Fluctuation").

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS v4 with Moniepoint Design System
- **State Management**: Zustand (Global Alerts) + React Query (Server State)
- **Charts**: Recharts
- **Mocking**: MSW (Mock Service Worker) for realistic API simulation

## 🏗 Architecture

- `src/components/dashboard`: Core visual widgets (Charts, Heatmaps).
- `src/components/transactions`: Transaction tables and logic.
- `src/store`: Global UI state.
- `src/mocks`: Fake API handlers for offline development.
- `src/hooks`: Data fetching logic.

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the App**: Visit [http://localhost:3000](http://localhost:3000).
   _Note: MSW is enabled by default to simulate live data._
