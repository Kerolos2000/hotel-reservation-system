import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "src/validation/auth"

interface AuthFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
}

export function AuthForm({ onSubmit, isLoading = false }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base"
        />
        {errors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="••••••••"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base"
        />
        {errors.password && <p className="text-red-500 text-xs md:text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
      >
        {isLoading ? "Loading..." : "Sign In"}
      </button>
    </form>
  )
}
