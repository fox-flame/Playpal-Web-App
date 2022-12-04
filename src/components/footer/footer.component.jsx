const Footer = () => {
  return (
    <footer className="footer pt-3  ">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              ©{new Date().getFullYear()}
              <i className="fa fa-heart"></i> by
              <a href="" className="font-weight-bold">
                {" "}
                PlayPal{" "}
              </a>
              &nbsp;&nbsp;Invite your Pal
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a href="" className="nav-link text-muted" target="_blank">
                  PlayPal
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link text-muted" target="_blank">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link text-muted" target="_blank">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link pe-0 text-muted" target="_blank">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
