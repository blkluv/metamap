import { useContext } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserContext from "../../context/userContext";
import { CssTextField } from "./AuthStyles";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";

const ChangePassword = () => {
  const { onChangePassword } = useContext(UserContext);

  const {
    register: registerChangePassword,
    handleSubmit: handleRegisterChangePassword,
    reset: resetSignUp,
  } = useForm({
    defaultValues: {
      password: null,
      passwordRepeat: null,
    },
  });

  const handleChangePassword = (data: {
    password: string | null;
    passwordRepeat: string | null;
  }) => {
    const password = data.password?.trim();
    const passwordRepeat = data.passwordRepeat?.trim();

    if (!password || !passwordRepeat) {
      return notify("Please complete all fields.");
    }

    if (password !== passwordRepeat) return notify("Passwords don't match.");

    const url = window.location;
    const token = url.hash.split("#access_token=")[1];

    onChangePassword?.(token, { password, passwordRepeat });
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
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegisterChangePassword(
            debounce(handleChangePassword, 400)
          )}
          sx={{ mt: 1 }}
        >
          <CssTextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="8 - 25 characters"
            {...registerChangePassword("password", {
              required: true,
              minLength: 8,
              maxLength: 25,
            })}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="passwordRepeat"
            id="passwordRepeat"
            autoComplete="current-passwordRepeat"
            {...registerChangePassword("passwordRepeat", {
              required: true,
              minLength: 8,
              maxLength: 25,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 8 }}
          >
            Change password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ChangePassword;
