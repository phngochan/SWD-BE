import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import axios from "../utils/axiosInstance";

const StaffSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fullName =
    localStorage.getItem("fullName") || sessionStorage.getItem("fullName");

  const menuItems = [
    { name: "Yêu cầu đặt lịch", path: "/view-booking" },
    { name: "Xem đơn hàng", path: "/view-order" },
  ];

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    axios.post("/api/auth/logout")
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("roleName");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("roleName");
        navigate("/dang-nhap");
      })
      .catch(error => {
        console.error("Logout failed:", error.response?.data?.message || error.message);
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
          style={{
            backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/3135/3135715.png)`,
          }}
        />
      </Toolbar>

      <Typography variant="h6">
        <div className="text-center">
          Welcome Staff <br /> {fullName}
        </div>
      </Typography>

      <Divider sx={{ backgroundColor: "#4f6fb7" }} />

      {/* Danh sách menu */}
      <List>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton selected={location.pathname === item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>

      <Divider sx={{ backgroundColor: "#4f6fb7", marginY: 1 }} />

      {/* Change Password Button */}
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

export default StaffSidebar;
