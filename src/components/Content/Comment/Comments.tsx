import { Box } from "@mui/material";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Comment as CommentItem,
  CommentsProps,
  ReduxState,
} from "../../../utils/interfaces";
import { useSelector } from "react-redux";

const Comments = ({ item }: CommentsProps) => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Accordion
        elevation={0}
        sx={{
          color: palette.text.tertiary,
          background: "inherit",
          width: "100%",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: palette.text.tertiary }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ margin: "0 !important", padding: "0 !important" }}
        >
          <Typography
            sx={{
              fontWeight: 500,
            }}
          >
            Comments
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ margin: "0 0 .5rem 0 !important", padding: "0 !important" }}
        >
          {item?.comments?.map((comment: CommentItem) => (
            <Comment key={comment._id} comment={comment} itemId={item._id} />
          ))}
        </AccordionDetails>
        <CommentForm item={item} />
      </Accordion>
    </Box>
  );
};

export default Comments;
