import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";



export default function ServiceGuest() {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const chooseServiceRef = useRef(null);
    const [cart, setCart] = useState([]);
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    useEffect(() => {
        setCart(cartData);
    }, []);


    // Fetch data from the server
    useEffect(() => {
        axios
            .get("/api/services/") // Update with your actual backend API
            .then((response) => {
                setServices(response.data); // Assuming response.data is an array of service objects
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });
    }, []);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll to "Choose Your Service" section on mount
    useEffect(() => {
        if (chooseServiceRef.current) {
            chooseServiceRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
                window.scrollBy({ top: 1200, behavior: "smooth" }); // Tăng giá trị 'top' để cuộn xuống nhiều hơn
            }, 180); // Trì hoãn một chút để tránh nhảy cuộn
        }
    }, []);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChoose = (serviceId) => {
        navigate(`/dịch vụ/${serviceId}`);
    };

    return (
        <div className="main-container w-full h-auto bg-[#F5F5F5] relative overflow-hidden mx-auto my-0 -smooth ">
            <Navbar cart={cart} setCart={setCart} /> {/* Pass setCart to Navbar */}

            {/* Services Hero Section */}
            <div className="h-[500px] w-full flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: "url('/images/service.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}>
                <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Dịch vụ chăm sóc da</h1>
            </div>

            <div ref={chooseServiceRef} className="w-full max-w-[1800px] h-[48px] relative z-10 mt-[37.33px] mx-auto flex items-center justify-between">
                <div className="w-[300px] h-[1px] bg-[url(/images/line.png)] bg-cover bg-no-repeat flex-1" />

                <div className="flex-shrink-0 text-[40px] font-semibold leading-[48px] tracking-[-0.8px] text-center px-[80px] text-[#2B6A7C] pacifico-regular">
                    <span className="text-[50px]">C</span>
                    họn Dịch Vụ Của Bạn
                </div>

                <div className="w-[300px] h-[1px] bg-[url(/images/line.png)] bg-cover bg-no-repeat flex-1" />
            </div>

            {/* Service cards section */}
            <div className="mt-3 w-full px-4 flex justify-center ">
                <div className=" w-full max-w-[1200px] px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[60px] gap-y-[20px] mt-4 mb-[40px] mx-auto place-items-center">
                    {services.map((service) => (
                        <ServiceCard
                            key={service._id}
                            image={service.image}
                            name={service.name}
                            description={service.description}
                            price={service.price}
                            onChoose={() => handleChoose(service._id)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}