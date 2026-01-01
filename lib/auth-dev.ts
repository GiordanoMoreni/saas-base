import { cookies } from 'next/headers'

const FAKE_USER_ID = '00000000-0000-0000-0000-000000000000'

export const FAKE_USER = {
  id: FAKE_USER_ID,
  email: 'dev@example.com',
  created_at: new Date().toISOString(),
  profile: {
    id: FAKE_USER_ID,
    email: 'dev@example.com',
    full_name: 'Dev User',
    role: 'user' as const,
    plan: 'free' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
}

export async function getFakeSession() {
  const cookieStore = await cookies()
  const fakeSession = cookieStore.get('dev-fake-session')
  return fakeSession?.value === 'true'
}

