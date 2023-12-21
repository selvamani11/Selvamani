import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieSearchLogic from './MovieSearchLogic';

const MovieSearch = () => {
  const { searchTerm, setSearchTerm, searchError, searchMovies } = MovieSearchLogic();
  const movies = useSelector((state) => state.movies);

  return (
    <div>
      <section className="search-section">
        <h2>Search your Favourite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="back-btn" onClick={searchMovies}>
              Search
            </button>
          </div>
        </form>
        <div className="card-error">
          <p>{searchError}</p>
        </div>
      </section>

      <section className="movie-page">
        <div className="container grid grid-4-col">
          {movies.map((movie) => (
            <NavLink to={`movie/${movie.imdbID}`} key={movie.imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>{movie.title.length > 15 ? `${movie.title.slice(0, 15)}...` : movie.title}</h2>
                  <img src={movie.poster} alt={movie.imdbID} />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieSearch;
