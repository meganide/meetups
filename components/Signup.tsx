"use client"

import { useCallback, useState } from "react"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import { signIn } from "next-auth/react"

import Logo from "@/app/icon.png"

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      className="mt-2"
    >
      {"Copyright © Meetups "}
      {new Date().getFullYear()}.
    </Typography>
  )
}

export default function SignInSide() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setError("")
      const data = new FormData(event.currentTarget)

      const email = data.get("email")
      const password = data.get("password")
      const credentials = {
        email,
        password,
      }

      if (isSignUp) {
        try {
          const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          })
          const data = await response.json()

          if (!response.ok) {
            setError(data.error)
          }

          setIsSignUp(false)
        } catch (error) {
          console.log(error)
          setError("Something went wrong! Try again!")
        }
      } else {
        const response = await signIn("credentials", {
          redirect: false,
          email,
          password,
        })
        if (!response?.ok) {
          setError("Invalid credentials!")
        }
      }
    },
    [isSignUp]
  )

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Image src={Logo} alt="Logo" />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign up" : "Sign in"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && (
              <Typography variant="body2" color="red">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="bg-blue-500"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container>
              <Grid item>
                <Typography
                  variant="body1"
                  className="cursor-pointer italic text-blue-800 hover:text-blue-950"
                  onClick={() => setIsSignUp((prev) => !prev)}
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
