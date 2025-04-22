import { useQuery } from "@tanstack/react-query";
import { isLogedIn } from "./services/IsLogedin";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ToastContext } from "../../App";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const toast = useContext(ToastContext);

  const { data , isFetching,error,isError} = useQuery({
    queryKey: ["isLogedIn"],
    queryFn: isLogedIn,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    if (!isFetching && isError) {
      if (error.status === 401) {
        navigate("/Login");
        toast.current.show({
          severity: "error",
          summary: "فشل",
          detail: error.data.meesage || "حدث خطأ غير متوقع",
          life: 3000,
        });
      }
    }
  }, [navigate, error, isError, isFetching, toast]);

  return data?.data === true ? <Outlet /> : null;
};

export default PrivateRoute;