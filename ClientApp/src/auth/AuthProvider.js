import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const hello = "hello";

  return (
    <AuthContext.Provider value={{ hello }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;