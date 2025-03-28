import React from 'react'
import { TbMessageChatbotFilled, TbUser } from 'react-icons/tb';

const ChatMessage = (chat) => {
  return (
    <div className={`p-2 rounded message bg-blue-light text-start ${
        chat.role === "model" ? 'bot' : 'user'
      }-message`}
      style={{ overflowWrap: 'break-word', whiteSpace: 'normal' }}
    >
        {chat.role === "model" && <TbMessageChatbotFilled className="rounded-circle p-2 flex-shrink-0 bg-blue"
        style={{ height: '35px', width: '35px', fill: 'white' }} />}
        <div className='text-end'>
          {chat.role === "user" && <TbUser className="rounded-circle p-2 flex-shrink-0 bg-blue"
            style={{ height: '35px', width: '35px', fill: 'white' }} />}
            </div>
        <p className='message-text text-blue'>{chat.text}</p>
    </div>
  )
}

export default ChatMessage