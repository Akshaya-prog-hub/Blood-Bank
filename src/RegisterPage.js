import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
console.log(email, password);

      // save role in firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email,
        role: role,
        createdAt: new Date(),
      });

      role === "admin"
        ? navigate("/admin-dashboard")
        : navigate("home");
    }catch (error) {
  if (error.code === "auth/email-already-in-use") {
    alert("This Mail is Already Registered,Pleasen to Continue");
    navigate("/login")
  } else if (error.code === "auth/weak-password") {
    alert("Please enter six digits of password");
  } else {
    alert(error.message);
  }
}

  };

 return (
  <div className="auth">
    <form className="form_main" onSubmit={handleRegister}>
      <h2 className="heading">Register</h2>

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

      <div className="inputContainer">
        <select
          className="inputField"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit">Register</button>

      <p className="link" onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </form>
  </div>
);

};

export default Register;
