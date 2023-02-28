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
import GoogleLoginButton from "./GoogleLogin";
import { Divider, TextField } from "@mui/material";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";
import styled from "@emotion/styled";
import { useAppDispatch } from "../../store/store";
import { signin, signUpDemo } from "../../store/currentUser";
import { ReduxState } from "../../utils/interfaces";
import { useSelector } from "react-redux";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const palette = useSelector((state: ReduxState) => state.theme.palette);

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

    dispatch(signin({ email, password }));
    resetSignIn();
  };

  const CssTextField = styled(TextField)({
    input: {
      color: palette.text.tertiary,
    },
    label: { color: palette.text.tertiary },
    "& label.Mui-focused": {
      color: palette.text.tertiary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: palette.text.tertiary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(120,120,126)",
      },
      "&:hover fieldset": {
        borderColor: palette.text.tertiary,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.text.tertiary,
      },
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        borderRadius: "25px",
        height: "fit-content",
        background: palette.background.tertiary,
        WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
      }}
    >
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: palette.text.tertiary,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: palette.warning }}>
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
            onClick={() => dispatch(signUpDemo())}
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              mb: 1,
              color: palette.text.tertiary,
              background: palette.background.tertiary,
            }}
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
                sx={{ color: palette.text.tertiary, textDecoration: "none" }}
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
                sx={{ color: palette.text.tertiary, textDecoration: "none" }}
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
