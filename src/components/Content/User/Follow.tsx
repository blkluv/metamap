import { Check, Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser } from "../../../store/currentUser";
import { useAppDispatch } from "../../../store/store";
import { ReduxState, User, UserHeader } from "../../../utils/interfaces";

interface DescriptionProps {
  user?: UserHeader;
}

const Follow = ({ user }: DescriptionProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const ifFollowing = (currentuser: User | null, id: string | undefined) => {
    if (currentUser && id) {
      return currentuser?.following?.find((user) => user._id === id);
    }
    return null;
  };

  return (
    <>
      {currentUser?.name !== id ? (
        <Button
          onClick={debounce(() => user && dispatch(followUser(user._id)), 250)}
          sx={{
            color: ifFollowing(currentUser, user?._id)
              ? palette.warning
              : palette.blue,
            borderRadius: "15px",
            fontSize: ".8rem",
            padding: ".5rem 0",
          }}
        >
          {ifFollowing(currentUser, user?._id) ? (
            <Close fontSize="small" sx={{ width: "1.5rem" }} />
          ) : (
            <Check fontSize="small" sx={{ width: "1.5rem" }} />
          )}
          {ifFollowing(currentUser, user?._id) ? "Unfollow" : "Follow"}
        </Button>
      ) : null}
    </>
  );
};

export default Follow;
