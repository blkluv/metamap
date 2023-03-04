import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchField from "../../Elements/SearchField";
import { ReduxState, UserHeader } from "../../../utils/interfaces";
import { Check, Close, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const SocialMenu = ({ handleFilter, users, scrollRef }: any) => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  const handleFollowing = (data: UserHeader[]) => {
    const followingUsers = data.filter((item: UserHeader | null) => {
      return currentUser?.following?.find((user) => user._id === item?._id);
    });
    handleFilter(followingUsers);
  };

  const handleFollowers = (data: UserHeader[]) => {
    const followedUsers = data.filter((item: UserHeader | null) => {
      return currentUser?.followers?.find((user) => user._id === item?._id);
    });
    handleFilter(followedUsers);
  };

  return (
    <Box
      ref={scrollRef}
      sx={{
        width: "100%",
        background: palette.background.primary,
        color: palette.text.tertiary,
        marginBottom: "1rem",
      }}
    >
      <CardContent
        sx={{
          padding: "8px 8px 0 8px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Community
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <SearchField data={users} filter={handleFilter} />
        <Button
          variant="contained"
          startIcon={<Close />}
          disableElevation
          sx={{
            color: palette.text.primary,
            background: palette.background.tertiary,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
          onClick={() => handleFilter(null)}
        >
          Clear
        </Button>
        <Button
          onClick={() => handleFollowing(users)}
          variant="outlined"
          startIcon={<Check />}
          sx={{
            border: `1px solid ${palette.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette.blue,
          }}
        >
          Following
        </Button>
        <Button
          onClick={() => handleFollowers(users)}
          variant="outlined"
          startIcon={<Visibility />}
          sx={{
            border: `1px solid ${palette.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette.green,
          }}
        >
          Followers
        </Button>
      </CardActions>
    </Box>
  );
};

export default SocialMenu;
