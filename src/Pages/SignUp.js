import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import SignV from "../images/sign-up-img.svg";
import varfyIcon from "../images/varfy-img.svg";
import ModalClose from "../images/modal-close.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
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
                      <h2>Sign Up</h2>
                      <from className="cmn-frm">
                        <div className="form-group">
                          <label>Mobile Number</label>
                          <input
                            type="text"
                            placeholder="Enter Mobile Number"
                          />
                        </div>
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
                onClick={()=>
                {
                  handleClose()
                  handleShow1()

                }}
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
 
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        className="otp-vary-mdl"
      >
        <Modal.Body>
          <div className="otp-vary">
            <button className="cls-btn" onClick={handleClose}>
              <img className="img-fluid" src={ModalClose} />
            </button>
            <img className="img-fluid mt-5" src={varfyIcon} />
           
            <h2 className="hd-man-bx">Thank You!</h2>
            <p>
            Your account has been created <br/> with the following username:
            </p>
           
            <div className="">
              <button
                className="secondary-btn-btn mt-4" 
              >
                vistrit.1234567890
              </button>
            </div>
          
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
