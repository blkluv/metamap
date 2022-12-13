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
import GoogleLoginButton from "./GoogleLogin";
import { Divider } from "@mui/material";
import { CssTextField } from "./AuthStyles";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";

const SignIn = () => {
  const { onSignIn, onSignUpDemo } = useContext(UserContext);

  const {
    register: registerSignIn,
    handleSubmit: handleRegisterSignIn,
    reset: resetSignIn,
  } = useForm({
    defaultValues: {
      password: null,
      email: null,
    },
  });

  const handleSignIn = (data: {
    email: string | null;
    password: string | null;
  }) => {
    const email = data.email?.trim();
    const password = data.password?.trim();

    if (!email || !password) {
      notify("Please complete all fields.");
      return;
    }

    onSignIn?.(Object({ email, password }));
    resetSignIn();
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

        <Box
          component="form"
          onSubmit={handleRegisterSignIn(debounce(handleSignIn, 400))}
          sx={{ mt: 1 }}
        >
          <CssTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...registerSignIn("email", {
              required: true,
              minLength: 5,
              maxLength: 40,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...registerSignIn("password", {
              required: true,
              minLength: 8,
              maxLength: 25,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => onSignUpDemo?.()}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1, color: "black", background: "white" }}
          >
            DEMO
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
