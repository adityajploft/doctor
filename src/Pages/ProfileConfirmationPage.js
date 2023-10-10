import React, { useEffect, useState } from "react";
import { GetFunction, handleimageUrl } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";

function ProfileConfirmationPage() {
  const [profiledata, setProfileData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    GetProfile();
  }, []);
  const GetProfile = async () => {
    const res = await GetFunction(`/getprofilebyid?id=${id}`);
    if (res.status == 200) {
      setProfileData(res?.data?.data);
    }
  };
  return (
    <div className="otp-vary">
      <center>
        <div className="detail-text w-75 mt-4 mb-4">
          <h4>
            Profile Created For{" "}
            {profiledata?.first_name + " " + profiledata?.last_name}
          </h4>
        </div>
        <div className="image-profile">
          <div className="img-wrapper">
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
          <span className="datas">{profiledata?.height} M.</span>
        </div>
        <div className="details-show">
          <span>Weight:</span>
          <span className="datas">{profiledata?.weight} kg</span>
        </div>

        <div className="details-show">
          <span>BMI:</span>
          <span className="datas">
            {(
              (profiledata?.height * profiledata?.height) /
              profiledata?.weight
            ).toFixed(2)}{" "}
            kg/M<sup>2</sup>
          </span>
        </div>
      </center>

      <div className="d-flex gap-2 justify-content-center">
        <Link to={`/EditProfile/${id}`} className="primary-btn-btn w-auto px-5">
          Edit
        </Link>
        <Link
          to={`/DieasesConfirmation/${id}`}
          className="primary-btn-btn w-auto px-5"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default ProfileConfirmationPage;
