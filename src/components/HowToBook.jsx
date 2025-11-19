import React from "react";
import { CalendarDaysIcon, ClipboardEditIcon, SearchIcon, SendIcon } from "lucide-react";

const HowToBook = () => {
  const steps = [
    {
      icon: "Search",
      title: "Cari Fasilitas",
      description:
        "Gunakan fitur pencarian untuk menemukan fasilitas yang Anda butuhkan.",
    },
    {
      icon: "CalendarDays",
      title: "Pilih Jadwal",
      description:
        "Lihat ketersediaan dan pilih tanggal serta waktu peminjaman.",
    },
    {
      icon: "ClipboardEdit",
      title: "Isi Formulir",
      description:
        "Lengkapi formulir pengajuan peminjaman dengan data yang valid.",
    },
    {
      icon: "Send",
      title: "Ajukan & Tunggu",
      description:
        "Kirim pengajuan Anda dan tunggu notifikasi konfirmasi dari kami.",
    },
  ];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "Search":
        return <SearchIcon size={32} />;
      case "CalendarDays":
        return <CalendarDaysIcon size={32} />;
      case "ClipboardEdit":
        return <ClipboardEditIcon size={32} />;
      case "Send":
        return <SendIcon size={32} />;
      default:
        return null;
    }
  };

  return (
    <section id="cara-pinjam" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Langkah Mudah Peminjaman
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Hanya butuh beberapa langkah untuk dapat menggunakan fasilitas kami.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-primary rounded-full mx-auto mb-4">
                {renderIcon(step.icon)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowToBook;
