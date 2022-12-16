import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/css/soft-ui-dashboard.css?v=1.0.6";
import "./assets/css/soft-ui-dashboard.min.css";

import "./assets/js/core/bootstrap.min.js";
import "./assets/js/core/popper.min.js";
import "./assets/js/plugins/perfect-scrollbar.min.js";
import "./assets/js/plugins/smooth-scrollbar.min.js";
import "./assets/js/soft-ui-dashboard.min.js?v=1.0.6";
import Navbar from "./components/Navigation/navbar.component";
import GroundsRequests from "./routes/Grounds-Requests/groundsRequest.component";
import LoginPage from "./routes/Login/login.component";
import Signup from "./routes/Signup/signup.component";
import { UserContext } from "./context/user.context";
import { GroundProvider } from "./context/grounds.context";
import MyGround from "./routes/MyGround/myground.component";
import FirstLoader from "./components/startingLoader/firstLoader.component";
import "./assets/css/myCalender.css";
import Settings from "./routes/Settings/settings.component";
import Dashboard from "./routes/Dashboard/dashboard.component";

function App() {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    document.body.classList.add("g-sidenav-show", "bg-gray-100");
    console.log(currentUser);
  }, [currentUser]);

  return (
    <Routes>
      <Route path="" element={<Navbar />}>
        {
          /*Add routes here that are available after authentication*/
          currentUser ? (
            <>
              <Route index element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/my-ground" element={<MyGround />} />
              <Route
                path="/requests"
                element={
                  <GroundProvider>
                    <GroundsRequests />
                  </GroundProvider>
                }
              />
            </>
          ) : (
            <>
              <Route index element={<LoginPage />} />
              <Route index path="/signup" element={<Signup />} />
            </>
          )
        }
      </Route>
    </Routes>
  );
}

export default App;
