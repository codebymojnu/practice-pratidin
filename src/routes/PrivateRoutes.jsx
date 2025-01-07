import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  const location = useLocation();

  // Determine if the current route is "/result"
  const isResultRoute = location.pathname === "/result";

  return (
    <>
      {auth?.user ? (
        <div className={`${!isResultRoute && "container"}`}>
          {/* Conditionally render Header */}
          {!isResultRoute && <Header />}
          <main className={`${isResultRoute ? "pt-0 pb-0" : "pt-4 pb-4"}`}>
            <div>
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
