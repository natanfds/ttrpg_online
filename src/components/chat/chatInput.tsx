import EmojiPicker from 'emoji-picker-react';
import React from 'react';
import { useState } from 'react';

export const ChatInput = () => {
  const [msg, setMsg] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const onEmojiClick = (emoji:any) => {
    console.log(msg)
    setMsg(msg + emoji.emoji);
  }


  const personas = [
    { id: 1, nome: 'Persona 1' },
    { id: 2, nome: 'Persona 2' },
    { id: 3, nome: 'Persona 3' },
  ];

  return (
    <div className='container'>
      
      <div className='formGroup'>
        <label htmlFor='personaField'>Falar como:</label>
        <select id='personaField' value="">
          {personas.map((persona) => 
            (<option key={persona.id} value={persona.id}>
            {persona.nome}
            </option>)
          )}
        </select>
        <img alt="avatar dinamico"/>
      </div>

      <div className='formGroup messageGroup'>
        <label htmlFor='messageField'>Mensagem:</label>
        <textarea 
          id="messageField"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Digite sua mensagem..."
        
        ></textarea>
        <div className="emoji-container">
            <button 
              type="button" 
              className="emoji-button"
              onClick={() => setShowEmojis(!showEmojis)}
            >
              😊
            </button>
            
            {showEmojis && (
              <div className="emoji-picker-container">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        <button>Enviar</button>
      </div>

      
      
    </div>
  )
}