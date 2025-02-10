import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  userInitials: string;
  userRole: string;
  userId: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("jwtToken");
  });

  const [userInitials, setUserInitials] = useState<string>(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const { username } = decodedToken;
        if (username) {
          return username
            .split(" ")
            .map((name: string) => name.charAt(0).toUpperCase())
            .join("");
        }
      } catch {
        return "";
      }
    }
    return "";
  });

  const [userRole, setUserRole] = useState<string>(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.role || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [userId, setUserId] = useState<string>(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.id || ""; 
      } catch {
        return "";
      }
    }
    return "";
  });
  

  const login = (token: string) => {
    localStorage.setItem("jwtToken", token);
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const { username, role, id } = decodedToken;

    const initials = username
      .split(" ")
      .map((name: string) => name.charAt(0).toUpperCase())
      .join("");

    setUserInitials(initials);
    setUserRole(role || "");
    setUserId(id || "");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUserInitials("");
    setUserRole("");
    setUserId("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInitials, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
