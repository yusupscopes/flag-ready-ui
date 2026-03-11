import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFlag, CreateFlagSchema, type CreateFlagInput } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export const Route = createFileRoute("/create")({
  component: CreateFlagPage,
})

const FORM_ID = "create-flag-form"

function CreateFlagPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<CreateFlagInput>({
    resolver: zodResolver(CreateFlagSchema),
    defaultValues: {
      feature: "",
      enabled: false,
    },
  })

  const mutation = useMutation({
    mutationFn: createFlag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["featureFlags"] })
      navigate({ to: "/" })
    },
  })

  function onSubmit(values: CreateFlagInput) {
    mutation.mutate(values)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Create Feature Flag
        </h2>
        <p className="text-muted-foreground">
          Add a new toggle to your system.
        </p>
      </div>

      <form
        id={FORM_ID}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-md border p-6"
      >
        <FieldGroup>
          <Controller
            name="feature"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${FORM_ID}-feature`}>
                  Flag Name
                </FieldLabel>
                <Input
                  {...field}
                  id={`${FORM_ID}-feature`}
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. new-checkout-flow"
                  autoComplete="off"
                />
                <FieldDescription>
                  This is the unique key used in your code.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="enabled"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                orientation="horizontal"
                data-invalid={fieldState.invalid}
                className="flex-row items-start space-x-3 rounded-md border p-4"
              >
                <Checkbox
                  id={`${FORM_ID}-enabled`}
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  <FieldLabel
                    htmlFor={`${FORM_ID}-enabled`}
                    className="font-normal"
                  >
                    Enable Flag
                  </FieldLabel>
                  <FieldDescription>
                    Should this feature be turned on immediately?
                  </FieldDescription>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" form={FORM_ID} disabled={mutation.isPending}>
            {mutation.isPending ? "Creating..." : "Create Flag"}
          </Button>
        </div>
      </form>
    </div>
  )
}
