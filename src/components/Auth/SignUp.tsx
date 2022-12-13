import { useContext } from "react";
import { useForm } from "react-hook-form";
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
import { notify } from "../../utils/notifications";
import { CssTextField } from "./AuthStyles";
import debounce from "../../utils/debounce";

const SignUp = () => {
  const { onSignUp } = useContext(UserContext);

  const {
    register: registerSignUp,
    handleSubmit: handleRegisterSignUp,
    reset: resetSignUp,
  } = useForm({
    defaultValues: {
      username: null,
      password: null,
      passwordRepeat: null,
      email: null,
    },
  });

  const handleSignUp = (data: {
    username: string | null;
    email: string | null;
    password: string | null;
    passwordRepeat: string | null;
  }) => {
    const username = data.username?.trim();
    const email = data.email?.trim();
    const password = data.password?.trim();
    const passwordRepeat = data.passwordRepeat?.trim();

    if (!username || !email || !password || !passwordRepeat) {
      return notify("Please complete all fields.");
    }

    if (password !== passwordRepeat) return notify("Passwords don't match.");

    onSignUp?.(Object({ username, email, password, external: false }));
    resetSignUp();
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
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegisterSignUp(debounce(handleSignUp, 400))}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CssTextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label="Name"
                placeholder="3 - 30 characters"
                autoFocus
                {...registerSignUp("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                placeholder="5 - 40 characters"
                {...registerSignUp("email", {
                  required: true,
                  minLength: 5,
                  maxLength: 40,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="8 - 25 characters"
                {...registerSignUp("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 25,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                fullWidth
                label="Repeat Password"
                type="password"
                id="passwordRepeat"
                autoComplete="new-password"
                {...registerSignUp("passwordRepeat", {
                  required: true,
                  minLength: 8,
                  maxLength: 25,
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end" sx={{ mb: 8 }}>
            <Grid item>
              <Link
                component={RouterLink}
                to="/account/signin"
                variant="body2"
                replace
                sx={{ color: "white", textDecoration: "none" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
