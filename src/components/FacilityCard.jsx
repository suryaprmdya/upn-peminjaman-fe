import React from "react";
// import { CheckCircle2Icon, ClockIcon, UsersIcon } from "./svgComponents";
import { CheckCircle2Icon, Clock3Icon, UsersIcon } from "lucide-react";

const FacilityCard = ({image, name, capacity, status}) => {
  const statusClass =
    status.toLowerCase() === "tersedia"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  const statusIcon =
    status.toLowerCase() === "tersedia" ? (
      <CheckCircle2Icon size={16} />
    ) : (
      <Clock3Icon size={16} />
    );

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg card-hover">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center text-gray-600 mb-4 space-x-2">
          <UsersIcon size={16} />
          <span>Kapasitas: {capacity} orang</span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full ${statusClass}`}>
            {statusIcon}
            {status}
          </span>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Detail & Pinjam &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
