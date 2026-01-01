import { createClient } from './supabase/server'
import type { Profile } from '@/types'

export async function getAllUsers(): Promise<Profile[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data as Profile[]
}

export async function updateUserRole(
  userId: string,
  role: 'user' | 'admin'
): Promise<Profile | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single()

  if (error || !data) return null
  return data as Profile
}

