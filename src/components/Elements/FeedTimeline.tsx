import { useContext } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import ThemeContext from "../../context/themeContext";
import { Favorite, Create, Chat } from "@mui/icons-material";

const FeedTimeline = () => {
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
            <Create sx={{ color: palette?.text.primary }} />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            Write some posts
          </Typography>
          <Typography fontSize={".9rem"}>for your friends to see</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
          <TimelineDot sx={{ background: palette?.blue }}>
            <Favorite sx={{ padding: ".1rem" }} />
          </TimelineDot>
          <TimelineConnector
            sx={{ bgcolor: "secondary.main", height: "1.5rem" }}
          />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" fontSize={"1.1rem"}>
            They will be able
          </Typography>
          <Typography fontSize={".9rem"}>to like and comment</Typography>
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
            You will get a notification
          </Typography>
          <Typography fontSize={".9rem"}>when this happens</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default FeedTimeline;
