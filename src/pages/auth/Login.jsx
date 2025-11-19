import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Logo from "../../../public/logo/favicon.png";
import ApplicationLogo from "../../components/ApplicationLogo";
import InputLabel from "../../components/Form/InputLabel";
import FormInput from "../../components/Form/FormInput";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Mengatur judul halaman
    document.title = "Halaman Login - Sistem Peminjaman";

    // Mengatur logo (favicon) halaman
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    // GANTI URL INI dengan URL logo Anda yang sebenarnya
    link.href = Logo;
  }, []);
  /**
   * Fungsi untuk menangani submit login.
   */
  const onSubmit = async (userData) => {

    try {
      const {data} = await axios.post(
        "https://upn-peminjaman-be.vercel.app/auth/login",
        userData,
        {
          withCredentials: true,
          headers: {"Content-Type": "application/json"},
        }
      );
      console.log(data);

      if (data.user.role == "admin") {
        return navigate("/admin/dashboard");
      }

      return navigate("/user/dashboard");
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.response.data);
      // console.log(errorMsg.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <Navbar /> */}
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 space-y-6">
            <div className="flex justify-center">
              <ApplicationLogo />
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div>
                <InputLabel htmlFor="email" value="Alamat Email" />
                <FormInput
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
                  {...register("email", {
                    required: "Alamat email wajib diisi",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Format email tidak valid",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <InputLabel htmlFor="password" value="Password" />
                <FormInput
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
                  {...register("password", {required: "Password wajib diisi"})}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-orange-700 hover:text-primary">
                    Lupa password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={"text-white w-full"}
                  value={isSubmitting ? "Memproses..." : "Masuk"}
                />
              </div>

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Belum punya akun?{" "}
                  <a
                    href="/auth/register"
                    className="font-medium text-orange-700 hover:text-primary">
                    Daftar di sini
                  </a>
                </p>
              </div>

              <div
                id="error-notification"
                className={`${
                  isError
                    ? "w-full p-4 text-white bg-red-500 rounded-md mt-4"
                    : "hidden"
                }`}>
                {errorMsg.message}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
