import Ticket from "./ticketModel.js";
import QRCode from "qrcode";

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const ticketData = req.body;q

    // Check if seat is already booked for the show time
    const existingTicket = await Ticket.findOne({
      theaterId: ticketData.theaterId,
      screenName: ticketData.screenName,
      seatNumber: ticketData.seatNumber,
      showTime: new Date(ticketData.showTime),
      status: { $nin: ['cancelled', 'expired'] }
    });

    if (existingTicket) {
      return res.status(400).json({
        message: "This seat is already booked for the selected show time"
      });
    }

    // Generate QR code
    const qrData = JSON.stringify({
      ticketNumber: ticketData.ticketNumber,
      showTime: ticketData.showTime,
      seatNumber: ticketData.seatNumber
    });
    
    const qrCode = await QRCode.toDataURL(qrData);
    ticketData.qrCode = qrCode;

    const newTicket = await Ticket.create(ticketData);
    
    // Populate references for response
    const populatedTicket = await Ticket.findById(newTicket._id)
      .populate('movieId', 'title')
      .populate('theaterId', 'name location')
      .populate('userId', 'name email');

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: populatedTicket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ticket by ID or ticket number
const getTicket = async (req, res) => {
  try {
    const { identifier } = req.params; // Can be ticketId or ticketNumber
    
    const ticket = await Ticket.findOne({
      $or: [
        { _id: identifier },
        { ticketNumber: identifier }
      ]
    })
    .populate('movieId', 'title')
    .populate('theaterId', 'name location')
    .populate('userId', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's tickets
const getUserTickets = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    const filter = { userId };
    if (status) filter.status = status;

    const tickets = await Ticket.find(filter)
      .populate('movieId', 'title')
      .populate('theaterId', 'name location')
      .sort({ showTime: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel ticket
const cancelTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if show time hasn't passed and ticket is active
    if (new Date(ticket.showTime) < new Date()) {
      return res.status(400).json({ message: "Cannot cancel ticket for past show" });
    }

    if (ticket.status !== 'active') {
      return res.status(400).json({ message: `Ticket is already ${ticket.status}` });
    }

    ticket.status = 'cancelled';
    ticket.paymentStatus = 'refunded';
    await ticket.save();

    res.json({
      message: "Ticket cancelled successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Validate ticket (for theater staff)
const validateTicket = async (req, res) => {
  try {
    const { ticketNumber } = req.body;
    const ticket = await Ticket.findOne({ ticketNumber })
      .populate('movieId', 'title')
      .populate('theaterId', 'name');

    if (!ticket) {
      return res.status(404).json({ message: "Invalid ticket" });
    }

    if (ticket.status !== 'active') {
      return res.status(400).json({ 
        message: `Ticket is ${ticket.status}`,
        ticket
      });
    }

    if (ticket.paymentStatus !== 'completed') {
      return res.status(400).json({ 
        message: "Ticket payment is pending",
        ticket
      });
    }

    // Mark ticket as used
    ticket.status = 'used';
    await ticket.save();

    res.json({
      message: "Ticket validated successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { paymentStatus } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { paymentStatus },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Payment status updated successfully",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tickets for a show
const getShowTickets = async (req, res) => {
  try {
    const { movieId, theaterId, screenName, showTime } = req.query;
    
    const tickets = await Ticket.find({
      movieId,
      theaterId,
      screenName,
      showTime: new Date(showTime),
      status: { $ne: 'cancelled' }
    }).select('seatNumber status');

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createTicket,
  getTicket,
  getUserTickets,
  cancelTicket,
  validateTicket,
  updatePaymentStatus,
  getShowTickets
};
