import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// images
import BigUser from "../images/biguser.png";

import { Link } from "react-router-dom";
import Add from "../images/orangeadd.png";
import { GetFunction, handleimageUrl } from "../utils/ApiFunctions";
import Slider from "react-slick";
const FamilyList = () => {
  const [type, setType] = useState("mobile");
  const [list, setList] = useState([]);
  const getFamilyUser = async () => {
    const res = await GetFunction("/userlist");
    if (res.status == 200) {
      setList(res?.data?.data);
    }
  };
  useEffect(() => {
    getFamilyUser();
  }, []);

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

  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role slider-container">
                <Row className="justify-content-center ">
                  <Slider {...settings}>
                    {list &&
                      list?.map((val, i) => (
                        <Col md={4} className="mx-3">
                          <Link to={`/userDashboard/${val?.id}`}>
                            {/* <Link to={`/DieasesList/${val?.id}`}> */}
                            <div className="family-list-wrapper mx-3">
                              <div className="imag-item">
                                <img src={handleimageUrl(val.profile)} />
                              </div>
                              <center>
                                {/* <div className="name-wrapper">
                                <Link to={`/DieasesList/${val?.id}`}>
                                  <h4>{val?.first_name}</h4>
                                </Link>
                              </div> */}
                              </center>
                            </div>
                          </Link>
                        </Col>
                      ))}
                    {list?.length < 6 && (
                      <Col md={4} className="mx-2">
                        <div className="create-family-member ">
                          <div>
                            <Link to="/create-member">
                              <img src={Add} className="m-auto" />
                              <h4>Create New </h4>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Slider>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FamilyList;
