import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { ThemeProvider } from "@/components/theme-provider"
import { Index } from "./index"

function renderIndex() {
  return render(
    <ThemeProvider>
      <Index />
    </ThemeProvider>,
  )
}

describe("Index route", () => {
  it("renders dashboard heading", () => {
    renderIndex()
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument()
  })

  it("renders create flag button", () => {
    renderIndex()
    expect(screen.getByRole("button", { name: /create flag/i })).toBeInTheDocument()
  })
})
