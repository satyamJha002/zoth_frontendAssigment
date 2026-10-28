# ⚡ Zoth Web3 DeFi Vault & Allocation Platform

A state-of-the-art, cyberpunk-themed Web3 DeFi Vault and Token Allocation platform built for the **Zoth Frontend Engineering Assignment**. 

Engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Shadcn UI (Base UI)**, and **TanStack React Query v5**.

---

## 🚀 Quick Start (How to Run Locally)

Follow these simple steps to run the application on your local machine:

### 1. Prerequisites
Ensure you have **Node.js (v18.18 or higher / v20+ recommended)** and **npm** installed:
```bash
node -v
npm -v
```

### 2. Navigate to the App Directory
```bash
cd demo-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Launch Development Server
```bash
npm run dev
```

The application will be live at:
👉 **[http://localhost:3000](http://localhost:3000)**

*(Optional) To create and run a production build:*
```bash
npm run build
npm start
```

---

## 🎯 What Was Built & Implemented

### 1. 🔄 Contextual 6-Step Web3 DeFi Funnel Flow
Instead of presenting disjointed screens or intrusive modal overlays, the UI features an **in-place contextual transaction workflow** housed in the Hero section. Users are guided through a cohesive, recruiter-grade DeFi journey:

```
[1. Overview] ➔ [2. Eligibility] ➔ [3. Tier Selection] ➔ [4. Deposit / Swap] ➔ [5. Confirmation] ➔ [6. Dual Tranche]
```

- **Step 1: Vault Overview**: Live vault telemetry, target cap, APY, dynamic progress bar, and primary/secondary CTAs.
- **Step 2: Interactive Eligibility Checklist**: Verification criteria items with instant toggles, select-all/clear-all controls, and a live attested counter (`x/4 Attested`).
- **Step 3: Tier Comparison & Selection**: Side-by-side tier comparison cards with 8 structured data metrics and dedicated `[XX]` selection triggers.
- **Step 4: Deposit & Allocation**:
  - Interactive token selector dropdown on `[XX] ˅` matching the user specification.
  - Dual-input swap architecture with centered action icon.
  - Terms & conditions checkbox with **dynamic button activation** (the `Lorem ipsum` button remains disabled until terms are accepted).
- **Step 5: Confirmation & Telemetry Summary**: Graphic preview, full specification breakdown, and dual primary/secondary action triggers.
- **Step 6: Dual Tranche Execution**: Multi-card tranche distribution displaying allocated metrics and execution buttons.
- **Bidirectional Breadcrumb Stepper**: Users can jump directly between completed steps, step backward, or restart the flow at any point.

---

### 2. ⏱️ Real-Time Countdown Engine & Mock API via TanStack Query
- **Mock API Route (`/api/sale`)**:
  - Returns structured live vault state including `endTime`, `targetCapUsd`, `totalRaisedUsd`, `progressPercentage`, `targetApy`, and `tranches`.
- **TanStack React Query v5 Integration**:
  - Integrated with `QueryClientProvider` in `src/app/providers.tsx` for caching, automatic background revalidation, and loading states.
- **Reactive Real-Time Countdown Hook (`useCountdown.ts`)**:
  - Automatically calculates `days : hours : mins : secs` from `saleData.endTime`.
  - Ticks continuously every second via an active interval without causing unnecessary re-renders.

---

### 3. 🎨 Full Shadcn UI Integration (Zero Visual Regression)
All five core components were refactored to use accessible **Shadcn UI** primitives while **strictly preserving 100% of the custom sci-fi HUD aesthetic, colors, and styling**:

| Component | Shadcn UI Primitives Used |
|---|---|
| `Navbar.tsx` | `Button`, `Badge`, `Separator`, `DropdownMenu` |
| `HeroSection.tsx` | `Button`, `Checkbox`, `Progress`, `Badge`, `Card` |
| `TimelineSection.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Badge`, `Separator` |
| `Footer.tsx` | `Input`, `Button`, `Separator` |
| `MarqueeBar.tsx` | `Badge`, `Separator` |

#### Installed Shadcn Primitives in `src/components/ui/`:
- `button.tsx` (Outlined & solid cyberpunk variants)
- `checkbox.tsx` (Interactive Base UI checkbox with orange glow)
- `progress.tsx` (Gradient progress track with glow filters)
- `badge.tsx` (HUD telemetry badges)
- `card.tsx` (Obsidian glass containers)
- `input.tsx` (Cyberpunk monospace input fields)
- `separator.tsx` (Clean section dividers)
- `dropdown-menu.tsx` (Floating HUD dropdown menus)

---

### 4. 💎 Rich Aesthetic & Micro-Interactions
- **Cyberpunk / Sci-Fi HUD Theme**: Deep obsidian black (`#050302`, `#070402`), neon amber/orange accents (`#ff3b00`, `#ff4e00`), and subtle border glow shadows.
- **HUD Corner Brackets**: Sci-Fi CAD corner markers on cards and primary buttons (`border-t-2`, `border-l-2`, etc.).
- **Infinite Smooth Marquee (`MarqueeBar.tsx`)**: Zero-jank continuous partner carousel running at 60fps with hover-to-pause functionality.
- **Interactive Navbar Dropdowns**: Multiple options, clipboard copy integration for `[XX]`, external link icons, and mobile responsiveness.

---

## 📂 Project Architecture

```
demo-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── sale/
│   │   │       └── route.ts          # Mock DeFi Sale API endpoint
│   │   ├── component/
│   │   │   ├── Navbar.tsx            # Header with dropdowns & copy action
│   │   │   ├── HeroSection.tsx       # Core 6-Step DeFi Funnel & Telemetry
│   │   │   ├── MarqueeBar.tsx        # Infinite smooth partner marquee
│   │   │   ├── TimelineSection.tsx   # Milestone stepper & metric table
│   │   │   └── Footer.tsx            # Newsletter form & legal disclaimer
│   │   ├── globals.css               # Design tokens & Tailwind setup
│   │   ├── layout.tsx                # Root layout with QueryProvider
│   │   ├── page.tsx                  # Landing page composition
│   │   └── providers.tsx             # TanStack Query client wrapper
│   ├── components/
│   │   └── ui/                       # Shadcn UI primitives
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── progress.tsx
│   │       └── separator.tsx
│   ├── hooks/
│   │   └── useCountdown.ts           # Real-time ticking countdown hook
│   └── lib/
│       └── utils.ts                  # Class merger utility (`cn`)
├── components.json                   # Shadcn UI configuration
├── package.json                      # Dependencies & npm scripts
└── README.md                         # Documentation
```

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **State & Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Component Primitives**: [Shadcn UI](https://ui.shadcn.com/) / [@base-ui/react](https://base-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🧪 Testing Verification Checklist

- [x] **Dev Server**: Runs cleanly on `http://localhost:3000` with 0 build or lint errors.
- [x] **TanStack Query**: Sale data is dynamically fetched from `/api/sale`.
- [x] **Live Clock**: Countdown timer runs and decrements seconds in real time.
- [x] **Funnel Navigation**: Seamless navigation across all 6 screens with zero page reload.
- [x] **Dropdown Selector**: `[XX] ˅` opens the option menu and updates selection.
- [x] **Checkbox Guard**: Dynamic enabling/disabling of the primary `Lorem ipsum` deposit CTA.
- [x] **Component Architecture**: 100% powered by reusable Shadcn UI components.
- [x] **Responsive Design**: Flawlessly adapts from mobile screens (375px) up to ultra-wide displays (1440px+).
