import React from "react";

const PopularFacilityCard = ({name, image, category}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover transform group-hover:scale-110 transition-transform duration-300"
      />
      <div className="p-4">
        <p className="text-xs text-orange-500 font-semibold">{category}</p>
        <h4 className="font-bold text-gray-800 mt-1">{name}</h4>
        <button className="w-full mt-4 bg-orange-100 text-orange-600 font-bold py-2 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition-colors duration-300">
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default PopularFacilityCard;
