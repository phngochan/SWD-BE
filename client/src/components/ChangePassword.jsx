import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert, IconButton, InputAdornment } from "@mui/material";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        CurrentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const roleName = localStorage.getItem("roleName") || sessionStorage.getItem("roleName");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (!passwordRegex.test(formData.newPassword)) {
            setError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
            return;
        }

        try {
            const response = await axios.post("/api/auth/change-password", {
                userId,
                currentPassword: formData.CurrentPassword,
                newPassword: formData.newPassword,
            });

            setSuccess(response.data.message);
            setTimeout(() => navigate(roleName === "Manager" ? "/staff-management" : "/dashboard"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password.");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 5,
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
                textAlign: "center",
            }}
        >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Change Password
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
                {["CurrentPassword", "newPassword", "confirmPassword"].map((field, index) => (
                    <TextField
                        key={field}
                        label={
                            field === "CurrentPassword"
                                ? "Current Password"
                                : field === "newPassword"
                                    ? "New Password"
                                    : "Confirm New Password"
                        }
                        type={
                            field === "CurrentPassword"
                                ? showCurrentPassword
                                    ? "text"
                                    : "password"
                                : field === "newPassword"
                                    ? showNewPassword
                                        ? "text"
                                        : "password"
                                    : showConfirmNewPassword
                                        ? "text"
                                        : "password"
                        }
                        name={field}
                        fullWidth
                        required
                        margin="normal"
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            if (field === "CurrentPassword") setShowCurrentPassword(!showCurrentPassword);
                                            if (field === "newPassword") setShowNewPassword(!showNewPassword);
                                            if (field === "confirmPassword") setShowConfirmNewPassword(!showConfirmNewPassword);
                                        }}
                                        edge="end"
                                    >
                                        {(field === "CurrentPassword" && showCurrentPassword) ||
                                            (field === "newPassword" && showNewPassword) ||
                                            (field === "confirmPassword" && showConfirmNewPassword) ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'primary.main' },
                                '&:hover fieldset': { borderColor: 'primary.dark' },
                                '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
                            },
                        }}
                    />
                ))}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}>
                    Update Password
                </Button>
            </form>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
                onClick={() => navigate(roleName === "Manager" ? "/staff-management" : "/dashboard")}
            >
                Back
            </Button>
        </Box>
    );
};

export default ChangePassword;