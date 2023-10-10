import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// images
import Skin from "../images/allergy.svg";
import SkinColor from "../images/allergyColor.svg";
import EyeColor from "../images/EyeColor.svg";
import Eye from "../images/eyed.svg";
import Surgical from "../images/chaku.svg";
import SurgicalColor from "../images/chakuColor.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetFunction, SubmitResponse } from "../utils/ApiFunctions";
import { toast } from "react-toastify";
import ProfileCreatedModal from "../Components/ProfileCreatedModal";

const DieasesType2 = () => {
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const CreateDiesase = async () => {
    const data = new FormData();

    data.append("name", type);
    data.append("id", id);
    const res = await SubmitResponse("/alldesiescreate", data);
    if (res.status == 200) {
      toast.success(res?.data?.message);
      navigate("/ProfileConfirmation/" + id);
    }
  };


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


  const handleSetDiesases = (dieases) => {
    const data = [...type];
    if (data.includes(dieases)) {
      const rems = data.filter((val) => val !== dieases);
      setType(rems);
    } else {
      setType((pre) => [...pre, dieases]);
    }
  };
  return (
    <>
      <div className="login-main">
        <Container>
          <Row className="justify-content-center">
            <Col md={12}>
              <div className="login-out-box select-role">
                <h2 className="black-text">
                  Diseases requiring photographic follow up
                </h2>

                <Row className="justify-content-center">
                  <Col md={4}>
                    <div
                      className={
                        type?.includes("Skin Dieases")
                          ? "role-box active"
                          : "role-box"
                      }
                      onClick={() => {
                        handleSetDiesases("Skin Dieases");
                      }}
                    >
                      <img
                        src={type?.includes("Skin Dieases") ? SkinColor : Skin}
                      />
                      <h3 className="black-text">Skin Dieases</h3>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div
                      className={
                        type?.includes("Eye Dieases")
                          ? "role-box active"
                          : "role-box"
                      }
                      onClick={() => {
                        handleSetDiesases("Eye Dieases");
                      }}
                    >
                      <img
                        src={type?.includes("Eye Dieases") ? EyeColor : Eye}
                      />
                      <h3 className="black-text">Eye Dieases</h3>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div
                      className={
                        type?.includes("Surgical Dieases")
                          ? "role-box active"
                          : "role-box"
                      }
                      onClick={() => {
                        handleSetDiesases("Surgical Dieases");
                      }}
                    >
                      <img
                        src={
                          type?.includes("Surgical Dieases")
                            ? SurgicalColor
                            : Surgical
                        }
                      />
                      <h3 className="black-text">Surgical Dieases</h3>
                    </div>
                  </Col>
                </Row>
                <div className="login-other">
                  <h4>
                    <span>
                      <Link className="text-btn" to={`/FamilyList`}>
                        Skip
                      </Link>
                    </span>
                    <span>
                      {" "}
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
    </>
  );
};

export default DieasesType2;
