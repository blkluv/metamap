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
import { externalSignin } from "../../store/currentUser";

const ResetPassword = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  const {
    register: registerResetPassword,
    handleSubmit: handleRegisterResetPassword,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      email: null,
    },
  });

  const handleResetPassword = (data: { email: string | null }) => {
    const useremail = data.email?.trim();

    if (!useremail) {
      return notify("Please complete all fields.");
    }

    dispatch(externalSignin(useremail));
    resetForm();
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
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegisterResetPassword(
            debounce(handleResetPassword, 400)
          )}
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
            placeholder="5 - 40 characters"
            {...registerResetPassword("email", {
              required: true,
              minLength: 5,
              maxLength: 40,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Request password
          </Button>
          <Grid container sx={{ mb: 8 }}>
            <Grid item>
              <Link
                component={RouterLink}
                to="/account/signin"
                replace
                variant="body2"
                sx={{ color: palette.text.tertiary, textDecoration: "none" }}
              >
                {"Back"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default ResetPassword;
