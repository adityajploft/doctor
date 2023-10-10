import React, { useState } from "react";
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

const AddDieases = () => {
  const { userId, dieases } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [nextStep, setNextStep] = useState(true);
  const [imagetext, setImageText] = useState("");
  const [cameraModal, setCameraModal] = useState(false);
  const [images, setImage] = useState("");
  const [type, setType] = useState("file");

  const [data, setData] = useState({});

  const handleSubmit = (values) => {
    setData(values);
  };
  // const userId = localStorage.getItem("user_id");
  const CallApi = async () => {
    if (dieases == "diabetes" || dieases == "Hypertension") {
      // fetch data from image
      const formdata = new FormData();
      if (images) {
        formdata.append("type", type);
        if (type == "base64") {
          formdata.append("image", images);
        } else {
          formdata.append("image", images);
        }
      }
      const res = await SubmitResponse("/testImage", formdata);

      if (res?.status == 200) {
        setShow(true);
        setImageText(res?.data?.data?.split("\n")?.join(","));
      }
    } else {
      const formdata = new FormData();
      formdata.append("diseas_name", dieases);
      formdata.append("user_id", userId);

      if (images) {
        formdata.append("image_type", type);
        if (type == "base64") {
          formdata.append("image", images?.toString()?.split("64,")[1]);
        } else {
          formdata.append("image", images);
        }
      }

      const res = await SubmitResponse("/desiescreate", formdata);
      if (res?.status == 200) {
        toast.success(res?.data?.message);
        navigate(`/DieasesList/${userId}`);
      }
    }
  };

  const SaveImageExtarctData = async () => {
    const formdata2 = new FormData();
    formdata2.append("diseas_name", dieases);
    formdata2.append("user_id", userId);
    formdata2.append("image_text", imagetext?.toString());

    if (images) {
      formdata2.append("image_type", type);
      if (type == "base64") {
        formdata2.append("image", images?.toString()?.split("64,")[1]);
      } else {
        formdata2.append("image", images);
      }
    }

    const res1 = await SubmitResponse("/desiescreate", formdata2);
    if (res1?.status == 200) {
      toast.success("Dieases Created SuccessFully");
      navigate(`/DieasesList/${userId}`);
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
                  <center>
                    <Col lg={5} md={6}>
                      <div className="login-sign-frm outr-frm-bx">
                        <h2>
                          {!nextStep && !show
                            ? `click the 
photograph of the 
measurement`
                            : !show
                            ? `
Upload Or Click Image
`
                            : `Confirmation 
                            process`}
                        </h2>
                        {!nextStep && !show ? (
                          <Formik
                            initialValues={{
                              dieases: dieases ? dieases : "",
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
                            }) => (
                              <form className="cmn-frm" onSubmit={handleSubmit}>
                                {/* <div className="">
                                <button
                                  className="primary-btn-btn mt-5"
                                  variant="primary"
                                  type="submit"
                                >
                                  Next
                                </button>
                              </div> */}
                              </form>
                            )}
                          </Formik>
                        ) : !show ? (
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
                        ) : (
                          <form className="cmn-frm">
                            <Row>
                              <Col md={10}>
                                <span> The acquired value is</span>
                                <div className="form-group d-flex">
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      setImageText(e.target.value);
                                    }}
                                    value={imagetext}
                                  />
                                  <span> mm of Hg</span>
                                </div>
                              </Col>

                              <div className="">
                                <button
                                  className="primary-btn-btn mt-5"
                                  variant="primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    SaveImageExtarctData();
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
                  </center>
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

export default AddDieases;
