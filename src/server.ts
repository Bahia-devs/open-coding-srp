/* eslint-disable @typescript-eslint/no-unused-vars */
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createUserRoute } from './routes/create-user.route'
import { getUsersRoute } from './routes/get-users.route'
import { getUserRoute } from './routes/get-user.route'
import { errorHandler } from './middlewares/error-handler'
import { heartbeatRoute } from './routes/heartbeat.route'

const app = fastify()

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

// Heartbeat
app.register(heartbeatRoute)

// User
app.register(createUserRoute)
app.register(getUsersRoute)
app.register(getUserRoute)

app.listen({ port: 3333, host: 'localhost' }).then(() => {
  console.log('🚀 HTTP server running')
})
