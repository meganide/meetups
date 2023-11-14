/* eslint-disable consistent-return */
import { useCallback, useState } from "react"

import { useRouter } from "next/navigation"
import { signIn as nextAuthSignIn } from "next-auth/react"

type Credentials = {
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export function useAuth(isSignup: boolean) {
  const [error, setError] = useState("")
  const router = useRouter()

  const signIn = useCallback(
    async (credentials: Credentials) => {
      const { email, password } = credentials
      const response = await nextAuthSignIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (!response?.ok) {
        return setError("Invalid credentials!")
      }

      router.push("/")
    },
    [router]
  )

  const signUp = useCallback(
    async (credentials: Credentials) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()

      if (!response.ok) {
        return setError(data.error)
      }

      signIn(credentials)
    },
    [signIn]
  )

  const handleAuth = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError("")
      const data = new FormData(event.currentTarget)
      const credentials = {
        email: data.get("email"),
        password: data.get("password"),
      }

      try {
        if (isSignup) {
          signUp(credentials)
        } else {
          signIn(credentials)
        }
      } catch (error) {
        setError("Something went wrong! Try again!")
      }
    },
    [isSignup, signIn, signUp]
  )

  return { error, handleAuth }
}
