import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { likeBusiness } from "../../../store/businesses";
import { useAppDispatch } from "../../../store/store";
import { ReduxState, UserHeader } from "../../../utils/interfaces";
import { notify } from "../../../utils/notifications";

interface LikeProps {
  likes?: UserHeader[];
  creator?: UserHeader;
  businessId?: string;
}

const Like = ({ likes, creator, businessId }: LikeProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const { _id, name } = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();

  const handleLikeBusiness = () => {
    if (name.startsWith("guest")) {
      notify("DEMO users cannot like anything.");
      return;
    }
    if (creator?._id === _id) {
      notify("You can't like your own business.");
      return;
    }
    businessId && dispatch(likeBusiness(businessId));
  };

  return (
    <Box
      sx={{
        display: "flex",
        color: palette.text.tertiary,
      }}
    >
      <Typography
        sx={{ display: "block", marginRight: ".3rem" }}
        component="span"
        variant="body2"
        fontSize={".9rem"}
      >
        {likes?.length ? likes.length : ""}
      </Typography>
      {likes?.find((user) => user._id === _id) ? (
        <Favorite
          sx={{
            fontSize: "1.2rem",
            cursor: "pointer",
            color: palette.warning,
          }}
          onClick={debounce(() => handleLikeBusiness(), 250)}
        />
      ) : (
        <FavoriteBorder
          sx={{ fontSize: "1.2rem", cursor: "pointer" }}
          onClick={debounce(() => handleLikeBusiness(), 250)}
        />
      )}
    </Box>
  );
};

export default Like;
