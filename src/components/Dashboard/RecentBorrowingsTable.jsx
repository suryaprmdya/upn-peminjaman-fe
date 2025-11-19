import React from "react";

const RecentBorrowingsTable = () => {
  const borrowings = [
    {
      id: 1,
      facility: "Ruang Diskusi Alpha",
      date: "12 Okt 2025",
      status: "Disetujui",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      facility: "Proyektor Epson EB-X500",
      date: "11 Okt 2025",
      status: "Menunggu",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 3,
      facility: "Kamera DSLR Canon 80D",
      date: "10 Okt 2025",
      status: "Selesai",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 4,
      facility: "Laboratorium Komputer",
      date: "08 Okt 2025",
      status: "Ditolak",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-bold text-xl text-gray-800 mb-4">
        Peminjaman Terkini
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-3 px-2">Fasilitas</th>
              <th className="py-3 px-2">Tanggal</th>
              <th className="py-3 px-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((item) => (
              <tr
                key={item.id}
                className="border-b border-b-neutral-500 last:border-none hover:bg-gray-50">
                <td className="py-4 px-2 font-medium text-gray-700">
                  {item.facility}
                </td>
                <td className="py-4 px-2 text-gray-600">{item.date}</td>
                <td className="py-4 px-2 text-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${item.color}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBorrowingsTable;
