import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { ProtectedRoutesProps } from "../../utils/interfaces";

const ProtectedRoutes = ({ logged, redirect }: ProtectedRoutesProps) => {
  const { currentUser } = useContext(UserContext);

  const checkProtection = () => {
    if (logged) return currentUser;
    return !currentUser;
  };

  return checkProtection() ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRoutes;
