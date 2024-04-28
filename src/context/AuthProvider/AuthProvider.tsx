import Cookies from "js-cookie";
import * as React from "react";
import { useMemo } from "react";
import { apiLoadMe } from "../../api/userApi";
import { User } from "../../interfaces/User";

interface AuthContextType {
  user?: User;
  signin: (user: User, token: string) => void;
  signout: () => void;
  loadMe: () => void;
  isAuthenticated: boolean;
  currentRole: string;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [user, setUser] = React.useState<User>();

  const signin = (user: User, token: string) => {
    setUser(user);
    Cookies.set("wonders_token", token);
  };

  const signout = () => {
    Cookies.remove("wonders_token");
    setUser(undefined);
  };

  const loadMe = () => {
    if (!user) {
      apiLoadMe()
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          signout();
        });
    }
  };

  const isAuthenticated = () => {
    const userToken = Cookies.get("wonders_token");
    return !!userToken;
  };

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      signin,
      signout,
      loadMe,
      isAuthenticated: isAuthenticated(),
      currentRole: user?.role ?? "",
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
