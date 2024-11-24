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
import { PageSwitcher } from "./components/PageSwitcher";

export function Watugador() {
  const {
    currentPage,
    loggedIn,
    setCurrentPage,
    changingPage,
    setChangingPage,
  } = useApp();

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
              <Route path="pic" element={<ImageSelectionForm />} />
            </Routes>
            {currentPage === "Home" ? (
              <>
                <Home />
              </>
            ) : currentPage === "Login" ? (
              <>
                <Login />
              </>
            ) : (
              currentPage === "Register" && (
                <>
                  <Register />
                </>
              )
            )}
          </div>
          <Nav />
        </div>
      </Router>
    </>
  );
}
