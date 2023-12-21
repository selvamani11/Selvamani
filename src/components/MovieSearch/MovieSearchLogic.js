import { useState, useEffect } from 'react';
import axios from '../../axios/axios-instance';
import { useDispatch } from 'react-redux';
import { setMovies } from '../../redux/moviesSlice';

const MovieSearchLogic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const dispatch = useDispatch();

  const searchMovies = async () => {
    try {
      const response = await axios.get(`/api/movies/search?title=${searchTerm}`);
      const movieData = response.data;

      if (movieData.length === 0) {
        setSearchError('Movie not found');
    } else {
        dispatch(setMovies(movieData));
        setSearchError('');
      }
    } catch (error) {
      console.error('Error searching movies:', error.message);
      setSearchError('Error searching movies. Please try again later.');
    }
  };

  {/*useEffect(() => {
    // Fetch all movies when the component mounts
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get('/api/movies');
        dispatch(setMovies(response.data));
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchAllMovies();
  }, [dispatch]);*/}

  return { searchTerm, setSearchTerm, searchError, searchMovies };
};

export default MovieSearchLogic;