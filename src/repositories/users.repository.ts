import { db } from '../db'
import { User } from '../entities/user'

export class UsersRepository {
  async create(user: User): Promise<void> {
    db.user.push(user)
    return Promise.resolve()
  }

  async findById(id: string): Promise<User | null> {
    const user = db.user.find((user) => {
      return user.id === id
    })

    if (!user) return null

    return Promise.resolve(user)
  }
}
