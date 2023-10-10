import React, { useEffect, useState } from "react";
import { GetFunction, handleimageUrl } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

function DieasesConfirmation() {
  const [dieaseList, setProfileData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    GetProfile();
  }, []);
  const GetProfile = async () => {
    const res = await GetFunction(`/alldesieslist?id=${id}`);
    if (res.status == 200) {
      setProfileData(res?.data?.data);
    }
  };
  return (
    <div className="otp-vary">
      <center>
        <div className=" ">
          <center>
            <h4>Dieases Added By You</h4>
          </center>
          <div className="mt-5">
            {dieaseList &&
              dieaseList?.map((val, i) => (
                <div className="details-show1">
                  <span>Disease {i + 1}</span>
                  <span>{val?.diseas_name}</span>
                </div>
              ))}
          </div>
        </div>
      </center>

      <div className="d-flex gap-2 justify-content-center">
        <Link
          to={`/dieases-type1/${id}`}
          className="primary-btn-btn w-auto px-5"
        >
          Edit
        </Link>
        <Link to="/FamilyList" className="primary-btn-btn w-auto px-5">
          Continue
        </Link>
      </div>
    </div>
  );
}

export default DieasesConfirmation;
