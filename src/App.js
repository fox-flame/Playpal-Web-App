import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
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

function App() {
  useEffect(() => {
    document.body.classList.add("g-sidenav-show", "bg-gray-100");
  }, []);
  return (
    <Routes>
      <Route path="" element={<Navbar />}>
        <Route index element={<p>Dashboard</p>} />
        <Route path="/requests" element={<GroundsRequests />} />
      </Route>
    </Routes>
  );
}

export default App;
