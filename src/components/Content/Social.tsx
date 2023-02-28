import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import SocialMenu from "../Navigation/SocialMenu";
import SocialList from "./SocialList";
import { getUsers } from "../../store/users";
import { UserHeader } from "../../utils/interfaces";

const Social = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [users, setUsers] = useState<UserHeader[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const socialMenuRef = useRef();

  const getAllUsers = async () => {
    setLoading(true);
    const users = await getUsers();
    users && setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
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
        users={users}
        loading={loading}
        data={filteredData ? filteredData : []}
        scrollRef={socialMenuRef}
      />
    </Box>
  );
};

export default Social;
