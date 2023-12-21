package com.MovieApp.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Movie {

    @Id
    private String imdbID;
    private String title;
    private String year;
    private String type;
    private String poster;

    public Movie(){

    }

    public Movie(String imdbID, String title, String year, String type, String poster) {
        this.imdbID = imdbID;
        this.title = title;
        this.year = year;
        this.type = type;
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

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }
}
