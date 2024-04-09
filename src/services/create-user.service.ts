import { randomUUID } from 'node:crypto'
import { User } from '../entities/user'
import { ICreateUserDTO } from '../validators/create-user-body.schema'
import { ICreateUserResponseDTO } from '../validators/create-user-response.schema'
import { UsersRepository } from '../repositories/users.repository'

export async function createUserService(
  params: ICreateUserDTO,
): Promise<ICreateUserResponseDTO> {
  const usersRepository = new UsersRepository()
  const { name, email, password } = params

  const userId = randomUUID()
  const user = new User({ id: userId, name, email, password })

  await usersRepository.create(user)

  return Promise.resolve({ user: user.toJSON() })
}
