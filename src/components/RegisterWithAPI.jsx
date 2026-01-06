import React, { useState } from "react";
import { register } from "../services/authService";
import { toast } from "react-toastify";
const DefaultState = {
  email: "",
  password: "",
  username: "",
};
function Register() {
  const [form, setForm] = useState(DefaultState);

  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      alert("Validation Errors. Please check the form.");
      return;
    }

    try {
      const result = await register({ ...form });
      console.log(result);
      if (result?.data?.success) {
        toast.success(result.data.message);
        setForm(DefaultState);
      } else if (result?.response?.data) {
        toast.error(result?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

    return Object.keys(newErrors).length === 0;
  };

  let { email, password, username } = form;

  return (
    <form onSubmit={handleRegister}>
      <div
        className="container mt-4 bg-light p-4 rounded "
        style={{ width: "300px" }}
      >
        <h2>Register</h2>

        <div className="mb-2">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="form-control "
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label>Email</label>
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
          <label>Password</label>
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

        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default Register;
