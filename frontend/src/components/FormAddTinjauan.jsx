import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';
import { FaStar, FaRegStar } from "react-icons/fa";


const FormAddTinjauan = () => {
  const [nama, setNama] = useState("");
  const [layanan, setLayanan] = useState("");
  const [rating, setRating] = useState("");
  const [tinjauan, setTinjauan] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const text = useLanguage("tinjauan");

  const saveUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nama || !layanan || !rating || !tinjauan ) {
      setMsg("Semua bidang harus diisi.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/tinjauan", {
        nama: nama,
        layanan: layanan,
        rating: rating,
        tinjauan: tinjauan
      });
      navigate("/tinjauan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan. Coba lagi nanti.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-3">
      <h2 className="mt-5 mb-3 text-blue fw-bold">{text.tinjauan.addTinjauan}</h2>
      <Card style={{maxWidth: '850px', border: 'none'}} className="bg-blue opacity-75 shadow d-flex mx-auto">
        <Card.Body>
          {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}
          <Form className="text-blue-light" onSubmit={saveUser}>
            <Form.Group className="mb-3">
              <Form.Label>{text.tinjauan.nama}</Form.Label>
              <Form.Control
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder={text.tinjauan.nama}
              />
            </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>{text.tinjauan.layanan}</Form.Label>
               <select 
                className="form-select" 
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
                            <Form.Group className="mb-3">
                            <Form.Label className="text-blue-light" >{text.tinjauan.tinjauan}</Form.Label> 
                            <Form.Control 
                              placeholder="Tulis Tinjauan" 
                              type="textarea" 
                              value={tinjauan} 
                              onChange={(e) => setTinjauan(e.target.value)} 
                              required 
                            />
                          </Form.Group>        
                        <div className="d-flex justify-content-start">
                        <Button variant="danger" className="me-2" onClick={() => navigate("/tinjauan")}>
                            <FaTimesCircle className="me-1" /> {text.tinjauan.btnBatal}
                        </Button>
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.tinjauan.btnSimpan}
                        </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormAddTinjauan;