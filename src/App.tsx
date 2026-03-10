import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Feature Flag Dashboard
        </h1>
        <p className="text-muted-foreground">
          Tailwind CSS and shadcn/ui are successfully wired up!
        </p>
        <Button>Test Button</Button>
      </div>
    </div>
  )
}

export default App
