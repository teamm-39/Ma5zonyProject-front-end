import { useSelector } from "react-redux";
import "../assets/css/navbar.css";
import blankProfile from "../assets/imgs/blank-profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import logOut from "../services/logOut";
import { useContext } from "react";
import { ToastContext } from "../App";
function NavBar() {
  const user = useSelector((state) => state.user);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["log-out"],
    mutationFn: () => logOut(),
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "نجاح",
        detail: "تم تسجيل الخروج بنجاح",
        life: 3000,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    },
  });
  return (
    <>
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
                <li className="d-flex align-items-center gap-2 justify-content-between" style={{padding:"0 0.5rem 0.5rem 0.5rem"}}>
                  <div className="user-info d-flex gap-2 align-items-center">
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
                  </div>
                    <div >
                      <span className="user-role-name">
                        {user.roleName == "admin" ? "مالك" : "موظف"}
                      </span>
                    </div>
                </li>
                <li className="my-1 border-top">
                  <Link to={"/profile"} className="dropdown-item mt-1">
                    <i className="fa-solid fa-user"></i>
                    الملف الشخصى
                  </Link>
                </li>
                <li className="border-top">
                  <Link onClick={()=>mutate()} className="dropdown-item mt-1 user-log-out">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    تسجيل الخروج
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      </div>

    </>
  );
}

export default NavBar;
