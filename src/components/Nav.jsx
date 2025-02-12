import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./css/nav.css";
import { useEffect } from "react";

export function Nav() {
  const {
    loggedIn,
    setLoggedIn,
    currentPage,
    setCurrentPage,
    changingPage,
    setChangingPage,
    loading,
    setLoading,
  } = useApp();
  const navigate = useNavigate();

  function handleNavButtonClick(page) {
    if (page.toLowerCase() === currentPage.toLowerCase()) return;
    setChangingPage(true);
    setTimeout(() => {
      navigate(page);
    }, 100);
    setTimeout(() => {
      setChangingPage(false);
    }, 200);
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("home");
    } else {
      navigate("login");
    }
  }, [loggedIn]);

  return (
    <>
      <div className={changingPage ? "nav changing" : "nav"}>
        {!loading ? (
          loggedIn ? (
            <>
              <div
                class="navButton"
                onClick={() => {
                  handleNavButtonClick("home");
                }}
              >
                <button
                  className={currentPage === "Home" ? "box hoveredNav" : "box"}
                >
                  <i class="fa-duotone fa-solid fa-house"></i>
                </button>
                <div className="title">Home</div>
              </div>
            </>
          ) : (
            <>
              <div
                class="navButton"
                onClick={() => {
                  handleNavButtonClick("login");
                }}
              >
                <button
                  className={currentPage === "Login" ? "box hoveredNav" : "box"}
                >
                  <i class="fa-duotone fa-regular fa-right-to-bracket"></i>
                </button>
                <div className="title">Login</div>
              </div>
              <div
                class="navButton"
                onClick={() => {
                  handleNavButtonClick("register");
                }}
              >
                <button
                  className={
                    currentPage === "Register" ? "box hoveredNav" : "box"
                  }
                >
                  <i class="fa-duotone fa-solid fa-square-plus"></i>
                </button>
                <div className="title">Register</div>
              </div>
            </>
          )
        ) : (
          <>
            <div class="navButton">
              <button className="box hoveredNav">
                <i class="fa-duotone fa-solid fa-loader"></i>
              </button>
              <div className="title">Loading</div>
            </div>
          </>
        )}
        <div class="navButton">
          <button className="box signOutBtn">
            <i class="fa-duotone fa-solid fa-loader"></i>
          </button>
          <div className="title">Loading</div>
        </div>
      </div>
    </>
  );
}
