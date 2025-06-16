import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    language: String,
    duration: Number, // in minutes like 156 min -> mtlb 2h 36min
    releaseDate: Date,
    posterUrl: String,
    genre: [String],
    createdAt: Date
    },{ timestamps: true })

const Movie = mongoose.model('Movie', movieSchema)
export default Movie;

