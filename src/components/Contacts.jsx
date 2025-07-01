import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/mylogo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (storedUser) {
        try {
          const data = JSON.parse(storedUser);
          setCurrentUserName(data?.username || "Guest");
          setCurrentUserImage(data?.avatarImage || "");
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chatter Box</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={
                      contact.avatarImage.startsWith("http")
                        ? contact.avatarImage
                        : `data:image/svg+xml;base64,${contact.avatarImage}`
                    }
                    onError={(e) => (e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=error")}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              {currentUserImage && (
                <img
                  src={
                    currentUserImage.startsWith("http")
                      ? currentUserImage
                      : `data:image/svg+xml;base64,${currentUserImage}`
                  }
                  onError={(e) => (e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default")}
                  alt="avatar"
                />
              )}
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 0px;
  padding: 1rem;
  height: 100%;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    
    img {
      height: 3rem;
    }
    
    h3 {
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: bold;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;
    padding: 1rem 0;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #7c6de6, #4a90e2);
      border-radius: 5px;
    }

    .contact {
      background: rgba(255, 255, 255, 0.2);
      min-height: 5rem;
      width: 90%;
      border-radius: 10px;
      padding: 0.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      position: relative;

      &:hover {
        background: rgba(154, 134, 243, 0.4);
        transform: scale(1.05);
      }

      .avatar {
        img {
          height: 3.5rem;
          width: 3.5rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #7c6de6;
          transition: border 0.3s ease-in-out;
        }
      }

      .username {
        h3 {
          color: white;
          font-weight: bold;
          letter-spacing: 1px;
        }
      }
    }

    .selected {
      background: linear-gradient(135deg, #7c6de6, #4a90e2);
      box-shadow: 0px 0px 10px rgba(124, 109, 230, 0.5);
    }
  }

  .current-user {
    background: rgba(255, 255, 255, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 1rem;
    backdrop-filter: blur(10px);

    .avatar {
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #4a90e2;
      }
    }

    .username {
      h2 {
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .brand img {
      height: 2.5rem;
    }

    .contacts .contact .avatar img {
      height: 3rem;
      width: 3rem;
    }

    .current-user .avatar img {
      height: 3.5rem;
      width: 3.5rem;
    }

    .current-user .username h2 {
      font-size: 1.2rem;
    }
  }
`;
