import { useContext } from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThemeContext from "../../context/themeContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import {
  Comment as CommentProps,
  CommentFormProps,
} from "../../utils/interfaces";

const Comments = ({
  item,
  onAdd,
  onDelete,
  onLike,
  onDislike,
}: CommentFormProps) => {
  const { palette } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        paddingTop: ".5rem",
      }}
    >
      <Accordion
        elevation={0}
        sx={{
          color: palette?.text.tertiary,
          background: "inherit",
          width: "100%",
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: palette?.text.tertiary }} />}
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
          {item?.comments?.map((comment: CommentProps) => (
            <Comment
              key={comment._id}
              comment={comment}
              itemId={item._id}
              onDelete={onDelete}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))}
        </AccordionDetails>
        <CommentForm item={item} onAdd={onAdd} />
      </Accordion>
    </Box>
  );
};

export default Comments;
