import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import UserContext from "../../context/userContext";
import GoogleLoginButton from "./GoogleLogin";
import { Divider } from "@mui/material";
import { CssTextField } from "./AuthStyles";

const SignIn = () => {
  const { onSignIn } = useContext(UserContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (userData) {
      onSignIn?.(Object(userData));
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: "1px solid rgb(120,120,126)",
        borderRadius: "25px",
        height: "fit-content",
        background: "rgb(53,51,64)",
      }}
    >
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "rgb(235, 110, 105)" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <CssTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            Sign In
          </Button>
          <Divider
            variant="middle"
            sx={{ background: "rgb(120,120,126)", margin: "1rem" }}
          />
          <GoogleLoginButton />
          <Grid container sx={{ mb: 8 }}>
            <Grid item xs>
              <Link
                replace
                component={RouterLink}
                to="/account/resetpassword"
                variant="body2"
                sx={{ color: "white", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                replace
                component={RouterLink}
                to="/account/signup"
                variant="body2"
                sx={{ color: "white", textDecoration: "none" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignIn;
