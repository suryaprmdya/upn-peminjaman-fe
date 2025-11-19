import { FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, TwitterIcon } from "lucide-react";
import React from "react";
// import { FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, TwitterIcon } from "./svgComponents";

const Footer = () => (
  <footer id="kontak" className="bg-gray-800 text-white">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">FasilitasKita</h3>
          <p className="text-gray-400">
            Sistem informasi untuk mempermudah proses peminjaman fasilitas di
            lingkungan fakultas.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FacebookIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <InstagramIcon />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <TwitterIcon />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Beranda
              </a>
            </li>
            <li>
              <a href="#fasilitas" className="text-gray-400 hover:text-white">
                Fasilitas
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Login Staf
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPinIcon size={20} className="mt-1" />
              <span>
                Gedung Fakultas, Jl. Pendidikan No. 123, Kota Pelajar, Indonesia
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <MailIcon size={20} />
              <span>kontak@fakultas.ac.id</span>
            </li>
            <li className="flex items-center space-x-3">
              <PhoneIcon size={20} />
              <span>(021) 123-4567</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Jam Operasional Layanan
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Senin - Jumat: 08:00 - 16:00</li>
            <li>Sabtu: 08:00 - 12:00</li>
            <li>Minggu & Hari Libur: Tutup</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} FasilitasKita. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
