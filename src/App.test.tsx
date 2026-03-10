import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { App } from "./App"

describe("App", () => {
  it("renders the main heading", () => {
    render(<App />)
    expect(screen.getByRole("heading", { name: /project ready!/i })).toBeInTheDocument()
  })

  it("renders the intro text", () => {
    render(<App />)
    expect(screen.getByText(/you may now add components and start building/i)).toBeInTheDocument()
  })

  it("renders the button", () => {
    render(<App />)
    expect(screen.getByRole("button", { name: /button/i })).toBeInTheDocument()
  })
})
