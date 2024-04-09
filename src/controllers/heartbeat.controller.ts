import { FastifyReply, FastifyRequest } from 'fastify'
import { heartbeatService } from '../services/heartbeat.service'

export async function heartbeatController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = heartbeatService()
  reply.status(200).send(data)
}
