import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1).optional(),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const magicLinkSchema = z.object({
  email: z.string().email(),
})

