import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Dot from "../images/dot.svg";
import Delete from "../images/delete.svg";
import Edit from "../images/Edit.svg";
import Export from "../images/export.svg";
import AddIcon from "../images/addicon.svg";
import { Link, useParams } from "react-router-dom";
import { GetFunction, SubmitResponse } from "../utils/ApiFunctions";
import moment from "moment/moment";
import { toast } from "react-toastify";
function Userdashboard() {
  const { id } = useParams();

  const [editPopup, setshowEditPopup] = useState(false);
  const [index, setIndex] = useState("");
  const [data, setDieaseList] = useState("");
  const [profileData, setProfileData] = useState({});

  const GetProfile = async () => {
    const res = await GetFunction(`/getprofilebyid?id=${id}`);
    if (res?.status == 200) {
      setProfileData(res?.data?.data);
    }
  };
  useEffect(() => {
    GetProfile();
  }, []);
  console.log("data", profileData);
  return (
    <Container>
      {profileData && (
        <div className="list-wrapper  ddddd p-5">
          <center>
            <h4>
              {profileData?.prefix +
                " " +
                profileData?.first_name +
                " " +
                profileData?.last_name}
            </h4>
          </center>

          <div className="card-wrapper-main mt-5">
            <Row>
              <Col md={12} lg={12}>
                <div className="d-flex curesor">
                  <div className="icon-image">
                    <img src={Export} />
                  </div>
                  <div>
                    <Link to={`/DieasesList/${profileData?.id}`}>
                      <h5>Export Data</h5>
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md={12} lg={12}>
                <div className="d-flex curesor">
                  <div className="icon-image">
                    <img src={Export} />
                  </div>
                  <div>
                    <Link to={`/EditProfile/${profileData?.id}`}>
                      <h5>Edit Profile</h5>
                    </Link>
                  </div>
                </div>
              </Col>

              {/* <Col md={12} lg={12}>
                <div className="d-flex curesor">
                  <div className="icon-image">
                    <img src={Export} />
                  </div>
                  <Link to={`/EditProfile/${profileData?.id}`}>
                    <h5>Add Measurement</h5>
                  </Link>
                </div>
              </Col> */}
            </Row>
          </div>

          <center>
            <div className="icon-image">
              <img src={Export} />
            </div>
            <div className="curesor">
              <Link to={`/Instrument/${profileData?.id}`}>
                <h5>Add MeasureMent</h5>
              </Link>
            </div>
          </center>
        </div>
      )}
    </Container>
  );
}

export default Userdashboard;
