import bcrypt from "bcrypt"

export function hashPassword(password: string) {
  const saltRounds = 12
  return bcrypt.hashSync(password, saltRounds)
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword) // true
}
