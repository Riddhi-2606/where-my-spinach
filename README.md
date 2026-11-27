# VegVoyage NRI

VegVoyage NRI is a premium SaaS-style web application tailored for vegetarian, vegan, and Jain travellers, as well as the Indian diaspora (NRI lifestyle). It provides country-wise food guides, Veg Safety Scores, and a specialized dietary Translation Card Generator to help users travel confidently around the world.

## Features

- **Responsive Modern UI**: A clean, premium, startup-like interface with glassmorphism effects, smooth animations, and a cohesive "travel + food" aesthetic.
- **Simulated Authentication Flow**: Users can sign up for a 7-day free trial or log into their accounts. The auth state is persisted locally using React Context and `localStorage`.
- **Protected Dashboard**: A members-only area where users can access premium resources and view saved destinations.
- **Dietary Translation Card Generator**: An interactive tool that generates restaurant-safe scripts (Jain, Vegan, Vegetarian) translated into 6 languages (Korean, French, Italian, Arabic, Thai) to show waiters abroad.
- **Veg Safety Score**: A directory of countries with safety scores indicating how easy it is to travel there with strict Indian dietary restrictions.
- **Reusable Component Architecture**: Built using a modular React component structure (Navbar, Footer, Button, Card, etc.).

## Technology Stack

- **Framework**: React 18 powered by Vite.
- **Routing**: React Router DOM (`v6`) for single-page application navigation and protected routes.
- **Styling**: Vanilla CSS utilizing CSS Custom Properties (variables) for a centralized design system. No Tailwind CSS is used, ensuring maximum flexibility and adherence to raw CSS best practices.
- **Icons**: Lucide React for consistent, lightweight, and modern SVG iconography.
- **Typography**: Google Fonts (Outfit for headings, Inter for body).

## Project Structure

```
├── src
│   ├── components       # Reusable UI components
│   │   ├── Button.jsx & Button.css
│   │   ├── Card.jsx & Card.css
│   │   ├── Navbar.jsx & Navbar.css
│   │   ├── Footer.jsx & Footer.css
│   │   └── TranslationCardGenerator.jsx & .css
│   ├── context          # Global state management
│   │   └── AuthContext.jsx  (Simulated auth logic)
│   ├── pages            # Application routes
│   │   ├── Home.jsx & Home.css
│   │   ├── Auth.jsx & Auth.css
│   │   ├── Dashboard.jsx & Dashboard.css
│   │   ├── Pricing.jsx & Pricing.css
│   │   └── Destinations.jsx & Destinations.css
│   ├── App.jsx          # Route definitions
│   ├── index.css        # Global CSS variables, animations, utilities
│   └── main.jsx         # React application entry point
```

## How Simulated Auth Works

The application uses `AuthContext.jsx` to simulate user authentication without needing a backend server:
1. When a user "Logs In" or "Starts a Free Trial" on the `/signup` page, the context creates a mock user object.
2. This user object is stored in the browser's `localStorage` (`vegvoyage_user`).
3. The context provides a `useAuth` hook which exposes the `user` state, `login()`, `signup()`, and `logout()` functions.
4. The `<ProtectedRoute>` wrapper in `App.jsx` checks if the `user` exists. If not, it redirects unauthorized users attempting to access the `/dashboard` back to `/login`.

## Setup & Running Locally

To run this project locally:

1. Make sure you have Node.js installed.
2. Clone the repository and navigate into the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit the URL provided by Vite (usually `http://localhost:5173`).
