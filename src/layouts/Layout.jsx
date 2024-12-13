import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="lay-out-content w-100 container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
