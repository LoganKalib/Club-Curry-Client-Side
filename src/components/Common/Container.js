import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CustomContainer = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default CustomContainer;
