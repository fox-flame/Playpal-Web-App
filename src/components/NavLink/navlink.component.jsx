import {Link} from 'react-router-dom'

const NavLink = ({name,children,url,active})=>{
return (
    <li class="nav-item">
    <Link class={`nav-link ${active}`} to={url}>
      <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
        {children}
      </div>
      <span class="nav-link-text ms-1">{name}</span>
    </Link>
  </li>
)
}
export default NavLink;