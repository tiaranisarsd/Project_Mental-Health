import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import HeaderAdmin from '../components/HeaderAdmin'
import Footer from '../components/Footer'
import Sidebar from '../components/SidebarAdmin'

const AdminLayout = ({children}) => {

  return (
    <React.Fragment>
            <div>
            <HeaderAdmin />
            <Container fluid className="mt-5">
                <Row>
                <Col lg={2} className="d-none d-lg-block bg-blue">
                    <Sidebar isMobile={false} />
                </Col>
                <Col lg={10}>
                    {children}
                </Col>
                </Row>
            </Container>
            </div>
          <Footer />
        
    </React.Fragment>
  )
}

export default AdminLayout