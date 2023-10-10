import React, { useEffect, useState } from "react";
import ModalClose from "../images/modal-close.svg";
import User from "../images/user.png";
import { Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetFunction, handleimageUrl } from "../utils/ApiFunctions";

function ProfileCreatedModal(props) {
  const [profiledata, setProfileData] = useState();
  useEffect(() => {
    if (props.show) {
      GetProfile();
    }
  }, [props.show]);
  const GetProfile = async () => {
    const res = await GetFunction("/getprofile");
    if (res.status == 200) {
      setProfileData(res?.data?.data);
    }
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

            <center>
              <h3 className="orange-heading"> CREATED</h3>
              <div className="detail-text w-75 mt-4 mb-4">
                <h4>
                  Profile Created For{" "}
                  {profiledata?.first_name + " " + profiledata?.last_name}
                </h4>
              </div>
              <div className="image-profile">
                <div>
                  <img src={handleimageUrl(profiledata?.profile)} />
                </div>
              </div>
              <div className="details-show mt-5">
                <span>Name:</span>
                <span className="datas">
                  {profiledata?.first_name + " " + profiledata?.last_name}
                </span>
              </div>

              <div className="details-show ">
                <span>D.O.B:</span>
                <span className="datas">{profiledata?.dob}</span>
              </div>

              <div className="details-show ">
                <span>Gender:</span>
                <span className="datas">{profiledata?.gender}</span>
              </div>

              <div className="details-show ">
                <span>Height:</span>
                <span className="datas">{profiledata?.height} cm</span>
              </div>
              <div className="details-show">
                <span>Weight:</span>
                <span className="datas">{profiledata?.weight} kg</span>
              </div>

              {/* <div className="details-show">
                <span>BMI:</span>
                <span className="datas">10 kg</span>
              </div> */}

              <div className="changed-text mt-5">
                <p>
                  The above details can not be changed.
                  <br />
                  Proceed?
                </p>
              </div>
            </center>

            <div className="d-flex gap-2 justify-content-center">
              <button
                className="secondary-btn-btn w-auto px-5"
                onClick={() => props.onHide()}
              >
                Edit
              </button>
              <Link to="/detail-form" className="primary-btn-btn w-auto px-5">
                Continue
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProfileCreatedModal;
