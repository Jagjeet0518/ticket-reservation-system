package com.train.ticket_reservation.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "trains", uniqueConstraints = {
        @UniqueConstraint(columnNames = "name"),
        @UniqueConstraint(columnNames = "number")
})
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;
    @Column(name = "origin")
    private String from;
    @Column(name = "destination")
    private String to;
    @Column(name = "train_time")
    private String time;
    @Column(name = "total_seats")
    private Integer seats;
    @Column(name = "fare")
    private Double fare;

    public Train() {

    }

    public Train(String name, String from, String to, String time, Integer seats, Double fare) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.time = time;
        this.seats = seats;
        this.fare = fare;
    }

    // GETTERS
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getTime() {
        return time;
    }

    public Integer getSeats() {
        return seats;
    }

    public Double getFare() {
        return fare;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public void setFare(Double fare) {
        this.fare = fare;
    }
}
