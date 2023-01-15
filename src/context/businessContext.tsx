import { useState, useEffect, createContext, useContext } from "react";
import { Business, BusinessesContext } from "../utils/interfaces";
import BusinessService from "../services/businessService";
import UserContext from "./userContext";
import CommunicationContext from "./communicationContext";

const INITIAL_STATE: BusinessesContext = {
  businesses: [],
};

BusinessService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

const BusinessContext = createContext(INITIAL_STATE);

export const BusinessProvider = ({ children }: React.PropsWithChildren) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<
    Business | undefined
  >();
  const { currentUser } = useContext(UserContext);
  const { socket, onAddNotification, onSendNotification, dataUpdate } =
    useContext(CommunicationContext);

  const getBusinesses = async () => {
    const businesses = await BusinessService.getBusinesses();
    if (businesses) {
      setBusinesses(businesses);
    }
  };

  const handleAddBusiness = async (business: Business) => {
    const newBusiness = await BusinessService.addBusiness(business);
    if (newBusiness) {
      const updateReceivers = currentUser?.followers;
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new business.",
            read: false,
            type: "business",
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            senderId: newBusiness.creator?._id,
            senderName: newBusiness.creator?.name,
            receiverId: follower._id,
            text: "created a new business.",
            type: "business",
          });
          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      setBusinesses((businesses) => [newBusiness, ...businesses]);
    }
  };

  const handleLikeBusiness = async (id: string | undefined) => {
    const updatedBusiness = await BusinessService.likeBusiness(id);
    if (updatedBusiness) {
      const updatedBusinesses = businesses.map((business) =>
        business._id === updatedBusiness._id ? updatedBusiness : business
      );

      let notification = {
        receiverId: updatedBusiness.creator?._id,
        text: "liked your business.",
        read: false,
        type: "business",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        receiverId: updatedBusiness.creator?._id,
        text: "liked your business.",
        type: "business",
      });

      const updateReceivers = currentUser?.followers;
      // @ts-ignore
      updateReceivers?.push(updatedBusiness.creator);
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      setBusinesses(updatedBusinesses);
      setSelectedBusiness(updatedBusiness);
    }
  };

  const handleRateBusiness = async (id: string | undefined, rating: number) => {
    const updatedBusiness = await BusinessService.rateBusiness(id, rating);
    if (updatedBusiness) {
      const updatedBusinesses = businesses.map((business) =>
        business._id === updatedBusiness._id ? updatedBusiness : business
      );

      let notification = {
        receiverId: updatedBusiness.creator?._id,
        text: "rated your business.",
        read: false,
        type: "business",
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        senderId: currentUser?._id,
        senderName: currentUser?.name,
        receiverId: updatedBusiness.creator?._id,
        text: "rated your business.",
        type: "business",
      });

      const updateReceivers = currentUser?.followers;
      // @ts-ignore
      updateReceivers?.push(updatedBusiness.creator);
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }

      setBusinesses(updatedBusinesses);
      setSelectedBusiness(updatedBusiness);
    }
  };

  const handleSetSelectedBusiness = (id: string | undefined) => {
    if (id === selectedBusiness?._id) {
      setSelectedBusiness(undefined);
    } else {
      const selected = businesses.find((business) => business._id === id);
      setSelectedBusiness(selected);
    }
  };

  const handleRemoveSelectedBusiness = () => {
    setSelectedBusiness(undefined);
  };

  const handleDeleteBusiness = async (id: string | undefined) => {
    const deletedBusiness = await BusinessService.deleteBusiness(id);
    if (!deletedBusiness) {
      const updatedBusinesses = businesses.filter(
        (business) => business._id !== id
      );
      setBusinesses(updatedBusinesses);
      setSelectedBusiness(undefined);

      const updateReceivers = currentUser?.followers;
      if (updateReceivers) {
        updateReceivers.forEach((follower) => {
          socket.current?.emit("dataUpdate", follower._id);
        });
      }
    }
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      getBusinesses();
    }
  }, [currentUser]);

  useEffect(() => {
    dataUpdate && getBusinesses?.();
  }, [dataUpdate]);

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        selectedBusiness,
        onGetBusinesses: getBusinesses,
        onLikeBusiness: handleLikeBusiness,
        onRateBusiness: handleRateBusiness,
        onAddBusiness: handleAddBusiness,
        onSetSelectedBusiness: handleSetSelectedBusiness,
        onRemoveSelectedBusiness: handleRemoveSelectedBusiness,
        onDeleteBusiness: handleDeleteBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
