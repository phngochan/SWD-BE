import { FaHandSparkles } from "react-icons/fa";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const services = [
    { name: "pro calm skin treatment", image: "/images/skincare1.png" },
    { name: "luxliftfacial", image: "/images/skincare2.png" },
    { name: "pro bright skin treatment", image: "/images/skincare3.png" },
    { name: "pro nanoinfusion", image: "/images/skincare1.png" },
    { name: "pro clear skin treatment", image: "/images/skincare2.png" },
    { name: "pro firm neck + skin treatment", image: "/images/skincare3.png" },
];

export default function Home() {
    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            {/* Header */}
            <Navbar />
            
            {/* Hero Section */}
            <div
                className="h-[500px] w-full flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: "url('/images/home.png')",
                    backgroundSize: "cover",  // Giúp ảnh bao phủ toàn bộ phần hero
                    backgroundPosition: "center",  // Căn giữa ảnh
                    backgroundRepeat: "no-repeat", // Không lặp lại ảnh
                    backgroundAttachment: "fixed"  // Cố định ảnh khi cuộn trang
                }}
            >
                <h1 className="text-6xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Welcome to SWD</h1>
            </div>

            {/* Body Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                {/* About Us */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#2B6A7C]">Welcome to SWD</h2>
                    <p className="mt-4 text-gray-600">
                        Discover a new world of skincare with our expert solutions tailored to your unique skin needs.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <FaHandSparkles className="text-2xl" />
                        <h2 className="text-2xl font-normal">----------------Top Services-------------------</h2>
                    </div>                </div>

                {/* Featured Services
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src="/images/service1.png" alt="Service 1" className="mx-auto mb-4 w-24 h-24" />
                        <h3 className="text-xl font-semibold text-gray-800">Personalized Skincare</h3>
                        <p className="text-gray-600 mt-2">Tailored skincare routines designed by experts just for you.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src="/images/service2.png" alt="Service 2" className="mx-auto mb-4 w-24 h-24" />
                        <h3 className="text-xl font-semibold text-gray-800">Natural Ingredients</h3>
                        <p className="text-gray-600 mt-2">We use only the finest natural ingredients in our products.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src="/images/service3.png" alt="Service 3" className="mx-auto mb-4 w-24 h-24" />
                        <h3 className="text-xl font-semibold text-gray-800">Expert Consultation</h3>
                        <p className="text-gray-600 mt-2">Get professional skincare advice to achieve your goals.</p>
                    </div>
                </div> */}
                {/* Services List */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#00000000]">
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold">{service.name}</h3>
                                <button className="mt-3 px-7 py-1 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">
                                    Chọn
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Customer Testimonials */}
                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-[#2B6A7C]">What Our Customers Say</h2>
                    <div className="mt-8 grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-700">"SWD completely changed my skincare routine! My skin has never felt better."</p>
                            <span className="block mt-4 text-sm font-semibold text-gray-800">- Emily R.</span>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-700">"I love their personalized approach. The products work wonders!"</p>
                            <span className="block mt-4 text-sm font-semibold text-gray-800">- Mark T.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* <footer className="bg-[#E5F5F1] text-[#2B6A7C] py-10">
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
                <div className="text-center mt-8 text-[#2B6A7C] text-sm">
                    &copy; 2025 SWD. All rights reserved.
                </div>
            </footer> */}
            <Footer />
        </div>
    );
}


