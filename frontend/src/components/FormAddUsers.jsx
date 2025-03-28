import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import LoadingIndicator from './LoadingIndicator';
import useLanguage from '../hooks/useLanguage';


const FormAddUsers = () => {
  const [nama, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const text = useLanguage("users");

  const saveUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nama || !email || !password || !confPassword || !role) {
      setMsg("Semua bidang harus diisi.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        nama: nama,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
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
      <h2 className="mt-5 mb-3 text-blue fw-bold">{text.users.titleAddUser}</h2>
      <Card style={{maxWidth: '850px', border: 'none'}} className="bg-blue opacity-75 shadow d-flex mx-auto">
        <Card.Body>
          {msg && <Alert variant="danger" className="text-center">{msg}</Alert>}
          <Form className="text-white" onSubmit={saveUser}>
            <Form.Group className="mb-3">
              <Form.Label>{text.users.nama}</Form.Label>
              <Form.Control
                type="text"
                value={nama}
                onChange={(e) => setName(e.target.value)}
                placeholder={text.users.nama}
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
              <Form.Label>{text.users.password}</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{text.users.confPassword}</Form.Label>
              <Form.Control
                type="password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="******"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{text.users.role}</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="" disabled>{text.users.pilihRole}</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-start">
              <Button variant="danger" className="me-2" onClick={() => navigate("/users")}>
                <FaTimesCircle className="me-1" /> {text.users.btnBatal}
              </Button>
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? <LoadingIndicator animation="border" size="sm" className="me-1" /> : <FaSave className="me-1" />} {text.users.btnSimpan}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormAddUsers;