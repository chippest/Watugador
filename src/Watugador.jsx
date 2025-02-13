import "./watugador.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { useApp } from "./contexts/AppContext";
import { ImageSelectionForm } from "./components/Pic";
import { Nav } from "./components/Nav";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useEffect } from "react";
import { PageSwitcher } from "./contexts/PageSwitcher";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Loading } from "./pages/Loading";
import { Library } from "./pages/Library";

export function Watugador() {
  const {
    currentPage,
    loggedIn,
    setLoggedIn,
    setCurrentPage,
    changingPage,
    setChangingPage,
    setCurrentUser,
    loading,
    setLoading,
  } = useApp();

  useEffect(() => {
    // Firebase is accessible, continue with normal Firebase login flow
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user document from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            // Set current user details from Firestore
            const userData = userDoc.data();

            // Attach additional data to auth.currentUser
            setCurrentUser(userData);
            setLoggedIn(true);
            setChangingPage(true);
            setTimeout(() => {
              setLoading(false);
              setCurrentPage("home");
            }, 100);
            setTimeout(() => {
              setChangingPage(false);
            }, 200);
          } else {
          }
        } catch (error) {}
      } else {
        setLoggedIn(false);
        setCurrentUser(null); // Clear the current user state if logged out
        setChangingPage(true);
        setTimeout(() => {
          setLoading(false);
          setCurrentPage("home");
        }, 100);
        setTimeout(() => {
          setChangingPage(false);
        }, 200);
      }
    });

    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  return (
    <>
      <Router>
        <div className="watugador">
          <div className={changingPage ? "page changing" : "page"}>
            <Routes>
              <Route index element={<PageSwitcher page={"Home"} />} />
              <Route
                path="register"
                element={<PageSwitcher page={"Register"} />}
              />
              <Route path="login" element={<PageSwitcher page={"Login"} />} />
              <Route path="home" element={<PageSwitcher page={"Home"} />} />
              <Route
                path="library"
                element={<PageSwitcher page={"Library"} />}
              />
              <Route path="pic" element={<ImageSelectionForm />} />
            </Routes>
            {!loading ? (
              currentPage === "Home" ? (
                <>
                  <Home />
                </>
              ) : currentPage === "Login" ? (
                <>
                  <Login />
                </>
              ) : currentPage === "Library" ? (
                <>
                  <Library />
                </>
              ) : (
                currentPage === "Register" && (
                  <>
                    <Register />
                  </>
                )
              )
            ) : (
              <Loading />
            )}
          </div>
          <Nav />
        </div>
      </Router>
    </>
  );
}
