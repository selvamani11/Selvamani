import React, { createContext, useState, useContext } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
