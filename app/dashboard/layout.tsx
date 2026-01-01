import Link from 'next/link'
import { requireUser } from '@/lib/auth'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/dashboard" className="text-xl font-semibold">
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-sm text-gray-600 hover:text-black hidden sm:block"
              >
                Settings
              </Link>
              <Link
                href="/dashboard/billing"
                className="text-sm text-gray-600 hover:text-black hidden sm:block"
              >
                Billing
              </Link>
              {user.profile.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-sm text-gray-600 hover:text-black hidden sm:block"
                >
                  Admin
                </Link>
              )}
              {process.env.NODE_ENV === 'development' && (
                <span className="text-xs text-gray-400 hidden sm:inline">DEV</span>
              )}
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.profile.email}
              </span>
              <form action={signOut}>
                <Button type="submit" variant="ghost" className="text-sm">
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

