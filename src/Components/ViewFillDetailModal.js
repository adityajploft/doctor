import React from "react";
import ModalClose from "../images/modal-close.svg";
import varfyIcon from "../images/varfy-img.svg";
import { Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function ViewFillDetailModal(props) {
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
              <h3 className="orange-heading"> Details</h3>
              <div className="detail-text w-75 mt-4 mb-4">
                <h4>You have entered the following details</h4>
              </div>

              <div className="details-show mt-5">
                <span className="black-text">Name:</span>
                <span className="datas">
                  {props?.data?.prefix +
                    " " +
                    props?.data?.firstName +
                    " " +
                    props?.data?.lastName}
                </span>
              </div>

              <div className="details-show mb-5">
                <span className="black-text">Dob:</span>
                <span className="datas">{props?.data?.dob}</span>
              </div>

              <div className="details-show mb-5">
                <span className="black-text">Height:</span>
                <span className="datas">{props?.data?.Height}</span>
              </div>

              <div className="details-show mb-5">
                <span className="black-text">Weight:</span>
                <span className="datas">{props?.data?.Weight}</span>
              </div>

              <div className="details-show">
                <span className="black-text">Gender:</span>
                <span className="datas">{props?.data?.gender}</span>
              </div>

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
                No
              </button>

              <button
                className="primary-btn-btn w-auto px-5"
                onClick={() => {
                  props.CallBack();
                  props.onHide();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ViewFillDetailModal;
