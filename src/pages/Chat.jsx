import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // ✅ Corrected `useEffect` for fetching current user
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!storedUser) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, [navigate]);

  // ✅ Connect socket when `currentUser` is available
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // ✅ Corrected `useEffect` for fetching contacts
  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);

  // ✅ Function to handle chat change
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} socket={socket} />}
      </div>
    </Container>
  );
}

  const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1E90FF, #151B54);
  
  .container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 25% 75%;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    @media screen and (max-width: 1080px) {
      grid-template-columns: 30% 70%;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 100%;
    }
  }
`;

