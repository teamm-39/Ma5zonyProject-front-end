import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function PrivateRoutesWrapper(prop) {
  const isLoggedIn = useSelector((state) => state.auth.isLogedIn);
  const navigate=useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [isLoggedIn, prop.child, navigate]);

  return prop.child;
}

export default PrivateRoutesWrapper;
