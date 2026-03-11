import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme-provider"
import { Dashboard } from "./index"

vi.mock("@/lib/api", () => ({
  fetchFlags: vi.fn(() => Promise.resolve([])),
}))

function renderDashboard() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return render(
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </ThemeProvider>,
  )
}

describe("Dashboard route", () => {
  it("renders dashboard heading", () => {
    renderDashboard()
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument()
  })

  it("renders create flag button", () => {
    renderDashboard()
    expect(screen.getByRole("button", { name: /create flag/i })).toBeInTheDocument()
  })
})
