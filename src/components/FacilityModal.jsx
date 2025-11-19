import {useEffect, useState} from "react";
import axios from "axios"; // Pastikan axios sudah diinstall


const FacilityModal = ({isOpen, onClose, onSave, facility}) => {
  // GANTI DENGAN DATA CLOUDINARY ANDA
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  // console.log(CLOUD_NAME);

  const [formData, setFormData] = useState({
    name: "",
    category: "Ruangan",
    status: "Tersedia",
    description: "",
    capacity: "",
    imageURL: "",
  });

  // State khusus untuk file fisik yang dipilih user
  const [selectedFile, setSelectedFile] = useState(null);
  // State untuk preview sementara (agar user bisa lihat gambar sebelum diupload)
  const [previewImage, setPreviewImage] = useState("");
  // State loading saat upload
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (facility) {
      setFormData({
        name: facility.name || "",
        category: facility.category || "Ruangan",
        status: facility.status || "Tersedia",
        description: facility.description || "",
        capacity: facility.capacity || "",
        imageURL: facility.imageURL || "",
      });
      setPreviewImage(facility.imageURL || "");
      setSelectedFile(null);
    } else {
      setFormData({
        name: "",
        category: "Ruangan",
        status: "Tersedia",
        description: "",
        capacity: "",
        imageURL: "",
      });
      setPreviewImage("");
      setSelectedFile(null);
    }
  }, [facility, isOpen]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  // Handle saat user memilih file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Buat preview lokal agar user tahu gambar apa yang dipilih
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Mulai loading

    let finalImageURL = formData.imageURL;

    try {
      // 1. Jika user memilih file baru, upload ke Cloudinary
      if (selectedFile) {
        const formDataCloud = new FormData();
        formDataCloud.append("file", selectedFile);
        formDataCloud.append("upload_preset", UPLOAD_PRESET); // Preset Unsigned
        formDataCloud.append("cloud_name", CLOUD_NAME);

        // Endpoint API Cloudinary
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formDataCloud
        );

        // Ambil URL aman (https) dari respon Cloudinary
        finalImageURL = res.data.secure_url;
      }

      // 2. Susun data akhir untuk disimpan ke Database Anda
      const dataToSave = {
        ...formData,
        imageURL: finalImageURL, // URL pendek dari Cloudinary
        capacity: formData.capacity ? Number(formData.capacity) : 0,
        id: facility ? facility.id : undefined,
      };

      // 3. Simpan ke backend lokal via onSave parent
      onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Gagal upload gambar:", error);
      alert(
        "Gagal mengupload gambar ke Cloudinary. Cek koneksi atau konfigurasi."
      );
    } finally {
      setIsUploading(false); // Selesai loading
    }
  };

  if (!isOpen) return null;

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm overflow-y-auto overflow-x-hidden p-4">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {facility ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
            </h3>
            <button
              onClick={onClose}
              disabled={isUploading}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* Name */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Fasilitas
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 block w-full p-2.5"
                  placeholder="Contoh: Ruang Meeting A"
                  required
                />
              </div>

              {/* Category */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 block w-full p-2.5">
                  <option value="Ruangan">Ruangan</option>
                  <option value="Peralatan">Peralatan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Status */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 block w-full p-2.5">
                  <option value="Tersedia">Tersedia</option>
                  <option value="Dipinjam">Dipinjam</option>
                  <option value="Perbaikan">Perbaikan</option>
                </select>
              </div>

              {/* Capacity */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Kapasitas
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 block w-full p-2.5"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Image Upload (Cloudinary) */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload Gambar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: SVG, PNG, JPG or GIF.
                </p>

                {/* Preview */}
                {previewImage && (
                  <div className="mt-3 relative group w-fit">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Preview:
                    </p>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-40 w-auto object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    {/* Indikator jika ini gambar baru yang belum diupload */}
                    {selectedFile && (
                      <span className="absolute top-8 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Akan diupload
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500"
                  placeholder="Deskripsi fasilitas..."></textarea>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={isUploading}
                className={`text-white inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-orange-300 
                    ${
                      isUploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}>
                {isUploading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Mengupload...
                  </>
                ) : (
                  <>
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"></path>
                    </svg>
                    {facility ? "Simpan Perubahan" : "Tambah Fasilitas"}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="text-gray-900 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 hover:text-orange-700">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacilityModal;
