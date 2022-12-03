import { useContext, useEffect } from "react";
import { Box, Divider, List } from "@mui/material";
import Post from "./Post";
import PostContext from "../../context/postContext";
import Share from "./Share";

const Feed = () => {
  const { posts, onGetPosts } = useContext(PostContext);

  useEffect(() => {
    onGetPosts?.();
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
        sx={{ background: "rgb(120,120,126)", margin: "1rem 0 1.5rem 0" }}
      />
      {posts.length > 0 ? (
        <List
          sx={{
            width: "100%",
            background: "rgb(35,35,48)",
            padding: 0,
            marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
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
