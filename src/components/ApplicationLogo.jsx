import React from "react";
import Logo from "../../public/logo/logo.png";

export default function ApplicationLogo() {
  return (
    <a
      href="https://fasilkom.upnjatim.ac.id/"
      className="flex items-center">
      <img src={Logo} className="w-60" alt="Logo Fakultas Ilmu Komputer" />
    </a>
  );
}
