// import { Link } from "react-router-dom";
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";

// const experts = [
//     { name: "Dr. Emma Johnson", specialty: "Acne & Sensitive Skin", image: "/images/expert1.png" },
//     { name: "Lisa Wong", specialty: "Anti-aging & Hydration", image: "/images/expert2.png" },
//     { name: "Michael Tan", specialty: "Brightening & Hyperpigmentation", image: "/images/expert3.png" },
// ];

// export default function BookingTherapist() {
//     return (
        
//         <div className="min-h-screen bg-[#F5F5F5]">
//             <Navbar />
//             <div className="h-[500px] w-full flex items-center justify-center text-white text-center"
//                 style={{
//                     backgroundImage: "url('/images/service.png')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     backgroundAttachment: "fixed"
//                 }}>
//                 <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Sản phẩm chăm sóc da</h1>
//             </div>
//             <h1 className="text-4xl font-bold text-[#2B6A7C] text-center">Our Skincare Experts</h1>
//             <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
//                 {experts.map((expert, index) => (
//                     <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
//                         <img src={expert.image} alt={expert.name} className="mx-auto w-32 h-32 rounded-full mb-4" />
//                         <h3 className="text-xl font-semibold text-gray-800">{expert.name}</h3>
//                         <p className="text-gray-600 mt-2">{expert.specialty}</p>
//                         <Link to="/lich-hen">
//                             <button className="mt-4 px-6 py-2 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">
//                                 Chọn chuyên viên
//                             </button>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//             <Footer />
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "../../utils/axiosInstance";

export default function BookingTherapist() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [visibleNoteIndex, setVisibleNoteIndex] = useState(null);
  const [consultants, setConsultants] = useState([]);
  

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      const res = await axios.get("/api/consultants");
      setConsultants(res.data.map(c => ({
        ...c,
        note: c.note,
        image: c.image
      })));
    } catch (err) {
      toast.error("Failed to fetch consultants");
    }
  };

  const handleBookingNow = async (consultantId) => {
    localStorage.setItem("consultantId", consultantId);
    sessionStorage.setItem("consultantId", consultantId);
    localStorage.setItem("serviceUrl", `/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`);
    sessionStorage.setItem("serviceUrl", `/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`);
    navigate(`/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`);
    console.log("Navigating to:", `/services/${id}/chon-chuyen-vien/${consultantId}/lich-hen`);
  };

  return (
    <div className="main-container w-full h-auto bg-[#F5F5F5] relative overflow-hidden mx-auto my-0 font-['Lato']">
      <Navbar />
      <div className="w-full h-[97.333px] bg-[#A7DFEC] relative z-[2] flex items-center justify-center">

        <div className="flex items-center">
          <span className="text-[32px] font-bold leading-[32.01px] text-[#2B6A7C] text-center whitespace-nowrap z-[2]">
            Choose your consultant
          </span>
        </div>
      </div>
      <div className="w-full max-w-[1800px] h-auto relative z-[27] mt-[40px] mx-auto flex flex-col gap-5 px-4">
        <button
          onClick={() => navigate("/services")}
          className="mb-2 text-lg text-[#2B6A7C] hover:text-[#A7DFEC] self-start"
        >
          ← Back to Services
        </button>
        {consultants.map((consultant, index) => (
          <div key={consultant._id} className="flex flex-row items-start bg-white p-6 rounded-lg shadow-lg gap-5 mb-5">
            <div>
              {consultant.image ? <img src={consultant.image} alt="Consultant" className="w-[150px] h-[150px] bg-cover bg-center bg-no-repeat rounded-t-lg" /> : "No Image"}
            </div>
            <div className="flex flex-col items-start flex-1">
              <span className="text-[18px] font-semibold leading-[24px] text-[#000] tracking-[-0.8px]">
                {consultant.firstName} {consultant.lastName}
              </span>
              <span className="text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                {consultant.note}
              </span>

              {visibleNoteIndex === index && (
                <span className="mt-2 text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                  No additional notes available.
                </span>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  className="w-[120px] h-[36px] bg-[#A7DFEC] rounded-full border-solid border-[1px] flex items-center justify-center hover:bg-[#2B6A7C] transition duration-300"
                  onClick={() => handleViewMore(index)}
                >
                  <span className="text-[16px] font-bold leading-[20px] text-[#2B6A7C]">
                    {visibleNoteIndex === index ? "Hide" : "Xem thêm"}
                  </span>
                </button>
                <button
                  className="w-[120px] h-[36px] bg-[#A7DFEC] rounded-full border-solid border-[1px] flex items-center justify-center hover:bg-[#2B6A7C] transition duration-300"
                  onClick={() => handleBookingNow(consultant._id)}
                >
                  <span className="text-[16px] font-bold leading-[20px] text-[#2B6A7C]">
                    Đặt ngay
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* dat lich khi khach hang cho phep cua hang chon chuyen vien */}
      <div className="flex justify-center mt-8 mb-8">
        <button
          className="w-[220px] h-[50px] bg-[#A7DFEC] rounded-full border-solid border-[2px] border-[#2B6A7C] flex items-center justify-center hover:bg-[#2B6A7C] transition duration-300 shadow-lg"
          onClick={() => {
            localStorage.setItem("consultantId", null);
            localStorage.setItem("serviceUrl", `/services/${id}/chon-chuyen-vien/null/lich-hen`);
            navigate(`/services/${id}/chon-chuyen-vien/null/lich-hen`);
            console.log("Navigating to: ", `/services/${id}/chon-chuyen-vien/null/lich-hen`);
          }}
        >
          <span className="text-[20px] font-bold leading-[24px] text-[#2B6A7C]">
            Hãy để cho chúng tôi đặt cho bạn
          </span>
        </button>

      </div>
      <Footer />
    </div>
  );
}