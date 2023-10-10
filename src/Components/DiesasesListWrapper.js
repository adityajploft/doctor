import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Welcome from "../Pages/Welcome";
import { Container } from "react-bootstrap";
import Logo from "../images/logo-hdr.png";
import Menu from "../images/menu.svg";
import profile from "../images/profile.svg";
import CloseSide from "../images/close-icon.svg";
import UserMain from "../images/user.svg";
import { MdFamilyRestroom, MdDataExploration } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
function DiesasesListWrapper() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const id = pathname?.startsWith("/userDashboard")
    ? pathname?.split("userDashboard/")[1]
    : pathname?.split("DieasesList/")[1];
  return (
    <div>
      <header className="header">
        <Container>
          <div className="nav-header">
            <div className="logo-menu">
              <img
                className="img-fluid me-4"
                src={Menu}
                onClick={() => setActive(true)}
              />
              <img className="img-fluid" src={Logo} />
            </div>
          </div>
        </Container>
      </header>
      <div className={active ? "active sidebar" : "sidebar"}>
        <div className="side-bar-menu">
          <div className="side-logo-cls">
            <img className="img-fluid" src={Logo} />
            <img
              className="img-fluid"
              src={CloseSide}
              onClick={() => setActive(false)}
            />
          </div>
          <ul>
            <li>
              <Link to={`/account/${id}`}>
                <i>
                  <BiSolidUserCircle fontSize={"25px"} />
                </i>{" "}
                Account
              </Link>
            </li>
            <li>
              <Link to={`/DieasesList/${id}`}>
                <i>
                  <BiSolidUserCircle fontSize={"25px"} />
                </i>{" "}
                Dieases List
              </Link>
            </li>

            <li>
              <Link to="/FamilyList">
                <i>
                  <BiSolidUserCircle fontSize={"25px"} />
                </i>{" "}
                FamilyList
              </Link>
            </li>
            <li>
              <Link to="/FamilyList">
                <i>
                  <MdFamilyRestroom fontSize={"25px"} />
                </i>{" "}
                Add family Member
              </Link>
            </li>
            <li>
              <Link to="/">
                <i>
                  <MdDataExploration fontSize={"25px"} />
                </i>{" "}
                Health Records
              </Link>
            </li>
            <li
              onClick={() => {
                localStorage.clear();
                navigate("/role");
              }}
            >
              <Link to="#">
                <i>
                  <FiLogOut fontSize={"25px"} />
                </i>{" "}
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default DiesasesListWrapper;
