import { signInWithEmailAndPassword } from "firebase/auth";
import "./css/login.css";
import { auth } from "../lib/firebase";
import { useApp } from "../contexts/AppContext";
import { useState } from "react";

export function Login() {
  const { loggedIn, setLoggedIn } = useApp();

  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, lEmail, lPassword);
      console.log(auth.currentUser.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name=""
            required
            value={lEmail}
            onChange={(e) => {
              setLEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name=""
            required
            value={lPassword}
            onChange={(e) => {
              setLPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
        {lPassword}
      </div>
    </>
  );
}
