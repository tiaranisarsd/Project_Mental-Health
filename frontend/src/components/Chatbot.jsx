/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { TbMessageChatbotFilled, TbX } from 'react-icons/tb';
import ChatForm from './Chatbot/ChatForm';
import ChatMessage from './Chatbot/ChatMessage';

const Chatbot = ({ isChatOpen, toggleChat,  }) => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);
  const chatbotRef = useRef(null);
  const inputRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== 'Thinking...'),
        { role: 'model', text },
      ]);
    };
  
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history }),
    };
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
  
      if (!apiUrl) {
        console.error('REACT_APP_API_URL is not defined in .env file.');
        return; 
      }
  
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          throw new Error(data.error.message || 'Something went wrong!');
        } else {
          const text = await response.text();
          throw new Error(`Server returned non-JSON response: ${text}`);
        }
      }
  
      const data = await response.json();
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        inputRef.current !== event.target
      ) {
        toggleChat();
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      setMessages([
        {
          role: "model",
          text: "Halo, ada yang bisa dibantu?",
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [isChatOpen]);

  return (
    <div
      className="position-fixed bottom-0 end-0 pb-4 m-4"
      style={{ cursor: 'pointer', zIndex: 1000 }}
    >
      {isChatOpen ? (
        <div
          className="chatbot-container mb-4 border rounded overflow-hidden d-flex flex-column"
          style={{ width: '400px', height: '300px' }}
          ref={chatbotRef}
        >
          <div className="chatbot-header bg-blue text-white p-2 d-flex justify-content-between align-items-center">
            <TbMessageChatbotFilled className="me-2" /> Chatbot
            <TbX size={20} style={{ cursor: 'pointer' }} onClick={toggleChat} />
          </div>
          <div
          className="chatbot-body d-flex flex-column bg-blue p-3 flex-grow-1"
          ref={chatBodyRef}
          style={{ overflowY: 'auto', gap: '11px', height: '460px', padding: '25px' }}
        >
          {/* Tampilkan pesan awal chatbot */}
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {/* Tampilkan riwayat percakapan */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} {...chat} />
          ))}
        </div>
          <div className="chatbot-footer p-2 bg-blue-light">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Chatbot;
