import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    setIsLoggedIn(true);
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => useContext(AuthContext);
export { AuthProvider, useAuth };
