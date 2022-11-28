import { useState, useEffect, createContext } from "react";
import { UserHeader, User, UsersContext } from "../utils/interfaces";
import UserService from "../services/userService";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const INITIAL_STATE: UsersContext = {
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") as string)
    : null,
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") as string)
    : null,
};

UserService.http.interceptors.request.use((req: any) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("auth") as string
    )}`;
  }
  return req;
});

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  let location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser") as string)
      : null
  );

  const [users, setUsers] = useState<UserHeader[]>(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") as string)
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
      const decodedJWT = decodeJWT(user);

      if (decodedJWT.exp * 1000 < Date.now()) {
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [location]);

  const handleGetUsers = async () => {
    const users = await UserService.getUsers();
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
      setUsers(users);
    }
  };

  const handleSignUp = async (user: User) => {
    const currentUser = await UserService.signUp(user);
    if (currentUser?.user) {
      localStorage.setItem("auth", JSON.stringify(currentUser.token));
      localStorage.setItem("currentUser", JSON.stringify(currentUser.user));
      setCurrentUser(currentUser.user);
    }
  };

  const handleSignIn = async (user: User) => {
    const currentUser = await UserService.signIn(user);
    if (currentUser) {
      localStorage.setItem("auth", JSON.stringify(currentUser.token));
      localStorage.setItem("currentUser", JSON.stringify(currentUser.user));
      setCurrentUser(currentUser.user);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("users");
    setCurrentUser(null);
  };

  const handleResetPassword = async (email: string) => {
    await UserService.resetPassword(email);
  };

  const handleChangePassword = async (token: string, data: object) => {
    await UserService.changePassword(token, data);
  };

  const handleDeleteUser = async () => {
    const deleteduser = await UserService.deleteUser();
    if (!deleteduser.user) {
      localStorage.removeItem("auth");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("users");
      setCurrentUser(null);
    }
  };

  const handleFollowUser = async (id: string) => {
    const response = await UserService.followUser(id);

    if (response?.activeUser && response?.userToFollow) {
      const updatedUsers = users.map((user) =>
        user._id === response.userToFollow._id ? response.userToFollow : user
      );
      setUsers(updatedUsers);
      setCurrentUser(response.activeUser);
      localStorage.setItem("currentUser", JSON.stringify(response.activeUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        onGetUsers: handleGetUsers,
        onSignUp: handleSignUp,
        onSignIn: handleSignIn,
        onLogout: handleLogout,
        onResetPassword: handleResetPassword,
        onChangePassword: handleChangePassword,
        onDeleteUser: handleDeleteUser,
        onFollowUser: handleFollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
