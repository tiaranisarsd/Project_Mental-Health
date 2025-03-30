import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';


const FormAddEdukasi = () => {
  const [konten, setKonten] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const text = useLanguage("edukasi");

  const saveUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!konten ) {
      setMsg("Semua bidang harus diisi.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/edukasi", {
        konten: konten
      });
      navigate("/edukasi");
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
      <h2 className="mt-5 mb-3 text-blue fw-bold">{text.edukasi.addEdukasi}</h2>
      <Card style={{maxWidth: '850px', border: 'none'}} className="bg-blue opacity-75 shadow d-flex mx-auto">
        <Card.Body>
          {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}
          <Form className="text-white" onSubmit={saveUser}>
            <Form.Group className="mb-3">
              <Form.Label>{text.edukasi.konten}</Form.Label>
              <Form.Control
                type="text"
                value={konten}
                onChange={(e) => setKonten(e.target.value)}
                placeholder={text.edukasi.konten}
              />
            </Form.Group>
            <div className="d-flex justify-content-start">
              <Button variant="danger" className="me-2" onClick={() => navigate("/edukasi")}>
                <FaTimesCircle className="me-1" /> {text.edukasi.btnBatal}
              </Button>
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.edukasi.btnSimpan}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormAddEdukasi;