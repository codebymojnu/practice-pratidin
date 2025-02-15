import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../../hooks/useAuth";
export default function Header() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setAuth(null);
  }

  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/">
        <img src="./assets/logo.svg" className="h-7" />
      </Link>
      <div className="flex justify-end items-center">
        <div>
          {auth?.user ? (
            <button
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors font-jaro"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
        <Link to="/hsc-routine">Routine</Link>
      </div>
    </header>
  );
}
