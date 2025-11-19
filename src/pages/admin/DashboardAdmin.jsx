import {BellIcon, BoxIcon, BuildingIcon, UsersIcon} from "lucide-react";
import SummaryCard from "../../components/Dashboard/SummaryCard";
import PendingRequestsTable from "../../components/Dashboard/PendingRequestsTable";
import BookingSchedule from "../../components/Dashboard/BookingSchedule";
import { useEffect } from "react";
import Logo from "../../../public/logo/favicon.png"
// import Header from '../../components/Form/Header'


function DashboardAdmin() {
  useEffect(() => {
    // Mengatur judul halaman
    document.title = "Dashboard Admin - Sistem Peminjaman";

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
  return (
    <>
      <main className="flex-1 p-4">
        <div className="p-6 lg:p-8">
          {/* Tombol Aksi Utama */}
          <div className="md:flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          </div>
        </div>

        {/* Grid Kartu Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Permintaan Menunggu"
            value="2"
            icon={<BellIcon className="w-6 h-6 text-orange-800" />}
            color="bg-orange-100"
          />
          <SummaryCard
            title="Peminjaman Aktif"
            value="12"
            icon={<BoxIcon className="w-6 h-6 text-blue-800" />}
            color="bg-blue-100"
          />
          <SummaryCard
            title="Total Fasilitas"
            value="78"
            icon={<BuildingIcon className="w-6 h-6 text-green-800" />}
            color="bg-green-100"
          />
          <SummaryCard
            title="Total Pengguna"
            value="320"
            icon={<UsersIcon className="w-6 h-6 text-indigo-800" />}
            color="bg-indigo-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PendingRequestsTable />
          </div>
          {/* Kolom Samping: Jadwal */}
          <div className="lg:col-span-1">
            <BookingSchedule />
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardAdmin;
