import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useLanguage from '../hooks/useLanguage';
import LoadingIndicator from './LoadingIndicator';

const Tinjauan = () => {
  const [tinjauan, setTinjauan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const text = useLanguage("tinjauan");

  useEffect(() => {
    getTinjauan();
  }, []);

  const getTinjauan = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/tinjauan');
      setTinjauan(response.data);
    } catch (err) {
      console.error('Error fetching tinjauan:', err);
      setError(err.message || "Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTinjauan = async (tinjauanId) => {
    if (window.confirm(text.tinjauan.confirmDelete)) {
      try {
        await axios.delete(`http://localhost:5000/tinjauan/${tinjauanId}`);
        getTinjauan();
      } catch (err) {
        console.error('Error deleting tinjauan:', err);
        setError(err.message || "Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <Container className="p-3">
      <h2 className="mt-5 text-blue fw-bold">{text.tinjauan.titleAdmin}</h2>
      <Link style={{ border: 'none' }} to="/tinjauan/add" className="btn btn-primary btn-hover text-white mt-2">
        <FaPlus /> {text.tinjauan.addTinjauan}
      </Link>
      <div className="mt-3">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <LoadingIndicator animation="border" role="status" style={{ width: "5rem", height: "5rem" }}>
              <span className="visually-hidden">Loading...</span>
            </LoadingIndicator>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">{error}</Alert>
        ) : (
          <Table striped bordered hover responsive className='text-center tinjauan-table'>
            <thead className='custom-table'>
              <tr>
                <th>No</th>
                <th>{text.tinjauan.nama}</th>
                <th>{text.tinjauan.layanan}</th>
                <th>{text.tinjauan.rating}</th>
                <th>{text.tinjauan.tinjauan}</th>
                <th>{text.tinjauan.actions}</th>
              </tr>
            </thead>
            <tbody>
              {tinjauan.map((tinjauan, index) => (
                <tr key={tinjauan.id}>
                  <td>{index + 1}</td>
                  <td>{tinjauan.nama}</td>
                  <td>{tinjauan.layanan}</td>
                  <td>{tinjauan.rating}</td>
                  <td>{tinjauan.tinjauan}</td>
                  <td>
                    <Link
                      to={`/tinjauan/edit/${tinjauan.id}`}
                      className="btn btn-sm btn-info me-2 text-white"
                    >
                      <FaEdit />
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTinjauan(tinjauan.id)}
                      className='me-2 mt-1 mb-lg-1'
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default Tinjauan;