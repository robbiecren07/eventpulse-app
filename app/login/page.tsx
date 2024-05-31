import { signInGitHub, signInGoogle } from './actions'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { GitHubIcon, GoogleIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Login - EventPluse',
  description: 'EventPulse is a JavaScript SDK designed to track events on your website.',
}

export default function Home() {
  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-[400px] flex flex-col gap-3 mt-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="text-gray-200">Please select an OAuth provider to sign in with.</p>
          </div>
          <form className="w-full pt-4">
            <Button className="w-full flex gap-4 items-center justify-center" formAction={signInGitHub}>
              <GitHubIcon className="w-6 h-6" />
              Sign in with GitHub
            </Button>
          </form>
          <form className="w-full">
            <Button className="w-full flex gap-4 items-center justify-center" formAction={signInGoogle}>
              <GoogleIcon className="w-6 h-6" />
              Sign in with Google
            </Button>
          </form>
        </div>
        {/* <form className="w-full max-w-[400px] mx-auto space-y-6 mt-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="text-gray-200">
              Please select an OAuth provider to sign in with.
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
                Log in
              </Button>
              <Button className="w-full" formAction={signup}>
                Sign up
              </Button>
            </div>
          </div>
        </form> */}
      </main>
    </>
  )
}
