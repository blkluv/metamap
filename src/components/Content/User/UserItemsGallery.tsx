import { Masonry } from "@mui/lab";
import { Box, LinearProgress } from "@mui/material";
import { useRef } from "react";
import ScrollToTheTop from "../../Elements/ScrollToTheTop";
import BusinessHeader from "../Business/BusinessHeader";

import EventHeader from "../EventHeader";

export interface UserItemsGalleryProps {
  status: string;
  userItems: any[];
}

const UserItemsGallery = ({ status, userItems }: UserItemsGalleryProps) => {
  const userItemsRef = useRef();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "60%" },
        padding: 1,
        marginBottom: { xs: "0", md: "-2rem", lg: "-2.5rem" },
        overflow: "scroll",
      }}
    >
      <Box ref={userItemsRef}></Box>
      {status === "loading" ? (
        <LinearProgress />
      ) : (
        <>
          <Masonry columns={{ lg: 2, md: 1, sm: 1, sx: 1 }} spacing={2}>
            {userItems.map((item: any) => {
              return item.type === "event" ? (
                <EventHeader key={item._id} variant={"masonry"} event={item} />
              ) : (
                <BusinessHeader
                  key={item._id}
                  variant={"masonry"}
                  business={item}
                />
              );
            })}
          </Masonry>
          <ScrollToTheTop
            minLength={5}
            data={userItems}
            scrollRef={userItemsRef}
          />
        </>
      )}
    </Box>
  );
};

export default UserItemsGallery;
