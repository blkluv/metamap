// @ts-nocheck
import { useState, useEffect, createContext } from "react";
import { User, UserResponse, UsersContext } from "../utils/interfaces";
import UserService from "../services/userService";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE: UsersContext = {
  currentUser: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
};

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(currentUser));
  }, [currentUser]);

  const handleSignUp = async (user: User) => {
    const currentUser = await UserService.signUp(user);
    if (currentUser) {
      navigate("/dashboard/events");
      setCurrentUser(currentUser);
    }
  };

  const handleSignIn = async (user: User) => {
    const currentUser = await UserService.signIn(user);
    if (currentUser) {
      navigate("/dashboard/events");
      setCurrentUser(currentUser);
    }
  };

  const handleLogout = () => {
    navigate("/account/signin");
    setCurrentUser(null);
    localStorage.removeItem("auth");
  };

  const handleResetPassword = async (email: string) => {
    await UserService.resetPassword(email);
  };

  const handleChangePassword = async (token: string, data: object) => {
    await UserService.changePassword(token, data);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        onSignUp: handleSignUp,
        onSignIn: handleSignIn,
        onLogout: handleLogout,
        onResetPassword: handleResetPassword,
        onChangePassword: handleChangePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
