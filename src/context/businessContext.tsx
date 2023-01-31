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
  const { arrivalNotification, onAddNotification, onSendNotification } =
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
      const receivers = currentUser?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "created a new business.",
            silent: false,
            read: false,
            type: "business",
            payload: { business: newBusiness },
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            ...notification,
            senderId: newBusiness.creator?._id,
            senderName: newBusiness.creator?.name,
          });
        });
      }

      setBusinesses((businesses) => [newBusiness, ...businesses]);
    }
  };

  const handleLikeBusiness = async (id: string | undefined) => {
    const updatedBusiness = await BusinessService.likeBusiness(id);
    if (updatedBusiness) {
      const ifLike = updatedBusiness.likes?.find(
        (user) => user._id === currentUser?._id
      );

      let notification = {
        receiverId: updatedBusiness.creator?._id,
        text: ifLike
          ? "likes your business."
          : "doesn't like your business anymore.",
        silent: ifLike ? false : true,
        read: false,
        type: "business",
        payload: { business: updatedBusiness },
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        ...notification,
        senderId: currentUser?._id,
        senderName: currentUser?.name,
      });

      const updatedBusinesses = businesses.map((business) =>
        business._id === updatedBusiness._id ? updatedBusiness : business
      );

      setBusinesses(updatedBusinesses);
      setSelectedBusiness(updatedBusiness);
    }
  };

  const handleRateBusiness = async (id: string | undefined, rating: number) => {
    const updatedBusiness = await BusinessService.rateBusiness(id, rating);
    if (updatedBusiness) {
      let notification = {
        receiverId: updatedBusiness.creator?._id,
        text: "rated your business.",
        silent: false,
        read: false,
        type: "business",
        payload: { business: updatedBusiness },
      };

      onAddNotification?.(notification);
      onSendNotification?.({
        ...notification,
        senderId: currentUser?._id,
        senderName: currentUser?.name,
      });

      const updatedBusinesses = businesses.map((business) =>
        business._id === updatedBusiness._id ? updatedBusiness : business
      );

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
      const receivers = currentUser?.followers;
      if (receivers && receivers?.length > 0) {
        receivers.forEach((follower) => {
          let notification = {
            receiverId: follower._id,
            text: "deleted a business.",
            silent: true,
            read: false,
            type: "businessDeletion",
            payload: { _id: id },
          };

          onAddNotification?.(notification);
          onSendNotification?.({
            ...notification,
            senderId: currentUser?._id,
            senderName: currentUser?.name,
          });
        });
      }

      const updatedBusinesses = businesses.filter(
        (business) => business._id !== id
      );
      setBusinesses(updatedBusinesses);
      selectedBusiness?._id === id && setSelectedBusiness(undefined);
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
    if (arrivalNotification?.type === "business") {
      const { business: updatedBusiness } = arrivalNotification.payload;

      const existingBusiness = businesses.find(
        (business) => business._id === updatedBusiness._id
      );

      if (!existingBusiness) {
        setBusinesses?.([updatedBusiness, ...businesses]);
      } else {
        const updatedBusinesses = businesses.map((business) =>
          business._id === updatedBusiness._id ? updatedBusiness : business
        );

        setBusinesses?.(updatedBusinesses);
      }

      selectedBusiness?._id === updatedBusiness._id &&
        setSelectedBusiness?.(updatedBusiness);
    }

    if (arrivalNotification?.type === "businessDeletion") {
      const { _id } = arrivalNotification.payload;

      const updatedBusinesses = businesses.filter(
        (business) => business._id !== _id
      );

      setBusinesses?.(updatedBusinesses);
      selectedBusiness?._id === _id && setSelectedBusiness?.(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalNotification]);

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
