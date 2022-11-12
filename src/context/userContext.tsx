import { useState, createContext } from "react";
import { User, UsersContext } from "../utils/interfaces";
import UserService from "../services/userService";

const INITIAL_STATE: UsersContext = {
  currentUser: null,
};

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleSignUp = async (user: User) => {
    const currentUser = await UserService.signUp(user);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  const handleSignIn = async (user: User) => {
    const currentUser = await UserService.signIn(user);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  const handleResetPassword = async (email: string) => {
    const currentUser = await UserService.resetPassword(email);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  const handleChangePassword = async (token: string, data: object) => {
    const currentUser = await UserService.changePassword(token, data);
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        onSignUp: handleSignUp,
        onSignIn: handleSignIn,
        onResetPassword: handleResetPassword,
        onChangePassword: handleChangePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
