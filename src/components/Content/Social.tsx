import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";
import SocialMenu from "../Navigation/SocialMenu";
import SocialList from "./SocialList";

const Social = () => {
  const { users, onGetUsers } = useContext(UserContext);
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
      <SocialList data={filteredData ? filteredData : []} />
    </Box>
  );
};

export default Social;
