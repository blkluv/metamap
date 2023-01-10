import { useContext } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import ThemeContext from "../../context/themeContext";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import StorageIcon from "@mui/icons-material/Storage";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChatIcon from "@mui/icons-material/Chat";

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
            <CheckIcon />
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
            <SwapHorizIcon />
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
            <ChatIcon sx={{ padding: ".1rem" }} />
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
            <StorageIcon sx={{ padding: ".1rem" }} />
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
            <ArrowRightIcon />
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
