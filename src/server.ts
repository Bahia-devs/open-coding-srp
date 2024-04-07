/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'node:crypto'
import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

class BadRequest extends Error {}

class User {
  id: string
  name: string
  email: string
  password: string

  constructor(params: {
    id: string
    name: string
    email: string
    password: string
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.password = params.password
  }
}

const app = fastify()

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const db: { user: User[] } = {
  user: [],
}

app.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: `Error validating request`,
        errors: error.flatten().fieldErrors,
      })
    }

    if (error instanceof BadRequest) {
      return reply.status(400).send({ message: error.message })
    }

    console.log(error)

    return reply.status(500).send({ message: 'Internal Server Error' })
  },
)

app.get('/', (request, reply) => {
  reply.status(200).send('Bahia devs SRP Server')
})

app.withTypeProvider<ZodTypeProvider>().post(
  '/users',
  {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
      response: {
        201: z.object({
          user: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
        }),
      },
    },
  },
  (request, reply) => {
    const { name, email, password } = request.body

    const userId = randomUUID()
    const user = new User({ id: userId, name, email, password })

    db.user.push(user)

    const userToReturn = {
      ...user,
      password: undefined,
    }

    reply.status(201).send({ user: userToReturn })
  },
)

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
  (request, reply) => {
    const users = db.user

    const usersToReturn = users.map((user) => {
      return {
        ...user,
        password: undefined,
      }
    })

    reply.status(200).send({ users: usersToReturn })
  },
)

app.withTypeProvider<ZodTypeProvider>().get(
  '/users/:userId',
  {
    schema: {
      params: z.object({
        userId: z.string(),
      }),
      response: {
        200: z.object({
          user: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
        }),
      },
    },
  },
  (request, reply) => {
    const { userId } = request.params

    const user = db.user.find((user) => {
      return user.id === userId
    })

    if (!user) {
      throw new BadRequest('User not found')
    }

    const userToReturn = {
      ...user,
      password: undefined,
    }

    reply.status(200).send({ user: userToReturn })
  },
)

app.listen({ port: 3333, host: 'localhost' }).then(() => {
  console.log('🚀 HTTP server running')
})
