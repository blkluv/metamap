import { useContext } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserContext from "../../context/userContext";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import ThemeContext from "../../context/themeContext";

const ChangePassword = () => {
  const { onChangePassword } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const {
    register: registerChangePassword,
    handleSubmit: handleRegisterChangePassword,
    reset: resetSignUp,
  } = useForm({
    defaultValues: {
      password: null,
      confirmpassword: null,
    },
  });

  const handleChangePassword = (data: {
    password: string | null;
    confirmpassword: string | null;
  }) => {
    const password = data.password?.trim();
    const confirmpassword = data.confirmpassword?.trim();

    if (!password || !confirmpassword) {
      return notify("Please complete all fields.");
    }

    if (password !== confirmpassword) return notify("Passwords don't match.");

    const url = window.location;
    const token = url.hash.split("#access_token=")[1];

    onChangePassword?.(token, { password, confirmpassword });
    resetSignUp();
  };

  const CssTextField = styled(TextField)({
    input: {
      color: palette?.text.tertiary,
    },
    label: { color: palette?.text.tertiary },
    "& label.Mui-focused": {
      color: palette?.text.tertiary,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: palette?.text.tertiary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(120,120,126)",
      },
      "&:hover fieldset": {
        borderColor: palette?.text.tertiary,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette?.text.tertiary,
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
        background: palette?.background.tertiary,
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
          color: palette?.text.tertiary,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: palette?.warning }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegisterChangePassword(
            debounce(handleChangePassword, 300)
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
            type="password"
            id="confirmpassword"
            autoComplete="current-confirmpassword"
            {...registerChangePassword("confirmpassword", {
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
