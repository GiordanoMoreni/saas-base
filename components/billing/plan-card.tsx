import { PLAN_FEATURES, PLAN_PRICES } from '@/lib/billing'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FeatureList } from '@/components/feature-list'
import { UpgradeButton } from './upgrade-button'
import { DowngradeButton } from './downgrade-button'
import type { Plan } from '@/types'

interface PlanCardProps {
  plan: Plan
  isCurrent: boolean
}

export function PlanCard({ plan, isCurrent }: PlanCardProps) {
  const price = PLAN_PRICES[plan]
  const features = PLAN_FEATURES[plan]

  return (
    <Card
      variant={isCurrent ? 'outlined' : 'default'}
      className={isCurrent ? 'border-black bg-gray-50' : ''}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <h3 className="capitalize">{plan}</h3>
          {isCurrent && <Badge>Current</Badge>}
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold">{formatPrice(price.monthly)}</span>
          <span className="text-gray-600">/month</span>
          {plan === 'pro' && (
            <div className="text-sm text-gray-500 mt-1">
              or {formatPrice(price.yearly)}/year (save 17%)
            </div>
          )}
        </div>
        <div className="mb-6">
          <FeatureList features={features} />
        </div>
        {isCurrent ? (
          <Button disabled className="w-full">
            Current plan
          </Button>
        ) : plan === 'pro' ? (
          <UpgradeButton className="w-full" />
        ) : (
          <DowngradeButton variant="secondary" className="w-full" />
        )}
      </CardHeader>
    </Card>
  )
}

