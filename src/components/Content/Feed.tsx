import { useContext, useEffect } from "react";
import { Box, Divider, List } from "@mui/material";
import PostContext from "../../context/postContext";
import ThemeContext from "../../context/themeContext";
import Post from "./Post";
import Share from "./Share";

const Feed = () => {
  const { posts, onGetFollowingPosts } = useContext(PostContext);
  const { palette } = useContext(ThemeContext);

  useEffect(() => {
    onGetFollowingPosts?.();
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
      <Share />
      <Divider
        variant="middle"
        sx={{
          opacity: "0%",
          margin: "1rem 3rem 1rem 3rem",
        }}
      />
      {posts.length > 0 ? (
        <List
          sx={{
            width: "100%",
            borderRadius: "25px",
            background: palette?.background.primary,
            padding: 1,
            marginBottom: { xs: "0", md: "-5rem", lg: "-3rem" },
            overflow: "scroll",
          }}
        >
          {posts.map((element: any) => (
            <Post key={element._id} {...element} />
          ))}
        </List>
      ) : (
        <p>No posts to display.</p>
      )}
    </Box>
  );
};

export default Feed;
