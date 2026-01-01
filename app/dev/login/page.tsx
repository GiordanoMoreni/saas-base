import { devLogin } from '@/app/actions/dev'
import { Button } from '@/components/ui/button'

export default function DevLoginPage() {
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Not available</h1>
          <p className="text-gray-600 mt-2">This page is only available in development mode.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-center">Dev Login</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Quick login for development testing
          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md text-sm">
            <p className="font-medium mb-2">Fake user credentials:</p>
            <ul className="space-y-1 text-gray-600">
              <li>Email: dev@example.com</li>
              <li>Plan: free</li>
              <li>Role: user</li>
            </ul>
          </div>
          <form action={devLogin}>
            <Button type="submit" className="w-full">
              Login as Dev User
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

