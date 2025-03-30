import React, { useState, useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Edukasi from '../components/Edukasi';
import Tinjauan from '../components/Tinjauan';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { TbMessageChatbotFilled, TbX } from 'react-icons/tb';

const Beranda = () => {
  const [loading, setLoading] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChatbot = () => {
    console.log('Chatbot button clicked!'); // Debugging
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="d-flex justify-content-center text-blue my-5">
          <LoadingIndicator
            animation="border"
            role="status"
            style={{ width: '5rem', height: '5rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </LoadingIndicator>
        </div>
      ) : (
        <>
          <Header />
          <Hero />
          <Edukasi />
          <Tinjauan />
          <Footer />

          {isChatbotOpen ? (
            <div style={{position: 'relative'}}>
              <Chatbot isChatOpen={isChatbotOpen} toggleChat={toggleChatbot} />
              <div
                onClick={toggleChatbot}
                className="position-fixed bottom-0 end-0 m-3"
                style={{ cursor: 'pointer', zIndex: 1001 }}
              >
                <TbX size={50} className="bg-blue shadow btn-hover text-white rounded-circle p-2" />
              </div>
            </div>
          ) : (
            <div
              onClick={toggleChatbot}
              className="position-fixed bottom-0 end-0 m-3"
              style={{ cursor: 'pointer', zIndex: 1000 }}
            >
              <TbMessageChatbotFilled
                size={50}
                className="bg-blue shadow btn-hover text-white p-2 rounded-circle"
              />
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Beranda;