import React, { useContext, useState } from "react";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

function LoginWithAPI() {
  const naviagate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { handleLogin } = useContext(AuthContext);

  const handleLoginUser = async () => {
    const isValid = validate();
    // !true => false
    // !false  => true
    if (!isValid) {
      alert("Validation Errors. Please check the form.");
      return;
    }
    try {
      const result = await loginUser(form);
      console.log(result);
      if (result?.data?.success) {
        handleLogin(result.data.data.user);
        toast.success(result.data.message);
        setForm({ username: "", password: "" });
        naviagate("/");
      } else if (result?.response?.data) {
        toast.error(result?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {}
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
    const { username, password } = form;
    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);

    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let { username, password } = form;

  return (
    <div
      className="container mt-4 bg-light p-4 rounded "
      style={{ width: "300px" }}
    >
      <h2>Login</h2>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter username"
          className="form-control "
          name="username"
          value={username}
          onChange={handleChange}
        />
        {errors.username && (
          <span className="text-danger">{errors.username}</span>
        )}
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

      <button onClick={handleLoginUser}>Login</button>
    </div>
  );
}

export default LoginWithAPI;
