import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';

const FormAddJanji = () => {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [no_telp, setNoTelp] = useState("");
    const [domisili, setDomisili] = useState("");
    const [kategori_pengguna, setKategori] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jenis_konsultasi, setJenis] = useState("");
    const [alasan_konsultasi, setAlasan] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const text = useLanguage("janji");
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [scheduleChecked, setScheduleChecked] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const getJanjiById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/janji/${id}`);
                setNama(response.data.nama);
                setEmail(response.data.email);
                setNoTelp(response.data.no_telp);
                setDomisili(response.data.domisili);
                setKategori(response.data.kategori_pengguna);
                setTanggal(response.data.tanggal);
                setJenis(response.data.jenis_konsultasi);
                setAlasan(response.data.alasan_konsultasi);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getJanjiById();
    }, [id]);

    const updateJanji = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!nama || !email || !no_telp || !domisili || !kategori_pengguna || !tanggal || !jenis_konsultasi || !alasan_konsultasi) {
            setMsg("Semua bidang harus diisi.");
            setLoading(false);
            return;
        }

        if (!privacyChecked || !scheduleChecked) {
            setMsg("Anda harus menyetujui kebijakan privasi dan memahami perubahan jadwal.");
            setLoading(false);
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/tinjauan/${id}`, {
                nama: nama,
                email: email,
                no_telp: "62" + no_telp,
                domisili: domisili,
                kategori_pengguna: kategori_pengguna,
                tanggal: tanggal,
                jenis_konsultasi: jenis_konsultasi,
                alasan_konsultasi: alasan_konsultasi
            });
            navigate("/janji");
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
            <h2 className="mt-5 mb-3 text-blue fw-bold">{text.janji.addJanji}</h2>
            <Card style={{ maxWidth: '850px', border: 'none' }} className="bg-blue opacity-75 shadow d-flex mx-auto">
                <Card.Body>
                    {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}
                    <Form className="text-blue-light" onSubmit={updateJanji}>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.nama}</Form.Label>
                            <Form.Control
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder={text.janji.nama}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.noTelp}</Form.Label>
                            <div className="d-flex align-items-center">
                                <span className="me-2">+62</span>
                                <Form.Control
                                    type="text"
                                    value={no_telp}
                                    onChange={(e) => setNoTelp(e.target.value)}
                                    placeholder={text.janji.noTelp}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.domisili}</Form.Label>
                            <Form.Control
                                type="text"
                                value={domisili}
                                onChange={(e) => setDomisili(e.target.value)}
                                placeholder={text.janji.domisili}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.kategori}</Form.Label>
                            <select
                                className="form-select"
                                aria-label={text.janji.selectedKategori}
                                value={kategori_pengguna}
                                onChange={(e) => setKategori(e.target.value)}
                            >
                                <option value="">{text.janji.selectedKategori}</option>
                                <option value={text.janji.pasienBaru}>{text.janji.pasienBaru}</option>
                                <option value={text.janji.pasienLama}>{text.janji.pasienLama}</option>
                                <option value={text.janji.keluarga}>{text.janji.keluarga}</option>
                                <option value={text.janji.mahasiswaPelajar}>{text.janji.mahasiswaPelajar}</option>
                                <option value={text.janji.pekerjaKaryawan}>{text.janji.pekerjaKaryawan}</option>
                                <option value={text.janji.orangTua}>{text.janji.orangTua}</option>
                                <option value={text.janji.tenagaMedis}>{text.janji.tenagaMedis}</option>
                                <option value={text.janji.lansia}>{text.janji.lansia}</option>
                                <option value={text.janji.penderita}>{text.janji.penderita}</option>
                                <option value={text.janji.lainya}>{text.janji.lainya}</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.tanggalKonsultasi}</Form.Label>
                            <Form.Control
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.jenisKonsultasi}</Form.Label>
                            <select
                                className="form-select"
                                aria-label={text.janji.jenisKonsultasi}
                                value={jenis_konsultasi}
                                onChange={(e) => setJenis(e.target.value)}
                            >
                                <option value="">{text.janji.selectedJenis}</option>
                                <option value={text.janji.online}>{text.janji.online}</option>
                                <option value={text.janji.offline}>{text.janji.offline}</option>
                                <option value={text.janji.chat}>{text.janji.chat}</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{text.janji.alasan}</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={alasan_konsultasi}
                                onChange={(e) => setAlasan(e.target.value)}
                                placeholder={text.janji.alasan}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label={text.janji.privacy}
                                checked={privacyChecked}
                                onChange={(e) => setPrivacyChecked(e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label={text.janji.schedule}
                                checked={scheduleChecked}
                                onChange={(e) => setScheduleChecked(e.target.checked)}
                                />
                        </Form.Group>
                        <div className="d-flex justify-content-start">
                            <Button variant="danger" className="me-2" onClick={() => navigate("/janji")}>
                                <FaTimesCircle className="me-1" /> {text.janji.btnBatal}
                            </Button>
                            <Button variant="success" type="submit" disabled={loading || !privacyChecked || !scheduleChecked}>
                                {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.janji.btnSimpan}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default FormAddJanji;