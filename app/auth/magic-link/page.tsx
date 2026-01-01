import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { MagicLinkForm } from '@/components/auth/magic-link-form'

export default async function MagicLinkPage() {
  const user = await getCurrentUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 className="text-2xl font-bold text-center">Magic link</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to receive a sign-in link
          </p>
        </div>
        <MagicLinkForm />
      </div>
    </div>
  )
}

