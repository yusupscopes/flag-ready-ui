import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />)
    expect(screen.getByRole("heading", { name: /feature flag dashboard/i })).toBeInTheDocument()
  })

  it("renders the intro text", () => {
    render(<App />)
    expect(
      screen.getByText(/tailwind css and shadcn\/ui are successfully wired up!/i),
    ).toBeInTheDocument()
  })

  it("renders the button", () => {
    render(<App />)
    expect(screen.getByRole("button", { name: /test button/i })).toBeInTheDocument()
  })
})
