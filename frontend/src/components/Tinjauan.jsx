/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form, Alert } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";
import useLanguage from "../hooks/useLanguage";
import LoadingIndicator from './LoadingIndicator';

function Tinjauan() {
  const [loading, setLoading] = useState(true);
  const [tinjauan, setTinjauan] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(2);
  const [error, setError] = useState(null);
  const [nama, setNama] = useState("");
  const [layanan, setLayanan] = useState("");
  const [rating, setRating] = useState(0);
  const [tinjauanText, setTinjauanText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const text = useLanguage("tinjauan");

  useEffect(() => {
    getTinjauan();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTinjauan = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/tinjauan");
      setTinjauan(response.data);
    } catch (error) {
      console.error("Error fetching tinjauan:", error);
      setError("Gagal memuat data tinjauan.");
    } finally {
        setLoading(false);
      }
  };

  const handleResize = () => {
    setCardsPerSlide(window.innerWidth < 768 ? 1 : 2);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - cardsPerSlide, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + cardsPerSlide, tinjauan.length - cardsPerSlide)
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
      index < rating ? (
        <FaStar key={index} className="text-warning" onClick={() => setRating(index + 1)} />
      ) : (
        <FaRegStar key={index} className="text-muted" onClick={() => setRating(index + 1)} />
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/tinjauan", {
        nama,
        layanan,
        rating,
        tinjauan: tinjauanText,
      });
      setSuccessMessage(text.tinjauan.msg);
      setTimeout(() => setSuccessMessage(""), 5000);
      setNama("");
      setLayanan("");
      setRating(0);
      setTinjauanText("");
      getTinjauan(); 
      document.getElementById("anonimCheckbox").checked = false; 
    } catch (error) {
      console.error("Error submitting tinjauan:", error);
      setError("Gagal menambahkan tinjauan.");
    } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <div className="py-5 bg-blue" id="tinjauan">
        <Container>
          <h2 className="text-center text-blue-light fw-bold mb-5">{text.tinjauan.title}</h2>

          {loading ? (
            <div className="d-flex justify-content-center my-5">
              <LoadingIndicator animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
                <span className="visually-hidden">Loading...</span>
              </LoadingIndicator>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">{error}</Alert>
          ) : (
          <Row className="justify-content-center align-items-center flex-nowrap">
          <Col xs="auto" className="d-flex justify-content-center">
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-tinjauan d-flex align-items-center ms-2 bg-blue opacity-75 btn-hover"
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "none" }}
            >
              <FaChevronLeft className="icon-tinjauan text-white" size={32} />
            </Button>
          </Col>
            <Col xs={10} md={8}>
              <div className="d-flex justify-content-center m-md-1 gap-3 flex-wrap">
                {tinjauan.slice(currentIndex, currentIndex + cardsPerSlide).map((item) => (
                  <Card key={item.id} className="shadow-sm p-3 text-center bg-blue-light" style={{ width: "280px", maxHeight: "200px" }}>
                    <Card.Body>
                      <Card.Title>{text.tinjauan.nama}: {item.nama}</Card.Title>
                      <Card.Subtitle className="text-muted">{text.tinjauan.layanan}: {item.layanan}</Card.Subtitle>
                      <div className="my-2">{text.tinjauan.rating}: {renderStars(item.rating)}</div>
                      <Card.Text>{text.tinjauan.tinjauan}: {item.tinjauan}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
            <Col xs="auto" className="d-flex justify-content-center">
            <Button
              onClick={handleNext}
              disabled={currentIndex >= tinjauan.length - cardsPerSlide}
              className=" btn-tinjauan d-flex align-items-center me-2 bg-blue opacity-75 btn-hover"
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "none" }}
            >
              <FaChevronRight className="text-white " size={26} />
            </Button>
          </Col>
          </Row>
           )}
          <div className="text-center mt-3">
            {Array.from({ length: Math.ceil(tinjauan.length / cardsPerSlide) }, (_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentIndex(index * cardsPerSlide)}
                className={`rounded-circle mx-1 ${
                    index * cardsPerSlide === currentIndex ? "bg-blue-light" : "bg-blue-light opacity-50"
                  }`}
                style={{ width: "10px", height: "10px", padding: 0, border: "none" }}
                aria-label={`Go to slide ${index + 1}`} 
              />
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-blue-light py-5">
        <Container>
        <h2 className="text-center text-blue fw-bold mt-2 mb-3">{text.tinjauan.titleAddTinjauan}</h2>
          <div className="p-4 border rounded bg-blue opacity-75 shadow w-75 w-md-auto mx-auto">
            {successMessage && <Alert className="text-center" variant="success">{successMessage}</Alert>}
            <Form className="z-1 text-blue-light " onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-floating">
              <Form.Control 
                id="floatingTextarea" 
                placeholder="Tulis Nama" 
                type="text" 
                value={nama} 
                onChange={(e) => setNama(e.target.value)} 
                required 
              />
              <Form.Label className="text-blue" htmlFor="floatingTextarea">{text.tinjauan.nama}</Form.Label> 
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="form-check">
                <input 
                  className="form-check-input text-blue" 
                  type="checkbox" 
                  id="anonimCheckbox"
                  onChange={(e) => setNama(e.target.checked ? text.tinjauan.anonim : '')}
                />
                <label className="form-check-label text-blue-light" htmlFor="anonimCheckbox">
                   {text.tinjauan.anonimLabel}
                </label>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <select 
                className="form-select text-blue" 
                aria-label={text.tinjauan.selected}
                value={layanan} 
                onChange={(e) => setLayanan(e.target.value)} 
              >
                <option value="">{text.tinjauan.selected}</option> 
                <option value={text.tinjauan.konselingAi}>{text.tinjauan.konselingAi}</option>
                <option value={text.tinjauan.janji}>{text.tinjauan.janji}</option>
                <option value={text.tinjauan.konten}>{text.tinjauan.konten}</option>
              </select>
            </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{text.tinjauan.rating}</Form.Label>
                <div className="d-flex">
                    {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className={`star-rating ${index < rating ? "text-warning" : "text-blue-light"}`}
                        onClick={() => setRating(index + 1)}
                    >
                        {index < rating ? <FaStar size={25} /> : <FaRegStar size={30} />}
                    </span>
                    ))}
                </div>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                <Form.Control 
                  id="floatingTextarea" 
                  placeholder="Tulis Tinjauan" 
                  type="textarea" 
                  value={tinjauanText} 
                  onChange={(e) => setTinjauanText(e.target.value)} 
                  required 
                />
                <Form.Label className="text-blue" htmlFor="floatingTextarea">{text.tinjauan.tinjauan}</Form.Label> 
              </Form.Group>
              <div className="text-center">
                <Button type="submit" disabled={!nama || !layanan || !tinjauanText || rating === 0}>{text.tinjauan.addButton}</Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Tinjauan;
