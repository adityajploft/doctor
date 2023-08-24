import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import Roleimg from "../images/role-img.svg";
import Roleimg1 from "../images/role-img-1.svg";

const Role = () => {
  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role">
                <h2>Select Role</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing Lorem Ipsum
                  is <br />
                  simply dummy text of the printing and typesetting.
                </p>
                <Row className="justify-content-center">
                  <Col md={5}>
                      <div className="role-box">
                        <img src={Roleimg} />
                        <h3>I am a Doctor</h3>
                      </div>
                  </Col>
                  <Col md={5}>
                      <div className="role-box">
                        <img src={Roleimg1} />
                        <h3>I am a Patient</h3>
                      </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Role;
