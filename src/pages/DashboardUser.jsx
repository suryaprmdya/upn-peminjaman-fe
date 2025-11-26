import React, {useEffect} from "react";
import {BoxIcon, HistoryIcon, HomeIcon} from "lucide-react";
import SummaryCard from "../components/Dashboard/SummaryCard";
import RecentBorrowingsTable from "../components/Dashboard/RecentBorrowingsTable";
import PopularFacilityCard from "../components/Dashboard/PopularFacilityCard";
import Logo from "../../public/logo/favicon.png";
import {useNavigate} from "react-router-dom";

function DashboardUser() {
  const navigate = useNavigate();
  useEffect(() => {
    // Mengatur judul halaman
    document.title = "Dashboard User - Sistem Peminjaman";

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
      <div className="p-6 lg:p-8">
        {/* Tombol Aksi Utama */}
        <div className="md:flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <button
            onClick={() => navigate("/user/pengajuan")}
            className="flex gap-2 bg-orange-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300">
            <BoxIcon className="w-5 h-5" />
            <p>Ajukan Peminjaman Baru</p>
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

      <div className="lg:col-span-2">
        <RecentBorrowingsTable />
      </div>
    </>
  );
}

export default DashboardUser;
