import { useContext, useEffect, useState, useRef } from "react";
import BusinessContext from "../../context/businessContext";
import { Box } from "@mui/material";
import BusinessMenu from "../Navigation/BusinessMenu";
import BusinessesList from "./BusinessesList";
import { Business } from "../../utils/interfaces";
import EventContext from "../../context/eventContext";

const Businesses = () => {
  const { businesses, selectedBusiness, onRemoveSelectedBusiness } =
    useContext(BusinessContext);
  const { selectedEvent, onRemoveSelectedEvent } = useContext(EventContext);
  const [filteredItems, setFilteredItems] = useState(null);
  const businessMenuRef = useRef();

  useEffect(() => {
    if (filteredItems) {
      setFilteredItems((filteredItems) =>
        // @ts-ignore
        filteredItems.map((item: Business) =>
          item?._id === selectedBusiness?._id ? selectedBusiness : item
        )
      );
    }
    return () => {
      onRemoveSelectedBusiness?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businesses]);

  useEffect(() => {
    if (selectedEvent || selectedBusiness) {
      onRemoveSelectedBusiness?.();
      onRemoveSelectedEvent?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredItems]);

  const handleFilter = (data: any) => {
    if (data) {
      setFilteredItems(data);
    } else {
      setFilteredItems(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <BusinessMenu
        items={businesses}
        handleFilter={handleFilter}
        scrollRef={businessMenuRef}
      />
      <BusinessesList
        items={filteredItems ? filteredItems : businesses}
        scrollRef={businessMenuRef}
      />
    </Box>
  );
};

export default Businesses;
