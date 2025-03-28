import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import hero from '../hero-image.png';
import useLanguage from '../hooks/useLanguage';
import BuatJanji from './BuatJanji';
import Chatbot from './Chatbot';

function Hero() {
  const text = useLanguage("hero");
  const [showModal, setShowModal] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const toggleChatbot = () => {
    console.log("Chatbot button clicked!"); // Debugging
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div className="hero-section bg-blue text-light py-3 px-1" id='beranda'>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col md={6} className='text-center text-md-start mx-1'>
            <h1 className="hero-title mt-4 fs-2 fw-bold"> {text.hero.title}</h1>
            <p className="hero-subtitle fs-6 fst-italic"> {text.hero.subtitle}</p>
            <p className="hero-description">
              {text.hero.description}
            </p>
            <div className='mb-5 d-grid d-md-block'>
              <Button variant="success" className="me-md-2 mb-2 mb-md-0" onClick={toggleChatbot}>
                {text.hero.konsultasi}
              </Button>
              <Button variant="success" onClick={handleShowModal}>{text.hero.janji}</Button>
            </div>
          </Col>
          <Col style={{ maxWidth: '400px', maxHeight: '400px' }} md={6} className='text-center'>
            <img src={hero} alt="Hero" className="img-fluid" />
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header className='bg-blue text-blue-light' closeButton>
          <Modal.Title className='mx-auto me-2 fw-bold'>{text.hero.janji}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='my-1 p-1'>
          <BuatJanji closeModal={handleCloseModal} />
        </Modal.Body>
      </Modal>

      <Chatbot isChatOpen={isChatbotOpen} toggleChat={toggleChatbot} />
    </div>
  );
}

export default Hero;
