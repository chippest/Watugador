import { useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./css/nav.css";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export function Nav() {
  const {
    loggedIn,
    setLoggedIn,
    currentUser,
    setCurrentUser,
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

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log(auth.currentUser?.email);
      setCurrentUser(null);
      handleNavButtonClick("login");
      setLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={changingPage ? "nav changing" : "nav"}>
        {!loading ? (
          loggedIn ? (
            <>
              <div class="navButton accountBtn">
                <button className="box">
                  <i class="fa-duotone fa-solid fa-user"></i>
                </button>
                <div className="title">Profile</div>
              </div>
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
              <div class="navButton  signOutBtn" onClick={handleSignOut}>
                <button className="box">
                  <i class="fa-duotone fa-solid fa-right-from-bracket"></i>
                </button>
                <div className="title">SignOut</div>
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
      </div>
    </>
  );
}
