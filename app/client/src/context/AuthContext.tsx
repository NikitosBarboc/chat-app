import { createContext } from "react";

export const AuthContext = createContext({
  jwtToken: '',
  userId: '',
  login: (userId: string, jwtToken: string) => {},
  logout: () => {},
  isAuthenticated: false, 
});
