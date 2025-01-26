import React from "react"
import { ChatMessageType } from "../../types/index.tsx"

export const MessageBubble: React.FC<ChatMessageType> = ({
  content,
  owner,
  persona,
  timestamp,
}) => {

  const isCurrentUser = false;

  const outClass = isCurrentUser? 'message-right' : 'message-left'
  const msgDate = new Date(timestamp).toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return (
    <div  className={outClass + " message-bubble"}>
      <div className="message-header">
        <span className="username">{persona} ({owner})</span>
        <span className="time">{msgDate}</span>
      </div>
      <div className="message-content"> {content}</div>

    </div>
  )
}