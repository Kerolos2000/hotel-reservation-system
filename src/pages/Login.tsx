import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AuthForm,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components";
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
    <div className="min-h-screen-header flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600 text-sm md:text-base">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <AuthForm onSubmit={handleLogin} isLoading={isLoading} />

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-neutral-600 hover:text-neutral-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-3 md:p-4 bg-neutral-50 rounded-lg text-xs md:text-sm text-gray-600">
            <strong>Demo credentials:</strong>
            <br />
            Email: demo@example.com
            <br />
            Password: password123
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
