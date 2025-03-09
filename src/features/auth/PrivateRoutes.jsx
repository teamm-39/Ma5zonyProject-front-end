import { useQuery } from "@tanstack/react-query";
import { isLogedIn } from "./services/IsLogedin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { data , isLoading } = useQuery({
    queryKey: ["isLogedIn"],
    queryFn: isLogedIn,
  })
  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setIsChecked(true);
      if (data?.data === false) {
        navigate("/Login", { replace: true });
      }
    }
  }, [data, isLoading, navigate]);
  if (isLoading || !isChecked) return <AppLoadingSpinner isLoading={true} />
  return data?.data ? children : null;
};

export default PrivateRoute;
