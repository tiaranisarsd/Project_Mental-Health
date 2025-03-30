import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Offcanvas, Button } from 'react-bootstrap';
import logo from '../logo.png';
import Sidebar from './SidebarAdmin';
import { LogOut, reset } from "../features/authSlice";
import { IoLogOut } from "react-icons/io5";
import useLanguage from '../hooks/useLanguage';

const HeaderAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = useLanguage("app");

  const logout = () => {
    if (window.confirm(text.logout.confirmMessage)) { 
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    }
  };

  return (
    <>
      <Navbar style={{ maxHeight: "80px" }} expand="lg" fixed="top" variant="dark" className="bg-blue shadow">
        <Container>
          <Navbar.Brand href="/adminPage" aria-label="Beranda Admin">
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top me-2"
              alt="Mental Health Logo"
            />
          </Navbar.Brand>
          <div className="d-flex"> 
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowSidebar(true)} />
            <Button variant="danger" onClick={logout} className="d-none d-lg-block ms-2">
            <IoLogOut className='me-1' /> {text.nav.btnLogout}
            </Button>
          </div>
        </Container>
      </Navbar>

      <Offcanvas style={{width: "fit-content" }} className="bg-blue shadow rounded" show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-blue-light fw-bold'>Menu Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='my-1 p-1 d-flex flex-column justify-content-center'>
          <Sidebar isMobile={true} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default HeaderAdmin;