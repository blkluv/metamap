import { useEffect, useRef, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  Event,
  UserHeader,
  Business,
  ReduxState,
} from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/users";
import { getUserPosts } from "../../../store/posts";
import { useAppDispatch } from "../../../store/store";
import { getBusinesses } from "../../../store/businesses";
import { getEvents } from "../../../store/events";
import UserItemsGallery from "./UserItemsGallery";
import Posts from "./Posts";
import Description from "./Description";
import Stats from "./Stats";
import UserAvatar from "./UserAvatar";
import SmallHeader from "./SmallHeader";

const User = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const {
    data: { events },
  } = useSelector((state: ReduxState) => state.events);
  const {
    data: { businesses },
    status,
  } = useSelector((state: ReduxState) => state.businesses);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserHeader | undefined>(undefined);
  const userMenuRef = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onGetUser = async (id: string) => {
      const result = await getUser(id);
      if (result) {
        setUser(result);
      } else {
        navigate("/dashboard");
      }
    };

    const onGetUserPosts = (id: string) => {
      dispatch(getUserPosts(id));
    };

    if (id) {
      onGetUser(id);
      onGetUserPosts(id);
      dispatch(getEvents());
      dispatch(getBusinesses());
    }

    return () => setUser(undefined);
  }, [dispatch, id, navigate]);

  const getUsersItems = (itemsArray: any) => {
    return itemsArray.filter(
      (item: Event | Business) => item?.creator?.name === id
    );
  };

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
          minHeight: "15rem",
          color: palette.text.tertiary,
        }}
      >
        <Box
          ref={userMenuRef}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            padding: "0 .5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row" },
              alignSelf: { md: "baseline" },
              alignItems: "center",
            }}
          >
            <UserAvatar user={user} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <SmallHeader user={user} mobile />
            </Box>
          </Box>
          <Stats
            userItems={getUsersItems([...events, ...businesses])}
            user={user}
          />
          <Box
            component="div"
            sx={{
              margin: ".5rem 0 1rem 0",
              fontSize: "1rem",
              width: "100%",
              display: { sm: "none", md: "block", lg: "none" },
            }}
          >
            <Description user={user} />
          </Box>
        </Box>
        <SmallHeader user={user} />
        <Box
          sx={{
            margin: ".5rem",
            fontSize: "1rem",
            display: { xs: "none", sm: "block", md: "none", lg: "block" },
          }}
        >
          <Description user={user} />
        </Box>
        <Divider
          variant="middle"
          sx={{
            background: "rgb(120,120,126)",
            margin: "1rem .5rem 1.5rem .5rem",
          }}
        />
        <Posts userMenuRef={userMenuRef} />
      </Box>
      <UserItemsGallery
        status={status}
        userItems={getUsersItems([...events, ...businesses])}
      />
    </Box>
  );
};

export default User;
