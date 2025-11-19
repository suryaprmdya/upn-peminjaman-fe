import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Logo from "../../../public/logo/favicon.png";
import InputLabel from "../../components/Form/InputLabel";
import FormInput from "../../components/Form/FormInput";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      username: "",
      npm: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Digunakan untuk validasi konfirmasi password
  const password = useRef({});
  password.current = watch("password", "");

  // Mengubah judul dan logo dokumen saat komponen dimuat
  useEffect(() => {
    // Mengatur judul halaman
    document.title = "Halaman Registrasi - Sistem Peminjaman";

    // Mengatur logo (favicon) halaman
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = Logo;
  }, []); // Array kosong berarti efek ini hanya berjalan sekali

  /**
   * Fungsi untuk menangani submit registrasi.
   */
  const onSubmit = async (userData) => {
    setIsLoading(true); // 🚀 Mulai loading
    setError(null); // Bersihkan error sebelumnya

    console.log("Data Registrasi:", userData);

    try {
      const {data} = await axios.post(
        "http://localhost:3000/auth/register",
        userData
      );

      console.log(data.message);
      alert(`✅ Registrasi berhasil untuk mahasiswa: ${data.username}!`);
      navigate("/auth/login")
    } catch (err) {
      console.error("Terjadi kesalahan saat registrasi:", err);
      const errorMessage = err.response
        ? err.response.data.message
        : "Tidak dapat terhubung ke server.";
      setError(errorMessage); // Simpan pesan error
      alert(`❌ Registrasi gagal: ${errorMessage}`);
    } finally {
      setIsLoading(false); // 🛑 Hentikan loading, baik berhasil maupun gagal
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 space-y-6">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Buat Akun Mahasiswa
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Isi formulir untuk mendaftar
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Nama Lengkap */}
              <div>
                <InputLabel htmlFor="username" value="Nama Lengkap" />
                <FormInput
                  id="username"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
                  {...register("username", {
                    required: "Nama lengkap wajib diisi",
                  })}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* NIM */}
              <div>
                <InputLabel htmlFor="npm" value="NPM" />
                <FormInput
                  id="npm"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
                  {...register("npm", {required: "NPM wajib diisi"})}
                />
                {errors.studentId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.studentId.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <InputLabel htmlFor="email" value="Alamat Email" />
                <FormInput
                  id="email"
                  type="email"
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

              {/* Password */}
              <div>
                <InputLabel htmlFor="password" value="Password" />
                <FormInput
                  id="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
                  {...register("password", {
                    required: "Password wajib diisi",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Konfirmasi Password */}
              <div>
                <InputLabel
                  htmlFor="confirmPassword"
                  value="Konfirmasi Password"
                />
                <FormInput
                  id="confirmPassword"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
                  {...register("confirmPassword", {
                    required: "Konfirmasi password wajib diisi",
                    validate: (value) =>
                      value === password.current || "Password tidak cocok",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  value={isSubmitting ? "Memproses..." : "Daftar"}
                  className={"text-white w-full"}
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
              </div>

              <div className="text-center text-sm">
                <p className="text-gray-600">
                  Sudah punya akun?{" "}
                  <a
                    href="/auth/login"
                    className="font-medium text-orange-700 hover:text-primary">
                    Masuk di sini
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
