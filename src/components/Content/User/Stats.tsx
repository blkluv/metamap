import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ReduxState, UserHeader } from "../../../utils/interfaces";

interface StatsProps {
  user?: UserHeader;
  userItems: any[];
}

const Stats = ({ user, userItems }: StatsProps) => {
  const { userPosts } = useSelector((state: ReduxState) => state.posts.data);

  return (
    <Box
      sx={{
        display: "flex",
        m: "8px 0",
        gridGap: ".5rem",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <Box
        sx={{
          margin: { xs: "16px 16px 10px 0", md: "16px 16px 16px 0", lg: 2 },
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
          {userItems.length}
        </Typography>
        <Typography>Markers</Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
          {userPosts.length}
        </Typography>
        <Typography>Posts</Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
          {user?.followers?.length || 0}
        </Typography>
        <Typography>Followers</Typography>
      </Box>
    </Box>
  );
};

export default Stats;
