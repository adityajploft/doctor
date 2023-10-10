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
function DieasesListForDoctor() {
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

 
  return (
    <Container>
      <div className="list-wrapper p-5">
        <div className="heading-btn">
          <h3>List of Diseases</h3>
        </div>
        <div className="card-wrapper-main mt-2">
          <Row>
            {data &&
              data?.map((val, i) => (
                <Col md={4} className="my-3" key={i}>
                  <div className="card-wrapper">
                    <div className="card-headingd">
                      <h4>{val?.diseas_name}</h4>
                    </div>

                    <div className="timer">
                      {moment(val?.updated_at).format("YYYY-MM-DD hh:mm:ss a")}
                    </div>

                    <div className=" mt-5">
                      <Link
                        className="view-more"
                        to={`/DieaseDetailsForDoctor/${val?.id}`}
                      >
                        Click to View More
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default DieasesListForDoctor;
