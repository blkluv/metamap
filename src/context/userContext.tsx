import { useState, useEffect, createContext } from "react";
import { User, UserResponse, UsersContext } from "../utils/interfaces";
import UserService from "../services/userService";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const INITIAL_STATE: UsersContext = {
  currentUser: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth") as string)
    : null,
};

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  let location = useLocation();

  const [currentUser, setCurrentUser] = useState<UserResponse | null>(
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") as string)
      : null
  );

  const decodeJWT = (token: string): any => {
    try {
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("auth") as string);

    if (user) {
      const decodedJWT = decodeJWT(user.token);

      if (decodedJWT.exp * 1000 < Date.now()) {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [location]);

  const handleSignUp = async (user: User) => {
    const currentUser = await UserService.signUp(user);
    if (currentUser) {
      localStorage.setItem("auth", JSON.stringify(currentUser));
      setCurrentUser(currentUser);
    }
  };

  const handleSignIn = async (user: User) => {
    const currentUser = await UserService.signIn(user);
    if (currentUser) {
      localStorage.setItem("auth", JSON.stringify(currentUser));
      setCurrentUser(currentUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setCurrentUser(null);
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
