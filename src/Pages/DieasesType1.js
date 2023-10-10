import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import HypeColor from "../images/hyperColor.svg";
import Hype from "../images/hyper.svg";
import Diab from "../images/blood.svg";
import DiabColor from "../images/bloodColor.svg";
import Email from "../images/email-login.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileCreatedModal from "../Components/ProfileCreatedModal";
import { GetFunction, SubmitResponse } from "../utils/ApiFunctions";
import { toast } from "react-toastify";

const DieasesType1 = () => {
  const [type, setType] = useState([]);
  const [profilemodal, setProfileModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetProfile();
  }, []);
  const GetProfile = async () => {
    const res = await GetFunction(`/alldesieslist?id=${id}`);
    if (res.status == 200) {
      setType(
        res?.data?.data?.map((val, i) => {
          return val?.diseas_name;
        })
      );
    }
  };
  const CreateDiesase = async () => {
    const user = localStorage.getItem("childid");
    const data = new FormData();
    data.append("name", type);
    data.append("id", user);

    const res = await SubmitResponse("/alldesiescreate", data);
    if (res.status == 200) {
      toast.success(res?.data?.message);
      navigate("/dieases-type2/" + id);
    }
  };

  const handleSetDiesases = (dieases) => {
    const data = [...type];
    if (data.includes(dieases)) {
      const rems = data.filter((val) => val !== dieases);
      setType(rems);
    } else {
      setType((pre) => [...pre, dieases]);
    }
  };

  console.log("data", type);
  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role">
                <h2 className="black-text">Systemic Diseases</h2>

                <Row className="justify-content-center">
                  <Col md={4}>
                    <div
                      className={
                        type?.includes("Hyper Tension")
                          ? "role-box active"
                          : "role-box"
                      }
                      onClick={() => {
                        handleSetDiesases("Hyper Tension");
                      }}
                    >
                      <img
                        src={type?.includes("Hyper Tension") ? HypeColor : Hype}
                      />
                      <h3 className="black-text">Hyper Tension</h3>
                      <p className="black-text">Raised Blood Pressure</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div
                      className={
                        type?.includes("Diabetes")
                          ? "role-box active"
                          : "role-box"
                      }
                      onClick={() => {
                        handleSetDiesases("Diabetes");
                      }}
                    >
                      <img
                        src={type?.includes("Diabetes") ? DiabColor : Diab}
                      />
                      <h3 className="black-text">Diabetes</h3>
                      <p className="black-text"> Raised Blood Glucose</p>
                    </div>
                  </Col>
                </Row>
                <div className="login-other">
                  <h4>
                    <span>
                      {" "}
                      <Link className="text-btn" to={`/dieases-type2/${id}`}>
                        Skip
                      </Link>
                    </span>

                    <span>
                      <button
                        className="primary-btn-btn mt-5 w-auto"
                        onClick={() => {
                          // setProfileModal(true);
                          CreateDiesase();
                        }}
                      >
                        Save
                      </button>
                    </span>
                  </h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ProfileCreatedModal
        show={profilemodal}
        onHide={() => setProfileModal(false)}
        Callback={() => {
          CreateDiesase();
        }}
      />
    </>
  );
};

export default DieasesType1;
