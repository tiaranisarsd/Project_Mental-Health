/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { TbMessageChatbotFilled, TbX } from 'react-icons/tb';
import ChatForm from './Chatbot/ChatForm';
import ChatMessage from './Chatbot/ChatMessage';
import { MentalHealthInfo } from '../MentalHealthInfo';

const Chatbot = ({ isChatOpen, toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true,
    role: "model",
    text: MentalHealthInfo.replace(/\n/g, '<br />') 
  }]);
  const chatBodyRef = useRef(null);
  const chatbotRef = useRef(null);
  const inputRef = useRef();

  const generateBotResponse = async (history) => {
    const lastMessage = history[history.length - 1]?.text.toLowerCase();

    if (lastMessage === "hai" || lastMessage === "halo") {
      setChatHistory(prev => [...prev, { role: "model", text: MentalHealthInfo.replace(/\n/g, '<br />') }]); // Tambahkan replace untuk baris baru
      return;
    }

    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text: text.replace(/\n/g, '<br />') }]); // Tambahkan replace untuk baris baru
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
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
  }, [isChatOpen, toggleChat]);

  useEffect(() => {
    if (isChatOpen) {
      setMessages([
        {
          role: 'model',
          text: 'Halo, ada yang bisa dibantu?',
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      className="position-fixed bottom-0 end-0 pb-4 m-4"
      style={{ cursor: 'pointer', zIndex: 1000 }}
    >
      {isChatOpen ? (
        <div
          className="chatbot-container mb-4 border rounded overflow-auto d-flex flex-column"
          style={{
            width: '90vw', 
            maxWidth: '400px', 
            height: '80vh', 
            maxHeight: '460px', 
          }}
          ref={chatbotRef}
        >
          <div className="chatbot-header bg-blue text-white p-2 d-flex justify-content-between align-items-center">
            <TbMessageChatbotFilled className="me-2" /> Chatbot
            <TbX size={20} style={{ cursor: 'pointer' }} onClick={toggleChat} />
          </div>
          <div
            className="chatbot-body d-flex flex-column bg-blue p-3 flex-grow-1"
            ref={chatBodyRef}
            style={{ overflow: 'auto', gap: '11px', height: '100%', padding: '25px' }}
          >
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
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