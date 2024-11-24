import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [changingPage, setChangingPage] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        currentPage,
        setCurrentPage,
        changingPage,
        setChangingPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
