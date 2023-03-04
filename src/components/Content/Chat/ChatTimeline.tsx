import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import {
  Check,
  SwapHoriz,
  Storage,
  ArrowRight,
  Chat,
} from "@mui/icons-material";
import { ReduxState } from "../../../utils/interfaces";
import { useSelector } from "react-redux";

const ChatTimeline = () => {
  const palette = useSelector((state: ReduxState) => state.theme.palette);

  return (
    <Timeline
      position="alternate"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      sx={{
        color: palette.text.tertiary,
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot sx={{ background: palette.text.secondary }}>
            <Check sx={{ color: palette.text.primary }} />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            Follow People
          </Typography>
          <Typography fontSize={".9rem"}>to make contact</Typography>
          <Typography sx={{ mt: ".1rem" }} fontSize={".7rem"}>
            (Community tab)
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot sx={{ background: palette.blue }}>
            <SwapHoriz />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            Chat
          </Typography>
          <Typography fontSize={".9rem"}>in real time</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot sx={{ background: "#44b700" }} variant="filled">
            <Chat sx={{ padding: ".1rem" }} />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            Discuss what
          </Typography>
          <Typography fontSize={".9rem"}>interests you</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot color="primary" variant="outlined">
            <Storage sx={{ padding: ".1rem" }} />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            Chat history
          </Typography>
          <Typography fontSize={".9rem"}>will be saved</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot color="secondary">
            <ArrowRight />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            You can continue
          </Typography>
          <Typography fontSize={".9rem"}>at any time</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default ChatTimeline;
