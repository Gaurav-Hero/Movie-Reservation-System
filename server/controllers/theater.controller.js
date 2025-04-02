import Theater from "../models/theater.model.js";

export const createTheater = async (req, res) => {
  try {
    const { name, address, seatingCapacity, logo } = req.body;
    console.log("1 - Request received");

    // Debugging logs
    console.log("req.user:", req.user); // Check if user is set
    console.log("req.body:", req.body); // Check if request body is correct

    // Ensure user is authenticated
    if (!req.user) {
      console.log("User is undefined");
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Only admins can create a theater
    if (req.user.role !== "admin") {
      console.log("2 - User is not an admin");
      return res.status(403).json({ message: "Only admins can create theaters" });
    }

    console.log("3 - User is an admin, creating theater");

    const existingTheater = await Theater.findOne({ name: req.body.name });
    if (existingTheater) {
     return res.status(400).json({ message: "Theater name already exists!" });
    }


    const newTheater = new Theater({
      name,
      address,
      seatingCapacity,
      logo, // Stores the image URL directly
      owner: req.user._id, // Set theater owner to logged-in admin
    });

    console.log("4 - Saving theater to database");
    await newTheater.save();

    res.status(201).json({ message: "Theater created successfully", theater: newTheater });
  } catch (error) {
    console.error("Error creating theater:", error);
    res.status(500).json({ message: "Error creating theater", error: error.message });
  }
};


// Fetch theaters created by the logged-in admin
export const getTheaters = async (req, res) => {
  try {
    const adminId = req.user._id; // Get admin ID from the authenticated user (from JWT)
    
    // Fetch theaters where userId matches the logged-in admin's ID
    const theaters = await Theater.find({owner:adminId});

    res.status(200).json(theaters);
  } catch (error) {
    console.error("Error fetching theaters:", error);
    res.status(500).json({ message: "Error fetching theaters" });
  }
};

