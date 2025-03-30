import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useLanguage from '../hooks/useLanguage';

function Footer() {
    const text = useLanguage("app");

  return (
    <footer className="bg-blue text-blue-light text-center py-4 shadow">
      <Container >
        <Row>
          <Col>
            <div className='fs-6 fw-bold'>
            {text.footer.title}
            </div>
            <div style={{fontSize: "14px"}} className='fw-light'>
            {text.footer.desc}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;