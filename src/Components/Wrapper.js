import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Welcome from "../Pages/Welcome";

function Wrapper() {

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Wrapper;
