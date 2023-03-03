import { useEffect, useRef } from "react";
import { Box, Divider } from "@mui/material";
import Share from "../Post/Share";
import PostList from "../Post/PostsList";
import FeedTimeline from "../../Elements/FeedTimeline";
import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { setTargetElement } from "../../../store/communication";
import { getFollowingPosts } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";

const Feed = () => {
  const { targetElement } = useSelector(
    (state: ReduxState) => state.communication.data
  );
  const { followingPosts } = useSelector(
    (state: ReduxState) => state.posts.data
  );
  const targetRef = useRef<any>(null);
  const feedMenuRef = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch]);

  // @ts-ignore
  useEffect(() => {
    if (targetElement) {
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    }
    return () => setTargetElement(null);
  }, [targetElement]);

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
      <Share scrollRef={feedMenuRef} />
      <Divider
        variant="middle"
        sx={{
          opacity: "0%",
          margin: "1rem 3rem 1rem 3rem",
        }}
      />
      {followingPosts.length ? (
        <PostList
          items={followingPosts}
          targetElement={targetElement}
          targetRef={targetRef}
          scrollRef={feedMenuRef}
        />
      ) : (
        <FeedTimeline />
      )}
    </Box>
  );
};

export default Feed;
