'use server'

import { revalidatePath } from 'next/cache'
import { requireUser } from '@/lib/auth'
import { updateProfile } from '@/lib/profiles'
import { canUpgrade, canDowngrade } from '@/lib/billing'

export async function upgradeToPro() {
  const user = await requireUser()

  if (!canUpgrade(user.profile.plan)) {
    return { error: 'Already on Pro plan' }
  }

  const updated = await updateProfile(user.id, { plan: 'pro' })
  if (!updated) {
    return { error: 'Failed to upgrade plan' }
  }

  revalidatePath('/', 'layout')
  return { success: true, plan: 'pro' }
}

export async function downgradeToFree() {
  const user = await requireUser()

  if (!canDowngrade(user.profile.plan)) {
    return { error: 'Already on Free plan' }
  }

  const updated = await updateProfile(user.id, { plan: 'free' })
  if (!updated) {
    return { error: 'Failed to downgrade plan' }
  }

  revalidatePath('/', 'layout')
  return { success: true, plan: 'free' }
}


