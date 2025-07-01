/* import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/mylogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import SocialLoginButtons from "../components/SocialLoginButtons";

function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = formData;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal to or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = formData;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };


  return (
    <>
      <FormContainer>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>CHATTER BOX</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit"className="btn">Create User</button>
          <SocialLoginButtons/>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #151B54;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: white;
    padding: 2rem;
    border-radius: 10px;
  }

  input {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }

  .btn {
    padding: 10px;
    background: #151B54;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #1E90FF;
    }
  }

  span {
    margin-top: 10px;
    color: grey;
  }

  a {
    color: #1E90FF;
    text-decoration: none;
    font-weight: bold;
  }
`;

export default Register;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../assets/mylogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import SocialLoginButtons from "../components/SocialLoginButtons";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
   useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = formData;
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.", toastOptions);
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.", toastOptions);
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = formData;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>CHATTER BOX</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="btn">
            Create Account
          </button>
          <SocialLoginButtons />
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
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

export default Register;