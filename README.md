# Feature Flag Management UI

A modern, high-performance web dashboard for managing system feature flags. This application is built to interface directly with a Go-based backend API, providing a seamless, type-safe experience from the database to the DOM.

## 🚀 Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Routing:** [TanStack Router](https://tanstack.com/router/latest) (File-based, 100% type-safe)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Containerization:** Docker & Docker Compose
- **Production Server:** Nginx (Static hosting + Reverse Proxy)

## ✨ Features

- **Real-time Dashboard:** View, filter, and manage feature flags.
- **Type-Safe API Contracts:** Zod schemas guarantee the data coming from the Go backend matches the frontend's expectations.
- **Optimistic Updates & Caching:** Powered by React Query for a snappy user experience.
- **Production Ready:** Multi-stage Docker build resulting in a lightweight, highly optimized Nginx container.

## 🛠️ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Recommended for isolated development)
- Node.js 20+ (If running locally without Docker)

## 🏃 Getting Started (Development)

We use Docker to ensure a consistent development environment. The dev container maps your local files into the container, allowing Vite's Hot Module Replacement (HMR) to update the browser instantly as you code.

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd feature-flag-ui
   ```

2. **Start the development container:**

   ```bash
   docker compose up --build
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`.

   _Note: Ensure your Go backend is running locally on port 8080 (or update the `API_URL` in `src/lib/api.ts` to match your backend's address)._

## 🐳 Production Deployment

For production, the application is compiled into static HTML/JS/CSS files and served via Nginx. Nginx is also configured to act as a reverse proxy, securely forwarding `/api/*` requests to your Go backend.

1. **Build the production image:**

   ```bash
   docker build -t feature-flag-ui-prod .
   ```

2. **Run the production image locally (for testing):**
   ```bash
   docker run -p 8080:80 feature-flag-ui-prod
   ```
   Navigate to `http://localhost:8080`.

### Connecting to the Go Backend in Production

In a production environment, this UI container should be deployed alongside your Go backend container using a unified `docker-compose.yml` file.

The included `nginx.conf` expects the Go backend service to be accessible at `http://backend:8080/`. You can adjust this hostname in `nginx.conf` under the `location /api/` block to match your infrastructure.

## 📁 Project Structure

```text
src/
├── components/
│   └── ui/              # Reusable shadcn/ui components
├── lib/
│   ├── api.ts           # API client, fetchers, and Zod schemas
│   └── utils.ts         # Utility functions (Tailwind merge, etc.)
├── routes/
│   ├── __root.tsx       # Main layout wrapper
│   ├── index.tsx        # Dashboard (List flags)
│   └── create.tsx       # Create new flag form
├── index.css            # Global CSS and Tailwind variables
├── main.tsx             # App entry point (Providers & Router init)
└── routeTree.gen.ts     # Auto-generated route definitions
```

## 📝 Scripts (Without Docker)

If you prefer to run the application directly on your host machine without Docker:

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Locally preview the production build
