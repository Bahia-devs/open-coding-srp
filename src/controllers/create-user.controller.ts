import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserService } from '../services/create-user.service'
import { ICreateUserDTO } from '../validators/create-user-body.schema'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = request.body as ICreateUserDTO

  const data = await createUserService({ name, email, password })

  reply.status(201).send(data)
}
