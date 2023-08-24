import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import Mobile from "../images/mobile.svg";
import Email from "../images/email-login.svg";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role">
                <h2>Create Account Using</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing Lorem Ipsum
                  is <br />
                  simply dummy text of the printing and typesetting.
                </p>
                <Row className="justify-content-center">
                  <Col md={5}>
                      <div className="role-box active">
                        <img src={Mobile} />
                        <h3>Mobile Number</h3>
                      </div>
                  </Col>
                  <Col md={5}>
                      <div className="role-box">
                        <img src={Email} />
                        <h3>Email Address</h3>
                      </div>
                  </Col>
                </Row>
                <div className="login-other">
                  <h4>Didn't you receive any code? <span> <Link className="text-btn" to="/">Login</Link></span></h4>
                  <p>By signing up, you accept our   <span><Link className="text-btn" to="/">Terms and Conditions</Link> <Link className="text-btn" to="/">Privacy Policy</Link></span></p>
                  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreateAccount;
