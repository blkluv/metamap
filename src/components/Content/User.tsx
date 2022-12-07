import { useContext, useEffect } from "react";
import { Avatar, Box, Divider, List, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import UserContext from "../../context/userContext";
import EventContext from "../../context/eventContext";
import Masonry from "@mui/lab/Masonry";
import { Event } from "../../utils/interfaces";
import EventHeader from "./EventHeader";
import PostContext from "../../context/postContext";
import Post from "./Post";

const User = () => {
  const { events } = useContext(EventContext);
  const { usersPosts, onGetUsersPosts } = useContext(PostContext);
  const { user, onGetUser } = useContext(UserContext);
  const { id } = useParams();

  const getUsersEvents = (eventsArray: Event[]) => {
    return eventsArray.filter((event: Event) => event?.creator?.name === id);
  };

  useEffect(() => {
    onGetUser?.(id);
    onGetUsersPosts?.(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        paddingTop: { xs: "0", md: "2rem" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gridGap: "2rem",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          overflow: "scroll",
          marginBottom: { xs: "2rem", md: "-2rem", lg: "-2.5rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row" },
              alignItems: "center",
            }}
          >
            <Avatar
              alt={"User avatar"}
              src={"avatar"}
              sx={{
                margin: "0 2rem 1rem 0",
                height: { xs: "8rem", md: "7rem" },
                width: { xs: "8rem", md: "7rem" },
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.2rem",
                  display: { sm: "none", md: "block", lg: "none" },
                }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  margin: ".5rem 0 1rem 0",
                  fontSize: "1rem",
                  display: { sm: "none", md: "block", lg: "none" },
                }}
              >
                {user?.description}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", m: 1, gridGap: "1rem", flexWrap: "wrap" }}
          >
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {getUsersEvents(events).length}
              </Typography>
              <Typography>Events</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {usersPosts.length}
              </Typography>
              <Typography>Posts</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {user?.followers?.length}
              </Typography>
              <Typography>Followers</Typography>
            </Box>
          </Box>
        </Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            marginTop: "1rem",
            fontWeight: 500,
            fontSize: "1.2rem",
            display: { xs: "none", sm: "block", md: "none", lg: "block" },
          }}
        >
          {user?.name}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            margin: ".5rem 0 1rem 0",
            fontSize: "1rem",
            display: { xs: "none", sm: "block", md: "none", lg: "block" },
          }}
        >
          {user?.description}
        </Typography>
        <Divider
          variant="middle"
          sx={{ background: "rgb(120,120,126)", margin: ".5rem 0 1.5rem 0" }}
        />
        <Box
          sx={{
            padding: 0,
            marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
          }}
        >
          {usersPosts.length > 0 ? (
            <List>
              {usersPosts.map((element: any) => (
                <Post key={element._id} {...element} />
              ))}
            </List>
          ) : (
            <p>No posts to display.</p>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          padding: 0,
          marginBottom: { xs: "0", md: "-2rem", lg: "-2.5rem" },
          overflow: "scroll",
        }}
      >
        <Masonry columns={{ md: 2, sm: 1 }} spacing={2}>
          {getUsersEvents(events).map((event: Event, index: number) => (
            <div key={index}>
              <EventHeader key={event._id} variant={"masonry"} event={event} />
            </div>
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};

export default User;
