import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight">Feature Control</h1>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 p-6 md:p-8">
        {/* The Outlet is where child routes will render */}
        <Outlet />
      </main>
    </div>
  ),
})
