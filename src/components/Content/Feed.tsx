import { useContext, useEffect, useRef } from "react";
import { Box, Divider } from "@mui/material";
import PostContext from "../../context/postContext";
import Share from "./Share";
import PostList from "./PostsList";
import CommunicationContext from "../../context/communicationContext";

const Feed = () => {
  const { posts, onGetFollowingPosts } = useContext(PostContext);
  const { targetElement, onSetTargetElement } =
    useContext(CommunicationContext);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    onGetFollowingPosts?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (targetElement) {
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }
    return () => onSetTargetElement?.(null);
  }, [onSetTargetElement, targetElement]);

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
      <PostList
        items={posts}
        targetElement={targetElement}
        targetRef={targetRef}
      />
    </Box>
  );
};

export default Feed;
