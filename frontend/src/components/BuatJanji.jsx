import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';

const BuatJanji = () => {
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
    const [ setError] = useState(null);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [scheduleChecked, setScheduleChecked] = useState(false);
    const [telpError, setTelpError] = useState("");

    const saveJanji = async (e) => {
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

        if (no_telp.length < 12) {
            setTelpError("Nomor telepon harus terdiri dari 12 digit.");
            setLoading(false);
            return;
        }

        if (no_telp.startsWith("0")) {
            setTelpError("Nomor telepon tidak boleh dimulai dengan 0.");
            setLoading(false);
            return;
        }

        setTelpError("");

        try {
            await axios.post("http://localhost:5000/janji", {
                nama: nama,
                email: email,
                no_telp: "62" + no_telp,
                domisili: domisili,
                kategori_pengguna: kategori_pengguna,
                tanggal: tanggal,
                jenis_konsultasi: jenis_konsultasi,
                alasan_konsultasi: alasan_konsultasi
            });
            setMsg(text.janji.msg);
            setTimeout(() => setMsg(""), 8000);
            setNama("");
            setEmail("");
            setNoTelp("");
            setDomisili("");
            setKategori("");
            setTanggal("");
            setJenis("");
            setAlasan("");
            navigate("/");
        } catch (error) {
            console.error("Error submitting tinjauan:", error);
            setError("Gagal menambahkan tinjauan.");
        } finally {
            setLoading(false);
        }
    };

    const handleNoTelpChange = (e) => {
        const value = e.target.value;
        if (value.length <= 12) { 
            setNoTelp(value);
        }
    };

    return (
        <Container>
                    <Form className="text-blue bg-blue-light" onSubmit={saveJanji}>
                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder={text.janji.nama}
                                    className="border-2"
                                />
                                <Form.Label className="text-blue">{text.janji.nama}</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="border-2"
                                />
                                <Form.Label className="text-blue">Email</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="d-flex align-items-center">
                                <span className="me-2">+62</span>
                                <Form.Floating className="flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        value={no_telp}
                                        onChange={handleNoTelpChange}
                                        placeholder={text.janji.noTelp}
                                        className="border-2"
                                    />
                                    <Form.Label className="text-blue">{text.janji.noTelp}</Form.Label>
                                </Form.Floating>
                            </div>
                            {telpError && <Alert variant="danger" className="mt-2">{telpError}</Alert>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    type="text"
                                    value={domisili}
                                    onChange={(e) => setDomisili(e.target.value)}
                                    placeholder={text.janji.domisili}
                                    className="border-2"
                                />
                                <Form.Label className="text-blue">{text.janji.domisili}</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                            className="text-blue border-2"
                                aria-label={text.janji.selected}
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
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    placeholder={text.janji.tanggalKonsultasi}
                                    className="text-blue bborder-2"
                                />
                                <Form.Label className="text-blue">{text.janji.tanggalKonsultasi}</Form.Label>
                            </Form.Floating>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                aria-label={text.janji.jenisKonsultasi}
                                className="text-blue border-2"
                                value={jenis_konsultasi}
                                onChange={(e) => setJenis(e.target.value)}
                            >
                                <option value="">{text.janji.selectedJenis}</option>
                                <option value={text.janji.online}>{text.janji.online}</option>
                                <option value={text.janji.offline}>{text.janji.offline}</option>
                                <option value={text.janji.chat}>{text.janji.chat}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    as="textarea"
                                    value={alasan_konsultasi}
                                    onChange={(e) => setAlasan(e.target.value)}
                                    placeholder={text.janji.alasan}
                                    style={{ height: '100px' }}
                                    className="border-2"
                                />
                                <Form.Label className="text-blue">{text.janji.alasan}</Form.Label>
                            </Form.Floating>
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
                        {msg && <Alert variant="success" className="text-center">{msg}</Alert>}
                        <div className="d-flex justify-content-start">
                            <Button variant="danger" className="me-2" onClick={() => navigate("/janji")}>
                                <FaTimesCircle className="me-1" /> {text.janji.btnBatal}
                            </Button>
                            <Button variant="success" type="submit" disabled={!nama || !email || !no_telp || !domisili || !kategori_pengguna || !tanggal || !jenis_konsultasi || !alasan_konsultasi || loading || !privacyChecked || !scheduleChecked}>
                                {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.janji.btnSimpan}
                            </Button>
                        </div>
                    </Form>
        </Container>
    );
};

export default BuatJanji;