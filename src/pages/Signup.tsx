import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SignupForm } from "src/components/SignupForm";
import { useAuthStore } from "src/stores/authStore";
import type { SignupFormData } from "src/validation/auth";

export function Signup() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.registerUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        password: data.password,
      };

      registerUser(user);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen-header flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          Create Account
        </h1>
        <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base">
          Join us to book your perfect room
        </p>

        <SignupForm onSubmit={handleSignup} isLoading={isLoading} />

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm md:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
