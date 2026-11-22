import { createContext, useState } from 'react';
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login() {
    // TODO: Call the authentication API, then setUser with the verified user.
  }
  function logout() {
    // TODO: Invalidate the session on the server during the authentication class.
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
