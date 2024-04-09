import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createUserController } from '../controllers/create-user.controller'
import { createUserBodySchema } from '../validators/create-user-body.schema'
import { createUserResponseSchema } from '../validators/create-user-response.schema'

export async function createUserRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: createUserBodySchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    createUserController,
  )
}
