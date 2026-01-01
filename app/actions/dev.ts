'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function devLogin() {
  if (process.env.NODE_ENV !== 'development') {
    return { error: 'Not available in production' }
  }

  const cookieStore = await cookies()
  cookieStore.set('dev-fake-session', 'true', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

