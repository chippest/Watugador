import { signInWithEmailAndPassword } from "firebase/auth";
import "./css/login.css";
import { auth, db } from "../lib/firebase";
import { useApp } from "../contexts/AppContext";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { loggedIn, setLoggedIn, setCurrentUser, setChangingPage } = useApp();

  const [loading, setLoading] = useState(false);
  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");

  const navigate = useNavigate();

  function handleNavButtonClick(page) {
    setChangingPage(true);
    setTimeout(() => {
      navigate(page);
    }, 100);
    setTimeout(() => {
      setChangingPage(false);
    }, 200);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, lEmail, lPassword);
      console.log(auth.currentUser.email);
      // Fetch additional data from Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid); // Assuming Firestore documents use user UID
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Attach additional data to auth.currentUser
        setCurrentUser(userData);

        console.log("Additional User Data:", userData);
        handleNavButtonClick("home");
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="email"
              name=""
              required
              placeholder="Email"
              value={lEmail}
              onChange={(e) => {
                setLEmail(e.target.value);
              }}
            />
            <span class="inpBDR"></span>
          </div>
          <div className="form-control">
            <input
              type="password"
              name=""
              required
              placeholder="Password"
              value={lPassword}
              onChange={(e) => {
                setLPassword(e.target.value);
              }}
            />
            <span class="inpBDR"></span>
          </div>
          <button type="submit" className={loading ? "btnDis" : ""}>
            <span>{loading ? "Logging In" : "Login"}</span>
          </button>
        </form>
        <div className="design">
          <div class="top">LOGIN</div>
          <div class="bottom" aria-hidden="true">
            LOGIN
          </div>
        </div>
      </div>
    </>
  );
}
