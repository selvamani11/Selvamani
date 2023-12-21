import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieSearch from './components/MovieSearch/MovieSearch';

const App = () => {
  return (
    <MovieProvider>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
      </Routes>
    </MovieProvider>
  );
};

export default App;
