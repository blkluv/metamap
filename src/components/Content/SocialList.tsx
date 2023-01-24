import { useContext } from "react";
import List from "@mui/material/List";
import UserHeader from "./UserHeader";
import ThemeContext from "../../context/themeContext";
import { UserHeader as Header, SocialListProps } from "../../utils/interfaces";
import { Box, ListItem } from "@mui/material";

const SocialList = ({ data }: SocialListProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <>
      {data.length > 0 ? (
        <List
          sx={{
            width: "100%",
            background: palette?.background.primary,
            padding: ".5rem",
            marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
            overflow: "scroll",
          }}
        >
          {data.map((user: Header) => (
            <UserHeader key={user._id} {...user} />
          ))}
        </List>
      ) : (
        <Box sx={{ padding: "0 .5rem" }}>
          <ListItem
            sx={{
              borderRadius: "15px",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              padding: "1rem 1.5rem",
              alignItems: "flex-start",
              border: `1px solid ${palette?.background.tertiary}`,
              WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              color: palette?.text.primary,
              width: "fit-content",
            }}
          >
            No users to display
          </ListItem>
        </Box>
      )}
    </>
  );
};

export default SocialList;
