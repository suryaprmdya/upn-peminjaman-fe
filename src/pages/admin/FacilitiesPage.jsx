import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  Loader2,
  Users,
  MapPin,
  ImageIcon,
} from "lucide-react";
import {useState, useEffect} from "react";
import axios from "axios";
import FacilityModal from "../../components/FacilityModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import toast, {Toaster} from "react-hot-toast";

const API_URL = "https://upn-peminjaman-be.vercel.app/facilities";
// const API_URL = "http://localhost:3000/facilities";

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentFacility, setCurrentFacility] = useState(null);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);

  // --- 1. FETCH DATA (READ) ---
  const fetchFacilities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      setFacilities(response.data);
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
    fetchFacilities();
  }, []);

  const handleOpenModal = (facility) => {
    setCurrentFacility(facility);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentFacility(null);
    setModalOpen(false);
  };

  // --- 2. CREATE ---
  const handleCreateFacility = async (facilityData) => {
    try {
      const config = {
        withCredentials: true,
      };

      // Hapus _id dari data sebelum create
      const {_id, ...dataToSend} = facilityData;
      await axios.post(API_URL, dataToSend, config);
      toast.success("Fasilitas berhasil ditambahkan!");

      await fetchFacilities();
      handleCloseModal();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Gagal menambahkan data";
      toast.error(`Gagal: ${errorMessage}`);
      console.error("Error creating data:", err);
    }
  };

  // --- 3. UPDATE ---
  const handleUpdateFacility = async (facilityData) => {
    try {
      const config = {
        withCredentials: true,
      };

      const id = facilityData._id;
      // Hapus _id dari data sebelum update
      const {_id, ...dataToSend} = facilityData;
      await axios.put(`${API_URL}/${id}`, dataToSend, config);
      toast.success("Fasilitas berhasil diupdate!");

      await fetchFacilities();
      handleCloseModal();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Gagal mengupdate data";
      toast.error(`Gagal: ${errorMessage}`);
      console.error("Error updating data:", err);
    }
  };

  // Handler untuk save (kombinasi create dan update)
  const handleSaveFacility = async (facilityData) => {
    if (currentFacility) {
      await handleUpdateFacility(facilityData);
    } else {
      await handleCreateFacility(facilityData);
    }
  };

  const handleOpenDeleteModal = (facility) => {
    setFacilityToDelete(facility);
    setConfirmModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setFacilityToDelete(null);
    setConfirmModalOpen(false);
  };

  // --- 4. DELETE ---
  const handleConfirmDelete = async () => {
    if (facilityToDelete) {
      try {
        // console.log(facilityToDelete._id);
        await axios.delete(`${API_URL}/${facilityToDelete._id}`, {
          withCredentials: true,
        });
        toast.success("Fasilitas berhasil dihapus!");
        await fetchFacilities();
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || "Gagal menghapus data";
        toast.error(`Gagal: ${errorMessage}`);
        console.error("Error deleting data:", err);
      }
    }
    handleCloseDeleteModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800 border-green-200";
      case "Dipinjam":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Perbaikan":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Toaster position="top-right" />
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="font-bold text-2xl text-gray-800">
            Manajemen Fasilitas
          </h3>
          <p className="text-gray-500 mt-1">
            Kelola ruangan dan peralatan kampus
          </p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="flex items-center space-x-2 bg-orange-500 text-white font-semibold py-2.5 px-5 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-0.5">
          <PlusIcon className="w-5 h-5" />
          <span>Tambah Fasilitas</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-sm">
          <p className="font-medium">Gagal memuat data</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            <span className="text-gray-500 font-medium">
              Memuat data fasilitas...
            </span>
          </div>
        </div>
      ) : (
        /* Card Grid View */
        <>
          {facilities.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Belum ada fasilitas
              </h3>
              <p className="text-gray-500 mt-1">
                Silakan tambahkan fasilitas baru.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {facilities.map((item) => (
                <div
                  key={item.id || item._id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                    {item.imageURL ? (
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/600x400?text=No+Image"; // Fallback image
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}

                    {/* Status Badge (Overlay) */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm border ${getStatusColor(
                          item.status || "Tersedia"
                        )}`}>
                        {item.status || "Tersedia"}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Category */}
                    <div className="text-xs font-semibold text-orange-500 tracking-wide uppercase mb-1">
                      {item.category || "Umum"}
                    </div>

                    {/* Title */}
                    <h4
                      className="font-bold text-lg text-gray-800 mb-2 line-clamp-1"
                      title={item.name}>
                      {item.name}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {item.description || "Tidak ada deskripsi tersedia."}
                    </p>

                    {/* Meta Info (Capacity) */}
                    <div className="flex items-center text-gray-500 text-sm mb-4 bg-gray-50 p-2 rounded-lg">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span>
                        Kapasitas:{" "}
                        <span className="font-medium text-gray-700">
                          {item.capacity || "-"}
                        </span>{" "}
                        Orang
                      </span>
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                      {/* <span className="text-xs text-gray-400">
                        ID: {item.id || item._id}
                      </span> */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                          title="Edit">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(item)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                          title="Hapus">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <FacilityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveFacility}
        facility={currentFacility}
      />

      {/* Modal Konfirmasi Hapus */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={
          facilityToDelete
            ? `Apakah Anda yakin ingin menghapus "${facilityToDelete.name}"?`
            : ""
        }
      />
    </div>
  );
};

export default FacilitiesPage;
