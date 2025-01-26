import React from "react";
import { ChatFeed } from "./chatFeed.tsx";
import { ChatInput } from "./chatInput.tsx";

export const ChatComponent = () => {
  return (
    <div className="chat-container">
      <ChatFeed></ChatFeed>
      <ChatInput></ChatInput>
    </div>
  )
}