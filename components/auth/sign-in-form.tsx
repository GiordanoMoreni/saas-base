'use client'

import { useFormState } from 'react-dom'
import { signIn } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function SignInForm() {
  const [state, formAction] = useFormState(signIn, null)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input id="password" name="password" type="password" required />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <Button type="submit" className="w-full">
        Sign in
      </Button>
      <div className="text-center text-sm">
        <Link href="/auth/magic-link" className="text-gray-600 hover:text-black">
          Use magic link instead
        </Link>
      </div>
    </form>
  )
}

