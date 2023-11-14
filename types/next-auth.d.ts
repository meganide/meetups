/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from "next-auth/jwt"

import type { Role } from "."
import type { $Enums } from "@prisma/client"
import type { DefaultSession, User } from "next-auth"
import type { DefaultJWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: UserId
    error?: "RefreshAccessTokenError"
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & {
      id: UserId
    }
    error?: "RefreshAccessTokenError"
  }
}
