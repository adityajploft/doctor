import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import SignV from "../images/sign-up-img.svg";
import MaleIcon from "../images/male.svg";
import FeMaleIcon from "../images/female.svg";
import OtherIcon from "../images/other.svg";
import ModalClose from "../images/modal-close.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { DashboardModal } from "../utils/ValidationSchema";
import ViewFillDetailModal from "../Components/ViewFillDetailModal";
import ErrorComponent from "../Components/ErrorComponent";
import { SubmitResponse } from "../utils/ApiFunctions";
import { toast } from "react-toastify";

const AbhaNumber = () => {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const formdata = new FormData();
    formdata.append("abha_number", values?.abha_number);

    const res = await SubmitResponse("/signup", formdata);
    if (res?.status == 200) {
      toast.success(res?.data?.message);
      navigate("/dieases-type1/" + id);
    }
    setShow(false);
  };
  const name = localStorage.getItem("name");
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
                    <Col lg={5} md={6}>
                      <div className="login-sign-frm outr-frm-bx">
                        <h2>Enter details for {name} </h2>

                        <Formik
                          initialValues={{
                            abha_number: "",
                          }}
                          // validationSchema={DashboardModal}
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
                                    <label>Enter ABHA number</label>
                                    <input
                                      type="text"
                                      className="px-2"
                                      placeholder="_ _   _ _ _ _  _ _ _ _  _ _ _ _"
                                      name="abha_number"
                                      onChange={handleChange}
                                      value={values.abha_number}
                                    />

                                    <ErrorComponent
                                      error={
                                        errors.abha_number &&
                                        touched.abha_number &&
                                        errors.abha_number
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <center>
                                <div className=" mt-3 w-100">
                                  <button
                                    className="primary-btn-btn mt-5"
                                    variant="primary"
                                    type="submit"
                                  >
                                    Continue
                                  </button>
                                  {/* <Link to="/dieases-type1" >
                                  <button className="primary-btn-btn mt-5 butno-with-text">
                                    Continue
                                  </button>
                                </Link> */}
                                </div>
                              </center>
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
      </div>
    </>
  );
};

export default AbhaNumber;
