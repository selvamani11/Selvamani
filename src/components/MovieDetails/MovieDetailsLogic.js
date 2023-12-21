import { useEffect, useState } from 'react';
import axios from '../../axios/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMovies } from '../../redux/moviesSlice';

const MovieDetailsLogic = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/movie/${imdbID}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieDetails();
  }, [imdbID, setMovie]);

  return { movie, handleGoBack };
};

export default MovieDetailsLogic;
