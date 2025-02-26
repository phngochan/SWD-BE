import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AdditionalProducts()  {
    const navigate = useNavigate();

    const handleYes = () => {
        // Logic for adding more products
        alert("Redirecting to skincare products page...");
        // navigate to skincare products page
    };

    const handleNo = () => {
        // Logic for not adding more products
        alert("Thank you for your booking!");
        navigate("/"); // Navigate to home page
    };

    return (
        <div className="bg-[#F8F4F2] min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-center text-xl font-semibold my-4">Would you like to add more skincare products?</h2>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className="bg-[#A7DFEC] text-white px-4 py-2 rounded-lg"
                        onClick={handleYes}
                        aria-label="Yes"
                    >
                        Yes
                    </button>
                    <button
                        className="text-gray-500"
                        onClick={handleNo}
                        aria-label="No"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
