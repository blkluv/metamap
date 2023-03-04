import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSelectedBusiness } from "../../../store/businesses";
import { setSelectedEvent } from "../../../store/events";
import { useAppDispatch } from "../../../store/store";

interface TypeTextProps {
  type?: string;
  text?: string;
  payload: any;
}

const TypeText = ({ type, text, payload }: TypeTextProps) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToTarget = (_id: string | undefined, type: string | undefined) => {
    if (_id) {
      if (type === "event") {
        navigate("/dashboard/events");
        setTimeout(() => {
          dispatch(setSelectedEvent(_id));
        }, 3000);
        return;
      }
      if (type === "business") {
        navigate("/dashboard/business");
        setTimeout(() => {
          dispatch(setSelectedBusiness(_id));
        }, 3000);
        return;
      }
      if (type === "post") {
        return;
      }
    }
  };

  const renderText = (
    type: string | undefined,
    text: string | undefined,
    payload: any
  ) => {
    if (type === "event" && payload)
      return (
        <Box style={{ cursor: "pointer", display: "flex", flexWrap: "wrap" }}>
          {text?.replace("event.", "")}
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: ".2rem",
              fontSize: ".9rem",
              textDecoration: "underline",
            }}
            onClick={() => goToTarget(payload.event._id, type)}
          >
            event
          </Typography>
          .
        </Box>
      );
    if (type === "post" && payload)
      return (
        <Box style={{ cursor: "pointer", display: "flex", flexWrap: "wrap" }}>
          {text?.replace("post.", "")}
          <Typography
            sx={{ fontWeight: "700", marginLeft: ".2rem", fontSize: ".9rem" }}
            onClick={() => goToTarget(payload.post._id, type)}
          >
            post.
          </Typography>
        </Box>
      );
    if (type === "business" && payload)
      return (
        <Box style={{ cursor: "pointer", display: "flex", flexWrap: "wrap" }}>
          {text?.replace("business.", "")}
          <Typography
            sx={{
              fontWeight: "700",
              marginLeft: ".2rem",
              fontSize: ".9rem",
              textDecoration: "underline",
            }}
            onClick={() => goToTarget(payload.business._id, type)}
          >
            business
          </Typography>
          .
        </Box>
      );
    if (type === "social") return text;
    if (type === "chat") return text;
    return text;
  };

  return <>{renderText(type, text, payload)}</>;
};

export default TypeText;
