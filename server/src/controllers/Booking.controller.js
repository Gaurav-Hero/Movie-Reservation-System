import Booking from "../models/Booking.model.js";
import Showtime from "../models/showtime.model.js"



export const createBooking = async (req, res) => {
  try {
    console.log("Create Booking Controller Envoked !")
    const userId = req.user.id;
    const { showtimeId, seats } = req.body;

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) return res.status(404).json({ message: "Showtime not found" });

    const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);

    const booking = await Booking.create({
      showtimeId,
      userId,
      movieId: showtime.movieID,     // ✅ pulled from showtime
      theaterId: showtime.theaterID, // ✅ pulled from showtime
      seats,
      totalAmount
    });
    console.log("Create Booking done !")
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId }).populate("showtimeId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("showtimeId")
      .populate("userId", "email"); // only return email
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
