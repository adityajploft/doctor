import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./css/style.css";
import "./font/stylesheet.css";
import Welcome from "../src/Pages/Welcome";
import Role from "../src/Pages/Role";
import CreateAccount from "../src/Pages/CreateAccount";
import SignUp from "../src/Pages/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";
import ClickImage from "./Pages/ClickImage";
import Wrapper from "./Components/Wrapper";
import DetailForm from "./Pages/DetailForm";
import DiesasesListWrapper from "./Components/DiesasesListWrapper";
import DieasesList from "./Pages/DieasesList";
import DieaseDetails from "./Pages/DieaseDetails";
import AddDieases from "./Pages/AddDiesases";
import CreateProfile from "./Pages/CreateProfile";
import DieasesType1 from "./Pages/DieasesType1";
import DieasesType2 from "./Pages/DieaseType2";
import FamilyList from "./Pages/FamilyList";
import Instrument from "./Pages/Instrument";
import AbhaNumber from "./Pages/AbhaNumber";
import PatientList from "./Pages/PatientList";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import LoginCheckRoute from "./utils/LoginCheckRoute";
import PrivateRoutes from "./utils/ProtectedRoutes";
import Account from "./Pages/Account";
import EditDieases from "./Pages/EditDieases";
import CreateMember from "./Pages/CreateMember";
import DieasesDetailForDoctor from "./Pages/DieasesDetailForDoctor";
import DieasesListForDoctor from "./Pages/DieasesListForDoctor";
import ProfileConfirmationPage from "./Pages/ProfileConfirmationPage";
import EditProfile from "./Pages/EditProfile";
import Userdashboard from "./Pages/Userdashboard";
import DieasesConfirmation from "./Pages/DieasesConfirmation";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/role" />} />
          <Route element={<DiesasesListWrapper />}>
            <Route path="/DieasesList/:id" element={<DieasesList />}></Route>
            <Route
              path="/DieasesListForDoctor/:id"
              element={<DieasesListForDoctor />}
            ></Route>
            <Route path="/Account/:id" element={<Account />}></Route>
            <Route
              path="/DieaseDetails/:id"
              element={<DieaseDetails />}
            ></Route>

            <Route
              path="/DieaseDetailsForDoctor/:id"
              element={<DieasesDetailForDoctor />}
            ></Route>
            <Route
              path="/userDashboard/:id"
              element={<Userdashboard />}
            ></Route>
          </Route>
          <Route element={<Wrapper />}>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/role" element={<Role />}></Route>
            <Route path="/PatientList" element={<PatientList />}></Route>
            <Route path="/dieases-type1/:id" element={<DieasesType1 />}></Route>
            <Route path="/dieases-type1" element={<DieasesType1 />}></Route>
            <Route path="/create-member" element={<CreateMember />}></Route>

            <Route path="/EditProfile/:id" element={<EditProfile />}></Route>
            <Route path="/AbhaNumber/:id" element={<AbhaNumber />}></Route>
            <Route path="/Instrument/:id" element={<Instrument />}></Route>
            <Route path="/dieases-type2/:id" element={<DieasesType2 />}></Route>
            <Route path="/detail-form" element={<DetailForm />}></Route>
            <Route path="/FamilyList" element={<FamilyList />}></Route>

            <Route
              path="/ProfileConfirmation/:id"
              element={<ProfileConfirmationPage />}
            ></Route>
            <Route
              path="/DieasesConfirmation/:id"
              element={<DieasesConfirmation />}
            ></Route>

            <Route
              path="/add-dieases/:userId/:dieases"
              element={<AddDieases />}
            ></Route>

            {/* <Route
              path="/EditDieases/:dieasesId"
              element={<EditDieases />}
            ></Route> */}
          </Route>
          <Route element={<LoginCheckRoute />}>
            <Route path="/create-account" element={<CreateAccount />}></Route>
            <Route path="/login/:type" element={<Login />}></Route>
            <Route path="/create-profile" element={<CreateProfile />}></Route>
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
