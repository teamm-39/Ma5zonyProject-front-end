import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <>
      <div className="w-100">
        <div className="side-bar d-flex w-100">
          <SideBar />
          <div className="w-100" style={{ backgroundColor: "var(--main-bg)" }}>
            <NavBar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
