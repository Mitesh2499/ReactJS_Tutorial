import React, { useState } from "react";

let EMAIL_CRED = "abc@gmail.com";
let PASSWORD_CRED = "123456";

// Name
// DOB
// Email
// Password
// Confirm Password
// Register Button

// All fields are required
// Email should be valid email
// Password should be at least 6 characters
// Password and Confirm Password should match

// let abc = {
//   email: "",
//   password: "",
// };
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
    // ....
  });

  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const isValid = validate();
    // !true => false
    // !false  => true
    if (!isValid) {
      alert("Validation Errors. Please check the form.");
      return;
    }
    if (email === EMAIL_CRED && password === PASSWORD_CRED) {
      alert("Login Successful");
    } else {
      alert("Login Failed");
    }
  };

  const handleChange = (e) => {
    console.log(e);
    // let value = e.target.value;
    // let name = e.target.name;
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type == "checkbox" ? checked : value });
  };

  const validate = () => {
    let newErrors = {};
    const { email, password } = form;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) === false
    ) {
      newErrors.email = "Invalid Email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);

    // {
    //     "Email is required",
    //     "Password is required"
    // }
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let { email, password, rememberMe } = form;

  // Register Form
  //name
  // email
  // Phone Number
  // password
  // Confirm Password

  return (
    <div
      className="container mt-4 bg-light p-4 rounded "
      style={{ width: "300px" }}
    >
      <h2>Login</h2>
      <div className="mb-2">
        <input
          type="email"
          placeholder="Enter Email"
          className="form-control "
          name="email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>
      <div className="mb-2">
        <input
          type="password"
          placeholder="Enter password"
          className="form-control "
          name="password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
      </div>
      <input
        type="checkbox"
        name="rememberMe"
        checked={rememberMe}
        onChange={handleChange}
      />{" "}
      Remember Me
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
