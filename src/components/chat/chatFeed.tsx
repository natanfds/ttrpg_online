import React from "react"
import { ChatMessageType } from "../../types/index.tsx"
import { MessageBubble } from "./messageBubble.tsx"

export const ChatFeed = () => {
  const msgs: ChatMessageType[] = [
    {
      content: "oi",
      owner: "you",
      persona: "tatsu",
      timestamp: 0,
    }
  ] 

  return(<div id="chat-warp">
    {msgs.map((msg: ChatMessageType) => {
      return <MessageBubble
        persona={msg.persona}
        content={msg.content}
        owner={msg.owner}
        timestamp={msg.timestamp}>
        </MessageBubble>
    })}

  </div>)

}