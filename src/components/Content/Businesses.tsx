import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import BusinessMenu from "../Navigation/BusinessMenu";
import BusinessesList from "./BusinessesList";
import { Business, ReduxState } from "../../utils/interfaces";
import { getBusinesses } from "../../store/businesses";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import { removeSelectedBusiness } from "../../store/businesses";
import { removeSelectedEvent } from "../../store/events";

const Businesses = () => {
  const [filteredItems, setFilteredItems] = useState(null);
  const {
    data: { businesses, selectedBusiness },
    status,
  } = useSelector((state: ReduxState) => state.businesses);
  const {
    data: { selectedEvent },
  } = useSelector((state: ReduxState) => state.events);
  const dispatch = useAppDispatch();
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
      dispatch(removeSelectedBusiness());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businesses]);

  useEffect(() => {
    if (selectedEvent || selectedBusiness) {
      dispatch(removeSelectedBusiness());
      dispatch(removeSelectedEvent());
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

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

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
        loading={status}
        items={filteredItems ? filteredItems : businesses}
        scrollRef={businessMenuRef}
      />
    </Box>
  );
};

export default Businesses;
