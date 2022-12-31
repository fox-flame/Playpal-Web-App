import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Outlet, useNavigate } from "react-router-dom";
import Navlink from "../NavLink/navlink.component";
import { Link } from "react-router-dom";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
import { ToastContainer } from "react-toastify";
import { ReactComponent as HomeIcon } from "../../assets/icons/dashboard-ico.svg";
import { ReactComponent as GroundsIcon } from "../../assets/icons/grounds-ico.svg";
import { ReactComponent as CoachIcon } from "../../assets/icons/coaches-ico.svg";
import Footer from "../footer/footer.component";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  let navigate = useNavigate();
  return (
    <>
      <ToastContainer />
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <a
            className="navbar-brand m-0"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <img
              src={require("../../assets/img/logo-ct.png")}
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
            <span className="ms-1 font-weight-bold">PlayPal Ground MS</span>
          </a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            {currentUser == null ? (
              <>
                <Navlink name={"Login"} url={""} exact={true}>
                  <HomeIcon />
                </Navlink>
                <Navlink name={"Signup"} url={"/signup"}>
                  <HomeIcon />
                </Navlink>
              </>
            ) : (
              <>
                <Navlink name={"Dashboard"} url={""} exact={true}>
                  <HomeIcon />
                </Navlink>

                <Navlink name={"My Bookings"} url={"/requests"}>
                  <GroundsIcon />
                </Navlink>
                <Navlink name={"Booking Settings"} url={"/my-ground"}>
                  <CoachIcon />
                </Navlink>
                <Navlink name={"Settings"} url={"/settings"}>
                  <HomeIcon />
                </Navlink>
              </>
            )}
          </ul>
        </div>
      </aside>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {currentUser ? (
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            navbar-scroll="true"
          >
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                {/* <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                  <li className="breadcrumb-item text-sm">
                    <a className="opacity-5 text-dark" href="javascript:;">
                      Pages
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-sm text-dark active"
                    aria-current="page"
                  >
                    Grounds
                  </li>
                </ol> */}
                <h6 className="font-weight-bolder mb-0">
                  Welcome, {currentUser.displayName}
                </h6>
              </nav>
              <div
                className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                id="navbar"
              >
                <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                <ul className="navbar-nav  justify-content-end">
                  <li className="nav-item d-flex align-items-center">
                    <Link
                      className="nav-link text-body font-weight-bold px-0"
                      onClick={() =>
                        SignOutUser().then(() => {
                          navigate("/");
                        })
                      }
                    >
                      <i className="fa fa-user me-sm-1"></i>
                      <span className="d-sm-inline d-none">Logout</span>
                    </Link>
                  </li>
                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a
                      href="javascript:;"
                      className="nav-link text-body p-0"
                      id="iconNavbarSidenav"
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          ""
        )}
        <div className="container-fluid py-4">
          <Outlet />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Navbar;
