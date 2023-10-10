import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import Glucometer from "../images/blood-glucometer.png";
import OxyMter from "../images/oximetyer.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import BPmeter from "../images/Bpmeter.png";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

const Instrument = () => {
  const [diesas, setDiease] = useState("");
  const { id } = useParams();

  const CustomNextArrow = ({ onClick }) => (
    <button className="custom-next-button" onClick={onClick}>
      <AiOutlineArrowRight fontSize={"25px"} />
    </button>
  );

  // Custom "Previous" button component
  const CustomPrevArrow = ({ onClick }) => (
    <button className="custom-prev-button" onClick={onClick}>
      <AiOutlineArrowLeft fontSize={"25px"} />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />, // Custom "Next" button
    prevArrow: <CustomPrevArrow />, // Custom "Previous" button

    responsive: [
      {
        breakpoint: 1200, // Large screens and up
        settings: {
          slidesToShow: 3, // Display 3 slides at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // Medium screens
        settings: {
          slidesToShow: 2, // Display 2 slides at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 1, // Display 1 slide at a time
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleDiesase = (diesas) => {
    setDiease(diesas);
  };

  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role">
                <Row className="justify-content-center">
                <h2>Select the type of instrument</h2>
                  <Slider {...settings}>
                    <Col md={4}>
                      <div
                        className={
                          diesas == "diabetes" ? "role-box active" : "role-box"
                        }
                        onClick={() => {
                          handleDiesase("diabetes");
                        }}
                      >
                        <img src={Glucometer} />
                        <h3>Glucometer</h3>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div
                        className={
                          diesas == "Hypertension"
                            ? "role-box active"
                            : "role-box"
                        }
                        onClick={() => {
                          handleDiesase("Hypertension");
                        }}
                      >
                        <img src={BPmeter} />
                        <h3>BP Machine</h3>
                      </div>
                    </Col>

                    <Col md={4}>
                      <div
                        className={
                          diesas == "Surgical Dieases"
                            ? "role-box active"
                            : "role-box"
                        }
                        onClick={() => {
                          handleDiesase("Surgical Dieases");
                        }}
                      >
                        <img src={OxyMter} />
                        <h3>Pulse oximeter</h3>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div
                        className={
                          diesas == "Skin Dieases"
                            ? "role-box active"
                            : "role-box"
                        }
                        onClick={() => {
                          handleDiesase("Skin Dieases");
                        }}
                      >
                        <img src={OxyMter} />
                        <h3>Skin Dieases</h3>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div
                        className={
                          diesas == "Eye Dieases"
                            ? "role-box active"
                            : "role-box"
                        }
                        onClick={() => {
                          handleDiesase("Eye Dieases");
                        }}
                      >
                        <img src={OxyMter} />
                        <h3>Eye Dieases</h3>
                      </div>
                    </Col>
                  </Slider>
                </Row>
              </div>
              <div>
                <center>
                  <Link
                    to={`/add-dieases/${id}/${diesas}`}
                    className="primary-btn-btn w-auto mt-5"
                  >
                    {" "}
                    Next
                  </Link>
                </center>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Instrument;
