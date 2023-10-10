import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

// images
import Logo from "../images/logo.svg";
import SignV from "../images/sign-up-img.svg";
import MaleIcon from "../images/male.svg";
import FeMaleIcon from "../images/female.svg";
import Uploadimage from "../images/uploadPhoto.svg";
import TakeImage from "../images/takeImage.svg";
import ModalClose from "../images/modal-close.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { DashboardModal, DieasesModal } from "../utils/ValidationSchema";
import ViewFillDetailModal from "../Components/ViewFillDetailModal";
import ErrorComponent from "../Components/ErrorComponent";
import CameraModal from "../Components/CameraModal";
import { GetFunction, SubmitResponse } from "../utils/ApiFunctions";
import { toast } from "react-toastify";

const EditDieases = () => {
  const { dieasesId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [images, setImage] = useState("");
  const [dieaseDetails, setDieaseDetails] = useState("");

  const [type, setType] = useState("file");

  const [data, setData] = useState({});

  const handleSubmit = (values) => {
    setData(values);
    setNextStep(true);
  };
  // const userId = localStorage.getItem("user_id");
  const CallApi = async () => {
    const formdata = new FormData();
    formdata.append("diseas_name", data?.dieases);
    formdata.append("desies_id", dieasesId);
    formdata.append("symptoms", data?.symptoms);
    formdata.append("description", data?.description);
    if (images) {
      formdata.append("image_type", type);
      if (type == "base64") {
        formdata.append("image", images?.toString()?.split("64,")[1]);
      } else {
        formdata.append("image", images);
      }
    }

    const res = await SubmitResponse("/desiesupdate", formdata);
    if (res?.status == 200) {
      toast.success(res?.data?.message);
      navigate(-1);
    }
  };

  const DieasesList = async () => {
    const res = await GetFunction(`/desiesedit?desies_id=${dieasesId}`);
    if (res?.status == 200) {
      setDieaseDetails(res?.data?.data);
    }
  };
  useEffect(() => {
    DieasesList();
  }, []);

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
                      <h1>Add Health/Diseases Track</h1>

                      <img className="img-fluid" src={SignV} />
                    </div>
                  </Col>
                  <Col lg={5} md={6}>
                    <div className="login-sign-frm outr-frm-bx">
                      <h2>Update Track</h2>

                      {!nextStep ? (
                        <Formik
                          initialValues={{
                            dieases: dieaseDetails?.diseas_name,
                            symptoms: dieaseDetails?.symptoms,
                            description: dieaseDetails?.description,
                          }}
                          validationSchema={DieasesModal}
                          onSubmit={handleSubmit}
                          enableReinitialize
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
                                    <label>Select Dieases</label>
                                    <select
                                      name="dieases"
                                      onChange={handleChange}
                                      value={values?.dieases}
                                    >
                                      <option selected value="">
                                        Select Dieases
                                      </option>
                                      <option value="Hyper Tension">
                                        Hypertension
                                      </option>
                                      <option value="Diabetes">Diabetes</option>
                                      <option value="Surgical Dieases">
                                        Surgical Dieases
                                      </option>
                                      <option value="Skin Dieases">
                                        Skin Dieases
                                      </option>
                                      <option value="Eye Dieases">
                                        Eye Dieases
                                      </option>
                                    </select>
                                    <ErrorComponent
                                      error={
                                        errors.dieases &&
                                        touched.dieases &&
                                        errors.dieases
                                      }
                                    />
                                  </div>
                                </Col>
                                {/* <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>Symptoms</label>
                                    <input
                                      type="text"
                                      placeholder="Enter Symptoms by Comma Seprated"
                                      name="symptoms"
                                      onChange={handleChange}
                                      value={values.symptoms}
                                    />

                                    <ErrorComponent
                                      error={
                                        errors.symptoms &&
                                        touched.symptoms &&
                                        errors.symptoms
                                      }
                                    />
                                  </div>
                                </Col> */}
                                <Col lg={12} md={12}>
                                  <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                      name="description"
                                      onChange={handleChange}
                                      value={values.description}
                                      placeholder="Description"
                                      rows={5}
                                    />
                                    <ErrorComponent
                                      error={
                                        errors.description &&
                                        touched.description &&
                                        errors.description
                                      }
                                    />
                                  </div>
                                </Col>
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
                      ) : (
                        <form className="cmn-frm">
                          <Row>
                            <Col md={6}>
                              <div className="form-group">
                                <div className="upload-images">
                                  <img src={Uploadimage} />
                                  <input
                                    type="file"
                                    onChange={(e) => {
                                      setType("file");
                                      setImage(e.target.files[0]);
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

                            <div className="">
                              <button
                                className="primary-btn-btn mt-5"
                                variant="primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  CallApi();
                                }}
                              >
                                Save/Extract
                              </button>
                            </div>
                          </Row>
                        </form>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <CameraModal
        show={cameraModal}
        onHide={() => setCameraModal()}
        data={data}
        CallBack={(image) => {
          setType("base64");
          setImage(image);
        }}
      />
    </>
  );
};

export default EditDieases;
