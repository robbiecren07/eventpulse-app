import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <form>
      <div className="mx-auto max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              suppressHydrationWarning={true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              suppressHydrationWarning={true}
            />
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="w-full" formAction={login}>
              Sign in
            </Button>
            <Button className="w-full" formAction={signup}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
