import { Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../store/store";
import { externalSignin } from "../../store/currentUser";
import { notify } from "../../utils/notifications";

const GoogleLoginButton = () => {
  const dispatch = useAppDispatch();

  const googleSuccess = async (credentialResponse: any) => {
    const response = await credentialResponse;

    try {
      dispatch(externalSignin(response));
    } catch (error: unknown) {
      if (error instanceof Error) {
        notify(error.message);
      } else if (typeof error === "string") {
        notify(error);
      }
    }
  };

  const googleFailure = (error: unknown) => {
    if (error instanceof Error) {
      notify(error.message);
    } else if (typeof error === "string") {
      notify(error);
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GoogleLogin
        theme={"filled_blue"}
        onSuccess={googleSuccess}
        // @ts-ignore
        onFailure={googleFailure}
      />
    </Box>
  );
};

export default GoogleLoginButton;
