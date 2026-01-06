import React, { useState } from "react";

let EMAIL_CRED = "abc@gmail.com";
let PASSWORD_CRED = "123456";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === EMAIL_CRED && password === PASSWORD_CRED) {
      alert("Login Successful");
    } else {
      alert("Login Failed");
    }
  };
  return (
    <div
      className="container mt-4 bg-light p-4 rounded "
      style={{ width: "300px" }}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        className="form-control mb-2"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="form-control mb-2"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
