import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full bg-[#E5F5F1] text-[#2B6A7C] py-10 px-2.5 mt-5" style={{ boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)" }}>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">Về Srinity</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Lịch sử hình thành</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Phát triển bền vững</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Nhiệm vụ của chúng tôi</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Lời khuyên cho da</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">Hỗ trợ</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Lời khuyên cho da</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Chính sách bảo mật</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Chính sách dịch vụ</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">Bí quyết chọn sản phẩm</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Toner pad</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Serum HA</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Serum</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">Chăm sóc khách hàng</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Chat vơi Srinity</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">1800 9999 23</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Hệ thống cửa hàng</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Câu hỏi thường gặp</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Chính sách dịch vụ</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Kết nối với chúng tôi</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="hover:text-[#000000]"><FaFacebook size={24} /></a>
                        <a href="#" className="hover:text-[#000000]"><FaInstagram size={24} /></a>
                        <a href="#" className="hover:text-[#000000]"><FaTwitter size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Chia cắt bằng đường line */}
            <div className="w-96 max-w-lg mx-auto min-h-px rounded-xl bg-[#395c74] my-8"></div>

            {/* Thông tin dưới cùng */}
            <div className="text-center mt-8 text-[#2B6A7C] text-sm">
                &copy; 2025 <span className="font-bold">Srinity</span>. Chính sách bảo mật | Điều khoản sử dụng
            </div>
        </div>


    )
}
