import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Navlink = ({ name, children, url, exact }) => {
  return (
    <li className="nav-item">
      <NavLink
        exact={exact}
        activeClassName="active"
        className={"nav-link"}
        to={url}
      >
        <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
          {children}
        </div>
        <span className="nav-link-text ms-1">{name}</span>
      </NavLink>
    </li>
  );
};
export default Navlink;
