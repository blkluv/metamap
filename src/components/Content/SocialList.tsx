import { useContext } from "react";
import List from "@mui/material/List";
import UserHeader from "./UserHeader";
import ThemeContext from "../../context/themeContext";
import { UserHeader as Header, SocialListProps } from "../../utils/interfaces";

const SocialList = ({ data }: SocialListProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <List
      sx={{
        width: "100%",
        background: palette?.background.primary,
        padding: 1,
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
