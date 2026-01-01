'use client'

import { useFormState } from 'react-dom'
import { sendMagicLink } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function MagicLinkForm() {
  const [state, formAction] = useFormState(sendMagicLink, null)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600">
          Check your email for the magic link
        </p>
      )}
      <Button type="submit" className="w-full">
        Send magic link
      </Button>
      <div className="text-center text-sm">
        <Link href="/auth/sign-in" className="text-gray-600 hover:text-black">
          Back to sign in
        </Link>
      </div>
    </form>
  )
}

