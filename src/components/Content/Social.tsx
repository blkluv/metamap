import { useContext, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import UserContext from "../../context/userContext";
import SocialMenu from "../Navigation/SocialMenu";
import SocialList from "./SocialList";

const Social = () => {
  const { currentUser, users, onGetUsers } = useContext(UserContext);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    onGetUsers?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <SocialMenu users={users} handleFilter={setFilteredData} />
      <Divider
        variant="middle"
        sx={{ background: "rgb(120,120,126)", margin: "1rem 0 1.5rem 0" }}
      />
      {currentUser && users ? <SocialList data={filteredData} /> : <></>}
    </Box>
  );
};

export default Social;
