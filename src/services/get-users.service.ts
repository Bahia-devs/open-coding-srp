/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '../db'

export function getUsersService(): Promise<any> {
  const users = db.user

  const usersToReturn = users.map((user) => {
    return user.toJSON()
  })

  return Promise.resolve({ users: usersToReturn })
}
