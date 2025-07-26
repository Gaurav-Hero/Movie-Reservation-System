import Showtime from '../models/showtime.model.js'
import mongoose from 'mongoose'

export const addShowtime = async (req, res) => {
  try {
    console.log('Incoming Showtime Data:', req.body);
    const showtime = new Showtime(req.body);
    await showtime.save();
    res.status(201).json(showtime);
  } catch (err) {
    console.error('Error saving showtime:', err.message);
    res.status(500).json({ error: 'Failed to add showtime', msg: err.message });
  }
};

export const getAllShowtime = async (req, res) => {
    try {
        const showtime = await Showtime.find();
        res.status(200).json(showtime);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch showtime' });
    }
};

// GET  /api/showtime/movie/:movieId
export const getShowtimeById = async (req, res) => {
  try {
    const { movieId } = req.params;

    // (optional) quick check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    const showtimes = await Showtime.find({ movieID: movieId })
      .populate("theaterID", "name city") // remove or change as you wish
      .sort({ startTime: 1 });

    if (showtimes.length === 0) {
      return res.status(404).json({ error: "No showtimes found for this movie" });
    }

    res.status(200).json(showtimes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving showtimes" });
  }
};


export const updateShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showtime) return res.status(404).json({ error: 'showtime not found' });
    res.status(200).json(showtime);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update showtime' });
  }
};

export const deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ error: 'showtime not found' });
    res.status(200).json({ message: 'showtime deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete showtime' });
  }
};
