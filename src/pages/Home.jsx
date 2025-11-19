import React, {useEffect, useState} from "react";
import Logo from "../../public/logo/favicon.png";
import Button from "../components/Button";
import Hero from "../components/Hero";
import Facilities from "../components/Facilities";
import Footer from "../components/Footer";
import HowToBook from "../components/HowToBook";
import Header from "../components/Header";
import {MenuIcon, XIcon} from "lucide-react";
import LayoutHeader from "../components/LayoutHeader";
import ApplicationLogo from "../components/ApplicationLogo";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Mengatur judul halaman
    document.title = "Sistem Peminjaman Fasilitas";

    // Mengatur logo (favicon) halaman
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    // GANTI URL INI dengan URL logo Anda yang sebenarnya
    link.href = Logo;
  }, []);

  const navLinks = [
    {href: "/", text: "Beranda"},
    {href: "/fasilitas", text: "Fasilitas"},
    {href: "/cara-pinjam", text: "Cara Pinjam"},
    {href: "/kontak", text: "Kontak"},
  ];

  return (
    <>
      <LayoutHeader>
        <Header>
          <ApplicationLogo/>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium cursor-pointer
">
                {link.text}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="/auth/login">
              <Button value={"Masuk"} className={"text-white cursor-pointer"} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none">
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </Header>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors font-medium py-2 text-center rounded-lg bg-gray-100">
                  {link.text}
                </a>
              ))}
              <a href="/auth/login">
                <Button value={"Masuk"} className={"text-white w-full"} />
              </a>
            </nav>
          </div>
        )}
      </LayoutHeader>
      <main>
        <Hero />
        <Facilities />
        <HowToBook />
      </main>
      <Footer />
    </>
  );
}

export default Home;
