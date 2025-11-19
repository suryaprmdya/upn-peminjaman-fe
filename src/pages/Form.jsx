import React, { useEffect } from "react";
import {useForm} from "react-hook-form";
import Navbar from "../components/Navbar";
import Header from "../components/Form/Header";
import BtnBack from "../components/BtnBack";
import JudulSection from "../components/Form/JudulSection";
import InputLabel from "../components/Form/InputLabel";
import FormInput from "../components/Form/FormInput";
import Logo from "../../public/logo/favicon.png"

export default function Form() {
  useEffect(() => {
      // Mengatur judul halaman
      document.title = "Form Peminjaman - Sistem Peminjaman";
  
      // Mengatur logo (favicon) halaman
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      // GANTI URL INI dengan URL logo Anda yang sebenarnya
      link.href = Logo ;
    }, []); 

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      financing: "",
      need: "",
      date: "",
      room_id: "",
      tor: null,
      cv_narasumber: null,
      surat_izin_ortu: null,
      wadek_iii: null,
      satpam: null,
      tendik: null,
      dosen: null,
      cs: null,
      wadek_ii: null,
    },
  });

  // Fungsi ketika submit
  const onSubmit = async (data) => {
    // 1. Buat instance FormData
    const formData = new FormData();

    // 2. Loop melalui semua data dari form (react-hook-form)
    for (const key in data) {
      const value = data[key];

      // 3. Cek jika value adalah FileList (dari input type="file")
      if (value instanceof FileList && value.length > 0) {
        // Ambil file pertama dari list dan tambahkan ke formData
        formData.append(key, value[0]);
      } else if (value !== null && !(value instanceof FileList)) {
        // Jika bukan file (teks, angka, dll), tambahkan langsung
        formData.append(key, value);
      }
    }

    // -- UNTUK DEBUGGING --
    // Anda bisa melihat isi dari FormData dengan cara ini:
    console.log("Mengirim data ke backend...");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    // ---------------------

    // try {
    //   // 4. Kirim FormData ke backend menggunakan fetch atau axios
    //   // Browser akan otomatis mengatur header 'Content-Type' ke 'multipart/form-data'
    //   const response = await fetch("/api/form-peminjaman", {
    //     method: "POST",
    //     body: formData,
    //     // JANGAN set header 'Content-Type' secara manual, browser akan melakukannya
    //   });

    //   if (!response.ok) {
    //     throw new Error("Gagal mengirimkan formulir.");
    //   }

    //   const result = await response.json();
    //   console.log("Sukses:", result);
    //   alert("Formulir berhasil dikirim!");
    //   reset(); // Reset form setelah berhasil submit
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Terjadi kesalahan saat mengirim formulir.");
    // }
  };

  return (
    <>
      <Navbar />
      <Header
        header={
          <div className="flex gap-4">
            <BtnBack />
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Pengajuan Peminjaman
            </h2>
          </div>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 md:mt-10 mb-20">
        {/* Start Section 1 */}
        <div className="mt-4 w-full lg:max-w-2xl lg:mx-auto rounded-lg overflow-hidden border border-gray-200 bg-white">
          <JudulSection value="Pinjam Ruangan" />
          <div className="flex flex-col gap-3 mt-4 mb-6 px-4">
            <InputLabel htmlFor="room" value="Pilih Ruangan" />
            <select
              id="room"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
              {...register("room_id", {required: "Ruangan wajib dipilih"})}>
              <option value="">-- Pilih Ruangan --</option>
              <option value="1">Kelas 1</option>
              <option value="2">Kelas 2</option>
            </select>
            {errors.room_id && (
              <span className="text-red-500 text-sm">
                {errors.room_id.message}
              </span>
            )}

            <div>
              <InputLabel htmlFor="date" value="Tanggal" />
              <FormInput
                type="date"
                id="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
                {...register("date", {required: "Tanggal wajib diisi"})}
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  {errors.date.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Start Section 2 */}
        <div className="mt-4 w-full lg:max-w-2xl lg:mx-auto rounded-lg overflow-hidden border border-gray-200 bg-white">
          <JudulSection value="Form Peminjaman" />
          <div className="flex flex-col gap-3 mt-4 mb-6 px-4">
            <div>
              <InputLabel htmlFor="nama_lengkap" value="Nama lengkap" />
              <FormInput
                id="nama_lengkap"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
                {...register("name", {required: "Nama wajib diisi"})}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <InputLabel htmlFor="email" value="Email" />
              <FormInput
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
                {...register("email", {required: "Email wajib diisi"})}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <InputLabel htmlFor="pihak_peminjam" value="Pihak Peminjam" />
              <FormInput
                id="pihak_peminjam"
                type="text"
                placeholder="HIMATIFA"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
                {...register("financing", {
                  required: "Pihak peminjam wajib diisi",
                })}
              />
              {errors.financing && (
                <span className="text-red-500 text-sm">
                  {errors.financing.message}
                </span>
              )}
            </div>

            <div>
              <InputLabel htmlFor="need" value="Keperluan" />
              <FormInput
                id="need"
                type="text"
                placeholder="SEMINAR"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
                {...register("need", {required: "Keperluan wajib diisi"})}
              />
              {errors.need && (
                <span className="text-red-500 text-sm">
                  {errors.need.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Start Section 3 */}
        <div className="mt-4 w-full lg:max-w-2xl lg:mx-auto rounded-lg overflow-hidden border border-gray-300 bg-white ">
          <JudulSection value="Dokumen Peminjaman" />
          <div className="flex flex-col gap-3 mt-4 mb-6 px-4">
            {/* TOR */}
            <div>
              <InputLabel htmlFor="tor">
                <p>
                  TOR <span className="text-red-600">*</span>
                </p>
              </InputLabel>

              <input
                id="tor"
                type="file"
                accept="application/pdf"
                className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                {...register("tor", {required: "TOR wajib diunggah"})}
              />

              {errors.tor && (
                <span className="text-red-500 text-sm">
                  {errors.tor.message}
                </span>
              )}
            </div>
            {/* Surat Izin Kegiatan Wadek III */}
            <div>
              <InputLabel htmlFor="wadek_iii">
                <p>
                  Surat Izin Kegiatan Wadek III{" "}
                  <span className="text-red-600">*</span>
                </p>
              </InputLabel>

              <input
              id="wadek_iii"
                type="file"
                accept="application/pdf"
                className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                {...register("wadek_iii", {
                  required: "Surat Izin Kegiatan Wadek III wajib diunggah",
                })}
              />

              {errors.wadek_iii && (
                <span className="text-red-500 text-sm">
                  {errors.wadek_iii.message}
                </span>
              )}
            </div>
            {/* Surat Izin Kegiatan Wadek II */}
            <div>
              <InputLabel htmlFor="wadek_ii">
                <p>
                  Surat Izin Kegiatan Wadek II{" "}
                  <span className="text-red-600">*</span>
                </p>
              </InputLabel>

              <input
              id="wadek_ii"
                type="file"
                accept="application/pdf"
                className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                {...register("wadek_ii", {
                  required: "Surat Izin Kegiatan Wadek II wajib diunggah",
                })}
              />

              {errors.wadek_ii && (
                <span className="text-red-500 text-sm">
                  {errors.wadek_ii.message}
                </span>
              )}
            </div>
            {/* Surat Pemohonan Tugas */}
            <div className="p-3 bg-orange-500/5 rounded-xl flex flex-col gap-3">
              <p className=" font-semibold text-black">Surat Pemohonan Tugas</p>{" "}
              {/* Dosen */}
              <div>
                <InputLabel htmlFor="dosen">
                  <p>
                    Dosen <span className="text-red-600">*</span>
                  </p>
                </InputLabel>

                <input
                id="dosen"
                  type="file"
                  accept="application/pdf"
                  className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                  {...register("dosen", {
                    required: "Surat Pemohonan Tugas Dosen wajib diunggah",
                  })}
                />

                {errors.dosen && (
                  <span className="text-red-500 text-sm">
                    {errors.dosen.message}
                  </span>
                )}
              </div>
              {/* Tendik */}
              <div>
                <InputLabel htmlFor="tendik">
                  <p>
                    Tendik <span className="text-red-600">*</span>
                  </p>
                </InputLabel>

                <input
                id="tendik"
                  type="file"
                  accept="application/pdf"
                  className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                  {...register("tendik", {
                    required: "Surat Pemohonan Tugas Tendik wajib diunggah",
                  })}
                />

                {errors.tendik && (
                  <span className="text-red-500 text-sm">
                    {errors.tendik.message}
                  </span>
                )}
              </div>
              {/* Satpam */}
              <div>
                <InputLabel htmlFor="satpam">
                  <p>
                    Satpam <span className="text-red-600">*</span>
                  </p>
                </InputLabel>

                <input
                id="satpam"
                  type="file"
                  accept="application/pdf"
                  className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                  {...register("satpam", {
                    required: "Surat Pemohonan Tugas Satpam wajib diunggah",
                  })}
                />

                {errors.satpam && (
                  <span className="text-red-500 text-sm">
                    {errors.satpam.message}
                  </span>
                )}
              </div>
              {/* CS */}
              <div>
                <InputLabel htmlFor="cs">
                  <p>
                    CS <span className="text-red-600">*</span>
                  </p>
                </InputLabel>

                <input
                id="cs"
                  type="file"
                  accept="application/pdf"
                  className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                  {...register("cs", {
                    required: "Surat Pemohonan Tugas CS wajib diunggah",
                  })}
                />

                {errors.cs && (
                  <span className="text-red-500 text-sm">
                    {errors.cs.message}
                  </span>
                )}
              </div>
            </div>
            {/* CV Narasumber */}
            <div>
              <InputLabel htmlFor="cv">
                <p>CV Narasumber (Optional)</p>
              </InputLabel>

              <input
              id="cv"
                type="file"
                accept="application/pdf"
                className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                {...register("cv")}
              />

              {errors.tor && (
                <span className="text-red-500 text-sm">
                  {errors.tor.message}
                </span>
              )}
            </div>
            {/* Surat Izin Ortu  */}
            <div>
              <InputLabel htmlFor="surat_izin_ortu">
                <p>Surat Izin Ortu (Optional)</p>
              </InputLabel>

              <input
              id="surat_izin_ortu"
                type="file"
                accept="application/pdf"
                className="text-black file:bg-transparent file:text-black file:font-bold border border-gray-400 mt-1 h-10 w-full rounded-md"
                {...register("surat_izin_ortu")}
              />

              {errors.tor && (
                <span className="text-red-500 text-sm">
                  {errors.tor.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Submit & Reset */}
        <div className="flex justify-end mt-6 lg:max-w-2xl lg:mx-auto">
          <button
            type="button"
            onClick={() => reset()}
            className="mr-4 px-4 py-2 bg-gray-300 text-black rounded-md shadow hover:bg-gray-400">
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600">
            {isSubmitting ? "Mengirim..." : "Kirim Pengajuan"}
          </button>
        </div>
      </form>
    </>
  );
}
