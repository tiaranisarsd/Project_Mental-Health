import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LangToggler from './LangToggler';
import { LogOut, reset } from "../features/authSlice";
import { IoLogOut } from "react-icons/io5";
import useLanguage from '../hooks/useLanguage';
import { FaUsers, FaCalendarAlt, FaBook, FaComments } from 'react-icons/fa';

function Sidebar({ isMobile }) { 
    
  const { users } = useSelector((state) => state.auth);
  const text = useLanguage("app");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
};

  return (
    <div  style={{ width: '230px', height: '100vh' }}>
      <Nav id='sidebar' className="flex-column justify-content-center align-items-center h-100 me-lg-4"> 
        <Nav.Link className='sidebar-nav-link' as={Link} to="/users"><FaUsers className="me-1" /> {text.nav.users}</Nav.Link>
        <Nav.Link className='sidebar-nav-link' as={Link} to="/janji"><FaCalendarAlt className="me-1" /> {text.nav.janji}</Nav.Link>
        <Nav.Link className='sidebar-nav-link' as={Link} to="/edukasi"><FaBook className="me-1" /> {text.nav.edukasi}</Nav.Link>
        <Nav.Link className='sidebar-nav-link' as={Link} to="/tinjauan"><FaComments className="me-1" /> {text.nav.tinjauan}</Nav.Link>
        
        <LangToggler />
        {isMobile && ( 
          <Button variant="danger" className="mt-3" onClick={logout}><IoLogOut className='me-1' /> {text.nav.btnLogout}</Button>
        )}
      </Nav>
    </div>
  );
}

export default Sidebar;