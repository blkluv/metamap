import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { notify } from "../../utils/notifications";
import debounce from "../../utils/debounce";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../utils/interfaces";
import { useAppDispatch } from "../../store/store";
import { updatePassword } from "../../store/currentUser";

const UpdatePassword = ({ transparent }: { transparent?: boolean }) => {
  const dispatch = useAppDispatch();
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  const {
    register: registerUpdatePassword,
    handleSubmit: handleRegisterUpdatePassword,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    },
  });

  const handleUpdatePassword = (data: {
    oldPassword: string | null;
    newPassword: string | null;
    confirmNewPassword: string | null;
  }) => {
    const oldpassword = data.oldPassword?.trim();
    const newpassword = data.newPassword?.trim();
    const confirmnewpassword = data.confirmNewPassword?.trim();

    if (!oldpassword || !newpassword || !confirmnewpassword) {
      return notify("Please complete all fields.");
    }

    if (newpassword !== confirmnewpassword)
      return notify("Passwords don't match.");

    dispatch(updatePassword({ oldpassword, newpassword }));
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
        height: "fit-content",
        background: transparent
          ? palette.background.primary
          : palette.background.tertiary,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: palette.warning }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box
          component="form"
          onSubmit={handleRegisterUpdatePassword(
            debounce(handleUpdatePassword, 200)
          )}
          sx={{ mt: 1 }}
        >
          <CssTextField
            margin="normal"
            required
            fullWidth
            label="Old Password"
            type="password"
            id="oldpassword"
            autoComplete="old-password"
            placeholder="8 - 25 characters"
            {...registerUpdatePassword("oldPassword", {
              required: true,
              minLength: 8,
              maxLength: 25,
            })}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            id="newpassword"
            autoComplete="new-password"
            placeholder="8 - 25 characters"
            {...registerUpdatePassword("newPassword", {
              required: true,
              minLength: 8,
              maxLength: 25,
            })}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            placeholder="8 - 25 characters"
            {...registerUpdatePassword("confirmNewPassword", {
              required: true,
              minLength: 8,
              maxLength: 25,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default UpdatePassword;
