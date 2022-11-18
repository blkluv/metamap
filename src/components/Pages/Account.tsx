import { useContext } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";

const Account = () => {
  const { currentUser, onDeleteUser } = useContext(UserContext);

  return (
    <Box>
      <>{currentUser?.user.name}</>
      <br />
      <hr />
      <button onClick={() => onDeleteUser?.()}>Delete account</button>
    </Box>
  );
};

export default Account;
