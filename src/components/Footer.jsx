import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="w-full bg-[#E5F5F1] text-[#2B6A7C] py-10 px-2.5 mt-5" style={{ boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)" }}>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
                <div>
                    <h3 className="text-lg font-bold">Let's Stay Social</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="hover:text-[#000000]"><FaFacebook size={24} /></a>
                        <a href="#" className="hover:text-[#000000]"><FaInstagram size={24} /></a>
                        <a href="#" className="hover:text-[#000000]"><FaTwitter size={24} /></a>
                    </div>
                </div>
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">About</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Our Story</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Mission</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Sustainability</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">Support</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Contact Us</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">FAQ</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Shipping & Returns</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#2B6A7C] text-lg font-bold">Legal</h3>
                    <ul className="mt-2 space-y-1">
                        <li><a href="#" className="text-[#2B6A7C] hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-[#2B6A7C] hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            {/* Chia cắt bằng đường line */}
            <div className="w-full max-w-lg mx-auto h-px bg-[#395c74] my-8"></div>

            {/* Thông tin dưới cùng */}
            <div className="text-center mt-8 text-[#2B6A7C] text-sm">
                &copy; 2025 <span className="font-bold">Srenity</span>. All rights reserved.
            </div>
        </div>


    )
}
