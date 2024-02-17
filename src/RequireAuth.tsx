import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { getCookie } from "./helper";

export default function RequireAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  let accessToken: string | null | undefined = getCookie("accessToken");
  console.log(accessToken);

  if (accessToken == null) {
    return <Navigate to={"/login"} />;
  }
  const decodedJWT = jwtDecode<JwtPayload>(
    typeof accessToken == "string" ? accessToken : ""
  );
  const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

  return decodedJWT.exp != undefined &&
    currentTimeInSeconds < decodedJWT.exp ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
