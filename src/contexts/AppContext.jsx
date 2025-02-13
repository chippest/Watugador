import { createContext, useContext, useState } from "react";
import { auth } from "../lib/firebase";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [changingPage, setChangingPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function logOut() {
    auth.signOut();
  }

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        loggingIn,
        setLoggingIn,
        currentPage,
        setCurrentPage,
        changingPage,
        setChangingPage,
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
