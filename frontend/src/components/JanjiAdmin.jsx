import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import useLanguage from '../hooks/useLanguage';
import LoadingIndicator from './LoadingIndicator';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Janji = () => {
    const [janji, setJanji] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const text = useLanguage("janji");

    useEffect(() => {
        getJanji();
    }, []);

    const getJanji = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/janji');
            setJanji(response.data);
        } catch (err) {
            console.error('Error fetching janji:', err);
            setError(err.message || "Terjadi kesalahan saat memuat data.");
        } finally {
            setLoading(false);
        }
    };

    const deleteJanji = async (janjiId) => {
        if (window.confirm(text.janji.confirmDelete)) {
            try {
                await axios.delete(`http://localhost:5000/janji/${janjiId}`);
                getJanji();
            } catch (err) {
                console.error('Error deleting janji:', err);
                setError(err.message || "Terjadi kesalahan saat menghapus data.");
            }
        }
    };

    const handlePrintPdf = () => {
      const doc = new jsPDF('l', 'mm', [297, 210]);
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(text.janji.title, 150, 20, { align: 'center' });
  
      const tableColumn = [
          'No',
          text.janji.nama,
          'Email',
          text.janji.noTelp,
          text.janji.domisili,
          text.janji.kategori,
          text.janji.tanggal,
          text.janji.jenis,
          text.janji.alasan,
      ];
  
      const tableRows = janji.map((janjiItem, index) => [
          index + 1,
          janjiItem.nama,
          janjiItem.email,
          janjiItem.no_telp,
          janjiItem.domisili,
          janjiItem.kategori_pengguna,
          janjiItem.tanggal,
          janjiItem.jenis_konsultasi,
          janjiItem.alasan_konsultasi,
      ]);
  
      autoTable(doc, { 
          head: [tableColumn],
          body: tableRows,
          startY: 30,
          theme: 'grid',
          headStyles: { fillColor: [41, 128, 185], fontSize: 10, fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          styles: { fontSize: 10, halign: 'center', lineHeight: 1.2 },
      });
  
      doc.save('laporan_janji.pdf');
  };
  
    return (
        <Container className="p-3">
            <h2 className="mt-5 text-blue fw-bold">{text.janji.title}</h2>
            <div className="d-flex justify-content-between align-items-center">
                <Link style={{ border: 'none' }} to="/janji/add" className="btn btn-primary btn-hover text-white mt-2">
                    <FaPlus /> {text.janji.addJanji}
                </Link>
                <Button variant="success" onClick={handlePrintPdf} className="mt-2">
                    <FaFilePdf /> {text.janji.exportPdf}
                </Button>
            </div>
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
                    <Table striped bordered hover responsive className='text-center janji-table'>
                        <thead className='custom-table'>
                            <tr>
                                <th>No</th>
                                <th>{text.janji.nama}</th>
                                <th>Email</th>
                                <th>{text.janji.noTelp}</th>
                                <th>{text.janji.domisili}</th>
                                <th>{text.janji.kategori}</th>
                                <th>{text.janji.tanggal}</th>
                                <th>{text.janji.jenis}</th>
                                <th>{text.janji.alasan}</th>
                                <th>{text.janji.actions}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {janji.map((janjiItem, index) => (
                                <tr key={janjiItem.id}>
                                    <td>{index + 1}</td>
                                    <td>{janjiItem.nama}</td>
                                    <td>{janjiItem.email}</td>
                                    <td>{janjiItem.no_telp}</td>
                                    <td>{janjiItem.domisili}</td>
                                    <td>{janjiItem.kategori_pengguna}</td>
                                    <td>{janjiItem.tanggal}</td>
                                    <td>{janjiItem.jenis_konsultasi}</td>
                                    <td>{janjiItem.alasan_konsultasi}</td>
                                    <td>
                                        <Link
                                            to={`/janji/edit/${janjiItem.id}`}
                                            className="btn btn-sm btn-info me-2 text-white"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleteJanji(janjiItem.id)}
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

export default Janji;