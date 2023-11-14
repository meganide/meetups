import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Image from "next/image"
import Link from "next/link"

import Logo from "@/app/icon.png"
import Copyright from "@/components/Copyright"

type SignupProps = {
  title: string
  linkText: string
  navigateUrl: string
  error: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function Auth({
  title,
  linkText,
  navigateUrl,
  error,
  onSubmit,
}: SignupProps) {
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
            {title}
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
              {title}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  className="text-blue-600 hover:text-blue-900"
                  href={navigateUrl}
                >
                  {linkText}
                </Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
