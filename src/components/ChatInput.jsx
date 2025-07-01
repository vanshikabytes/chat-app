import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1E90FF, #151B54);
  padding: 0.8rem 1rem;
  border-radius: 10px;
  position: relative;
  width: 100%;
  
  .button-container {
    display: flex;
    align-items: center;
    position: relative;

    .emoji {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 5px;

      svg {
        font-size: 1.6rem;
        color: #ffd700;
        transition: transform 0.2s ease-in-out;
      }

      &:hover svg {
        transform: scale(1.2);
      }

      .emoji-picker-container {
        position: absolute;
        bottom: 50px;
        left: 0;
        z-index: 10;
        background: #fff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        width: 320px;
      }
    }
  }

  .input-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease-in-out;

    &:focus-within {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    input {
      flex-grow: 1;
      background: transparent;
      color: white;
      border: none;
      font-size: 1rem;
      outline: none;
      padding: 0.5rem;

      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #4a90e2;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 4px 8px rgba(74, 144, 226, 0.3);

      &:hover {
        background: #7c6de6;
      }

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
