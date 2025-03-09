import { useQuery } from "@tanstack/react-query";
import { isLogedIn } from "./services/IsLogedin";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";

const PrivateRoute = () => {
  const navigate = useNavigate();

  const { data, isLoading , isFetching} = useQuery({
    queryKey: ["isLogedIn"],
    queryFn: isLogedIn,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if(!isLoading)
      if (data?.data === false) {
        navigate("/Login");
      }
    }, [data?.data, isLoading, navigate]);
    if (isLoading) return <AppLoadingSpinner isLoading={isFetching} />;


  return data?.data === true ? <Outlet /> : null;
};

export default PrivateRoute;