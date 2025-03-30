import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import useLanguage from '../hooks/useLanguage';
import LoadingIndicator from './LoadingIndicator';

const Users = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const text = useLanguage("users");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || "Terjadi kesalahan saat memuat data."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (usersId) => {
    if (window.confirm(text.users.confirmDelete)) {
      try {
        await axios.delete(`http://localhost:5000/users/${usersId}`);
        getUser();
      } catch (err) {
        console.error('Error deleting users:', err);
        setError(err.message || "Terjadi kesalahan saat menghapus data.");
      }
  }
};

  return (
    <Container className="p-3">
      <h2 className="mt-5 text-blue fw-bold">{text.users.title}</h2>
      <Link style={{ border: 'none' }} to="/users/add" className="btn btn-primary btn-hover text-white mt-2">
        <FaPlus /> {text.users.addUser}
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
          <Table striped bordered hover responsive className='text-center users-table'>
            <thead className='custom-table'>
              <tr>
                <th>No</th>
                <th>{text.users.nama}</th>
                <th>Email</th>
                <th>{text.users.role}</th>
                <th>{text.users.create}</th>
                <th>{text.users.actions}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.nama}</td>
                  <td>
                    <Link
                      to={`/users/edit/${user.id}`}
                      className="btn btn-sm btn-info me-2 text-white"
                    >
                      <FaEdit />
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
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

export default Users;