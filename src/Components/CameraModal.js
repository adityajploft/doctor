import React, { useState } from "react";
import ModalClose from "../images/modal-close.svg";
import varfyIcon from "../images/varfy-img.svg";
import { Col, Modal, Row } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import Webcam from "react-webcam";
function CameraModal(props) {
  const [image, setImage] = useState("");
  const [clickImage, SetclickImage] = useState(false);
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const videoConstraints = {
    width: 1280,
    height: 720,

    // facingMode: "user",
    facingMode: { exact: "environment" },
  };
  return (
    <div>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        className="otp-vary-mdl"
      >
        <Modal.Body>
          <div className="otp-vary">
            <button className="cls-btn" onClick={() => props.onHide()}>
              <img className="img-fluid" src={ModalClose} />
            </button>
          </div>

          <Row className="justify-content-center">
            <Col md={12}>
              {props?.show && image == "" ? (
                <div className="login-out-box sign-upmain">
                  <Webcam
                    audio={false}
                    height={"100%"}
                    screenshotFormat="image/jpeg"
                    width={"100%"}
                    videoConstraints={videoConstraints}
                    mirrored={false}
                  >
                    {({ getScreenshot }) => (
                      <center>
                        <button
                          onClick={() => {
                            const imageSrc = getScreenshot();

                            setImage(imageSrc);
                          }}
                          className="orange-btn"
                        >
                          <span></span>
                        </button>
                      </center>
                    )}
                  </Webcam>
                </div>
              ) : (
                <div className="preview-image-wrapper">
                  <div className="preview-image p-3">
                    {/* <img src={image} /> */}
                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                      <img src={image} />
                    </ReactCrop>
                  </div>

                  <Row>
                    <Col md={6}>
                      <button
                        className="primary-btn-btn mt-2 "
                        onClick={() => {
                          setImage("");
                        }}
                      >
                        Retake
                      </button>
                    </Col>
                    <Col md={6}>
                      <button
                        className="primary-btn-btn mt-2 "
                        onClick={() => {
                          setImage("");
                          props.CallBack(image);
                          props.onHide();
                        }}
                      >
                        Save
                      </button>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CameraModal;
