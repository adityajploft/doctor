import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box logo-wlcm">
                <img className="img-fluid" src={Logo} />
                <Link to="/upload-pic">Click image</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Welcome;
