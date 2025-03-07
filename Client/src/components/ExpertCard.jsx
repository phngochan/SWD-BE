import React from "react";

const ExpertCard = ({ name, specialty, image }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src={image} alt={name} className="mx-auto w-32 h-32 rounded-full mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600 mt-2">{specialty}</p>
            {/* Nút đặt lịch hẹn */}
            <button className="mt-4 px-6 py-2 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">
                Xem chi tiết
            </button>
        </div>
    );
};

export default ExpertCard;
