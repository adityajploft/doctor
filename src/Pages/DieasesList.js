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
import jsPDF from "jspdf";
function DieasesList() {
  const { id } = useParams();

  const [editPopup, setshowEditPopup] = useState(false);
  const [index, setIndex] = useState("");
  const [data, setDieaseList] = useState("");

  const DieasesList = async () => {
    const res = await GetFunction(`/desieslist?user_id=${id}`);
    if (res?.status == 200) {
      setDieaseList(res?.data?.data);
    }
  };
  useEffect(() => {
    DieasesList();
  }, []);

  const DeleteDiease = async (isd) => {
    const res = await SubmitResponse(`desiesdelete?desies_id=${isd}`);
    if (res?.status == 200) {
      toast.success(res?.data?.message);
      setshowEditPopup(false);
      setIndex("");
      DieasesList();
    }
  };

  const PdfDownload = (data) => {
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

    // Set the position and styling for the table
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
        <div className="heading-btn">
          <h3>List of Diseases</h3>
          <Link to={`/Instrument/${id}`} className="primary-btn-btn w-auto ">
            <img src={AddIcon} className="mx-2" />
            Add Health/Diseases Track
          </Link>
        </div>
        <div className="card-wrapper-main mt-2">
          <Row>
            {data &&
              data?.map((val, i) => (
                <Col md={4} className="my-3" key={i}>
                  <div className="card-wrapper">
                    <div className="card-headingd">
                      <h4>{val?.diseas_name}</h4>
                      <span
                        className="cursors"
                        onClick={() => {
                          if (index === i) {
                            setshowEditPopup(false);
                            setIndex("");
                          } else {
                            setshowEditPopup(true);
                            setIndex(i);
                          }
                        }}
                      >
                        <img src={Dot} className="img-fluid" />
                      </span>

                      {editPopup && index == i && (
                        <div className="edit-popup">
                          <div className="icons-pop my-2 cursors">
                            {/* <Link
                              to={`/EditDieases/${val.id}`}
                              className="text-popup"
                            >
                              Edit
                            </Link> */}
                          </div>

                          <div
                            className="icons-pop cursors my-2"
                            onClick={() => {
                              DeleteDiease(val?.id);
                            }}
                          >
                            <span className="mx-2">
                              <img src={Delete} />
                            </span>
                            <span className="text-popup cursors">Delete</span>
                          </div>

                          <div className="icons-pop">
                            <span className="mx-2">
                              <img src={Export} />
                            </span>
                            <span
                              className="text-popup cursors"
                              onClick={() => {
                                PdfDownload(val);
                              }}
                            >
                              Export
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="timer">
                      {moment(val?.updated_at).format("YYYY-MM-DD hh:mm:ss a")}
                    </div>

                    <div className=" mt-5">
                      <Link
                        className="view-more"
                        to={`/DieaseDetails/${val?.id}`}
                      >
                        Click to View More
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}

            {data?.length == 0 ? <h2> No Record Found</h2> : ""}
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default DieasesList;
