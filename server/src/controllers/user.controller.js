import User from "../models/user.model.js";
import Booking from "../models/Booking.model.js";

// GET /users/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// PUT /users/profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// GET /users/bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("movieId")
      .populate("theaterId")
      .populate("showtimeId");

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
