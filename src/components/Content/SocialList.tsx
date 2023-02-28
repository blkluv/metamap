import List from "@mui/material/List";
import UserHeader from "./UserHeader";
import {
  UserHeader as Header,
  SocialListProps,
  ReduxState,
} from "../../utils/interfaces";
import { Box, ListItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ScrollToTheTop from "../Elements/ScrollToTheTop";
import { useSelector } from "react-redux";

const SocialList = ({ data, users, scrollRef, loading }: SocialListProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          {data.length > 0 ? (
            <List
              sx={{
                width: "100%",
                background: palette.background.primary,
                padding: ".5rem",
                marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
              }}
            >
              {data.map((user: Header) => (
                <UserHeader key={user._id} {...user} />
              ))}
              <ScrollToTheTop minLength={5} data={data} scrollRef={scrollRef} />
            </List>
          ) : (
            <Box sx={{ padding: "0 .5rem" }}>
              {users.length === 0 ? (
                <ListItem
                  sx={{
                    borderRadius: "15px",
                    marginBottom: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem 1.5rem",
                    alignItems: "flex-start",
                    border: `1px solid ${palette.background.tertiary}`,
                    WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    color: palette.text.primary,
                    width: "fit-content",
                  }}
                >
                  No users to display
                </ListItem>
              ) : null}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SocialList;
