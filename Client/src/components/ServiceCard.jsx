import { Link } from "react-router-dom";

export default function ServiceCard({ name, image }) {
    return (
        <div className="flex flex-col items-center">
            {/* Ảnh tròn với border trong suốt */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-transparent shadow-lg">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            
            {/* Tiêu đề dịch vụ */}
            <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-[#2B6A7C] capitalize">{name}</h3>
                <Link to={'/chon-chuyen-vien'}>
                    <button className="mt-4 px-6 py-2 bg-[#A7DFEC] text-[#2B6A7C] font-medium rounded-full hover:bg-[#2B6A7C] hover:text-white transition-all">
                        Chọn dịch vụ
                    </button>
                </Link>
            </div>
        </div>
    );
}
