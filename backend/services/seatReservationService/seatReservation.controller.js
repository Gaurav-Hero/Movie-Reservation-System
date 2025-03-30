import SeatReservation from "./seatModel.js";

// Create a new seat reservation
const createReservation = async (req, res) => {
  try {
    const {
      movieId,
      userId,
      theaterId,
      seatNumber,
      showTime,
      price
    } = req.body;

    // Check if all required fields are present
    if (!movieId || !userId || !theaterId || !seatNumber || !showTime || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if seat is already booked
    const existingReservation = await SeatReservation.findOne({
      theaterId,
      seatNumber,
      showTime: new Date(showTime),
      status: { $ne: 'cancelled' }
    });

    if (existingReservation) {
      return res.status(400).json({ message: "Seat already reserved for this show time" });
    }

    const newReservation = await SeatReservation.create({
      movieId,
      userId,
      theaterId,
      seatNumber,
      showTime: new Date(showTime),
      price
    });

    res.status(201).json({
      message: "Seat reserved successfully",
      reservation: newReservation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations for a user
const getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await SeatReservation.find({ userId })
      .populate('movieId', 'title')
      .populate('theaterId', 'name')
      .sort({ showTime: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations for a movie showing
const getShowReservations = async (req, res) => {
  try {
    const { movieId, theaterId, showTime } = req.query;
    const reservations = await SeatReservation.find({
      movieId,
      theaterId,
      showTime: new Date(showTime),
      status: { $ne: 'cancelled' }
    });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel reservation
const cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await SeatReservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Check if show time hasn't passed
    if (new Date(reservation.showTime) < new Date()) {
      return res.status(400).json({ message: "Cannot cancel past reservations" });
    }

    reservation.status = 'cancelled';
    reservation.paymentStatus = 'refunded';
    await reservation.save();

    res.json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { paymentStatus } = req.body;

    const reservation = await SeatReservation.findByIdAndUpdate(
      reservationId,
      { 
        paymentStatus,
        status: paymentStatus === 'completed' ? 'completed' : 'reserved'
      },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({
      message: "Payment status updated successfully",
      reservation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await SeatReservation.findById(reservationId)
      .populate('movieId', 'title')
      .populate('theaterId', 'name')
      .populate('userId', 'name email');

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createReservation,
  getUserReservations,
  getShowReservations,
  cancelReservation,
  updatePaymentStatus,
  getReservationById
};  
