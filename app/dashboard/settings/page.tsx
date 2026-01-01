import { requireUser } from '@/lib/auth'
import { formatDate } from '@/lib/utils'
import { Card, CardHeader } from '@/components/ui/card'
import { PageHeader } from '@/components/page-header'

export default async function SettingsPage() {
  const user = await requireUser()

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account settings" />

      <Card>
        <div className="divide-y divide-gray-200">
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
            <p className="text-sm text-gray-900">{user.profile.email}</p>
          </CardHeader>
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Full name</h2>
            <p className="text-sm text-gray-900">
              {user.profile.full_name || 'Not set'}
            </p>
          </CardHeader>
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Plan</h2>
            <p className="text-sm text-gray-900 capitalize">{user.profile.plan}</p>
          </CardHeader>
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Role</h2>
            <p className="text-sm text-gray-900 capitalize">{user.profile.role}</p>
          </CardHeader>
          <CardHeader>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Account created</h2>
            <p className="text-sm text-gray-900">
              {formatDate(user.profile.created_at)}
            </p>
          </CardHeader>
        </div>
      </Card>
    </div>
  )
}

