import { useEffect, useRef } from "react";
import List from "@mui/material/List";
import { Box, ListItem } from "@mui/material";
import { PostsListProps, ReduxState } from "../../../utils/interfaces";
import Post from "./Post";
import ScrollToTheTop from "../../Elements/ScrollToTheTop";
import { useSelector } from "react-redux";
import { setTargetElement } from "../../../store/communication";

const PostList = ({ items, scrollRef }: PostsListProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { targetElement } = useSelector(
    (state: ReduxState) => state.communication.data
  );

  const targetRef = useRef<any>(null);

  // @ts-ignore
  useEffect(() => {
    if (targetElement) {
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    return () => setTargetElement?.(null);
  }, [targetElement]);

  return (
    <>
      {items.length > 0 ? (
        <List
          sx={{
            width: "100%",
            borderRadius: "25px",
            background: palette.background.primary,
            padding: 1,
            marginBottom: ".5rem",
          }}
        >
          {items.map((element) => (
            <Post
              innerRef={element._id === targetElement ? targetRef : null}
              key={element._id}
              post={element}
            />
          ))}
          <ScrollToTheTop minLength={5} data={items} scrollRef={scrollRef} />
        </List>
      ) : (
        <Box sx={{ padding: "0 .5rem" }}>
          <ListItem
            sx={{
              borderRadius: "15px",
              background: palette.background.tertiary,
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
    </>
  );
};

export default PostList;
