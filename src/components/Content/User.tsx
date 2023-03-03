import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import Post from "./Post/Post";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Event,
  UserHeader,
  User as LoggedUser,
  Business,
  ReduxState,
} from "../../utils/interfaces";
import convertImage from "../../utils/imageConverter";
import debounce from "../../utils/debounce";
import { Check, Close, Edit } from "@mui/icons-material";
import ScrollToTheTop from "../Elements/ScrollToTheTop";
import { useSelector } from "react-redux";
import { getUser } from "../../store/users";
import { getUserPosts } from "../../store/posts";
import { updateUser, followUser } from "../../store/currentUser";
import { useAppDispatch } from "../../store/store";
import { getBusinesses } from "../../store/businesses";
import { getEvents } from "../../store/events";
import UserItemsGallery from "./UserItemsGallery";

const User = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const { userPosts } = useSelector((state: ReduxState) => state.posts.data);
  const {
    data: { events },
  } = useSelector((state: ReduxState) => state.events);
  const {
    data: { businesses },
    status,
  } = useSelector((state: ReduxState) => state.businesses);
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<UserHeader | undefined>(undefined);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const userMenuRef = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {}, [dispatch]);

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

  const {
    register: registerDescription,
    handleSubmit: handleRegisterDescription,
    reset: resetDescription,
  } = useForm({
    defaultValues: {
      description: null,
    },
  });

  const getUsersItems = (itemsArray: any) => {
    return itemsArray.filter(
      (item: Event | Business) => item?.creator?.name === id
    );
  };

  const handleSubmitAvatar = async () => {
    let convertedFile;
    if (file) {
      convertedFile = await convertImage(file, 170, 170);
    }

    try {
      dispatch(updateUser({ dataType: "avatar", data: String(convertedFile) }));
      setFile(null);
    } catch (err) {}
  };

  const handleSubmitDescription = async (data: {
    description: string | null;
  }) => {
    const description = data.description?.trim();
    if (description) {
      try {
        dispatch(
          updateUser({
            dataType: "description",
            data: String(description),
          })
        );
      } catch (err) {}
    }
    resetDescription();
    setEditDescription(!editDescription);
  };

  const renderAvatar = (
    user: UserHeader | undefined | null,
    currentuser: LoggedUser | undefined | null,
    file: any
  ) => {
    if (file) return URL.createObjectURL(file);
    if (user?._id === currentUser?._id) {
      return currentuser?.avatar;
    }
    if (user?.avatar) return user?.avatar;
    return "";
  };

  const ifFollowing = (
    currentuser: LoggedUser | null,
    id: string | undefined
  ) => {
    if (currentUser && id) {
      return currentuser?.following?.find((user) => user._id === id);
    }
    return null;
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
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <FormLabel htmlFor="file">
                <Avatar
                  alt={"User avatar"}
                  src={renderAvatar(user, currentUser, file)}
                  sx={{
                    margin: { xs: "0 1rem 1rem 0", sm: "0 1.5rem 1rem 0" },
                    height: { xs: "4rem", sm: "4rem", md: "4rem", lg: "6rem" },
                    width: { xs: "4rem", sm: "4rem", md: "4rem", lg: "6rem" },
                    WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    cursor:
                      user?._id === currentUser?._id ? "pointer" : "default",
                  }}
                />
                {user?._id === currentUser?._id ? (
                  <Input
                    type="file"
                    inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
                    sx={{ display: "none" }}
                    id="file"
                    onChange={(e: any) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                ) : (
                  <></>
                )}
              </FormLabel>
              {file ? (
                <Check
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                    opacity: "0.8",
                    color: "yellowgreen",
                    borderRadius: "50%",
                    border: "1px solid yellowgreen",
                  }}
                  onClick={() => handleSubmitAvatar()}
                />
              ) : null}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: { sm: "none", md: "block", lg: "none" },
                  alignContent: "left",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    paddingLeft: 0.5,
                  }}
                >
                  {user?.name}
                </Typography>
                {currentUser?.name !== id ? (
                  <Button
                    onClick={debounce(
                      () => user && dispatch(followUser(user._id)),
                      400
                    )}
                    sx={{
                      color: ifFollowing(currentUser, user?._id)
                        ? palette.warning
                        : "default",
                      borderRadius: "15px",
                      fontSize: ".8rem",
                      paddingLeft: 0,
                      margin: 0,
                    }}
                  >
                    {ifFollowing(currentUser, user?._id) ? (
                      <Close fontSize="small" sx={{ width: "1.5rem" }} />
                    ) : (
                      <Check fontSize="small" sx={{ width: "1.5rem" }} />
                    )}
                    {ifFollowing(currentUser, user?._id)
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                ) : (
                  <>
                    {editDescription ? (
                      <Check
                        sx={{
                          cursor: "pointer",
                          opacity: "0.8",
                          color: "yellowgreen",
                          borderRadius: "50%",
                          border: "1px solid yellowgreen",
                          padding: "0 .1rem",
                          marginTop: ".5rem",
                        }}
                        onClick={handleRegisterDescription(
                          debounce(handleSubmitDescription, 400)
                        )}
                      />
                    ) : (
                      <Edit
                        sx={{
                          padding: "0 .1rem",
                          marginTop: ".5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setEditDescription(!editDescription)}
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", m: 1, gridGap: ".5rem", flexWrap: "wrap" }}
          >
            <Box sx={{ margin: { xs: "16px 16px 10px 0", md: 2 } }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {getUsersItems([...events, ...businesses]).length}
              </Typography>
              <Typography>Markers</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {userPosts.length}
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
          <Box
            component="div"
            sx={{
              margin: ".5rem 0 1rem 0",
              fontSize: "1rem",
              display: { sm: "none", md: "block", lg: "none" },
            }}
          >
            <>
              {currentUser?.name === id ? (
                <>
                  {editDescription ? (
                    <Box component="form">
                      <TextField
                        placeholder="Write something about yourself..."
                        variant="standard"
                        multiline={true}
                        size="small"
                        margin="dense"
                        maxRows={3}
                        InputProps={{ disableUnderline: true }}
                        inputProps={{ style: { color: palette.text.primary } }}
                        fullWidth
                        id="userDescription"
                        autoComplete="userDescription"
                        autoFocus
                        {...registerDescription("description", {
                          minLength: 3,
                          maxLength: 800,
                        })}
                      />
                    </Box>
                  ) : (
                    <Typography
                      component="div"
                      onClick={() => setEditDescription(true)}
                    >
                      {user?.description
                        ? user.description
                        : "Write something about yourself..."}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography component="div">{user?.description}</Typography>
              )}
            </>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "none", lg: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            padding: ".5rem .5rem 0 .5rem",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 500,
              fontSize: "1.2rem",
              display: "flex",
            }}
          >
            {user?.name}
          </Typography>
          {currentUser?.name !== id ? (
            <Button
              onClick={debounce(
                () => user && dispatch(followUser(user._id)),
                400
              )}
              sx={{
                color: ifFollowing(currentUser, user?._id)
                  ? palette.warning
                  : palette.blue,
                borderRadius: "15px",
                fontSize: ".8rem",
                padding: "0 .5rem",
              }}
            >
              {ifFollowing(currentUser, user?._id) ? (
                <Close fontSize="small" sx={{ width: "1.5rem" }} />
              ) : (
                <Check fontSize="small" sx={{ width: "1.5rem" }} />
              )}
              {ifFollowing(currentUser, user?._id) ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <>
              {editDescription ? (
                <Check
                  sx={{
                    cursor: "pointer",
                    opacity: "0.8",
                    color: "yellowgreen",
                    borderRadius: "50%",
                    border: "1px solid yellowgreen",
                    padding: "0 .1rem",
                    marginTop: ".5rem",
                  }}
                  onClick={handleRegisterDescription(
                    debounce(handleSubmitDescription, 400)
                  )}
                />
              ) : (
                <Edit
                  sx={{
                    padding: "0 .1rem",
                    marginTop: ".5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditDescription(!editDescription)}
                />
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            margin: ".5rem",
            fontSize: "1rem",
            display: { xs: "none", sm: "block", md: "none", lg: "block" },
          }}
        >
          <>
            {currentUser?.name === id ? (
              <>
                {editDescription ? (
                  <Box component="form">
                    <TextField
                      placeholder="Write something about yourself..."
                      variant="standard"
                      multiline={true}
                      size="small"
                      margin="dense"
                      maxRows={3}
                      InputProps={{ disableUnderline: true }}
                      inputProps={{ style: { color: palette.text.primary } }}
                      fullWidth
                      id="userDescription"
                      autoComplete="userDescription"
                      autoFocus
                      {...registerDescription("description", {
                        minLength: 3,
                        maxLength: 800,
                      })}
                    />
                  </Box>
                ) : (
                  <Typography
                    component="div"
                    onClick={() => setEditDescription(true)}
                  >
                    {user?.description
                      ? user.description
                      : "Write something about yourself..."}
                  </Typography>
                )}
              </>
            ) : (
              <Typography component="div">{user?.description}</Typography>
            )}
          </>
        </Box>
        <Divider
          variant="middle"
          sx={{
            background: "rgb(120,120,126)",
            margin: "1rem .5rem 1.5rem .5rem",
          }}
        />
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
      </Box>
      <UserItemsGallery
        status={status}
        userItems={getUsersItems([...events, ...businesses])}
      />
    </Box>
  );
};

export default User;
