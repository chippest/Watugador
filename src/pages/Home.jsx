import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./css/home.css";

export function Home() {
  const { loggedIn, setLoggedIn, currentUser } = useApp();

  return loggedIn ? (
    <>
      <div className="home">
        {currentUser.name}
        <img src={currentUser.avatar} alt="" />
      </div>
    </>
  ) : (
    <>
      <Navigate to={"/login"} replace={true} />
    </>
  );
}
