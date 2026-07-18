import { useState } from "react";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      setMessage("Login successful");
      setPage("home");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  // 👇 RETURN MUST BE INSIDE FUNCTION
  return (
    <div className="loginContainer">
      <div className="loginBox">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;