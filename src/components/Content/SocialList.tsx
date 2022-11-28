import List from "@mui/material/List";
import { UserHeader as Header, SocialListProps } from "../../utils/interfaces";

import UserHeader from "./UserHeader";

const SocialList = ({ data }: SocialListProps) => {
  return (
    <List
      sx={{
        width: "100%",
        background: "rgb(35,35,48)",
        color: "white",
        padding: 0,
        marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
        overflow: "scroll",
      }}
    >
      {data.map((user: Header) => (
        <UserHeader key={user._id} {...user} />
      ))}
    </List>
  );
};

export default SocialList;
