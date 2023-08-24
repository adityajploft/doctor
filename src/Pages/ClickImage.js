import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function ClickImage() {
  const [image, setImage] = useState("");
  const [clickImage, SetclickImage] = useState(false);
  return (
    <div>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              {image == "" ? (
                <button onClick={() => SetclickImage(true)}>Click Image</button>
              ) : (
                ""
              )}
              {clickImage && image == "" ? (
                <div className="login-out-box sign-upmain">
                  <Webcam
                    audio={false}
                    height={400}
                    screenshotFormat="image/jpeg"
                    width={400}
                    videoConstraints={videoConstraints}
                    mirrored={true}
                  >
                    {({ getScreenshot }) => (
                      <button
                        onClick={() => {
                          const imageSrc = getScreenshot();

                          setImage(imageSrc);
                        }}
                      >
                        Capture photo
                      </button>
                    )}
                  </Webcam>
                </div>
              ) : (
                <img src={image} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ClickImage;
