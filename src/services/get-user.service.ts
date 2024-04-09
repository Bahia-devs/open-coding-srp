/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequest } from '../errors/bad-request.error'
import { UsersRepository } from '../repositories/users.repository'

interface IGetUserDTO {
  userId: string
}

export async function getUserService(params: IGetUserDTO): Promise<any> {
  const usersRepository = new UsersRepository()
  const { userId } = params

  const user = await usersRepository.findById(userId)

  if (!user) {
    throw new BadRequest('User not found')
  }

  return Promise.resolve({ user: user.toJSON() })
}
