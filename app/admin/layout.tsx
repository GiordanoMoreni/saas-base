import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/admin" className="text-xl font-semibold">
                Admin
              </Link>
              <Link
                href="/admin/users"
                className="text-sm text-gray-600 hover:text-black"
              >
                Users
              </Link>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-black"
              >
                Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
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

