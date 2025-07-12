import axios from "axios";

const API_URL = "http://localhost:4000/api/movies";

export const getAllMovies = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
