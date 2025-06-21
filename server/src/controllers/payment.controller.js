import Payment from "../models/payment.model.js";
import Booking from "../models/Booking.model.js";

export const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userId.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    const payment = await Payment.create({
      bookingId,
      userId,
      amount: booking.totalAmount,
      status: "paid", // MOCKING real payment
      paymentMethod: "mock"
    });

    booking.status = "paid";
    await booking.save();

    res.status(201).json({ message: "Payment successful", payment });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ message: "Payment failed" });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("bookingId");
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
