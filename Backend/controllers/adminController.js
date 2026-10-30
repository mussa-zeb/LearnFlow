import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        _id: admin._id,
        email: admin.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select("-password");
  res.json(admin);
};