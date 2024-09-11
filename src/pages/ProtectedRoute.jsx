import { useEffect } from "react";
import { useAuthProvider } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthe } = useAuthProvider();
  useEffect(
    function () {
      if (!isAuthe) navigate("/");
    },
    [isAuthe, navigate]
  );
  return isAuthe ? children : null;
}

export default ProtectedRoute;
