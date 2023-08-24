import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/css/style.css";
import Welcome from "../src/Pages/Welcome";
import Role from "../src/Pages/Role";
import CreateAccount from "../src/Pages/CreateAccount";
import SignUp from "../src/Pages/SignUp";
import Dashboard from "../src/Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import ClickImage from "./Pages/ClickImage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/role" element={<Role />}></Route>
          <Route path="/create-cccount" element={<CreateAccount />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/upload-pic" element={<ClickImage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
