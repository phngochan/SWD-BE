import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Divider } from "@mui/material";

const ManagerSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Services", path: "/service-management" },
    { name: "Blogs", path: "/blog-management" },
    { name: "Questions", path: "/question-management" },
    { name: "Therapist", path: "/therapist-management" },
    { name: "Staff", path: "/quan-ly-nhan-vien" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#ffffff", // White background color
          color: "#333", // Darker text color for contrast
          padding: "10px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)", // Subtle shadow for depth
        },
      }}
    >
      {/* Thanh tiêu đề */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left", color: "#1976d2", fontWeight: "bold", fontSize: "1.5rem" }}>
          Manager
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: "#1976d2" }} /> {/* Divider color matching the title */}

      {/* Danh sách menu */}
      <List>
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e3f2fd", // Light blue background for selected item
                  color: "#1976d2", // Blue text color for selected item
                  borderRadius: "10px",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#bbdefb", // Darker blue on hover for selected item
                  borderRadius: "10px",
                },
                "&:hover": {
                  backgroundColor: "#f5f5f5", // Light gray background on hover
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default ManagerSidebar;
