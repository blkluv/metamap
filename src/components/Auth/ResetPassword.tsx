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
import { CssTextField } from "./AuthStyles";
import { notify } from "../../utils/notifications";

const ResetPassword = () => {
  const { onResetPassword } = useContext(UserContext);

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

    onResetPassword?.(useremail);
    resetForm();
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
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegisterResetPassword(handleResetPassword)}
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
                sx={{ color: "white", textDecoration: "none" }}
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
