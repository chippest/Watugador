import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import "./css/home.css";

export function Home() {
  const { loggedIn, setLoggedIn } = useApp();

  return loggedIn ? (
    <>
      <div className="home">Home</div>
    </>
  ) : (
    <>
      <Navigate to={"/auth"} replace={true} />
    </>
  );
}
