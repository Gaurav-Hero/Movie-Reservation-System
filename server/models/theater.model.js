import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    logo: {
      type: String, // Store image URL (uploaded via cloud storage like S3, Cloudinary)
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Relation to User who owns the theater (only admin can create theaters)
      required: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", // Relation to movies scheduled in this theater
      },
    ],
    shows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show", // Relation to all shows scheduled in this theater
      },
    ],
  },
  { timestamps: true }
);

const Theater = mongoose.model("Theater", theaterSchema);
export default Theater;
