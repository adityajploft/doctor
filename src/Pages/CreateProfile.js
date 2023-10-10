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
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { DashboardModal } from "../utils/ValidationSchema";
import ViewFillDetailModal from "../Components/ViewFillDetailModal";
import ErrorComponent from "../Components/ErrorComponent";
import { SubmitResponse } from "../utils/ApiFunctions";
import { toast } from "react-toastify";
import CameraModal from "../Components/CameraModal";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [cameraModal, setCameraModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [imageType, setImageType] = useState("file");
  const [data, setData] = useState({});

  const handleSubmit = (values) => {
    setData(values);
    setShow(true);
  };
  const CallApi = async () => {
    const formdata = new FormData();
    formdata.append("prefix", data?.prefix);
    formdata.append("first_name", data?.firstName);
    formdata.append("last_name", data?.lastName);
    formdata.append("gender", data?.gender);
    formdata.append("dob", data?.dob);
    formdata.append("height", data?.Height);
    formdata.append("weight", data?.Weight);
    if (profileImage !== "" && data.profile == "") {
      formdata.append("profile", profileImage);
    }
    if (profileImage == "" && data.profile) {
      formdata.append("profile", data.profile);
    }
    formdata.append("profile_type", imageType);
    const res = await SubmitResponse("/signup", formdata);
    if (res?.status == 200) {
      console.log("tushar", res?.data?.data);
      localStorage.setItem("name", res?.data?.data?.first_name);
      localStorage.setItem("childid", res?.data?.data?.id);
      toast.success(res?.data?.message);
      navigate("/AbhaNumber/" + res?.data?.data?.id);
    }
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
                        {/* <h2>Enter details</h2> */}

                        <Formik
                          initialValues={{
                            prefix: "",
                            firstName: "",
                            lastName: "",
                            gender: "male",
                            dob: "",
                            profile: "",
                            Height: "",
                            Weight: "",
                          }}
                          validationSchema={DashboardModal}
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
                                <Col md={12}>
                                  <div className="form-group">
                                    <label>Prefix</label>
                                    <select
                                      name="prefix"
                                      onChange={handleChange}
                                      value={values?.prefix}
                                    >
                                      <option selected value="">
                                        Select Prefix
                                      </option>
                                      <option>Mr.</option>
                                      <option>Mrs.</option>
                                    </select>
                                    <ErrorComponent
                                      error={
                                        errors.prefix &&
                                        touched.prefix &&
                                        errors.prefix
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col lg={6} md={12}>
                                  <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                      type="text"
                                      placeholder="First Name"
                                      name="firstName"
                                      onChange={handleChange}
                                      value={values.firstName}
                                    />

                                    <ErrorComponent
                                      error={
                                        errors.firstName &&
                                        touched.firstName &&
                                        errors.firstName
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col lg={6} md={12}>
                                  <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                      type="text"
                                      placeholder="Enter Name"
                                      name="lastName"
                                      onChange={handleChange}
                                      value={values.lastName}
                                    />
                                    <ErrorComponent
                                      error={
                                        errors.lastName &&
                                        touched.lastName &&
                                        errors.lastName
                                      }
                                    />
                                  </div>
                                </Col>
                                <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>D.O.B</label>
                                    <input
                                      type="date"
                                      name="dob"
                                      onChange={handleChange}
                                      value={values.dob}
                                    />
                                    <ErrorComponent
                                      error={
                                        errors.dob && touched.dob && errors.dob
                                      }
                                    />
                                  </div>
                                </Col>

                                <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>Height</label>
                                    <input
                                      type="text"
                                      placeholder="Enter Height"
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
                                      placeholder="Enter Weight"
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

                                <Col md={6}>
                                  <div className="form-group">
                                    <div className="upload-images">
                                      <img src={Uploadimage} />
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          setFieldValue(
                                            "profile",
                                            e.target.files[0]
                                          );
                                          setImageType("file");
                                          setProfileImage("");
                                        }}
                                      />
                                    </div>
                                  </div>
                                </Col>
                                {/* <Col md={6}>
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
                                </Col> */}

                                <Col lg={12} md={12}>
                                  <label>Gender</label>
                                </Col>
                                {/* <Col lg={4} md={6}>
                                <div className="form-group">
                                  <div
                                    className={
                                      values.gender == "Male"
                                        ? "gender-slct active"
                                        : "gender-slct"
                                    }
                                    onClick={() => {
                                      setFieldValue("gender", "Male");
                                    }}
                                  >
                                    <img className="img-fluid" src={MaleIcon} />
                                    <p>Male</p>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={4} md={6}>
                                <div className="form-group">
                                  <div
                                    className={
                                      values.gender == "Female"
                                        ? "gender-slct active"
                                        : "gender-slct"
                                    }
                                    onClick={() => {
                                      setFieldValue("gender", "Female");
                                    }}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={FeMaleIcon}
                                    />
                                    <p>Female</p>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={4} md={6}>
                                <div className="form-group">
                                  <div
                                    className={
                                      values.gender == "Other"
                                        ? "gender-slct active"
                                        : "gender-slct"
                                    }
                                    onClick={() => {
                                      setFieldValue("gender", "Other");
                                    }}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={OtherIcon}
                                    />
                                    <p>Other</p>
                                  </div>
                                  <ErrorComponent
                                    error={
                                      errors.gender &&
                                      touched.gender &&
                                      errors.gender
                                    }
                                  />
                                </div>
                              </Col> */}
                                <Col className="gender-section">
                                  <label className="">
                                    Male
                                    <input
                                      type="checkbox"
                                      name="gender"
                                      value="Male"
                                      checked={values.gender == "Male"}
                                      onChange={() => {
                                        setFieldValue("gender", "Male");
                                      }}
                                    />
                                  </label>

                                  <label>
                                    Female
                                    <input
                                      type="checkbox"
                                      name="gender"
                                      value="Female"
                                      checked={values.gender == "Female"}
                                      onChange={() => {
                                        setFieldValue("gender", "Female");
                                      }}
                                    />
                                  </label>
                                  <label>
                                    Other
                                    <input
                                      type="checkbox"
                                      name="gender"
                                      value="Other"
                                      checked={values.gender == "Other"}
                                      onChange={() => {
                                        setFieldValue("gender", "Other");
                                      }}
                                    />
                                  </label>
                                </Col>
                                <ErrorComponent
                                  error={
                                    errors.gender &&
                                    touched.gender &&
                                    errors.gender
                                  }
                                />
                              </Row>

                              <div className="">
                                <button
                                  className="primary-btn-btn mt-5"
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
      </div>

      <ViewFillDetailModal
        show={show}
        onHide={() => setShow(false)}
        data={data}
        CallBack={() => CallApi()}
      />
      <CameraModal
        show={cameraModal}
        onHide={() => setCameraModal()}
        data={data}
        CallBack={(image) => {
          setImageType("base64");
          setProfileImage(image);
        }}
      />
    </>
  );
};

export default CreateProfile;
