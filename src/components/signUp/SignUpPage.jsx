import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import API from "../Api/axios.js";
import { useState } from "react";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setApiError("");

    try {
      await API.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/loginPage");
    } catch (error) {
      setApiError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-sm">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <Logo />
        </div>

        <p className="text-sm text-gray-500 text-center mb-6">
          Join and start shopping
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Backend Error */}
          {apiError && (
            <p className="text-red-500 text-sm text-center">{apiError}</p>
          )}

          {/* Name */}
          <div>
            <input
              placeholder="Full Name"
              className="input"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              {...register("confirmPassword", {
                required: "Confirm password required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/loginPage" className="font-medium text-gray-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export { SignUpPage };
