import {useEffect, useState} from "react";
import axios from "axios";

const RecentBorrowingsTable = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping warna status
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const res = await axios.get(
          "https://upn-peminjaman-be.vercel.app/pengajuan/saya",
          {withCredentials: true} // KIRIM COOKIE AGAR USER ID TERDETEKSI
        );

        setBorrowings(res.data);
      } catch (err) {
        console.error("Error fetching borrowings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">Memuat data peminjaman...</p>
      </div>
    );
  }

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
            {borrowings.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">
                  Tidak ada riwayat peminjaman.
                </td>
              </tr>
            ) : (
              borrowings.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-none hover:bg-gray-50">
                  <td className="py-4 px-2 font-medium text-gray-700">
                    {item.facility?.name || "Tidak diketahui"}
                  </td>

                  <td className="py-4 px-2 text-gray-600">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-4 px-2 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        statusColor[item.status] || "bg-gray-200 text-gray-700"
                      }`}>
                      {item.status?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBorrowingsTable;
