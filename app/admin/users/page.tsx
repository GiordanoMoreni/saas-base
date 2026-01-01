import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getAllUsers } from '@/lib/admin'
import { formatDate } from '@/lib/utils'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import { RoleToggleButton } from '@/components/admin/role-toggle-button'
import { PageHeader } from '@/components/page-header'

export default async function AdminUsersPage() {
  await requireAdmin()
  const users = await getAllUsers()

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage user accounts and roles" />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.full_name || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge>{user.role}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {user.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.created_at, 'short')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <RoleToggleButton userId={user.id} currentRole={user.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {users.length === 0 && (
        <Card>
          <CardHeader>
            <EmptyState
              title="No users found"
              description="There are no users in the system yet."
            />
          </CardHeader>
        </Card>
      )}
    </div>
  )
}

