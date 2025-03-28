import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import axios from 'axios';
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import useLanguage from '../hooks/useLanguage';
import LoadingIndicator from './LoadingIndicator';

function Edukasi() {
  const [loading, setLoading] = useState(true);
  const [edukasi, setEdukasi] = useState([]);
  const [index, setIndex] = useState(0);
  const text = useLanguage("edukasi");

  useEffect(() => {
    getEdukasi();
  }, []);

  const getEdukasi = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/edukasi');
      setEdukasi(response.data);
    } catch (error) {
      console.error('Error fetching edukasi:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertToEmbedUrl = (url) => {
    if (!url) return "";
    const regex = /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getItemsPerSlide = () => {
    return window.innerWidth < 768 ? 1 : 2;
  };

  return (
    <div className="edukasi-page bg-blue-light my-5 pb-5" id='edukasi'>
      <Container>
        <h2 className="text-center text-blue my-4 fw-bold">{text.edukasi.title}</h2>
        
        {loading ? (
          <div className="d-flex justify-content-center text-blue my-5">
            <LoadingIndicator animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
            <span className="visually-hidden">Loading...</span>
            </LoadingIndicator>
          </div>
        ) : (
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={3000}
            indicators={true}
            nextIcon={<FaCircleRight className='text-blue ms-4' size={32} />}
            prevIcon={<FaCircleLeft className='text-blue me-4' size={32} />}
          >
            {Array.from({ length: Math.ceil(edukasi.length / getItemsPerSlide()) }).map((_, slideIndex) => (
              <Carousel.Item key={slideIndex}>
                <Row className="justify-content-center">
                  {edukasi.slice(slideIndex * getItemsPerSlide(), slideIndex * getItemsPerSlide() + getItemsPerSlide()).map((item) => (
                    <Col md={getItemsPerSlide() === 1 ? 10 : 5} key={item.id} className="video-card mx-1">
                      <div className="video-content object-fit-cover">
                        {item.konten.includes("youtube.com") || item.konten.includes("youtu.be") ? (
                          <iframe
                            className='rounded-3 w-100'
                            height="250"
                            src={convertToEmbedUrl(item.konten)}
                            title="Edukasi Video"
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <p className="text-center p-3 bg-light shadow rounded">{item.konten}</p>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
}

export default Edukasi;
