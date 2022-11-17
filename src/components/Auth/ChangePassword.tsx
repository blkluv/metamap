import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import UserContext from "../../context/userContext";

const ChangePassword = () => {
  const { onChangePassword } = useContext(UserContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const passwords = {
      password: String(data.get("password")),
      confirmpassword: String(data.get("confirmpassword")),
    };

    const url = window.location;
    const token = url.hash.split("#access_token=")[1];

    if (passwords) {
      onChangePassword?.(token, passwords);
    }
  };

  const CssTextField = styled(TextField)({
    input: {
      color: "white",
    },
    label: { color: "white" },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgb(120,120,126)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  });

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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="confirmpassword"
            id="confirmpassword"
            autoComplete="current-confirmpassword"
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
