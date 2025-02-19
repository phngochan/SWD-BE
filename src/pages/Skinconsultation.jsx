import { Link } from "react-router-dom";

const experts = [
    { name: "Dr. Emma Johnson", specialty: "Acne & Sensitive Skin", image: "/images/expert1.png" },
    { name: "Lisa Wong", specialty: "Anti-aging & Hydration", image: "/images/expert2.png" },
    { name: "Michael Tan", specialty: "Brightening & Hyperpigmentation", image: "/images/expert3.png" },
];

export default function SkincareConsultation() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] p-10">
            <h1 className="text-4xl font-bold text-[#2B6A7C] text-center">Our Skincare Experts</h1>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
                {experts.map((expert, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src={expert.image} alt={expert.name} className="mx-auto w-32 h-32 rounded-full mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">{expert.name}</h3>
                        <p className="text-gray-600 mt-2">{expert.specialty}</p>
                        <Link to="/lich-hen">
                            <button className="mt-4 px-6 py-2 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">
                                Book Consultation
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
