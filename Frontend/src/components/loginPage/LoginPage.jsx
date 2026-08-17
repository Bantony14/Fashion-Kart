import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import API from "../../Api/axios.js";
import { useState } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const response = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/");
      window.location.reload(); // refresh header state
    } catch (error) {
      setApiError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl p-5 sm:p-8 shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Backend error */}
          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input w-full"
              {...register("email", {
                required: "Email required",
              })}
            />

            {errors.email && (
              <p className="error mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input w-full"
              {...register("password", {
                required: "Password required",
              })}
            />

            {errors.password && (
              <p className="error mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login */}
          <button
            type="submit"
            className="
            w-full
            bg-gray-900
            text-white
            py-2.5 sm:py-3
            rounded-lg
            font-medium
            text-sm sm:text-base
            hover:bg-gray-800
            transition
            cursor-pointer
          "
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signuppage"
            className="font-medium text-gray-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export { LoginPage };
