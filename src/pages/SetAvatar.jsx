import React, { useEffect, useState } from "react"; 
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loadingError, setLoadingError] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAvatars = async () => {
    setIsLoading(true);
    setLoadingError(false);
    try {
      const avatarUrls = [];
      for (let i = 0; i < 4; i++) {
        const randomId = Math.floor(Math.random() * 1000);
        const imageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomId}`;
        avatarUrls.push(imageUrl);
      }
      setAvatars(avatarUrls);
    } catch (error) {
      setLoadingError(true);
      toast.error("Failed to load avatars. Please try again.", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          {loadingError ? (
            <p className="error">Error loading avatars. Try refreshing.</p>
          ) : (
            <div className="avatars">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img src={avatar} alt="avatar" />
                </div>
              ))}
            </div>
          )}
          <div className="buttons">
            <button onClick={fetchAvatars} className="refresh-btn">Refresh Avatars</button>
            <button onClick={setProfilePicture} className="submit-btn">Set as Profile Picture</button>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background-color: rgb(6, 6, 12);
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container h1 {
    color: white;
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease-in-out, border 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      img {
        height: 6rem;
        transition: opacity 0.3s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #1E90FF;
      transform: scale(1.2);
    }
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }

  .submit-btn, .refresh-btn {
    background-color: #151B54;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #1E90FF;
    }
  }

  .error {
    color: red;
    font-weight: bold;
  }
`;
