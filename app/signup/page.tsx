"use client"

import Auth from "@/components/Auth/Auth"
import { useAuth } from "@/hooks/useAuth"

export default function Signup() {
  const { error, handleAuth } = useAuth(true)

  return (
    <Auth
      title="Sign up"
      error={error}
      onSubmit={handleAuth}
      linkText="Already have an account? Sign in"
      navigateUrl="/signin"
    />
  )
}
