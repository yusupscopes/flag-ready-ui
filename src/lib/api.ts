import { z } from "zod"

// 1. Define the shape of our feature flag using Zod
export const FeatureFlagSchema = z.object({
  id: z.string().or(z.number()), // Handles UUIDs or auto-incrementing IDs
  name: z.string(),
  description: z.string().optional(),
  isEnabled: z.boolean(),
})

// Automatically infer the TypeScript type from the Zod schema
export type FeatureFlag = z.infer<typeof FeatureFlagSchema>

// 2. Setup the base URL (Assuming your Go backend runs locally on port 8080)
// Because this runs in your browser, 'localhost' refers to your host machine.
const API_URL = "http://localhost:8080/api"

// 3. Create the fetch function
export async function fetchFlags(): Promise<FeatureFlag[]> {
  const response = await fetch(`${API_URL}/flags`)

  if (!response.ok) {
    throw new Error("Failed to fetch feature flags")
  }

  const data = await response.json()

  // 4. Validate the response! If the Go backend returns bad data, this will throw an error.
  return z.array(FeatureFlagSchema).parse(data)
}
