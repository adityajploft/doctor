import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import Mobile from "../images/mobile.svg";
import Email from "../images/email-login.svg";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [type, setType] = useState("mobile");
  const [Terms, setTerms] = useState(false);
  const [previacy, setPrivacyPolicy] = useState(false);
  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role">
                <h2>Create Account Using</h2>

                <Row className="justify-content-center">
                  <Col md={5}>
                    <div className="role-box">
                      <Link to="/login/mobile">
                        <img src={Mobile} />
                        <h3>Mobile Number</h3>
                      </Link>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="role-box">
                      <Link to="/login/email">
                        <img src={Email} />
                        <h3>Email Address</h3>
                      </Link>
                    </div>
                  </Col>
                </Row>
                <div className="login-other">
                  <p>
                    By signing up, you accept our{" "}
                    <span>
                      <p className="text-btn">
                        {/* <input
                          type="checkbox"
                          className="mx-2"
                          checked={Terms == true}
                          onChange={(e) => setTerms(e.target.checked)}
                        /> */}
                        Terms and Conditions
                      </p>{" "}
                      <p>and</p>
                      <p className="text-btn">
                        {/* <input
                          type="checkbox"
                          onChange={(e) => setPrivacyPolicy(e.target.checked)}
                          className="mx-2"
                          checked={previacy == true}
                        /> */}
                        Privacy Policy
                      </p>
                    </span>
                  </p>
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
