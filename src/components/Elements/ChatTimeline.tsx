import { useContext } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import ThemeContext from "../../context/themeContext";
import {
  Check,
  SwapHoriz,
  Storage,
  ArrowRight,
  Chat,
} from "@mui/icons-material";

const ChatTimeline = () => {
  const { palette } = useContext(ThemeContext);

  return (
    <Timeline
      position="alternate"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      sx={{
        color: palette?.text.tertiary,
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot sx={{ background: palette?.text.secondary }}>
            <Check sx={{ color: palette?.text.primary }} />
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
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot sx={{ background: palette?.blue }}>
            <SwapHoriz />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            Exchange messages
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
            Discuss the events
          </Typography>
          <Typography fontSize={".9rem"}>that interest you</Typography>
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
          <Typography fontSize={".9rem"}>is automatically saved</Typography>
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
