import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';

const FormEditEdukasi = () => {
    const [konten, setKonten] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const text = useLanguage("edukasi");

    useEffect(() => {
        const getEdukasiById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/edukasi/${id}`);
                setKonten(response.data.konten);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getEdukasiById();
    }, [id]);

    const updateEdukasi = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!konten) {
            setMsg("Semua bidang harus diisi.");
            setLoading(false);
            return;
        }
        try {
            await axios.patch(`http://localhost:5000/edukasi/${id}`, {
                konten: konten,
            });
            navigate("/edukasi");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        } finally {
            setLoading(false);
          }
    };

    return (
        <Container className="p-3">
            <h2 className="mt-5 mb-3 text-blue fw-bold">{text.edukasi.titleEditEdukasi}</h2>
            <Card style={{maxWidth: '850px', border: 'none'}} className="bg-blue opacity-75 d-flex mx-auto shadow">
                <Card.Body>
                    {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}
                    <Form className="text-white" onSubmit={updateEdukasi}>
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
                            <Button variant="success" type="submit">
                                {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.edukasi.btnSimpan}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormEditEdukasi;