import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginValidationSchema } from "../../validationSchema/loginValidation";
import TextField from "../common/TextField";

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      console.log("Login response:", response?.data);

      if (response.status === 200) {
        const { user, tokens } = response?.data?.data;
        const { accessToken, refreshToken } = tokens;

        // সঠিকভাবে `authToken` সেট করা হচ্ছে
        setAuth({ user, authToken: accessToken, refreshToken });
        navigate("/"); // হোমপেজে রিডাইরেক্ট
      }
    } catch (error) {
      console.error("Login error:", error.message);
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
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        সাইন ইন
      </button>
    </form>
  );
}
