import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useLanguage from '../hooks/useLanguage';
import LoadingIndicator from './LoadingIndicator';

const Edukasi = () => {
  const [edukasi, setEdukasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const text = useLanguage("edukasi");

  useEffect(() => {
    getEdukasi();
  }, []);

  const getEdukasi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/edukasi');
      setEdukasi(response.data);
    } catch (err) {
      console.error('Error fetching edukasi:', err);
      setError(err.message || "Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEdukasi = async (edukasiId) => {
    if (window.confirm(text.edukasi.confirmDelete)) {
      try {
        await axios.delete(`http://localhost:5000/edukasi/${edukasiId}`);
        getEdukasi();
      } catch (err) {
        console.error('Error deleting edukasi:', err);
        setError(err.message || "Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <Container className="p-3">
      <h2 className="mt-5 text-blue fw-bold">{text.edukasi.titleAdmin}</h2>
      <Link style={{ border: 'none' }} to="/edukasi/add" className="btn btn-primary btn-hover text-white mt-2">
        <FaPlus /> {text.edukasi.addEdukasi}
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
          <Table striped bordered hover responsive className='text-center edukasi-table'>
            <thead className='custom-table'>
              <tr>
                <th>No</th>
                <th>{text.edukasi.konten}</th>
                <th>{text.edukasi.actions}</th>
              </tr>
            </thead>
            <tbody>
              {edukasi.map((edukasi, index) => (
                <tr key={edukasi.id}>
                  <td>{index + 1}</td>
                  <td>
                  <a href={edukasi.konten} target="_blank" rel="noopener noreferrer">
                   {edukasi.konten}
                   </a>
                  </td>
                  <td>
                    <Link
                      to={`/edukasi/edit/${edukasi.id}`}
                      className="btn btn-sm btn-info me-2 text-white"
                    >
                      <FaEdit />
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteEdukasi(edukasi.id)}
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

export default Edukasi;