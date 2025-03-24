import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Divider, Button } from "@mui/material";
import axios from "../utils/axiosInstance";

axios.defaults.withCredentials = true;

const ConsultantSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fullName = localStorage.getItem("fullName") || sessionStorage.getItem("fullName");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    const [averageRating, setAverageRating] = useState("N/A");

    useEffect(() => {
        axios.get(`/api/feedbacks/consultant-rating/${userId}`)
            .then(response => {
                setAverageRating(response.data[0].averageRating?.toFixed(1) || "N/A");
                console.log("Average rating:", response.data);
            })
            .catch(error => {
                console.error("Error fetching average rating:", error);
            });
    }, []);

    const handleLogout = () => {
        if (!window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) return;
        axios.post("/api/auth/logout")
            .then(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("roleName");
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("roleName");
                navigate("/dang-nhap");
            })
            .catch(error => {
                console.error("Đăng xuất thất bại:", error.response?.data?.message || error.message);
            });
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    padding: "10px",
                },
            }}
        >
            <Toolbar>
                <div
                    className="w-[120px] h-[120px] mx-auto bg-cover bg-center bg-no-repeat rounded-full"
                    style={{ backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/3135/3135715.png)`, }}
                />
            </Toolbar>
            <Typography variant="h6">
                <div className="text-center">
                    Chào mừng chuyên viên <br />
                    {fullName}
                </div>
                <div className="text-center text-sm text-gray-300">
                    ⭐ Đánh giá trung bình: {averageRating}
                </div>
            </Typography>
            <Divider sx={{ backgroundColor: "#4f6fb7" }} />

            <List>
                <NavLink to="/view-booked" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemButton selected={location.pathname === "/view-booked"}>
                        <ListItemText primary="Lịch làm việc" />
                    </ListItemButton>
                </NavLink>
            </List>

            <Button
                onClick={() => navigate("/change-password")}
                sx={{
                    position: "absolute",
                    bottom: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    backgroundColor: "#FFC107",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#FFA000",
                    },
                }}
            >
                Đổi mật khẩu
            </Button>

            <Button
                onClick={handleLogout}
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80%",
                    backgroundColor: "#FF5722",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#E64A19",
                    },
                }}
            >
                Đăng xuất
            </Button>
        </Drawer>
    );
};

export default ConsultantSidebar;
