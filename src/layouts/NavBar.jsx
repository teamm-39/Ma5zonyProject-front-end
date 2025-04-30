import { useSelector } from "react-redux";
import "../assets/css/navbar.css";
import blankProfile from "../assets/imgs/blank-profile.png";

function NavBar() {
  const user = useSelector((state) => state.user);
  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg" style={{ height: "66px" }}>
        <div className="d-flex justify-content-end w-100">
          <div className="navbar-nav border-end pe-3 border-2 ps-4">
            <div className="d-flex profile-box gap-2 align-items-center">
              <img
                src={
                  user.imgUrl
                    ? `${import.meta.env.VITE_PROFILE_IMGS}${user.imgUrl}`
                    : blankProfile
                }
                onError={(e) => (e.target.src = blankProfile)}
                alt="profile pic"
              />
              <div className="profile-content d-flex flex-column">
                <h6 className="m-0 p-0">{user?.name}</h6>
                <span>{user?.roleName == "admin" ? "مالك" : "موظف"}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
