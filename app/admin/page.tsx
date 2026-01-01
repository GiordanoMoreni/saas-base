import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { Card, CardHeader } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'

export default async function AdminPage() {
  await requireAdmin()

  return (
    <div className="space-y-6">
      <PageHeader title="Admin" description="Administration panel" />

      <Card>
        <CardHeader>
          <h2 className="mb-4">Quick actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="block text-sm text-gray-600 hover:text-black"
            >
              → Manage users
            </Link>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

