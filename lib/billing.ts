import type { Plan } from '@/types'

export const PLAN_FEATURES: Record<Plan, string[]> = {
  free: [
    'Basic features',
    'Up to 10 items',
    'Community support',
  ],
  pro: [
    'All features',
    'Unlimited items',
    'Priority support',
    'Advanced analytics',
    'API access',
    'Custom integrations',
  ],
}

export const PLAN_PRICES: Record<Plan, { monthly: number; yearly: number }> = {
  free: { monthly: 0, yearly: 0 },
  pro: { monthly: 29, yearly: 290 },
}

export function hasFeature(plan: Plan, feature: string): boolean {
  return PLAN_FEATURES[plan].includes(feature)
}

export function canAccessFeature(userPlan: Plan, requiredPlan: Plan): boolean {
  if (requiredPlan === 'free') return true
  return userPlan === 'pro'
}

export function canUpgrade(currentPlan: Plan): boolean {
  return currentPlan === 'free'
}

export function canDowngrade(currentPlan: Plan): boolean {
  return currentPlan === 'pro'
}

