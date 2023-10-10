import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import SignV from "../images/sign-up-img.svg";
import MaleIcon from "../images/male.svg";
import FeMaleIcon from "../images/female.svg";

import Uploadimage from "../images/uploadPhoto.svg";
import TakeImage from "../images/takeImage.svg";
import OtherIcon from "../images/other.svg";
import ModalClose from "../images/modal-close.svg";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { DashboardModal } from "../utils/ValidationSchema";
import ViewFillDetailModal from "../Components/ViewFillDetailModal";
import ErrorComponent from "../Components/ErrorComponent";

const DetailForm = () => {
  const [show, setShow] = useState(false);

  const [cameraModal, setCameraModal] = useState(false);

  const [data, setData] = useState({});

  const handleSubmit = (values) => {
    setData(values);
    setShow(true);
  };
  const CallApi = () => {
    console.log("ddd", data);
    setShow(false);
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

                      <h1>
                        Simplified record keeping in health care
                      </h1>
                      <img className="img-fluid" src={SignV} />
                    </div>
                  </Col> */}
                  <center>
                    <Col lg={6} md={6}>
                      <div className="login-sign-frm outr-frm-bx">
                        <h2>
                          {/* Enter details for <span>Perter Parker</span> */}
                        </h2>

                        <Formik
                          initialValues={{
                            firstName: "",
                            lastName: "",
                            gender: "male",
                          }}
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
                              <Row>
                                <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>Height</label>
                                    <input
                                      type="text"
                                      placeholder="Height"
                                      name="Height"
                                      onChange={handleChange}
                                      value={values.Height}
                                    />

                                    <ErrorComponent
                                      error={
                                        errors.Height &&
                                        touched.Height &&
                                        errors.Height
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>Weight</label>
                                    <input
                                      type="text"
                                      placeholder="Enter Name"
                                      name="Weight"
                                      onChange={handleChange}
                                      value={values.Weight}
                                    />
                                    <ErrorComponent
                                      error={
                                        errors.Weight &&
                                        touched.Weight &&
                                        errors.Weight
                                      }
                                    />
                                  </div>
                                </Col>

                                <Row>
                                  <Col md={6}>
                                    <div className="form-group">
                                      <div className="upload-images">
                                        <img src={Uploadimage} />
                                        <input type="file" />
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md={6}>
                                    <div className="form-group">
                                      <div
                                        className="upload-images"
                                        onClick={(r) => {
                                          r.preventDefault();
                                          setCameraModal(true);
                                        }}
                                      >
                                        <img src={TakeImage} />
                                      </div>
                                    </div>
                                  </Col>

                                  <div className="">
                                    <button
                                      className="primary-btn-btn mt-5"
                                      variant="primary"
                                    >
                                      Save/Extract
                                    </button>
                                  </div>
                                </Row>
                              </Row>

                              <div className="">
                                <button
                                  className="primary-btn-btn mt-5"
                                  variant="primary"
                                  type="submit"
                                >
                                  Next
                                </button>
                              </div>
                            </form>
                          )}
                        </Formik>
                        <div className="skip">
                          <span>Skip</span>
                        </div>
                      </div>
                    </Col>
                  </center>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DetailForm;
