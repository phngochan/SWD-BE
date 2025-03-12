const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Đăng nhập Manager
exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra Manager có tồn tại không
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Tạo token
    const token = jwt.sign({ managerId: manager._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const User = require('../models/User');
const Consultant = require('../models/Consultant');

// Get all users (Manager only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Update user role (Manager only)
exports.updateUserRole = async (req, res) => {
    try {
        const { roleName } = req.body;
        if (!["Customer", "Staff", "Consultant", "Manager"].includes(roleName)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { roleName }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User role updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role", error });
    }
};

// Delete user (Manager only)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // If the user is a consultant, delete their consultant profile too
        if (user.roleName === "Consultant") {
            await Consultant.findOneAndDelete({ user: user._id });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

// Approve consultant account
exports.approveConsultant = async (req, res) => {
    try {
        const consultant = await Consultant.findById(req.params.id).populate('user');
        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        consultant.user.verified = true;
        await consultant.user.save();

        res.json({ message: "Consultant approved successfully", consultant });
    } catch (error) {
        res.status(500).json({ message: "Error approving consultant", error });
    }
};
