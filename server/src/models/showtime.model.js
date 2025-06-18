import mongoose from 'mongoose';

const showTimeSchema = new mongoose.Schema({
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theaterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

const Showtime = mongoose.model('Showtime', showTimeSchema);
export default Showtime;
