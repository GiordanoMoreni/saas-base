'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { upgradeToPro } from '@/app/actions/billing'
import { useToast } from '@/lib/toast'
import { Button } from '@/components/ui/button'

interface UpgradeButtonProps {
  className?: string
}

export function UpgradeButton({ className }: UpgradeButtonProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()

  async function handleUpgrade() {
    startTransition(async () => {
      const result = await upgradeToPro()
      if (result?.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Plan upgraded successfully', 'success')
        router.refresh()
      }
    })
  }

  return (
    <Button onClick={handleUpgrade} disabled={isPending} className={className}>
      {isPending ? 'Upgrading...' : 'Upgrade plan'}
    </Button>
  )
}

