import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const docRef = doc(db, "users", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role;
        
        toast.success("Login Successful!")
        role === "admin"
          ? navigate("/admin-dashboard")
          : navigate("/home");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
  <div className="auth">
    <form className="form_main" onSubmit={handleLogin}>
      <h2 className="heading">Login</h2>

      <div className="inputContainer">
        <input
          type="email"
          className="inputField"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="inputContainer">
        <input
          type="password"
          className="inputField"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Login</button>

      <p className="link" onClick={() => navigate("/")}>
        New user? Register
      </p>
    </form>
  </div>
);

};

export default Login;
