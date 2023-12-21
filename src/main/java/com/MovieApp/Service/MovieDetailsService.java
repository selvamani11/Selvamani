package com.MovieApp.Service;

import com.MovieApp.Entity.MovieDetails;
import com.MovieApp.Repository.MovieDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieDetailsService {

    private final MovieDetailsRepository movieDetailsRepository;

    @Autowired
    public MovieDetailsService(MovieDetailsRepository movieDetailsRepository) {
        this.movieDetailsRepository = movieDetailsRepository;
    }

    public MovieDetails getMovieDetails(String imdbID) {
        return movieDetailsRepository.findById(imdbID).orElse(null);
    }

    public MovieDetails saveMovieDetails(MovieDetails movieDetails) {
        return movieDetailsRepository.save(movieDetails);
    }

    public void deleteMovieDetails(String imdbID) {
        movieDetailsRepository.deleteById(imdbID);
    }
}
