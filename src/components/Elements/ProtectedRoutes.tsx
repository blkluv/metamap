import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ProtectedRoutesProps, ReduxState } from "../../utils/interfaces";

const ProtectedRoutes = ({ logged, redirect }: ProtectedRoutesProps) => {
  const currentUser = useSelector(
    (state: ReduxState) => state.currentUser.data
  );

  const checkProtection = () => {
    if (logged) return currentUser;
    return !currentUser;
  };

  return checkProtection() ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRoutes;
