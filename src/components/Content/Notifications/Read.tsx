import { Drafts, Markunread } from "@mui/icons-material";
import { Button } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { readNotification } from "../../../store/communication";
import { useAppDispatch } from "../../../store/store";
import { ReduxState } from "../../../utils/interfaces";

interface ReadProps {
  read?: boolean;
  _id?: string;
}

const Read = ({ read, _id }: ReadProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={debounce(() => _id && dispatch(readNotification(_id)), 200)}
      sx={{
        color: !read ? palette.warning : palette.green,
        borderRadius: "15px",
        minWidth: "0",
      }}
    >
      {read ? <Drafts /> : <Markunread />}
    </Button>
  );
};

export default Read;
