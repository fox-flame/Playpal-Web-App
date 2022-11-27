import { Outlet } from "react-router-dom";
import NavLink from "../NavLink/navlink.component";
import { ToastContainer } from "react-toastify";
import { ReactComponent as HomeIcon } from "../../assets/icons/dashboard-ico.svg";
import { ReactComponent as GroundsIcon } from "../../assets/icons/grounds-ico.svg";
import Footer from "../footer/footer.component";

const Navbar = () => {
  return (
    <>
      <ToastContainer />
      <aside
        class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
        id="sidenav-main"
      >
        <div class="sidenav-header">
          <i
            class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <a
            class="navbar-brand m-0"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <img
              src={require("../../assets/img/logo-ct.png")}
              class="navbar-brand-img h-100"
              alt="main_logo"
            />
            <span class="ms-1 font-weight-bold">PlayPal Admin</span>
          </a>
        </div>
        <hr class="horizontal dark mt-0" />
        <div
          class="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul class="navbar-nav">
            <NavLink name={"Dashboard"} url={""} active={"active"}>
              <HomeIcon />
            </NavLink>
            <NavLink name={"Grounds Requests"} url={"/requests"}>
              <GroundsIcon />
            </NavLink>
          </ul>
        </div>
      </aside>
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <nav
          class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div class="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li class="breadcrumb-item text-sm">
                  <a class="opacity-5 text-dark" href="javascript:;">
                    Pages
                  </a>
                </li>
                <li
                  class="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Grounds
                </li>
              </ol>
              <h6 class="font-weight-bolder mb-0">Welcome, Syed Hamza Habib</h6>
            </nav>
            <div
              class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
              <ul class="navbar-nav  justify-content-end">
                <li class="nav-item d-flex align-items-center">
                  <a
                    href="javascript:;"
                    class="nav-link text-body font-weight-bold px-0"
                  >
                    <i class="fa fa-user me-sm-1"></i>
                    <span class="d-sm-inline d-none">Logout</span>
                  </a>
                </li>
                <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <a
                    href="javascript:;"
                    class="nav-link text-body p-0"
                    id="iconNavbarSidenav"
                  >
                    <div class="sidenav-toggler-inner">
                      <i class="sidenav-toggler-line"></i>
                      <i class="sidenav-toggler-line"></i>
                      <i class="sidenav-toggler-line"></i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div class="container-fluid py-4">
          <Outlet />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Navbar;
