import axios from "axios";

export const getShowtimesByMovie = async (movieId) => {
  const res = await axios.get(`http://localhost:4000/api/showtime?movieId=${movieId}`);
  return res.data;
};
