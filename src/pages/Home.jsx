import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./css/home.css";

export function Home() {
  const { loggedIn, setLoggedIn, currentUser } = useApp();

  return loggedIn ? (
    <>
      <div className="home">
        <div className="leftHome">
          <div className="top">
            <div className="favorites"></div>
          </div>
          <div className="middle">
            <div className="recentSessions"></div>
          </div>
          <div className="bottom">
            <div className="recentShows"></div>
          </div>
        </div>
        <div className="rightHome">
          <div className="top">
            <div className="joinSession"></div>
            <div className="createSession"></div>
          </div>
          <div className="middle">
            <div className="sessions"></div>
          </div>
          <div className="bottom">
            <div className="shows"></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <Navigate to={"/login"} replace={true} />
    </>
  );
}
