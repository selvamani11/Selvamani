package com.MovieApp.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class MovieDetails {

    @Id
    private String imdbID;
    private String title;
    private String released;
    private String genre;
    private String imdbRating;
    private String country;
    private String poster;

    public MovieDetails(){

    }

    public MovieDetails(String imdbID, String title, String released, String genre, String imdbRating, String country, String poster) {
        this.imdbID = imdbID;
        this.title = title;
        this.released = released;
        this.genre = genre;
        this.imdbRating = imdbRating;
        this.country = country;
        this.poster = poster;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleased() {
        return released;
    }

    public void setReleased(String released) {
        this.released = released;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(String imdbRating) {
        this.imdbRating = imdbRating;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}
