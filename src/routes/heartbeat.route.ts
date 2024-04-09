import { FastifyInstance } from 'fastify'
import { heartbeatController } from '../controllers/heartbeat.controller'

export async function heartbeatRoute(app: FastifyInstance) {
  app.get('/', heartbeatController)
}
