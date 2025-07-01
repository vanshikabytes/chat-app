import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      if (data && currentChat) {
        const response = await axios.post(recieveMessageRoute, {
          from: data._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    socket?.current?.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
          <img
  src={
    currentChat?.avatarImage?.includes("http")
      ? currentChat.avatarImage // Use directly if it's already a URL
      : `data:image/svg+xml;base64,${currentChat.avatarImage}`
  }
  onError={(e) => {
    e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default"; // Fallback image
  }}
  alt="avatar"
/>

          </div>
          <div className="username">
            <h3>{currentChat?.username || "Unknown User"}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius:0px;
  
  @media screen and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  /* 🟢 Chat Header */
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: linear-gradient(135deg, #1E90FF, #151B54);
    
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          border: 2px solid white;
        }
      }
      
      .username {
        h3 {
          color: white;
          font-size: 1.2rem;
        }
      }
    }
  }

  /* 🟣 Chat Messages */
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 5px;
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 60%;
        padding: 1rem;
        font-size: 1rem;
        border-radius: 1rem;
        color: white;
        transition: all 0.3s ease-in-out;
        
        @media screen and (max-width: 720px) {
          max-width: 80%;
        }
      }
    }

    .sended {
      justify-content: flex-end;
      
      .content {
        background: linear-gradient(135deg, #4A90E2, #1E90FF);
        box-shadow: 0px 4px 8px rgba(30, 144, 255, 0.3);
      }
    }

    .recieved {
      justify-content: flex-start;
      
      .content {
        background: linear-gradient(135deg, #7B68EE, #8A2BE2);
        box-shadow: 0px 4px 8px rgba(138, 43, 226, 0.3);
      }
    }
  }
`;
