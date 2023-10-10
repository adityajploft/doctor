import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Dot from "../images/dot.svg";
import Delete from "../images/delete.svg";
import Edit from "../images/Edit.svg";
import { GetFunction, handleimageUrl } from "../utils/ApiFunctions";
import Export from "../images/export.svg";
import AddIcon from "../images/addicon.svg";
import { Link } from "react-router-dom";
function PatientList() {
  const [editPopup, setshowEditPopup] = useState(false);
  const [fromDate, setStartDate] = useState("");
  const [toDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [List, setList] = useState([]);

  useEffect(() => {
    GetList();
  }, [search, toDate, fromDate]);
  const GetList = async () => {
    const res = await GetFunction(
      `petientlist?user_unique_id=${search}&from_date=${fromDate}&to_date=${toDate}`
    );
    if (res.status == 200) {
      setList(res?.data?.data);
    }
  };
  return (
    <Container>
      <div className="date-formt mt-4">
        <form>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <input
                  className="w-50"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex gap-2 mt-2">
                <div className="form-group">
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </form>
      </div>

      <Row className="mt-5">
        {List &&
          List?.map((val, i) => (
            <Col md={4}>
              <Link to={`/DieasesListForDoctor/${val.id}`} className="anchor">
                <ul className="patnt-list">
                  <li>
                    Id : <span>#{val?.user_unique_id}</span>
                  </li>
                  <li>
                    Patient Name : <span>{val?.first_name}</span>
                  </li>
                </ul>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default PatientList;
