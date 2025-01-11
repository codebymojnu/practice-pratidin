import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../hooks/useAuth";
import { loginValidationSchema } from "../../validationSchema/loginValidation";
import TextField from "../common/TextField";

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      console.log("Login response:", response?.data);

      if (response.status === 200) {
        const { user, tokens } = response?.data?.data;
        const { accessToken: authToken, refreshToken } = tokens;

        // সঠিকভাবে `authToken` সেট করা হচ্ছে
        setAuth({ user, authToken, refreshToken });
        setLoading(false);
        navigate("/"); // হোমপেজে রিডাইরেক্ট
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="ইউজারনেম অথবা ইমেইল অ্যাড্রেস দিন"
        type="email"
        id="email"
        placeholder="ইউজারনেম অথবা ইমেইল"
        register={register}
        error={errors.email}
      />
      <TextField
        label="আপনার পাসওয়ার্ড দিন"
        type="password"
        id="password"
        placeholder="পাসওয়ার্ড"
        register={register}
        error={errors.password}
      />
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          {...register("admin")}
          className="rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block">
          অ্যাডমিন হিসেবে লগইন
        </label>
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`w-full text-white  py-3 rounded-lg mb-2 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-primary hover:bg-violet-900"
        }`}
      >
        {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign In"}
      </button>
    </form>
  );
}
