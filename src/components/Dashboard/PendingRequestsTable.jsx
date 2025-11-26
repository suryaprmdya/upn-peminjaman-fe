import {useEffect, useState} from "react";
import axios from "axios";
import {CheckCircleIcon, XCircleIcon} from "lucide-react";

const PendingRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const {data} = await axios.get(
          "https://upn-peminjaman-be.vercel.app/pengajuan",
          {withCredentials: true}
        );
        console.log(data);
        setRequests(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-bold text-xl text-gray-800 mb-4">
        Permintaan Menunggu Persetujuan
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-3 px-2">Mahasiswa</th>
              <th className="py-3 px-2">Fasilitas</th>
              <th className="py-3 px-2">Penyelenggara</th>
              <th className="py-3 px-2">Tanggal</th>
              <th className="py-3 px-2 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada permintaan menunggu
                </td>
              </tr>
            ) : (
              requests.map((item) => (
                <tr key={item._id} className="border-b border-gray-700 hover:bg-gray-50">
                  <td className="py-4 px-2 font-medium text-gray-700">
                    {item.user?.username || "Tanpa Nama"}
                  </td>

                  <td className="py-4 px-2 text-gray-600">
                    {item.facility?.name}
                  </td>

                  <td className="py-4 px-2 text-gray-600">
                    {item.organization}
                  </td>

                  <td className="py-4 px-2 text-gray-600">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-4 px-2 text-center space-x-2">
                    <button className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-500 hover:text-white transition">
                      <CheckCircleIcon className="w-4 h-4" />
                    </button>

                    <button className="bg-red-100 text-red-700 p-2 rounded-full hover:bg-red-500 hover:text-white transition">
                      <XCircleIcon className="w-4 h-4" />
                    </button>
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

export default PendingRequestsTable;
