package com.example.WorkFromHome.entity;

import lombok.Data;

@Data
public class AssignDays {

    private String name;
    private String email;
    private String days;

    public AssignDays(String name, String email, String days) {
        this.name = name;
        this.email = email;
        this.days = days;
    }
}
