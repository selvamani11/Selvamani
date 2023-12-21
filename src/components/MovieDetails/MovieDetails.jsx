import React from 'react';
import MovieDetailsLogic from './MovieDetailsLogic';

const MovieDetails = () => {
  const { movie, handleGoBack } = MovieDetailsLogic();

  return (
    <div>
      {movie ? (
        <section className="movie-section">
          <div className="movie-card">
            <figure>
              <img src={movie.poster} alt="" />
            </figure>
            <div>
              <br />
              <p className="title">{movie.title}</p>
              <br />
              <p>{movie.released}</p>
              <br />
              <p>{movie.genre}</p>
              <br />
              <p>{movie.imdbRating}/10</p>
              <br />
              <p>{movie.country}</p>
              <br />
  
              <button className="back-btn" onClick={handleGoBack}>
                Go Back
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
