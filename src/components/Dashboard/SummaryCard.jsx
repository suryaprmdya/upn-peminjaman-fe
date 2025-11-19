import React from "react";

const SummaryCard = ({title, value, icon, color}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform duration-300 hover:scale-105">
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
