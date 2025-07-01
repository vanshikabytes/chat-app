import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/mylogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import SocialLoginButtons from "../components/SocialLoginButtons";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = formData;
    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters.", toastOptions);
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleValidation()) return;

    setLoading(true);
    try {
      const { data } = await axios.post(loginRoute, formData);
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
    }
    setLoading(false);
  };

  return (
    <StyledContainer>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h1>CHATTERBOX</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoFocus
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <SocialLoginButtons />
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1E90FF, #151B54);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    width: 350px;
  }

  input {
    padding: 12px;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    outline: none;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  input:focus {
    border: 2px solid #1E90FF;
  }

  .password-container {
    position: relative;
  }

  .password-container input {
    width: 100%;
    padding-right: 40px;
  }

  .password-container span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 1.2rem;
    color: #1E90FF;
  }

  .btn {
    padding: 12px;
    background: #1E90FF;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn:hover {
    background: #0d6efd;
  }

  span {
    margin-top: 10px;
    color: white;
  }

  a {
    color: #00bfff;
    text-decoration: none;
    font-weight: bold;
  }
`;

export default Login;