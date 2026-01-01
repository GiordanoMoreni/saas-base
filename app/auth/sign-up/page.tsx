import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { SignUpForm } from '@/components/auth/sign-up-form'

export default async function SignUpPage() {
  const user = await getCurrentUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 className="text-2xl font-bold text-center">Create account</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}

