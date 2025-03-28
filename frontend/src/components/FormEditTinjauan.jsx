import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';
import { FaStar, FaRegStar } from "react-icons/fa";

const FormEditTinjauan = () => {
   const [nama, setNama] = useState("");
    const [layanan, setLayanan] = useState("");
    const [rating, setRating] = useState("");
    const [tinjauan, setTinjauan] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const text = useLanguage("tinjauan");
    const daftarLayanan = [text.tinjauan.konselingAi, text.tinjauan.janji, text.tinjauan.konten];

    useEffect(() => {
        const getTinjauanById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tinjauan/${id}`);
                setNama(response.data.nama);
                setLayanan(response.data.layanan);
                setRating(response.data.rating);
                setTinjauan(response.data.tinjauan);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getTinjauanById();
    }, [id]);

    const updateTinjauan = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!nama || !layanan || !rating || !tinjauan) {
            setMsg("Semua bidang harus diisi.");
            setLoading(false);
            return;
        }
        try {
            await axios.patch(`http://localhost:5000/tinjauan/${id}`, {
                nama: nama,
                layanan: layanan,
                rating: rating,
                tinjauan: tinjauan
            });
            navigate("/tinjauan");
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
            <h2 className="mt-5 mb-3 text-blue fw-bold">{text.tinjauan.editTinjauan}</h2>
            <Card style={{maxWidth: '850px', border: 'none'}} className="bg-blue opacity-75 d-flex mx-auto shadow">
                <Card.Body>
                    {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}
                    <Form className="text-white" onSubmit={updateTinjauan}>
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
                            <Form.Label>Layanan</Form.Label>
                            <Form.Select
                                value={layanan}
                                onChange={(e) => setLayanan(e.target.value)}
                            >
                                <option value="" disabled>Pilih Layanan</option>
                                {daftarLayanan.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </Form.Select>
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
                            <Button variant="success" type="submit">
                                {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.tinjauan.btnSimpan}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormEditTinjauan;