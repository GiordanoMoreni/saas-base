'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signUpSchema, signInSchema, magicLinkSchema } from '@/schemas/auth'
import { env } from '@/lib/env'

export async function signUp(_prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const result = signUpSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
  })

  if (!result.success) {
    return { error: 'Invalid form data' }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName || null,
      },
    },
  })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signIn(_prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const result = signInSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (!result.success) {
    return { error: 'Invalid email or password' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function sendMagicLink(_prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const result = magicLinkSchema.safeParse({
    email: formData.get('email') as string,
  })

  if (!result.success) {
    return { error: 'Invalid email address' }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: result.data.email,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) return { error: error.message }

  return { success: true }
}

export async function signOut() {
  if (process.env.NODE_ENV === 'development') {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const fakeSession = cookieStore.get('dev-fake-session')
    if (fakeSession?.value === 'true') {
      cookieStore.delete('dev-fake-session')
      revalidatePath('/', 'layout')
      redirect('/auth/sign-in')
      return
    }
  }

  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/sign-in')
}

