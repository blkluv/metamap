import { useContext } from "react";
import { Box } from "@mui/material";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchField from "../Elements/SearchField";
import { UserHeader } from "../../utils/interfaces";

export const SocialMenu = ({ handleFilter, users }: any) => {
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const handleFollowing = (data: UserHeader[]) => {
    const followedUsers = data.filter((item: UserHeader | null) => {
      return item?.following?.find((user) => user._id === currentUser?._id);
    });
    handleFilter(followedUsers);
  };

  const handleFollowers = (data: UserHeader[]) => {
    const followedUsers = data.filter((item: UserHeader | null) => {
      return item?.followers?.find((user) => user._id === currentUser?._id);
    });
    handleFilter(followedUsers);
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: palette?.background.primary,
        color: palette?.text.tertiary,
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
        <Typography
          variant="body2"
          sx={{
            paddingTop: "0.5rem",
            marginBottom: "-0.5rem",
            fontWeight: "bold",
          }}
        >
          Filters
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
          startIcon={<CloseIcon />}
          disableElevation
          sx={{
            color: palette?.text.primary,
            background: palette?.background.tertiary,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
          onClick={() => handleFilter(null)}
        >
          Clear
        </Button>
        <Button
          onClick={() => handleFollowers(users)}
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette?.blue,
          }}
        >
          Following
        </Button>
        <Button
          onClick={() => handleFollowing(users)}
          variant="outlined"
          startIcon={<VisibilityIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette?.green,
          }}
        >
          Followers
        </Button>
      </CardActions>
    </Box>
  );
};

export default SocialMenu;
