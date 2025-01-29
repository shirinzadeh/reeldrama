import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 12

export async function hashPassword(password: string) {
  return await hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}