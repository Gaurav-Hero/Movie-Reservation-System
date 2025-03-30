import mongoose from 'mongoose';
import Movie from '../services/movieService/movieModel.js';
import dotenv from 'dotenv';

dotenv.config();

const updateFeaturedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update the first 5 active movies to be featured
    const result = await Movie.updateMany(
      { isActive: true },
      { $set: { isFeatured: true } },
      { limit: 5 }
    );

    console.log(`Updated ${result.modifiedCount} movies as featured`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating featured movies:', error);
    process.exit(1);
  }
};

updateFeaturedMovies(); 