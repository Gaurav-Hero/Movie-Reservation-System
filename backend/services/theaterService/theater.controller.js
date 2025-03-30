import Theater from "./theaterModel.js";

// Create a new theater
const createTheater = async (req, res) => {
  try {
    const theaterData = req.body;
    
    // Check if theater already exists in the location
    const existingTheater = await Theater.findOne({
      name: theaterData.name,
      'location.city': theaterData.location.city
    });

    if (existingTheater) {
      return res.status(400).json({
        message: "Theater with this name already exists in this city"
      });
    }

    const newTheater = await Theater.create(theaterData);
    res.status(201).json({
      message: "Theater created successfully",
      theater: newTheater
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all theaters
const getAllTheaters = async (req, res) => {
  try {
    const { city, isActive } = req.query;
    const filter = {};
    
    if (city) filter['location.city'] = city;
    if (isActive !== undefined) filter.isActive = isActive;

    const theaters = await Theater.find(filter);
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get theater by ID
const getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.json(theater);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update theater
const updateTheater = async (req, res) => {
  try {
    const { theaterId } = req.params;
    const updateData = req.body;

    const theater = await Theater.findByIdAndUpdate(
      theaterId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json({
      message: "Theater updated successfully",
      theater
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add/Update screen
const manageScreen = async (req, res) => {
  try {
    const { theaterId } = req.params;
    const screenData = req.body;

    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    // If screen exists, update it, otherwise add new
    const screenIndex = theater.screens.findIndex(
      screen => screen.name === screenData.name
    );

    if (screenIndex >= 0) {
      theater.screens[screenIndex] = {
        ...theater.screens[screenIndex].toObject(),
        ...screenData
      };
    } else {
      theater.screens.push(screenData);
    }

    await theater.save();
    res.json({
      message: "Screen managed successfully",
      theater
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage seats in a screen
const manageSeats = async (req, res) => {
  try {
    const { theaterId, screenName } = req.params;
    const { seats } = req.body;

    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    const screen = theater.screens.find(s => s.name === screenName);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    screen.seats = seats;
    await theater.save();

    res.json({
      message: "Seats managed successfully",
      screen
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available seats for a show
const getAvailableSeats = async (req, res) => {
  try {
    const { theaterId, screenName, showTime } = req.query;
    
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    const screen = theater.screens.find(s => s.name === screenName);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    // Get all active seats
    const availableSeats = screen.seats.filter(seat => seat.isActive);

    res.json(availableSeats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate theater
const deactivateTheater = async (req, res) => {
  try {
    const { theaterId } = req.params;
    
    const theater = await Theater.findByIdAndUpdate(
      theaterId,
      { isActive: false },
      { new: true }
    );

    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.json({
      message: "Theater deactivated successfully",
      theater
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  manageScreen,
  manageSeats,
  getAvailableSeats,
  deactivateTheater
};  
