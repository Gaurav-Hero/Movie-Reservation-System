import User from "../models/user.model.js";
import Booking from "../models/Booking.model.js";
import Payment from "../models/payment.model.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
  .populate("userId", "name email")
  .populate("movieId", "title") // only movie title if needed
  .populate("theaterId", "name address")
  .populate("showtimeId");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err); // 👈 this line will reveal the actual issue
    res.status(500).json({ message: "Error fetching bookings" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name email")
      .populate("bookingId");
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};
