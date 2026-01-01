'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { downgradeToFree } from '@/app/actions/billing'
import { useToast } from '@/lib/toast'
import { Button } from '@/components/ui/button'

interface DowngradeButtonProps {
  variant?: 'primary' | 'secondary'
  className?: string
}

export function DowngradeButton({ variant = 'secondary', className }: DowngradeButtonProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()

  async function handleDowngrade() {
    startTransition(async () => {
      const result = await downgradeToFree()
      if (result?.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Plan downgraded successfully', 'success')
        router.refresh()
      }
    })
  }

  return (
    <Button onClick={handleDowngrade} disabled={isPending} variant={variant} className={className}>
      {isPending ? 'Downgrading...' : 'Downgrade to Free'}
    </Button>
  )
}

