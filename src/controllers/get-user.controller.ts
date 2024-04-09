/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify'
import { getUserService } from '../services/get-user.service'

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.params as any

  const data = await getUserService({ userId })

  reply.status(200).send(data)
}
