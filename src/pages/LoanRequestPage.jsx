import axios from "axios";
import {CalendarIcon, CheckCircleIcon, ClockIcon, FileText, UserIcon} from "lucide-react";
import {useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";

const API_URL = "https://upn-peminjaman-be.vercel.app";

export default function LoanRequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [error, setError] = useState(null);
  // const [user, setUser] = useState(null);

  // State untuk form
  const [formData, setFormData] = useState({
    user: "",
    username: "",
    npm: "",
    phone: "",
    facility: "",
    date: "",
    startTime: "",
    endTime: "",
    eventName: "",
    organization: "",
    participant: "",
  });

  const fetchUserData = async () => {
    try {
      const {data} = await axios.get(`${API_URL}/user/profile`, {
        withCredentials: true,
      });
      // console.log(data);
      // setUser(data.user);

      // Auto-fill form dengan data user
      setFormData((prev) => ({
        ...prev,
        user: data.user._id || "",
        username: data.user.username || "",
        npm: data.user.npm || "",
        // phone: data.user.phone || "",
      }));
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const {data} = await axios.get(`${API_URL}/facilities`, {
        withCredentials: true,
      });

      setFacilitiesList(data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Gagal mengambil data";
      setError(errorMessage);
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchFacilities();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === "participant" && value < 0) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        user: formData.user,
        username: formData.username,
        npm: formData.npm,
        phone: formData.phone,
        facility: formData.facility,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        eventName: formData.eventName,
        organization: formData.organization,
        participant: formData.participant,
      };

      const response = await axios.post(`${API_URL}/pengajuan`, payload, {
        withCredentials: true,
      });

      console.log("Pengajuan berhasil:", response.data);
      toast.success("Pengajuan peminjaman berhasil dikirim!");

      setIsLoading(false);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error submit:", error);
      const errorMessage =
        error.response?.data?.message || "Gagal mengirim pengajuan";
      toast.error(`Gagal: ${errorMessage}`);
      setIsLoading(false);
    }
  };

  // Tampilan Sukses
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-xl shadow-lg mt-10">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircleIcon className="w-16 h-16 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Pengajuan Berhasil!
        </h2>
        <p className="text-gray-600 mb-8">
          Permintaan peminjaman fasilitas Anda telah kami terima. Silakan cek
          status peminjaman Anda secara berkala di halaman Dasboard atau Riwayat.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              username: "",
              npm: "",
              phone: "",
              facility: "",
              date: "",
              startTime: "",
              endTime: "",
              eventName: "",
              organization: "",
              participant: "",
            });
          }}
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow hover:bg-orange-600 transition duration-300">
          Ajukan Peminjaman Lain
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-6">
      <Toaster position="top-right" />
      <div className="bg-orange-500 p-6 text-white">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <FileText className="w-8 h-8" />
          Formulir Peminjaman Fasilitas
        </h1>
        <p className="mt-2 text-orange-100">
          Isi data di bawah ini untuk mengajukan peminjaman fasilitas fakultas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Bagian 1: Data Diri */}
        <div className="mb-8 border-b border-gray-500 pb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-orange-500" />
            Data Peminjam
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="username"
                disabled
                value={formData.username}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NPM
              </label>
              <input
                type="text"
                name="npm"
                disabled
                value={formData.npm}
                onChange={handleChange}
                placeholder="Contoh: 2101010001"
                className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Penyelenggara
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Contoh: Himpunan Mahasiswa Informatika"
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Bagian 2: Detail Peminjaman */}
        <div className="mb-8 border-b border-gray-500 pb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-orange-500" />
            Detail Peminjaman
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Fasilitas
              </label>
              <select
                name="facility"
                required
                value={formData.facility}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                <option value="">-- Pilih Fasilitas --</option>
                {facilitiesList.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Peminjaman
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" /> Jam Mulai
                </label>
                <input
                  type="time"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" /> Jam Selesai
                </label>
                <input
                  type="time"
                  name="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peserta
              </label>
              <input
                type="number"
                name="participant"
                required
                value={formData.participant}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Bagian 3: Keperluan */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            {/* <DocumentIcon className="w-5 h-5 text-orange-500" /> */}
            Deskripsi Kegiatan
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tujuan Peminjaman / Nama Kegiatan
            </label>
            <textarea
              name="eventName"
              required
              rows="4"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Jelaskan secara singkat kegiatan yang akan dilakukan..."
              className="w-full px-4 py-2 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
            <p className="text-xs text-gray-500 mt-1">
              *Pastikan kegiatan sesuai dengan peraturan penggunaan fasilitas
              kampus.
            </p>
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 flex justify-center items-center gap-2
                            ${
                              isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600"
                            }`}>
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </>
            ) : (
              "Kirim Pengajuan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
