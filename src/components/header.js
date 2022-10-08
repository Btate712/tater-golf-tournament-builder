import { Link, Outlet } from 'react-router-dom';
export const SiteTemplateHeader = ({ user, logoutHandler }) => {

  const adminLinks = () => {
    if (user?.admin) {
      return (
        <Link className="nav-link" to="/admin">Admin</Link>
      )
    }
  } 

  const loginOrLogout = () => {
    if(user?.loggedIn) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          {adminLinks()}
          <li className="nav-item">
            <Link className="nav-link" to="/tournaments">Tournaments</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={ logoutHandler } to="/home" >Log Out</Link>
          </li>
        </>
      )
    } else {
      return (
        <></>
      )
    }
  }

  return(
    <div>
      <nav className="navbar navbar-expand-sm">
        <ul className="navbar-nav">
          {loginOrLogout()}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}