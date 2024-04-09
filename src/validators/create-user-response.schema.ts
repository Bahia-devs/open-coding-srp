import { z } from 'zod'

export const createUserResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
})

export type ICreateUserResponseDTO = z.infer<typeof createUserResponseSchema>
