import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, required: true },
  }); 
  
const Show = mongoose.model("Show", showSchema);
export default Show;