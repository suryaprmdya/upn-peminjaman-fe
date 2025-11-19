import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Header";
import LayoutHeader from "../components/LayoutHeader";
import {
  BellIcon,
  BoxIcon,
  ChevronDownIcon,
  HistoryIcon,
  HomeIcon,
  MenuIcon,
} from "lucide-react";
import ApplicationLogo from "../components/ApplicationLogo";
import DropdownUser from "../components/Dashboard/DropdownUser";
import {data} from "react-router-dom";
import SummaryCard from "../components/Dashboard/SummaryCard";
import RecentBorrowingsTable from "../components/Dashboard/RecentBorrowingsTable";
import PopularFacilityCard from "../components/Dashboard/PopularFacilityCard";
import Sidebar from "../components/Dashboard/Sidebar";
// import Header from '../../components/Form/Header'

function DashboardUser() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [UserData, setUserData] = useState({});
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    // Buat fungsi async di dalam useEffect
    const fetchUserData = async () => {
      try {
        const {data} = await axios.get("https://upn-peminjaman-be.vercel.app/user/profile", {
          withCredentials: true,
        });
        setUserData(data.user);
      } catch (error) {
        // Jika error (misal: token tidak ada/invalid), backend akan kirim 401 atau 403
        console.error(
          "Gagal mengambil data user:",
          error.response ? error.response.data.message : error.message
        );
        // Kembalikan null agar komponen tahu terjadi kegagalan
        return null;
      }
    };

    fetchUserData();
  }, []); // [] = jalankan sekali saat komponen mount

  if (!UserData) {
    // Ini seharusnya tidak tampil lama karena sudah di-redirect
    <div>Gagal memuat data. Silakan login kembali.</div>;
  }

  const facilities = [
    {
      name: "Ruang Rapat Cendrawasih",
      category: "Ruangan",
      image: "https://placehold.co/600x400/F97316/FFFFFF?text=Ruang+Rapat",
    },
    {
      name: "Kamera Sony A7 III",
      category: "Peralatan",
      image: "https://placehold.co/600x400/4F46E5/FFFFFF?text=Kamera",
    },
    {
      name: "Proyektor InFocus 2134",
      category: "Peralatan",
      image: "https://placehold.co/600x400/10B981/FFFFFF?text=Proyektor",
    },
  ];

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <LayoutHeader>
          <Header>
            {/* Tombol Menu untuk Mobile */}
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex">
              <ApplicationLogo />
            </div>

            {/* Aksi Pengguna */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BellIcon className="w-6 h-6 text-gray-600 hover:text-orange-500 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-1 rounded-lg cursor-pointer hover:bg-gray-100">
                <img
                  src="https://placehold.co/40x40/f97316/white?text=S"
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-orange-500"
                />
                <div className="hidden md:block">
                  <p className="font-semibold text-sm text-gray-800">
                    {UserData.username}
                  </p>
                  <p className="text-xs text-gray-500">{UserData.npm}</p>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden md:block" />
                <DropdownUser isOpen={isDropdownOpen} />
              </div>
            </div>
          </Header>
        </LayoutHeader>

        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} />
          {isSidebarOpen && (
            <div
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/30 z-10 lg:hidden"></div>
          )}

          <main className="flex-1 p-4 sm:ml-64">
            <div className="p-6 lg:p-8">
              {/* Tombol Aksi Utama */}
              <div className="md:flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                  <BoxIcon className="w-5 h-5" />
                  <a href="/form">Ajukan Peminjaman Baru</a>
                </button>
              </div>
            </div>

            {/* Grid Kartu Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <SummaryCard
                title="Peminjaman Aktif"
                value="2"
                icon={<BoxIcon className="w-6 h-6 text-orange-800" />}
                color="bg-orange-100"
              />
              <SummaryCard
                title="Menunggu Persetujuan"
                value="1"
                icon={<HistoryIcon className="w-6 h-6 text-yellow-800" />}
                color="bg-yellow-100"
              />
              <SummaryCard
                title="Total Peminjaman"
                value="15"
                icon={<HomeIcon className="w-6 h-6 text-blue-800" />}
                color="bg-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RecentBorrowingsTable />
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-bold text-xl text-gray-800 mb-4">
                    Fasilitas Populer
                  </h3>
                  <div className="space-y-4">
                    {facilities.map((facility) => (
                      <PopularFacilityCard key={facility.name} {...facility} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardUser;
