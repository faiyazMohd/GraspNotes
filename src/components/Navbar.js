import React ,{useContext} from "react";
import { Link ,useLocation} from "react-router-dom";
import AlertContext from "../context/alerts/AlertContext";

function Navbar() {
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  let location = useLocation();
 const handleLogoutClick = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('userEmail')
  showAlert(true, "Logged Out Successffully");
 }
  React.useEffect(() => {
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          GraspNotes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link  ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link  ${location.pathname==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex" role="search">
          <Link className="btn btn-primary mx-2" role="button" to={"/signup"}>SignUp</Link>
          <Link className="btn btn-primary mx-2" role="button" to={"/login"}>Login</Link>
          </form>:<div className="d-flex"><p className="text-light mx-2 h6">Welcome <br/>{localStorage.getItem("userEmail")}</p><Link onClick={handleLogoutClick} className="btn btn-primary" role="button" to={"/login"}>Logout</Link></div>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
