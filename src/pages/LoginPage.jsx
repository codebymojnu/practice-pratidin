import { Link } from "react-router-dom";
import LoginForm from "./../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
          <div className="text-white">
            <img
              src="./assets/Saly-1.png"
              alt="Illustration"
              className="mx-auto"
            />

            <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
            <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
            <p className="mb-8">
              Logging in unlocks your personal progress tracker, letting you
              evaluate your performance and see how you stack up against others.
              Whether you're preparing for exams, improving your knowledge, or
              simply having fun, there's no better way to sharpen your mind.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
              <span>Welcome to</span>
              <img src="./assets/logo.svg" className="h-7" />
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg text-sm mb-4">
              <p className="text-gray-600 font-medium">For Testing Purpose:</p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> testuser@gmail.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Password:</span> Test0172
              </p>
            </div>
            <LoginForm />
            <div className="text-center">
              <Link to="/forget-password" className="text-primary">
                Forgot Password
              </Link>
            </div>

            <div className="mt-8">
              <p className="text-center">
                No Account ?{" "}
                <Link to="/registration" className="text-primary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
