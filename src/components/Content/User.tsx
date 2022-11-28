// import { useContext} from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
// import UserContext from "../../context/userContext";

const User = () => {
  // const { currentUser } = useContext(UserContext);

  const params = useParams();

  return <Box>{params.id}</Box>;
};

export default User;
