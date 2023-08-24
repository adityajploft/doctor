import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import SignV from "../images/sign-up-img.svg";
import MaleIcon from "../images/male.svg";
import FeMaleIcon from "../images/female.svg";
import OtherIcon from "../images/other.svg";
import ModalClose from "../images/modal-close.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box sign-upmain">
                <Row>
                  <Col lg={7} md={6}>
                    <div className="sign-up-dtl">
                      <img className="logo-img" src={Logo} />

                      <h1>
                        #1 health record web app for doctors and patients and
                        also for family members
                      </h1>
                      <img className="img-fluid" src={SignV} />
                    </div>
                  </Col>
                  <Col lg={5} md={6}>
                    <div className="login-sign-frm outr-frm-bx">
                      <h2>
                        Enter details for <span>Perter Parker</span>
                      </h2>
                      <from className="cmn-frm">
                        <Row>
                          <Col md={12}>
                            <div className="form-group">
                              <label>Prefix</label>
                              <select>
                                <option>Mr.</option>
                                <option>Mrs.</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={6} md={12}>
                            <div className="form-group">
                              <label>First Name</label>
                              <input type="text" placeholder="First Name" />
                            </div>
                          </Col>
                          <Col lg={6} md={12}>
                            <div className="form-group">
                              <label>Last Name</label>
                              <input type="text" placeholder="Enter Name" />
                            </div>
                          </Col>
                          <Col lg={12} md={12}>
                          <label>Gender</label>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                             
                              <div className="gender-slct active">
                                <img className="img-fluid" src={MaleIcon} />
                                <p>Male</p>
                              </div>
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              
                              <div className="gender-slct ">
                                <img className="img-fluid" src={FeMaleIcon} />
                                <p>Female</p>
                              </div>
                            </div>
                          </Col>
                          <Col lg={4} md={6}>
                            <div className="form-group">
                              
                              <div className="gender-slct ">
                                <img className="img-fluid" src={OtherIcon} />
                                <p>Other</p>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <div className="">
                          <button
                            className="primary-btn-btn mt-5"
                            variant="primary"
                            onClick={handleShow}
                          >
                            Let's Go
                          </button>
                        </div>
                      </from>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="otp-vary-mdl"
      >
        <Modal.Body>
          <div className="otp-vary">
            <button className="cls-btn" onClick={handleClose}>
              <img className="img-fluid" src={ModalClose} />
            </button>
            <h3 className="mdl-heading mb-5">OTP</h3>
            <h2>Verify Your Number</h2>
            <p>
              We have received a code to<span>XXXXXX789</span>
            </p>
            <form className="otp-varyfy">
              <input type="number" placeholder="0" />
              <input type="number" placeholder="0" />
              <input type="number" placeholder="0" />
              <input type="number" placeholder="0" />
            </form>
            <div className="">
              <button
                className="primary-btn-btn  my-5"
                variant="primary"
                onClick={handleClose}
              >
                Verify Now
              </button>
            </div>
            <div>
              <p className="mb-0">Didn't you receive any code?</p>
              <Link className="text-btn">Resend Code</Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Dashboard;
