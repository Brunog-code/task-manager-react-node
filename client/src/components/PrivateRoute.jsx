import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // se não tiver token, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children; // se tiver token, renderiza o componente
};

export default PrivateRoute;
