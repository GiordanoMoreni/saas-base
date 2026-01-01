'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'
import { updateUserRole } from '@/lib/admin'
import { z } from 'zod'

const updateRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['user', 'admin']),
})

export async function updateRole(formData: FormData) {
  await requireAdmin()

  const rawData = {
    userId: formData.get('userId') as string,
    role: formData.get('role') as 'user' | 'admin',
  }

  const result = updateRoleSchema.safeParse(rawData)
  if (!result.success) {
    return { error: 'Invalid data' }
  }

  const updated = await updateUserRole(result.data.userId, result.data.role)
  if (!updated) {
    return { error: 'Failed to update role' }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

