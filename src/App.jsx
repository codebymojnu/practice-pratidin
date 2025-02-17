import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Routine from "./components/routine/Routine";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import RegistrationPage from "./pages/RegistrationPage";
import ResultPage from "./pages/ResultPage";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Private Routes */}

            <Route element={<PrivateRoutes />}>
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Route>

            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hsc-routine" element={<Routine />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
