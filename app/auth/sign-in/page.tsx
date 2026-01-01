import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import { SignInForm } from '@/components/auth/sign-in-form'

export default async function SignInPage() {
  const user = await getCurrentUser()
  if (user) {
    redirect('/dashboard')
  }

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h1 className="text-2xl font-bold text-center">Sign in</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <SignInForm />
        {isDev && (
          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/dev/login"
              className="block text-center text-sm text-gray-600 hover:text-black"
            >
              Dev: Quick login →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

