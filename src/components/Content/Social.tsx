import { useContext, useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";
import SocialMenu from "../Navigation/SocialMenu";
import SocialList from "./SocialList";

const Social = () => {
  const { users, onGetUsers } = useContext(UserContext);
  const [filteredData, setFilteredData] = useState([]);
  const socialMenuRef = useRef();

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
        overflow: "scroll",
      }}
    >
      <SocialMenu
        users={users}
        handleFilter={setFilteredData}
        scrollRef={socialMenuRef}
      />
      <SocialList
        data={filteredData ? filteredData : []}
        scrollRef={socialMenuRef}
      />
    </Box>
  );
};

export default Social;
