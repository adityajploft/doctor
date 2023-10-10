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
import {
  DashboardModal,
  createMember,
  createMemberProfile,
} from "../utils/ValidationSchema";
import ViewFillDetailModal from "../Components/ViewFillDetailModal";
import ErrorComponent from "../Components/ErrorComponent";
import { SubmitResponse } from "../utils/ApiFunctions";
import { toast } from "react-toastify";
import CameraModal from "../Components/CameraModal";

const CreateMember = () => {
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
    formdata.append("profile_type", imageType);
    if (profileImage !== "" && data.profile == "") {
      if (imageType == "base64") {
        formdata.append("profile", profileImage?.toString()?.split("64,")[1]);
      } else {
        formdata.append("profile", profileImage);
      }
    }
    if (profileImage == "" && data.profile) {
      formdata.append("profile", data.profile);
    }
    const res = await SubmitResponse("/createmember", formdata);
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

                      <h1>Simplified record keeping in health care</h1>
                      <img className="img-fluid" src={SignV} />
                    </div>
                  </Col> */}
                  <center>
                    <Col lg={5} md={6}>
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
                          validationSchema={
                            profileImage ? createMember : createMemberProfile
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
                                      // placeholder="First Name"
                                      name="firstName"
                                      placeholder="First Name"
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
                                      // placeholder="Enter Name"
                                      name="lastName"
                                      placeholder="Last Name"
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
                                  <div className="form-group input-with-text">
                                    <label>Height</label>
                                    <input
                                      type="text"
                                      placeholder="_ _ _"
                                      name="Height"
                                      onChange={handleChange}
                                      maxLength={3}
                                      value={values.Height}
                                    />
                                    <span className="centimiter">cm</span>
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
                                  <div className="form-group input-with-text">
                                    <label>Weight</label>
                                    <input
                                      type="text"
                                      placeholder="_ _ _"
                                      name="Weight"
                                      maxLength={3}
                                      onChange={handleChange}
                                      value={values.Weight}
                                    />
                                    <span className="kilogram">Kg</span>

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

                                <ErrorComponent
                                  error={
                                    errors.profile &&
                                    touched.profile &&
                                    errors.profile
                                  }
                                />

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
                                      <img
                                        className="img-fluid"
                                        src={MaleIcon}
                                      />
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

export default CreateMember;
