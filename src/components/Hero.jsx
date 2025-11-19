import React from "react";

function Hero() {
  return (
    <section
      id="beranda"
      className="text-white pt-32 pb-20 bg-[url('https://fasilkom.upnjatim.ac.id/wp-content/uploads/2024/10/Ruang-Seminar.jpeg')] bg-center bg-no-repeat bg-cover bg-gray-300 bg-blend-multiply">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Peminjaman Fasilitas Fakultas Menjadi Lebih Mudah
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Jelajahi, pilih, dan ajukan peminjaman ruang kelas, laboratorium, dan
          auditorium untuk kegiatan akademik Anda secara online.
        </p>
        <a
          href="#fasilitas"
          className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
          Lihat Fasilitas
        </a>
      </div>
    </section>
  );
}

export default Hero;
