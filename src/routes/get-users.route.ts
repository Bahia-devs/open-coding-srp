import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUsersController } from '../controllers/get-users.controller'

export async function getUsersRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      schema: {
        response: {
          200: z.object({
            users: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
              }),
            ),
          }),
        },
      },
    },
    getUsersController,
  )
}
