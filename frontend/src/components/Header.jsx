import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Offcanvas, Modal, Form, Button, Alert } from 'react-bootstrap';
import { IoLogIn, IoHome, IoBook, IoChatbubble } from "react-icons/io5";
import logo from '../logo.png'; 
import useLanguage from '../hooks/useLanguage';
import LangToggler from './LangToggler';
import { LoginUser, reset } from "../features/authSlice";
import LoadingIndicator from './LoadingIndicator';
import { IoMail, IoLockClosed } from "react-icons/io5";

function Header({ showLoginButtonInOffcanvas = false }) {
    const text = useLanguage("app");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {users, isError, isSuccess, message} = useSelector (
        (state)=> state.auth 
    );

    const handleClose = () => {
        setShowLoginModal(false);
        setEmail(''); 
        setPassword(''); 
        setLoading(false);
    };

    const Auth = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            await dispatch(LoginUser ({email, password}));
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        if (users || isSuccess) {
          if (users.role === 'admin') {
            navigate("/users");
          }
        }
        dispatch(reset());
      }, [users, isSuccess, dispatch, navigate]);

    return (
        <>
        <Navbar style={{maxHeight: "80px"}} expand="lg" fixed="top" variant="dark" className="bg-blue shadow my-auto">
            <Container>
                <Navbar.Brand href="#beranda">
                    <img
                        src={logo}
                        width="80"
                        height="80"
                        className="d-inline-block align-top me-2"
                        alt="Mental Health Logo"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                    style={{maxWidth: "250px" }}
                    className="nav-underline bg-blue text-blue-light text-center"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className='fw-bold' id="offcanvasNavbarLabel">
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='my-1 p-1 d-flex flex-column justify-content-center'>
                    <Navbar.Collapse id="offcanvasNavbar" className="justify-content-between">
                        <Nav className="mx-auto justify-content-center flex-grow-1">
                            <Nav.Link href="#beranda"><IoHome /> {text.nav.beranda}</Nav.Link>
                            <Nav.Link href="#edukasi"><IoBook /> {text.nav.edukasi}</Nav.Link>
                            <Nav.Link href="#tinjauan"><IoChatbubble /> {text.nav.tinjauan}</Nav.Link>
                        </Nav>
                        
                        <div className="d-flex justify-content-center mt-md-2">
                            <Nav className="d-flex align-items-center d-flex my-3">
                            <Nav.Link className='ms-3' > <LangToggler /> </Nav.Link>
                                <button
                                className="btn btn-success fw-bold"
                                onClick={() => setShowLoginModal(true)}
                                >
                                <IoLogIn className='me-1' /> {text.nav.loginAdmin}
                                </button>
                            </Nav>
                        </div>

                        </Navbar.Collapse>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                {!showLoginButtonInOffcanvas && ( 
                <Nav className="d-none d-flex align-items-center d-lg-flex my-lg-3">
                    <Nav.Link className='mb-lg-2'> <LangToggler /> </Nav.Link>
                <button
                style={{height: 'fit-content'}}
                    className="btn btn-success fw-bold "
                    onClick={() => setShowLoginModal(true)}
                >
                    <IoLogIn className='me-1' /> {text.nav.loginAdmin}
                </button>
                </Nav>
            )}
        </Container>
      </Navbar>

        <Modal show={showLoginModal} onHide={handleClose} centered>
        <Modal.Header className='bg-blue text-blue-light' closeButton>
        <Navbar.Brand href="#beranda">
                    <img
                        src={logo}
                        width="80"
                        height="80"
                        className="d-inline-block align-top me-2"
                        alt="Mental Health Logo"
                    />
                </Navbar.Brand>
            <Modal.Title className='mx-auto align-item-center fw-bold'>{text.nav.loginAdmin}</Modal.Title>
        </Modal.Header>
        {isError && <Alert className='m-1 text-center w-auto' variant="danger">{message}</Alert>} 
        <Modal.Body className='bg-blue-light rounded '>
            <Form onSubmit={Auth}>
                <Form.Group className="mb-3 text-blue">
                    <Form.Label>
                        <IoMail className="me-1" />
                        Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={text.login.phEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 text-blue">
                    <Form.Label>
                        <IoLockClosed className="me-1" /> 
                        {text.login.password}
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder={text.login.phPassword} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button style={{ border: "none" }} variant="primary" type="submit" className="w-100 bg-blue opacity-75 btn-hover" disabled={loading}>
                    {loading ? (
                        <LoadingIndicator animation="border" role="status" style={{ width: "1.5rem", height: "1.5rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </LoadingIndicator>
                    ) : (
                        text.login.btn
                    )}
                </Button>
            </Form>
        </Modal.Body>
</Modal>
</>
);
}

export default Header;
