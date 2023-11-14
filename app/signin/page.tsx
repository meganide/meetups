"use client"

import Auth from "@/components/Auth"
import { useAuth } from "@/hooks/useAuth"

export default function Signin() {
  const { error, handleAuth } = useAuth(false)

  return (
    <Auth
      title="Sign in"
      error={error}
      onSubmit={handleAuth}
      linkText="Don't have an account? Sign up"
      navigateUrl="/signup"
    />
  )
}
