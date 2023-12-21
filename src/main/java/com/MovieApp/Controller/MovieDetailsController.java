package com.MovieApp.Controller;// MovieDetailsController.java

import ch.qos.logback.core.model.Model;
import com.MovieApp.Entity.MovieDetails;
import com.MovieApp.Service.MovieDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("movie")
public class MovieDetailsController {

    private final MovieDetailsService movieDetailsService;

    @Autowired
    public MovieDetailsController(MovieDetailsService movieDetailsService) {
        this.movieDetailsService = movieDetailsService;
    }

    @GetMapping("/{imdbID}")
    public ResponseEntity<MovieDetails> getMovieDetails(@PathVariable String imdbID) {
        MovieDetails movieDetails = movieDetailsService.getMovieDetails(imdbID);
        return ResponseEntity.ok(movieDetails);
    }

    @PostMapping("/add")
    public ResponseEntity<MovieDetails> addMovieDetails(@RequestBody MovieDetails movieDetails) {
        MovieDetails savedMovieDetails = movieDetailsService.saveMovieDetails(movieDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovieDetails);
    }

    @DeleteMapping("/delete/{imdbID}")
    public ResponseEntity<String> deleteMovieDetails(@PathVariable String imdbID) {
        movieDetailsService.deleteMovieDetails(imdbID);
        return ResponseEntity.ok("Movie details deleted successfully");
    }
}
