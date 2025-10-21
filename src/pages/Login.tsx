import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthForm } from "src/components";
import { useAuthStore } from "src/hooks/stores";
import type { LoginFormData } from "src/validation";

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const success = login(data.email, data.password);
      if (success) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Please sign up first.");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen-header flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base">
          Sign in to your account
        </p>

        <AuthForm onSubmit={handleLogin} isLoading={isLoading} />

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
          <p className="text-xs md:text-sm text-gray-600">
            <strong>Demo credentials:</strong>
            <br />
            Email: demo@example.com
            <br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}
