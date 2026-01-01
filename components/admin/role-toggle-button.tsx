'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateRole } from '@/app/actions/admin'
import { useToast } from '@/lib/toast'
import { Button } from '@/components/ui/button'

interface RoleToggleButtonProps {
  userId: string
  currentRole: 'user' | 'admin'
}

export function RoleToggleButton({ userId, currentRole }: RoleToggleButtonProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [isPending, startTransition] = useTransition()

  async function handleToggle() {
    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('role', currentRole === 'admin' ? 'user' : 'admin')

    startTransition(async () => {
      const result = await updateRole(formData)
      if (result?.error) {
        showToast(result.error, 'error')
      } else {
        showToast(
          `User role updated to ${currentRole === 'admin' ? 'user' : 'admin'}`,
          'success'
        )
        router.refresh()
      }
    })
  }

  return (
    <Button
      type="button"
      onClick={handleToggle}
      variant="ghost"
      size="sm"
      disabled={isPending}
    >
      {isPending
        ? 'Updating...'
        : currentRole === 'admin'
          ? 'Remove admin'
          : 'Make admin'}
    </Button>
  )
}

