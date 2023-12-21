package com.MovieApp.Repository;// MovieDetailsRepository.java
import com.MovieApp.Entity.MovieDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieDetailsRepository extends JpaRepository<MovieDetails, String> {
}
