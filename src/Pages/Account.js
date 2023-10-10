import React, { useEffect, useState } from "react";
import { GetFunction, handleimageUrl } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

function Account() {
  const { id } = useParams();
  const [profiledata, setProfileData] = useState();
  const [dieaseList, setDieasesList] = useState();
  useEffect(() => {
    GetProfile();
    GetOldDieases();
  }, []);
  const GetProfile = async () => {
    const res = await GetFunction(`/getprofilebyid?id=${id}`);
    if (res.status == 200) {
      setProfileData(res?.data?.data);
    }
  };
  const GetOldDieases = async () => {
    const res = await GetFunction(`/alldesieslist?id=${id}`);
    if (res.status == 200) {
      setDieasesList(res?.data?.data);
    }
  };

  return (
    <div>
      <div className="otp-vary">
        <center>
          <h3 className="orange-heading"> CREATED</h3>
          <div className="detail-text w-75 mt-4 mb-4">
            {/* <h4>
              Profile Created For{" "}
              {profiledata?.first_name + " " + profiledata?.last_name}
            </h4> */}
          </div>
          <div className="image-profile">
            <div className="image-wrpapper">
              <img src={handleimageUrl(profiledata?.profile)} />
            </div>
          </div>
          <div className="details-show1 mt-5">
            <span>Name:</span>
            <span className="datas">
              {profiledata?.first_name + " " + profiledata?.last_name}
            </span>
          </div>

          <div className="details-show1 ">
            <span>D.O.B:</span>
            <span className="datas">{profiledata?.dob}</span>
          </div>

          <div className="details-show1 ">
            <span>Gender:</span>
            <span className="datas">{profiledata?.gender}</span>
          </div>

          <div className="details-show1 ">
            <span>Height:</span>
            <span className="datas">{profiledata?.height} cm</span>
          </div>
          <div className="details-show1">
            <span>Weight:</span>
            <span className="datas">{profiledata?.weight} kg</span>
          </div>

          {/* <div className="details-show1">
                <span>BMI:</span>
                <span className="datas">10 kg</span>
              </div> */}
          {/* 
          <div className="changed-text mt-5">
            <p>
              The above details can not be changed.
              <br />
              Proceed?
            </p>
          </div> */}
        </center>

        {/* <div className="d-flex gap-2 justify-content-center">
          <button className="secondary-btn-btn w-auto px-5">Edit</button>
          <Link to="/detail-form" className="primary-btn-btn w-auto px-5">
            Continue
          </Link>
        </div> */}
      </div>

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
    </div>
  );
}

export default Account;
