import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '1d18d1693dc23d7da6c1ce49f5e63a81';

export const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/movie/upcoming?api_key=${apiKey}`,
  );
  return response.data.results;
};

export const getPopularShows = async () => {
  const response = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  return response.data.results;
};


export const getHistoryMovies = async () => {
  const response = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=36`,
  );
  return response.data.results;
};

export const getMovie = async (id) => {
  const response = await axios.get(
    `${apiUrl}/movie/${id}?api_key=${apiKey}`,
  );
  return response.data;
};
