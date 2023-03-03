import { Box, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";
import ScrollToTheTop from "../../Elements/ScrollToTheTop";
import Post from "../Post/Post";

interface PostsProps {
  userMenuRef: any;
}

const Posts = ({ userMenuRef }: PostsProps) => {
  const { userPosts } = useSelector((state: ReduxState) => state.posts.data);
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        padding: 0,
        marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
      }}
    >
      {userPosts.length > 0 ? (
        <List sx={{ padding: 1 }}>
          {userPosts.map((element: any) => (
            <Post key={element._id} post={element} />
          ))}
          <ScrollToTheTop
            minLength={5}
            data={userPosts}
            scrollRef={userMenuRef}
          />
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
              border: `1px solid ${palette.background.tertiary}`,
              WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
              color: palette.text.primary,
              width: "fit-content",
            }}
          >
            No posts to display
          </ListItem>
        </Box>
      )}
    </Box>
  );
};

export default Posts;
