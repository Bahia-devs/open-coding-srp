import { FastifyReply, FastifyRequest } from 'fastify'
import { getUsersService } from '../services/get-users.service'

export async function getUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = await getUsersService()

  reply.status(200).send(data)
}
