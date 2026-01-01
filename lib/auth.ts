import { redirect } from 'next/navigation'
import { createClient } from './supabase/server'
import type { Profile } from '@/types'
import { FAKE_USER, getFakeSession } from './auth-dev'

export async function getSession() {
  if (process.env.NODE_ENV === 'development' && (await getFakeSession())) {
    return {
      user: {
        id: FAKE_USER.id,
        email: FAKE_USER.email,
        created_at: FAKE_USER.created_at,
      },
    }
  }

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function getCurrentUser() {
  if (process.env.NODE_ENV === 'development' && (await getFakeSession())) {
    return {
      id: FAKE_USER.id,
      email: FAKE_USER.email,
      created_at: FAKE_USER.created_at,
      profile: FAKE_USER.profile,
    }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  return {
    ...user,
    profile: profile as Profile,
  }
}

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/sign-in')
  }
  return user
}

export async function requireAdmin() {
  const user = await requireUser()
  if (user.profile.role !== 'admin') {
    redirect('/dashboard')
  }
  return user
}

