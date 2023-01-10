import { useState, useEffect, createContext, useContext } from "react";
import { Business, BusinessesContext } from "../utils/interfaces";
import BusinessService from "../services/businessService";
import UserContext from "./userContext";

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

  const getBusinesses = async () => {
    const businesses = await BusinessService.getBusinesses();
    if (businesses) {
      setBusinesses(businesses);
    }
  };

  const handleAddBusiness = async (business: Business) => {
    const newBusiness = await BusinessService.addBusiness(business);
    if (newBusiness) {
      setBusinesses((businesses) => [newBusiness, ...businesses]);
    }
  };

  const handleLikeBusiness = async (id: string | undefined) => {
    const updatedBusiness = await BusinessService.likeBusiness(id);
    if (updatedBusiness) {
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

  useEffect(() => {
    const loggedUser = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null;
    if (loggedUser) {
      getBusinesses();
    }
  }, [currentUser]);

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
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
