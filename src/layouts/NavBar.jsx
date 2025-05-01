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
            <div className="dropdown">
              <div
                className="d-flex profile-box gap-2 align-items-center dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={
                    user.imgUrl
                      ? `${import.meta.env.VITE_PROFILE_IMGS}${user.imgUrl}`
                      : blankProfile
                  }
                  onError={(e) => (e.target.src = blankProfile)}
                  alt="profile pic"
                />
                <div className="profile-content d-flex flex-column justify-content-start">
                  <h6 className="m-0 p-0">{user?.name}</h6>
                </div>
              </div>
              <ul className="dropdown-menu">
                <li>
                  <div className="d-flex gap-3 align-items-center">
                    <img
                      src={
                        user.imgUrl
                          ? `${import.meta.env.VITE_PROFILE_IMGS}${user.imgUrl}`
                          : blankProfile
                      }
                      className="profile-pic-nav"
                      onError={(e) => (e.target.src = blankProfile)}
                      alt="profile pic"
                    />
                    <div className="d-flex flex-column text-end">
                      <span className="user-name">{user?.name}</span>
                      <span className="user-email">{user?.email}</span>
                    </div>
                    <div>
                      <span className="user-role-name">
                        {user.roleName == "admin" ? "مالك" : "موظف"}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
