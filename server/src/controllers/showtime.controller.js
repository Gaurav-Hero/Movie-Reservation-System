import Showtime from '../models/showtime.model.js'

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

export const getShowtimeById = async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id);
        if (!showtime) return res.status(404).json({ error: 'showtime not found' });
        res.status(200).json(showtime);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving showtime' });
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
