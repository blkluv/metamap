import { useContext, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ThemeContext from "../../context/themeContext";
import { Box, ListItem } from "@mui/material";
import CommunicationContext from "../../context/communicationContext";
import { PostsListProps } from "../../utils/interfaces";
import Post from "./Post";
import ScrollToTheTop from "../Elements/ScrollToTheTop";

const PostList = ({ items, scrollRef }: PostsListProps) => {
  const { palette } = useContext(ThemeContext);
  const { targetElement, onSetTargetElement } =
    useContext(CommunicationContext);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    if (targetElement) {
      targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    return () => onSetTargetElement?.(null);
  }, [onSetTargetElement, targetElement]);

  return (
    <>
      {items.length > 0 ? (
        <List
          sx={{
            width: "100%",
            borderRadius: "25px",
            background: palette?.background.primary,
            padding: 1,
            marginBottom: ".5rem",
          }}
        >
          {items.map((element: any) => (
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
              background: palette?.background.tertiary,
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
            No posts to display
          </ListItem>
        </Box>
      )}
    </>
  );
};

export default PostList;
