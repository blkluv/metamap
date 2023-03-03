import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../utils/interfaces";

interface DurationProps {
  start: string | null;
  end: string | null;
}

const Duration = ({ start, end }: DurationProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  const displayDate = (date: string | null) => {
    if (date) {
      return new Date(date).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      });
    }
    return null;
  };

  return (
    <>
      <Typography
        sx={{ display: "block", marginTop: "0.4rem", fontSize: ".8rem" }}
        component="span"
        variant="body2"
        color={palette.text.primary}
      >
        {`Starts: ${displayDate(start)}`}
      </Typography>
      <Typography
        sx={{ display: "block", marginTop: "0.2rem", fontSize: ".8rem" }}
        component="span"
        variant="body2"
        color={palette.text.primary}
      >
        {`Ends: ${displayDate(end)}`}
      </Typography>
    </>
  );
};

export default Duration;
