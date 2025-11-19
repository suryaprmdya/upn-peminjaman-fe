import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data} = await axios.get(
          "https://upn-peminjaman-be.vercel.app/user/profile",
          {withCredentials: true}
        );

        setUser(data.user); // isi dari backend
      } catch (err) {
        setUser(false); // user tidak valid / cookie invalid
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat...</p>{" "}
      </div>
    );

  // Jika tidak login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika bukan admin
  if (user.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Jika admin -> izinkan akses
  return <Outlet />;
}
