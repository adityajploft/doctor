import React, { useRef, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import SignV from "../images/sign-up-img.svg";
import varfyIcon from "../images/varfy-img.svg";
import ModalClose from "../images/modal-close.svg";
import { Formik } from "formik";
import { Link, useParams } from "react-router-dom";
import { SubmitResponse } from "../utils/ApiFunctions";
import ProfileCreatedModal from "../Components/ProfileCreatedModal";
import { toast } from "react-toastify";
import { emailValidation, mobileValidaiton } from "../utils/ValidationSchema";
import ErrorComponent from "../Components/ErrorComponent";

const Login = () => {
  const inputs = Array(4).fill("");
  const { type } = useParams();

  const inputRefs = useRef([]);
  const [phoneEamil, setSaveEmailPhone] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [exist, setExist] = useState("");
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [otp, setOtp] = useState("");
  const [response, SetReponse] = useState("");
  const handleSubmit = async ({ email, mobile }) => {
    handleShow();

    const res = await SubmitResponse(
      "/login",
      type == "email" ? { email: email } : { phone: mobile }
    );
    if (res.status == "200") {
      setExist(res?.data?.isexists);
      localStorage.getItem("user_id", res?.data?.data?.id);
      setOtp(res?.data?.otp);
      if (email) {
        setSaveEmailPhone(email);
      } else {
        setSaveEmailPhone(mobile);
      }
      handleShow();
    }
  };

  const handleChanges = (index, e) => {
    const value = e.target.value;

    // Set the input value
    if (value) {
      inputRefs.current[index].value = value;
    }

    // Move focus to the next input box
    if (index < 4 - 1 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Function to handle input keydown
  const handleInputKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const OtpVerify = async () => {
    handleClose();
    const otps = inputRefs.current
      .reduce((acc, input) => acc + input.value, "")
      ?.toString();

    if (otp == otps) {
      const res = await SubmitResponse(
        "/otpverify",
        type == "email" ? { email: phoneEamil } : { phone: phoneEamil }
      );
      if (res?.status == 200) {
        handleShow1();

        localStorage.setItem("auth_token", res?.data?.data?.token);
        localStorage.setItem("user_id", res?.data?.data?.id);
        SetReponse(res?.data?.data);
      }
    } else {
      toast.error("Please Enter Valid Otp");
    }
  };

  const ResendOtp = async () => {
    const res = await SubmitResponse(
      "/login",
      type == "email" ? { email: phoneEamil } : { phone: phoneEamil }
    );
    if (res.status == "200") {
      setExist(res?.data?.isexists);

      setOtp(res?.data?.otp);
    }
  };

  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box sign-upmain">
                <Row>
                  {/* <Col lg={7} md={6}>
                    <div className="sign-up-dtl">
                      <img className="logo-img" src={Logo} />

                      <h1>Simplified record keeping in health care</h1>
                      <img className="img-fluid" src={SignV} />
                    </div>
                  </Col> */}
                  <center>
                    <Col lg={6} md={6}>
                      <div className="login-sign-frm outr-frm-bx">
                        <h2>Sign Up</h2>
                        <Formik
                          initialValues={{
                            email: "",
                            mobile: "",
                          }}
                          validationSchema={
                            type == "email" ? emailValidation : mobileValidaiton
                          }
                          onSubmit={handleSubmit}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                          }) => (
                            <form className="cmn-frm" onSubmit={handleSubmit}>
                              {type == "mobile" ? (
                                <div className="form-group">
                                  <label>Enter mobile number</label>
                                  <input
                                    type="text"
                                    required
                                    // placeholder="Enter Mobile Number"
                                    name="mobile"
                                    onChange={handleChange}
                                    value={values.mobile}
                                  />
                                  <ErrorComponent
                                    error={
                                      errors.mobile &&
                                      touched.mobile &&
                                      errors.mobile
                                    }
                                  />
                                </div>
                              ) : (
                                <div className="form-group">
                                  <label>Enter email address</label>
                                  <input
                                    required
                                    type="email"
                                    // placeholder="Enter Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    value={values.email}
                                  />
                                  <ErrorComponent
                                    error={
                                      errors.email &&
                                      touched.email &&
                                      errors.email
                                    }
                                  />
                                </div>
                              )}
                              <div className="">
                                <button
                                  className="primary-btn-btn mt-1"
                                  variant="primary"
                                  type="submit"
                                >
                                  Let's Go
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </Col>
                  </center>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
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
                Enter one time password (OTP) sent to the{" "}
                {type == "mobile" ? "mobile number" : "email address"}
                <span>(SMS charges may apply)</span>
                <span>{phoneEamil}</span>
              </p>
              <form className="otp-varyfy">
                {inputs?.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={index + 1}
                    maxLength={1}
                    // value={value}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChanges(index, e)}
                    onKeyDown={(event) => {
                      handleInputKeyDown(event, index);
                    }}
                  />
                ))}
              </form>
              <div className="">
                <button
                  className="primary-btn-btn  my-5"
                  variant="primary"
                  onClick={() => {
                    OtpVerify();
                  }}
                >
                  Verify Now
                </button>
              </div>
              <div>
                <p className="mb-0">Didn't you receive any code?</p>
                <button className="resend" onClick={() => ResendOtp()}>
                  Resend Code
                </button>
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
              <button className="cls-btn" onClick={handleClose1}>
                <img className="img-fluid" src={ModalClose} />
              </button>
              <img className="img-fluid mt-5" src={varfyIcon} />

              <h2 className="hd-man-bx">Thank You!</h2>
              <p>
                Your account has been created
                <br /> with the following username:
              </p>

              <div className="">
                {exist == 0 ? (
                  <Link
                    to="/create-profile"
                    className="secondary-btn-btn mt-4 boldness "
                  >
                    {response?.user_unique_id}
                  </Link>
                ) : exist == 1 ? (
                  <Link
                    to="/FamilyList"
                    className="secondary-btn-btn mt-4 boldness"
                  >
                    {response?.user_unique_id}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Login;
