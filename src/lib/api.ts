import { z } from "zod"

// 1. Define the shape of our feature flag using Zod
export const FeatureFlagSchema = z.object({
  feature: z.string(),
  enabled: z.boolean(),
  cached: z.boolean(),
})

// Automatically infer the TypeScript type from the Zod schema
export type FeatureFlag = z.infer<typeof FeatureFlagSchema>

// 2. Setup the base URL (optional env; default for local Go backend on port 8080)
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080"

// Admin API key for dashboard list endpoint (fallback for local dev matches backend default)
const ADMIN_API_KEY =
  import.meta.env.VITE_ADMIN_API_KEY ?? "my-super-secure-production-key-999"

// 3. Create the fetch function (calls GET /admin/features for list of features and status)
export async function fetchFlags(): Promise<FeatureFlag[]> {
  const response = await fetch(`${API_URL}/admin/features`, {
    headers: {
      Authorization: `Bearer ${ADMIN_API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch feature flags")
  }

  const data = await response.json()

  // 4. Validate the response! If the Go backend returns bad data, this will throw an error.
  return z.array(FeatureFlagSchema).parse(data)
}

// Define the shape of data needed to CREATE a flag (no ID yet)
export const CreateFlagSchema = FeatureFlagSchema.omit({ cached: true })
export type CreateFlagInput = z.infer<typeof CreateFlagSchema>

// Function to create a new flag
// Backend returns { status, message }, not a full flag — so we return the created flag from input.
export async function createFlag(
  newFlag: CreateFlagInput
): Promise<FeatureFlag> {
  const response = await fetch(`${API_URL}/admin/flag`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ADMIN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFlag),
  })

  if (!response.ok) {
    throw new Error("Failed to create feature flag")
  }

  // Backend returns { status, message }; return the created flag from input so mutation onSuccess runs.
  return {
    feature: newFlag.feature,
    enabled: newFlag.enabled,
    cached: false,
  }
}
