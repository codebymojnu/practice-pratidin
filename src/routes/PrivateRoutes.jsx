import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth?.user ? (
        <div className="container">
          <Header />
          <main className="mx-auto max-w-[1020px]">
            <div className="container">
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
