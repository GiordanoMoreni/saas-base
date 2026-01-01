import { requireUser } from '@/lib/auth'
import { PLAN_FEATURES } from '@/lib/billing'
import { formatDate } from '@/lib/utils'
import { Card, CardHeader } from '@/components/ui/card'
import { UpgradeButton } from '@/components/billing/upgrade-button'
import { PageHeader } from '@/components/page-header'
import { FeatureList } from '@/components/feature-list'

export default async function DashboardPage() {
  const user = await requireUser()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description={user.profile.full_name || user.profile.email}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
            <p className="text-lg font-semibold">{user.profile.email}</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Plan</h2>
            <p className="text-lg font-semibold capitalize">{user.profile.plan}</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-sm font-medium text-gray-500 mb-1">Role</h2>
            <p className="text-lg font-semibold capitalize">{user.profile.role}</p>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="mb-4">Account information</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Account created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatDate(user.profile.created_at)}
              </dd>
            </div>
            {user.profile.full_name && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.profile.full_name}</dd>
              </div>
            )}
          </dl>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="mb-4">Plan features</h2>
          <FeatureList features={PLAN_FEATURES[user.profile.plan]} />
        </CardHeader>
      </Card>

      {user.profile.plan === 'free' && (
        <Card>
          <CardHeader>
          <h2 className="mb-2">Upgrade to Pro</h2>
          <p className="text-sm text-gray-600 mb-4">
            Get access to all features and unlimited usage
          </p>
          <UpgradeButton />
          </CardHeader>
        </Card>
      )}
    </div>
  )
}

