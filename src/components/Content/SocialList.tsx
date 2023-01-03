import { useContext } from "react";
import List from "@mui/material/List";
import UserHeader from "./UserHeader";
import ThemeContext from "../../context/themeContext";
import { UserHeader as Header, SocialListProps } from "../../utils/interfaces";
import { ListItem } from "@mui/material";

const SocialList = ({ data }: SocialListProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <>
      {data.length > 0 ? (
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
      ) : (
        <ListItem
          sx={{
            borderRadius: "15px",
            background: palette?.background.tertiary,
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            padding: "1rem 1.5rem",
            alignItems: "flex-start",
            WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
            color: palette?.text.primary,
          }}
        >
          No users to display
        </ListItem>
      )}
    </>
  );
};

export default SocialList;
