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
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../utils/interfaces";
import { useAppDispatch } from "../../store/store";
import { signUp } from "../../store/currentUser";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const palette = useSelector((state: ReduxState) => state.theme.palette);

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

    dispatch(signUp({ username, email, password, external: false }));
    resetSignUp();
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
                sx={{ color: palette.text.tertiary, textDecoration: "none" }}
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
