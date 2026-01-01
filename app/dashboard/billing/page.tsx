import { requireUser } from '@/lib/auth'
import { PLAN_PRICES } from '@/lib/billing'
import { formatPrice } from '@/lib/utils'
import { Card, CardHeader } from '@/components/ui/card'
import { DowngradeButton } from '@/components/billing/downgrade-button'
import { PlanCard } from '@/components/billing/plan-card'
import { PageHeader } from '@/components/page-header'

export default async function BillingPage() {
  const user = await requireUser()

  return (
    <div className="space-y-6">
      <PageHeader title="Billing" description="Manage your subscription and plan" />

      <Card>
        <CardHeader>
          <h2 className="mb-4">Current plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold capitalize">{user.profile.plan}</p>
              <p className="text-sm text-gray-600 mt-1">
                {formatPrice(PLAN_PRICES[user.profile.plan].monthly)}/month
              </p>
            </div>
          {user.profile.plan === 'pro' && <DowngradeButton />}
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <PlanCard plan="free" isCurrent={user.profile.plan === 'free'} />
        <PlanCard plan="pro" isCurrent={user.profile.plan === 'pro'} />
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a demo billing system. In production, this would
            integrate with Stripe for payment processing and subscription management.
          </p>
        </CardHeader>
      </Card>
    </div>
  )
}

