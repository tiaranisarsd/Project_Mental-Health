import React from 'react';
import { TbMessageChatbotFilled } from 'react-icons/tb';

const ChatMessage = ({ role, text, isError, hideInChat }) => {
  const isBot = role === 'model';

  return (
    !hideInChat && (
      <div className={`d-flex ${isBot ? 'justify-content-start' : 'justify-content-end'} mb-2`}>
        {isBot && (
          <TbMessageChatbotFilled
            className="me-2"
            style={{ height: '20px', width: '20px', fill: 'white' }}
          />
        )}
        <div
          className={`p-2 ${
            isBot
              ? isError
                ? 'bg-danger text-white bot-bubble'
                : 'bg-blue-light text-blue bot-bubble'
              : isError
                ? 'bg-danger text-white user-bubble'
                : 'bg-blue-light text-blue user-bubble'
          }`}
          style={{
            maxWidth: '70%',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
          }}
          dangerouslySetInnerHTML={{ __html: text }} 
        >
        </div>
      </div>
    )
  );
};

export default ChatMessage;