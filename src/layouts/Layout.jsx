import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useQuery } from "@tanstack/react-query";
import getUserProfile from "../services/getUserProfile";
import { useContext, useEffect } from "react";
import { ToastContext } from "../App";
import AppLoadingSpinner from "../components/AppLoadingSpinner";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userProfileSlice";
const Layout = () => {
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () => getUserProfile(),
    retry: false,
  });
  const toast = useContext(ToastContext);
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "فشل",
        detail: error?.message || "حدث خطأ غير متوقع",
        life: 3000,
      });
    }
  }, [isError, error, toast]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data?.data));
    }
  }, [data, dispatch])
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
      <AppLoadingSpinner isLoading={isFetching} />
    </>
  );
};

export default Layout;
