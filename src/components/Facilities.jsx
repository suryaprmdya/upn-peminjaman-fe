import React, {useEffect, useState} from "react";
import FacilityCard from "./FacilityCard";
import axios from "axios";

const Facilities = () => {
  const [AllFacility, setAllFacility] = useState([]);

  useEffect(() => {
    getAllFacility();
  }, []);

  const getAllFacility = async () => {
    try {
      const {data} = await axios.get("http://localhost:3000/facilities");
      setAllFacility(data);
    } catch (error) {
      console.error(
        "Gagal mengambil data fasilitas:",
        error.response ? error.response.data.message : error.message
      );
      // Kembalikan null agar komponen tahu terjadi kegagalan
      return null;
    }
  };
  // const facilityData = [
  //   {
  //     id: 1,
  //     name: "Auditorium Utama",
  //     capacity: 500,
  //     status: "Tersedia",
  //     image: "https://placehold.co/400x300/3b82f6/FFFFFF?text=Auditorium",
  //   },
  //   {
  //     id: 2,
  //     name: "Laboratorium Komputer",
  //     capacity: 40,
  //     status: "Tersedia",
  //     image: "https://placehold.co/400x300/10b981/FFFFFF?text=Lab+Komputer",
  //   },
  //   {
  //     id: 3,
  //     name: "Ruang Rapat A",
  //     capacity: 25,
  //     status: "Dipinjam",
  //     image: "https://placehold.co/400x300/f59e0b/FFFFFF?text=Ruang+Rapat",
  //   },
  //   {
  //     id: 4,
  //     name: "Ruang Kelas 3.01",
  //     capacity: 60,
  //     status: "Tersedia",
  //     image: "https://placehold.co/400x300/8b5cf6/FFFFFF?text=Ruang+Kelas",
  //   },
  //   {
  //     id: 5,
  //     name: "Studio Fotografi",
  //     capacity: 15,
  //     status: "Tersedia",
  //     image: "https://placehold.co/400x300/ec4899/FFFFFF?text=Studio+Foto",
  //   },
  //   {
  //     id: 6,
  //     name: "Lapangan Olahraga",
  //     capacity: 100,
  //     status: "Dipinjam",
  //     image: "https://placehold.co/400x300/6366f1/FFFFFF?text=Lapangan",
  //   },
  // ];

  return (
    <section id="fasilitas" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Fasilitas Tersedia
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Pilih fasilitas yang sesuai dengan kebutuhan acara atau kegiatan
            akademik Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AllFacility.map((facility) => (
            <FacilityCard key={facility._id} {...facility} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
