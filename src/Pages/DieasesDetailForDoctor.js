import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Dot from "../images/dot.svg";
import Delete from "../images/delete.svg";

import Edit from "../images/Edit.svg";
import Export from "../images/export.svg";
import Imagwe from "../images/puic.png";
import View from "../images/eye.svg";
import Download from "../images/download.svg";

import User from "../images/user.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DownloadGloabal,
  GetFunction,
  SubmitResponse,
  handleimageUrl,
} from "../utils/ApiFunctions";
import moment from "moment";
import jsPDF from "jspdf";

function DieasesDetailForDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editPopup, setshowEditPopup] = useState(false);
  const [index, setIndex] = useState("");

  const [data, setDieaseList] = useState("");

  const DieasesList = async () => {
    const res = await GetFunction(`/desiesedit?desies_id=${id}`);
    if (res?.status == 200) {
      setDieaseList(res?.data?.data);
    }
  };
  useEffect(() => {
    DieasesList();
  }, []);

  const PdfDownload = () => {
    const doc = new jsPDF("landscape", "px", "a4", "false");

    // Define the data for your table
    const data1 = [
      ["Diease Name", "ImageData", "Date", "Patient Name"],
      [
        data?.diseas_name,
        data?.image_text,
        data?.created_at?.split("T")[0],
        data?.userfname,
      ],
    ];

    const startX = 20;
    const startY = 70;
    const cellWidth = 150;
    const cellHeight = 20;
    const fontSize = 10;

    // Loop through the data and add it to the table
    for (let i = 0; i < data1.length; i++) {
      for (let j = 0; j < data1[i].length; j++) {
        doc.setFontSize(fontSize);
        doc.text(startX + j * cellWidth, startY + i * cellHeight, data1[i][j]);
      }
    }

    // Save the PDF
    doc.save("table.pdf");
    // pdf.text("Hello world!", 10, 10);
    // pdf.save("a.pdf");
  };

  return (
    <Container>
      <div className="list-wrapper p-5">
        <div className="dieases-detail-wrapper mt-2">
          <Row>
            <Col md={6}>
              <div className="dieases-detail">
                <div className="heading-details">
                  <h3>{data?.diseas_name}</h3>
                  <span>
                    <img src={Export} onClick={PdfDownload} />{" "}
                  </span>
                </div>
                <div className="user-details ">
                  <div className="user-image ">
                    <img src={handleimageUrl(data?.userprofile)} />
                  </div>

                  <div className="mx-3">
                    <span className="user-name">{data?.userfname}</span>
                    <p className="user-dob">D.O.B: {data?.userdob}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h3>Abha Number</h3>

                  <span>{data?.abha_number}</span>
                </div>
                <div className="mt-3">
                  <h3>Image Data</h3>

                  <span>
                    {data?.image_text} mm of hg<sup>2</sup>{" "}
                  </span>
                </div>
                <div className="mt-3">
                  <h3>Dieases Created At</h3>

                  <span>
                    {moment(data?.created_at).format("YYYY-MM-DD HH:MM a")}
                  </span>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="heading-detailss">
                <h4>Reports</h4>

                <div className="image-lsit">
                  <div className="image-wrapper">
                    <img src={handleimageUrl(data?.image)} />
                    <div className="tw-image">
                      <span className="image-span">
                        <img
                          src={Download}
                          onClick={() => {
                            DownloadGloabal(data?.image, data?.image);
                          }}
                        />
                      </span>
                      <span className="image-span">
                        <img src={View} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default DieasesDetailForDoctor;
